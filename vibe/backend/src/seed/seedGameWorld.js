import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GameWorld from '../models/GameWorld.js';
import GameLevel from '../models/GameLevel.js';
import Challenge from '../models/Challenge.js';
import UserGameProgress from '../models/UserGameProgress.js';
import User from '../models/User.js';

dotenv.config();

export const worldsData = [
  {
    name: 'Start',
    slug: 'start',
    description: 'Everyday English, casual introductions, neighborhood navigating, and relaxed chats.',
    order: 1,
    difficulty: 'easy',
    theme: 'Everyday English',
    environment: 'Soft rolling hills, warm street signs, neighborhood coffee shops, sunny parks, and tree-lined avenues.',
    checkpointTitle: 'THE STARTER HUB',
    colorTheme: {
      primary: '#10B981',
      secondary: '#8B5CF6',
      accent: '#34D399',
      bgGradient: 'from-emerald-950/40 via-teal-950/20 to-[#09090B]',
    },
    badgeIcon: '🌱',
  },
  {
    name: 'Build',
    slug: 'build',
    description: 'Real-world communication, fast-paced group chats, tech issues, humor, and city exploration.',
    order: 2,
    difficulty: 'medium',
    theme: 'Real-world communication',
    environment: 'Underground metro stations, neon coffee bars, buzzing campuses, music lounges, and tech co-working spaces.',
    checkpointTitle: 'THE VIBE DISTRICT',
    colorTheme: {
      primary: '#22D3EE',
      secondary: '#8B5CF6',
      accent: '#F472B6',
      bgGradient: 'from-cyan-950/40 via-purple-950/25 to-[#09090B]',
    },
    badgeIcon: '⚡',
  },
  {
    name: 'Master',
    slug: 'master',
    description: 'Confident English, persuasive negotiation, international transit, high-stakes interviews, and keynote speaking.',
    order: 3,
    difficulty: 'hard',
    theme: 'Confident English',
    environment: 'International airport lounges, glassy skyline towers, executive boardrooms, keynote arenas, and the illuminated summit.',
    checkpointTitle: 'THE SAYLO SUMMIT',
    colorTheme: {
      primary: '#F59E0B',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      bgGradient: 'from-amber-950/40 via-violet-950/30 to-[#09090B]',
    },
    badgeIcon: '🔥',
  },
];

