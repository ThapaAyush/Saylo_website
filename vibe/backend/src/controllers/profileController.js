import Profile from '../models/Profile.js';
import { PersonalizationService } from '../ai/PersonalizationService.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('wordsLearned', 'word meaning tone');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { bio, titleBadge, nativeLanguage, interests, vibePreference, currentFocus, level } = req.body;
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    if (level !== undefined) profile.level = level;

    if (bio !== undefined) profile.bio = bio;
    if (titleBadge !== undefined) profile.titleBadge = titleBadge;
    if (nativeLanguage !== undefined) profile.nativeLanguage = nativeLanguage;
    if (interests !== undefined) profile.interests = interests;
    if (vibePreference !== undefined) profile.vibePreference = vibePreference;
    if (currentFocus !== undefined) profile.currentFocus = currentFocus;

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addXp = async (req, res) => {
  try {
    const { amount = 20, activityType = 'lesson_completed' } = req.body;
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // Check streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDate = profile.lastStreakDate ? new Date(profile.lastStreakDate) : null;
    if (lastDate) {
      lastDate.setHours(0, 0, 0, 0);
      const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        profile.streakCount += 1;
        profile.lastStreakDate = new Date();
      } else if (diffDays > 1) {
        profile.streakCount = 1;
        profile.lastStreakDate = new Date();
      }
    } else {
      profile.streakCount = 1;
      profile.lastStreakDate = new Date();
    }

    if (activityType === 'reading_completed') profile.storiesCompleted += 1;
    if (activityType === 'writing_submitted') profile.creationsCompleted += 1;
    if (activityType === 'speaking_completed') profile.conversationsCompleted += 1;

    await profile.save();

    // Track analytics event
    await AnalyticsEvent.create({
      eventType: activityType,
      userId: req.user._id,
      metadata: { activityType },
    });

    res.json({
      streakCount: profile.streakCount,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailyDrop = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const drop = await PersonalizationService.getDailyDrop(userId);
    res.json(drop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getForYou = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const feed = await PersonalizationService.getForYouFeed(userId);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeActivity = async (req, res) => {
  try {
    const { type, id } = req.body;
    if (!type || !id) {
      return res.status(400).json({ message: 'Both type and id are required' });
    }

    const strId = String(id).trim();

    if (req.user) {
      let profile = await Profile.findOne({ user: req.user._id });
      if (!profile) {
        profile = new Profile({ user: req.user._id });
      }

      if (!profile.completedSpeakings) profile.completedSpeakings = [];
      if (!profile.completedReadings) profile.completedReadings = [];
      if (!profile.completedWritings) profile.completedWritings = [];
      if (!profile.completedVocabulary) profile.completedVocabulary = [];

      let isNewCompletion = false;

      if (type === 'speaking') {
        if (!profile.completedSpeakings.includes(strId)) {
          profile.completedSpeakings.push(strId);
          profile.conversationsCompleted = (profile.conversationsCompleted || 0) + 1;
          isNewCompletion = true;
        }
      } else if (type === 'reading') {
        if (!profile.completedReadings.includes(strId)) {
          profile.completedReadings.push(strId);
          profile.storiesCompleted = (profile.storiesCompleted || 0) + 1;
          isNewCompletion = true;
        }
      } else if (type === 'writing') {
        if (!profile.completedWritings.includes(strId)) {
          profile.completedWritings.push(strId);
          profile.creationsCompleted = (profile.creationsCompleted || 0) + 1;
          isNewCompletion = true;
        }
      } else if (type === 'vocabulary') {
        if (!profile.completedVocabulary.includes(strId)) {
          profile.completedVocabulary.push(strId);
          isNewCompletion = true;
        }
      }

      // Update streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastDate = profile.lastStreakDate ? new Date(profile.lastStreakDate) : null;
      if (lastDate) {
        lastDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          profile.streakCount += 1;
          profile.lastStreakDate = new Date();
        } else if (diffDays > 1) {
          profile.streakCount = 1;
          profile.lastStreakDate = new Date();
        }
      } else {
        profile.streakCount = 1;
        profile.lastStreakDate = new Date();
      }

      await profile.save();

      return res.json({
        success: true,
        isNewCompletion,
        completedSpeakings: profile.completedSpeakings,
        completedReadings: profile.completedReadings,
        completedWritings: profile.completedWritings,
        completedVocabulary: profile.completedVocabulary,
        streakCount: profile.streakCount,
      });
    }

    // Guest response
    return res.json({
      success: true,
      isGuest: true,
      type,
      id: strId,
    });
  } catch (error) {
    console.error('Error completing activity:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getActivityCompletions = async (req, res) => {
  try {
    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        return res.json({
          completedSpeakings: profile.completedSpeakings || [],
          completedReadings: profile.completedReadings || [],
          completedWritings: profile.completedWritings || [],
          completedVocabulary: profile.completedVocabulary || [],
        });
      }
    }

    res.json({
      completedSpeakings: [],
      completedReadings: [],
      completedWritings: [],
      completedVocabulary: [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

