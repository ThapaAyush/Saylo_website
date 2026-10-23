import mongoose from 'mongoose';

const readingContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['chat_story', 'interactive_story', 'article', 'short_story'],
    default: 'chat_story',
  },
  category: {
    type: String,
    enum: ['gaming', 'culture', 'social', 'tech', 'work', 'college', 'lifestyle'],
    default: 'social',
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  estimatedTime: {
    type: String,
    default: '60 sec',
  },
  summary: String,
  content: String, // For articles / stories
  chatMessages: [{
    sender: String,
    text: String,
    isUser: Boolean,
    time: String,
  }],
  branchingStory: {
    scenario: String,
    startNodeId: String,
    nodes: [{
      nodeId: String,
      speaker: String,
      message: String,
      choices: [{
        text: String,
        nextNodeId: String,
        feedback: String,
        isBestNatural: Boolean,
      }],
    }],
  },
  questions: [{
    question: String,
    options: [String],
    correctIndex: Number,
    explanation: String,
  }],
  vocabulary: [String],
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

export default mongoose.model('ReadingContent', readingContentSchema);
