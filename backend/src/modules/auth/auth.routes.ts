import {Router} from 'express';
import { gerUserController, loginController, logOutController, otpController, registerController } from './auth.controller.js';
import { validate } from '../../middleware/validator.js';
import { loginSchema, otpSchema, registerSchema } from './auth.validation.js';
import { authenticateUser } from '../../middleware/authenticate.js';

const router = Router()

router.post('/register', validate(registerSchema), registerController);
router.post('/otp', validate(otpSchema), otpController);
router.post('/login', validate(loginSchema), loginController);
router.post('/logout', authenticateUser, logOutController);
router.get('/me',authenticateUser,gerUserController)

export default router