const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');

async function getAccessToken() {
  if (!env.GOOGLE_CLOUD_PROJECT_ID) throw new AppError('Google Cloud project not configured', 500, 'CONFIG_ERROR');
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = tokenResponse?.token;
  if (!token) throw new AppError('Failed to get Google access token', 500, 'CONFIG_ERROR');
  return token;
}

async function detectLanguage(text) {
  const token = await getAccessToken();
  const url = `https://translation.googleapis.com/language/translate/v2/detect`;
  const { data } = await axios.post(
    url,
    { q: text },
    {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000
    }
  );

  const det = data?.data?.detections?.[0]?.[0];
  if (!det) throw new AppError('Language detect failed', 502, 'TRANSLATION_ERROR', data);
  return { language: det.language, confidence: det.confidence };
}

async function translateText({ text, target }) {
  const token = await getAccessToken();
  const url = `https://translation.googleapis.com/language/translate/v2`;
  const { data } = await axios.post(
    url,
    { q: text, target },
    {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000
    }
  );
  const translated = data?.data?.translations?.[0]?.translatedText;
  if (!translated) throw new AppError('Translation failed', 502, 'TRANSLATION_ERROR', data);
  return translated;
}

module.exports = { detectLanguage, translateText };

