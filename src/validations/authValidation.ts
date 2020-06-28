import * as Joi from 'joi';

// POST api/v1/auth/register
const register = {
  name: Joi.string().min(1).trim().required(),
  email: Joi.string().lowercase().email({ minDomainAtoms: 2 }).trim().required(),
  password: Joi.string().min(6).trim().required()
};

// POST api/v1/auth/login
const login = {
  email: Joi.string().lowercase().max(250).email().required().trim(),
  password: Joi.string().max(24).required().trim()
};

export { register, login };