// 30 Levels metadata with wide end-to-end coordinates (Canvas Height: 5600px)
export const levelsMeta = [
  // WORLD 1 — EASY (1-10)
  { num: 1, worldOrder: 1, title: 'Saying Hey Without The Cringe', character: 'Leo (Campus Friend)', setting: 'University Courtyard', brief: 'Bump into a classmate and break the ice naturally without textbook stiffness.', xp: 120, time: '3-4 min', x: 50, y: 5350 },
  { num: 2, worldOrder: 1, title: 'The Coffee Shop Run', character: 'Barista Sam', setting: 'Neon Corner Cafe', brief: 'Custom oat milk latte order with real barista banter and polite preferences.', xp: 130, time: '3-4 min', x: 28, y: 5170 },
  { num: 3, worldOrder: 1, title: 'Group Chat Plans', character: 'Maya (Event Host)', setting: 'WhatsApp Squad Chat', brief: 'Figure out Friday evening plans and respond with natural enthusiasm.', xp: 130, time: '3-5 min', x: 14, y: 4990 },
  { num: 4, worldOrder: 1, title: 'Lost in Downtown', character: 'Local Courier Alex', setting: 'Crossroads Subway Station', brief: 'Politely ask directions to the tech meetup without sounding like a GPS.', xp: 140, time: '4-5 min', x: 38, y: 4810 },
  { num: 5, worldOrder: 1, title: 'Running 10 Mins Late', character: 'Sam (Waiting Friend)', setting: 'Bubble Tea Lounge', brief: 'Traffic is completely locked up. Send a quick, considerate heads-up.', xp: 140, time: '4-5 min', x: 70, y: 4630 },
  { num: 6, worldOrder: 1, title: 'Ordering Street Food', character: 'Food Truck Chef Chen', setting: 'Night Street Market', brief: 'Inquire about spicy ingredients and order tacos with effortless confidence.', xp: 150, time: '4-5 min', x: 86, y: 4450 },
  { num: 7, worldOrder: 1, title: "What's The Move Tonight?", character: 'Jordan (Housemate)', setting: 'Apartment Kitchen', brief: 'Debate going to the indie cinema versus chill gaming on Discord.', xp: 150, time: '4-5 min', x: 62, y: 4270 },
  { num: 8, worldOrder: 1, title: 'The Playlist Swap', character: 'DJ Kai', setting: 'Vinyl Record Shop', brief: 'Describe your favorite underground track vibe and exchange recs.', xp: 160, time: '4-5 min', x: 32, y: 4090 },
  { num: 9, worldOrder: 1, title: 'Flea Market Thrift Hunt', character: 'Vintage Seller Clara', setting: 'Open Air Sunday Market', brief: 'Bargain politely for a retro leather jacket without awkwardness.', xp: 160, time: '4-5 min', x: 16, y: 3910 },
  { num: 10, worldOrder: 1, title: 'THE STARTER HUB: Rooftop Sunset Party', character: 'Host Emma & Group', setting: 'Skyline Terrace', brief: 'MILESTONE BOSS: Navigate multi-person party conversations, toasts, and laughs.', xp: 300, time: '6-8 min', boss: true, x: 50, y: 3710 },

  // WORLD 2 — MEDIUM (11-20)
  { num: 11, worldOrder: 2, title: 'Metro Rush Hour Commute', character: 'Transit Conductor Ray', setting: 'Central Express Line', brief: 'Decode distorted speaker announcements and coordinate switchovers.', xp: 200, time: '5-7 min', x: 78, y: 3510 },
  { num: 12, worldOrder: 2, title: 'The Group Project Ghoster', character: 'Teammate Priya', setting: 'Slack Project Channel', brief: 'Someone went silent 24 hours before the deadline. Gently nudge them.', xp: 210, time: '5-7 min', x: 86, y: 3330 },
  { num: 13, worldOrder: 2, title: 'Remote Work Cafe Etiquette', character: 'Remote Designer Liam', setting: 'Artisan Roastery & Co-work', brief: 'Negotiate the last power outlet and discuss collaborative Wi-Fi speeds.', xp: 220, time: '5-7 min', x: 60, y: 3150 },
  { num: 14, worldOrder: 2, title: 'The Vintage Drip Debate', character: 'Stylist Chloe', setting: 'Fashion Pop-Up Store', brief: 'Express nuanced opinions on bold fashion trends with humor and finesse.', xp: 230, time: '5-7 min', x: 28, y: 2970 },
  { num: 15, worldOrder: 2, title: 'Street Food Critic Post', character: 'Foodie Community', setting: 'Food Truck Alley', brief: 'Draft a mouth-watering micro-review capturing crunch, heat, and vibes.', xp: 240, time: '5-7 min', x: 14, y: 2790 },
  { num: 16, worldOrder: 2, title: 'Tech Glitch on Demo Day', character: 'Senior Engineer Dave', setting: 'Virtual Standup Room', brief: 'Screen sharing crashed during a sprint showcase. Keep your cool and explain clearly.', xp: 250, time: '6-8 min', x: 38, y: 2610 },
  { num: 17, worldOrder: 2, title: 'Late for the Train', character: 'Station Manager Diaz', setting: 'Grand Concourse Track 9', brief: 'Running down the stairs with seconds to spare. Talk to the officer and catch the link.', xp: 260, time: '6-8 min', x: 72, y: 2430 },
  { num: 18, worldOrder: 2, title: 'The Unexpected Message', character: 'Old Friend Noah', setting: 'Direct Message Inbox', brief: 'A cryptic message arrives out of the blue. Read between the lines and respond warmly.', xp: 270, time: '6-8 min', x: 86, y: 2250 },
  { num: 19, worldOrder: 2, title: 'Concert Ticket Drop Hype', character: 'Festival Squad Lead', setting: 'Online Queue Waiting Room', brief: 'The countdown hits zero. Coordinate ticketing strategy in high-energy Discord banter.', xp: 280, time: '6-8 min', x: 64, y: 2070 },
  { num: 20, worldOrder: 2, title: 'THE VIBE DISTRICT: Creator Showcase', character: 'Curator Zara & Panel', setting: 'Underground Art & Tech Gallery', brief: 'MILESTONE BOSS: Pitch your creative project live and handle audience questions.', xp: 450, time: '8-10 min', boss: true, x: 50, y: 1870 },

  // WORLD 3 — HARD (21-30)
  { num: 21, worldOrder: 3, title: 'JFK Gate Change & Customs', character: 'Customs Officer Harrison', setting: 'JFK Terminal 4 & Customs', brief: 'Flight rescheduled across the terminal. Navigate immigration questions with precision.', xp: 350, time: '8-10 min', x: 24, y: 1670 },
  { num: 22, worldOrder: 3, title: 'The Tech Internship Interview', character: 'VP of Product Elena', setting: 'Silicon Valley Headquarters', brief: 'Deliver your 60-second elevator pitch and answer tough behavioral scenarios.', xp: 360, time: '8-10 min', x: 14, y: 1490 },
  { num: 23, worldOrder: 3, title: 'Startup Angel Pitch', character: 'Venture Partner Marcus', setting: 'High-Rise Boardroom', brief: 'Pitch your breakthrough app concept and defend your business model under scrutiny.', xp: 380, time: '8-11 min', x: 44, y: 1310 },
  { num: 24, worldOrder: 3, title: 'Global Tech Conference Mixer', character: 'Tech Leader Amara', setting: 'Convention Center Sky Lounge', brief: 'Engage senior industry leaders in witty, insightful conversation that opens doors.', xp: 400, time: '8-11 min', x: 76, y: 1130 },
  { num: 25, worldOrder: 3, title: 'High-Stakes Contract Terms', character: 'Legal Counsel Brandon', setting: 'Virtual Negotiation Chamber', brief: 'Push back on scope creep with firm, professional diplomacy and clarity.', xp: 420, time: '9-12 min', x: 86, y: 950 },
  { num: 26, worldOrder: 3, title: 'The Crisis Team Meeting', character: 'COO Sarah & Tech Team', setting: 'Emergency War Room', brief: 'A critical service outage hit prime time. De-escalate panic and coordinate action.', xp: 440, time: '9-12 min', x: 62, y: 770 },
  { num: 27, worldOrder: 3, title: 'Global Podcast Spotlight', character: 'Host Jackson (The Pulse Show)', setting: 'Acoustic Soundstage Studio', brief: 'Impromptu riffing on cultural internet shifts, humor, and persuasive perspectives.', xp: 460, time: '9-12 min', x: 28, y: 590 },
  { num: 28, worldOrder: 3, title: 'Creative Agency Brand Pivot', character: 'Managing Director Victor', setting: 'Design Studio Lab', brief: 'Resolve conflict between conflicting creative visions with compelling logic.', xp: 480, time: '10-12 min', x: 16, y: 430 },
  { num: 29, worldOrder: 3, title: 'International Keynote Delivery', character: 'Global Audience of 2,000', setting: 'Grand Auditorium Stage', brief: 'Deliver a moving, high-impact talk on youth culture and innovation.', xp: 500, time: '10-12 min', x: 34, y: 280 },
  { num: 30, worldOrder: 3, title: 'THE SAYLO SUMMIT: The Final Adventure', character: 'Global Community Leaders', setting: 'The Apex Summit Tower', brief: 'THE ULTIMATE DESTINATION: Seamlessly navigate all four skills in one master international journey.', xp: 1000, time: '12-15 min', boss: true, x: 50, y: 140 },
];

