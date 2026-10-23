import SpeakingScenario from '../models/SpeakingScenario.js';
import AICharacter from '../models/AICharacter.js';
import ConversationSession from '../models/ConversationSession.js';
import Profile from '../models/Profile.js';
import { ConversationService } from '../ai/ConversationService.js';
import { SpeakingFeedbackService } from '../ai/SpeakingFeedbackService.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

export const getSpeakingScenarios = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const filter = { active: true };
    if (category && category !== 'all') filter.category = category;
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { context: { $regex: search, $options: 'i' } },
      ];
    }
    const scenarios = await SpeakingScenario.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(scenarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpeakingScenarioById = async (req, res) => {
  try {
    const scenario = await SpeakingScenario.findById(req.params.id);
    if (!scenario) return res.status(404).json({ message: 'Scenario not found' });
    res.json(scenario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAICharacters = async (req, res) => {
  try {
    const characters = await AICharacter.find({ active: true });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const startConversation = async (req, res) => {
  try {
    const { scenarioId, characterId } = req.body;

    let scenario = null;
    if (scenarioId) {
      scenario = await SpeakingScenario.findById(scenarioId);
    }

    let character = null;
    if (characterId) {
      character = await AICharacter.findById(characterId) || await AICharacter.findOne({ characterId });
    }
    if (!character && scenario?.defaultCharacter) {
      character = await AICharacter.findOne({ name: scenario.defaultCharacter });
    }
    if (!character) {
      character = await AICharacter.findOne({ name: 'Alex' });
    }

    const initialAiText = scenario?.firstBotMessage || character?.initialGreeting || "Yo! How's it going?";

    const session = await ConversationSession.create({
      user: req.user ? req.user._id : '000000000000000000000000',
      character: character?._id,
      scenario: scenario?._id,
      characterName: character?.name || 'Alex',
      scenarioTitle: scenario?.title || 'Casual Banter',
      messages: [
        {
          sender: 'ai',
          text: initialAiText,
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json({
      sessionId: session._id,
      character,
      scenario,
      messages: session.messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendConversationMessage = async (req, res) => {
  try {
    const { sessionId, text, characterName = 'Alex', scenarioContext = {} } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    let session = null;
    if (sessionId && sessionId !== 'guest-session') {
      session = await ConversationSession.findById(sessionId);
    }

    const userMessage = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    let history = session ? [...session.messages, userMessage] : [userMessage];

    // Fetch intelligent persona reply
    const aiReplyText = await ConversationService.getReply(characterName, history, scenarioContext);

    const aiMessage = {
      sender: 'ai',
      text: aiReplyText,
      timestamp: new Date(),
    };

    if (session) {
      session.messages.push(userMessage);
      session.messages.push(aiMessage);
      await session.save();
    }

    res.json({
      reply: aiReplyText,
      userMessage,
      aiMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeConversation = async (req, res) => {
  try {
    const { sessionId, messages = [], scenarioContext = {} } = req.body;

    let sessionMessages = messages;
    let session = null;

    if (sessionId && sessionId !== 'guest-session') {
      session = await ConversationSession.findById(sessionId);
      if (session && session.messages?.length > 0) {
        sessionMessages = session.messages;
      }
    }

    const evaluation = await SpeakingFeedbackService.evaluateSession(sessionMessages, scenarioContext);

    if (session) {
      session.status = 'completed';
      session.metrics = evaluation.metrics;
      session.quickFixes = evaluation.quickFixes;
      session.completedAt = new Date();
      await session.save();
    }

    // Award XP and update profile
    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        profile.conversationsCompleted += 1;
        await profile.save();

        await AnalyticsEvent.create({
          eventType: 'speaking_completed',
          userId: req.user._id,
          metadata: { sessionId, metrics: evaluation.metrics },
        });
      }
    }

    res.json({
      evaluation,
      message: 'Speaking session complete!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const transformSpeakingExpression = async (req, res) => {
  try {
    const { text, intent } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const t = text.trim();
    const lower = t.toLowerCase();

    // Default tone calibration map
    let casual = `Honestly, ${t.toLowerCase()}`;
    let polite = `If you don't mind me saying, ${t.toLowerCase()}`;
    let strong = `I strongly believe ${t.toLowerCase()}`;
    let confident = `From my experience, ${t.toLowerCase()}`;
    let humor = `No offense, but ${t.toLowerCase()} haha! 😅`;

    if (lower.includes("don't like this idea") || lower.includes("dont like this idea") || lower.includes("dislike this idea") || lower.includes("bad idea")) {
      casual = "I’m not really feeling this idea.";
      polite = "I’m not sure this is the best approach.";
      strong = "I really don't think this will work.";
      confident = "I have serious reservations about this direction; let's explore alternatives.";
      humor = "Love the enthusiasm, but that might blow up in our faces! 😅";
    } else if (lower.includes("can't come") || lower.includes("cannot come") || lower.includes("busy")) {
      casual = "Something came up, won't be able to make it!";
      polite = "Unfortunately, a prior commitment prevents me from joining.";
      strong = "I will not be able to attend today.";
      confident = "I have a conflicting priority and must pass on this.";
      humor = "Life threw a wrench in my plans today 💀 raincheck?";
    } else if (lower.includes("agree") || lower.includes("yes")) {
      casual = "100%, I’m totally down with that!";
      polite = "I completely share your perspective on this.";
      strong = "Absolutely, that is without question the right move.";
      confident = "That aligns precisely with the objectives we should target.";
      humor = "Preach! Are you reading my mind or what? 🙌";
    } else if (lower.includes("help me") || lower.includes("need help")) {
      casual = "Could you give me a quick hand with this?";
      polite = "Would you mind assisting me with this when you have a free moment?";
      strong = "I need your immediate support on this issue.";
      confident = "I'd appreciate your technical input to resolve this bottleneck.";
      humor = "SOS! I could use some superhero backup over here! 🦸";
    }

    res.json({
      original: t,
      intent: intent || 'General Expression',
      tones: {
        casual,
        polite,
        strong,
        confident,
        humor,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Cloud Text-to-Speech synthesizer (supports ElevenLabs, OpenAI, Google)
 * Falls back gracefully to browser synthesis if no API key is configured.
 */
export const synthesizeSpeech = async (req, res) => {
  try {
    const { text, voicePreference = 'natural' } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Text is required' });
    }

    // 1. ElevenLabs API (Gold standard human realistic voice)
    if (process.env.ELEVENLABS_API_KEY) {
      const voiceId = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Adam
      const elRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });

      if (elRes.ok) {
        res.setHeader('Content-Type', 'audio/mpeg');
        const buffer = await elRes.arrayBuffer();
        return res.send(Buffer.from(buffer));
      }
    }

    // 2. OpenAI Text-To-Speech API (tts-1)
    if (process.env.OPENAI_API_KEY) {
      const openAiRes = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice: voicePreference === 'indian' ? 'onyx' : 'alloy',
        }),
      });

      if (openAiRes.ok) {
        res.setHeader('Content-Type', 'audio/mpeg');
        const buffer = await openAiRes.arrayBuffer();
        return res.send(Buffer.from(buffer));
      }
    }

    // 3. Fallback response indicating to use optimized browser Web Speech API
    return res.status(200).json({
      fallback: true,
      message: 'No external cloud TTS key set. Using browser Web Speech API.',
    });
  } catch (err) {
    console.warn('[Cloud TTS Fallback]:', err.message);
    res.status(200).json({ fallback: true, message: err.message });
  }
};

