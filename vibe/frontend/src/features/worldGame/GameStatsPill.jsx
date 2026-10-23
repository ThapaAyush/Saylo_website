import React, { useState } from 'react';
import { Heart, Star, Clock, Info, X, Target } from 'lucide-react';

export const GameStatsPill = ({
  hearts = 5,
  maxHearts = 5,
  totalStars = 0,
  timerFormatted = '05:00',
  isFull = true,
  onOpenOutOfHearts,
  onFocusCurrentLevel,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-30 flex items-center gap-2 sm:gap-2.5">
      {/* 2nd Image: YOU ARE HERE Target Button (Aligned on the same side with Stars & Hearts) */}
      <button
        id="game-focus-target-btn"
        onClick={onFocusCurrentLevel}
        className="h-9 px-2.5 sm:px-3 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white shadow-lg shadow-purple-500/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs cursor-pointer select-none border border-white/20"
        title="YOU ARE HERE — Center current level on map"
      >
        <Target className="w-4 h-4 text-white" />
        <span className="text-[11px] font-extrabold uppercase tracking-wide hidden sm:inline">
          You Are Here
        </span>
      </button>

      {/* Stars Pill */}
      <div
        className="h-9 px-3 sm:px-3.5 rounded-full bg-[#121215]/95 border border-yellow-500/30 backdrop-blur-md text-white text-xs font-black shadow-lg shadow-black/60 flex items-center gap-1.5 select-none"
        title={`Total Stars Earned: ${totalStars} / 90`}
      >
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow" />
        <span className="font-mono text-xs">{totalStars}</span>
      </div>

      {/* Hearts Pill */}
      <button
        onClick={() => {
          if (hearts <= 0 && onOpenOutOfHearts) {
            onOpenOutOfHearts();
          } else {
            setShowInfo((prev) => !prev);
          }
        }}
        className={`
          relative h-9 px-3 sm:px-3.5 rounded-full border backdrop-blur-md text-xs font-black shadow-lg flex items-center gap-2 cursor-pointer transition select-none
          ${
            hearts <= 0
              ? 'bg-red-950/80 border-red-500/50 text-red-300 shadow-red-950/50 animate-pulse'
              : hearts < maxHearts
              ? 'bg-[#18181B]/95 border-red-500/40 text-white shadow-black/60 hover:border-red-400'
              : 'bg-[#121215]/90 border-white/15 text-white shadow-black/60 hover:border-white/30'
          }
        `}
        title="Heart Energy (Click for details)"
      >
        <span className="text-sm">{hearts <= 0 ? '💔' : '❤️'}</span>
        <span className="font-mono text-xs">
          {hearts}/{maxHearts}
        </span>
        {!isFull && (
          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-0.5 border-l border-white/10 pl-2">
            <Clock className="w-2.5 h-2.5 text-zinc-400" />
            <span>{timerFormatted}</span>
          </span>
        )}
      </button>

      {/* Popover explaining Heart & Star System */}
      {showInfo && (
        <div className="absolute top-12 right-0 w-72 rounded-2xl bg-[#18181B] border border-white/10 p-4 shadow-2xl text-left space-y-3 z-50 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-black text-white flex items-center gap-1.5">
              <span>❤️</span> Heart Energy System
            </span>
            <button
              onClick={() => setShowInfo(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex justify-between items-center bg-[#121215] p-2 rounded-xl">
              <span className="text-zinc-400">Current Hearts</span>
              <span className="font-mono font-black text-red-400">
                {hearts} / {maxHearts}
              </span>
            </div>

            <div className="flex justify-between items-center bg-[#121215] p-2 rounded-xl">
              <span className="text-zinc-400">Next Heart In</span>
              <span className="font-mono font-bold text-white">
                {isFull ? 'Hearts Full (5/5)' : timerFormatted}
              </span>
            </div>

            <div className="flex justify-between items-center bg-[#121215] p-2 rounded-xl">
              <span className="text-zinc-400">Total Stars Earned</span>
              <span className="font-mono font-bold text-yellow-400 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400" /> {totalStars} / 90
              </span>
            </div>
          </div>

          <ul className="text-[11px] text-zinc-400 space-y-1 list-disc list-inside">
            <li>Wrong quiz answers deduct 1 ❤️.</li>
            <li>Completing a level awards +1 ❤️ (max 5).</li>
            <li>1 new heart regenerates every 5 minutes.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
