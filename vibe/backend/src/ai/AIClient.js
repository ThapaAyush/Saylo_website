import { MockAIProvider } from './MockAIProvider.js';
import { GeminiAIProvider } from './GeminiAIProvider.js';

class AIClientFactory {
  constructor() {
    this.provider = null;
  }

  getProvider() {
    if (!this.provider) {
      const apiKey = process.env.GEMINI_API_KEY;
      const providerType = process.env.AI_PROVIDER || 'mock';

      if (providerType === 'gemini' && apiKey) {
        this.provider = new GeminiAIProvider(apiKey);
      } else {
        this.provider = new MockAIProvider();
      }
    }
    return this.provider;
  }
}

export const aiClient = new AIClientFactory();
