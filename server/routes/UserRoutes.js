import express from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { getUserProfile } from '../controllers/profileController.js';
import { createReadingHistory, getReadingHistory } from '../controllers/ReadingHistory.js';
import { fetchbooks } from '../controllers/books.js';

const Userrouter = express.Router();

Userrouter.get('/profile', authMiddleware, getUserProfile);
Userrouter.get('/reading-history', authMiddleware,getReadingHistory);
Userrouter.get('/dashboard',fetchbooks);
Userrouter.post('/reading-history',authMiddleware,createReadingHistory)

export default Userrouter;