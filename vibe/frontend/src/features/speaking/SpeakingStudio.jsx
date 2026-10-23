import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Check,
  Sliders,
  Radio,
  Target,
  XCircle,
} from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { analyzeSpeakingSpeech, verifySpeakingPractice } from './speakingTopicsData';
import confetti from 'canvas-confetti';

export const SpeakingStudio = ({
  topic,
  currentIndex = 0,
  totalCount = 4,
  onBack,
  onNext,
  hasNext,
  isCompleted = false,
  onCompleteTopic,
}) => {
  const [spokenText, setSpokenText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isRetryingCorrect, setIsRetryingCorrect] = useState(false);
  const [hasPracticedCorrection, setHasPracticedCorrection] = useState(false);
  const [practiceProgress, setPracticeProgress] = useState(null);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  // Store pre-existing text before speech begins so speech seamlessly appends
  const baseTextRef = useRef('');

  // Modern Speech Hook with continuous smooth recognition & feedback chimes
  const {
    isListening,
    transcript,
    interimTranscript,
    micError,
    setMicError,
    setTranscript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSpeaking,
    activeVoice,
    voicePreference,
    changeVoicePreference,
    playSuccessSound,
    playNoticeSound,
  } = useSpeech('natural');

  // Reset when topic changes
  useEffect(() => {
    setSpokenText('');
    baseTextRef.current = '';
    setAnalysis(null);
    setIsRetryingCorrect(false);
    setHasPracticedCorrection(false);
    setPracticeProgress(null);
    stopSpeaking();
    stopListening();
  }, [topic?.id, stopSpeaking, stopListening]);

  // Sync live mic transcript into spokenText in real-time
  useEffect(() => {
    if (!transcript) return;

    if (isRetryingCorrect) {
      const result = verifySpeakingPractice(transcript, analysis?.correctedText);
      setPracticeProgress(result);

      if (result.passed) {
        setHasPracticedCorrection(true);
        playSuccessSound();
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
        stopListening();
        speak('Well done! You spoke the natural version accurately.');
      }
    } else {
      const base = baseTextRef.current;
      const combined = base ? `${base} ${transcript}` : transcript;
      setSpokenText(combined);
    }
  }, [transcript, isRetryingCorrect, analysis?.correctedText, playSuccessSound, stopListening, speak]);

  if (!topic) return null;

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
      baseTextRef.current = spokenText.trim();
    } else {
      stopSpeaking();
      setIsRetryingCorrect(false);
      baseTextRef.current = spokenText.trim();
      startListening();
    }
  };

  const handleAnalyze = () => {
    if (!spokenText.trim()) return;
    stopListening();
    stopSpeaking();

    const result = analyzeSpeakingSpeech(spokenText, topic);
    setAnalysis(result);

    if (onCompleteTopic) {
      onCompleteTopic(topic.id);
    }

    if (result.isCorrect) {
      playSuccessSound();
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
      speak('Excellent speaking! Your answer matches the topic and is grammatically accurate.');
    } else if (result.isOffTopic) {
      playNoticeSound();
      speak('Good speaking effort, but check the situation prompt to stay on topic.');
    } else {
      playNoticeSound();
      speak('Good attempt! Check where the mistake is and how to improve it.');
    }
  };

  const handleRetrySpeakingCorrected = () => {
    stopSpeaking();
    setIsRetryingCorrect(true);
    setHasPracticedCorrection(false);
    setPracticeProgress(null);
    startListening();
  };

  const wordCount = spokenText.trim() ? spokenText.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/5">
        <button
          onClick={() => {
            stopSpeaking();
            stopListening();
            onBack();
          }}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#A1A1AA] hover:text-white transition cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to 4 Topics</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-mono">
            Topic {currentIndex + 1} of {totalCount}
          </span>
          {hasNext && (
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onNext();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20 border border-[#22D3EE]/30 text-xs font-bold text-[#22D3EE] transition cursor-pointer flex items-center gap-1"
            >
              <span>Next Topic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. TOPIC & SITUATION EXPLANATION CARD */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#18181B] to-[#121214] border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-white/5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">{topic.emoji}</span>
              <Badge variant="cyan" size="xs">
                {topic.category}
              </Badge>
              {isCompleted && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {topic.title}
            </h1>
          </div>

          {/* Voice Controls & Hear Sample */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Voice Profile Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowVoiceMenu(!showVoiceMenu)}
                className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                title="Change Voice Profile"
              >
                <Sliders className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="capitalize">{voicePreference === 'natural' ? 'Studio Voice' : voicePreference}</span>
              </button>

              {showVoiceMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#18181B] border border-white/10 rounded-2xl p-2 shadow-2xl z-20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 px-2 py-1 block">
                    Audio Voice Profile
                  </span>
                  {[
                    { id: 'natural', label: '✨ Studio Natural' },
                    { id: 'indian', label: '🇮🇳 Indian English' },
                    { id: 'uk', label: '🇬🇧 British English' },
                    { id: 'us', label: '🇺🇸 American English' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        changeVoicePreference(v.id);
                        setShowVoiceMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-between ${
                        voicePreference === v.id
                          ? 'bg-[#22D3EE]/20 text-[#22D3EE] font-bold'
                          : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{v.label}</span>
                      {voicePreference === v.id && <Check className="w-3 h-3 text-[#22D3EE]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hear Sample Button */}
            <button
              onClick={() => speak(topic.sampleSpeech || topic.explanation)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-200 hover:text-white transition cursor-pointer flex items-center gap-2"
              title="Hear natural sample pronunciation"
            >
              <Volume2 className="w-4 h-4 text-[#22D3EE]" />
              <span>Hear Sample 🔊</span>
            </button>
          </div>
        </div>

        {/* Situation prompt & Goals */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider block">
            What to speak about:
          </span>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-medium">
            {topic.explanation}
          </p>

          {/* Scenario Requirements Preview */}
          {topic.requirements && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                Topic Checklist:
              </span>
              {topic.requirements.map((req) => (
                <span
                  key={req.id}
                  className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-medium flex items-center gap-1.5"
                >
                  <span>{req.emoji}</span>
                  <span>{req.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* MIC ERROR NOTIFICATION IF BROWSER PERMISSION BLOCKED */}
      {micError && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-start justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-300 block">Microphone Access Notice</span>
              <p className="text-xs text-rose-200/90 leading-relaxed">{micError}</p>
            </div>
          </div>
          <button
            onClick={() => setMicError(null)}
            className="text-xs text-rose-300/80 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. SPEAK ONTO THIS SECTION CARD */}
      <Card className="p-6 sm:p-8 bg-[#111113] border-white/10 space-y-5 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-[#22D3EE]" />
            <span>Speak on this Topic:</span>
          </span>

          <span className="text-zinc-500 font-mono">
            {wordCount} words spoken
          </span>
        </div>

        {/* Central Speak Button & Live Audio Indicator */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <button
            onClick={handleToggleListening}
            className={`
              w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer relative
              ${isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/40 ring-4 ring-rose-500/30 scale-105'
                : 'bg-gradient-to-tr from-[#06B6D4] to-[#22D3EE] text-black hover:scale-105 shadow-[#22D3EE]/25'}
            `}
            title={isListening ? 'Click to stop speaking' : 'Click to start speaking (smooth live mic)'}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8 text-black" />
            )}
          </button>

          {/* Real-time Smooth Voice Indicator */}
          {isListening ? (
            <div className="flex flex-col items-center space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1 py-1">
                <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-5 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-4 bg-rose-400 rounded-full animate-bounce" />
                <span className="w-1 h-6 bg-[#22D3EE] rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1 h-3 bg-[#22D3EE] rounded-full animate-bounce [animation-delay:-0.35s]" />
              </div>
              <span className="text-xs font-bold text-rose-300 tracking-wide flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>Listening live — speak your words into the box below</span>
              </span>
            </div>
          ) : (
            <span className="text-xs font-bold tracking-wide text-zinc-300">
              Tap to Speak 🎙️
            </span>
          )}

          {/* Live Catching Voice Bubble */}
          {isListening && interimTranscript && (
            <div className="px-3 py-1 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-xs text-[#22D3EE] font-medium animate-pulse flex items-center gap-1.5 max-w-md truncate">
              <span>🗣️ Catching:</span>
              <span className="truncate italic">"{interimTranscript}"</span>
            </div>
          )}
        </div>

        {/* Live Spoken Transcript Box with Smooth Streaming (Voice Only) */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              rows={3}
              readOnly
              value={spokenText}
              onClick={() => {
                if (!isListening && !spokenText) {
                  handleToggleListening();
                }
              }}
              onKeyDown={(e) => {
                // Block all keyboard input
                e.preventDefault();
              }}
              placeholder="Tap the mic above and speak your answer — voice will appear here automatically (keyboard typing disabled)..."
              className={`
                w-full p-4 bg-[#18181B] border rounded-2xl text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none leading-relaxed resize-none shadow-inner transition-colors duration-200 cursor-default select-text
                ${isListening ? 'border-[#22D3EE]/50 ring-1 ring-[#22D3EE]/30' : 'border-white/10 hover:border-white/20'}
              `}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>Voice Only: Tap the mic above to speak. Keyboard typing is disabled.</span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {spokenText ? (
                <button
                  onClick={() => {
                    setSpokenText('');
                    baseTextRef.current = '';
                    setAnalysis(null);
                    setTranscript('');
                  }}
                  className="text-xs text-zinc-500 hover:text-white transition cursor-pointer"
                >
                  Clear speech
                </button>
              ) : null}

              <Button
                variant="primary"
                size="md"
                disabled={!spokenText.trim()}
                onClick={handleAnalyze}
                icon={Sparkles}
                className="font-bold text-xs"
              >
                Check Speaking & Improve ✨
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. COMPREHENSIVE DIAGNOSTIC & EVALUATION CARD */}
      {analysis && (
        <Card className="p-6 sm:p-8 bg-[#0D0D10] border border-white/10 space-y-6 animate-in fade-in duration-300 shadow-2xl">
          {/* Header with Overall Composite Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2.5">
              <span
                className={`p-2 rounded-xl ${
                  analysis.isCorrect
                    ? 'bg-emerald-400/20 text-emerald-400'
                    : analysis.isOffTopic
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-amber-400/20 text-amber-400'
                }`}
              >
                {analysis.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : analysis.isOffTopic ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </span>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide">
                  Speaking Diagnostic & Evaluation
                </h2>
                <p className="text-xs text-zinc-400">
                  Detailed analysis of Topic Match and English Accuracy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#22D3EE] bg-[#22D3EE]/10 px-3 py-1 rounded-xl border border-[#22D3EE]/30">
                Overall: {analysis.scores?.overallScore || analysis.naturalnessScore}%
              </span>
              <Badge
                variant={analysis.isCorrect ? 'lime' : analysis.isOffTopic ? 'rose' : 'amber'}
                size="xs"
              >
                {analysis.isCorrect
                  ? 'Spot On & Fluent ✓'
                  : analysis.isOffTopic
                  ? 'Off-Topic ❌'
                  : 'Needs Correction ⚠️'}
              </Badge>
            </div>
          </div>

          {/* Section A: What you said */}
          <div className="p-4 bg-white/3 rounded-2xl border border-white/5 space-y-1.5">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              You Spoke:
            </span>
            <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed">
              “{analysis.originalText}”
            </p>
          </div>

          {/* Section B1: CHECK 1 - TOPIC & SITUATION MATCH */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              analysis.topicMatch?.status === 'matched'
                ? 'bg-emerald-500/10 border-emerald-500/25'
                : analysis.topicMatch?.status === 'partial'
                ? 'bg-amber-500/10 border-amber-500/25'
                : 'bg-rose-500/10 border-rose-500/25'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target
                  className={`w-4 h-4 ${
                    analysis.topicMatch?.status === 'matched'
                      ? 'text-emerald-400'
                      : analysis.topicMatch?.status === 'partial'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Topic & Situation Match Check
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
                    analysis.topicMatch?.status === 'matched'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : analysis.topicMatch?.status === 'partial'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {analysis.topicMatch?.title}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {analysis.topicMatch?.reason}
            </p>

            {/* Topic Requirements Checklist */}
            {analysis.topicMatch?.requirementsMet && analysis.topicMatch.requirementsMet.length > 0 && (
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Scenario Criteria Breakdown:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysis.topicMatch.requirementsMet.map((req) => (
                    <div
                      key={req.id}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-2 ${
                        req.met
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-500/10 border-rose-500/25 text-rose-300/90'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span>{req.emoji}</span>
                        <span className="truncate">{req.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          req.met ? 'bg-emerald-500/30 text-emerald-300' : 'bg-rose-500/30 text-rose-300'
                        }`}
                      >
                        {req.met ? 'Done ✓' : 'Missing ✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section B2: CHECK 2 - ENGLISH CORRECTNESS & QUALITY */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              analysis.grammar?.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/25'
                : 'bg-amber-500/10 border-amber-500/25'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-4 h-4 ${
                    analysis.grammar?.isCorrect ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  English Correctness & Naturalness Check
                </span>
              </div>

              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
                  analysis.grammar?.isCorrect
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {analysis.grammar?.title}
              </span>
            </div>

            {/* If grammar mistakes found */}
            {!analysis.grammar?.isCorrect && analysis.grammar?.mistakePart ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Where is the mistake */}
                <div className="p-3.5 bg-rose-500/15 rounded-xl border border-rose-500/25 space-y-1">
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Where is the mistake:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-rose-200 font-semibold leading-relaxed">
                    {analysis.grammar.mistakePart}
                  </p>
                </div>

                {/* How to improve */}
                <div className="p-3.5 bg-amber-500/15 rounded-xl border border-amber-500/25 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>How to improve that part:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
                    {analysis.grammar.howToImprove}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/15 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <p className="text-xs text-emerald-200 font-medium">
                  {analysis.grammar?.howToImprove || 'No grammar or phrasing mistakes detected! Your spoken English was clean, polite, and natural.'}
                </p>
              </div>
            )}
          </div>

          {/* Section C: CORRECT & NATURAL VERSION */}
          <div className="p-5 bg-gradient-to-br from-emerald-500/15 to-emerald-950/20 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Correct & Natural Target Version:</span>
              </span>

              {/* Audio Listen in Natural Clear Voice */}
              <button
                onClick={() => speak(analysis.correctedText)}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                title="Hear corrected version in crystal-clear audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Target Audio 🔊</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-bold text-emerald-100 leading-relaxed">
              “{analysis.correctedText}”
            </p>

            {/* Fair & Intelligent Practice Retry Verification */}
            <div className="pt-2 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs text-emerald-300/80 block">
                  Practice saying the target sentence out loud to master it:
                </span>
                {practiceProgress && !hasPracticedCorrection && (
                  <span className="text-[11px] text-amber-300 font-mono">
                    Matched {practiceProgress.matchedWords}/{practiceProgress.totalWords} words ({practiceProgress.matchPercent}%) — keep speaking smoothly!
                  </span>
                )}
              </div>

              {hasPracticedCorrection ? (
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Spoken Correctly! ✓
                </span>
              ) : (
                <button
                  onClick={handleRetrySpeakingCorrected}
                  className={`
                    px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer
                    ${isListening && isRetryingCorrect
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md'}
                  `}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListening && isRetryingCorrect ? 'Listening...' : 'Speak It Now 🎙️'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onBack();
              }}
              className="text-xs text-zinc-400 hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Choose Another Topic</span>
            </button>

            {hasNext && (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  stopSpeaking();
                  stopListening();
                  onNext();
                }}
                icon={ArrowRight}
                className="font-bold text-xs"
              >
                Next Topic
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
