const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const { AppError } = require('../utils/AppError');

async function getSpeechClient() {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = tokenResponse?.token;
  if (!token) throw new AppError('Failed to get Google access token', 500, 'CONFIG_ERROR');
  return { token };
}

async function recognize({ audioBuffer, encoding = 'LINEAR16', sampleRateHertz = 16000, languageCode = 'en-IN', alternativeLanguageCodes = [] }) {
  if (!audioBuffer || !Buffer.isBuffer(audioBuffer)) throw new AppError('Audio buffer required', 400, 'VALIDATION_ERROR');
  const { token } = await getSpeechClient();

  const body = {
    config: {
      encoding,
      sampleRateHertz,
      languageCode,
      alternativeLanguageCodes,
      enableAutomaticPunctuation: true,
      model: 'latest_long'
    },
    audio: {
      content: audioBuffer.toString('base64')
    }
  };

  const { data } = await axios.post('https://speech.googleapis.com/v1/speech:recognize', body, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 15000
  });

  const results = data?.results || [];
  const alternatives = results.flatMap((r) => r.alternatives || []);
  const best = alternatives.sort((a, b) => (b.confidence || 0) - (a.confidence || 0))[0];
  if (!best?.transcript) throw new AppError('Speech recognition failed', 502, 'SPEECH_ERROR', data);
  return { transcript: best.transcript, confidence: best.confidence || 0, raw: data };
}

module.exports = { recognize };

