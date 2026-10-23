import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: 'Practicing English in the wild 🌍',
  },
  titleBadge: {
    type: String,
    default: 'ENGLISH EXPLORER',
  },
  nativeLanguage: {
    type: String,
    default: 'hindi',
  },
  interests: {
    type: [String],
    default: ['Gaming', 'Music', 'Tech'],
  },
  englishGoals: {
    type: [String],
    default: ['talk to people', 'understand content'],
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'explorer', 'casual_speaker', 'fluent_builder', 'vibe_master'],
    default: 'beginner',
  },
  streakCount: {
    type: Number,
    default: 1,
  },
  lastStreakDate: {
    type: Date,
    default: Date.now,
  },
  wordsLearned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
  }],
  storiesCompleted: {
    type: Number,
    default: 0,
  },
  creationsCompleted: {
    type: Number,
    default: 0,
  },
  conversationsCompleted: {
    type: Number,
    default: 0,
  },
  completedReadings: [{
    type: String,
  }],
  completedSpeakings: [{
    type: String,
  }],
  completedWritings: [{
    type: String,
  }],
  completedVocabulary: [{
    type: String,
  }],
  currentFocus: {
    type: [String],
    default: ['Past tense', 'Natural expressions', 'Speaking flow'],
  },
  vibePreference: {
    type: String,
    default: 'Casual',
  },
  badges: [{
    id: String,
    name: String,
    icon: String,
    unlockedAt: { type: Date, default: Date.now },
  }],
  completedQuests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
  }],
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
