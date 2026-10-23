import mongoose from 'mongoose';

const userGameProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  currentLevel: {
    type: Number,
    default: 1,
  },
  completedLevels: [{
    type: Number,
  }],
  levelScores: [{
    levelNumber: { type: Number, required: true },
    score: { type: Number, default: 0 },
    stars: { type: Number, default: 1, min: 1, max: 3 },
    skills: {
      vocabulary: { type: Number, default: 80 },
      reading: { type: Number, default: 80 },
      writing: { type: Number, default: 80 },
      speaking: { type: Number, default: 80 },
    },
    completedAt: { type: Date, default: Date.now },
  }],
  skillScores: {
    vocabulary: { type: Number, default: 0 },
    reading: { type: Number, default: 0 },
    writing: { type: Number, default: 0 },
    speaking: { type: Number, default: 0 },
  },
  perfectLevels: [{
    type: Number,
  }],
  totalXP: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 1,
  },
  energy: {
    current: { type: Number, default: 5 },
    max: { type: Number, default: 5 },
    lastRefill: { type: Date, default: Date.now },
  },
  lastPlayed: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('UserGameProgress', userGameProgressSchema);
