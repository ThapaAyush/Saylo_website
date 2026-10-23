import mongoose from 'mongoose';

const speakingScenarioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  scenarioId: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Café', 'Airport', 'Party', 'Job interview', 'Meeting', 
      'Shopping', 'Travel', 'Gaming', 'Restaurant', 'Meeting someone new', 
      'Asking for help', 'Small talk', 'Disagreeing politely', 'College'
    ],
  },
  emoji: {
    type: String,
    default: '🎙️',
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  context: {
    type: String,
    required: true,
  },
  defaultCharacter: {
    type: String,
    default: 'Alex',
  },
  starterPrompt: {
    type: String,
    required: true,
  },
  firstBotMessage: {
    type: String,
    required: true,
  },
  objectives: [String],
  targetVocabulary: [String],
  targetGrammar: [String],
  feedbackRules: String,
  active: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('SpeakingScenario', speakingScenarioSchema);
