import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { WordVaultModal } from '../features/vocabulary/WordVaultModal';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSpeech } from '../hooks/useSpeech';
import { playSuccessSound } from '../services/soundEffects';
import {
  Sparkles,
  FileText,
  Volume2,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  Copy,
  CheckCheck,
  Flame,
  Sliders,
  Search,
  Grid,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VocabularyPage = () => {
  const { user } = useAuth();
  const { speak } = useSpeech();

  // State
  const [words, setWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [batchNumber, setBatchNumber] = useState(1);
  const [totalBatches, setTotalBatches] = useState(100);
  const [totalCompletedWords, setTotalCompletedWords] = useState(0);
  const [totalWords, setTotalWords] = useState(500);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isJumpModalOpen, setIsJumpModalOpen] = useState(false);
  const [savedWordsVault, setSavedWordsVault] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jumpSearch, setJumpSearch] = useState('');

  // Fetch batch of 5 words
  const fetchBatch = useCallback(async (bNum) => {
    setLoading(true);
    try {
      const data = await api.getBatchFiveWords(bNum);
      if (data && data.words) {
        setWords(data.words);
        setBatchNumber(data.batchNumber || bNum || 1);
        setTotalBatches(data.totalBatches || 100);
        setTotalCompletedWords(data.totalCompletedWords || 0);
        setTotalWords(data.totalWords || 500);
        setSelectedIndex(0);
      }
    } catch (err) {
      console.error('Failed to fetch vocabulary batch:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user vault
  const fetchVault = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api.getCompletedVault();
      if (res && res.savedWords) {
        setSavedWordsVault(res.savedWords);
      }
    } catch (e) {
      // ignore
    }
  }, [user]);

  // Initial load
  useEffect(() => {
    fetchBatch();
    fetchVault();
  }, [fetchBatch, fetchVault, user]);

  // Current selected word
  const activeWord = words[selectedIndex] || null;

  // Audio pronunciation
  const handleSpeak = (text, e) => {
    if (e) e.stopPropagation();
    if (!text) return;
    setIsSpeaking(true);
    speak(text);
    setTimeout(() => setIsSpeaking(false), 1200);
  };

  // Copy word to clipboard
  const handleCopyWord = (text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Toggle or mark word completed
  const handleToggleCompleted = async (item) => {
    if (!item) return;

    const wordId = item._id || item.sequenceNumber || item.word;
    const isCurrentlyCompleted = !!item.isCompleted;

    // Optimistic UI update
    setWords((prev) =>
      prev.map((w, idx) =>
        idx === selectedIndex ? { ...w, isCompleted: !isCurrentlyCompleted } : w
      )
    );

    if (!isCurrentlyCompleted) {
      playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#10B981', '#8B5CF6', '#22D3EE', '#F59E0B'],
      });
    }

    try {
      const res = await api.toggleCompleteWord(wordId, isCurrentlyCompleted ? 'toggle' : 'complete');
      if (res) {
        // Sync total count
        if (typeof res.totalCompletedWords === 'number') {
          setTotalCompletedWords(res.totalCompletedWords);
        }
        // Refresh vault in background
        fetchVault();

        // Check if all 5 words in this batch are completed now
        const updatedBatch = words.map((w, idx) =>
          idx === selectedIndex ? { ...w, isCompleted: res.isCompleted } : w
        );
        const allTicked = updatedBatch.every((w) => w.isCompleted);
        if (allTicked) {
          confetti({
            particleCount: 90,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#22D3EE'],
          });
        }
      }
    } catch (err) {
      console.error('Failed to toggle completion on server:', err);
      // Revert optimistic update on failure
      setWords((prev) =>
        prev.map((w, idx) =>
          idx === selectedIndex ? { ...w, isCompleted: isCurrentlyCompleted } : w
        )
      );
    }
  };

  // Batch completion status
  const batchCompletedCount = words.filter((w) => w.isCompleted).length;
  const isBatchFullyComplete = words.length > 0 && batchCompletedCount === words.length;

  // Next / Prev batch navigation
  const handleNextBatch = () => {
    if (batchNumber < totalBatches) {
      fetchBatch(batchNumber + 1);
    }
  };

  const handlePrevBatch = () => {
    if (batchNumber > 1) {
      fetchBatch(batchNumber - 1);
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : words.length - 1));
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (activeWord) handleToggleCompleted(activeWord);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [words, activeWord, selectedIndex]);

  // Overall mastery percentage
  const totalPercent = Math.min(
    100,
    Math.round((totalCompletedWords / (totalWords || 500)) * 100)
  );


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* =========================================================================
          UNIFIED ATTRACTIVE HEADER: Only relevant info, sleek command bar
         ========================================================================= */}
      <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#121218]/95 via-[#161622]/90 to-[#121218]/95 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Subtle Ambient Backlights */}
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Brand Icon + Title + Real-time Batch Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-purple-500/25 shrink-0">
              <div className="w-full h-full bg-[#111116] rounded-[14px] flex items-center justify-center text-base">
                ⚡
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Daily 5 Words
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  {batchCompletedCount}/5 Ticked
                </span>
              </div>
            </div>
          </div>

          {/* Center: Sleek Batch Navigator Capsule */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center p-1 rounded-2xl bg-[#0d0d12]/90 border border-white/10 shadow-inner">
              <button
                onClick={handlePrevBatch}
                disabled={batchNumber <= 1}
                className="px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1 text-xs font-semibold cursor-pointer"
                title="Previous 5 Words"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">Prev</span>
              </button>

              <button
                onClick={() => setIsJumpModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-200 text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer mx-1 shadow-sm"
                title="Click to jump to any batch"
              >
                <Grid className="w-3.5 h-3.5 text-purple-400" />
                <span>Batch {batchNumber} of {totalBatches}</span>
              </button>

              <button
                onClick={handleNextBatch}
                disabled={batchNumber >= totalBatches}
                className="px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1 text-xs font-semibold cursor-pointer"
                title="Next 5 Words"
              >
                <span className="text-xs">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Mastered Progress Badge + My Word File Action */}
          <div className="flex items-center gap-2.5 justify-between sm:justify-end">
            {/* Mastered Progress Capsule */}
            <div className="px-3.5 py-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center gap-2.5 shadow-sm">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Mastered</span>
                <span className="text-xs font-mono font-black text-emerald-400 leading-none mt-0.5">
                  {totalCompletedWords} / {totalWords}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-400 font-mono shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                {totalPercent}%
              </div>
            </div>

            {/* My Word File Action */}
            <button
              onClick={() => setIsVaultOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-purple-950/60 to-[#1e1b2e] hover:from-purple-900/70 hover:to-[#28243c] border border-purple-500/40 hover:border-purple-400 text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-md shadow-purple-950/30 hover:scale-[1.02]"
              title="Open your permanent saved words file"
            >
              <FileText className="w-3.5 h-3.5 text-purple-300" />
              <span className="hidden sm:inline">Word File</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-mono font-bold">
                {savedWordsVault.length || totalCompletedWords}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE 5 WORD CARDS / TABS (Vastly enhanced UI with glowing states)
         ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-zinc-900/60 rounded-2xl animate-pulse border border-white/5 flex flex-col justify-between p-3"
            >
              <div className="h-3 w-10 bg-white/10 rounded" />
              <div className="h-5 w-20 bg-white/10 rounded self-center" />
              <div className="h-2 w-12 bg-white/5 rounded self-center" />
            </div>
          ))
        ) : (
          words.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            const isTicked = !!item.isCompleted;

            return (
              <div
                key={item._id || item.word || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`
                  group relative p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer overflow-hidden min-h-[92px] sm:min-h-[105px]
                  ${
                    isSelected
                      ? 'bg-gradient-to-b from-purple-950/60 via-purple-900/30 to-[#151221] border-purple-500 shadow-[0_0_24px_rgba(139,92,246,0.35)] ring-1 ring-purple-400/50 -translate-y-0.5'
                      : isTicked
                      ? 'bg-gradient-to-b from-emerald-950/40 to-zinc-900/90 border-emerald-500/50 text-emerald-100 hover:border-emerald-400 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'bg-zinc-900/80 hover:bg-zinc-800/80 border-white/10 hover:border-white/20 text-zinc-400 hover:text-white hover:-translate-y-0.5 shadow-md shadow-black/40'
                  }
                `}
              >
                {/* Top Row: Monospace Sequence Number + Check Status + Audio */}
                <div className="flex items-center justify-between gap-1 w-full">
                  <span
                    className={`
                      text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md
                      ${
                        isSelected
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : isTicked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 text-zinc-500'
                      }
                    `}
                  >
                    #{String(item.sequenceNumber || (batchNumber - 1) * 5 + idx + 1).padStart(3, '0')}
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Quick Pronounce Speaker Button */}
                    <button
                      onClick={(e) => handleSpeak(item.word, e)}
                      className="p-1 text-zinc-500 hover:text-purple-300 rounded-md hover:bg-white/10 transition opacity-0 group-hover:opacity-100"
                      title="Quick Listen"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>

                    {/* Completion Tick Indicator */}
                    {isTicked ? (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-black font-extrabold text-[11px] shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-in zoom-in-50 duration-200">
                        ✓
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-zinc-500 transition-colors" />
                    )}
                  </div>
                </div>

                {/* Center: The Word Typography */}
                <div className="my-1.5">
                  <h3
                    className={`
                      font-black text-sm sm:text-base tracking-tight truncate capitalize
                      ${
                        isSelected
                          ? 'text-white'
                          : isTicked
                          ? 'text-emerald-200'
                          : 'text-zinc-200 group-hover:text-white'
                      }
                    `}
                    title={item.word}
                  >
                    {item.word}
                  </h3>
                </div>

                {/* Bottom Row: Micro Tag & Selection Underline */}
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                  <span className="capitalize truncate">
                    {item.category || 'casual'}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.9)]" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* =========================================================================
          CELEBRATION BANNER (When all 5 words in the current batch are ticked)
         ========================================================================= */}
      {isBatchFullyComplete && (
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-emerald-950/70 via-teal-950/50 to-purple-950/60 rounded-3xl border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl shadow-emerald-950/40 animate-in fade-in duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />

          <div className="flex items-center gap-4 text-center sm:text-left relative z-10">
            <span className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              🎉
            </span>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Batch #{batchNumber} Completed! (5 of 5 Mastered)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                  +50 XP
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                All 5 words are permanently locked to your profile. Ready for the next 5 words?
              </p>
            </div>
          </div>

          <button
            onClick={handleNextBatch}
            disabled={batchNumber >= totalBatches}
            className="relative z-10 w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black font-black text-xs transition cursor-pointer shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load Next 5 Words (Batch #{batchNumber + 1})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          THE FOCUSED ACTIVE WORD STUDIO CARD (Bento Grid + Rich Meaning)
         ========================================================================= */}
      {activeWord ? (
        <div className="bg-[#121217]/95 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Ambient Lighting Orbs */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
              activeWord.isCompleted ? 'bg-emerald-500/10' : 'bg-purple-600/15'
            }`}
          />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full blur-3xl bg-cyan-500/5 pointer-events-none" />

          {/* Top Word Metadata Row */}
          <div className="flex items-center justify-between flex-wrap gap-2.5 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono font-bold">
                Word #{activeWord.sequenceNumber || (batchNumber - 1) * 5 + selectedIndex + 1} of {totalWords}
              </span>

              <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                {activeWord.category || 'Everyday'}
              </span>

              {activeWord.tone && (
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-medium">
                  😎 {activeWord.tone}
                </span>
              )}

              {activeWord.energy && (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Energy: {activeWord.energy}/10
                </span>
              )}
            </div>

            {/* Quick Actions: Audio Speaker + Copy Word */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyWord(activeWord.word)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition cursor-pointer"
                title="Copy word to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSpeak(activeWord.word)}
                disabled={isSpeaking}
                className={`
                  flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer
                  ${
                    isSpeaking
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                  }
                `}
                title="Listen to native voice pronunciation"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-purple-400 animate-pulse' : 'text-purple-300'}`} />
                <span>{isSpeaking ? 'Playing...' : 'Pronounce'}</span>
                {/* Audio Wave Bars */}
                {isSpeaking && (
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <span className="w-0.5 h-3 bg-purple-300 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-0.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Large Hero Word & Phonetics */}
          <div className="space-y-1.5 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300 tracking-tight capitalize">
              {activeWord.word}
            </h2>
            {activeWord.phonetic && (
              <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wide block">
                [ {activeWord.phonetic} ]
              </span>
            )}
          </div>

          {/* =====================================================================
              BENTO GRID: Meaning + Hindi + Real Context + Guardrails
             ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 text-sm">
            {/* 1. English Meaning */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/20 via-zinc-900/60 to-zinc-900/40 border border-purple-500/20 flex items-start gap-3.5 shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block font-mono">
                  English Definition
                </span>
                <p className="text-zinc-100 font-medium leading-relaxed">
                  {activeWord.meaning}
                </p>
              </div>
            </div>

            {/* 2. Hindi Translation & Example */}
            {activeWord.hindiMeaning && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/20 via-zinc-900/60 to-zinc-900/40 border border-amber-500/25 flex items-start gap-3.5 shadow-sm">
                <span className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  🇮🇳
                </span>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block font-mono">
                    हिंदी अनुवाद & संदर्भ
                  </span>
                  <p className="text-amber-100 font-semibold leading-relaxed">
                    {activeWord.hindiMeaning}
                  </p>
                  {activeWord.hindiExample && (
                    <p className="text-xs text-amber-200/80 italic mt-1 pt-1 border-t border-amber-500/15">
                      "{activeWord.hindiExample}"
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 3. In The Wild / Real-Life Context */}
            {(activeWord.examples?.[0] || activeWord.caughtInTheWild?.quote) && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/20 via-zinc-900/60 to-zinc-900/40 border border-cyan-500/25 flex items-start gap-3.5 shadow-sm md:col-span-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  💬
                </span>
                <div className="space-y-1 flex-1">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block font-mono">
                    Real-Life Usage in the Wild
                  </span>
                  <p className="text-cyan-100 italic font-medium leading-relaxed text-sm sm:text-base">
                    "{activeWord.examples?.[0] || activeWord.caughtInTheWild?.quote}"
                  </p>
                  {activeWord.caughtInTheWild?.context && (
                    <span className="text-[11px] text-zinc-400 block mt-1">
                      Context: {activeWord.caughtInTheWild.context}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 4. Guardrail: Avoid In (If available) */}
            {activeWord.dontUseIn && (
              <div className="p-3.5 rounded-2xl bg-rose-950/15 border border-rose-500/20 flex items-center gap-3 md:col-span-2 text-xs text-zinc-300">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-rose-300 uppercase tracking-wider text-[10px] block">
                    Guardrail — When NOT to Use:
                  </span>
                  <p className="text-rose-100/90 font-medium mt-0.5">
                    Avoid in {activeWord.dontUseIn}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              BOTTOM ACTION BAR: Previous Word + The Master Tick Button + Next Word
             ===================================================================== */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 border-t border-white/10">
            {/* Prev Word Button */}
            <button
              onClick={() => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : words.length - 1))}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Word</span>
            </button>

            {/* The Master Toggle Button: Ticked / Remembered */}
            <div className="w-full sm:w-auto flex flex-col items-center gap-1.5">
              <button
                onClick={() => handleToggleCompleted(activeWord)}
                className={`
                  w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-2xl hover:scale-[1.02]
                  ${
                    activeWord.isCompleted
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-emerald-500/30 ring-2 ring-emerald-400/50'
                      : 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/50 ring-1 ring-purple-400/30'
                  }
                `}
              >
                <div
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center transition-all
                    ${activeWord.isCompleted ? 'bg-black text-emerald-400' : 'bg-white/20 text-white'}
                  `}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>
                  {activeWord.isCompleted
                    ? '✓ Remembered & Saved to Vault'
                    : '✓ Mark as Remembered (Tick)'}
                </span>
              </button>

              <span className="text-[10px] text-zinc-500 font-mono">
                {activeWord.isCompleted
                  ? 'Click again to untick • Saved to permanent profile'
                  : 'Press [Space] to tick • [← →] to switch words'}
              </span>
            </div>

            {/* Next Word Button */}
            <button
              onClick={() => setSelectedIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0))}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Next Word</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : null}

      {/* =========================================================================
          BOTTOM BATCH NAVIGATION FOOTER
         ========================================================================= */}
      <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-white/10">
        <button
          onClick={handlePrevBatch}
          disabled={batchNumber <= 1}
          className="flex items-center gap-1.5 font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Batch (#{batchNumber > 1 ? batchNumber - 1 : 1})</span>
        </button>

        <span className="font-mono text-zinc-500 text-[11px] hidden sm:inline">
          Batch #{batchNumber} • {totalCompletedWords} of {totalWords} Words Remembered
        </span>

        <button
          onClick={handleNextBatch}
          disabled={batchNumber >= totalBatches}
          className="flex items-center gap-1.5 font-semibold text-purple-400 hover:text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <span>Next Batch (#{batchNumber < totalBatches ? batchNumber + 1 : totalBatches})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          BATCH QUICK-JUMP MODAL (Jump to any of the 100 batches)
         ========================================================================= */}
      {isJumpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#111115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#15151c]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Grid className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Jump to Any Vocabulary Batch
                  </h3>
                  <p className="text-xs text-zinc-400">
                    100 Batches covering all 500 Sequenced English words
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsJumpModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Filter / Jump input */}
            <div className="p-4 border-b border-white/5 bg-[#131318]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="number"
                  min="1"
                  max={totalBatches}
                  placeholder={`Type batch number (1 - ${totalBatches})...`}
                  value={jumpSearch}
                  onChange={(e) => setJumpSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const num = parseInt(jumpSearch, 10);
                      if (num >= 1 && num <= totalBatches) {
                        fetchBatch(num);
                        setIsJumpModalOpen(false);
                        setJumpSearch('');
                      }
                    }
                  }}
                  className="w-full pl-9 pr-24 py-2 bg-[#181820] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => {
                    const num = parseInt(jumpSearch, 10);
                    if (num >= 1 && num <= totalBatches) {
                      fetchBatch(num);
                      setIsJumpModalOpen(false);
                      setJumpSearch('');
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition cursor-pointer"
                >
                  Go ➔
                </button>
              </div>
            </div>

            {/* Batches Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {Array.from({ length: totalBatches }).map((_, i) => {
                const b = i + 1;
                const isCurrent = b === batchNumber;
                const startW = (b - 1) * 5 + 1;
                const endW = b * 5;

                return (
                  <button
                    key={b}
                    onClick={() => {
                      fetchBatch(b);
                      setIsJumpModalOpen(false);
                      setJumpSearch('');
                    }}
                    className={`
                      p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer
                      ${
                        isCurrent
                          ? 'bg-purple-600 border-purple-400 text-white font-bold shadow-lg shadow-purple-900/50'
                          : 'bg-zinc-900/80 hover:bg-zinc-800 border-white/5 hover:border-white/20 text-zinc-300'
                      }
                    `}
                  >
                    <span className="text-xs font-mono font-bold">Batch {b}</span>
                    <span className="text-[9px] text-zinc-400 font-mono">
                      #{startW}-{endW}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          "MY WORD FILE" MODAL
         ========================================================================= */}
      <WordVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        savedWords={savedWordsVault}
        onRemoveWord={async (wordIdOrWord) => {
          setSavedWordsVault((prev) =>
            prev.filter((item) => (item._id || item.word) !== wordIdOrWord)
          );
          fetchBatch(batchNumber);
        }}
      />
    </div>
  );
};

export default VocabularyPage;
