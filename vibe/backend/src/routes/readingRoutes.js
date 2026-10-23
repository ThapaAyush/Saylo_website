import express from 'express';
import { getReadingList, getReadingById, completeReading } from '../controllers/readingController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getReadingList);
router.get('/:id', optionalAuth, getReadingById);
router.post('/:id/complete', optionalAuth, completeReading);

export default router;
