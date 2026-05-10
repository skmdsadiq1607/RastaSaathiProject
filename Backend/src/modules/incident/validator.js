const Joi = require('joi');

const createIncidentSchema = Joi.object({
  userId: Joi.string().optional(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  injuryType: Joi.string().allow(''),
  vehicleType: Joi.string().allow('')
});

module.exports = { createIncidentSchema };

