/**
 * Rich pedagogical data for the 4 Aspects of Speaking:
 * 1. Listen & Notice 👂 (Choose work topic, hear target word count & native explanation)
 * 2. Practice 🗣️ (Speak to that topic with live word counter towards target)
 * 3. Express 🎭 (Calibrate tone: Casual, Polite, Strong, Confident, Humor)
 * 4. Feedback & Improve 🔁 (Tell what was wrong, how to improve, and active voice retry)
 */

export const SPEAKING_ASPECTS_DATA = {
  // 1. Café (Beginner)
  cafe_melbourne: {
    listenAndNotice: {
      workTopics: [
        {
          id: 'coffee_order_routine',
          title: 'Order your drink & explain your morning routine',
          emoji: '☕',
          targetWordCount: 30,
          explanation: 'In everyday life, ordering coffee or tea is often paired with a brief line about your morning. Learn to specify what you want smoothly and mention why you need it today.',
          keyQuestions: [
            'What specific drink do you want (latte, chai, cappuccino)?',
            'Any preference (oat milk, extra hot, less sugar)?',
            'Why are you grabbing it right now (busy morning, heading to work)?',
          ],
          sampleSpeech: 'Good morning! Could I please grab an iced oat latte with an extra shot? I have a busy day of team meetings ahead and definitely need a little energy boost before starting.',
          idiom: {
            phrase: 'What are you up to?',
            meaning: 'A friendly, natural way to ask what someone is doing — not literally asking what is "up"!',
          },
        },
        {
          id: 'pastry_inquiry',
          title: 'Ask about food options & dietary preferences',
          emoji: '🥐',
          targetWordCount: 25,
          explanation: 'Practicing how to ask whether food is fresh, vegetarian, or contains gluten without sounding stiff or demanding.',
          keyQuestions: [
            'Is the banana bread toasted?',
            'Do you have any dairy-free snacks?',
            'How much does that come to?',
          ],
          sampleSpeech: 'Excuse me, could you tell me if the banana bread is toasted fresh? Also, do you happen to have any dairy-free pastries available today?',
          idiom: {
            phrase: 'Do you happen to have...?',
            meaning: 'A super polite way to inquire about availability without putting pressure on the staff.',
          },
        },
        {
          id: 'friendly_smalltalk',
          title: 'Small talk with the barista about the weather',
          emoji: '☀️',
          targetWordCount: 28,
          explanation: 'Making short, polite conversation while waiting for your order. Builds instant warmth and rapport.',
          keyQuestions: [
            'How is the morning rush going?',
            'Comment on the weather outside',
            'Wish them a good shift',
          ],
          sampleSpeech: 'It looks pretty packed in here today! The rain outside really drove everyone indoors. Hope the rest of your morning shift goes smoothly!',
          idiom: {
            phrase: 'Packed in here',
            meaning: 'Means the place is very crowded and bustling with people.',
          },
        },
      ],
      connectedSpeech: {
        sound: '/kʊ-daɪ græb/ (sounds like: "Could-eye grab") and /wʌt-ər-jə ʌp tuː/ ("Whaddya up to?")',
        tip: 'Native speakers link "Could I" smoothly into one flowing sound.',
      },
      pausesAndFillers: ['Honestly...', 'Let’s see...', 'Could I grab...', 'Actually...'],
    },
    express: {
      situationTitle: 'Café & Daily Requests',
      presetPhrases: [
        {
          intent: 'Disagreement / Pushback',
          base: "I don't like this idea.",
          casual: "I’m not really feeling this idea.",
          polite: "I’m not sure this is the best approach.",
          strong: "I really don't think this will work.",
          confident: "I have reservations about this direction; let's explore alternatives.",
          humor: "Love the energy, but that might end in disaster haha! 😅",
        },
        {
          intent: 'Polite Request',
          base: 'Give me oat milk.',
          casual: 'Could you swap in oat milk if you have it?',
          polite: 'Would it be possible to make that with oat milk, please?',
          strong: 'I need oat milk for this, please.',
          confident: "I'd prefer oat milk with that, thanks.",
          humor: 'Oat milk please—dairy and I are not on speaking terms today! 😂',
        },
        {
          intent: 'Addressing an Error',
          base: 'This is cold.',
          casual: 'Hey, this is a bit lukewarm—could you warm it up?',
          polite: 'Pardon me, I think this might have cooled down a bit.',
          strong: 'Excuse me, this coffee is completely cold.',
          confident: "Could we have this remade? It's not at the right temperature.",
          humor: 'I think this coffee forgot it was supposed to be hot! ☕❄️',
        },
      ],
    },
    feedbackAndImprove: {
      pedagogicalFixes: [
        {
          youSaid: 'Yesterday I go to cafe.',
          whatWasWrong: "Using present tense 'go' when referring to an action completed in the past ('yesterday').",
          howToImprove: "Use the simple past tense 'went' whenever recalling past events.",
          natural: 'Yesterday I went to the cafe.',
          tryAgainPrompt: "Tell me what you did yesterday (say: 'Yesterday I went to the cafe').",
          expectedKeyword: 'went',
        },
        {
          youSaid: 'I want one coffee.',
          whatWasWrong: "Saying 'I want' sounds blunt and demanding to native English speakers.",
          howToImprove: "Start with 'Could I please get...' or 'Could I grab...' to sound polite and effortless.",
          natural: 'Could I get a coffee, please?',
          tryAgainPrompt: "Order politely (say: 'Could I get a coffee, please?').",
          expectedKeyword: 'could i',
        },
        {
          youSaid: 'I am agree with you.',
          whatWasWrong: "'Agree' is already a verb. Adding 'am' is a very common grammatical mistake.",
          howToImprove: "Say 'I agree' or 'I completely agree' without 'am'.",
          natural: 'I completely agree with you.',
          tryAgainPrompt: "Express agreement (say: 'I agree with you').",
          expectedKeyword: 'agree',
        },
      ],
    },
  },

  // 2. Rooftop Party (Beginner)
  party_rooftop: {
    listenAndNotice: {
      workTopics: [
        {
          id: 'party_introduction',
          title: 'Introduce yourself & how you know the host',
          emoji: '🎉',
          targetWordCount: 30,
          explanation: 'At social gatherings and mixer events, people always ask how you know everyone. Practice introducing your background and your connection casually.',
          keyQuestions: [
            'What is your name?',
            'How do you know Marcus or the host (college, work, mutual friend)?',
            'Ask the other person how long they have been here.',
          ],
          sampleSpeech: 'Hey! I’m Ayush. Marcus and I actually worked together on a software project last year. Have you been in town long, or did you just get here tonight?',
          idiom: {
            phrase: 'Mutual friend',
            meaning: 'A friend who is shared by two people who just met.',
          },
        },
        {
          id: 'music_compliment',
          title: 'Compliment the playlist & share music taste',
          emoji: '🎵',
          targetWordCount: 25,
          explanation: 'Complimenting music or food is the easiest social icebreaker. Learn to share your music taste naturally.',
          keyQuestions: [
            'What do you think of the playlist?',
            'What kind of music do you normally listen to?',
            'Ask if they know the DJ.',
          ],
          sampleSpeech: 'Yo, this playlist is incredible! I love old-school hip hop and indie music. Do you know who put this track together?',
          idiom: {
            phrase: 'Hits the spot / Great vibe',
            meaning: 'Means the music or food creates a wonderful, matching atmosphere.',
          },
        },
        {
          id: 'graceful_exit',
          title: 'Politely step away to refill a drink or mingle',
          emoji: '🍹',
          targetWordCount: 25,
          explanation: 'Learn how to end a conversation smoothly without feeling awkward or abrupt.',
          keyQuestions: [
            'Thank them for the chat',
            'Give a light reason (grab a drink, say hi to someone)',
            'Say catch you later',
          ],
          sampleSpeech: 'It was really great chatting with you! I’m gonna grab a fresh drink from the counter, but let’s definitely catch up later before the night ends.',
          idiom: {
            phrase: 'Catch up later',
            meaning: 'A friendly, non-binding way to say we will talk again soon.',
          },
        },
      ],
      connectedSpeech: {
        sound: '/haʊ-djə noʊ/ (sounds like: "How-d\'ya know") and /gən-ə græb/ ("gonna grab")',
        tip: 'In social chats, "How do you" reduces to "How-d\'ya" in one natural beat.',
      },
      pausesAndFillers: ['Actually...', 'No way!', 'To be honest...', 'Right?'],
    },
    express: {
      situationTitle: 'Party Mingling & Social Flow',
      presetPhrases: [
        {
          intent: 'Disagreement / Pushback',
          base: "I don't like this idea.",
          casual: "I’m not really feeling this idea.",
          polite: "I’m not sure this is the best approach.",
          strong: "I really don't think this will work.",
          confident: "I have reservations about this direction; let's explore alternatives.",
          humor: "Love the spirit, but that might crash and burn haha! 😅",
        },
        {
          intent: 'Expressing Agreement',
          base: 'I agree with that.',
          casual: "100%, couldn't agree more!",
          polite: 'I completely share your perspective on that.',
          strong: 'Absolutely, you hit the nail on the head.',
          confident: 'That is precisely aligned with my experience.',
          humor: 'Preach! Are you reading my mind or what? 🙌',
        },
      ],
    },
    feedbackAndImprove: {
      pedagogicalFixes: [
        {
          youSaid: 'Yesterday I go to party.',
          whatWasWrong: "Using present tense 'go' for an event that concluded yesterday.",
          howToImprove: "Switch to 'went' and add the article 'the party'.",
          natural: 'Yesterday I went to the party.',
          tryAgainPrompt: "Tell me about yesterday (say: 'Yesterday I went to the party').",
          expectedKeyword: 'went',
        },
        {
          youSaid: 'I am very like this music.',
          whatWasWrong: "'Very' modifies adjectives, not verbs. Native speakers never say 'very like'.",
          howToImprove: "Use 'really like' or 'love' with verbs.",
          natural: 'I really like this music.',
          tryAgainPrompt: "Express your taste (say: 'I really like this music').",
          expectedKeyword: 'really',
        },
      ],
    },
  },

  // 3. Airport (Intermediate)
  airport_jfk: {
    listenAndNotice: {
      workTopics: [
        {
          id: 'customs_purpose_stay',
          title: 'Explain purpose of trip & duration to officer',
          emoji: '✈️',
          targetWordCount: 40,
          explanation: 'Clear, concise communication at customs prevents delays. Clearly state why you are visiting, where you are staying, and when you return.',
          keyQuestions: [
            'What is the purpose of your trip (conference, business, tourism)?',
            'How long will you stay?',
            'Where will you be accommodated?',
          ],
          sampleSpeech: 'Good morning, officer. I am here for a two-week tech conference in Manhattan, followed by a few days of sightseeing. I will be staying at the Marriott Downtown and have my return ticket booked for the twenty-fourth.',
          idiom: {
            phrase: 'Primary purpose of stay',
            meaning: 'The main official reason for traveling to a country.',
          },
        },
        {
          id: 'baggage_inquiry',
          title: 'Report delayed baggage at the service desk',
          emoji: '🧳',
          targetWordCount: 35,
          explanation: 'Explain calmly that your checked luggage has not arrived on the carousel and ask to file a trace request.',
          keyQuestions: [
            'Which flight did you arrive on?',
            'Describe your bag (color, size)',
            'Provide baggage tag code',
          ],
          sampleSpeech: 'Hello, my checked suitcase hasn’t appeared on carousel four. I arrived on flight six-forty from London. Here is my luggage receipt tag. Could you help me trace its location?',
          idiom: {
            phrase: 'Baggage carousel',
            meaning: 'The rotating conveyor belt where travelers collect luggage.',
          },
        },
      ],
      connectedSpeech: {
        sound: '/hɪər-juː-ɑːr/ ("Here you are") and /praɪ-mɛr-i pɜːr-pəs/',
        tip: 'Speak with deliberate, steady pacing to project clarity and confidence.',
      },
      pausesAndFillers: ['Certainly...', 'Here you are...', 'Yes, officer...'],
    },
    express: {
      situationTitle: 'Airport & Customs Communication',
      presetPhrases: [
        {
          intent: 'Disagreement / Pushback',
          base: "I don't like this idea.",
          casual: "I’m not really feeling this idea.",
          polite: "I’m not sure this is the best approach.",
          strong: "I really don't think this will work.",
          confident: "I have reservations about this direction; let's explore alternatives.",
          humor: "Haha let's maybe not risk that one! 😅",
        },
      ],
    },
    feedbackAndImprove: {
      pedagogicalFixes: [
        {
          youSaid: 'I stay in hotel for 5 days.',
          whatWasWrong: "Describing future planned stays requires future continuous or present continuous.",
          howToImprove: "Say 'I will be staying' or 'I am staying'.",
          natural: 'I will be staying at a hotel for 5 days.',
          tryAgainPrompt: "State where you are staying (say: 'I will be staying at a hotel for 5 days').",
          expectedKeyword: 'staying',
        },
        {
          youSaid: 'Please borrow me your pen.',
          whatWasWrong: "'Borrow' means to take temporarily. 'Lend' means to give temporarily.",
          howToImprove: "Ask someone to 'lend' you something.",
          natural: 'Could you lend me your pen, please?',
          tryAgainPrompt: "Ask politely (say: 'Could you lend me your pen, please?').",
          expectedKeyword: 'lend',
        },
      ],
    },
  },

  // 4. Job Interview (Advanced)
  interview_tech: {
    listenAndNotice: {
      workTopics: [
        {
          id: 'interview_elevator_pitch',
          title: 'Deliver your 60-second professional elevator pitch',
          emoji: '💼',
          targetWordCount: 65,
          explanation: 'Structure a concise summary of your career: your core domain expertise, a major milestone you achieved, and why this specific role excites you.',
          keyQuestions: [
            'What is your core expertise (full-stack, UI, data)?',
            'What recent achievement demonstrates your impact?',
            'Why does this company culture resonate with you?',
          ],
          sampleSpeech: 'Over the past four years, I have specialized in building responsive web applications with React and Node. In my last project, I led the redesign of our client portal, which improved loading speed by forty percent. What really drew me to your team is your commitment to user-centric engineering and fast iteration cycles.',
          idiom: {
            phrase: 'Walk me through your background',
            meaning: 'A standard interview prompt asking for a structured overview of your career.',
          },
        },
        {
          id: 'interview_handling_pressure',
          title: 'Explain how you resolve conflicting deadlines',
          emoji: '⚡',
          targetWordCount: 55,
          explanation: 'Demonstrate emotional intelligence and pragmatic decision-making when facing tight timelines.',
          keyQuestions: [
            'How do you communicate with stakeholders when timelines slip?',
            'How do you prioritize high-impact tasks?',
            'What concrete framework do you use?',
          ],
          sampleSpeech: 'Whenever timelines become tight, I immediately communicate with my team lead to evaluate trade-offs. Rather than sacrificing code quality, I prioritize shipping core functional deliverables first and phase non-critical features into the subsequent release sprint.',
          idiom: {
            phrase: 'Evaluate trade-offs',
            meaning: 'Weighing the pros and cons of different engineering or business choices.',
          },
        },
      ],
      connectedSpeech: {
        sound: '/wɔːk miː θruː/ and /lɛd ðə riːdɪ-zaɪn/',
        tip: 'In professional interviews, brief 1-second deliberate pauses between key points project authority.',
      },
      pausesAndFillers: ['That is a great question...', 'In my experience...', 'To give you an example...'],
    },
    express: {
      situationTitle: 'Professional Articulation & Negotiations',
      presetPhrases: [
        {
          intent: 'Disagreement / Pushback',
          base: "I don't like this idea.",
          casual: "I’m not really feeling this idea.",
          polite: "I’m not sure this is the best approach.",
          strong: "I really don't think this will work.",
          confident: "I have reservations about this direction; let's explore alternatives.",
          humor: "That’s an adventurous thought, but our roadmap might not survive it! 😅",
        },
      ],
    },
    feedbackAndImprove: {
      pedagogicalFixes: [
        {
          youSaid: 'Yesterday I do an interview.',
          whatWasWrong: "Using present tense 'do' instead of past tense for a completed interview.",
          howToImprove: "Use 'completed', 'had', or 'did'.",
          natural: 'Yesterday I completed an interview.',
          tryAgainPrompt: "Recount past interview (say: 'Yesterday I completed an interview').",
          expectedKeyword: 'completed',
        },
        {
          youSaid: 'I am having 3 years experience.',
          whatWasWrong: "Expressing professional background in present continuous ('I am having') is grammatically unnatural.",
          howToImprove: "State permanent facts in simple present: 'I have 3 years of experience'.",
          natural: 'I have 3 years of experience.',
          tryAgainPrompt: "State your experience (say: 'I have 3 years of experience').",
          expectedKeyword: 'i have',
        },
      ],
    },
  },
};

