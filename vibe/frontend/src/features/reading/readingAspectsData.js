/**
 * Rich pedagogical data for the 4 Aspects of Reading:
 * 1. Discover 👀 (Find things you actually want to read: chats, stories, posts, scenes)
 * 2. Understand 🧠 (What the text actually means: subtext, tone, implies vs literal)
 * 3. Interact 🎮 (Choose what happens next, reply to character, test subtext)
 * 4. Remember & Apply 🔁 (Read -> Vocabulary -> Write -> Speak personal challenge)
 */

export const READING_ASPECTS_DATA = {
  // 1. When Plans Collapse at 7:15 PM 💀 (Beginner Social Chat)
  plans_collapse: {
    discover: {
      format: 'Chat Conversation',
      formatEmoji: '💬',
      category: 'Social Plans & Friendship',
      estimatedTime: '60 sec',
      audioNarration:
        "Maya texts: Yo, are you coming tonight or what? Sam replies: I don't know, to be honest... my battery was on 3 percent all day. Maya: Bro, you literally said yes yesterday! Everyone is already at the diner. Sam: Yeah, but my mom found out about the midterm grade. Maya: Oh no, are you grounded? Sam: Grounded is an understatement. I am serving a life sentence in my bedroom right now. Maya: LMAO rest in peace. I will save some cheesy fries for you soldier!",
      chatMessages: [
        { sender: 'Maya', text: 'yo are you coming tonight or what? 😭', isUser: false, time: '7:14 PM' },
        { sender: 'Sam', text: 'idk tbh... my battery was on 3% all day', isUser: true, time: '7:15 PM' },
        { sender: 'Maya', text: 'bro you literally said yes yesterday 💀 everyone is already at the diner', isUser: false, time: '7:16 PM' },
        { sender: 'Sam', text: 'yeah but... my mom found out about the midterm grade 😭', isUser: true, time: '7:17 PM' },
        { sender: 'Maya', text: 'OH NO 💀 are you grounded?!', isUser: false, time: '7:17 PM' },
        { sender: 'Sam', text: 'grounded is an understatement. I am serving a life sentence in my bedroom rn', isUser: true, time: '7:18 PM' },
        { sender: 'Maya', text: 'lmao RIP. I will save some cheesy fries for you soldier 🫡', isUser: false, time: '7:19 PM' },
      ],
    },
    understand: {
      mainIdea: "Sam backed out of dinner plans at the last minute because his mom found out about his poor midterm grades and strictly confined him to his room.",
      subtextImplications: [
        {
          quote: "idk tbh... my battery was on 3% all day",
          literal: "My phone's battery level was very low.",
          implied: "Using low battery as a hesitation excuse because he was dreading having to admit he got into trouble.",
          tone: "Hesitant & nervous avoidance 😬",
        },
        {
          quote: "grounded is an understatement. I am serving a life sentence in my bedroom rn",
          literal: "I am convicted of a legal crime and imprisoned in a federal facility.",
          implied: "Extreme exaggeration (hyperbole) meaning his mother was furious and forbade him from leaving his room under any circumstances.",
          tone: "Dramatic humor & defeat 💀",
        },
        {
          quote: "Yeah, sure. Whatever.",
          literal: "Agreement with whatever was proposed.",
          implied: "Annoyed, dismissive reluctance — they actually do not agree or are irritated.",
          tone: "Passive-aggressive dismissiveness 🙄",
        },
      ],
      toneAndEmotion: {
        dominantTone: "Playful panic, peer teasing & relatable drama",
        explanation: "Close friends using internet slang (idk, tbh, RIP, caught, rn) to soften bad news and show affection through teasing.",
      },
      vocabularyInContext: [
        {
          word: 'idk tbh',
          meaning: "Short for 'I don't know, to be honest'. Used to admit uncertainty or reluctance.",
          casualVsFormal: "Casual: 'idk tbh' • Formal: 'I am somewhat uncertain, in all honesty.'",
        },
        {
          word: 'understatement',
          meaning: "A statement that describes something as smaller or less bad than it really is.",
          casualVsFormal: "Casual: 'understatement of the century' • Formal: 'a marked minimization of severity.'",
        },
        {
          word: 'grounded',
          meaning: "Punished by parents by being forbidden from going out with friends.",
          casualVsFormal: "Casual: 'I got grounded' • Formal: 'subjected to parental domestic confinement.'",
        },
      ],
      casualVsFormal: {
        casual: "bro you literally said yes yesterday 💀",
        formal: "You explicitly confirmed your attendance during our prior correspondence yesterday.",
        takeaway: "In chat conversations, hyperbole and emojis convey emotion that textbook grammar lacks.",
      },
    },
    interact: {
      question: {
        prompt: "Maya: “Are you coming tonight?”\nSam: “I might.”\n\nWhat does “I might” probably mean in this context?",
        options: [
          "Definitely yes — he has already ordered his meal.",
          "Definitely no — he is refusing politely.",
          "Maybe / Probably reluctant — he is hesitant and non-committal.",
          "I don't understand English.",
        ],
        correctIndex: 2,
        explanation: "In spoken and text English, 'I might' is classic conversational hedging. It softens the news and usually indicates reluctance or uncertainty rather than a firm yes.",
      },
      replyChallenge: {
        characterPrompt: "Maya: “Should we order the cheesy fries right now or wait 10 minutes in case Sam escapes?”",
        choices: [
          { text: "Order them now! He said he is serving a life sentence, no chance he shows up haha 🍟", isNatural: true, feedback: "Super natural! References the joke and uses lively conversational tone." },
          { text: "We shall commence consumption of potato wedges subsequent to ten minutes.", isNatural: false, feedback: "Too stiff and mechanical for a friend group chat!" },
          { text: "Let's grab a portion now and leave half for him if he sneaks out.", isNatural: true, feedback: "Great natural conversational suggestion." },
        ],
      },
    },
    apply: {
      promptTitle: "Your Turn: A Time Plans Collapsed",
      instructions: "Tell me about a time you had plans with friends but couldn't go, or a time you got stuck at home.",
      targetExpressions: ['to be honest (tbh)', 'understatement', 'might', 'last minute'],
      sampleAnswer: "To be honest, last Friday I had plans to watch a movie with my friends. But at the last minute my boss asked for an urgent report. Saying I was stressed is an understatement!",
    },
  },

  // 2. The Group Project Ghost 👻 (Intermediate College Chat)
  group_project_ghost: {
    discover: {
      format: 'Group Chat Drama',
      formatEmoji: '📱',
      category: 'University & Group Work',
      estimatedTime: '90 sec',
      audioNarration:
        "Rohan texts: Guys, the slide deck is due in two hours... where are Kevin's slides? Ananya: He hasn't read the WhatsApp group since Tuesday! Kevin replies: Yo, my bad, had a family emergency. Rohan: Bro, your Instagram story shows you at a music festival twenty minutes ago! Ananya: Literally caught in 4K. Kevin: Okay, hear me out... my cousin took my phone! I am typing slides right now, I swear. Rohan: You have thirty minutes before we submit without your name on it, no cap.",
      chatMessages: [
        { sender: 'Rohan', text: 'guys the slide deck is due in two hours... where are Kev’s slides?!', isUser: false, time: '9:00 PM' },
        { sender: 'Ananya', text: 'he hasn’t read the WhatsApp group since Tuesday 💀', isUser: false, time: '9:02 PM' },
        { sender: 'Kevin', text: 'yo my bad had family emergency', isUser: true, time: '9:15 PM' },
        { sender: 'Rohan', text: 'bro your Instagram story shows you at a music festival 20 mins ago 🚩', isUser: false, time: '9:16 PM' },
        { sender: 'Ananya', text: 'literally caught in 4K 😭', isUser: false, time: '9:16 PM' },
        { sender: 'Kevin', text: 'ok hear me out... my cousin took my phone! I am typing slides rn I swear', isUser: true, time: '9:17 PM' },
        { sender: 'Rohan', text: 'you have 30 minutes before we submit without your name on it, no cap.', isUser: false, time: '9:18 PM' },
      ],
    },
    understand: {
      mainIdea: "A university student skipped team work and lied about an emergency, only to get caught partying on social media right before the project deadline.",
      subtextImplications: [
        {
          quote: "literally caught in 4K",
          literal: "Recorded in four-thousand pixels resolution.",
          implied: "Caught red-handed with clear, undeniable evidence where denying it looks ridiculous.",
          tone: "Amused disbelief & calling out a lie 📸",
        },
        {
          quote: "ok hear me out...",
          literal: "Please listen to my acoustic voice.",
          implied: "I know this sounds completely fake, but please let me make up another excuse.",
          tone: "Flustered scrambling 😬",
        },
        {
          quote: "no cap",
          literal: "Not wearing a baseball hat.",
          implied: "No lie, completely serious, zero exaggeration.",
          tone: "Firm boundary & warning 🛑",
        },
      ],
      toneAndEmotion: {
        dominantTone: "Frustrated confrontation with modern peer humor",
        explanation: "Classmates balancing project urgency with internet slang to call out poor teamwork.",
      },
      vocabularyInContext: [
        {
          word: 'caught in 4K',
          meaning: "Caught doing something wrong with clear undeniable proof.",
          casualVsFormal: "Casual: 'caught in 4K' • Formal: 'apprehended with irrefutable visual evidence.'",
        },
        {
          word: 'no cap',
          meaning: "Authentic, truthful, not exaggerating or lying.",
          casualVsFormal: "Casual: 'no cap' • Formal: 'I assure you this is without hyperbole.'",
        },
        {
          word: 'slide deck',
          meaning: "A PowerPoint or Google Slides presentation file.",
          casualVsFormal: "Standard industry vocabulary for team slide presentations.",
        },
      ],
      casualVsFormal: {
        casual: "you have 30 minutes before we submit without your name",
        formal: "You have a thirty-minute grace period prior to our formal group submission excluding your contribution.",
        takeaway: "Direct ultimatum expressed clearly without sounding like a legal contract.",
      },
    },
    interact: {
      question: {
        prompt: "When Rohan says: “You have 30 minutes before we submit without your name on it, no cap.”\nWhat is Rohan really implying?",
        options: [
          "He wants Kevin to buy him a baseball cap.",
          "He is giving a strict final deadline and will remove Kevin from credit if he fails.",
          "He is joking and will do Kevin's slides for him.",
          "He needs Kevin to edit his Instagram photo.",
        ],
        correctIndex: 1,
        explanation: "Rohan is establishing an assertive boundary: deliver your promised work within 30 minutes or forfeit credit entirely.",
      },
      replyChallenge: {
        characterPrompt: "Kevin: “Guys please don't take my name off, what should I finish first?!”",
        choices: [
          { text: "Finish the conclusion slide and bibliography right now, then email the deck!", isNatural: true, feedback: "Direct, constructive, and actionable!" },
          { text: "It would be advantageous if your person could formulate the subsequent terminal slide.", isNatural: false, feedback: "Way too robotic and unnatural." },
        ],
      },
    },
    apply: {
      promptTitle: "Your Turn: Dealing with Team Deadlines",
      instructions: "Describe a time someone was late with their work or when a group project was stressful.",
      targetExpressions: ['caught in 4K', 'deadline', 'no cap', 'to be honest'],
      sampleAnswer: "In college, our lab partner didn't show up until 10 minutes before the deadline. We were so stressed, but he finished his section just in the nick of time, no cap!",
    },
  },
};

