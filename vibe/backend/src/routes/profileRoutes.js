import express from 'express';
import {
  getProfile,
  updateProfile,
  addXp,
  getDailyDrop,
  getForYou,
  completeActivity,
  getActivityCompletions,
} from '../controllers/profileController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/xp', protect, addXp);
router.get('/daily-drop', optionalAuth, getDailyDrop);
router.get('/for-you', optionalAuth, getForYou);
router.post('/activity-complete', optionalAuth, completeActivity);
router.get('/activity-completions', optionalAuth, getActivityCompletions);

export default router;

