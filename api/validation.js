const Joi = require('joi');

// register validation schema
const registerValidation = (dataToValidate) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6)
    });
   return schema.validate(dataToValidate);
}

// login validation schema
const loginValidation = (dataToValidate) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6)
    });
   return schema.validate(dataToValidate);
}

module.exports = {registerValidation, loginValidation}
