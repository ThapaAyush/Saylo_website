import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import vocabularyRoutes from './routes/vocabularyRoutes.js';
import readingRoutes from './routes/readingRoutes.js';
import writingRoutes from './routes/writingRoutes.js';
import speakingRoutes from './routes/speakingRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import questRoutes from './routes/questRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import gameWorldRoutes from './routes/gameWorldRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'https://saylo-frontend.vercel.app',
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1')
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/reading', readingRoutes);
app.use('/api/writing', writingRoutes);
app.use('/api/speaking', speakingRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/posts', socialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/game', gameWorldRoutes);

// Root welcome & status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Saylo — English Learning Platform API',
    tagline: 'Say it. Mean it. Own it.',
    health: '/api/health',
    frontend: process.env.FRONTEND_URL || 'https://saylo-frontend.vercel.app',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      vocabulary: '/api/vocabulary',
      reading: '/api/reading',
      writing: '/api/writing',
      speaking: '/api/speaking',
      game: '/api/game',
      quests: '/api/quests',
      posts: '/api/posts',
      admin: '/api/admin',
    },
    timestamp: new Date(),
  });
});

// Health check (responds to both /health and /api/health)
app.get(['/health', '/api/health'], (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Saylo — Say it. Mean it. Own it.',
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Backend Server Error]:', err);
  res.status(500).json({
    message: 'Something went sideways 😭',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Saylo Backend] Server listening on http://localhost:${PORT}`);
});

