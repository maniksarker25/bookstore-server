import { Router } from 'express';

import { authControllers } from '../controllers/Auth';

const router = Router();

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);

export const authRoutes = router;
