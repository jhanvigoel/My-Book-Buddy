import express from 'express';
import { LoginController, RegisterController , LogoutController , RefreshTokenController} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup',RegisterController);

router.post('/login',LoginController);

router.post('/logout', LogoutController);

router.post('/refresh-token', RefreshTokenController);

export default router;