/**
 * Universal fallback builder for any scenario
 */
export const getAspectsForScenario = (scenario) => {
  if (!scenario) return null;
  const key = scenario.scenarioId || scenario._id;
  if (SPEAKING_ASPECTS_DATA[key]) {
    return SPEAKING_ASPECTS_DATA[key];
  }

  const title = scenario.title || 'Conversational English';
  const category = scenario.category || 'Work & Daily Life';
  const character = scenario.defaultCharacter || 'Alex';

  return {
    listenAndNotice: {
      workTopics: [
        {
          id: 'topic_main_situation',
          title: `Talk about: ${title}`,
          emoji: scenario.emoji || '🎙️',
          targetWordCount: scenario.difficulty === 'advanced' ? 60 : scenario.difficulty === 'intermediate' ? 40 : 28,
          explanation: `In this situation (${category}), clearly express your thoughts, explain what you need, and respond naturally to ${character}.`,
          keyQuestions: [
            'What is the situation you are in?',
            'What outcome do you want to achieve?',
            'How can you phrase it politely and clearly?',
          ],
          sampleSpeech: `Hello! I would like to discuss ${title}. I think focusing on key priorities first will help us achieve the best result for everyone involved.`,
          idiom: {
            phrase: 'What are you up to?',
            meaning: 'A natural, everyday way to ask what someone is doing.',
          },
        },
        {
          id: 'topic_opinion',
          title: 'Give your personal opinion on this situation',
          emoji: '💡',
          targetWordCount: 25,
          explanation: 'Practice expressing your genuine thought without hesitating or relying on stiff textbook grammar.',
          keyQuestions: [
            'Do you agree or disagree?',
            'Why do you feel this way?',
            'What alternative would you suggest?',
          ],
          sampleSpeech: 'In my opinion, we should take a simpler approach. If we keep things straightforward, everyone will be able to follow along much easier.',
          idiom: {
            phrase: 'From my perspective',
            meaning: 'A clear, confident way to introduce your personal point of view.',
          },
        },
      ],
      connectedSpeech: {
        sound: '/wʌt-ər-jə ʌp tuː/ (sounds like "Whaddya up to?")',
        tip: 'Link sounds smoothly across words instead of pausing between each one.',
      },
      pausesAndFillers: ['Well...', 'Honestly...', 'You know...', 'Actually...'],
    },
    express: {
      situationTitle: `${title} (${category})`,
      presetPhrases: [
        {
          intent: 'Disagreement / Pushback',
          base: "I don't like this idea.",
          casual: "I’m not really feeling this idea.",
          polite: "I’m not sure this is the best approach.",
          strong: "I really don't think this will work.",
          confident: "I have reservations about this direction; let's explore alternatives.",
          humor: "Love the ambition, but that might explode on us haha! 😅",
        },
      ],
    },
    feedbackAndImprove: {
      pedagogicalFixes: [
        {
          youSaid: 'Yesterday I go to college.',
          whatWasWrong: "Using present tense 'go' for past events.",
          howToImprove: "Use simple past 'went'.",
          natural: 'Yesterday I went to college.',
          tryAgainPrompt: "Say past action (say: 'Yesterday I went to college').",
          expectedKeyword: 'went',
        },
        {
          youSaid: 'I am agree with you.',
          whatWasWrong: "'Agree' is already a verb; do not add 'am'.",
          howToImprove: "Say 'I agree' directly.",
          natural: 'I completely agree with you.',
          tryAgainPrompt: "Say you agree (say: 'I agree with you').",
          expectedKeyword: 'agree',
        },
      ],
    },
  };
};

