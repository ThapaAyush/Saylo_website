import mongoose from 'mongoose';

const writingSubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WritingPrompt',
  },
  promptTitle: String,
  category: String,
  originalText: {
    type: String,
    required: true,
  },
  selectedVibe: {
    type: String,
    default: 'Casual',
  },
  vibesGenerated: [{
    vibe: String,
    text: String,
  }],
  aiFeedback: {
    better: String,
    why: String,
    tryAgainExercise: {
      sentenceWithBlank: String,
      correctWord: String,
    },
    naturalnessScore: Number,
  },
  postedToCommunity: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('WritingSubmission', writingSubmissionSchema);
