import { Router } from 'express';

import { authControllers } from '../controllers/Auth';
import { authValidations } from '../validationSchemas/user.validation';
import { validateRequest } from '../middlewares/validation';

const router = Router();

router.post(
  '/register',
  authValidations.registerUserValidationSchema,
  validateRequest,
  authControllers.registerUser,
);
router.post('/login', authControllers.loginUser);

export const authRoutes = router;