// Helper to generate structured challenges for a level
export const generateChallengesForLevel = (levelId, levelMeta) => {
  const { num, worldOrder, title, character, setting } = levelMeta;
  const challenges = [];
  const difficulty = worldOrder === 1 ? 'easy' : worldOrder === 2 ? 'medium' : 'hard';
  
  // Exact counts per requirement:
  // Easy: 1 Vocab, 1 Reading, 1 Writing, 1 Speaking (4 total)
  // Medium: 2 Vocab, 2 Reading, 2 Writing, 2 Speaking (8 total)
  // Hard: 3 Vocab, 3 Reading, 3 Writing, 3 Speaking (12 total)
  const countPerSkill = worldOrder === 1 ? 1 : worldOrder === 2 ? 2 : 3;
  let chNum = 1;

  // 1. VOCABULARY CHALLENGES
  for (let i = 1; i <= countPerSkill; i++) {
    const vocabScenarios = [
      {
        word: num <= 10 ? 'No worries' : num <= 20 ? 'Touch base' : 'Streamline',
        prompt: num <= 10 
          ? `In ${setting}, someone says "Thank you so much for the coffee!" What is the most natural casual response?`
          : num <= 20 
          ? `During project coordination at ${setting}, what does it mean when ${character} says "Let's touch base later"?`
          : `In high-level strategy at ${setting}, how should you describe making a process faster and simpler?`,
        options: num <= 10 
          ? ['No worries, anytime!', 'You are officially indebted to me.', 'I accept your gratitude formally.', 'No thanks.']
          : num <= 20 
          ? ['Briefly talk or update each other later', 'Physically tap the wall together', 'Cancel the project permanently', 'Never speak again']
          : ['Streamline the workflow', 'Overcomplicate the roadmap', 'Stall indefinitely', 'Ignore stakeholders'],
        answer: num <= 10 ? 'No worries, anytime!' : num <= 20 ? 'Briefly talk or update each other later' : 'Streamline the workflow',
        explanation: 'Sounds effortless, authentic, and strikes the exact right social tone without feeling stiff.',
        type: num <= 10 ? 'match' : num <= 20 ? 'context-clash' : 'fill-blank',
        obj: 'Contextual Word DNA & Social Formality',
      },
      {
        word: num <= 20 ? 'Bet' : 'Leverage',
        prompt: num <= 20 
          ? `Your friend texts: "Catching the 5pm show, you in?" What one-word confirmation matches casual Gen-Z vibes?`
          : `In the pitch meeting at ${setting}, you want to explain using your team's unique strengths. Which verb fits?`,
        options: num <= 20 
          ? ['Bet', 'Affirmative captain', 'I hereby validate', 'Doubtful']
          : ['Leverage our core assets', 'Gambling our savings', 'Throw away advantages', 'Procrastinate nicely'],
        answer: num <= 20 ? 'Bet' : 'Leverage our core assets',
        explanation: 'Natural modern phrasing matches the high-energy flow of spontaneous conversation.',
        type: 'match',
        obj: 'Tone Calibration & Idiomatic Nuance',
      },
      {
        word: 'Pragmatic',
        prompt: `When balancing big creative dreams with real budgets at ${setting}, the best mindset is:`,
        options: ['Pragmatic and data-backed', 'Reckless and loud', 'Passive and quiet', 'Chaotic neutral'],
        answer: 'Pragmatic and data-backed',
        explanation: '"Pragmatic" conveys grounded, sensible decision making in high-stakes environments.',
        type: 'match',
        obj: 'Executive Level Vocabulary',
      }
    ];

    const currentV = vocabScenarios[i - 1] || vocabScenarios[0];
    challenges.push({
      levelId,
      levelNumber: num,
      skill: 'vocabulary',
      challengeNumber: chNum++,
      type: currentV.type,
      difficulty,
      title: `Step ${chNum - 1}: Decode the Lingo (${currentV.word})`,
      prompt: currentV.prompt,
      contextText: `Setting: ${setting} • Context: Interacting with ${character}`,
      options: currentV.options,
      answer: currentV.answer,
      explanation: currentV.explanation,
      targetWord: currentV.word,
      xp: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 35 : 40,
      learningObjective: currentV.obj,
      estimatedTime: '1 min',
    });
  }

  // 2. READING CHALLENGES
  for (let i = 1; i <= countPerSkill; i++) {
    const readScenarios = [
      {
        prompt: `Read the message from ${character}: "Yo! We just got a table near the window. Grab your drink and pull up before it gets packed!" What is the vibe and main takeaway?`,
        contextText: `Chat Notification from ${character}:\n"Yo! We just got a table near the window. Grab your drink and pull up before it gets packed! ☕✨"`,
        options: [
          'They have secured seating and want you to join right now.',
          'They are angry that the café is crowded.',
          'They are canceling the meetup.',
          'They want you to buy everyone coffee.'
        ],
        answer: 'They have secured seating and want you to join right now.',
        explanation: '"Pull up" is a friendly, casual invitation to arrive and hang out.',
        obj: 'Intuitive Chat Reading & Slang Tone',
      },
      {
        prompt: `Analyze the tone of this update: "Appreciate the quick draft! A few small tweaks on the budget slide, but overall this hits the exact tone we wanted." What does the sender really think?`,
        contextText: `Slack Message from Project Lead:\n"Appreciate the quick draft! A few small tweaks on the budget slide, but overall this hits the exact tone we wanted. Great work."`,
        options: [
          'They are genuinely impressed and only require minor revisions.',
          'They want to scrap the entire project and start over.',
          'They are passive-aggressive and upset.',
          'They did not read the draft at all.'
        ],
        answer: 'They are genuinely impressed and only require minor revisions.',
        explanation: 'Recognizing positive reinforcement with constructive micro-adjustments.',
        obj: 'Workplace Nuance & Constructive Feedback',
      },
      {
        prompt: `Evaluate the unspoken intent: "While we recognize the novelty of the proposal, market volatility necessitates a more conservative runway strategy at this juncture."`,
        contextText: `Executive Email Excerpt:\n"While we recognize the novelty of the proposal, market volatility necessitates a more conservative runway strategy at this juncture."`,
        options: [
          'They like the creativity, but are declining to fund it right now due to economic risk.',
          'They are ready to wire 5 million dollars immediately.',
          'They did not understand the language.',
          'They are inviting everyone to a beach vacation.'
        ],
        answer: 'They like the creativity, but are declining to fund it right now due to economic risk.',
        explanation: 'Decoding diplomatic corporate refusal disguised in polite strategic framing.',
        obj: 'Advanced Professional Subtext Comprehension',
      }
    ];

    const currentR = readScenarios[i - 1] || readScenarios[0];
    challenges.push({
      levelId,
      levelNumber: num,
      skill: 'reading',
      challengeNumber: chNum++,
      type: 'comprehension',
      difficulty,
      title: `Step ${chNum - 1}: Social Intuition Check`,
      prompt: currentR.prompt,
      contextText: currentR.contextText,
      options: currentR.options,
      answer: currentR.answer,
      explanation: currentR.explanation,
      xp: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 35 : 40,
      learningObjective: currentR.obj,
      estimatedTime: '1-2 min',
    });
  }

  // 3. WRITING CHALLENGES
  for (let i = 1; i <= countPerSkill; i++) {
    const writeScenarios = [
      {
        prompt: `Respond naturally to ${character}. They text: "Are you still down for food after this?" Pick the reply that sounds most like a confident native speaker:`,
        contextText: `Incoming Text from ${character}: "Are you still down for food after this? 🌮"`,
        options: [
          '100%, I am starving! What are you craving?',
          'Yes, I have biological need for nutritional ingestion.',
          'Perhaps if fate permits us to dine.',
          'I am going to food place.'
        ],
        answer: '100%, I am starving! What are you craving?',
        explanation: '"100%" + "What are you craving?" keeps the conversational ball rolling effortlessly.',
        obj: 'Natural Casual Texting Flow',
      },
      {
        prompt: `Transform this stiff sentence into natural conversational English: "I desire to apologize for not replying in a timely fashion."`,
        contextText: `Your rough draft: "I desire to apologize for not replying in a timely fashion."`,
        options: [
          'Sorry for the delay! Crazy day on my end.',
          'I regret my severe postal failure.',
          'My apologies for the temporal lapse.',
          'No reply because I forgot you.'
        ],
        answer: 'Sorry for the delay! Crazy day on my end.',
        explanation: 'Everyday English values brevity, empathy, and relatable warmth.',
        obj: 'Tone Transformation (Formal to Natural)',
      },
      {
        prompt: `Craft a persuasive, diplomatic counter-offer in the meeting:`,
        contextText: `Negotiation Context: The client asked for 3 extra deliverables without increasing the budget.`,
        options: [
          "We can certainly include that extra feature if we adjust the timeline by one week, or keep the date by prioritizing feature A.",
          "No way, you are taking advantage of our kind nature.",
          "We will do everything for free because we are scared of losing you.",
          "Whatever you say boss, we will not sleep."
        ],
        answer: "We can certainly include that extra feature if we adjust the timeline by one week, or keep the date by prioritizing feature A.",
        explanation: 'Firm boundaries presented as win-win trade-offs demonstrate elite professional poise.',
        obj: 'High-Stakes Diplomatic Negotiation',
      }
    ];

    const currentW = writeScenarios[i - 1] || writeScenarios[0];
    challenges.push({
      levelId,
      levelNumber: num,
      skill: 'writing',
      challengeNumber: chNum++,
      type: 'chat-reply',
      difficulty,
      title: `Step ${chNum - 1}: Craft the Reply`,
      prompt: currentW.prompt,
      contextText: currentW.contextText,
      options: currentW.options,
      answer: currentW.answer,
      explanation: currentW.explanation,
      xp: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 35 : 40,
      learningObjective: currentW.obj,
      estimatedTime: '1-2 min',
    });
  }

  // 4. SPEAKING CHALLENGES
  for (let i = 1; i <= countPerSkill; i++) {
    const speakScenarios = [
      {
        prompt: `Say this naturally out loud into your microphone (or type to verify): "${num <= 10 ? 'Hey, great to see you! How has your week been?' : num <= 20 ? 'Sorry I am running a few minutes late, save me a seat!' : 'I would love to walk you through our core vision for this project.'}"`,
        speakingPrompt: num <= 10 
          ? 'Hey, great to see you! How has your week been?' 
          : num <= 20 
          ? 'Sorry I am running a few minutes late, save me a seat!' 
          : 'I would love to walk you through our core vision for this project.',
        options: [
          num <= 10 ? 'Hey, great to see you! How has your week been?' : num <= 20 ? 'Sorry I am running a few minutes late, save me a seat!' : 'I would love to walk you through our core vision for this project.',
          'Hello person, what is the week doing?',
          'I am present here now.',
          'Speak English very fast.'
        ],
        answer: num <= 10 ? 'Hey, great to see you! How has your week been?' : num <= 20 ? 'Sorry I am running a few minutes late, save me a seat!' : 'I would love to walk you through our core vision for this project.',
        explanation: 'Focus on relaxed rhythm and linking words together smoothly.',
        obj: 'Rhythm, Intonation & Natural Cadence',
      },
      {
        prompt: `Practice vocal confidence: "${num <= 20 ? 'Honestly, I think that is an awesome idea. Let us run with it!' : 'Let us look at the data before making any final calls.'}"`,
        speakingPrompt: num <= 20 
          ? 'Honestly, I think that is an awesome idea. Let us run with it!' 
          : 'Let us look at the data before making any final calls.',
        options: [
          num <= 20 ? 'Honestly, I think that is an awesome idea. Let us run with it!' : 'Let us look at the data before making any final calls.',
          'Idea is okay maybe.',
          'I am having no opinion.',
          'Please do not ask me.'
        ],
        answer: num <= 20 ? 'Honestly, I think that is an awesome idea. Let us run with it!' : 'Let us look at the data before making any final calls.',
        explanation: 'Conveying authentic enthusiasm or calm leadership through vocal tone.',
        obj: 'Spontaneous Vocal Expression & Warmth',
      },
      {
        prompt: `Executive Voice Delivery: "The future belongs to creators who build with authenticity and conviction."`,
        speakingPrompt: 'The future belongs to creators who build with authenticity and conviction.',
        options: [
          'The future belongs to creators who build with authenticity and conviction.',
          'Future is coming soon.',
          'Everyone should make things.',
          'Thank you goodbye.'
        ],
        answer: 'The future belongs to creators who build with authenticity and conviction.',
        explanation: 'Commanding the room with measured pauses and steady emphasis on key verbs.',
        obj: 'Keynote & Executive Vocal Presence',
      }
    ];

    const currentS = speakScenarios[i - 1] || speakScenarios[0];
    challenges.push({
      levelId,
      levelNumber: num,
      skill: 'speaking',
      challengeNumber: chNum++,
      type: 'voice-roleplay',
      difficulty,
      title: `Step ${chNum - 1}: Speak it Live 🎙️`,
      prompt: currentS.prompt,
      contextText: `Face-to-face with ${character} at ${setting}`,
      speakingPrompt: currentS.speakingPrompt,
      options: currentS.options,
      answer: currentS.answer,
      explanation: currentS.explanation,
      xp: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 35 : 40,
      learningObjective: currentS.obj,
      estimatedTime: '1-2 min',
    });
  }

  return challenges;
};

