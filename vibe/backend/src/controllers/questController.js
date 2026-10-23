import Quest from '../models/Quest.js';
import Profile from '../models/Profile.js';

export const getQuestsList = async (req, res) => {
  try {
    const quests = await Quest.find({ active: true });
    let completedQuestIds = [];

    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        completedQuestIds = profile.completedQuests.map(id => id.toString());
      }
    }

    const formatted = quests.map(q => ({
      ...q.toObject(),
      isClaimed: completedQuestIds.includes(q._id.toString()),
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const claimQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ message: 'Quest not found' });

    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    if (profile.completedQuests.includes(quest._id)) {
      return res.status(400).json({ message: 'Quest reward already claimed' });
    }

    profile.completedQuests.push(quest._id);

    if (quest.rewardBadge?.name) {
      profile.badges.push({
        id: quest.rewardBadge.id || 'badge_' + Date.now(),
        name: quest.rewardBadge.name,
        icon: quest.rewardBadge.icon || '🏅',
      });
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Quest claimed!',
      badges: profile.badges,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
