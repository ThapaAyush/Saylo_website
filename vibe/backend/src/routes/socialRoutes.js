import express from 'express';
import {
  getPosts,
  createPost,
  reactToPost,
  getPostComments,
  addComment,
  reportContent,
} from '../controllers/socialController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/posts', optionalAuth, getPosts);
router.post('/posts', protect, createPost);
router.post('/posts/:id/react', optionalAuth, reactToPost);
router.get('/posts/:id/comments', optionalAuth, getPostComments);
router.post('/posts/:id/comments', protect, addComment);
router.post('/report', protect, reportContent);

export default router;
