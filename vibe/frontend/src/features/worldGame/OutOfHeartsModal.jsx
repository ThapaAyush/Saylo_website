import React from 'react';
import { Heart, Clock, ArrowLeft, Sparkles } from 'lucide-react';

export const OutOfHeartsModal = ({
  isOpen,
  onClose,
  timerFormatted,
  secondsRemaining,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#121215] border border-red-500/30 p-6 text-center shadow-2xl shadow-red-950/40 space-y-5">
        
        {/* Glowing Broken Heart Icon */}
        <div className="mx-auto w-18 h-18 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-3xl shadow-lg shadow-red-500/20 animate-pulse">
          💔
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-white tracking-wide">
            Out of Hearts!
          </h3>
          <p className="text-xs text-zinc-400 max-w-[260px] mx-auto leading-relaxed">
            You've run out of hearts. A new heart will be added automatically when the timer finishes.
          </p>
        </div>

        {/* Live Countdown Timer Box */}
        <div className="p-4 rounded-2xl bg-[#18181B] border border-white/10 flex flex-col items-center gap-1.5 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>Next Heart In</span>
          </div>
          <div className="text-3xl font-black font-mono text-red-400 tracking-wider">
            {timerFormatted || '05:00'}
          </div>
          <div className="text-[10px] text-zinc-500 font-semibold">
            +1 heart every 5 minutes (Max 5)
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Adventure Map</span>
        </button>
      </div>
    </div>
  );
};
