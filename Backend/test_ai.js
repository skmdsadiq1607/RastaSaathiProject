const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const axios = require('axios');

async function testGroq() {
  const key = process.env.GROQ_API_KEYS;
  console.log('\n=== GROQ TEST ===');
  console.log('Key present:', !!key, key ? `(starts with: ${key.slice(0,8)}...)` : '(MISSING!)');

  if (!key) {
    console.log('❌ GROQ_API_KEYS not set in .env');
    return;
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Say "Hello from Groq!" in one sentence.' }
        ],
        max_tokens: 50
      },
      {
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );
    console.log('✅ GROQ WORKING!');
    console.log('Response:', response.data.choices[0].message.content);
  } catch (err) {
    console.log('❌ GROQ FAILED!');
    console.log('Status:', err.response?.status);
    console.log('Error:', err.response?.data?.error?.message || err.message);
  }
}

async function testGemini() {
  const key = process.env.GEMINI_API_KEYS;
  console.log('\n=== GEMINI TEST ===');
  console.log('Key present:', !!key, key ? `(starts with: ${key.slice(0,8)}...)` : '(MISSING!)');

  if (!key) {
    console.log('❌ GEMINI_API_KEYS not set in .env');
    return;
  }

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent('Say "Hello from Gemini!" in one sentence.');
    console.log('✅ GEMINI WORKING!');
    console.log('Response:', result.response.text());
  } catch (err) {
    console.log('❌ GEMINI FAILED!');
    console.log('Error:', err.message);
  }
}

async function runTests() {
  await testGroq();
  await testGemini();
  console.log('\n=== DONE ===\n');
  process.exit(0);
}

runTests();
