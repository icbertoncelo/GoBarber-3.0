import { celebrate, Segments, Joi } from 'celebrate';

const providerMonthAvailabilityValidation = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});

const providerDayAvailabilityValidation = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});

export {
  providerMonthAvailabilityValidation,
  providerDayAvailabilityValidation,
};
