import express from 'express';
import {
  getSpeakingScenarios,
  getSpeakingScenarioById,
  getAICharacters,
  startConversation,
  sendConversationMessage,
  completeConversation,
  transformSpeakingExpression,
  synthesizeSpeech,
} from '../controllers/speakingController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/scenarios', optionalAuth, getSpeakingScenarios);
router.get('/scenarios/:id', optionalAuth, getSpeakingScenarioById);
router.get('/characters', optionalAuth, getAICharacters);
router.post('/conversation/start', optionalAuth, startConversation);
router.post('/conversation/message', optionalAuth, sendConversationMessage);
router.post('/conversation/complete', optionalAuth, completeConversation);
router.post('/express/transform', optionalAuth, transformSpeakingExpression);
router.post('/synthesize', optionalAuth, synthesizeSpeech);

export default router;

