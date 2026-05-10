const Joi = require('joi');

exports.workflowSchema = Joi.object({
  incidentId: Joi.string().required(),
  step: Joi.string().required(),
  payload: Joi.object().optional()
});
