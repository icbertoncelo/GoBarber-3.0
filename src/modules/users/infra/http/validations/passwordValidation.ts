import { celebrate, Segments, Joi } from 'celebrate';

const forgotPasswordValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

const resetPasswordValidation = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

export { forgotPasswordValidation, resetPasswordValidation };
