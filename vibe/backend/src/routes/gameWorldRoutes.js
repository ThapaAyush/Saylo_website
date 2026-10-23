import express from 'express';
import { optionalAuth, protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getGameMap,
  getLevelDetails,
  submitLevel,
  aiEnhanceLevel,
  refillEnergy,
  deductHeart,
  regenHeart,
  adminGetLevels,
  adminUpdateLevel,
  adminGetAnalytics,
} from '../controllers/gameWorldController.js';

const router = express.Router();

// Public / Learner Routes (with optionalAuth for guest & signed in users)
router.get('/map', optionalAuth, getGameMap);
router.get('/levels/:levelNumber', optionalAuth, getLevelDetails);
router.post('/levels/:levelNumber/submit', optionalAuth, submitLevel);
router.post('/levels/:levelNumber/ai-enhance', optionalAuth, aiEnhanceLevel);
router.post('/energy/refill', optionalAuth, refillEnergy);
router.post('/energy/deduct', optionalAuth, deductHeart);
router.post('/energy/regen', optionalAuth, regenHeart);

// Admin Routes (Development / Demo mode)
router.get('/admin/levels', adminGetLevels);
router.put('/admin/levels/:levelNumber', adminUpdateLevel);
router.get('/admin/analytics', adminGetAnalytics);

export default router;
