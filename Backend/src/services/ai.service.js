const Anthropic = require('@anthropic-ai/sdk/index.mjs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { claudeKeyManager, geminiKeyManager } = require('../utils/apiKeyManager');
const { AppError } = require('../utils/AppError');
const { logger } = require('../utils/logger');

async function callClaudeWithRetry({ system, user, maxTokens = 600, retries = 2 }) {
  let attempt = 0;
  while (attempt <= retries) {
    const key = claudeKeyManager.getCurrentKey();
    if (!key) throw new Error('No Claude API key available');

    const client = new Anthropic({ apiKey: key });

    try {
      const msg = await client.messages.create({
        model: 'claude-3-5-sonnet-20240620', // Updated to valid Anthropic model identifier
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

async function callGeminiWithRetry({ system, user, retries = 2 }) {
  let attempt = 0;
  while (attempt <= retries) {
    const key = geminiKeyManager.getCurrentKey();
    if (!key) throw new Error('No Gemini API key available');

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: system });

    try {
      const result = await model.generateContent(user);
      const text = result.response.text();
      return { text, raw: result, provider: 'gemini' };
    } catch (error) {
      // Basic check for 429 in google gen-ai sdk
      if (error.message?.includes('429') || error.message?.includes('403') || error.status === 429) {
        logger.warn(`[Gemini API] Hit Rate Limit or Auth Error. Rotating Key...`);
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
    logger.error(`[AI Service] Claude Failed completely: ${claudeError.message}. Falling back to Gemini...`);
    try {
      return await callGeminiWithRetry({ system, user });
    } catch (geminiError) {
      logger.error(`[AI Service] Gemini also Failed: ${geminiError.message}. Entire AI pipeline exhausted.`);
      throw new AppError('AI Service currently unavailable due to rate limits', 503, 'AI_EXHAUSTED');
    }
  }
}

module.exports = { callClaude };

