import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Star,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  FileText,
  PenTool,
  Mic,
  Lock,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

export const MissionCompleteModal = ({
  level,
  result,
  onContinue,
  onReplay,
}) => {
  const stars = result?.stars || 1;
  const isPerfect = result?.isPerfect || stars === 3;
  const xpEarned = result?.xpEarned || level?.xpReward || 250;
  const telemetry = result?.telemetry || {
    vocabulary: 88,
    reading: 92,
    writing: 85,
    speaking: 90,
  };
  const nextLevel = result?.nextLevel || level?.levelNumber + 1;

  useEffect(() => {
    // Launch celebratory confetti burst ONLY on full 3 stars!
    if (stars === 3) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#22D3EE', '#EC4899', '#10B981', '#F59E0B'],
        });
      } catch (e) {
        // safe fallback
      }
    }
  }, [stars]);

  const skillsData = [
    { label: 'Vocabulary', score: telemetry.vocabulary, icon: BookOpen, color: 'text-violet-400 bg-violet-500/20' },
    { label: 'Reading', score: telemetry.reading, icon: FileText, color: 'text-cyan-400 bg-cyan-500/20' },
    { label: 'Writing', score: telemetry.writing, icon: PenTool, color: 'text-pink-400 bg-pink-500/20' },
    { label: 'Speaking', score: telemetry.speaking, icon: Mic, color: 'text-amber-400 bg-amber-500/20' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
        
        {/* Top Trophy / Badge */}
        <div className="relative mb-3">
          <div
            className={`w-18 h-18 rounded-3xl p-0.5 shadow-xl ${
              stars === 3
                ? 'bg-gradient-to-tr from-[#8B5CF6] via-[#EC4899] to-[#22D3EE] shadow-purple-500/30'
                : 'bg-gradient-to-tr from-amber-500 to-zinc-700 shadow-amber-500/20'
            }`}
          >
            <div className="w-full h-full bg-[#121215] rounded-[22px] flex items-center justify-center text-3xl">
              {stars === 3 ? '🌟' : '🎯'}
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
          {stars === 3 ? 'PERFECT 3-STAR VICTORY! 🌟' : `LEVEL ${level?.levelNumber} COMPLETE (${stars}/3 STARS)`}
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Level {level?.levelNumber}: {level?.title}
        </p>

        {/* Stars Celebration */}
        <div className="flex items-center gap-2 my-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`p-2 rounded-2xl border transition-all ${
                s <= stars
                  ? 'bg-yellow-500/10 border-yellow-500/30 scale-110 shadow-sm'
                  : 'bg-zinc-800/40 border-zinc-700 opacity-30'
              }`}
            >
              <Star
                className={`w-6 h-6 ${
                  s <= stars
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                    : 'text-zinc-600'
                }`}
              />
            </div>
          ))}
        </div>

        {/* XP Reward Badge */}
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-[#8B5CF6]/30 flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-black text-white">+{xpEarned} XP Earned</span>
        </div>

        {/* Telemetry Breakdown (Vocabulary, Reading, Writing, Speaking) */}
        <div className="w-full space-y-2 mb-5 text-left">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Performance Breakdown
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skillsData.map((sk) => {
              const Icon = sk.icon;
              return (
                <div
                  key={sk.label}
                  className="p-2.5 rounded-xl bg-[#121215] border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${sk.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-300">{sk.label}</span>
                  </div>
                  <span className="text-xs font-mono font-black text-white">{sk.score}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3-Star Strict Requirement Status Box */}
        {stars === 3 ? (
          nextLevel <= 30 && (
            <div className="w-full p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-bold mb-5 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full 3 Stars Earned! Level {nextLevel} is now Unlocked! →</span>
            </div>
          )
        ) : (
          <div className="w-full p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-semibold mb-5 flex flex-col items-center gap-1.5 text-center">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 text-sm">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cannot Advance — Must Score 3 Stars!</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-tight">
              You scored <span className="text-amber-300 font-bold">{stars} of 3 stars</span>. Level {level?.levelNumber + 1} stays locked until you earn full 3 stars. Replaying the same level on the stream to master it.
            </p>
          </div>
        )}

        {/* Buttons Row */}
        <div className="w-full flex flex-col gap-2.5">
          {stars === 3 ? (
            /* 3 Stars Achieved: User Moves Forward! */
            <>
              <button
                onClick={onContinue}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#22D3EE] text-white text-xs font-black shadow-lg shadow-purple-500/30 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>{nextLevel <= 30 ? `MOVE FORWARD TO LEVEL ${nextLevel}` : 'COMPLETE SUMMIT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onReplay && (
                <button
                  onClick={onReplay}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-semibold border border-white/5 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay This Level</span>
                </button>
              )}
            </>
          ) : (
            /* Fewer than 3 Stars: Cannot Move Forward! User Plays Same Game, Same Level */
            <>
              <button
                onClick={onReplay}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 text-white text-xs font-black shadow-lg shadow-amber-500/25 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY SAME LEVEL AGAIN (LEVEL {level?.levelNumber})</span>
              </button>

              <button
                onClick={onContinue}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-white/5 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Back to Adventure Map (Level {level?.levelNumber + 1} Locked)</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
