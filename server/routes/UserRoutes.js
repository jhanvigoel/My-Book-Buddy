import express from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';
import { getProfilePhoto, getUserProfile, uploadProfilePhoto } from '../controllers/profileController.js';
import { createReadingHistory, getReadingHistory } from '../controllers/ReadingHistory.js';
import { searchPeople, sendFriendRequest, respondToRequest, cancelPending, unfriend, FriendRequests, friendsActivity } from '../controllers/friends.js';
import { fetchbooks } from '../controllers/books.js';
import { createReview, getReview } from '../controllers/ReviewController.js';

const Userrouter = express.Router();

Userrouter.get('/dashboard/profile', authMiddleware, getUserProfile);
Userrouter.get('/dashboard/profile/upload-photo',authMiddleware,getProfilePhoto);
Userrouter.post('/dashboard/profile/upload-photo',authMiddleware,uploadProfilePhoto);
Userrouter.get('/dashboard', authMiddleware,getReadingHistory);
Userrouter.get('/dashboard/book-search',authMiddleware,fetchbooks);
Userrouter.post('/dashboard/book/:bookId',authMiddleware,createReadingHistory)
Userrouter.post('/dashboard/book/:bookId/reviews',authMiddleware,createReview);
Userrouter.get('/dashboard/book/:bookId/reviews',authMiddleware,getReview);

Userrouter.get('/dashboard/friends/search', authMiddleware, searchPeople);
Userrouter.post('/dashboard/friends/request', authMiddleware, sendFriendRequest);
Userrouter.post('/dashboard/friends/respond', authMiddleware, respondToRequest);
Userrouter.post('/dashboard/friends/cancel', authMiddleware, cancelPending);
Userrouter.delete('/dashboard/friends/:id', authMiddleware, unfriend);
Userrouter.get('/dashboard/friends',authMiddleware,FriendRequests);
Userrouter.get('/dashboard/friends/activity', authMiddleware, friendsActivity);

export default Userrouter;