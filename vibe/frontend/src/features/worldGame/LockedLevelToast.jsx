import React, { useEffect } from 'react';
import { Lock, X } from 'lucide-react';

export const LockedLevelToast = ({ levelNumber, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [levelNumber, onClose]);

  return (
    <div className="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#18181B] border border-amber-500/30 text-white text-xs font-semibold shadow-2xl backdrop-blur-md">
        <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
          <Lock className="w-3.5 h-3.5" />
        </div>
        <span>Earn 3 Stars on Level {levelNumber - 1} to unlock this.</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
