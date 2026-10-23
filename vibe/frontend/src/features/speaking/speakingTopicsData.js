/**
 * Curated 4 Speaking Topics per level for SAYLO:
 * Each topic has:
 * - id: unique identifier
 * - title: Topic title
 * - emoji: Visual icon
 * - category: Situation category
 * - explanation: Short 1-2 sentence explanation of the situation and what to say
 * - sampleSpeech: Sample natural speech for audio listening
 * - keywords: Contextual words expected in a relevant answer
 * - situationIntent: The core purpose the user needs to fulfill
 * - requirements: Explicit criteria checklist for checking topic match
 */

export const SPEAKING_TOPICS = {
  beginner: [
    {
      id: 'b1',
      title: 'Order Coffee & Morning Plan',
      emoji: '☕',
      category: 'Café & Routine',
      targetWords: 20,
      situationIntent: 'Order a coffee or tea, and mention a quick plan or study/work for today',
      keywords: [
        'coffee', 'tea', 'latte', 'cappuccino', 'drink', 'beverage', 'iced', 'hot', 'cup',
        'order', 'please', 'get', 'grab', 'have', 'plan', 'today', 'morning', 'study',
        'work', 'busy', 'meeting', 'class', 'energy', 'day', 'ahead', 'oat', 'espresso', 'mocha'
      ],
      requirements: [
        {
          id: 'order',
          label: 'Order a coffee, tea, or beverage',
          emoji: '☕',
          keywords: [
            'coffee', 'tea', 'latte', 'cappuccino', 'espresso', 'mocha', 'americano', 'drink',
            'beverage', 'iced', 'hot', 'cup', 'oat', 'milk', 'matcha', 'brew', 'order', 'please',
            'get', 'have', 'grab', 'want', 'give'
          ],
        },
        {
          id: 'plan',
          label: 'Share today’s plan, work, or study routine',
          emoji: '📅',
          keywords: [
            'plan', 'today', 'morning', 'work', 'working', 'study', 'studying', 'class', 'classes',
            'meeting', 'meetings', 'busy', 'day', 'schedule', 'errands', 'gym', 'ahead', 'exam',
            'office', 'project', 'energy', 'boost', 'going', 'have to', 'need to'
          ],
        },
      ],
      explanation:
        'Order your favorite coffee or tea, and say one quick sentence about what you have to do today.',
      sampleSpeech:
        'Good morning! Could I please get an iced oat latte? I have a busy day of study ahead and need an energy boost.',
      tips: ['Start politely: "Could I get..."', 'Mention your plan: "I have to..."'],
    },
    {
      id: 'b2',
      title: 'Introduce Yourself at a Gathering',
      emoji: '🎉',
      category: 'Social Mixer',
      targetWords: 20,
      situationIntent: 'State your name, mention how you know the host, and ask a return question',
      keywords: [
        'hi', 'hello', 'hey', 'name', 'am', 'ayush', 'rahul', 'host', 'friend', 'friends',
        'know', 'met', 'college', 'school', 'work', 'evening', 'party', 'tonight', 'here',
        'gathering', 'long', 'you', 'how'
      ],
      requirements: [
        {
          id: 'intro',
          label: 'Friendly greeting & state your name',
          emoji: '👋',
          keywords: ['hi', 'hello', 'hey', 'name', 'am', "i'm", 'ayush', 'rahul', 'alex', 'introducing', 'myself', 'meet'],
        },
        {
          id: 'host',
          label: 'Mention how you know the host or connection to gathering',
          emoji: '🎉',
          keywords: ['friend', 'friends', 'host', 'rahul', 'college', 'school', 'work', 'party', 'gathering', 'know', 'met', 'invited', 'mutual'],
        },
        {
          id: 'question',
          label: 'Ask a friendly return question',
          emoji: '💬',
          keywords: ['how', 'you', 'evening', 'tonight', 'long', 'been', 'having', 'fun', 'what about you', 'how are you'],
        },
      ],
      explanation:
        'You just met someone new at a friend’s get-together. Say your name, how you know the host, and ask how their evening is going.',
      sampleSpeech:
        'Hey there! I am Ayush. I know Rahul from college. How long have you been here tonight?',
      tips: ['Say how you know the host', 'Ask a friendly return question'],
    },
    {
      id: 'b3',
      title: 'Apologize for Being Late',
      emoji: '⏳',
      category: 'Daily Situations',
      targetWords: 20,
      situationIntent: 'Apologize politely for arriving late and explain why in one sentence',
      keywords: [
        'sorry', 'apologize', 'late', 'traffic', 'delay', 'delayed', 'wait', 'waiting',
        'caught', 'road', 'bus', 'train', 'car', 'punishment', 'jam', 'held', 'running',
        'behind', 'schedule', 'minutes'
      ],
      requirements: [
        {
          id: 'apology',
          label: 'Polite apology for keeping them waiting',
          emoji: '🙏',
          keywords: ['sorry', 'apologize', 'apologies', 'forgive', 'pardon', 'late', 'keeping you waiting', 'ran late'],
        },
        {
          id: 'cause',
          label: 'Explain what caused the delay in one sentence',
          emoji: '🚗',
          keywords: ['traffic', 'jam', 'delay', 'delayed', 'bus', 'train', 'car', 'road', 'held', 'stuck', 'caught', 'emergency', 'flat tire', 'meeting', 'schedule', 'alarm', 'minutes'],
        },
      ],
      explanation:
        'You arrived 15 minutes late to meet your friend. Apologize politely and explain what caused the delay in one sentence.',
      sampleSpeech:
        'Hey, so sorry for keeping you waiting! I got caught in unexpected traffic on the main road.',
      tips: ['Use: "Sorry for keeping you waiting"', 'Give a short reason: "I got caught in..."'],
    },
    {
      id: 'b4',
      title: 'Ask for Directions in a Mall',
      emoji: '🧭',
      category: 'Public Help',
      targetWords: 20,
      situationIntent: 'Politely ask a security guard or shopkeeper where the bookstore or floor is',
      keywords: [
        'excuse', 'direction', 'directions', 'bookstore', 'book', 'books', 'store', 'shop',
        'floor', 'second', 'where', 'find', 'looking', 'help', 'tell', 'mall', 'nearest',
        'trying', 'located'
      ],
      requirements: [
        {
          id: 'greeting',
          label: 'Polite opening / excuse me',
          emoji: '🤝',
          keywords: ['excuse', 'pardon', 'please', 'could you', 'would you', 'help', 'tell me', 'can you', 'hello', 'hi'],
        },
        {
          id: 'bookstore',
          label: 'Ask for bookstore or floor location',
          emoji: '📚',
          keywords: ['bookstore', 'book', 'books', 'store', 'shop', 'floor', 'second', 'where', 'find', 'looking', 'direction', 'directions', 'located', 'nearest', 'way'],
        },
      ],
      explanation:
        'You are searching for the bookstore inside a large mall. Ask a security guard or shopkeeper politely for directions.',
      sampleSpeech:
        'Excuse me, could you please tell me where the nearest bookstore is? I am trying to find the second floor.',
      tips: ['Begin with: "Excuse me, could you tell me..."', 'Specify what store you need'],
    },
  ],

  intermediate: [
    {
      id: 'i1',
      title: 'Politely Disagree with a Colleague',
      emoji: '🤝',
      category: 'Workplace Teamwork',
      targetWords: 30,
      situationIntent: 'Acknowledge colleague’s point and propose a 2-day testing compromise',
      keywords: [
        'point', 'agree', 'disagree', 'launch', 'quickly', 'testing', 'test', 'bugs', 'risk',
        'compromise', 'concern', 'concerned', 'two', 'day', 'days', 'feature', 'run', 'could'
      ],
      requirements: [
        {
          id: 'acknowledge',
          label: 'Acknowledge colleague’s viewpoint or launch speed',
          emoji: '👂',
          keywords: ['point', 'see your point', 'understand', 'launch', 'quickly', 'perspective', 'hear you', 'agree', 'concern', 'concerned'],
        },
        {
          id: 'compromise',
          label: 'Propose a quick 2-day testing compromise',
          emoji: '🧪',
          keywords: ['test', 'testing', 'bugs', 'risk', 'compromise', 'two-day', '2-day', 'days', 'two days', 'run', 'check', 'qa', 'first', 'could we'],
        },
      ],
      explanation:
        'A teammate wants to launch a feature without testing. Express your concern politely and suggest a quick 2-day testing compromise.',
      sampleSpeech:
        'I see your point about launching quickly, but I am concerned that skipping testing might cause bugs. Could we run a quick two-day test first?',
      tips: ['Validate first: "I see your point, but..."', 'Propose an alternative: "Could we..."'],
    },
    {
      id: 'i2',
      title: 'Update Your Manager on a Delay',
      emoji: '📊',
      category: 'Professional Updates',
      targetWords: 30,
      situationIntent: 'Inform manager of report delay calmly, explain reason, and give firm new deadline',
      keywords: [
        'manager', 'update', 'report', 'delay', 'delayed', 'hours', 'numbers', 'checking',
        'double', 'send', 'pm', 'time', 'deadline', 'quarterly', 'priya', 'ready', 'latest'
      ],
      requirements: [
        {
          id: 'update',
          label: 'Notify manager calmly about report delay',
          emoji: '📢',
          keywords: ['update', 'report', 'delay', 'delayed', 'quarterly', 'status', 'manager', 'project', 'running behind', 'hi', 'quick'],
        },
        {
          id: 'deadline',
          label: 'Explain checking reason & commit to new completion time',
          emoji: '⏰',
          keywords: ['checking', 'double-checking', 'numbers', 'data', 'reviewing', '4 pm', 'pm', 'hours', 'today', 'send', 'latest', 'by', 'time', 'ready'],
        },
      ],
      explanation:
        'Your report will be ready 2 hours late. Update your manager calmly, explain why, and give a firm new completion time.',
      sampleSpeech:
        'Hi Priya, quick update on the quarterly report. We are double-checking the latest numbers, so I will send it over by 4 PM today instead.',
      tips: ['Be proactive: "Quick update on..."', 'Give a firm new deadline'],
    },
    {
      id: 'i3',
      title: 'Suggest an Alternative Plan with Friends',
      emoji: '🍜',
      category: 'Social Plans',
      targetWords: 25,
      situationIntent: 'Decline an expensive venue without awkwardness and suggest a casual spot',
      keywords: [
        'expensive', 'steep', 'price', 'restaurant', 'spot', 'ramen', 'food', 'downtown',
        'casual', 'instead', 'how about', 'amazing', 'tonight', 'alternative', 'budget', 'eat'
      ],
      requirements: [
        {
          id: 'decline',
          label: 'Acknowledge or decline the expensive spot tactfully',
          emoji: '💸',
          keywords: ['expensive', 'steep', 'price', 'cost', 'pricy', 'fancy', 'place', 'restaurant', 'budget', 'tonight', 'looks amazing'],
        },
        {
          id: 'alternative',
          label: 'Suggest an affordable casual alternative nearby',
          emoji: '🍜',
          keywords: ['casual', 'ramen', 'pizza', 'diner', 'spot', 'downtown', 'nearby', 'how about', 'instead', 'alternative', 'cozy', 'eat', 'food'],
        },
      ],
      explanation:
        'Friends suggest an expensive restaurant. Suggest a great, affordable casual spot nearby without sounding awkward.',
      sampleSpeech:
        'That place looks amazing, but it might be a bit steep for tonight. How about that cozy ramen spot downtown instead?',
      tips: ['Avoid saying "too poor": say "a bit steep"', 'Offer an immediate alternative'],
    },
    {
      id: 'i4',
      title: 'Exchange a Defective Item at a Store',
      emoji: '🎧',
      category: 'Customer Service',
      targetWords: 25,
      situationIntent: 'Explain headphone malfunction with receipt in hand and request exchange',
      keywords: [
        'headphones', 'earbud', 'earbuds', 'stopped', 'working', 'receipt', 'exchange',
        'defective', 'bought', 'yesterday', 'store', 'pair', 'replace', 'fix', 'return'
      ],
      requirements: [
        {
          id: 'defect',
          label: 'Explain purchase date and the defect with receipt',
          emoji: '🎧',
          keywords: ['bought', 'yesterday', 'headphones', 'earbud', 'earbuds', 'stopped', 'working', 'defective', 'receipt', 'issue', 'broken', 'left'],
        },
        {
          id: 'exchange',
          label: 'Politely request an exchange or replacement',
          emoji: '🔄',
          keywords: ['exchange', 'replace', 'new pair', 'return', 'fix', 'swap', 'could i', 'please'],
        },
      ],
      explanation:
        'Headphones bought yesterday stopped working on one side. Calmly explain the problem with receipt in hand and request an exchange.',
      sampleSpeech:
        'Hello, I bought these headphones yesterday, but the left earbud stopped working this morning. Here is the receipt—could I please exchange them for a new pair?',
      tips: ['State purchase date and the exact defect', 'Politely request an exchange or fix'],
    },
  ],

  advanced: [
    {
      id: 'a1',
      title: 'Pitch a Strategic Idea to Leadership',
      emoji: '🚀',
      category: 'Executive Strategy',
      targetWords: 40,
      situationIntent: 'Highlight onboarding bottleneck, suggest automation, and quantify 40% gain',
      keywords: [
        'bottleneck', 'automate', 'automation', 'efficiency', 'percent', 'cycle', 'time',
        'onboarding', 'manual', 'client', 'leadership', 'executives', 'gain', 'freeing', 'team'
      ],
      requirements: [
        {
          id: 'bottleneck',
          label: 'Articulate the manual onboarding bottleneck',
          emoji: '⏳',
          keywords: ['bottleneck', 'manual', 'onboarding', 'delay', 'process', 'two-day', 'hours', 'inefficient', 'slow', 'creates'],
        },
        {
          id: 'automation_gain',
          label: 'Propose automation and quantify the efficiency gain',
          emoji: '🚀',
          keywords: ['automate', 'automating', 'automation', 'efficiency', 'percent', '40%', 'forty', 'cut', 'cycle time', 'speed', 'freeing', 'gain', 'streamline', 'client work'],
        },
      ],
      explanation:
        'Pitch an automation idea to senior executives. Articulate the current bottleneck, your proposed solution, and the measurable efficiency gain.',
      sampleSpeech:
        'Good afternoon. Our manual onboarding currently creates a two-day bottleneck. By automating document verification, we can cut cycle time by forty percent while freeing our team for high-value client work.',
      tips: ['Lead with the bottleneck', 'Quantify the outcome (40% faster)'],
    },
    {
      id: 'a2',
      title: 'Handle Client Pushback on Pricing',
      emoji: '💼',
      category: 'Client Relations',
      targetWords: 40,
      situationIntent: 'Acknowledge client pricing concern and tie cost to support and zero downtime',
      keywords: [
        'pricing', 'price', 'adjustment', 'increase', 'support', 'infrastructure', 'value',
        'downtime', 'zero', 'operations', 'understand', 'dedicated', 'reaction', 'concern'
      ],
      requirements: [
        {
          id: 'empathy',
          label: 'Acknowledge client pricing concern empathetically',
          emoji: '🤝',
          keywords: ['understand', 'reaction', 'concern', 'pricing', 'price', 'increase', 'adjustment', 'structure', 'empathize', 'completely'],
        },
        {
          id: 'value',
          label: 'Tie cost directly to dedicated infrastructure & zero downtime',
          emoji: '🛡️',
          keywords: ['infrastructure', 'support', '24/7', 'downtime', 'zero', 'dedicated', 'value', 'reliability', 'operations', 'ensuring', 'priority'],
        },
      ],
      explanation:
        'A major client complains about a price adjustment. Acknowledge their concern empathetically and explain the enhanced value and support included.',
      sampleSpeech:
        'I completely understand your reaction to the updated pricing structure. This revision reflects the dedicated infrastructure and 24/7 priority support we added, ensuring zero downtime for your operations.',
      tips: ['Acknowledge empathetically', 'Tie cost directly to tangible business value'],
    },
    {
      id: 'a3',
      title: 'De-escalate Conflict Under a Tight Deadline',
      emoji: '⚖️',
      category: 'Engineering Leadership',
      targetWords: 35,
      situationIntent: 'Validate conflicting architecture views, prioritize stability, and defer refactor',
      keywords: [
        'deadline', 'launch', 'hours', 'architecture', 'stability', 'priority', 'simpler',
        'implementation', 'refactor', 'sprint', 'perspective', 'merit', 'conflict', 'align'
      ],
      requirements: [
        {
          id: 'validate',
          label: 'Validate both architectural perspectives constructively',
          emoji: '⚖️',
          keywords: ['perspectives', 'merit', 'valid', 'both', 'understand', 'points', 'ideas', 'team', 'disagree'],
        },
        {
          id: 'stability',
          label: 'Anchor to launch stability & defer refactor to next sprint',
          emoji: '🎯',
          keywords: ['deadline', 'hours', 'launch', 'stability', 'priority', 'simpler', 'implementation', 'refactor', 'next sprint', 'sprint', 'release', 'proceed'],
        },
      ],
      explanation:
        'Two lead engineers argue over architecture 48 hours before launch. Intervene constructively to align them on the immediate release goal.',
      sampleSpeech:
        'Both perspectives have genuine merit, but with forty-eight hours until launch, stability must be our priority. Let us proceed with the simpler implementation now and schedule the architectural refactor for the next sprint.',
      tips: ['Validate both sides', 'Anchor the team to the immediate deadline'],
    },
    {
      id: 'a4',
      title: 'Reframe a Campaign Shortfall as Insight',
      emoji: '💡',
      category: 'Team Retrospectives',
      targetWords: 35,
      situationIntent: 'Acknowledge missed conversion benchmark constructively and emphasize actionable learnings',
      keywords: [
        'campaign', 'conversion', 'target', 'benchmark', 'fell', 'short', 'data', 'customer',
        'preferences', 'learnings', 'optimize', 'messaging', 'upcoming', 'experiment', 'insight'
      ],
      requirements: [
        {
          id: 'admit',
          label: 'Acknowledge missed conversion target honestly',
          emoji: '📊',
          keywords: ['benchmark', 'conversion', 'fell short', 'target', 'missed', 'campaign', 'numbers', 'below', 'results', 'initial'],
        },
        {
          id: 'pivot',
          label: 'Pivot to actionable customer data & upcoming optimization',
          emoji: '💡',
          keywords: ['data', 'preferences', 'customer', 'learnings', 'insight', 'insights', 'optimize', 'messaging', 'upcoming', 'launch', 'future', 'precision'],
        },
      ],
      explanation:
        'A marketing campaign missed its conversion target. Present the results to your team constructively, highlighting key data learned for future campaigns.',
      sampleSpeech:
        'While the conversion numbers fell short of our initial benchmark, the experiment yielded crucial data regarding customer preferences. We now know which messaging resonates, allowing us to optimize our upcoming launch with precision.',
      tips: ['Acknowledge the shortfall honestly', 'Pivot to actionable learnings'],
    },
  ],
};

