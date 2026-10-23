import mongoose from 'mongoose';

const writingPromptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Text someone',
      'Caption this',
      'Hot take',
      'Continue the story',
      'Make it funnier',
      'Make it professional',
      'Explain this',
      'Tell a story',
      'Describe a picture',
      'Reply to a message'
    ],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  prompt: {
    type: String,
    required: true,
  },
  situationContext: String,
  sampleIncomingText: String, // E.g., incoming message to reply to
  imageUrl: String, // For caption this or describe a picture
  tips: [String],
  targetLength: {
    type: String,
    default: '1-3 sentences',
  },
  active: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  submissionsCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model('WritingPrompt', writingPromptSchema);
