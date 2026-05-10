const Joi = require('joi');

const predictSeveritySchema = Joi.object({
  incidentId: Joi.string().required(),
  speed: Joi.number().min(0).required(),
  impactForce: Joi.number().min(0).required(),
  vehicleType: Joi.string().allow(''),
  injuryDescription: Joi.string().allow(''),
  consciousnessLevel: Joi.string().allow(''),
  age: Joi.number().min(0).max(120).required()
});

module.exports = { predictSeveritySchema };

