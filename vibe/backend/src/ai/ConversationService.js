import { aiClient } from './AIClient.js';
import AICharacter from '../models/AICharacter.js';

export class ConversationService {
  static async getReply(characterName, messages, scenarioContext = {}) {
    const provider = aiClient.getProvider();
    
    // Look up character custom prompt if in DB
    let systemPrompt = `You are ${characterName}, a chill and helpful Gen-Z conversational partner. Talk like a real friend, keep it natural and authentic, never sound robotic or lecture-like. Ask engaging follow-up questions.`;
    
    try {
      const charDoc = await AICharacter.findOne({ name: characterName });
      if (charDoc && charDoc.systemPrompt) {
        systemPrompt = `${charDoc.systemPrompt}\nScenario Context: ${scenarioContext.context || 'Casual talk'}`;
      }
    } catch (e) {
      // fallback
    }

    return await provider.chatCompletion(systemPrompt, messages, {
      characterName,
      scenarioContext,
    });
  }
}
