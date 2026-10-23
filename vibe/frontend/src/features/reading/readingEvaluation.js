/**
 * Intelligent Reading Comprehension Evaluator:
 * Evaluates the user's title and short explanation against the reading passage.
 * Provides transparent scoring, concept coverage feedback, and actionable coaching.
 */

const STOP_WORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for',
  'of', 'it', 'this', 'that', 'they', 'he', 'she', 'was', 'were', 'had', 'have', 'has', 'be',
  'been', 'from', 'by', 'as', 'about', 'into', 'their', 'his', 'her', 'its', 'my', 'your'
]);

const extractKeywords = (text = '') => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
};

export const evaluateReadingSubmission = (userTitle = '', userExplanation = '', item = {}) => {
  const cleanTitle = (userTitle || '').trim();
  const cleanExplanation = (userExplanation || '').trim();

  const titleWords = cleanTitle.split(/\s+/).filter(Boolean);
  const explanationWords = cleanExplanation.split(/\s+/).filter(Boolean);

  const modelSummary = item.shortExplanation || item.summary || '';
  const paragraph = item.paragraph || item.content || '';
  const suggestedTitle = item.title || '';

  const modelKeywords = extractKeywords(`${suggestedTitle} ${modelSummary} ${paragraph.slice(0, 300)}`);
  const uniqueModelKeywords = Array.from(new Set(modelKeywords));

  // -------------------------------------------------------------
  // 1. TITLE EVALUATION
  // -------------------------------------------------------------
  let titleScore = 70;
  let titleVerdict = 'Creative Title';
  let titleFeedback = 'Nice title! It gives a creative perspective on the story.';

  if (!cleanTitle) {
    titleScore = 0;
    titleVerdict = 'Missing Title';
    titleFeedback = 'You did not enter a title yet. Try creating a 3–6 word title for this story.';
  } else if (titleWords.length === 1) {
    titleScore = 65;
    titleVerdict = 'A bit too brief';
    titleFeedback = 'A single word is very short for a title. Try adding 2–4 descriptive words to capture the story’s mood.';
  } else if (titleWords.length > 12) {
    titleScore = 75;
    titleVerdict = 'A bit too long';
    titleFeedback = 'This feels like a full sentence rather than a punchy title. Try making it under 8 words.';
  } else {
    // Check overlap with story themes
    const userTitleKeywords = extractKeywords(cleanTitle);
    const matchedTitleKeywords = userTitleKeywords.filter((k) => uniqueModelKeywords.includes(k));

    if (matchedTitleKeywords.length > 0) {
      titleScore = 95;
      titleVerdict = 'Spot On & Relevant 🎯';
      titleFeedback = 'Excellent! Your title directly captures the core theme of the passage.';
    } else {
      titleScore = 82;
      titleVerdict = 'Interesting Perspective ✨';
      titleFeedback = 'Creative title! It frames the story from an original angle.';
    }
  }

  // -------------------------------------------------------------
  // 2. EXPLANATION EVALUATION
  // -------------------------------------------------------------
  let explanationScore = 70;
  let explanationVerdict = 'Good Summary';
  let capturedConcepts = [];
  let explanationFeedback = '';

  if (!cleanExplanation) {
    explanationScore = 0;
    explanationVerdict = 'Missing Explanation';
    explanationFeedback = 'Please write 1–2 sentences summarizing what happened in the passage.';
  } else if (explanationWords.length < 5) {
    explanationScore = 55;
    explanationVerdict = 'Too Brief';
    explanationFeedback = 'Your summary is only a few words. Try writing at least 1–2 complete sentences explaining the main event and outcome.';
  } else {
    const userExplKeywords = extractKeywords(cleanExplanation);
    const matchedExplKeywords = userExplKeywords.filter((k) => uniqueModelKeywords.includes(k));
    capturedConcepts = Array.from(new Set(matchedExplKeywords)).slice(0, 5);

    const overlapCount = capturedConcepts.length;

    if (overlapCount >= 3 || explanationWords.length >= 15) {
      explanationScore = Math.min(98, Math.max(85, Math.round(75 + overlapCount * 5)));
      explanationVerdict = 'Thorough Comprehension 🌟';
      explanationFeedback = `Great grasp of the narrative! You successfully identified the key elements (${capturedConcepts.slice(0, 3).join(', ') || 'main plot'}).`;
    } else if (overlapCount >= 1) {
      explanationScore = 78;
      explanationVerdict = 'Good Baseline Summary 👍';
      explanationFeedback = 'You captured the main idea. Notice how the model summary below adds the exact reasons and character reactions.';
    } else {
      explanationScore = 68;
      explanationVerdict = 'General Impression 💡';
      explanationFeedback = 'You provided your thoughts, but try focusing more on the central cause and consequence of the story.';
    }
  }

  // -------------------------------------------------------------
  // 3. OVERALL COMPREHENSION
  // -------------------------------------------------------------
  const overallScore = Math.round((titleScore * 0.35) + (explanationScore * 0.65));
  const isHighQuality = overallScore >= 78;

  return {
    titleScore,
    titleVerdict,
    titleFeedback,
    explanationScore,
    explanationVerdict,
    explanationFeedback,
    capturedConcepts,
    overallScore,
    isHighQuality,
  };
};
