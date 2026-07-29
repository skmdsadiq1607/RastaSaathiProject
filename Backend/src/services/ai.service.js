const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const { env } = require('../config/env');
const { claudeKeyManager, geminiKeyManager, openaiKeyManager, groqKeyManager } = require('../utils/apiKeyManager');
const { AppError } = require('../utils/AppError');
const { logger } = require('../utils/logger');

// --- Groq (PRIMARY - fastest, most free requests) ---
async function callGroqWithRetry({ system, user, maxTokens = 600 }) {
  const maxRetries = groqKeyManager.keys.length;
  let attempt = 0;
  while (attempt < maxRetries) {
    const key = groqKeyManager.getCurrentKey();
    if (!key) throw new Error('No Groq API key available');

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user }
          ],
          max_tokens: maxTokens,
          temperature: 0.5
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );
      const text = response.data.choices[0].message.content;
      return { text, raw: response.data, provider: 'groq' };
    } catch (error) {
      const status = error.response?.status;
      logger.error(`[Groq API Error] Key: ${key.slice(0, 8)}... | Status: ${status} | Error: ${error.message}`);
      if (status === 429 || status === 401 || status === 403) {
        groqKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all Groq API retries');
}

// --- OpenAI ---
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

// --- Claude ---
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

// --- Gemini ---
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

// Unified AI Caller: Tries Groq -> Gemini -> OpenAI -> Claude -> Static Fallback
async function callAi({ system, user, maxTokens = 600 }) {
  // 1. Try Groq (PRIMARY - ultra fast, 14,400 req/day free)
  try {
    const result = await callGroqWithRetry({ system, user, maxTokens });
    logger.info('[AI Service] Groq responded successfully.');
    return result;
  } catch (groqError) {
    logger.warn(`[AI Service] Groq Failed: ${groqError.message}. Falling back to Gemini...`);
  }

  // 2. Try Gemini (SECONDARY - 1,500 req/day free)
  try {
    return await callGeminiWithRetry({ system, user });
  } catch (geminiError) {
    logger.warn(`[AI Service] Gemini Failed: ${geminiError.message}. Falling back to OpenAI...`);
    
    // 3. Try OpenAI
    try {
      return await callOpenAIWithRetry({ system, user, maxTokens });
    } catch (openAiError) {
      logger.error(`[AI Service] OpenAI Failed: ${openAiError.message}. Falling back to Claude...`);
      
      // 4. Try Claude
      try {
        return await callClaudeWithRetry({ system, user, maxTokens });
      } catch (claudeError) {
        logger.error(`[AI Service] Claude Failed: ${claudeError.message}. Using static fallback.`);
        
        // Final Static Fallback (for UI stability)
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

async function callGroqVisionWithRetry({ base64Data, mimeType, prompt }) {
  const maxRetries = groqKeyManager.keys.length;
  let attempt = 0;
  while (attempt < maxRetries) {
    const key = groqKeyManager.getCurrentKey();
    if (!key) throw new Error('No Groq API key available');

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.2-11b-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:${mimeType};base64,${base64Data}`
                  }
                }
              ]
            }
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' }
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const text = response.data?.choices?.[0]?.message?.content;
      return { text, provider: 'groq-vision' };
    } catch (error) {
      logger.error(`[Groq Vision API Error] Key: ${key.slice(0, 8)}... | Error: ${error.message}`);
      if (error.response?.status === 429) {
        groqKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all Groq API retries for Vision');
}

async function callGeminiVisionWithRetry({ base64Data, mimeType, prompt }) {
  const maxRetries = geminiKeyManager.keys.length;
  let attempt = 0;
  while (attempt < maxRetries) {
    const key = geminiKeyManager.getCurrentKey();
    if (!key) throw new Error('No Gemini API key available');

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      };

      const result = await model.generateContent([
        prompt,
        imagePart
      ]);

      const text = result.response.text();
      return { text, provider: 'gemini-vision' };
    } catch (error) {
      logger.error(`[Gemini Vision API Error] Key: ${key.slice(0, 8)}... | Error: ${error.message}`);
      if (error.message?.includes('429')) {
        geminiKeyManager.rotateKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all Gemini API retries for Vision');
}

async function callAiVision({ base64Data, mimeType, prompt }) {
  try {
    const result = await callGroqVisionWithRetry({ base64Data, mimeType, prompt });
    logger.info('[AI Vision Service] Groq Vision responded successfully.');
    return result;
  } catch (groqError) {
    logger.warn(`[AI Vision Service] Groq Vision Failed: ${groqError.message}. Falling back to Gemini...`);
  }

  try {
    const result = await callGeminiVisionWithRetry({ base64Data, mimeType, prompt });
    logger.info('[AI Vision Service] Gemini Vision responded successfully.');
    return result;
  } catch (geminiError) {
    logger.error(`[AI Vision Service] Gemini Vision Failed: ${geminiError.message}. Throwing error.`);
    throw geminiError;
  }
}

module.exports = { callAi, callAiVision };
