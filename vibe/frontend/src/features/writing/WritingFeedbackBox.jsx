import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, ArrowRight, RotateCcw, Lightbulb, Check } from 'lucide-react';
export const WritingFeedbackBox = ({ feedback, onReset }) => {
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const [blankResult, setBlankResult] = useState(null);

  if (!feedback) return null;

  const handleTestBlank = (e) => {
    e.preventDefault();
    const correct = feedback.tryAgainExercise?.correctWord?.toLowerCase().trim() || 'went';
    const userVal = fillBlankAnswer.toLowerCase().trim();

    if (userVal === correct) {
      setBlankResult({ success: true, message: 'Spot on! You locked it in.' });
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    } else {
      setBlankResult({ success: false, message: `Almost! The target word is "${correct}".` });
    }
  };

  return (
    <Card className="bg-[#0D0D10] border border-white/10 p-6 space-y-5 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Language Coaching & Feedback</span>
        </span>
        {feedback.naturalnessScore && (
          <span className="text-xs font-mono text-[#22D3EE] font-bold">
            Naturalness: {feedback.naturalnessScore}%
          </span>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Your Version */}
        <div className="p-4 bg-white/3 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
            Your Version
          </span>
          <p className="text-sm font-medium text-[#D4D4D8]">
            "{feedback.yourVersion}"
          </p>
        </div>

        {/* Better / Natural */}
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-1">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            More Natural Flow ✨
          </span>
          <p className="text-sm font-bold text-emerald-200">
            "{feedback.better}"
          </p>
        </div>
      </div>

      {/* WHY Pedagogical Explanation */}
      <div className="p-4 bg-[#18181B] rounded-2xl border border-white/5 space-y-1.5">
        <span className="text-[11px] font-bold text-[#A78BFA] uppercase tracking-wider block">
          Why this works better:
        </span>
        <p className="text-xs text-[#E4E4E7] leading-relaxed">
          {feedback.why}
        </p>
      </div>

      {/* Try Again Drill */}
      {feedback.tryAgainExercise && (
        <div className="p-4 bg-gradient-to-r from-[#18181F] to-[#121215] border border-purple-500/20 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F5F5F5]">TRY IT RIGHT NOW:</span>
            <span className="text-[11px] text-[#A1A1AA]">Fill in the blank</span>
          </div>

          <p className="text-sm font-medium text-white font-mono bg-black/40 p-3 rounded-xl border border-white/5">
            {feedback.tryAgainExercise.sentenceWithBlank}
          </p>

          <form onSubmit={handleTestBlank} className="flex gap-2">
            <input
              type="text"
              value={fillBlankAnswer}
              onChange={(e) => setFillBlankAnswer(e.target.value)}
              placeholder="Type missing word..."
              className="flex-1 px-3.5 py-2 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
            />
            <Button type="submit" variant="primary" size="sm" className="text-xs">
              Check →
            </Button>
          </form>

          {blankResult && (
            <div className={`text-xs p-2 rounded-lg ${blankResult.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {blankResult.message}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
