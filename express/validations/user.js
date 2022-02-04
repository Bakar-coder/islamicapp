const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 24,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 5,
};

exports.validatePassword = (password) =>
  passwordComplexity(complexityOptions, "Password").validate(password);

exports.validateRegister = (req) => {
  const { firstName, lastName, username, email, password, password2 } =
    req.body;
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    admin: Joi.boolean(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    password2: Joi.string().required(),
  }).validate({ firstName, lastName, username, email, password, password2 });
};

exports.validateProfile = (req) => {
  const {
    address,
    address2,
    bio,
    city,
    country,
    phone,
    roles,
    state,
    zip,
    company,
  } = req.body;
  return Joi.object({
    address: Joi.string().required(),
    address2: Joi.string(),
    bio: Joi.string().required(),
    roles: Joi.string(),
    phone: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    state: Joi.string(),
    company: Joi.string(),
  }).validate({
    address,
    address2,
    bio,
    city,
    country,
    phone,
    roles,
    state,
    zip,
    company,
  });
};

exports.validateLogin = (req) => {
  const { password, usernameOrEmail } = req.body;
  return Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required(),
  }).validate({ usernameOrEmail, password });
};

exports.validateUpdateUser = (opts) => {
  const { name, email, role } = opts;
  return Joi.object({
    name: Joi.string().required(),
    role: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  }).validate({
    name,
    email,
    role,
  });
};
