import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SpeakingStudio } from '../features/speaking/SpeakingStudio';
import { SPEAKING_TOPICS } from '../features/speaking/speakingTopicsData';
import { useAuth, LEVEL_LABELS } from '../context/AuthContext';
import { api } from '../services/api';
import { Mic, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

const TOPIC_THEMES = [
  {
    gradient: 'from-cyan-500/15 via-cyan-500/5 to-transparent',
    border: 'border-cyan-500/25 hover:border-cyan-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    actionText: 'text-cyan-400 group-hover:text-cyan-300',
    glowColor: 'bg-cyan-500/15'
  },
  {
    gradient: 'from-violet-500/15 via-violet-500/5 to-transparent',
    border: 'border-violet-500/25 hover:border-violet-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    actionText: 'text-violet-400 group-hover:text-violet-300',
    glowColor: 'bg-violet-500/15'
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
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/25 hover:border-emerald-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    actionText: 'text-emerald-400 group-hover:text-emerald-300',
    glowColor: 'bg-emerald-500/15'
  }
];

export const SpeakingPage = () => {
  const { user, level, changeLevel } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Completed speaking topic IDs (saved to MongoDB & localStorage)
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_completed_speakings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync completions from DB on mount
  useEffect(() => {
    const fetchCompletions = async () => {
      try {
        const res = await api.getActivityCompletions();
        if (res?.completedSpeakings?.length) {
          setCompletedTopicIds((prev) => {
            const merged = Array.from(new Set([...prev, ...res.completedSpeakings]));
            localStorage.setItem('vibe_completed_speakings', JSON.stringify(merged));
            return merged;
          });
        }
      } catch (e) {
        // guest or offline fallback
      }
    };
    fetchCompletions();
  }, [user]);

  // Handle completion of a speaking topic
  const handleCompleteTopic = async (topicId) => {
    if (!topicId) return;
    const strId = String(topicId);

    setCompletedTopicIds((prev) => {
      const updated = Array.from(new Set([...prev, strId]));
      try {
        localStorage.setItem('vibe_completed_speakings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await api.completeActivity('speaking', strId);
    } catch (err) {
      console.warn('Speaking activity DB save fallback:', err);
    }
  };

  // Normalize level
  const currentLevelKey = level === 'advanced' ? 'advanced' : level === 'intermediate' ? 'intermediate' : 'beginner';
  const topics = SPEAKING_TOPICS[currentLevelKey] || SPEAKING_TOPICS.beginner;
  const levelInfo = LEVEL_LABELS[level] || LEVEL_LABELS.beginner;

  const currentIndex = selectedTopic ? topics.findIndex((t) => t.id === selectedTopic.id) : -1;
  const hasNext = currentIndex >= 0 && currentIndex < topics.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setSelectedTopic(topics[currentIndex + 1]);
    }
  };

  // If a topic is selected, render the clean Speaking Studio
  if (selectedTopic) {
    return (
      <SpeakingStudio
        topic={selectedTopic}
        currentIndex={currentIndex >= 0 ? currentIndex : 0}
        totalCount={topics.length}
        hasNext={hasNext}
        isCompleted={completedTopicIds.includes(selectedTopic.id)}
        onCompleteTopic={handleCompleteTopic}
        onNext={handleNext}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  const completedCount = topics.filter((t) => completedTopicIds.includes(t.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header with Level & Switcher */}
      <div className="pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#22D3EE]/20 border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
              <Mic className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-[#22D3EE] tracking-wide uppercase font-mono">
              Speaking Track
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Speaking
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Pick a topic, speak naturally, and get instant corrections on your mistakes.
          </p>
        </div>
      </div>

      {/* Speaking Topics Progress & Status Bar */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-mono text-xs font-semibold">
              Level: {levelInfo.label}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {completedCount}/4 Completed
            </span>
          </div>

          {/* Clean 4-segment visual progress indicator */}
          <div className="flex items-center gap-1.5" title={`${completedCount} of 4 Completed`}>
            {topics.map((t) => {
              const done = completedTopicIds.includes(t.id);
              return (
                <span
                  key={t.id}
                  className={`w-7 h-1.5 rounded-full transition-all duration-300 ${
                    done
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                      : 'bg-zinc-800'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* The 4 Sleek Speaking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topics.map((item, idx) => {
            const isCompleted = completedTopicIds.includes(item.id);
            const theme = TOPIC_THEMES[idx % TOPIC_THEMES.length];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedTopic(item)}
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
                      <span className="text-base">{item.emoji}</span>
                      <span className="text-xs font-semibold text-zinc-300 tracking-wide">
                        {item.category}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        Completed
                      </span>
                    ) : (
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${theme.badge}`}>
                        0{idx + 1}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-white transition tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {item.explanation}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-end">
                  {isCompleted ? (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 group-hover:translate-x-1 transition">
                      Practice Again <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className={`text-xs font-semibold flex items-center gap-1.5 ${theme.actionText} group-hover:translate-x-1 transition`}>
                      Start Speaking <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
