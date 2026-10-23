import express from 'express';
import { register, login, googleLogin, getMe, updateOnboarding } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', protect, getMe);
router.post('/onboarding', protect, updateOnboarding);

export default router;
