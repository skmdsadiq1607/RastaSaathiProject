const Joi = require('joi');

exports.updateSchema = Joi.object({
  hospitalId: Joi.string().required(),
  resources: Joi.object({
    icuBeds: Joi.number().min(0),
    ventilators: Joi.number().min(0),
    bloodUnits: Joi.object({
      A: Joi.number().min(0),
      B: Joi.number().min(0),
      O: Joi.number().min(0),
      AB: Joi.number().min(0)
    }),
    ambulancesAvailable: Joi.number().min(0),
    traumaTeamOnDuty: Joi.boolean()
  }).required()
});
