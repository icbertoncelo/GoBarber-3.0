import { Router } from 'express';

import { sessionsValidation } from '../validations/sessionsValidation';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsValidation, sessionsController.create);

export default sessionsRouter;
