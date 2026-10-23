import express from 'express';
import {
  getVocabularyList,
  getVocabularyById,
  explainVocabulary,
  evaluateTryIt,
  bookmarkWord,
  markWordLearned,
  getMySavedWords,
  getBatchFiveWords,
  toggleCompleteWord,
  getCompletedVault,
} from '../controllers/vocabularyController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getVocabularyList);
router.get('/batch-five', optionalAuth, getBatchFiveWords);
router.get('/vault', protect, getCompletedVault);
router.get('/my/saved-words', protect, getMySavedWords);
router.post('/explain', optionalAuth, explainVocabulary);
router.post('/try-it', optionalAuth, evaluateTryIt);
router.get('/:id', optionalAuth, getVocabularyById);
router.post('/:id/bookmark', protect, bookmarkWord);
router.post('/:id/learn', protect, markWordLearned);
router.post('/:id/toggle-complete', protect, toggleCompleteWord);

export default router;
