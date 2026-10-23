import { aiClient } from './AIClient.js';

export class SpeakingFeedbackService {
  static async evaluateSession(messages, scenarioContext = {}) {
    const provider = aiClient.getProvider();
    return await provider.evaluateSpeakingConversation(messages, scenarioContext);
  }
}
