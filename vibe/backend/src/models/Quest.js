import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pillar: {
    type: String,
    enum: ['vocabulary', 'reading', 'writing', 'speaking', 'social', 'overall'],
    default: 'vocabulary',
  },
  targetType: {
    type: String,
    enum: ['learn_words', 'finish_readings', 'create_posts', 'have_conversations', 'streak_days', 'play_games'],
    required: true,
  },
  targetCount: {
    type: Number,
    required: true,
  },
  rewardXp: {
    type: Number,
    default: 50,
  },
  rewardBadge: {
    id: String,
    name: String,
    icon: String,
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'milestone'],
    default: 'weekly',
  },
  icon: {
    type: String,
    default: '🎯',
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('Quest', questSchema);
