import express from 'express';
import { getGamesList, getGameById, submitGameScore } from '../controllers/gameController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getGamesList);
router.get('/:gameId', optionalAuth, getGameById);
router.post('/:gameId/score', optionalAuth, submitGameScore);

export default router;
