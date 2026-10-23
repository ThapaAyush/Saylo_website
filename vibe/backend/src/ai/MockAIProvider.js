import { AIProvider } from './AIProvider.js';

export class MockAIProvider extends AIProvider {
  async chatCompletion(systemPrompt, messages, options = {}) {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user' || m.role === 'user')?.text || '';
    const charName = options.characterName || 'Alex';
    const lower = lastUserMsg.toLowerCase();

    // Natural responsive replies tailored to persona
    if (charName === 'Alex') {
      if (lower.includes('coffee') || lower.includes('latte') || lower.includes('drink')) {
        return "I gotchu! Honestly their iced oat latte hits different. Do you want something sweet or just strong caffeine today?";
      }
      if (lower.includes('late') || lower.includes('running') || lower.includes('hurry')) {
        return "No worries at all, don't stress! I grabbed a booth in the corner, take your time.";
      }
      if (lower.includes('hey') || lower.includes('yo') || lower.includes('what') || lower.includes('how')) {
        return "Yo! Super good to see you. How's your week been treating you so far?";
      }
      return `Haha for real! That totally makes sense. What's the plan next though?`;
    }

    if (charName === 'Maya') {
      if (lower.includes('interview') || lower.includes('resume') || lower.includes('work') || lower.includes('experience')) {
        return "That's a solid foundation. Notice how you phrased that—if you say 'I spearheaded this project' instead of 'I did work on it', it sounds noticeably more confident. How would you frame your biggest achievement?";
      }
      return "That's a very clear point. In a collaborative setting, framing it like 'I propose we align on this first' works wonders. What's your next priority on this?";
    }

    if (charName === 'Kai') {
      if (lower.includes('game') || lower.includes('play') || lower.includes('win') || lower.includes('lose') || lower.includes('clutch')) {
        return "Bro that clutch play was insane! My team was throwing the entire second half though 😭 You down for another round or are you hopping off?";
      }
      return "GGs honestly! What servers do you usually queue on? The ping has been tragic lately.";
    }

    if (charName === 'Rio') {
      return "Wait wait wait... you actually said that out loud?! 💀 That is peak comedy. What did they even say back to you?";
    }

    if (charName === 'Emma') {
      return "I really like how you explained that! You're expressing your thoughts so clearly today. Would you like to try saying that with one new idiom we learned?";
    }

    if (charName === 'Noah') {
      return "Interesting approach. Technically speaking, that's clean logic. How are you handling the trade-offs on performance though?";
    }

    return "That's a great point! Keep going, how did that situation turn out in the end?";
  }

  async generateWritingVibes(text, targetVibes = []) {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    // Contextual intelligent generation
    let neutral = trimmed;
    let casual = "I'm not really feeling it rn tbh.";
    let funny = "Yeah... I'm gonna respectfully disappear ✌️💀";
    let professional = "I appreciate the invitation; however, I will be unable to attend.";
    let gentle = "I don't think I'm quite up for it today, but thank you for thinking of me!";
    let confident = "I'm passing on this one. Let's touch base next week.";
    let genz = "ngl that's a hard pass for me bro 😭";
    let polite = "Thank you so much for asking, but I won't be able to make it this time.";
    let short = "Can't make it today!";

    if (lower.includes('thank') || lower.includes('help')) {
      neutral = "Thank you for helping me.";
      casual = "Thanks a bunch, you're a lifesaver!";
      funny = "You just saved my life, no cap 👑";
      professional = "I sincerely appreciate your timely assistance and guidance.";
      gentle = "Thank you so much, that was truly kind of you.";
      confident = "Huge thanks. Made a massive difference.";
      genz = "W teammate right here, appreciate you big time 💯";
      polite = "I am very grateful for your generous support.";
      short = "Thanks a lot!";
    } else if (lower.includes('late') || lower.includes('running')) {
      neutral = "I am running late.";
      casual = "Running a bit late, be there in 10!";
      funny = "The traffic is personally victimizing me today 😭 omw though";
      professional = "Please accept my apologies; my arrival will be delayed by approximately ten minutes.";
      gentle = "Apologies for running behind schedule, I'm heading over right now.";
      confident = "Delayed by 10 minutes—starting as soon as I arrive.";
      genz = "literally sprinting rn bro 💀 be there in 5";
      polite = "Pardon my delay, I will be there as swiftly as possible.";
      short = "Running late, be there soon!";
    } else if (lower.includes('good') || lower.includes('great') || lower.includes('like')) {
      neutral = "I really like this idea.";
      casual = "Honestly this is so good!";
      funny = "Whoever came up with this deserves a Nobel Prize 🚀";
      professional = "I believe this proposed direction provides substantial strategic value.";
      gentle = "I really appreciate this thoughtful suggestion.";
      confident = "This is a winner. Let's roll with it.";
      genz = "nah this actually ate so hard 🔥";
      polite = "This is wonderfully executed, well done.";
      short = "Love this!";
    }

    return [
      { vibe: 'Neutral', text: neutral },
      { vibe: 'Casual', text: casual },
      { vibe: 'Funny', text: funny },
      { vibe: 'Professional', text: professional },
      { vibe: 'Gentle', text: gentle },
      { vibe: 'Confident', text: confident },
      { vibe: 'Gen-Z', text: genz },
      { vibe: 'Polite', text: polite },
      { vibe: 'Short', text: short },
    ];
  }

