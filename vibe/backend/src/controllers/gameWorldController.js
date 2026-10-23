import GameWorld from '../models/GameWorld.js';
import GameLevel from '../models/GameLevel.js';
import Challenge from '../models/Challenge.js';
import UserGameProgress from '../models/UserGameProgress.js';
import Profile from '../models/Profile.js';

// STRICT RULE: Next level opens ONLY if user earns FULL 3 STARS!
// A level is completed ONLY IF it has earned 3 stars!
export const computeStrictProgress = (progress) => {
  if (!progress) return progress;
  const scores = progress.levelScores || [];

  // Map each level number to the highest stars earned
  const starsMap = new Map();
  scores.forEach((s) => {
    const existing = starsMap.get(s.levelNumber) || 0;
    if (s.stars > existing) {
      starsMap.set(s.levelNumber, s.stars);
    }
  });

  const completed3Stars = [];
  let highestUnlocked = 1;

  // STRICT RULE: Next level opens ONLY IF previous level earned FULL 3 STARS!
  // If ANY level does not have 3 stars, progression stops at that exact level.
  for (let lvl = 1; lvl <= 30; lvl++) {
    const stars = starsMap.get(lvl) || 0;
    if (stars === 3) {
      completed3Stars.push(lvl);
      highestUnlocked = Math.min(30, lvl + 1);
    } else {
      // Level lvl does NOT have 3 stars. The player must play this exact level!
      highestUnlocked = lvl;
      break;
    }
  }

  progress.currentLevel = highestUnlocked;
  progress.completedLevels = completed3Stars;
  return progress;
};

export const getGameMap = async (req, res) => {
  try {
    const worlds = await GameWorld.find({ active: true }).sort({ order: 1 });
    const levels = await GameLevel.find({ active: true }).sort({ levelNumber: 1 });

    let progress = null;
    if (req.user) {
      progress = await UserGameProgress.findOne({ userId: req.user._id });
      if (!progress) {
        progress = await UserGameProgress.create({
          userId: req.user._id,
          currentLevel: 1,
          completedLevels: [],
          levelScores: [],
          skillScores: { vocabulary: 0, reading: 0, writing: 0, speaking: 0 },
          totalXP: 0,
          streak: 1,
          energy: { current: 5, max: 5, lastRefill: new Date() },
        });
      }
    } else {
      // Default guest progress
      progress = {
        currentLevel: 1,
        completedLevels: [],
        levelScores: [],
        skillScores: { vocabulary: 80, reading: 80, writing: 80, speaking: 80 },
        perfectLevels: [],
        totalXP: 0,
        streak: 1,
        energy: { current: 5, max: 5, lastRefill: new Date() },
      };
    }

    if (progress) {
      computeStrictProgress(progress);
      if (req.user) {
        await progress.save();
      }
    }

    // Time-based heart regeneration (1 heart every 5 minutes when < 5)
    const REFILL_INTERVAL_MS = 5 * 60 * 1000;
    const now = Date.now();
    if (progress && progress.energy && progress.energy.current < 5) {
      const last = new Date(progress.energy.lastRefill || now).getTime();
      const elapsed = Math.max(0, now - last);
      const heartsToAdd = Math.floor(elapsed / REFILL_INTERVAL_MS);
      if (heartsToAdd > 0) {
        const newCurrent = Math.min(5, progress.energy.current + heartsToAdd);
        if (newCurrent >= 5) {
          progress.energy.current = 5;
          progress.energy.lastRefill = new Date(now);
        } else {
          progress.energy.current = newCurrent;
          progress.energy.lastRefill = new Date(last + heartsToAdd * REFILL_INTERVAL_MS);
        }
        if (req.user) {
          await progress.save();
        }
      }
    }

    res.json({
      worlds,
      levels,
      progress,
    });
  } catch (error) {
    console.error('[Game Controller] Error getting map:', error);
    res.status(500).json({ message: 'Failed to load game adventure map', error: error.message });
  }
};

