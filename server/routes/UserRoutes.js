import express from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { getUserProfile } from '../controllers/profileController.js';
import { getReadingHistory } from '../controllers/ReadingHistory.js';

const Userrouter = express.Router();

Userrouter.get('/profile', authMiddleware, getUserProfile);
Userrouter.get('/reading-history', authMiddleware,getReadingHistory);

export default Userrouter;