  async evaluateWriting(text, promptContext = '') {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    // Check for common learner mistakes:
    // e.g., "Yesterday I go market" -> "Yesterday I went to the market"
    if (lower.includes('yesterday') && lower.includes(' go ')) {
      return {
        better: text.replace(/\bgo\b/i, 'went to the'),
        why: "When you refer to an event that concluded in the past (like 'yesterday'), use the simple past tense 'went' along with preposition 'to the'.",
        tryAgainExercise: {
          sentenceWithBlank: "Yesterday I ______ to the market to buy groceries.",
          correctWord: "went",
        },
        naturalnessScore: 68,
      };
    }

    if (lower.includes('very like') || lower.includes('i very like')) {
      return {
        better: text.replace(/very like/gi, 'really like'),
        why: "In natural English, 'very' modifies adjectives (very happy, very good). With verbs like 'like' or 'enjoy', native speakers say 'really like' or 'like it a lot'.",
        tryAgainExercise: {
          sentenceWithBlank: "I ______ like this song, it's on repeat all day.",
          correctWord: "really",
        },
        naturalnessScore: 72,
      };
    }

    if (lower.includes('borrow') && (lower.includes('to him') || lower.includes('to her') || lower.includes('to my'))) {
      return {
        better: text.replace(/borrow/gi, 'lend'),
        why: "You 'borrow' something from someone (you take it). You 'lend' something to someone (you give it temporarily).",
        tryAgainExercise: {
          sentenceWithBlank: "Could you ______ me your notes until tomorrow?",
          correctWord: "lend",
        },
        naturalnessScore: 65,
      };
    }

    if (lower.includes('i am agree') || lower.includes('i am disagree')) {
      return {
        better: text.replace(/i am agree/gi, 'I agree').replace(/i am disagree/gi, 'I disagree'),
        why: "'Agree' is already a verb in English! You don't need 'am'. Just say 'I agree' or 'I completely agree'.",
        tryAgainExercise: {
          sentenceWithBlank: "I completely ______ with your perspective.",
          correctWord: "agree",
        },
        naturalnessScore: 70,
      };
    }

    // Default pedagogical response
    return {
      better: `${trimmed.charAt(0).toUpperCase() + trimmed.slice(1)} — that flows so cleanly!`,
      why: "Your sentence is clear and conveys the emotion well. Notice how natural punctuation and confident phrasing elevates the whole vibe.",
      tryAgainExercise: {
        sentenceWithBlank: `That is definitely the most ______ way to put it!`,
        correctWord: "natural",
      },
      naturalnessScore: 92,
    };
  }

