import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  Heart,
  Compass,
  ArrowLeft,
  Target,
  Sparkles,
  Info,
  RotateCcw,
} from 'lucide-react';

export const GameHUD = ({
  progress,
  currentLevelMeta,
  onCenterCurrent,
  onRefillEnergy,
  user,
}) => {
  const [showEnergyModal, setShowEnergyModal] = useState(false);

  const energy = progress?.energy?.current ?? 5;
  const maxEnergy = progress?.energy?.max ?? 5;
  const streak = progress?.streak ?? 1;
  const xp = progress?.totalXP ?? 0;
  const currentLevelNum = progress?.currentLevel ?? 1;

  const handleRefillClick = async () => {
    if (onRefillEnergy) {
      await onRefillEnergy();
    }
    setShowEnergyModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-[#09090B]/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Back + SAYLO Adventure Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/home"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A1A1AA] hover:text-white transition border border-white/5 flex items-center justify-center cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#EC4899] to-[#22D3EE] flex items-center justify-center font-black text-white text-sm shadow-lg shadow-purple-500/25 animate-pulse">
                🗺️
              </span>
              <div className="hidden xs:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm tracking-wider text-white">Saylo</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30 uppercase tracking-wider">
                    World
                  </span>
                </div>
                <span className="text-[10px] text-[#A1A1AA] font-medium truncate max-w-[130px] sm:max-w-[180px]">
                  {currentLevelMeta ? `Lvl ${currentLevelNum}: ${currentLevelMeta.title}` : `Level ${currentLevelNum} of 30`}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Recenter Map Button */}
          <button
            onClick={onCenterCurrent}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 text-[#A78BFA] hover:text-white text-xs font-bold transition shadow-sm cursor-pointer select-none"
            title="Scroll to current level"
          >
            <Target className="w-3.5 h-3.5 text-[#22D3EE] animate-spin-slow" />
            <span className="hidden sm:inline">Current Node</span>
            <span className="sm:hidden font-mono">#{currentLevelNum}</span>
          </button>

          {/* Right: HUD Telemetry (Energy, Streak, XP, Avatar) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Hearts / Energy */}
            <button
              onClick={() => setShowEnergyModal(true)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-[#18181B] hover:bg-white/10 border border-white/10 transition cursor-pointer"
              title="Energy / Hearts"
            >
              <Heart className={`w-3.5 h-3.5 ${energy > 0 ? 'text-red-400 fill-red-400' : 'text-zinc-600'}`} />
              <span className="text-xs font-black text-white">{energy}</span>
              <span className="text-[10px] text-zinc-500 hidden sm:inline">/{maxEnergy}</span>
            </button>

            {/* Streak */}
            <div
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-[#18181B] border border-orange-500/20"
              title={`${streak} Day Learning Streak`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span className="text-xs font-black text-orange-300">{streak}</span>
            </div>

            {/* Total XP */}
            <div
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-950/60 to-violet-950/60 border border-[#8B5CF6]/30"
              title="Total Adventure XP"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-black text-purple-200">{xp.toLocaleString()}</span>
              <span className="text-[10px] font-semibold text-purple-400 hidden md:inline">XP</span>
            </div>

            {/* User Avatar */}
            <Link
              to="/profile"
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#22D3EE]/30 border border-white/20 flex items-center justify-center text-sm hover:scale-105 transition shadow-sm ml-1"
              title="Your Profile"
            >
              {user?.avatar || '⚡'}
            </Link>
          </div>

        </div>
      </header>

      {/* Energy Refill Friendly Modal */}
      {showEnergyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="max-w-sm w-full bg-[#18181B] border border-white/10 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-2xl mx-auto mb-4">
              ❤️
            </div>
            <h3 className="text-xl font-black text-white text-center mb-1">
              Adventure Energy: {energy}/{maxEnergy}
            </h3>
            <p className="text-xs text-[#A1A1AA] text-center leading-relaxed mb-6">
              Saylo is built for genuine learning, never punishing paywalls.
              Every level gives you unlimited tries to master the vibe!
            </p>

            <div className="space-y-2">
              <button
                onClick={handleRefillClick}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-sm font-black shadow-lg shadow-purple-500/25 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                Refill Energy for Free
              </button>
              <button
                onClick={() => setShowEnergyModal(false)}
                className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#A1A1AA] hover:text-white transition cursor-pointer"
              >
                Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
