import WritingPrompt from '../models/WritingPrompt.js';
import WritingSubmission from '../models/WritingSubmission.js';
import Post from '../models/Post.js';
import Profile from '../models/Profile.js';
import { WritingFeedbackService } from '../ai/WritingFeedbackService.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

export const getWritingPrompts = async (req, res) => {
  try {
    const { category, search, difficulty } = req.query;
    const filter = { active: true };
    if (category && category !== 'all') filter.category = category;
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { prompt: { $regex: search, $options: 'i' } },
      ];
    }
    const prompts = await WritingPrompt.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWritingPromptById = async (req, res) => {
  try {
    const prompt = await WritingPrompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
    res.json(prompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateVibes = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Input text is required' });
    }

    const vibes = await WritingFeedbackService.getVibes(text);
    res.json({ original: text, vibes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWritingFeedback = async (req, res) => {
  try {
    const { text, promptContext } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Text is required for feedback' });
    }

    const feedback = await WritingFeedbackService.getEvaluation(text, promptContext);
    res.json({
      yourVersion: text,
      ...feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitWriting = async (req, res) => {
  try {
    const {
      promptId,
      originalText,
      selectedVibe = 'Casual',
      vibesGenerated = [],
      feedback,
      postToFeed = false,
    } = req.body;

    let promptTitle = 'Free Creative Prompt';
    let category = 'Create';

    if (promptId) {
      const promptDoc = await WritingPrompt.findById(promptId);
      if (promptDoc) {
        promptTitle = promptDoc.title;
        category = promptDoc.category;
        promptDoc.submissionsCount += 1;
        await promptDoc.save();
      }
    }

    const submission = await WritingSubmission.create({
      user: req.user._id,
      prompt: promptId || null,
      promptTitle,
      category,
      originalText,
      selectedVibe,
      vibesGenerated,
      aiFeedback: feedback,
      postedToCommunity: postToFeed,
    });

    // Update user profile progress
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      profile.creationsCompleted += 1;
      await profile.save();
    }

    // If user opts to share with community
    if (postToFeed) {
      await Post.create({
        author: req.user._id,
        authorUsername: req.user.username,
        authorDisplayName: req.user.displayName,
        authorAvatar: req.user.avatar || '⚡',
        authorBadge: profile?.titleBadge || 'ENGLISH EXPLORER',
        content: originalText,
        promptTag: promptTitle,
        tags: [category, selectedVibe],
      });
    }

    await AnalyticsEvent.create({
      eventType: 'writing_submitted',
      userId: req.user._id,
      metadata: { submissionId: submission._id, category },
    });

    res.status(201).json({
      success: true,
      message: 'Creation saved!',
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
