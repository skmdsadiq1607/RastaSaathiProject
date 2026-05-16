const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const { env } = require('../config/env');
const { claudeKeyManager, geminiKeyManager, openaiKeyManager } = require('../utils/apiKeyManager');
const { AppError } = require('../utils/AppError');
const { logger } = require('../utils/logger');

async function callOpenAIWithRetry({ system, user, maxTokens = 600 }) {
  const maxRetries = openaiKeyManager.keys.length;
  let attempt = 0;
  while (attempt < maxRetries) {
    const key = openaiKeyManager.getCurrentKey();
    if (!key) throw new Error('No OpenAI API key available');
    
    const openai = new OpenAI({ apiKey: key });
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        max_tokens: maxTokens
      });
      const text = response.choices[0].message.content;
      return { text, raw: response, provider: 'openai' };
    } catch (error) {
      logger.error(`[OpenAI API Error] Key: ${key.slice(0, 15)}... | Error: ${error.message}`);
      if (error.status === 429 || error.status === 401 || error.status === 403) {
        openaiKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all OpenAI API retries');
}

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

async function callGeminiWithRetry({ system, user }) {
  const maxRetries = geminiKeyManager.keys.length;
  let attempt = 0;
  while (attempt < maxRetries) {
    const key = geminiKeyManager.getCurrentKey();
    if (!key) throw new Error('No Gemini API key available');

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      
      const result = await model.generateContent([
        { text: `SYSTEM: ${system}` },
        { text: `USER: ${user}` }
      ]);
      
      const text = result.response.text();
      return { text, raw: result, provider: 'gemini' };
    } catch (error) {
      logger.error(`[Gemini API Error] Key: ${key.slice(0, 8)}... | Error: ${error.message}`);
      if (error.message?.includes('429') || error.message?.includes('403') || error.message?.includes('404')) {
        geminiKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all Gemini API retries');
}

// Unified AI Caller: Tries Gemini -> OpenAI -> Claude
async function callAi({ system, user, maxTokens = 600 }) {
  // 1. Try Gemini (Primary for Hackathon/Reliability)
  try {
    return await callGeminiWithRetry({ system, user });
  } catch (geminiError) {
    logger.warn(`[AI Service] Gemini Failed: ${geminiError.message}. Falling back to OpenAI...`);
    
    // 2. Try OpenAI (Secondary)
    try {
      return await callOpenAIWithRetry({ system, user, maxTokens });
    } catch (openAiError) {
      logger.error(`[AI Service] OpenAI Failed: ${openAiError.message}. Falling back to Claude...`);
      
      // 3. Try Claude (Tertiary)
      try {
        return await callClaudeWithRetry({ system, user, maxTokens });
      } catch (claudeError) {
        logger.error(`[AI Service] Claude Failed: ${claudeError.message}`);
        
        // Final Safety Fallback (Structured JSON for UI stability)
        return { 
          text: JSON.stringify({
            steps: [
              "Stay calm and ensure the area is safe.",
              "Check for responsiveness and breathing.",
              "If bleeding, apply firm pressure with a clean cloth.",
              "Do not move the person unless there is immediate danger (e.g., fire)."
            ],
            warnings: [
              "High-precision AI analysis is currently restricted. Following basic trauma protocols.",
              "Do not provide oral fluids to unconscious victims."
            ],
            whenToEscalate: [
              "Uncontrolled bleeding",
              "Difficulty breathing",
              "Unconsciousness"
            ]
          }),
          provider: 'fallback'
        };
      }
    }
  }
}

module.exports = { callAi };

