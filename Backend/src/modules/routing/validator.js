const Joi = require('joi');

const calculateRouteSchema = Joi.object({
  origin: Joi.object({ lat: Joi.number().required(), lng: Joi.number().required() }).required(),
  destination: Joi.object({ lat: Joi.number().required(), lng: Joi.number().required() }).required(),
  severityLevel: Joi.string().valid('CRITICAL', 'HIGH', 'MEDIUM', 'LOW').required()
});

module.exports = { calculateRouteSchema };