/**
 * Intelligent diagnostic helper for user's actual spoken text
 */
export const diagnoseUserSpokenText = (text, targetWordCount = 30) => {
  if (!text || !text.trim()) {
    return {
      wordCount: 0,
      targetReached: false,
      flaws: [],
    };
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = text.toLowerCase();
  const flaws = [];

  // Check 1: "yesterday ... go" or "last time ... go"
  if (lower.includes('yesterday') && lower.match(/\bgo\b/)) {
    flaws.push({
      youSaid: text.match(/[^.!?]*\byesterday\b[^.!?]*\bgo\b[^.!?]*/i)?.[0]?.trim() || 'Yesterday I go...',
      whatWasWrong: "Used present tense 'go' with past time marker 'yesterday'.",
      howToImprove: "Change 'go' to past tense 'went'.",
      natural: text.replace(/\bgo\b/gi, 'went'),
      tryAgainPrompt: "Say: 'Yesterday I went...'",
      expectedKeyword: 'went',
    });
  }

  // Check 2: "very like"
  if (lower.includes('very like')) {
    flaws.push({
      youSaid: '...very like...',
      whatWasWrong: "In English, 'very' modifies adjectives (very good), not verbs (like).",
      howToImprove: "Say 'really like' or 'love'.",
      natural: text.replace(/very like/gi, 'really like'),
      tryAgainPrompt: "Say: 'I really like...'",
      expectedKeyword: 'really like',
    });
  }

  // Check 3: "i am agree" / "i am disagree"
  if (lower.includes('am agree') || lower.includes('am disagree')) {
    flaws.push({
      youSaid: 'I am agree...',
      whatWasWrong: "'Agree' is already a verb. Adding 'am' is grammatically incorrect.",
      howToImprove: "Say 'I agree' or 'I completely agree'.",
      natural: text.replace(/i am agree/gi, 'I agree').replace(/am agree/gi, 'agree'),
      tryAgainPrompt: "Say: 'I completely agree with you'",
      expectedKeyword: 'agree',
    });
  }

  // Check 4: "borrow me"
  if (lower.includes('borrow me') || lower.includes('borrow to')) {
    flaws.push({
      youSaid: '...borrow me...',
      whatWasWrong: "You 'borrow from' someone (take). They 'lend to' you (give).",
      howToImprove: "Use 'lend me' when asking someone to give you something.",
      natural: text.replace(/borrow me/gi, 'lend me'),
      tryAgainPrompt: "Say: 'Could you lend me...'",
      expectedKeyword: 'lend',
    });
  }

  // Check 5: "I am having ... experience"
  if (lower.includes('am having') && (lower.includes('experience') || lower.includes('car') || lower.includes('phone'))) {
    flaws.push({
      youSaid: 'I am having...',
      whatWasWrong: "Possession and permanent state use simple present ('I have'), not present continuous ('I am having').",
      howToImprove: "Say 'I have 3 years of experience'.",
      natural: text.replace(/am having/gi, 'have'),
      tryAgainPrompt: "Say: 'I have experience...'",
      expectedKeyword: 'have',
    });
  }

  return {
    wordCount,
    targetReached: wordCount >= targetWordCount,
    flaws,
  };
};
