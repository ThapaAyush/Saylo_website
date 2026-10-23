import Game from '../models/Game.js';
import Profile from '../models/Profile.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

export const getGamesList = async (req, res) => {
  try {
    const games = await Game.find({ active: true });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findOne({
      $or: [{ gameId: req.params.gameId }, { _id: req.params.gameId.match(/^[0-9a-fA-F]{24}$/) ? req.params.gameId : null }]
    });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitGameScore = async (req, res) => {
  try {
    const { score = 0, roundsPlayed = 0, gameId } = req.body;
    const xpEarned = Math.max(10, Math.floor(score * 1.5));

    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        await profile.save();

        await AnalyticsEvent.create({
          eventType: 'game_completed',
          userId: req.user._id,
          metadata: { gameId, score },
        });
      }
    }

    res.json({
      success: true,
      score,
      message: 'Game completed!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
