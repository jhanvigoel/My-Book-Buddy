import express from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { getUserProfile } from '../controllers/profileController.js';
import { createReadingHistory, getReadingHistory } from '../controllers/ReadingHistory.js';
import { searchPeople, sendFriendRequest, respondToRequest, cancelPending, unfriend, FriendRequests, friendsActivity } from '../controllers/friends.js';
import { fetchbooks } from '../controllers/books.js';

const Userrouter = express.Router();

Userrouter.get('/dashboard/profile', authMiddleware, getUserProfile);
Userrouter.get('/dashboard', authMiddleware,getReadingHistory);
Userrouter.get('/dashboard/book-search',authMiddleware,fetchbooks);
Userrouter.post('/dashboard/book/:bookId',authMiddleware,createReadingHistory)

// Friends endpoints
Userrouter.get('/dashboard/friends/search', authMiddleware, searchPeople);
Userrouter.post('/dashboard/friends/request', authMiddleware, sendFriendRequest);
Userrouter.post('/dashboard/friends/respond', authMiddleware, respondToRequest);
Userrouter.post('/dashboard/friends/cancel', authMiddleware, cancelPending);
Userrouter.delete('/dashboard/friends/:id', authMiddleware, unfriend);
Userrouter.get('/dashboard/friends',authMiddleware,FriendRequests);
Userrouter.get('/dashboard/friends/activity', authMiddleware, friendsActivity);

export default Userrouter;