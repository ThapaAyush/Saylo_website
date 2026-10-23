/**
 * Abstract AIProvider interface.
 * All AI providers must implement these methods.
 */
export class AIProvider {
  async chatCompletion(systemPrompt, messages, options = {}) {
    throw new Error('chatCompletion() not implemented');
  }

  async generateWritingVibes(text, targetVibes = []) {
    throw new Error('generateWritingVibes() not implemented');
  }

  async evaluateWriting(text, promptContext) {
    throw new Error('evaluateWriting() not implemented');
  }

  async explainVocabulary(word, context, targetLang = 'hindi') {
    throw new Error('explainVocabulary() not implemented');
  }

  async evaluateSpeakingConversation(messages, scenarioContext) {
    throw new Error('evaluateSpeakingConversation() not implemented');
  }
}
