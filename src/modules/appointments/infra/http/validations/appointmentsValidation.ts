import { celebrate, Segments, Joi } from 'celebrate';

const appointmentsValidation = celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
});

export { appointmentsValidation };
