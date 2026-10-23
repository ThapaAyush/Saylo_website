import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';
import { useAuth, LEVEL_LABELS } from '../context/AuthContext';
import { useSpeech } from '../hooks/useSpeech';
import { WRITING_TOPICS } from '../features/writing/writingTopicsData';
import {
  PenTool,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const WRITING_THEMES = [
  {
    gradient: 'from-lime-500/15 via-lime-500/5 to-transparent',
    border: 'border-lime-500/25 hover:border-lime-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(163,230,53,0.18)]',
    badge: 'bg-lime-500/15 text-lime-300 border-lime-500/30',
    actionText: 'text-lime-400 group-hover:text-lime-300',
    glowColor: 'bg-lime-500/15'
  },
  {
    gradient: 'from-sky-500/15 via-sky-500/5 to-transparent',
    border: 'border-sky-500/25 hover:border-sky-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.18)]',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    actionText: 'text-sky-400 group-hover:text-sky-300',
    glowColor: 'bg-sky-500/15'
  },
  {
    gradient: 'from-fuchsia-500/15 via-fuchsia-500/5 to-transparent',
    border: 'border-fuchsia-500/25 hover:border-fuchsia-400/60',
    shadow: 'hover:shadow-[0_0_30px_rgba(217,70,239,0.18)]',
    badge: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
    actionText: 'text-fuchsia-400 group-hover:text-fuchsia-300',
    glowColor: 'bg-fuchsia-500/15'
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

const getCategoryEmoji = (category = '') => {
  const cat = category.toLowerCase();
  if (cat.includes('personal') || cat.includes('story')) return '📖';
  if (cat.includes('lifestyle') || cat.includes('habit')) return '🌿';
  if (cat.includes('people') || cat.includes('value')) return '🌟';
  if (cat.includes('food') || cat.includes('place')) return '🍜';
  if (cat.includes('work') || cat.includes('career')) return '💼';
  if (cat.includes('tech')) return '💡';
  if (cat.includes('art') || cat.includes('culture')) return '🎨';
  return '✍️';
};

export const WritingPage = () => {
  const { user, level, changeLevel } = useAuth();
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [userText, setUserText] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedPolish, setCopiedPolish] = useState(false);

  // Completed writing prompt IDs (saved to MongoDB & localStorage)
  const [completedWritingIds, setCompletedWritingIds] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_completed_writings');
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
        if (res?.completedWritings?.length) {
          setCompletedWritingIds((prev) => {
            const merged = Array.from(new Set([...prev, ...res.completedWritings]));
            localStorage.setItem('vibe_completed_writings', JSON.stringify(merged));
            return merged;
          });
        }
      } catch (e) {}
    };
    fetchCompletions();
  }, [user]);

  const handleCompleteWriting = async (promptId) => {
    if (!promptId) return;
    const strId = String(promptId);
    setCompletedWritingIds((prev) => {
      const updated = Array.from(new Set([...prev, strId]));
      try {
        localStorage.setItem('vibe_completed_writings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await api.completeActivity('writing', strId);
    } catch (e) {
      console.warn('Writing DB save fallback:', e);
    }
  };

  // Normalize level
  const currentLevelKey = level === 'advanced' ? 'advanced' : level === 'intermediate' ? 'intermediate' : 'beginner';
  const topics = WRITING_TOPICS[currentLevelKey] || WRITING_TOPICS.beginner;
  const levelInfo = LEVEL_LABELS[level] || LEVEL_LABELS.beginner;

  // Speech Hook
  const {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSpeaking,
  } = useSpeech();

  // Reset when level changes
  useEffect(() => {
    setSelectedPrompt(null);
    setUserText('');
    setFeedback(null);
    setSubmitted(false);
  }, [level]);

  const baseWritingRef = useRef('');

  // Sync mic dictation smoothly without word duplication
  useEffect(() => {
    if (transcript && isListening) {
      const base = baseWritingRef.current;
      setUserText(base ? `${base} ${transcript}` : transcript);
    }
  }, [transcript, isListening]);

  const currentIndex = selectedPrompt ? topics.findIndex((t) => t.id === selectedPrompt.id) : -1;
  const hasNext = currentIndex >= 0 && currentIndex < topics.length - 1;

  const handleSelectTopic = (prompt) => {
    stopSpeaking();
    stopListening();
    setSelectedPrompt(prompt);
    setUserText('');
    setFeedback(null);
    setSubmitted(false);
  };

  const handleBackToTopics = () => {
    stopSpeaking();
    stopListening();
    setSelectedPrompt(null);
    setUserText('');
    setFeedback(null);
    setSubmitted(false);
  };

  const handleNext = () => {
    if (hasNext) {
      handleSelectTopic(topics[currentIndex + 1]);
    }
  };

  const handleEvaluate = async (e) => {
    if (e) e.preventDefault();
    if (!userText.trim()) return;

    setEvaluating(true);
    setFeedback(null);
    try {
      const evaluation = await api.getWritingFeedback({
        text: userText,
        promptContext: selectedPrompt?.prompt || selectedPrompt?.title || '',
      });
      setFeedback(evaluation);
      if (selectedPrompt?.id) {
        handleCompleteWriting(selectedPrompt.id);
      }
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error(err);
      // Clean fallback feedback
      const wordsCount = userText.trim().split(/\s+/).filter(Boolean).length;
      setFeedback({
        yourVersion: userText,
        better: userText.trim().charAt(0).toUpperCase() + userText.trim().slice(1),
        why: wordsCount >= 100
          ? 'Great depth! Your paragraphs develop ideas thoroughly. Focus on smooth transitions between sentences for natural flow.'
          : 'Good start. Expand your ideas with more details to reach up to 300 words.',
        naturalnessScore: Math.min(96, Math.max(80, Math.round(75 + (wordsCount / 300) * 20))),
      });
      if (selectedPrompt?.id) {
        handleCompleteWriting(selectedPrompt.id);
      }
    } finally {
      setEvaluating(false);
    }
  };

  const handleSaveSubmission = async () => {
    try {
      await api.submitWriting({
        promptId: selectedPrompt?.id,
        originalText: userText,
        feedback,
      });
      if (selectedPrompt?.id) {
        handleCompleteWriting(selectedPrompt.id);
      }
      setSubmitted(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      speak('Great writing! Your thoughts were saved.');
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    }
  };

  const handleCopyPolish = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPolish(true);
    setTimeout(() => setCopiedPolish(false), 2000);
  };

  const wordCount = userText.trim() ? userText.trim().split(/\s+/).filter(Boolean).length : 0;
  const targetWords = selectedPrompt?.targetWordCount || 300;
  const wordPercent = Math.min(100, Math.round((wordCount / targetWords) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header with Level & Switcher */}
      <div className="pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#A3E635]/20 border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635]">
              <PenTool className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-[#A3E635] tracking-wide uppercase font-mono">
              Writing Track
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Writing
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Pick a topic and write up to 300 words. Get instant natural coaching.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW A: CHOOSE FROM 4 TOPICS                                              */}
      {/* ========================================================================= */}
      {!selectedPrompt && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/25 text-lime-300 font-mono text-xs font-semibold">
                Level: {levelInfo.label}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {topics.filter((p) => completedWritingIds.includes(p.id)).length}/4 Completed
              </span>
            </div>

            {/* Clean 4-segment visual progress indicator */}
            <div className="flex items-center gap-1.5">
              {topics.map((p) => {
                const done = completedWritingIds.includes(p.id);
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
            {topics.map((p, idx) => {
              const isCompleted = completedWritingIds.includes(p.id);
              const theme = WRITING_THEMES[idx % WRITING_THEMES.length];

              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectTopic(p)}
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
                        <span className="text-base">{getCategoryEmoji(p.category)}</span>
                        <span className="text-xs font-semibold text-zinc-300 tracking-wide capitalize">
                          {p.category}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          ~300 words
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
                      {p.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {p.shortTeaser || p.prompt}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-end">
                    {isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 group-hover:translate-x-1 transition">
                        Write Again <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className={`text-xs font-semibold flex items-center gap-1.5 ${theme.actionText} group-hover:translate-x-1 transition`}>
                        Start Writing <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW B: ACTIVE WRITING CANVAS (TOPIC + DETAILED ASSIGNMENT + CANVAS)       */}
      {/* ========================================================================= */}
      {selectedPrompt && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToTopics}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#A1A1AA] hover:text-white transition cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to 4 Topics</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-mono">
                Topic {currentIndex + 1} of {topics.length}
              </span>
              {hasNext && (
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-xl bg-[#A3E635]/10 hover:bg-[#A3E635]/20 border border-[#A3E635]/30 text-xs font-bold text-[#A3E635] transition cursor-pointer flex items-center gap-1"
                >
                  <span>Next Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 1. The Topic Card with Expanded Assignment Explanation */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#18181B] to-[#121214] border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="lime" size="xs">
                    {selectedPrompt.category}
                  </Badge>
                  <span className="text-xs text-[#A3E635] font-mono font-semibold">
                    {selectedPrompt.targetLength}
                  </span>
                  {completedWritingIds.includes(selectedPrompt.id) && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedPrompt.title}
                </h2>
              </div>

              {/* Hear Prompt Button */}
              <button
                onClick={() => speak(selectedPrompt.sampleSpeech || selectedPrompt.prompt)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 shrink-0"
                title="Hear prompt in Indian male voice"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Hear Prompt 🔊</span>
              </button>
            </div>

            {/* In Your Topic Assignment: Explained in detail */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#A3E635] uppercase tracking-wider block">
                Your Topic Assignment:
              </span>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                {selectedPrompt.prompt}
              </p>

              {/* Guiding points */}
              {selectedPrompt.guidingPoints?.length > 0 && (
                <div className="p-4 bg-[#111113] rounded-xl border border-white/5 space-y-2 text-xs">
                  <span className="font-bold text-zinc-400 block uppercase tracking-wide text-[10px]">
                    Key points to include in your 300-word piece:
                  </span>
                  <ul className="space-y-1.5 text-zinc-300">
                    {selectedPrompt.guidingPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#A3E635] font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* 2. The Simple Writing Canvas */}
          <Card className="p-6 sm:p-8 bg-[#111113] border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Write Your Response:</span>
              </span>

              {/* Dictate via Mic */}
              <button
                onClick={() => {
                  if (isListening) {
                    stopListening();
                    baseWritingRef.current = userText.trim();
                  } else {
                    stopSpeaking();
                    baseWritingRef.current = userText.trim();
                    startListening();
                  }
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                }`}
                title={isListening ? 'Stop dictation' : 'Dictate with your voice'}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Listening live...' : 'Voice Dictate 🎙️'}</span>
              </button>
            </div>

            {/* Textarea */}
            <form onSubmit={handleEvaluate} className="space-y-4">
              <textarea
                rows={10}
                value={userText}
                onChange={(e) => {
                  setUserText(e.target.value);
                  baseWritingRef.current = e.target.value.trim();
                }}
                placeholder="Write your response naturally here. Aim for up to 300 words..."
                className="w-full p-4 sm:p-5 bg-[#18181B] border border-white/10 rounded-2xl text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none focus:border-[#A3E635] leading-relaxed resize-none shadow-inner"
                required
              />

              {/* Minimal Stats & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                {/* Word Counter & Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#A3E635] transition-all duration-300"
                      style={{ width: `${wordPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">
                    <strong className="text-white">{wordCount}</strong> / {targetWords} words
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {userText && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserText('');
                        setFeedback(null);
                      }}
                      className="px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      Clear
                    </button>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={evaluating || !userText.trim()}
                    icon={Sparkles}
                    className="font-bold text-xs"
                  >
                    {evaluating ? 'Reviewing...' : 'Review & Polish ✨'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* 3. Feedback & Polish Card */}
          {feedback && (
            <Card className="p-6 sm:p-8 bg-[#0D0D10] border border-white/10 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-amber-400/20 text-amber-400">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Writing Polish
                  </h3>
                </div>

                {feedback.naturalnessScore && (
                  <span className="text-xs font-mono text-[#A3E635] font-bold bg-[#A3E635]/10 px-2.5 py-1 rounded-xl border border-[#A3E635]/20">
                    Naturalness: {feedback.naturalnessScore}%
                  </span>
                )}
              </div>

              {/* Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/3 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Version:
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                    “{feedback.yourVersion || userText}”
                  </p>
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      More Natural Flow ✨
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speak(feedback.better)}
                        className="p-1 rounded-lg text-emerald-300 hover:text-white transition cursor-pointer"
                        title="Listen to polished text in Indian male voice"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopyPolish(feedback.better)}
                        className="p-1 rounded-lg text-emerald-300 hover:text-white transition cursor-pointer"
                        title="Copy polished text"
                      >
                        {copiedPolish ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-emerald-100 leading-relaxed">
                    “{feedback.better}”
                  </p>
                </div>
              </div>

              {/* Why This Flows Better */}
              <div className="p-4 bg-[#18181B] rounded-2xl border border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-[#A78BFA] uppercase tracking-wider block">
                  💡 Why this flows better:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {feedback.why}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-white/5">
                <button
                  onClick={handleBackToTopics}
                  className="text-xs text-zinc-400 hover:text-white transition cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Choose Another Topic</span>
                </button>

                <div>
                  {submitted ? (
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Saved Successfully ✓
                    </span>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSaveSubmission}
                      icon={CheckCircle2}
                      className="font-bold text-xs"
                    >
                      Save My Writing
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
