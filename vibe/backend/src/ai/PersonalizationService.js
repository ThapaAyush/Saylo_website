import Profile from '../models/Profile.js';
import Vocabulary from '../models/Vocabulary.js';
import ReadingContent from '../models/ReadingContent.js';
import WritingPrompt from '../models/WritingPrompt.js';
import SpeakingScenario from '../models/SpeakingScenario.js';
import Game from '../models/Game.js';

export class PersonalizationService {
  static async getDailyDrop(userId) {
    const profile = await Profile.findOne({ user: userId });
    const interests = profile?.interests?.length ? profile.interests : ['Gaming', 'Music', 'Tech'];
    const interestRegex = new RegExp(interests.join('|'), 'i');

    // 1. 3 words based on interests
    const words = await Vocabulary.find({
      $or: [{ category: interestRegex }, { featured: true }]
    }).limit(3);

    // 2. 60-second reading
    const reading = await ReadingContent.findOne({
      $or: [{ category: interestRegex }, { featured: true }]
    }) || await ReadingContent.findOne();

    // 3. Creative writing prompt
    const prompt = await WritingPrompt.findOne({
      $or: [{ category: 'Hot take' }, { category: 'Text someone' }]
    }) || await WritingPrompt.findOne();

    // 4. Speaking challenge
    const scenario = await SpeakingScenario.findOne({
      $or: [{ category: interestRegex }, { featured: true }]
    }) || await SpeakingScenario.findOne();

    // 5. Surprise game
    const game = await Game.findOne() || {
      gameId: 'word_rush',
      title: 'Word Rush',
      instructions: 'Make fast vocabulary choices against the clock!',
    };

    return {
      dropDate: new Date().toISOString().split('T')[0],
      totalMinutes: 5,
      steps: [
        {
          step: 1,
          icon: '🧠',
          title: '3 Power Words',
          subtitle: `Curated for your ${interests[0] || 'Vibe'} interest`,
          data: words,
          type: 'vocabulary',
        },
        {
          step: 2,
          icon: '👀',
          title: '60-Second Read',
          subtitle: reading?.title || 'Daily Quick Read',
          data: reading,
          type: 'reading',
        },
        {
          step: 3,
          icon: '✍️',
          title: 'Creative Prompt',
          subtitle: prompt?.title || 'Drop your thoughts',
          data: prompt,
          type: 'writing',
        },
        {
          step: 4,
          icon: '🎤',
          title: 'Voice Drop',
          subtitle: scenario?.title || 'Jump into a quick roleplay',
          data: scenario,
          type: 'speaking',
        },
        {
          step: 5,
          icon: '🎮',
          title: 'Surprise Game',
          subtitle: game?.title || 'Word Rush Challenge',
          data: game,
          type: 'game',
        },
      ],
    };
  }

  static async getForYouFeed(userId) {
    const profile = await Profile.findOne({ user: userId });
    const interests = profile?.interests?.length ? profile.interests : ['Gaming', 'Music'];
    const focus = profile?.currentFocus?.length ? profile.currentFocus : ['Past tense', 'Natural expressions'];

    return [
      {
        id: 'for_you_interest',
        tag: `Because you like ${interests[0] || 'Gaming'} 🎮`,
        title: `${interests[0] || 'Gaming'} banter you'll actually hear in the wild`,
        subtitle: 'Level up your conversational reactions without sounding like a textbook.',
        actionText: 'Hop In →',
        actionRoute: '/talk',
        theme: 'cyan',
      },
      {
        id: 'for_you_weak_spot',
        tag: 'Quick Fix Radar 👀',
        title: 'You keep confusing borrow vs. lend.',
        subtitle: "Let's lock it in with 3 quick examples so it becomes second nature.",
        actionText: "Fix it now →",
        actionRoute: '/games',
        theme: 'purple',
      },
      {
        id: 'for_you_streak',
        tag: 'Streak Alert 🔥',
        title: `Your ${profile?.streakCount || 1} day streak is ready to level up`,
        subtitle: 'A 2-minute voice drill with Alex keeps the fire burning.',
        actionText: 'Drop In →',
        actionRoute: '/talk',
        theme: 'orange',
      },
      {
        id: 'for_you_culture',
        tag: 'Internet Culture 💀',
        title: 'Decoding what "he really thought he ate" actually means',
        subtitle: 'Why Gen-Z praises someone with food vocabulary.',
        actionText: 'Discover →',
        actionRoute: '/discover',
        theme: 'pink',
      },
    ];
  }
}
