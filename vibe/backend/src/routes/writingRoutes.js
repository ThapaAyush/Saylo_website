import express from 'express';
import {
  getWritingPrompts,
  getWritingPromptById,
  generateVibes,
  getWritingFeedback,
  submitWriting,
} from '../controllers/writingController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/prompts', optionalAuth, getWritingPrompts);
router.get('/prompts/:id', optionalAuth, getWritingPromptById);
router.post('/transform-vibes', optionalAuth, generateVibes);
router.post('/feedback', optionalAuth, getWritingFeedback);
router.post('/submit', protect, submitWriting);

export default router;
