import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phonetic: {
    type: String,
    default: '',
  },
  meaning: {
    type: String,
    required: true,
  },
  sequenceNumber: {
    type: Number,
    index: true,
  },
  category: {
    type: String,
    required: true,
    default: 'everyday',
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  tone: {
    type: String,
    default: 'Casual',
  },
  formality: {
    type: Number,
    min: 1,
    max: 10,
    default: 3,
  },
  energy: {
    type: Number,
    min: 1,
    max: 10,
    default: 7,
  },
  commonness: {
    type: Number,
    min: 1,
    max: 10,
    default: 8,
  },
  isSlang: {
    type: Boolean,
    default: false,
  },
  synonyms: [String],
  antonyms: [String],
  similarWords: [String],
  dontUseIn: {
    type: String,
    default: 'formal business writing or legal docs',
  },
  examples: [String],
  caughtInTheWild: {
    quote: String,
    context: String,
    highlight: String,
    miniChallenge: {
      friendPrompt: String,
      expectedAnswerSample: String,
      explanation: String,
    },
  },
  hindiMeaning: {
    type: String,
    default: '',
  },
  hindiExample: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model('Vocabulary', vocabularySchema);
