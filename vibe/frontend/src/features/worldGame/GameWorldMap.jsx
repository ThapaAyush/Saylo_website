import React, { useRef, useEffect } from 'react';
import {
  Lock,
  Check,
  Star,
} from 'lucide-react';
import {
  LEVEL_MAP_COORDINATES,
  MAP_CANVAS_HEIGHT,
} from './mapCoordinates';

export const GameWorldMap = ({
  levels = [],
  progress,
  selectedLevel,
  onSelectLevel,
  user,
}) => {
  const currentLevelNum = progress?.currentLevel ?? 1;
  const completedLevels = progress?.completedLevels ?? [];
  const levelScores = progress?.levelScores ?? [];

  // Sort levels by levelNumber (1 to 30)
  const sortedLevels = [...levels].sort((a, b) => a.levelNumber - b.levelNumber);

  const currentNodeRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to current level on mount or level change
  useEffect(() => {
    if (currentNodeRef.current) {
      const timer = setTimeout(() => {
        currentNodeRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLevelNum, sortedLevels.length]);

  // Helper: generate cubic bezier path segment
  const generatePathSegment = (p1, p2) => {
    const midY = (p1.y + p2.y) / 2;
    return `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
  };

  // Generate completed path and future path
  let completedPathD = '';
  let futurePathD = '';

  for (let i = 0; i < sortedLevels.length - 1; i++) {
    const l1 = sortedLevels[i];
    const l2 = sortedLevels[i + 1];
    const p1 = LEVEL_MAP_COORDINATES[l1.levelNumber] || l1.mapPosition || { x: 50, y: 5350 };
    const p2 = LEVEL_MAP_COORDINATES[l2.levelNumber] || l2.mapPosition || { x: 50, y: 5170 };
    const seg = generatePathSegment(p1, p2);

    if (l2.levelNumber <= currentLevelNum) {
      completedPathD += ` ${seg}`;
    } else {
      futurePathD += ` ${seg}`;
    }
  }

  const getScoreData = (lvlNum) => {
    return levelScores.find((s) => s.levelNumber === lvlNum);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-y-auto overflow-x-hidden min-h-[calc(100vh-65px)] bg-[#09090B] select-none scroll-smooth"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Smooth Seamless Ambient Lighting — Zero Hard Seams or Abrupt Color Cuts */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 800px at 50% 5000px, rgba(16, 185, 129, 0.08), transparent 75%),
            radial-gradient(circle 800px at 50% 2800px, rgba(6, 182, 212, 0.07), transparent 75%),
            radial-gradient(circle 800px at 50% 900px, rgba(139, 92, 246, 0.08), transparent 75%)
          `,
        }}
      />

      {/* Main Map Arena Canvas */}
      <div className="relative mx-auto w-full max-w-[680px] h-[5600px]">
        
        {/* SVG Connecting Paths Layer */}
        <svg
          viewBox={`0 0 100 ${MAP_CANVAS_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
        >
          <defs>
            <linearGradient id="activePathGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#8B5CF6" />
              <stop offset="70%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Road Bed */}
          <path
            d={`${completedPathD} ${futurePathD}`}
            fill="none"
            stroke="#18181B"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Future Segment */}
          {futurePathD && (
            <path
              d={futurePathD}
              fill="none"
              stroke="#3F3F46"
              strokeWidth="1.2"
              strokeDasharray="1.8 2.2"
              strokeLinecap="round"
              opacity="0.5"
            />
          )}

          {/* Completed Segment */}
          {completedPathD && (
            <path
              d={completedPathD}
              fill="none"
              stroke="url(#activePathGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
          )}
        </svg>

        {/* ========================================================================= */}
        {/* 30 INTERACTIVE LEVEL NODES (CLEAN, NO EXTRA TEXT, NO OVERLAPPING) */}
        {/* ========================================================================= */}
        {sortedLevels.map((lvl) => {
          const lvlNum = lvl.levelNumber;
          const pos = LEVEL_MAP_COORDINATES[lvlNum] || lvl.mapPosition || { x: 50, y: 5350 };
          const scoreData = getScoreData(lvlNum);
          const stars = scoreData?.stars || 0;
          const hasAttempted = stars > 0 || (scoreData && scoreData.score > 0);

          // STRICT RULE: Node is marked completed ONLY IF it has earned FULL 3 STARS!
          const isCompleted = stars === 3;

          // STRICT UNLOCK RULE:
          // Level 1 is always unlocked.
          // Level N is unlocked IF AND ONLY IF every preceding level has achieved full 3 stars (lvlNum <= currentLevelNum).
          // If lvlNum > currentLevelNum, it is strictly LOCKED!
          const isLocked = lvlNum > currentLevelNum;

          const isCurrent = lvlNum === currentLevelNum;
          const isSelected = selectedLevel?.levelNumber === lvlNum;
          const isBoss = lvl.bossLevel;

          const formattedNum = String(lvlNum).padStart(2, '0');

          return (
            <div
              key={lvl._id || lvlNum}
              ref={isCurrent ? currentNodeRef : null}
              id={isCurrent ? 'current-game-level-node' : undefined}
              data-current-level={isCurrent ? 'true' : undefined}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}px`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform duration-300"
            >
              {/* CURRENT LEVEL AVATAR BADGE */}
              {isCurrent && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce">
                  <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-[11px] font-black shadow-lg shadow-purple-500/40 flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-xs">{user?.avatar || '⚡'}</span>
                    <span>YOU ARE HERE</span>
                  </div>
                  <div className="w-2 h-2 bg-[#22D3EE] rotate-45 -mt-1 shadow-sm" />
                </div>
              )}

              {/* NODE BUTTON */}
              <button
                onClick={() => onSelectLevel(lvl, isLocked)}
                className={`
                  relative transition-all duration-300 flex items-center justify-center cursor-pointer select-none
                  ${isBoss ? 'w-18 h-18 sm:w-20 sm:h-20' : 'w-14 h-14 sm:w-16 sm:h-16'}
                  ${isSelected ? 'scale-115 ring-4 ring-[#8B5CF6] ring-offset-2 ring-offset-[#09090B]' : 'hover:scale-110 active:scale-95'}
                  ${isLocked ? 'opacity-65 cursor-pointer' : ''}
                `}
                title={`Level ${lvlNum}: ${lvl.title} ${isLocked ? '(Locked)' : ''}`}
              >
                {/* Visual Backdrop Rings & Glows */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/30 blur-md animate-pulse -z-10" />
                )}

                {/* Main Node Shell */}
                <div
                  className={`
                    w-full h-full rounded-full flex flex-col items-center justify-center shadow-xl border-2 transition-all
                    ${
                      isBoss
                        ? 'border-amber-400 bg-gradient-to-b from-amber-500/30 to-[#18181B] shadow-amber-500/30'
                        : isCurrent
                        ? 'border-[#22D3EE] bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] shadow-[#8B5CF6]/50'
                        : isCompleted
                        ? 'border-emerald-500/70 bg-[#18181B] hover:border-emerald-400 shadow-emerald-500/20'
                        : 'border-zinc-700/60 bg-[#121215] hover:border-zinc-500'
                    }
                  `}
                >
                  {/* Inside Node: Number or State Icon */}
                  {isLocked ? (
                    <div className="flex flex-col items-center justify-center">
                      <Lock className="w-3.5 h-3.5 text-zinc-400 mb-0.5" />
                      <span className="text-[11px] font-bold text-zinc-400 font-mono">
                        {formattedNum}
                      </span>
                    </div>
                  ) : isCurrent ? (
                    <div className="flex flex-col items-center justify-center text-white">
                      <span className="text-xs sm:text-sm font-black font-mono leading-none">
                        {formattedNum}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-black/40 px-1.5 py-0.2 rounded-full mt-0.5">
                        PLAY
                      </span>
                    </div>
                  ) : isCompleted ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-[11px] font-black text-white font-mono leading-none">
                        {formattedNum}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-black text-zinc-400 font-mono">
                      {formattedNum}
                    </span>
                  )}
                </div>

                {/* Boss Badge Icon on Top-Right */}
                {isBoss && (
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500 border border-amber-300 text-black flex items-center justify-center text-xs shadow-md">
                    {lvlNum === 30 ? '🏆' : '👑'}
                  </div>
                )}

                {/* Stars Indicator: ONLY for UNLOCKED nodes (never for locked nodes!) */}
                {!isLocked && stars > 0 && (
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[#09090B]/90 px-1.5 py-0.5 rounded-full border border-yellow-500/30 shadow-sm">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-2.5 h-2.5 ${
                          s <= stars
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>

              {/* Node Title Tooltip on Hover */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap">
                <div className="px-2.5 py-1 rounded-xl bg-[#18181B] border border-white/10 text-white text-[11px] font-semibold shadow-xl">
                  {lvl.title}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
