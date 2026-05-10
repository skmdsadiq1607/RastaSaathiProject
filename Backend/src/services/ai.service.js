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

