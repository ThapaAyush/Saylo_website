import mongoose from 'mongoose';

const aiCharacterSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'Friend',
  },
  avatar: {
    type: String,
    default: '😎',
  },
  avatarColor: {
    type: String,
    default: '#8B5CF6',
  },
  personality: {
    type: String,
    required: true,
  },
  vocabularyStyle: String,
  speakingStyle: String,
  scenarioPreferences: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  systemPrompt: {
    type: String,
    required: true,
  },
  initialGreeting: {
    type: String,
    default: "Yo! What's up?",
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('AICharacter', aiCharacterSchema);