/**
 * Universal fallback generator for any story
 */
export const getReadingAspectsForStory = (story) => {
  if (!story) return null;
  const key = story._id || story.title?.toLowerCase()?.replace(/[^a-z0-9]/g, '_');
  if (READING_ASPECTS_DATA[key]) {
    return READING_ASPECTS_DATA[key];
  }

  // Check matching by keywords
  const titleLower = (story.title || '').toLowerCase();
  if (titleLower.includes('collapse') || titleLower.includes('plans')) {
    return READING_ASPECTS_DATA.plans_collapse;
  }
  if (titleLower.includes('ghost') || titleLower.includes('group project')) {
    return READING_ASPECTS_DATA.group_project_ghost;
  }

  // Synthesize rich contextual aspects from the story object
  const title = story.title || 'Everyday English Story';
  const category = story.category || 'Real Life';
  const summary = story.summary || 'An engaging narrative highlighting real conversational habits and everyday phrases.';
  const content = story.content || summary;

  return {
    discover: {
      format: story.type === 'chat_story' ? 'Chat Conversation' : story.type === 'interactive_story' ? 'Branching Story' : 'Short Story',
      formatEmoji: story.type === 'chat_story' ? '💬' : '📖',
      category: category,
      estimatedTime: story.estimatedTime || '60 sec',
      audioNarration: content,
      chatMessages: story.chatMessages || [
        { sender: 'Alex', text: `Have you seen the latest update about ${title}?`, isUser: false, time: '10:00 AM' },
        { sender: 'You', text: 'Not yet! What is the main story?', isUser: true, time: '10:01 AM' },
        { sender: 'Alex', text: 'Let me break down what happened step-by-step.', isUser: false, time: '10:02 AM' },
      ],
    },
    understand: {
      mainIdea: summary,
      subtextImplications: [
        {
          quote: "Yeah, sure. Whatever.",
          literal: "Agreement with whatever was proposed.",
          implied: "Annoyed / dismissive reluctance — they are irritated or giving up the argument.",
          tone: "Passive-aggressive dismissiveness 🙄",
        },
        {
          quote: "I might.",
          literal: "Possibility exists.",
          implied: "Polite hesitation — leaning toward no, but avoiding direct conflict.",
          tone: "Soft avoidance & non-committal 🤷",
        },
        {
          quote: "No worries at all!",
          literal: "Zero concern.",
          implied: "Warm social reassurance that puts the other person at ease.",
          tone: "Friendly & reassuring 🤝",
        },
      ],
      toneAndEmotion: {
        dominantTone: `Expressive & authentic ${category} conversation`,
        explanation: 'Natural spoken English where tone and cadence convey more meaning than isolated words.',
      },
      vocabularyInContext: (story.vocabulary || ['natural', 'context', 'expression', 'vibe']).map(v => ({
        word: v,
        meaning: `A key contextual word in this read indicating nuance in ${category}.`,
        casualVsFormal: `Casual: everyday usage • Formal: textbook equivalent.`,
      })),
      casualVsFormal: {
        casual: `That's totally fine, no stress!`,
        formal: `The aforementioned occurrence presents no inconvenience to our operations.`,
        takeaway: 'Real English prioritizes human connection and flow over textbook rigidity.',
      },
    },
    interact: {
      question: story.questions?.[0] || {
        prompt: `Maya: “Are you coming tonight?”\nSam: “I might.”\n\nWhat does “I might” probably mean?`,
        options: [
          'Definitely yes',
          'Definitely no',
          'Maybe / Probably reluctant',
          'I do not understand',
        ],
        correctIndex: 2,
        explanation: `“I might” is a natural conversational way to express polite hesitation or reluctance without creating direct conflict.`,
      },
      replyChallenge: {
        characterPrompt: `How would you naturally respond to the situation in “${title}”?`,
        choices: [
          { text: "Count me in! Let's handle it together.", isNatural: true, feedback: "Direct, warm, and natural conversational response!" },
          { text: "I hereby acknowledge receipt of this proposition.", isNatural: false, feedback: "Too stiff and robotic!" },
        ],
      },
    },
    apply: {
      promptTitle: `Your Turn: Real Life Experience`,
      instructions: `Reflect on the theme of "${title}". Share a quick 2-3 sentence personal experience related to this situation.`,
      targetExpressions: story.vocabulary || ['honestly', 'to be real', 'no worries', 'at the moment'],
      sampleAnswer: `Honestly, something very similar happened to me last month. I was caught in traffic and had to text my team at the last minute!`,
    },
  };
};