export const getLevelDetails = async (req, res) => {
  try {
    const levelNumber = parseInt(req.params.levelNumber, 10);
    const level = await GameLevel.findOne({ levelNumber });
    if (!level) {
      return res.status(404).json({ message: `Level ${levelNumber} not found` });
    }

    const world = await GameWorld.findById(level.worldId);
    const challenges = await Challenge.find({ levelNumber }).sort({ challengeNumber: 1 });

    res.json({
      level,
      world,
      challenges,
    });
  } catch (error) {
    console.error('[Game Controller] Error getting level details:', error);
    res.status(500).json({ message: 'Failed to load level details', error: error.message });
  }
};

export const submitLevel = async (req, res) => {
  try {
    const levelNumber = parseInt(req.params.levelNumber, 10);
    const { answers = [], durationSeconds = 120 } = req.body;

    const level = await GameLevel.findOne({ levelNumber });
    if (!level) {
      return res.status(404).json({ message: `Level ${levelNumber} not found` });
    }

    const challenges = await Challenge.find({ levelNumber }).sort({ challengeNumber: 1 });

    // Calculate score per skill
    const skillCounts = { vocabulary: 0, reading: 0, writing: 0, speaking: 0 };
    const skillCorrect = { vocabulary: 0, reading: 0, writing: 0, speaking: 0 };

    challenges.forEach((ch) => {
      const sk = ch.skill || 'vocabulary';
      skillCounts[sk] = (skillCounts[sk] || 0) + 1;

      const userAns = answers.find(
        (a) =>
          a.challengeId === ch._id.toString() ||
          a.challengeNumber === ch.challengeNumber
      );
      if (userAns) {
        if (ch.skill === 'speaking') {
          // Voice challenge: if user provided spoken response or selected speech option
          skillCorrect.speaking += 1;
        } else if (
          userAns.isCorrect === true ||
          (userAns.answer &&
            userAns.answer.trim().toLowerCase() === ch.answer.trim().toLowerCase())
        ) {
          skillCorrect[sk] += 1;
        } else {
          // Incorrect answer: 0 credit
          skillCorrect[sk] += 0;
        }
      } else {
        skillCorrect[sk] += 0;
      }
    });

    const telemetry = {
      vocabulary: Math.min(
        100,
        Math.round(((skillCorrect.vocabulary || 0) / (skillCounts.vocabulary || 1)) * 100)
      ),
      reading: Math.min(
        100,
        Math.round(((skillCorrect.reading || 0) / (skillCounts.reading || 1)) * 100)
      ),
      writing: Math.min(
        100,
        Math.round(((skillCorrect.writing || 0) / (skillCounts.writing || 1)) * 100)
      ),
      speaking: Math.min(
        100,
        Math.round(((skillCorrect.speaking || 0) / (skillCounts.speaking || 1)) * 100)
      ),
    };

    const overallScore = Math.round(
      (telemetry.vocabulary + telemetry.reading + telemetry.writing + telemetry.speaking) / 4
    );

    let stars = 1;
    if (overallScore >= 88) stars = 3;
    else if (overallScore >= 60) stars = 2;

    const isPerfect = stars === 3;
    const baseXP = level.xpReward || 150;
    const xpEarned = isPerfect ? baseXP + 100 : (stars === 2 ? baseXP + 25 : baseXP);
    const nextLevel = Math.min(30, levelNumber + 1);
    let newLevelUnlocked = false;

    if (req.user) {
      let progress = await UserGameProgress.findOne({ userId: req.user._id });
      if (!progress) {
        progress = new UserGameProgress({ userId: req.user._id });
      }

      // STRICT 3-STAR LEVEL UNLOCK RULE:
      // "when user will get 3 start for that quiz then only we open next one"
      if (stars === 3) {
        if (!progress.completedLevels.includes(levelNumber)) {
          progress.completedLevels.push(levelNumber);
        }

        if (progress.currentLevel === levelNumber && levelNumber < 30) {
          progress.currentLevel = nextLevel;
          newLevelUnlocked = true;
        }

        if (!progress.perfectLevels.includes(levelNumber)) {
          progress.perfectLevels.push(levelNumber);
        }
      }

      progress.totalXP = (progress.totalXP || 0) + xpEarned;
      progress.lastPlayed = new Date();

      // Update skill scores averages
      progress.skillScores.vocabulary = Math.round(
        ((progress.skillScores.vocabulary || 80) + telemetry.vocabulary) / 2
      );
      progress.skillScores.reading = Math.round(
        ((progress.skillScores.reading || 80) + telemetry.reading) / 2
      );
      progress.skillScores.writing = Math.round(
        ((progress.skillScores.writing || 80) + telemetry.writing) / 2
      );
      progress.skillScores.speaking = Math.round(
        ((progress.skillScores.speaking || 80) + telemetry.speaking) / 2
      );

      // Save level score entry (preserve highest stars)
      const existingScoreIdx = progress.levelScores.findIndex(
        (s) => s.levelNumber === levelNumber
      );
      const scoreEntry = {
        levelNumber,
        score: overallScore,
        stars,
        skills: telemetry,
        completedAt: new Date(),
      };

      if (existingScoreIdx >= 0) {
        if (stars > progress.levelScores[existingScoreIdx].stars) {
          progress.levelScores[existingScoreIdx] = scoreEntry;
        }
      } else {
        progress.levelScores.push(scoreEntry);
      }

      // Award +1 heart on level completion, capped at 5
      let heartAwarded = false;
      if (!progress.energy) {
        progress.energy = { current: 5, max: 5, lastRefill: new Date() };
      }
      if (progress.energy.current < 5) {
        progress.energy.current = Math.min(5, progress.energy.current + 1);
        heartAwarded = true;
        if (progress.energy.current === 5) {
          progress.energy.lastRefill = new Date();
        }
      }

      // Re-compute strict sequential progression based on full 3 stars
      computeStrictProgress(progress);

      if (stars === 3 && progress.currentLevel > levelNumber) {
        newLevelUnlocked = true;
      }

      await progress.save();
    } else {
      if (stars === 3 && levelNumber < 30) {
        newLevelUnlocked = true;
      }
    }

    res.json({
      success: true,
      levelNumber,
      score: overallScore,
      stars,
      isPerfect,
      xpEarned,
      telemetry,
      nextLevel: newLevelUnlocked ? nextLevel : (req.user ? progress?.currentLevel : (stars === 3 ? nextLevel : levelNumber)),
      newLevelUnlocked,
      bossCompleted: level.bossLevel,
      isFinalSummit: levelNumber === 30,
      heartAwarded: req.user ? true : false,
      energy: req.user ? (await UserGameProgress.findOne({ userId: req.user._id }))?.energy : { current: 5, max: 5, lastRefill: new Date() },
    });
  } catch (error) {
    console.error('[Game Controller] Error submitting level:', error);
    res.status(500).json({ message: 'Failed to submit level', error: error.message });
  }
};

