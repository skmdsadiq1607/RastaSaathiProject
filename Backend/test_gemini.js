const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  const keys = process.env.GEMINI_API_KEYS.split(',');
  for (const key of keys) {
    console.log('Testing Key:', key.slice(0, 10));
    try {
      const genAI = new GoogleGenerativeAI(key.trim());
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent("Hello");
      console.log('Success:', result.response.text());
      break;
    } catch (err) {
      console.error('Failed:', err.message);
    }
  }
}

test();
