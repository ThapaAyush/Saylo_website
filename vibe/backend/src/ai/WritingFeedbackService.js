import { aiClient } from './AIClient.js';

export class WritingFeedbackService {
  static async getVibes(text) {
    const provider = aiClient.getProvider();
    return await provider.generateWritingVibes(text);
  }

  static async getEvaluation(text, promptContext = '') {
    const provider = aiClient.getProvider();
    return await provider.evaluateWriting(text, promptContext);
  }
}
