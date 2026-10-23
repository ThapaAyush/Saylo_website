import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  levelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameLevel',
    required: true,
  },
  levelNumber: {
    type: Number,
    required: true,
    index: true,
  },
  skill: {
    type: String,
    enum: ['vocabulary', 'reading', 'writing', 'speaking'],
    required: true,
  },
  challengeNumber: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      'match',
      'fill-blank',
      'context-clash',
      'detective',
      'chat-reply',
      'tone-transform',
      'voice-roleplay',
      'comprehension',
    ],
    default: 'match',
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  prompt: {
    type: String,
    required: true,
  },
  contextText: {
    type: String,
    default: '',
  },
  dialogue: [{
    speaker: String,
    text: String,
  }],
  options: [{
    type: String,
  }],
  answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    default: '',
  },
  targetWord: {
    type: String,
    default: '',
  },
  speakingPrompt: {
    type: String,
    default: '',
  },
  xp: {
    type: Number,
    default: 30,
  },
  aiEnabled: {
    type: Boolean,
    default: true,
  },
  learningObjective: {
    type: String,
    default: '',
  },
  estimatedTime: {
    type: String,
    default: '1 min',
  },
}, { timestamps: true });

export default mongoose.model('Challenge', challengeSchema);
