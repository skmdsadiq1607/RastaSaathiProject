const Joi = require('joi');

const guideSchema = Joi.object({
  incidentId: Joi.string().optional(),
  injuryType: Joi.string().required(),
  severityLevel: Joi.string().valid('CRITICAL', 'HIGH', 'MEDIUM', 'LOW').required(),
  resourcesAvailable: Joi.array().items(Joi.string()).default([]),
  language: Joi.string().valid('en', 'hi', 'ta', 'te', 'kn').required()
});

const followupSchema = Joi.object({
  sessionId: Joi.string().required(),
  question: Joi.string().min(1).required()
});

module.exports = { guideSchema, followupSchema };

