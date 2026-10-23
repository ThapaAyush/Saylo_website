import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorUsername: String,
  authorDisplayName: String,
  authorAvatar: String,
  authorBadge: String,
  content: {
    type: String,
    required: true,
  },
  promptTag: {
    type: String,
    default: 'Free Expression',
  },
  tags: [String],
  highlightExpression: {
    phrase: String,
    meaning: String,
    vibe: String,
  },
  reactions: {
    fire: { type: Number, default: 0 },
    skull: { type: Number, default: 0 },
    hundred: { type: Number, default: 0 },
    handshake: { type: Number, default: 0 },
  },
  userReactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: String,
  }],
  commentsCount: {
    type: Number,
    default: 0,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
