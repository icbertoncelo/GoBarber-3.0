import { Router } from 'express';

import { profileValidation } from '../validations/profileValidation';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileValidation, profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
