const Joi = require('joi');

const createValidation = Joi.object({
  name: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().min(8),
  password: Joi.string().min(8),
});

const loginValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().min(8),
});

const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(8),
});

const reminderSettingsValidation = Joi.object({
  reminder_status: Joi.boolean(),
  reminder_type: Joi.string(),
  reminder_value: Joi.number(),
});

module.exports = {
  createValidation,
  updateValidation,
  loginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  reminderSettingsValidation,
};
