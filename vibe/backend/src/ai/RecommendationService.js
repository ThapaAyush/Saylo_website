import Vocabulary from '../models/Vocabulary.js';
import ReadingContent from '../models/ReadingContent.js';
import SpeakingScenario from '../models/SpeakingScenario.js';

export class RecommendationService {
  static async getRecommendations(interests = ['Gaming', 'Music']) {
    const interestRegex = new RegExp(interests.join('|'), 'i');

    const recommendedWords = await Vocabulary.find({
      $or: [{ category: interestRegex }, { featured: true }]
    }).limit(6);

    const recommendedStories = await ReadingContent.find({
      $or: [{ category: interestRegex }, { featured: true }]
    }).limit(4);

    const recommendedScenarios = await SpeakingScenario.find({
      $or: [{ category: interestRegex }, { featured: true }]
    }).limit(4);

    return {
      words: recommendedWords,
      stories: recommendedStories,
      scenarios: recommendedScenarios,
    };
  }
}
