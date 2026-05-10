const Joi = require('joi');

const triggerSosSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  userId: Joi.string().optional(),
  injuryType: Joi.string().allow(''),
  vehicleType: Joi.string().allow('')
});

module.exports = { triggerSosSchema };

