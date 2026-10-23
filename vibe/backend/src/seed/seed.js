import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Vocabulary from '../models/Vocabulary.js';
import ReadingContent from '../models/ReadingContent.js';
import WritingPrompt from '../models/WritingPrompt.js';
import SpeakingScenario from '../models/SpeakingScenario.js';
import AICharacter from '../models/AICharacter.js';
import Game from '../models/Game.js';
import Quest from '../models/Quest.js';
import Post from '../models/Post.js';

import {
  vocabularySeed,
  readingSeed,
  writingPromptsSeed,
  speakingScenariosSeed,
  aiCharactersSeed,
  gamesSeed,
  questsSeed,
  samplePostsSeed
} from './seedData.js';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vibe_db';
    console.log(`[Seed Script] Connecting to ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed Script] Connected! Clearing existing collections...');
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Vocabulary.deleteMany({});
    await ReadingContent.deleteMany({});
    await WritingPrompt.deleteMany({});
    await SpeakingScenario.deleteMany({});
    await AICharacter.deleteMany({});
    await Game.deleteMany({});
    await Quest.deleteMany({});
    await Post.deleteMany({});

    console.log('[Seed Script] Creating Admin and Demo Users...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('adminpassword123', salt);
    const demoPassword = await bcrypt.hash('password123', salt);

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@vibe.app',
      passwordHash: adminPassword,
      displayName: 'Vibe Administrator',
      avatar: '🛡️',
      role: 'admin',
    });

    await Profile.create({
      user: adminUser._id,
      bio: 'Product Ops & AI Administrator',
      titleBadge: 'SYSTEM ADMIN',
      level: 'advanced',
      onboardingCompleted: true,
    });

    const demoUser = await User.create({
      username: 'demo',
      email: 'demo@vibe.app',
      passwordHash: demoPassword,
      displayName: 'Alex Rivers',
      avatar: '⚡',
      role: 'user',
    });

    const demoProfile = await Profile.create({
      user: demoUser._id,
      bio: 'Living in the wild, using English every day 🌍',
      titleBadge: 'ENGLISH EXPLORER',
      nativeLanguage: 'hindi',
      interests: ['Gaming', 'Music', 'Tech', 'Travel'],
      englishGoals: ['talk to people', 'understand content', 'become more confident'],
      level: 'intermediate',
      streakCount: 1,
      storiesCompleted: 0,
      creationsCompleted: 0,
      conversationsCompleted: 0,
      currentFocus: ['Past tense', 'Natural expressions', 'Speaking flow'],
      vibePreference: 'Casual',
      badges: [
        { id: 'streak_10', name: '10-Day Streak 🔥', icon: '🔥' },
        { id: 'first_convo', name: 'Ice Breaker 🎙️', icon: '🎙️' },
        { id: 'vocab_champ', name: 'Word Master 🧠', icon: '🧠' },
      ],
      onboardingCompleted: true,
    });

    console.log(`[Seed Script] Seeding ${vocabularySeed.length} Vocabulary Items...`);
    const insertedVocab = await Vocabulary.insertMany(vocabularySeed);
    demoProfile.wordsLearned = insertedVocab.slice(0, 15).map(v => v._id);
    await demoProfile.save();

    console.log(`[Seed Script] Seeding ${readingSeed.length} Reading Stories...`);
    await ReadingContent.insertMany(readingSeed);

    console.log(`[Seed Script] Seeding ${writingPromptsSeed.length} Writing Prompts...`);
    await WritingPrompt.insertMany(writingPromptsSeed);

    console.log(`[Seed Script] Seeding ${aiCharactersSeed.length} AI Characters...`);
    await AICharacter.insertMany(aiCharactersSeed);

    console.log(`[Seed Script] Seeding ${speakingScenariosSeed.length} Speaking Scenarios...`);
    await SpeakingScenario.insertMany(speakingScenariosSeed);

    console.log(`[Seed Script] Seeding ${gamesSeed.length} Games...`);
    await Game.insertMany(gamesSeed);

    console.log(`[Seed Script] Seeding ${questsSeed.length} Quests...`);
    await Quest.insertMany(questsSeed);

    console.log(`[Seed Script] Seeding ${samplePostsSeed.length} Social Posts...`);
    for (const postData of samplePostsSeed) {
      await Post.create({
        author: demoUser._id,
        authorUsername: postData.authorUsername,
        authorDisplayName: postData.authorDisplayName,
        authorAvatar: postData.authorAvatar,
        authorBadge: postData.authorBadge,
        content: postData.content,
        promptTag: postData.promptTag,
        tags: postData.tags,
        highlightExpression: postData.highlightExpression,
        reactions: postData.reactions,
      });
    }

    console.log('=====================================================');
    console.log('🎉 SEEDING COMPLETE! DATABASE IS FULLY POPULATED! 🎉');
    console.log(`- Vocabulary: ${insertedVocab.length}`);
    console.log(`- Readings: ${readingSeed.length}`);
    console.log(`- Writing Prompts: ${writingPromptsSeed.length}`);
    console.log(`- Speaking Scenarios: ${speakingScenariosSeed.length}`);
    console.log(`- AI Characters: ${aiCharactersSeed.length}`);
    console.log(`- Games: ${gamesSeed.length}`);
    console.log(`- Quests: ${questsSeed.length}`);
    console.log('Demo Login: demo@vibe.app / password123');
    console.log('Admin Login: admin@vibe.app / adminpassword123');
    console.log('=====================================================');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Script Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