export const aiEnhanceLevel = async (req, res) => {
  try {
    const levelNumber = parseInt(req.params.levelNumber, 10);
    const { interest = 'Tech' } = req.body;

    const level = await GameLevel.findOne({ levelNumber });
    if (!level) return res.status(404).json({ message: 'Level not found' });

    // Customized contextual flavor
    const variations = {
      Gaming: {
        setting: 'Discord Voice Lobby & Gaming Lounge',
        character: 'Squad Captain Ghost',
        missionBrief: `Sync up with your competitive gaming team and call the shots clearly before the tournament match.`,
      },
      Music: {
        setting: 'Underground Vinyl Lounge & Studio',
        character: 'Producer Maya',
        missionBrief: `Coordinate audio stems and discuss track vibes with fellow musicians.`,
      },
      Tech: {
        setting: 'Hacker House Innovation Lab',
        character: 'Lead Dev Alex',
        missionBrief: `Brainstorm rapid deployment strategy and sprint objectives for the AI hackathon.`,
      },
      Travel: {
        setting: 'Tokyo Shibuya Transit Terminal',
        character: 'Traveler Kenji',
        missionBrief: `Navigate express trains and discover hidden neighborhood ramen spots.`,
      },
    };

    const enhancedScenario = variations[interest] || variations.Tech;

    res.json({
      levelNumber,
      enhanced: true,
      scenario: {
        setting: enhancedScenario.setting,
        character: enhancedScenario.character,
        missionBrief: enhancedScenario.missionBrief,
        context: `Customized for your interest in ${interest}.`,
      },
    });
  } catch (error) {
    console.error('[Game Controller] Error enhancing level:', error);
    res.status(500).json({ message: 'Failed to enhance level', error: error.message });
  }
};

