const Joi = require('joi');

const registerSchema = Joi.object({
  nik: Joi.string().min(6).max(30).required(),
  phone: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(255).required(),
  gender: Joi.string().valid('L','P').required(),
  password: Joi.string().min(6).max(128).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
