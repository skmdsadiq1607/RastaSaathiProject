const Joi = require('joi');

exports.webhookSchema = Joi.object({
  Body: Joi.string().required(),
  From: Joi.string().required()
}).unknown(true);
