import { celebrate, Segments, Joi } from 'celebrate';

const usersValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export { usersValidation };
