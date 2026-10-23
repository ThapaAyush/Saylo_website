import express from 'express';
import { getQuestsList, claimQuest } from '../controllers/questController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getQuestsList);
router.post('/:id/claim', protect, claimQuest);

export default router;
