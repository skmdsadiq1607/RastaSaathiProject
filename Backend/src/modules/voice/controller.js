const multer = require('multer');
const { ok } = require('../../utils/responseFormatter');
const { voiceTrigger, cancelVoice } = require('./service');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

function voiceUploadMiddleware(fieldName) {
  return upload.single(fieldName);
}

async function triggerVoiceController(req, res, next) {
  try {
    const { io, redis, queues } = req.context;
    const lat = Number(req.body.lat ?? req.headers['x-gps-lat']);
    const lng = Number(req.body.lng ?? req.headers['x-gps-lng']);

    const result = await voiceTrigger({
      io,
      redis,
      queues,
      userId: req.user.sub,
      audioBuffer: req.file?.buffer,
      lat,
      lng,
      encoding: req.body.encoding,
      sampleRateHertz: Number(req.body.sampleRateHertz),
      languageCode: req.body.languageCode
    });
    res.status(201).json(ok({ data: result, message: 'Voice processed' }));
  } catch (err) {
    next(err);
  }
}

async function cancelVoiceController(req, res, next) {
  try {
    const { redis } = req.context;
    await cancelVoice({ redis, userId: req.user.sub });
    res.json(ok({ data: {}, message: 'Cancelled' }));
  } catch (err) {
    next(err);
  }
}

module.exports = { voiceUploadMiddleware, triggerVoiceController, cancelVoiceController };

