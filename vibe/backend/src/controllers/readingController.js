import ReadingContent from '../models/ReadingContent.js';
import Profile from '../models/Profile.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

export const getReadingList = async (req, res) => {
  try {
    const { type, category, difficulty, search } = req.query;
    const filter = { active: true };

    if (type && type !== 'all') filter.type = type;
    if (category && category !== 'all') filter.category = category;
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await ReadingContent.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReadingById = async (req, res) => {
  try {
    const item = await ReadingContent.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Reading story not found' });
    item.viewsCount += 1;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeReading = async (req, res) => {
  try {
    const item = await ReadingContent.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Reading story not found' });

    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        profile.storiesCompleted += 1;
        await profile.save();

        await AnalyticsEvent.create({
          eventType: 'reading_completed',
          userId: req.user._id,
          metadata: { readingId: item._id, title: item.title, type: item.type },
        });
      }
    }

    res.json({ success: true, message: 'Story completed!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