/**
 * Intelligent Speaking Answer Evaluation Engine:
 * 1. Evaluates Topic Relevance / Situation Match explicitly
 * 2. Detects grammatical and natural phrasing mistakes independently
 * 3. Pinpoints exact mistakes, explains how to improve, and provides corrected target audio
 */
export const analyzeSpeakingSpeech = (text, topic) => {
  if (!text || !text.trim()) {
    return {
      isValid: false,
      message: 'Please speak or enter some words first.',
    };
  }

  const raw = text.trim();
  const lower = raw.toLowerCase();
  const words = raw.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // -------------------------------------------------------------
  // 1. TOPIC RELEVANCE / SITUATION MATCH EVALUATION
  // -------------------------------------------------------------
  let topicStatus = 'matched'; // 'matched' | 'partial' | 'off-topic'
  let topicScore = 100;
  let topicTitle = 'Matched to Topic ✅';
  let topicReason = 'Great match! Your response addresses this topic context nicely.';
  let requirementsMet = [];

  const cleanTokens = lower.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const tokenSet = new Set(cleanTokens);

  if (topic?.requirements && topic.requirements.length > 0) {
    requirementsMet = topic.requirements.map((req) => {
      const isMet = req.keywords.some((kw) => {
        const kwLower = kw.toLowerCase().trim();
        if (kwLower.includes(' ')) {
          return lower.includes(kwLower);
        }
        return tokenSet.has(kwLower);
      });
      return {
        id: req.id,
        label: req.label,
        emoji: req.emoji,
        met: isMet,
      };
    });

    const metCount = requirementsMet.filter((r) => r.met).length;
    const totalCount = requirementsMet.length;

    if (metCount === totalCount) {
      topicStatus = 'matched';
      topicScore = 100;
      topicTitle = 'Matched to Topic ✅';
      topicReason = `Excellent! You covered all key parts of "${topic.title}": ${requirementsMet.map((r) => r.label).join(' & ')}.`;
    } else if (metCount > 0) {
      topicStatus = 'partial';
      topicScore = Math.round((metCount / totalCount) * 85);
      topicTitle = 'Partially Matched ⚠️';
      const metLabels = requirementsMet.filter((r) => r.met).map((r) => r.label);
      const missingLabels = requirementsMet.filter((r) => !r.met).map((r) => r.label);
      topicReason = `You addressed ${metLabels.join(', ')}, but make sure to also include: ${missingLabels.join(', ')}.`;
    } else {
      topicStatus = 'off-topic';
      topicScore = 20;
      topicTitle = 'Off-Topic ❌';
      topicReason = `Your response does not match this topic situation. This topic asks you to: "${topic.explanation}". Try speaking about this specific situation!`;
    }
  } else if (topic?.keywords && topic.keywords.length > 0) {
    const matchedKeywords = topic.keywords.filter((k) => lower.includes(k.toLowerCase()));
    if (matchedKeywords.length === 0 && wordCount >= 3) {
      topicStatus = 'off-topic';
      topicScore = 25;
      topicTitle = 'Off-Topic ❌';
      topicReason = `Your response did not mention any topic context. This topic asks you to: "${topic.explanation}".`;
    } else {
      topicStatus = 'matched';
      topicScore = Math.min(100, Math.max(70, Math.round(60 + (matchedKeywords.length / 3) * 40)));
      topicTitle = 'Matched to Topic ✅';
      topicReason = 'Your response matches the scenario keywords!';
    }
  }

  // -------------------------------------------------------------
  // 2. GRAMMAR & NATURAL PHRASING RULES EVALUATION
  // -------------------------------------------------------------
  let grammarStatus = 'correct'; // 'correct' | 'needs-improvement'
  let grammarScore = 100;
  let grammarTitle = 'Grammar is Correct & Fluent ✨';
  let mistakePart = null;
  let howToImprove = null;
  let correctedText = raw;

  // Rule A: Past tense needed with past time marker
  if (
    (lower.includes('yesterday') || lower.includes('last week') || lower.includes('last night') || lower.includes('ago')) &&
    /\b(go|see|meet|eat|buy|come|take|get|know|drink|order)\b/i.test(raw)
  ) {
    grammarStatus = 'needs-improvement';
    grammarScore = 70;
    const verbMatch = raw.match(/\b(go|see|meet|eat|buy|come|take|get|know|drink|order)\b/i);
    const verb = verbMatch ? verbMatch[0] : 'go';
    const pastForms = {
      go: 'went',
      see: 'saw',
      meet: 'met',
      eat: 'ate',
      buy: 'bought',
      come: 'came',
      take: 'took',
      get: 'got',
      know: 'knew',
      drink: 'drank',
      order: 'ordered',
    };
    const past = pastForms[verb.toLowerCase()] || 'went';

    mistakePart = `Using present tense "${verb}" with past time marker`;
    howToImprove = `When talking about completed past events (like "yesterday" or "last night"), use the simple past: change "${verb}" to "${past}".`;
    correctedText = raw.replace(new RegExp(`\\b${verb}\\b`, 'gi'), past);
  }

  // Rule B: "I am agree" / "I am disagree"
  else if (/\b(i am agree|am agree|i am disagree|am disagree)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 68;
    mistakePart = 'Saying "I am agree" / "I am disagree"';
    howToImprove = '"Agree" and "disagree" are already verbs in English. Say "I agree" or "I disagree" directly without "am".';
    correctedText = raw
      .replace(/\bi am agree\b/gi, 'I agree')
      .replace(/\bam agree\b/gi, 'agree')
      .replace(/\bi am disagree\b/gi, 'I disagree')
      .replace(/\bam disagree\b/gi, 'disagree');
  }

  // Rule C: Blunt "I want" / "Give me" in polite requests
  else if (/^\s*(i want|give me|i need a)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 78;
    mistakePart = 'Starting polite requests with "I want" or "Give me"';
    howToImprove = 'In natural conversational English, "I want" sounds demanding to baristas or colleagues. Begin with "Could I please get..." or "I would like to have..." to sound polite and effortless.';
    correctedText = raw
      .replace(/^\s*i want\b/i, 'Could I please get')
      .replace(/^\s*give me\b/i, 'Could you please give me')
      .replace(/^\s*i need a\b/i, 'Could I please have a');
  }

  // Rule D: "didn't + past verb"
  else if (/\bdid(n't| not)\s+(knew|went|saw|told|came|bought|took|ordered)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 65;
    const match = raw.match(/\bdid(n't| not)\s+(knew|went|saw|told|came|bought|took|ordered)\b/i);
    const pastVerb = match ? match[2] : 'knew';
    const baseForms = {
      knew: 'know',
      went: 'go',
      saw: 'see',
      told: 'tell',
      came: 'come',
      bought: 'buy',
      took: 'take',
      ordered: 'order',
    };
    const base = baseForms[pastVerb.toLowerCase()] || 'know';

    mistakePart = `Using past tense "${pastVerb}" after "didn't"`;
    howToImprove = `After auxiliary "did" or "didn't", always use the base form of the verb ("${base}"), not the past form ("${pastVerb}").`;
    correctedText = raw.replace(new RegExp(`\\bdid(n't| not)\\s+${pastVerb}\\b`, 'gi'), `didn't ${base}`);
  }

  // Rule E: "she/he don't" or "he have"
  else if (/\b(he|she|it)\s+(don't|have)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 72;
    const match = raw.match(/\b(he|she|it)\s+(don't|have)\b/i);
    const subj = match ? match[1] : 'he';
    const wrong = match ? match[2] : "don't";
    const right = wrong.toLowerCase() === "don't" ? "doesn't" : "has";

    mistakePart = `Subject-verb disagreement: "${subj} ${wrong}"`;
    howToImprove = `Third-person singular subjects (he, she, it) take "${right}", not "${wrong}".`;
    correctedText = raw.replace(new RegExp(`\\b${subj}\\s+${wrong}\\b`, 'gi'), `${subj} ${right}`);
  }

  // Rule F: "am having" for ownership or permanent state
  else if (/\bam having\s+(a\s+car|two|three|\d+|experience|friends|brothers|sisters|a meeting|much work|many work)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 74;
    mistakePart = 'Using continuous "am having" for ownership or work';
    howToImprove = 'Use simple present "have" for permanent possession and schedule: say "I have", not "I am having".';
    correctedText = raw.replace(/\bam having\b/gi, 'have');
  }

  // Rule G: "very like"
  else if (/\bvery like\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 76;
    mistakePart = 'Using "very like"';
    howToImprove = '"Very" modifies adjectives, not verbs. Say "really like" or "love" instead.';
    correctedText = raw.replace(/\bvery like\b/gi, 'really like');
  }

  // Rule H: "borrow me"
  else if (/\bborrow\s+(me|to me)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 72;
    mistakePart = 'Using "borrow me" instead of "lend me"';
    howToImprove = 'You "borrow from" someone, but they "lend to" you. Say "Could you lend me..." when asking for something.';
    correctedText = raw.replace(/\bborrow\s+(me|to me)\b/gi, 'lend me');
  }

  // Rule I: Double comparatives ("more better", "more faster")
  else if (/\bmore\s+(better|taller|faster|easier|cheaper)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 75;
    const match = raw.match(/\bmore\s+(better|taller|faster|easier|cheaper)\b/i);
    const word = match ? match[1] : 'better';
    mistakePart = `Double comparative: "more ${word}"`;
    howToImprove = `"${word}" is already comparative. Remove "more", or say "much ${word}".`;
    correctedText = raw.replace(new RegExp(`\\bmore\\s+${word}\\b`, 'gi'), word);
  }

  // Rule J: Redundant prepositions ("discuss about" / "repeat again" / "return back")
  else if (/\b(discuss about|repeat again|return back|order for)\b/i.test(raw)) {
    grammarStatus = 'needs-improvement';
    grammarScore = 78;
    mistakePart = 'Redundant preposition in expression';
    howToImprove = '"Discuss" already means "talk about", "repeat" means "say again", and "return" means "go back". Simply say the verb without the extra preposition.';
    correctedText = raw
      .replace(/\bdiscuss about\b/gi, 'discuss')
      .replace(/\brepeat again\b/gi, 'repeat')
      .replace(/\breturn back\b/gi, 'return')
      .replace(/\border for\b/gi, 'order');
  }

  // Rule K: Response is too brief (< 4 words)
  else if (wordCount < 4) {
    grammarStatus = 'needs-improvement';
    grammarScore = 80;
    mistakePart = `Response is very brief (${wordCount} words)`;
    howToImprove = 'Try speaking in a full, complete sentence to build conversational fluency and confidence.';
    if (topic?.sampleSpeech) {
      correctedText = topic.sampleSpeech;
    }
  }

  // Clean punctuation & capitalization
  correctedText = correctedText.charAt(0).toUpperCase() + correctedText.slice(1);
  if (!correctedText.endsWith('.') && !correctedText.endsWith('!') && !correctedText.endsWith('?')) {
    correctedText += '.';
  }

  const hasMistake = grammarStatus === 'needs-improvement';
  if (!hasMistake) {
    grammarTitle = 'Grammar is Correct & Fluent ✨';
    mistakePart = null;
    howToImprove = 'Your sentence is grammatically correct and phrased naturally!';
  } else {
    grammarTitle = 'Grammar Mistakes Found ⚠️';
  }

  // If completely off-topic, provide the sample speech as target for reference
  if (topicStatus === 'off-topic' && topic?.sampleSpeech) {
    correctedText = topic.sampleSpeech;
  }

  // Composite overall score
  const overallScore = Math.min(100, Math.max(50, Math.round(topicScore * 0.5 + grammarScore * 0.5)));
  const isCorrect = !hasMistake && topicStatus === 'matched';

  return {
    isValid: true,
    wordCount,
    originalText: raw,
    isCorrect,
    hasMistake,
    isOffTopic: topicStatus === 'off-topic',
    relevanceScore: topicScore,
    grammarScore,
    naturalnessScore: overallScore,
    mistakePart: mistakePart || (topicStatus === 'off-topic' ? 'Off-Topic: Did not mention scenario context' : 'None! Clear & natural.'),
    howToImprove: howToImprove || topicReason,
    correctedText,

    // Deep structured diagnostics for UI
    topicMatch: {
      status: topicStatus,
      isMatched: topicStatus === 'matched',
      isPartial: topicStatus === 'partial',
      isOffTopic: topicStatus === 'off-topic',
      score: topicScore,
      title: topicTitle,
      reason: topicReason,
      requirementsMet,
    },
    grammar: {
      status: grammarStatus,
      isCorrect: !hasMistake,
      score: grammarScore,
      title: grammarTitle,
      mistakePart,
      howToImprove,
      correctedText,
    },
    scores: {
      topicScore,
      grammarScore,
      overallScore,
    },
  };
};

/**
 * Strict & Fair Practice Verification:
 * Validates whether the user accurately spoke the corrected sentence.
 * Computes token overlap (user must say at least 65% of target words, not just length > 8!).
 */
export const verifySpeakingPractice = (spokenTranscript, targetSentence) => {
  if (!spokenTranscript || !targetSentence) {
    return { passed: false, matchPercent: 0, matchedWords: 0, totalWords: 0 };
  }

  const clean = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .trim();

  const spokenTokens = clean(spokenTranscript).split(/\s+/).filter(Boolean);
  const targetTokens = clean(targetSentence).split(/\s+/).filter(Boolean);

  if (targetTokens.length === 0 || spokenTokens.length === 0) {
    return { passed: false, matchPercent: 0, matchedWords: 0, totalWords: 0 };
  }

  // Direct substring check
  const spokenStr = spokenTokens.join(' ');
  const targetStr = targetTokens.join(' ');
  if (spokenStr.includes(targetStr)) {
    return {
      passed: true,
      matchPercent: 100,
      matchedWords: targetTokens.length,
      totalWords: targetTokens.length,
    };
  }

  // Token overlap check
  const spokenSet = new Set(spokenTokens);
  const matchedList = targetTokens.filter((w) => spokenSet.has(w));
  const ratio = matchedList.length / targetTokens.length;
  const matchPercent = Math.round(ratio * 100);

  return {
    passed: ratio >= 0.65,
    matchPercent,
    matchedWords: matchedList.length,
    totalWords: targetTokens.length,
  };
};
