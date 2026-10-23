import React from 'react';

export const Streak = ({ count = 1, className = '', showLabel = true }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-[#18181B] hover:bg-[#27272A] border border-orange-500/20 rounded-full transition-all duration-200 cursor-default select-none ${className}`}
      title={`${count} day streak! Keep it burning.`}
    >
      <span className="text-base animate-pulse">🔥</span>
      <span className="font-bold text-orange-400 font-mono text-sm">{count}</span>
      {showLabel && <span className="text-[11px] text-[#A1A1AA] hidden sm:inline">DAYS</span>}
    </div>
  );
};
