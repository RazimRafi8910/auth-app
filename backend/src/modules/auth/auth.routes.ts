import {Router} from 'express';
import { generateOtpController, gerUserController, loginController, logOutController, otpController, refreshUserToken, registerController } from './auth.controller.js';
import { validate } from '../../middleware/validator.js';
import { generateOtpSchema, loginSchema, otpSchema, registerSchema } from './auth.validation.js';
import { authenticateUser } from '../../middleware/authenticate.js';

const router = Router()

router.post('/register', validate(registerSchema), registerController);
router.put('/generate-otp', validate(generateOtpSchema), generateOtpController);
router.post('/otp', validate(otpSchema), otpController);
router.post('/login', validate(loginSchema), loginController);
router.post('/logout', authenticateUser, logOutController);
router.get('/refresh', authenticateUser, refreshUserToken);
router.get('/me', authenticateUser, gerUserController);

export default router
