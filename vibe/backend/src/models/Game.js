import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['word_rush', 'word_detective', 'word_battle', 'guess_the_vibe', 'say_it_better', 'context_clash'],
    required: true,
  },
  tagline: String,
  emoji: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'spicy'],
    default: 'medium',
  },
  timeLimitSec: {
    type: Number,
    default: 45,
  },
  instructions: String,
  rounds: [{
    roundNumber: Number,
    prompt: String,
    context: String,
    forbiddenWords: [String], // for Word Battle
    options: [String],
    correctAnswer: String,
    explanation: String,
    clues: [String],
  }],
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);
