import express from 'express';
import {
  getAdminAnalytics,
  getAdminUsers,
  toggleUserBlock,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
  createReading,
  updateReading,
  deleteReading,
  createWritingPrompt,
  updateWritingPrompt,
  deleteWritingPrompt,
  createSpeakingScenario,
  updateSpeakingScenario,
  deleteSpeakingScenario,
  updateAICharacter,
  generateAIContent,
  getAdminReports,
  updateReportStatus,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// In development/demo, allow easy admin inspection
router.get('/analytics', getAdminAnalytics);
router.get('/users', getAdminUsers);
router.put('/users/:id/block', toggleUserBlock);

router.post('/vocabulary', createVocabulary);
router.put('/vocabulary/:id', updateVocabulary);
router.delete('/vocabulary/:id', deleteVocabulary);

router.post('/reading', createReading);
router.put('/reading/:id', updateReading);
router.delete('/reading/:id', deleteReading);

router.post('/writing', createWritingPrompt);
router.put('/writing/:id', updateWritingPrompt);
router.delete('/writing/:id', deleteWritingPrompt);

router.post('/speaking', createSpeakingScenario);
router.put('/speaking/:id', updateSpeakingScenario);
router.delete('/speaking/:id', deleteSpeakingScenario);

router.put('/characters/:id', updateAICharacter);
router.post('/ai/generate', generateAIContent);

router.get('/reports', getAdminReports);
router.put('/reports/:id', updateReportStatus);

export default router;
