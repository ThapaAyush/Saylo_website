import mongoose from 'mongoose';

const gameWorldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    default: '',
  },
  checkpointTitle: {
    type: String,
    default: '',
  },
  colorTheme: {
    primary: { type: String, default: '#8B5CF6' },
    secondary: { type: String, default: '#22D3EE' },
    accent: { type: String, default: '#A3E635' },
    bgGradient: { type: String, default: 'from-emerald-950/40 via-purple-950/30 to-[#09090B]' },
  },
  badgeIcon: {
    type: String,
    default: '🌱',
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('GameWorld', gameWorldSchema);
