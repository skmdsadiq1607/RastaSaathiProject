const Joi = require('joi');

exports.alertSchema = Joi.object({
  incidentId: Joi.string().required(),
  type: Joi.string().valid('SMS', 'PUSH', 'BOTH').required(),
  message: Joi.string().required()
});
