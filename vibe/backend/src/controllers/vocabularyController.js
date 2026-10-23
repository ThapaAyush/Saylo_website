import mongoose from 'mongoose';
import Vocabulary from '../models/Vocabulary.js';
import Profile from '../models/Profile.js';
import { VocabularyService } from '../ai/VocabularyService.js';

export const getVocabularyList = async (req, res) => {
  try {
    const { category, difficulty, search, featured, limit = 50, page = 1 } = req.query;
    const filter = { active: true };

    if (category && category !== 'all') {
      filter.category = category;
    }
    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }
    if (featured === 'true') {
      filter.featured = true;
    }
    if (search) {
      filter.$or = [
        { word: { $regex: search, $options: 'i' } },
        { meaning: { $regex: search, $options: 'i' } },
        { synonyms: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Vocabulary.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Vocabulary.countDocuments(filter);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVocabularyById = async (req, res) => {
  try {
    const vocab = await Vocabulary.findById(req.params.id);
    if (!vocab) return res.status(404).json({ message: 'Vocabulary item not found' });
    vocab.viewsCount += 1;
    await vocab.save();
    res.json(vocab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const explainVocabulary = async (req, res) => {
  try {
    const { word, context, targetLang = 'hindi' } = req.body;
    if (!word) return res.status(400).json({ message: 'Word is required for explanation' });

    const explanation = await VocabularyService.explainWord(word, context, targetLang);
    res.json(explanation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const evaluateTryIt = async (req, res) => {
  try {
    const { word, userResponse, expectedSituation } = req.body;
    if (!word || !userResponse) {
      return res.status(400).json({ message: 'Word and user response are required' });
    }

    const result = await VocabularyService.evaluateTryIt(word, userResponse, expectedSituation);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookmarkWord = async (req, res) => {
  try {
    const vocabId = req.params.id;
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const index = profile.bookmarks.indexOf(vocabId);
    let bookmarked = false;
    if (index > -1) {
      profile.bookmarks.splice(index, 1);
      bookmarked = false;
    } else {
      profile.bookmarks.push(vocabId);
      bookmarked = true;
    }

    await profile.save();
    res.json({ bookmarked, bookmarks: profile.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markWordLearned = async (req, res) => {
  try {
    const vocabId = req.params.id;
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    let isLearned = true;
    const index = profile.wordsLearned.indexOf(vocabId);
    if (index > -1) {
      // Toggle if already learned
      profile.wordsLearned.splice(index, 1);
      isLearned = false;
    } else {
      profile.wordsLearned.push(vocabId);
      isLearned = true;
    }

    await profile.save();

    res.json({ success: true, isLearned, wordsLearnedCount: profile.wordsLearned.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySavedWords = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate({
      path: 'wordsLearned',
      select: 'word sequenceNumber phonetic meaning category difficulty tone formality energy caughtInTheWild synonyms antonyms examples hindiMeaning dontUseIn',
    });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ savedWords: profile.wordsLearned || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/vocabulary/batch-five
 * Fetches exactly 5 words for the current user profile.
 * - Respects sequence 1 to 500
 * - Injects isCompleted: true/false for each word based on this profile's completions
 * - If no batchNumber is passed, intelligently serves the user's active uncompleted batch
 */
export const getBatchFiveWords = async (req, res) => {
  try {
    const completedSet = new Set();
    let profile = null;

    if (req.user) {
      profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        if (Array.isArray(profile.completedVocabulary)) {
          profile.completedVocabulary.forEach((val) => completedSet.add(String(val).toLowerCase()));
        }
        if (Array.isArray(profile.wordsLearned)) {
          profile.wordsLearned.forEach((id) => {
            completedSet.add(String(id));
          });
        }
      }
    }

    const totalWords = await Vocabulary.countDocuments({ active: true });
    const totalBatches = Math.max(1, Math.ceil(totalWords / 5));

    let batchNumber = parseInt(req.query.batchNumber, 10);

    // If batchNumber is not explicitly given, find the first batch that has any uncompleted words for this profile
    if (!batchNumber || isNaN(batchNumber)) {
      const allWords = await Vocabulary.find({ active: true })
        .sort({ sequenceNumber: 1 })
        .select('_id word sequenceNumber');

      let firstUncompletedSeq = 1;
      let foundUncompleted = false;

      for (const w of allWords) {
        const isComp =
          completedSet.has(String(w._id)) ||
          completedSet.has(w.word.toLowerCase()) ||
          completedSet.has(String(w.sequenceNumber));
        if (!isComp) {
          firstUncompletedSeq = w.sequenceNumber || 1;
          foundUncompleted = true;
          break;
        }
      }

      if (foundUncompleted) {
        batchNumber = Math.ceil(firstUncompletedSeq / 5) || 1;
      } else {
        batchNumber = 1; // All completed or empty
      }
    }

    if (batchNumber < 1) batchNumber = 1;
    if (batchNumber > totalBatches) batchNumber = totalBatches;

    const startSeq = (batchNumber - 1) * 5 + 1;
    const endSeq = batchNumber * 5;

    const rawWords = await Vocabulary.find({
      active: true,
      sequenceNumber: { $gte: startSeq, $lte: endSeq },
    }).sort({ sequenceNumber: 1 });

    const words = rawWords.map((w) => {
      const isCompleted =
        completedSet.has(String(w._id)) ||
        completedSet.has(w.word.toLowerCase()) ||
        completedSet.has(String(w.sequenceNumber));
      return {
        _id: w._id,
        word: w.word,
        sequenceNumber: w.sequenceNumber,
        phonetic: w.phonetic,
        meaning: w.meaning,
        hindiMeaning: w.hindiMeaning,
        hindiExample: w.hindiExample,
        examples: w.examples,
        category: w.category,
        difficulty: w.difficulty,
        tone: w.tone,
        formality: w.formality,
        energy: w.energy,
        commonness: w.commonness,
        isSlang: w.isSlang,
        dontUseIn: w.dontUseIn,
        synonyms: w.synonyms,
        caughtInTheWild: w.caughtInTheWild,
        isCompleted,
      };
    });

    const batchCompletedCount = words.filter((w) => w.isCompleted).length;
    const isBatchComplete = words.length > 0 && batchCompletedCount === words.length;

    // Calculate total completed words across entire 500-word dataset for this user
    let totalCompletedWords = 0;
    if (profile) {
      const allVocabs = await Vocabulary.find({ active: true }).select('_id word sequenceNumber');
      totalCompletedWords = allVocabs.filter(
        (v) =>
          completedSet.has(String(v._id)) ||
          completedSet.has(v.word.toLowerCase()) ||
          completedSet.has(String(v.sequenceNumber))
      ).length;
    }

    res.json({
      words,
      batchNumber,
      totalBatches,
      batchCompletedCount,
      isBatchComplete,
      totalCompletedWords,
      totalWords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/vocabulary/:id/toggle-complete
 * Marks a word completed/remembered for the logged-in profile.
 * - Saved forever in MongoDB Atlas for that profile
 * - Complete isolation from other profiles
 */
export const toggleCompleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      profile = await Profile.create({ user: req.user._id });
    }

    let vocab = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      vocab = await Vocabulary.findById(id);
    }
    if (!vocab) {
      const seq = parseInt(id, 10);
      if (!isNaN(seq)) {
        vocab = await Vocabulary.findOne({ sequenceNumber: seq });
      }
    }
    if (!vocab) {
      vocab = await Vocabulary.findOne({ word: id.toLowerCase() });
    }

    if (!vocab) {
      return res.status(404).json({ message: 'Word not found' });
    }

    const vocabIdStr = vocab._id.toString();
    const wordLower = vocab.word.toLowerCase();
    const seqStr = String(vocab.sequenceNumber);

    const alreadyLearned =
      profile.wordsLearned.some((i) => i.toString() === vocabIdStr) ||
      profile.completedVocabulary.includes(vocabIdStr) ||
      profile.completedVocabulary.includes(wordLower) ||
      profile.completedVocabulary.includes(seqStr);

    let isCompleted = false;

    if (alreadyLearned && req.query.action !== 'complete') {
      // Un-tick if user specifically wants to undo
      profile.wordsLearned = profile.wordsLearned.filter((i) => i.toString() !== vocabIdStr);
      profile.completedVocabulary = profile.completedVocabulary.filter(
        (v) => v !== vocabIdStr && v !== wordLower && v !== seqStr
      );
      isCompleted = false;
    } else {
      // Mark completed & permanently save
      if (!profile.wordsLearned.some((i) => i.toString() === vocabIdStr)) {
        profile.wordsLearned.push(vocab._id);
      }
      if (!profile.completedVocabulary.includes(vocabIdStr)) {
        profile.completedVocabulary.push(vocabIdStr);
      }
      if (!profile.completedVocabulary.includes(wordLower)) {
        profile.completedVocabulary.push(wordLower);
      }
      if (!profile.completedVocabulary.includes(seqStr)) {
        profile.completedVocabulary.push(seqStr);
      }
      isCompleted = true;
    }

    await profile.save();

    // Count total unique words learned by this profile
    const allVocabs = await Vocabulary.find({ active: true }).select('_id word sequenceNumber');
    const compSet = new Set([
      ...profile.completedVocabulary.map((v) => String(v).toLowerCase()),
      ...profile.wordsLearned.map((i) => String(i)),
    ]);

    const totalCompletedWords = allVocabs.filter(
      (v) =>
        compSet.has(String(v._id)) ||
        compSet.has(v.word.toLowerCase()) ||
        compSet.has(String(v.sequenceNumber))
    ).length;

    res.json({
      success: true,
      isCompleted,
      word: vocab.word,
      sequenceNumber: vocab.sequenceNumber,
      _id: vocab._id,
      totalCompletedWords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/vocabulary/vault
 * Returns all saved/remembered words for the user profile
 */
export const getCompletedVault = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.json({ savedWords: [], total: 0 });
    }

    const compSet = new Set([
      ...(profile.completedVocabulary || []).map((v) => String(v).toLowerCase()),
      ...(profile.wordsLearned || []).map((i) => String(i)),
    ]);

    const allVocabs = await Vocabulary.find({ active: true }).sort({ sequenceNumber: 1 });
    const savedWords = allVocabs.filter(
      (v) =>
        compSet.has(String(v._id)) ||
        compSet.has(v.word.toLowerCase()) ||
        compSet.has(String(v.sequenceNumber))
    );

    res.json({
      savedWords,
      total: savedWords.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


