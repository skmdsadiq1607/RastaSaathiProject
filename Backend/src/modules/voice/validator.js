const Joi = require('joi');

const triggerVoiceSchema = Joi.object({
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
  encoding: Joi.string().valid('LINEAR16', 'WEBM_OPUS', 'OGG_OPUS').default('LINEAR16'),
  sampleRateHertz: Joi.number().min(8000).max(48000).default(16000),
  languageCode: Joi.string().default('en-IN')
});

module.exports = { triggerVoiceSchema };

