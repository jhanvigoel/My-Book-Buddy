import express from 'express';
import { LoginController, RegisterController } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup',RegisterController);

router.post('/login',LoginController)

export default router;