  async explainVocabulary(word, context = '', targetLang = 'hindi') {
    const w = word.toLowerCase().trim();
    
    // Rich contextual breakdown
    const dictionary = {
      'ate': {
        simpleMeaning: "Did something exceptionally well or looked amazing.",
        tone: "Super high praise / Casual / Internet slang",
        casualExample: "Bro's outfit actually ate, not gonna lie.",
        formalExample: "He performed exceptionally well in the showcase.",
        hindiMeaning: "बहुत ही ज़बरदस्त या कमाल का काम किया।",
        hindiExample: "उसने स्टेज पर एकदम आग लगा दी (he ate).",
        whenNotToUse: "Never use in a formal legal document, obituary, or standard corporate performance review.",
        similarVibes: ["killed it", "slayed", "nailed it"],
      },
      'ngl': {
        simpleMeaning: "Short for 'not gonna lie' — used to admit an honest opinion or vulnerability.",
        tone: "Casual & conversational",
        casualExample: "ngl that burger was worth the 40-minute wait.",
        formalExample: "In all candor, the culinary experience exceeded our expectations.",
        hindiMeaning: "सच कहूँ तो / बिना झूठ बोले।",
        hindiExample: "सच कहूँ तो (ngl), मुझे वो गाना बहुत पसंद आया।",
        whenNotToUse: "Academic papers or official emails to senior leadership.",
        similarVibes: ["to be real", "honestly", "truth be told"],
      },
      'awkward': {
        simpleMeaning: "Uncomfortable, socially weird, or embarrassing.",
        tone: "Everyday conversational",
        casualExample: "It was so awkward when nobody laughed at the joke 💀",
        formalExample: "The interaction caused an uncomfortable and tense social silence.",
        hindiMeaning: "असहज, झिझक भरा या अजीब स्थिति।",
        hindiExample: "वहाँ सब चुप हो गए तो माहौल बहुत अजीब (awkward) हो गया।",
        whenNotToUse: "Scientific descriptions unless referring directly to social dynamics.",
        similarVibes: ["cringe", "uncomfortable", "stiff"],
      },
    };

    if (dictionary[w]) {
      return dictionary[w];
    }

    return {
      simpleMeaning: `A lively expression used in social and casual settings to add nuance or color.`,
      tone: "Expressive & contextual",
      casualExample: `You'll hear this in everyday chats: "${word} hits different."`,
      formalExample: `Standard alternative: "This is particularly notable and effective."`,
      hindiMeaning: `आम बोलचाल में इस्तेमाल होने वाला स्वाभाविक शब्द।`,
      hindiExample: `दोस्तों के साथ बातचीत में इसका इस्तेमाल बहुत आम है।`,
      whenNotToUse: "Rigid formal exams or legal contracts.",
      similarVibes: ["natural", "vibe", "expressive"],
    };
  }

  async evaluateSpeakingConversation(messages, scenarioContext = {}) {
    const userMessages = messages.filter(m => m.sender === 'user');
    const totalWords = userMessages.reduce((acc, m) => acc + m.text.split(/\s+/).length, 0);

    // Dynamic metrics based on message count and length
    const fluency = Math.min(94, Math.max(62, 70 + Math.floor(totalWords * 1.2)));
    const vocabulary = Math.min(92, Math.max(65, 74 + Math.floor(userMessages.length * 2.5)));
    const grammar = Math.min(88, Math.max(60, 72 + Math.floor(totalWords * 0.8)));
    const naturalness = Math.min(95, Math.max(55, 68 + Math.floor(userMessages.length * 3)));

    const quickFixes = [];

    // Detect any common speaking habits
    const joinedUser = userMessages.map(m => m.text).join(' ').toLowerCase();

    if (joinedUser.includes('very like') || joinedUser.includes('i very')) {
      quickFixes.push({
        youSaid: "I very like this.",
        natural: "I really like this / I love this.",
        explanation: "Native speakers use 'really' or 'so much' with verbs instead of 'very'."
      });
    }

    if (joinedUser.includes('yesterday i go') || joinedUser.includes('last time i go')) {
      quickFixes.push({
        youSaid: "Yesterday I go...",
        natural: "Yesterday I went...",
        explanation: "Keep past tense consistent when recalling past experiences."
      });
    }

    if (quickFixes.length === 0) {
      quickFixes.push({
        youSaid: userMessages[0]?.text || "I want this.",
        natural: "Could I grab this, please? / I'm eyeing this one.",
        explanation: "Using polite phrasing like 'Could I grab...' sounds much more natural in casual settings."
      });
      quickFixes.push({
        youSaid: "I agree with you.",
        natural: "100%, totally agree with you.",
        explanation: "Adding natural conversational intensifiers makes your flow feel effortless."
      });
    }

    return {
      metrics: {
        fluency,
        vocabulary,
        grammar,
        naturalness,
      },
      quickFixes,
      overallComment: "Great speaking rhythm! You kept the conversation rolling without awkward pauses.",
    };
  }
}
