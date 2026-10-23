import { AIProvider } from './AIProvider.js';
import { MockAIProvider } from './MockAIProvider.js';

export class GeminiAIProvider extends AIProvider {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    this.fallback = new MockAIProvider();
  }

  async chatCompletion(systemPrompt, messages, options = {}) {
    if (!this.apiKey) {
      return this.fallback.chatCompletion(systemPrompt, messages, options);
    }

    try {
      const contents = messages.map(m => ({
        role: m.sender === 'user' || m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text || m.content }],
      }));

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
        }),
      });

      if (!res.ok) {
        console.warn('[Gemini API response error, using fallback]');
        return this.fallback.chatCompletion(systemPrompt, messages, options);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || this.fallback.chatCompletion(systemPrompt, messages, options);
    } catch (err) {
      console.warn('[Gemini Call Failed, falling back to Mock]:', err.message);
      return this.fallback.chatCompletion(systemPrompt, messages, options);
    }
  }

  async generateWritingVibes(text, targetVibes = []) {
    return this.fallback.generateWritingVibes(text, targetVibes);
  }

  async evaluateWriting(text, promptContext = '') {
    return this.fallback.evaluateWriting(text, promptContext);
  }

  async explainVocabulary(word, context = '', targetLang = 'hindi') {
    return this.fallback.explainVocabulary(word, context, targetLang);
  }

  async evaluateSpeakingConversation(messages, scenarioContext = {}) {
    return this.fallback.evaluateSpeakingConversation(messages, scenarioContext);
  }
}