export const refillEnergy = async (req, res) => {
  try {
    if (req.user) {
      const progress = await UserGameProgress.findOne({ userId: req.user._id });
      if (progress) {
        progress.energy = { current: 5, max: 5, lastRefill: new Date() };
        await progress.save();
        return res.json({ success: true, energy: progress.energy });
      }
    }
    res.json({ success: true, energy: { current: 5, max: 5, lastRefill: new Date() } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to refill energy' });
  }
};

// Deduct 1 heart on incorrect answer (minimum 0)
export const deductHeart = async (req, res) => {
  try {
    let energy = { current: 5, max: 5, lastRefill: new Date() };
    if (req.user) {
      let progress = await UserGameProgress.findOne({ userId: req.user._id });
      if (!progress) {
        progress = new UserGameProgress({ userId: req.user._id });
      }
      if (!progress.energy) {
        progress.energy = { current: 5, max: 5, lastRefill: new Date() };
      }
      // If was at 5, start the 5-min timer
      if (progress.energy.current === 5) {
        progress.energy.lastRefill = new Date();
      }
      progress.energy.current = Math.max(0, progress.energy.current - 1);
      await progress.save();
      energy = progress.energy;
    } else {
      const { current = 5, lastRefill = new Date() } = req.body;
      const newCurrent = Math.max(0, current - 1);
      const newLastRefill = current === 5 ? new Date() : lastRefill;
      energy = { current: newCurrent, max: 5, lastRefill: newLastRefill };
    }

    res.json({
      success: true,
      energy,
    });
  } catch (error) {
    console.error('[Game Controller] Error deducting heart:', error);
    res.status(500).json({ message: 'Failed to deduct heart', error: error.message });
  }
};

// Regenerate 1 heart when 5-minute timer finishes (capped at 5)
export const regenHeart = async (req, res) => {
  try {
    let energy = { current: 5, max: 5, lastRefill: new Date() };
    if (req.user) {
      let progress = await UserGameProgress.findOne({ userId: req.user._id });
      if (progress && progress.energy) {
        if (progress.energy.current < 5) {
          progress.energy.current = Math.min(5, progress.energy.current + 1);
          progress.energy.lastRefill = new Date();
          await progress.save();
        }
        energy = progress.energy;
      }
    } else {
      const { current = 4 } = req.body;
      const newCurrent = Math.min(5, current + 1);
      energy = { current: newCurrent, max: 5, lastRefill: new Date() };
    }
    res.json({ success: true, energy });
  } catch (error) {
    console.error('[Game Controller] Error regenerating heart:', error);
    res.status(500).json({ message: 'Failed to regenerate heart' });
  }
};


// Admin Endpoints
export const adminGetLevels = async (req, res) => {
  try {
    const levels = await GameLevel.find().sort({ levelNumber: 1 });
    const worlds = await GameWorld.find().sort({ order: 1 });
    const challengesCount = await Challenge.aggregate([
      { $group: { _id: '$levelNumber', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    challengesCount.forEach((c) => {
      countMap[c._id] = c.count;
    });

    const enrichedLevels = levels.map((lvl) => ({
      ...lvl.toObject(),
      challengeCount: countMap[lvl.levelNumber] || 0,
    }));

    res.json({ levels: enrichedLevels, worlds });
  } catch (error) {
    res.status(500).json({ message: 'Admin failed to fetch levels', error: error.message });
  }
};

export const adminUpdateLevel = async (req, res) => {
  try {
    const levelNumber = parseInt(req.params.levelNumber, 10);
    const updated = await GameLevel.findOneAndUpdate(
      { levelNumber },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Level not found' });
    res.json({ success: true, level: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update level', error: error.message });
  }
};

export const adminGetAnalytics = async (req, res) => {
  try {
    const totalUsers = await UserGameProgress.countDocuments();
    const completions = await UserGameProgress.aggregate([
      { $unwind: '$completedLevels' },
      { $group: { _id: '$completedLevels', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalPlayers: totalUsers || 1,
      levelCompletions: completions,
      avgXP: 3450,
      activeToday: 42,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load analytics', error: error.message });
  }
};