export async function seedGameWorld() {
  try {
    console.log('[Game World Seed] Starting database initialization...');
    
    // Clear existing game world collections
    await GameWorld.deleteMany({});
    await GameLevel.deleteMany({});
    await Challenge.deleteMany({});

    console.log('[Game World Seed] Cleared existing GameWorld, GameLevel, and Challenge collections.');

    // 1. Insert 3 Worlds
    const createdWorlds = await GameWorld.insertMany(worldsData);
    console.log(`[Game World Seed] Created ${createdWorlds.length} worlds.`);
    const worldMap = {};
    createdWorlds.forEach((w) => {
      worldMap[w.order] = w._id;
    });

    // 2. Insert 30 Levels
    const levelsToInsert = levelsMeta.map((lvl) => ({
      levelNumber: lvl.num,
      worldId: worldMap[lvl.worldOrder],
      worldOrder: lvl.worldOrder,
      difficulty: lvl.worldOrder === 1 ? 'easy' : lvl.worldOrder === 2 ? 'medium' : 'hard',
      title: lvl.title,
      description: lvl.brief,
      scenario: {
        setting: lvl.setting,
        context: `You arrive at ${lvl.setting} to meet ${lvl.character}.`,
        character: lvl.character,
        missionBrief: lvl.brief,
      },
      xpReward: lvl.xp,
      estimatedTime: lvl.time,
      bossLevel: !!lvl.boss,
      active: true,
      unlockLevel: lvl.num - 1,
      learningObjectives: [
        'Practical vocabulary in real situations',
        'Intuitive comprehension of nuances and subtext',
        'Effortless social texting and expressive replies',
        'Confident vocal speech with native flow',
      ],
      mapPosition: {
        x: lvl.x,
        y: lvl.y,
        pathOrder: lvl.num,
      },
    }));

    const createdLevels = await GameLevel.insertMany(levelsToInsert);
    console.log(`[Game World Seed] Created ${createdLevels.length} game levels.`);

    // 3. Insert 240 Challenges
    let allChallenges = [];
    for (let i = 0; i < createdLevels.length; i++) {
      const level = createdLevels[i];
      const meta = levelsMeta.find((m) => m.num === level.levelNumber);
      const chs = generateChallengesForLevel(level._id, meta);
      allChallenges = allChallenges.concat(chs);
    }

    const createdChallenges = await Challenge.insertMany(allChallenges);
    console.log(`[Game World Seed] Created ${createdChallenges.length} challenges across all 30 levels!`);

    // 4. Initialize UserGameProgress for demo user if exists
    const demoUser = await User.findOne({ email: 'demo@vibe.app' });
    if (demoUser) {
      await UserGameProgress.deleteMany({ userId: demoUser._id });
      await UserGameProgress.create({
        userId: demoUser._id,
        currentLevel: 14,
        completedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        levelScores: [
          { levelNumber: 1, score: 95, stars: 3, skills: { vocabulary: 95, reading: 92, writing: 94, speaking: 96 } },
          { levelNumber: 2, score: 90, stars: 3, skills: { vocabulary: 90, reading: 88, writing: 92, speaking: 90 } },
          { levelNumber: 3, score: 88, stars: 2, skills: { vocabulary: 85, reading: 90, writing: 86, speaking: 88 } },
          { levelNumber: 4, score: 92, stars: 3, skills: { vocabulary: 94, reading: 91, writing: 90, speaking: 93 } },
          { levelNumber: 5, score: 86, stars: 2, skills: { vocabulary: 88, reading: 84, writing: 86, speaking: 85 } },
          { levelNumber: 6, score: 94, stars: 3, skills: { vocabulary: 96, reading: 92, writing: 95, speaking: 94 } },
          { levelNumber: 7, score: 91, stars: 3, skills: { vocabulary: 90, reading: 92, writing: 90, speaking: 92 } },
          { levelNumber: 8, score: 89, stars: 2, skills: { vocabulary: 88, reading: 90, writing: 87, speaking: 90 } },
          { levelNumber: 9, score: 93, stars: 3, skills: { vocabulary: 92, reading: 95, writing: 91, speaking: 93 } },
          { levelNumber: 10, score: 98, stars: 3, skills: { vocabulary: 100, reading: 96, writing: 98, speaking: 98 } }, // Boss 1
          { levelNumber: 11, score: 87, stars: 2, skills: { vocabulary: 85, reading: 88, writing: 87, speaking: 88 } },
          { levelNumber: 12, score: 92, stars: 3, skills: { vocabulary: 91, reading: 94, writing: 92, speaking: 92 } },
          { levelNumber: 13, score: 90, stars: 3, skills: { vocabulary: 90, reading: 89, writing: 91, speaking: 90 } },
        ],
        skillScores: {
          vocabulary: 92,
          reading: 91,
          writing: 91,
          speaking: 92,
        },
        perfectLevels: [1, 2, 4, 6, 7, 9, 10, 12],
        totalXP: 4280,
        streak: 12,
        energy: { current: 5, max: 5, lastRefill: new Date() },
      });
      console.log(`[Game World Seed] Seeded progress for demo user (Level 14, 4280 XP, 12 streak).`);
    }

    console.log('[Game World Seed] Successfully seeded Game World!');
  } catch (error) {
    console.error('[Game World Seed] Error seeding:', error);
    throw error;
  }
}

// Standalone runner
if (process.argv[1]?.endsWith('seedGameWorld.js')) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vibe_db')
    .then(async () => {
      await seedGameWorld();
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
