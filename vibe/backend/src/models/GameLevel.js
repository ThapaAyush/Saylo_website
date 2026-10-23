import mongoose from 'mongoose';

const gameLevelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  worldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameWorld',
    required: true,
  },
  worldOrder: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  scenario: {
    setting: { type: String, default: '' },
    context: { type: String, default: '' },
    character: { type: String, default: 'AI Friend' },
    missionBrief: { type: String, default: '' },
  },
  xpReward: {
    type: Number,
    default: 150,
  },
  estimatedTime: {
    type: String,
    default: '4-6 min',
  },
  bossLevel: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  unlockLevel: {
    type: Number,
    default: 0,
  },
  learningObjectives: [{
    type: String,
  }],
  mapPosition: {
    x: { type: Number, required: true }, // percentage 15-85
    y: { type: Number, required: true }, // vertical coordinate in world map units
    pathOrder: { type: Number, default: 0 },
  },
}, { timestamps: true });

export default mongoose.model('GameLevel', gameLevelSchema);
