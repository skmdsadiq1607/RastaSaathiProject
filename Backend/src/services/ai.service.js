const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { claudeKeyManager, geminiKeyManager } = require('../utils/apiKeyManager');
const { AppError } = require('../utils/AppError');
const { logger } = require('../utils/logger');

async function callClaudeWithRetry({ system, user, maxTokens = 600, retries = 1 }) {
  let attempt = 0;
  while (attempt <= retries) {
    const key = claudeKeyManager.getCurrentKey();
    if (!key) throw new Error('No Claude API key available');

    const client = new Anthropic({ apiKey: key });

    try {
      const modelName = 'claude-3-5-sonnet-latest';
      const msg = await client.messages.create({
        model: modelName, 
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: user }]
      });
      const text = msg.content?.map((c) => (c.type === 'text' ? c.text : '')).join('') || '';
      return { text, raw: msg, provider: 'claude' };
    } catch (error) {
      if (error.status === 429 || error.status === 401 || error.status === 403) {
        logger.warn(`[Claude API] Hit Rate Limit or Auth Error. Rotating Key...`);
        claudeKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all Claude API retries');
}

async function callGeminiWithRetry({ system, user, retries = 1 }) {
  let attempt = 0;
  while (attempt <= retries) {
    const key = geminiKeyManager.getCurrentKey();
    if (!key) throw new Error('No Gemini API key available');

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const result = await model.generateContent([
        { text: `SYSTEM: ${system}` },
        { text: `USER: ${user}` }
      ]);
      
      const text = result.response.text();
      return { text, raw: result, provider: 'gemini' };
    } catch (error) {
      logger.error(`[Gemini API Error] Key: ${key.slice(0, 8)}... | Error: ${error.message}`);
      if (error.message?.includes('429') || error.message?.includes('403')) {
        geminiKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all Gemini API retries');
}

async function getFirstAidGuidance(input) {
  try {
    const { text, provider } = await callAiProvider(
      promptGenerator.firstAid(input.injuryType, input.severityLevel),
      "You are a professional first-aid medic assistant. Give concise, life-saving steps."
    );
    return { answer: text, provider };
  } catch (error) {
    logger.error(`[AI Service] All providers failed. Using Local Medical Fallback.`);
    return { 
      answer: getLocalMedicalAdvice(input.injuryType), 
      provider: 'local_safety_medic' 
    };
  }
}

async function getFollowupAnswer(sessionId, question) {
  try {
    const { text, provider } = await callAiProvider(
      `Context: Emergency. Question: ${question}`,
      "You are a medical assistant. Give a short, helpful answer to the user's question."
    );
    return { answer: text, provider };
  } catch (error) {
    logger.error(`[AI Service] Followup failed. Using Local Medical Fallback.`);
    return { 
      answer: getLocalMedicalAdvice(question), 
      provider: 'local_safety_medic' 
    };
  }
}

function getLocalMedicalAdvice(query) {
  const q = query.toLowerCase();
  if (q.includes('bleed')) return "1. Apply firm, steady pressure with a clean cloth. \n2. Do not remove the cloth if it soaks through; add more on top. \n3. Elevate the limb above the heart if possible.";
  if (q.includes('break') || q.includes('fracture') || q.includes('leg') || q.includes('bone')) return "1. Keep the limb still. Do not try to realign it. \n2. Apply a cold pack wrapped in cloth to reduce swelling. \n3. Wait for professional medical help to move the person.";
  if (q.includes('burn')) return "1. Run cool (not cold) water over the burn for 10-20 minutes. \n2. Cover loosely with a sterile bandage or plastic wrap. \n3. Do not apply butter or ointments.";
  if (q.includes('breath') || q.includes('cpr')) return "1. Check if the person is responsive. \n2. If not breathing, start hands-only CPR: push hard and fast in the center of the chest (100-120 beats per minute).";
  return "Stay calm and ensure the area is safe. Keep the victim warm and still until the ambulance (which we have dispatched) arrives.";
}

// Unified AI Caller: Tries Claude -> Fallback to Gemini
async function callClaude({ system, user, maxTokens = 600 }) {
  try {
    return await callClaudeWithRetry({ system, user, maxTokens });
  } catch (claudeError) {
    logger.error(`[AI Service] Claude Failed: ${claudeError.message}`);
    try {
      return await callGeminiWithRetry({ system, user });
    } catch (geminiError) {
      logger.error(`[AI Service] Gemini Failed: ${geminiError.message}`);
      // Safety Fallback for Hackathon Demo: Never show an error to the user
      return { 
        text: "I'm having a slight connection issue with my advanced brain, but I can still help! For most road emergencies: \n1. Stay calm and ensure the area is safe. \n2. Check for responsiveness and breathing. \n3. If bleeding, apply firm pressure with a clean cloth. \n4. Do not move the person unless there is an immediate danger like fire. \n\nPlease tell me more about the injury so I can give specific steps.",
        provider: 'fallback'
      };
    }
  }
}

module.exports = { callClaude };

