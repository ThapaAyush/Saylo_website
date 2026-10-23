import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Report from '../models/Report.js';
import Profile from '../models/Profile.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

export const getPosts = async (req, res) => {
  try {
    const { tag, search, limit = 30, page = 1 } = req.query;
    const filter = {};
    if (tag && tag !== 'all') filter.tags = tag;
    if (search) {
      filter.content = { $regex: search, $options: 'i' };
    }

    const posts = await Post.find(filter)
      .sort({ isPinned: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(filter);

    res.json({
      posts,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, promptTag = 'Community Vibe', tags = ['Expression'], highlightExpression } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content cannot be empty' });
    }

    const profile = await Profile.findOne({ user: req.user._id });

    const post = await Post.create({
      author: req.user._id,
      authorUsername: req.user.username,
      authorDisplayName: req.user.displayName,
      authorAvatar: req.user.avatar || '⚡',
      authorBadge: profile?.titleBadge || 'ENGLISH EXPLORER',
      content: content.trim(),
      promptTag,
      tags,
      highlightExpression,
    });

    await AnalyticsEvent.create({
      eventType: 'post_created',
      userId: req.user._id,
      metadata: { postId: post._id },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reactToPost = async (req, res) => {
  try {
    const { type } = req.body; // 'fire', 'skull', 'hundred', 'handshake'
    const validTypes = ['fire', 'skull', 'hundred', 'handshake'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Increment reaction count
    post.reactions[type] = (post.reactions[type] || 0) + 1;
    await post.save();

    res.json({ reactions: post.reactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      post: post._id,
      author: req.user._id,
      authorUsername: req.user.username,
      authorDisplayName: req.user.displayName,
      authorAvatar: req.user.avatar || '⚡',
      text: text.trim(),
    });

    post.commentsCount += 1;
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reportContent = async (req, res) => {
  try {
    const { contentType, contentId, reason } = req.body;
    if (!contentType || !contentId || !reason) {
      return res.status(400).json({ message: 'Content type, ID, and reason are required' });
    }

    const report = await Report.create({
      reporter: req.user._id,
      contentType,
      contentId,
      reason,
    });

    res.status(201).json({ message: 'Report submitted for review', reportId: report._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
