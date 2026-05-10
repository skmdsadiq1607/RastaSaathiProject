const Joi = require('joi');

const selectHospitalSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  severityLevel: Joi.string().valid('CRITICAL', 'HIGH', 'MEDIUM', 'LOW').required(),
  injuryType: Joi.string().allow(''),
  requiredSpecialty: Joi.string().allow('')
});

module.exports = { selectHospitalSchema };

