import React from 'react';
import { Clock, ArrowRight, Check } from 'lucide-react';

const READING_THEMES = [
  {
    gradient: 'from-rose-500/15 via-rose-500/5 to-transparent',
    border: 'border-rose-500/25 hover:border-rose-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(244,114,182,0.18)]',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    actionText: 'text-rose-400 group-hover:text-rose-300',
    glowColor: 'bg-rose-500/15'
  },
  {
    gradient: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
    border: 'border-indigo-500/25 hover:border-indigo-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.18)]',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    actionText: 'text-indigo-400 group-hover:text-indigo-300',
    glowColor: 'bg-indigo-500/15'
  },
  {
    gradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
    border: 'border-amber-500/25 hover:border-amber-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    actionText: 'text-amber-400 group-hover:text-amber-300',
    glowColor: 'bg-amber-500/15'
  },
  {
    gradient: 'from-cyan-500/15 via-cyan-500/5 to-transparent',
    border: 'border-cyan-500/25 hover:border-cyan-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    actionText: 'text-cyan-400 group-hover:text-cyan-300',
    glowColor: 'bg-cyan-500/15'
  }
];

export const StoryCard = ({ item, story, index = 0, onSelect, isCompleted = false }) => {
  const data = item || story || {};
  const title = data.title || data.category || 'Reading Story';
  const category = data.category || 'Real Life';
  const time = data.estimatedTime || '5 min read';
  const preview = data.paragraph || data.summary || data.content || '';
  const theme = READING_THEMES[index % READING_THEMES.length];

  return (
    <div
      onClick={() => onSelect(data)}
      className={`
        relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group
        ${isCompleted
          ? 'bg-gradient-to-br from-emerald-950/20 via-[#121217] to-[#0d0d12] border border-emerald-500/35 hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]'
          : `bg-gradient-to-br ${theme.gradient} via-[#111116] to-[#0c0c10] border ${theme.border} ${theme.shadow}`
        }
      `}
    >
      {/* Ambient dynamic glow orb */}
      <div
        className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 opacity-40 group-hover:opacity-80 ${
          isCompleted ? 'bg-emerald-500/15' : theme.glowColor
        }`}
      />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-300 tracking-wide">
              {category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>

          {isCompleted ? (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              Completed
            </span>
          ) : (
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${theme.badge}`}>
              0{index + 1}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-white transition tracking-tight">
          {title}
        </h3>

        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {preview}
        </p>
      </div>

      <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-end">
        {isCompleted ? (
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 group-hover:translate-x-1 transition">
            Read Again <ArrowRight className="w-3.5 h-3.5" />
          </span>
        ) : (
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${theme.actionText} group-hover:translate-x-1 transition`}>
            Start Reading <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  );
};
