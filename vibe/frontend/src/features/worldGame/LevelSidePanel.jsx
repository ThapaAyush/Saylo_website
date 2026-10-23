import React, { useState } from 'react';
import {
  X,
  Play,
  Clock,
  Zap,
  Sparkles,
  Lock,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  FileText,
  PenTool,
  Mic,
  Star,
  Layers,
} from 'lucide-react';

export const LevelSidePanel = ({
  level,
  world,
  progress,
  isOpen,
  onClose,
  onStartMission,
  onAIEnhance,
  isLocked,
}) => {
  if (!level || !isOpen) return null;

  const [aiInterest, setAiInterest] = useState('Tech');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [customBrief, setCustomBrief] = useState(null);

  const lvlNum = level.levelNumber;
  const isCompleted = progress?.completedLevels?.includes(lvlNum);
  const scoreData = progress?.levelScores?.find((s) => s.levelNumber === lvlNum);
  const stars = scoreData?.stars || 0;

  // Format difficulty dots
  const difficultyDots =
    level.difficulty === 'easy'
      ? '●○○'
      : level.difficulty === 'medium'
      ? '●●○'
      : '●●●';

  const skillList = [
    { name: 'Vocabulary', icon: BookOpen, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
    { name: 'Reading', icon: FileText, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Writing', icon: PenTool, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
    { name: 'Speaking', icon: Mic, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  ];

  const handleEnhanceClick = async (interest) => {
    setAiInterest(interest);
    setIsEnhancing(true);
    try {
      if (onAIEnhance) {
        const res = await onAIEnhance(lvlNum, interest);
        if (res?.scenario) {
          setCustomBrief(res.scenario);
        }
      }
    } catch (e) {
      console.warn('AI enhancement fallback');
    } finally {
      setIsEnhancing(false);
    }
  };

  const activeScenario = customBrief || level.scenario;

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto flex justify-end">
      {/* Mobile Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
      />

      {/* Slide-in Panel / Drawer */}
      <div
        className={`
          relative w-full lg:w-[380px] xl:w-[420px] max-h-[90vh] lg:max-h-none lg:h-full bg-[#121215] border-t lg:border-t-0 lg:border-l border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-50
          mt-auto lg:mt-0 rounded-t-3xl lg:rounded-none animate-in slide-in-from-bottom lg:slide-in-from-right duration-300
        `}
      >
        <div>
          {/* Header row: World & Level Badge + Close */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#22D3EE]/20 border border-[#8B5CF6]/30 text-white text-xs font-black tracking-wider uppercase">
                LEVEL {lvlNum}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {world?.name || (lvlNum <= 10 ? 'START' : lvlNum <= 20 ? 'BUILD' : 'MASTER')}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Boss Tag if applicable */}
          {level.bossLevel && (
            <div className="mb-3 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black flex items-center gap-1.5">
              <span>👑</span>
              <span>MILESTONE BOSS ADVENTURE</span>
            </div>
          )}

          {/* Level Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
            "{level.title}"
          </h2>

          {/* Narrative Mission Briefing */}
          <div className="p-3.5 rounded-2xl bg-[#18181B] border border-white/5 mb-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A78BFA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mission Setting & Scenario</span>
            </div>
            <p className="text-xs text-[#E4E4E7] leading-relaxed">
              {activeScenario?.missionBrief || level.description}
            </p>
            {activeScenario?.character && (
              <div className="text-[11px] text-zinc-400 font-medium">
                👤 Contact: <span className="text-white font-semibold">{activeScenario.character}</span> • {activeScenario.setting}
              </div>
            )}
          </div>

          {/* Telemetry metadata: Difficulty, Time, Reward */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="p-2.5 rounded-2xl bg-[#18181B] border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase">Difficulty</span>
              <span className="text-xs font-mono font-black text-emerald-400 tracking-widest mt-0.5">
                {difficultyDots}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#18181B] border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase">Est. Time</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-zinc-400" />
                <span className="text-xs font-bold text-white">{level.estimatedTime || '5 min'}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#18181B] border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase">Reward</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-black text-yellow-300">+{level.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Skills Pill List */}
          <div className="mb-4">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Skills Tested
            </div>
            <div className="grid grid-cols-2 gap-2">
              {skillList.map((sk) => {
                const Icon = sk.icon;
                return (
                  <div
                    key={sk.name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${sk.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sk.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Personalization Flavor Selector */}
          {!isLocked && (
            <div className="p-3 rounded-2xl bg-[#18181B] border border-white/5 mb-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 mb-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#22D3EE]" /> Personalize Context
                </span>
                {isEnhancing && <span className="text-[10px] text-[#22D3EE] animate-pulse">Personalizing...</span>}
              </div>
              <div className="flex gap-1.5">
                {['Gaming', 'Music', 'Tech', 'Travel'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleEnhanceClick(topic)}
                    className={`
                      px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer
                      ${
                        aiInterest === topic
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                      }
                    `}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Completion Status & Best Stars */}
          {isCompleted && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">Level Completed</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button Row */}
        <div className="pt-4 border-t border-white/10">
          {isLocked ? (
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700/50 flex items-center gap-2.5 text-zinc-400 text-xs">
                <Lock className="w-4 h-4 shrink-0 text-zinc-400" />
                <span>Complete Level {lvlNum - 1} to unlock this adventure.</span>
              </div>
              <button
                disabled
                className="w-full py-3.5 rounded-2xl bg-zinc-800 text-zinc-500 text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Locked
              </button>
            </div>
          ) : (
            <button
              onClick={() => onStartMission(level)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#22D3EE] text-white text-sm font-black shadow-lg shadow-purple-500/30 hover:opacity-95 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCompleted ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>REPLAY MISSION</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>START MISSION</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
