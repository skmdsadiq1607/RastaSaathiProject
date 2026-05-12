const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

const schema = Joi.object({
  PORT: Joi.number().default(8080),
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  FRONTEND_URL: Joi.string().required(),

  MONGODB_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().min(16).required(),
  JWT_REFRESH_SECRET: Joi.string().min(16).required(),

  TWILIO_ACCOUNT_SID: Joi.string().allow(''),
  TWILIO_AUTH_TOKEN: Joi.string().allow(''),
  TWILIO_WHATSAPP_NUMBER: Joi.string().allow(''),
  TWILIO_PHONE_NUMBER: Joi.string().allow(''),

  GOOGLE_CLIENT_ID: Joi.string().allow(''),
  GOOGLE_MAPS_API_KEY: Joi.string().allow(''),
  GEMINI_API_KEYS: Joi.string().allow(''),
  GOOGLE_CLOUD_PROJECT_ID: Joi.string().allow(''),
  GOOGLE_APPLICATION_CREDENTIALS: Joi.string().allow(''),
  GOOGLE_TRANSLATE_PROJECT_LOCATION: Joi.string().default('global'),

  FCM_SERVER_KEY: Joi.string().allow(''),

  CLAUDE_API_KEYS: Joi.string().allow(''),
  OPENAI_API_KEY: Joi.string().allow('')
}).unknown();

const { value, error } = schema.validate(process.env, {
  abortEarly: false,
  stripUnknown: false
});

if (error) {
  // eslint-disable-next-line no-throw-literal
  throw new Error(`Environment validation error: ${error.message}`);
}

const env = Object.freeze({
  PORT: value.PORT,
  NODE_ENV: value.NODE_ENV,
  FRONTEND_URL: value.FRONTEND_URL,

  MONGODB_URI: value.MONGODB_URI,

  JWT_SECRET: value.JWT_SECRET,
  JWT_REFRESH_SECRET: value.JWT_REFRESH_SECRET,

  TWILIO_ACCOUNT_SID: value.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: value.TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER: value.TWILIO_WHATSAPP_NUMBER,
  TWILIO_PHONE_NUMBER: value.TWILIO_PHONE_NUMBER,

  GOOGLE_CLIENT_ID: value.GOOGLE_CLIENT_ID,
  GOOGLE_MAPS_API_KEY: value.GOOGLE_MAPS_API_KEY,
  GEMINI_API_KEYS: value.GEMINI_API_KEYS,
  GOOGLE_CLOUD_PROJECT_ID: value.GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS: value.GOOGLE_APPLICATION_CREDENTIALS,
  GOOGLE_TRANSLATE_PROJECT_LOCATION: value.GOOGLE_TRANSLATE_PROJECT_LOCATION,

  FCM_SERVER_KEY: value.FCM_SERVER_KEY,

  CLAUDE_API_KEYS: value.CLAUDE_API_KEYS,
  OPENAI_API_KEY: value.OPENAI_API_KEY
});

module.exports = { env };

