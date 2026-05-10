const Joi = require('joi');
const { ROLES } = require('../../utils/constants');

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid(ROLES.VICTIM, ROLES.RESPONDER, ROLES.ADMIN)
    .required(),
  language: Joi.string().valid('en', 'hi', 'ta', 'te', 'kn').default('en'),
  emergencyContacts: Joi.array()
    .items(Joi.object({ name: Joi.string().required(), phone: Joi.string().required() }))
    .default([]),
  fcmToken: Joi.string().allow('')
});

const loginSchema = Joi.object({
  phone: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  fcmToken: Joi.string().allow('')
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
});

module.exports = { registerSchema, loginSchema, refreshSchema };

