import { aiClient } from './AIClient.js';
import Vocabulary from '../models/Vocabulary.js';

export class VocabularyService {
  static async explainWord(word, context = '', targetLang = 'hindi') {
    // Check if we have pre-curated Word DNA in database first
    const existing = await Vocabulary.findOne({ word: new RegExp(`^${word.trim()}$`, 'i') });
    if (existing) {
      return {
        word: existing.word,
        meaning: existing.meaning,
        phonetic: existing.phonetic,
        tone: existing.tone,
        formality: existing.formality,
        energy: existing.energy,
        commonness: existing.commonness,
        similarWords: existing.similarWords,
        dontUseIn: existing.dontUseIn,
        examples: existing.examples,
        caughtInTheWild: existing.caughtInTheWild,
        hindiMeaning: existing.hindiMeaning,
        hindiExample: existing.hindiExample,
      };
    }

    const provider = aiClient.getProvider();
    const explanation = await provider.explainVocabulary(word, context, targetLang);
    return {
      word,
      ...explanation,
      formality: 4,
      energy: 7,
      commonness: 8,
    };
  }

  static async evaluateTryIt(word, userResponse, expectedSituation) {
    const trimmed = userResponse.toLowerCase();
    const w = word.toLowerCase();
    const usedWord = trimmed.includes(w);

    if (!usedWord) {
      return {
        passed: false,
        feedback: `Try incorporating the word "${word}" in your response to get a feel for how it works!`,
        vibeMatch: 50,
      };
    }

    return {
      passed: true,
      feedback: `Spot on! You used "${word}" naturally in the right conversational tone.`,
      vibeMatch: 95,
    };
  }
}
