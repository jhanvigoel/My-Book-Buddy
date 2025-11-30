import express from 'express';
import { LoginController, RegisterController , LogoutController , RefreshTokenController} from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/signup',RegisterController);

router.post('/login',LoginController);

router.post('/dashboard/profile',authMiddleware, LogoutController);

router.post('/refresh-token', RefreshTokenController);

export default router;