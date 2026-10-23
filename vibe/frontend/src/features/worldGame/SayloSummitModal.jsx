import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Crown,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  FileText,
  PenTool,
  Mic,
  Compass,
} from 'lucide-react';

export const SayloSummitModal = ({
  progress,
  onClose,
}) => {
  useEffect(() => {
    // Grand fireworks confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = ['#F59E0B', '#8B5CF6', '#22D3EE', '#EC4899', '#10B981'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const totalXP = progress?.totalXP || 15400;
  const completedCount = progress?.completedLevels?.length || 30;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#18181B] via-[#121215] to-[#09090B] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-400">
        
        {/* Summit Golden Crown Badge */}
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-2xl shadow-amber-500/40">
            <div className="w-full h-full bg-[#121215] rounded-[22px] flex items-center justify-center text-4xl">
              👑
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider">
            SUMMIT MASTER
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide mt-2">
          THE SAYLO SUMMIT
        </h2>
        <div className="text-xs font-black tracking-widest text-amber-400 uppercase mt-1">
          Your Saylo Journey
        </div>
        <p className="text-xs text-zinc-300 italic mt-1 max-w-sm">
          "You've come a long way. From ordering casual coffee to debating high-stakes ideas on the world stage."
        </p>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full my-5">
          <div className="p-3.5 rounded-2xl bg-[#18181B] border border-amber-500/20 flex flex-col items-center">
            <span className="text-2xl font-black text-white font-mono">
              30 / 30
            </span>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mt-0.5">
              Levels Conquered
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#18181B] border border-amber-500/20 flex flex-col items-center">
            <span className="text-2xl font-black text-white font-mono">
              240
            </span>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mt-0.5">
              Challenges Mastered
            </span>
          </div>
        </div>

        {/* 4 Skills Competency Summary */}
        <div className="w-full space-y-2 mb-6 text-left">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Overall Adventure Mastery
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-violet-300 font-bold">
                <BookOpen className="w-4 h-4" />
                <span>Vocabulary</span>
              </div>
              <span className="font-black text-white">Advanced</span>
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <FileText className="w-4 h-4" />
                <span>Reading</span>
              </div>
              <span className="font-black text-white">Subtle</span>
            </div>

            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-pink-300 font-bold">
                <PenTool className="w-4 h-4" />
                <span>Writing</span>
              </div>
              <span className="font-black text-white">Natural</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Mic className="w-4 h-4" />
                <span>Speaking</span>
              </div>
              <span className="font-black text-white">Confident</span>
            </div>
          </div>
        </div>

        {/* Replay & Close button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-black text-sm font-black shadow-lg shadow-amber-500/30 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>EXPLORE WORLD & REPLAY</span>
        </button>

      </div>
    </div>
  );
};
