import React, { useState, useEffect } from 'react';
import { Badge } from '../components/ui/Badge';
import { StoryCard } from '../features/reading/StoryCard';
import { ReadingStudio } from '../features/reading/ReadingStudio';
import { READING_PARAGRAPHS } from '../features/reading/readingParagraphsData';
import { useAuth, LEVEL_LABELS } from '../context/AuthContext';
import { api } from '../services/api';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export const ReadingPage = () => {
  const { user, level, changeLevel } = useAuth();
  const [activeItem, setActiveItem] = useState(null);

  // Completed reading IDs (saved to MongoDB & localStorage)
  const [completedReadingIds, setCompletedReadingIds] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_completed_readings');
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
        if (res?.completedReadings?.length) {
          setCompletedReadingIds((prev) => {
            const merged = Array.from(new Set([...prev, ...res.completedReadings]));
            localStorage.setItem('vibe_completed_readings', JSON.stringify(merged));
            return merged;
          });
        }
      } catch (e) {
        // guest or offline fallback
      }
    };
    fetchCompletions();
  }, [user]);

  // Handle completion of a reading story/paragraph
  const handleCompleteReading = async (readingId) => {
    if (!readingId) return;
    const strId = String(readingId);

    setCompletedReadingIds((prev) => {
      const updated = Array.from(new Set([...prev, strId]));
      try {
        localStorage.setItem('vibe_completed_readings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await api.completeActivity('reading', strId);
    } catch (err) {
      console.warn('Reading activity DB save fallback:', err);
    }
  };

  // Normalize level to beginner, intermediate, advanced
  const currentLevelKey = level === 'advanced' ? 'advanced' : level === 'intermediate' ? 'intermediate' : 'beginner';
  const levelParagraphs = READING_PARAGRAPHS[currentLevelKey] || READING_PARAGRAPHS.beginner;

  // Reset active item when level changes
  useEffect(() => {
    setActiveItem(null);
  }, [level]);

  const levelInfo = LEVEL_LABELS[level] || LEVEL_LABELS.beginner;

  const currentIndex = activeItem ? levelParagraphs.findIndex((p) => p.id === activeItem.id) : -1;
  const hasNext = currentIndex >= 0 && currentIndex < levelParagraphs.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setActiveItem(levelParagraphs[currentIndex + 1]);
    }
  };

  // If a paragraph is selected, display the focused Reader Canvas
  if (activeItem) {
    return (
      <ReadingStudio
        item={activeItem}
        currentIndex={currentIndex >= 0 ? currentIndex : 0}
        totalCount={levelParagraphs.length}
        hasNext={hasNext}
        isCompleted={completedReadingIds.includes(activeItem.id)}
        onCompleteReading={handleCompleteReading}
        onNext={handleNext}
        onBack={() => setActiveItem(null)}
      />
    );
  }

  const completedCount = levelParagraphs.filter((p) => completedReadingIds.includes(p.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header with Level & Switcher */}
      <div className="pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#F472B6]/20 border border-[#F472B6]/40 flex items-center justify-center text-[#F472B6]">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-[#F472B6] tracking-wide uppercase font-mono">
              Reading Track
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Reading
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Read the paragraph, give it a title, explain it in short, and answer a simple question.
          </p>
        </div>
      </div>

      {/* The 4 Reading Paragraphs Progress & Status Bar */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 font-mono text-xs font-semibold">
              Level: {levelInfo.label}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {completedCount}/4 Completed
            </span>
          </div>

          {/* Clean 4-segment visual progress indicator */}
          <div className="flex items-center gap-1.5" title={`${completedCount} of 4 Completed`}>
            {levelParagraphs.map((p) => {
              const done = completedReadingIds.includes(p.id);
              return (
                <span
                  key={p.id}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {levelParagraphs.map((item, idx) => (
            <StoryCard
              key={item.id}
              item={item}
              index={idx}
              isCompleted={completedReadingIds.includes(item.id)}
              onSelect={setActiveItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
