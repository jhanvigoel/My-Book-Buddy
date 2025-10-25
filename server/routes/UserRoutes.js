import express from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { getUserProfile } from '../controllers/profileController.js';
import { createReadingHistory, getReadingHistory } from '../controllers/ReadingHistory.js';
import { fetchbooks } from '../controllers/books.js';

const Userrouter = express.Router();

Userrouter.get('/dashboard/profile', authMiddleware, getUserProfile);
Userrouter.get('/dashboard', authMiddleware,getReadingHistory);
Userrouter.get('/dashboard/book-search',authMiddleware,fetchbooks);
Userrouter.post('/dashboard',authMiddleware,createReadingHistory)

export default Userrouter;