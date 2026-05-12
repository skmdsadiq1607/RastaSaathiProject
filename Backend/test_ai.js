const { callClaude } = require('./src/services/ai.service');
require('dotenv').config();

async function test() {
  console.log('Testing AI Service...');
  try {
    const res = await callClaude({ system: 'Say hello', user: 'Hi' });
    console.log('AI Response:', res.text);
    console.log('Provider:', res.provider);
  } catch (err) {
    console.error('AI Test Failed:', err);
  }
}

test();
