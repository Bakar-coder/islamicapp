const Joi = require("joi");

exports.validateProfile = (opts) => {
  const { id, phone, address, state, city, zip, company, status, seller } =
    opts;
  return Joi.object({
    id: Joi.number().required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
    state: Joi.string().required(),
    city: Joi.number().required(),
    zip: Joi.number().required(),
    company: Joi.string().required(),
    status: Joi.string(),
    seller: Joi.boolean(),
  }).validate({
    id,
    phone,
    address,
    state,
    city,
    zip,
    company,
    status,
    seller,
  });
}
