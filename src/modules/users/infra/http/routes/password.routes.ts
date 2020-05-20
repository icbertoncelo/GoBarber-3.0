import { Router } from 'express';

import {
  forgotPasswordValidation,
  resetPasswordValidation,
} from '../validations/passwordValidation';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  forgotPasswordValidation,
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  resetPasswordValidation,
  resetPasswordController.create,
);

export default passwordRouter;
