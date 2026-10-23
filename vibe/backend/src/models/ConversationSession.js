import mongoose from 'mongoose';

const conversationSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AICharacter',
  },
  scenario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SpeakingScenario',
  },
  characterName: String,
  scenarioTitle: String,
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
  metrics: {
    fluency: { type: Number, default: 0 },
    vocabulary: { type: Number, default: 0 },
    grammar: { type: Number, default: 0 },
    naturalness: { type: Number, default: 0 },
  },
  quickFixes: [{
    youSaid: String,
    natural: String,
    explanation: String,
  }],
  completedAt: Date,
}, { timestamps: true });

export default mongoose.model('ConversationSession', conversationSessionSchema);
