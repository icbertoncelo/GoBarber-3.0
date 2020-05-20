import { celebrate, Segments, Joi } from 'celebrate';

const sessionsValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string(),
  },
});

export { sessionsValidation };
