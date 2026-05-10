const { recognize } = require('../../services/speech.service');
const { triggerSos } = require('../sos/service');
const { AppError } = require('../../utils/AppError');

const KEYWORDS = [
  // English
  'help',
  'accident',
  'emergency',
  'injured',
  // Hindi
  'madad',
  'bachao',
  'durghatna',
  'emergency',
  // Telugu
  'sahayam',
  'pramadam',
  // Tamil
  'uthavi',
  'vibathu',
  // Kannada
  'sahaya',
  'apaghata'
];

function containsEmergencyKeyword(text) {
  const t = String(text || '').toLowerCase();
  return KEYWORDS.some((k) => t.includes(k));
}

async function voiceTrigger({ io, redis, queues, userId, audioBuffer, lat, lng, encoding, sampleRateHertz, languageCode }) {
  const stt = await recognize({
    audioBuffer,
    encoding,
    sampleRateHertz,
    languageCode,
    alternativeLanguageCodes: ['hi-IN', 'te-IN', 'ta-IN', 'kn-IN', 'en-IN']
  });

  const intent = containsEmergencyKeyword(stt.transcript) && stt.confidence >= 0.85;
  if (!intent) {
    return { triggered: false, transcript: stt.transcript, confidence: stt.confidence };
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new AppError('GPS lat/lng required for voice SOS', 400, 'VALIDATION_ERROR');
  }

  const cancelKey = `voice:cancel:${userId}`;
  await redis.set(cancelKey, '0', 'EX', 15);

  // 10s cancellation window
  setTimeout(async () => {
    const cancelled = await redis.get(cancelKey);
    if (cancelled === '1') return;
    await triggerSos({
      io,
      redis,
      queues,
      lat,
      lng,
      userId,
      injuryType: null,
      vehicleType: null
    });
  }, 10_000);

  return { triggered: true, transcript: stt.transcript, confidence: stt.confidence, cancellationWindowSeconds: 10 };
}

async function cancelVoice({ redis, userId }) {
  await redis.set(`voice:cancel:${userId}`, '1', 'EX', 15);
}

module.exports = { voiceTrigger, cancelVoice };

