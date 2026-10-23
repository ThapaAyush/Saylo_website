import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  FileText,
  PenTool,
  Clock,
  Star,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { playSuccessSound, playNoticeSound, playMicSound } from '../../services/soundEffects';
import { selectBestVoice } from '../../hooks/useSpeech';

export const MissionPlayerModal = ({
  level,
  challenges = [],
  onClose,
  onCompleteMission,
  hearts = 5,
  maxHearts = 5,
  onDeductHeart,
  timerFormatted = '05:00',
  totalStars = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [submittedStep, setSubmittedStep] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime] = useState(Date.now());
  const [showHeartLossAnim, setShowHeartLossAnim] = useState(false);

  // Web Speech recognition & synthesis states
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  const currentChallenge = challenges[currentIndex];
  const totalChallenges = challenges.length;

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const text = Array.from(event.results)
          .map((res) => res[0].transcript)
          .join('');
        setSpeechTranscript(text);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (e) => {
        console.warn('Speech error:', e.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Reset state on step change
  useEffect(() => {
    setSelectedOption('');
    setSubmittedStep(false);
    setIsCorrect(false);
    setSpeechTranscript('');
  }, [currentIndex]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // Speak text aloud using Web Speech Synthesis with natural clear voice
  const playAudio = (text) => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const best = selectBestVoice(voices, 'natural');
    if (best) {
      utterance.voice = best;
      utterance.lang = best.lang || 'en-US';
    } else {
      utterance.lang = 'en-US';
    }
    utterance.pitch = 1.0;
    utterance.rate = 0.98;
    window.speechSynthesis.speak(utterance);
  };

  if (!currentChallenge) {
    return null;
  }

  if (hearts <= 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
        <div className="w-full max-w-sm rounded-3xl bg-[#121215] border border-red-500/40 p-6 text-center shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-3xl shadow-lg shadow-red-500/20 animate-pulse">
            💔
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white">Out of Hearts!</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You selected a wrong answer and have 0 hearts remaining. A new heart will be added automatically when the timer finishes.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#18181B] border border-white/10 flex flex-col items-center gap-1 shadow-inner">
            <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" /> Next Heart In
            </span>
            <span className="text-3xl font-black font-mono text-red-400 tracking-wider">
              {timerFormatted}
            </span>
            <span className="text-[10px] text-zinc-500 font-semibold">+1 heart every 5 minutes (Max 5)</span>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition cursor-pointer"
          >
            Return to Adventure Map
          </button>
        </div>
      </div>
    );
  }

  const handleSelectOption = (opt) => {
    if (submittedStep) return;
    setSelectedOption(opt);
  };

  const handleVerifyStep = () => {
    if (!selectedOption && !speechTranscript) return;

    let match = false;
    const answerToTest = selectedOption || speechTranscript;

    if (currentChallenge.skill === 'speaking') {
      // Fair & accurate check: compare spoken words against challenge answer
      const clean = (s) => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
      const spokenWords = clean(speechTranscript).split(/\s+/).filter(Boolean);
      const targetWords = clean(currentChallenge.answer).split(/\s+/).filter(Boolean);

      if (targetWords.length === 0) {
        match = spokenWords.length >= 2;
      } else {
        const spokenSet = new Set(spokenWords);
        const matched = targetWords.filter((w) => spokenSet.has(w));
        const ratio = matched.length / targetWords.length;
        match = ratio >= 0.6 || clean(speechTranscript).includes(clean(currentChallenge.answer));
      }
    } else {
      match = answerToTest.trim().toLowerCase() === currentChallenge.answer.trim().toLowerCase();
    }

    setIsCorrect(match);
    setSubmittedStep(true);

    if (match) {
      playSuccessSound();
    } else {
      playNoticeSound();
      // Deduct 1 heart on incorrect answer
      if (onDeductHeart) {
        onDeductHeart();
      }
      setShowHeartLossAnim(true);
      setTimeout(() => setShowHeartLossAnim(false), 2200);
    }

    // Save answer
    setUserAnswers((prev) => [
      ...prev,
      {
        challengeId: currentChallenge._id,
        challengeNumber: currentChallenge.challengeNumber,
        skill: currentChallenge.skill,
        answer: answerToTest,
        isCorrect: match,
      },
    ]);
  };

  const handleNextStep = () => {
    if (currentIndex + 1 < totalChallenges) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all challenges in this mission!
      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      onCompleteMission(userAnswers, durationSeconds);
    }
  };

  // Skill Icons & Colors
  const getSkillMeta = (skill) => {
    switch (skill) {
      case 'vocabulary':
        return { label: 'VOCABULARY IN CONTEXT', icon: BookOpen, color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' };
      case 'reading':
        return { label: 'READING SUBTEXT', icon: FileText, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
      case 'writing':
        return { label: 'NATURAL REPLY', icon: PenTool, color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' };
      case 'speaking':
        return { label: 'LIVE VOICE ROLEPLAY', icon: Mic, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      default:
        return { label: 'MISSION STEP', icon: Sparkles, color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30' };
    }
  };

  const skillMeta = getSkillMeta(currentChallenge.skill);
  const SkillIcon = skillMeta.icon;
  const progressPercent = Math.round(((currentIndex + 1) / totalChallenges) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#121215] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Mission Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#18181B] flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-sm font-black text-white shadow-md">
                ⚡
              </span>
              <div>
                <div className="text-[10px] font-black tracking-widest text-[#A78BFA] uppercase">
                  LEVEL {level.levelNumber} MISSION
                </div>
                <h3 className="text-sm font-bold text-white leading-none">
                  {level.title}
                </h3>
              </div>
            </div>

            {/* Header Status Badges (Hearts, Stars, Close) */}
            <div className="flex items-center gap-2">
              {/* Hearts Indicator */}
              <div className="relative flex items-center gap-1.5 bg-[#121215] px-2.5 py-1 rounded-full border border-red-500/30">
                <span className="text-xs">{hearts <= 0 ? '💔' : '❤️'}</span>
                <span className="text-xs font-black font-mono text-red-400">
                  {hearts}/{maxHearts}
                </span>
                {showHeartLossAnim && (
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-red-300 bg-red-950 px-2 py-0.5 rounded-full border border-red-500/60 shadow-lg animate-bounce whitespace-nowrap z-50">
                    -1 ❤️
                  </span>
                )}
              </div>

              {/* Stars Indicator */}
              <div className="flex items-center gap-1 bg-[#121215] px-2.5 py-1 rounded-full border border-yellow-500/30">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-black font-mono text-yellow-400">{totalStars}</span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                title="Leave Mission"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>


          {/* Progress Bar & Step Label */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-zinc-400">
                Step {currentIndex + 1} of {totalChallenges}
              </span>
              <span className="text-[#22D3EE] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#22D3EE] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Challenge Interactive Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Skill Tag Banner */}
          <div className="flex items-center justify-between gap-2">
            <div className={`px-3 py-1 rounded-xl border text-xs font-black flex items-center gap-1.5 ${skillMeta.color}`}>
              <SkillIcon className="w-3.5 h-3.5" />
              <span>{skillMeta.label}</span>
            </div>
            {currentChallenge.targetWord && (
              <span className="text-xs font-bold text-zinc-400">
                Key Word: <span className="text-yellow-300 font-mono">"{currentChallenge.targetWord}"</span>
              </span>
            )}
          </div>

          {/* Story Setting Context Card */}
          {currentChallenge.contextText && (
            <div className="p-3.5 rounded-2xl bg-[#18181B] border border-white/5 space-y-1.5">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Scenario Context
              </div>
              <p className="text-xs text-[#D4D4D8] whitespace-pre-line leading-relaxed font-sans">
                {currentChallenge.contextText}
              </p>
            </div>
          )}

          {/* Main Prompt */}
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentChallenge.prompt}
            </h4>
          </div>

          {/* SPEAKING SPECIAL UI (Audio Pronunciation + Mic Button) */}
          {currentChallenge.skill === 'speaking' && (
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-amber-500/5 border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-300">
                  Say This Out Loud:
                </span>
                <button
                  onClick={() => playAudio(currentChallenge.speakingPrompt || currentChallenge.answer)}
                  className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Hear Native Pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen 🔊</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#09090B] border border-amber-500/20 text-center text-sm sm:text-base font-semibold text-white">
                "{currentChallenge.speakingPrompt || currentChallenge.answer}"
              </div>

              {/* Mic Activation Button */}
              <div className="flex flex-col items-center justify-center gap-2 pt-1">
                <button
                  onClick={toggleListening}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer
                    ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse shadow-red-500/40 ring-4 ring-red-500/30'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30 hover:scale-105'
                    }
                  `}
                >
                  {isListening ? <Mic className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
                <span className="text-[11px] text-zinc-400 font-medium">
                  {isListening ? 'Listening... Speak now!' : 'Tap mic to speak (or select option below)'}
                </span>

                {speechTranscript && (
                  <div className="px-3 py-1.5 rounded-xl bg-white/10 text-xs text-emerald-300 font-medium mt-1">
                    You said: "{speechTranscript}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Multiple Choice Options */}
          {currentChallenge.options && currentChallenge.options.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Select your response:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isAnswer = opt === currentChallenge.answer;

                  let optionStyle = 'bg-[#18181B] border-white/5 hover:border-white/20 text-zinc-200';
                  if (isSelected && !submittedStep) {
                    optionStyle = 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-md shadow-purple-500/20';
                  } else if (submittedStep) {
                    if (isAnswer) {
                      optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (isSelected && !isAnswer) {
                      optionStyle = 'bg-red-500/20 border-red-500/50 text-red-300';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={submittedStep}
                      onClick={() => handleSelectOption(opt)}
                      className={`
                        w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer
                        ${optionStyle}
                      `}
                    >
                      <span className="w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-400 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pedagogical Feedback Banner (Shows after verifying) */}
          {submittedStep && (
            <div
              className={`
                p-4 rounded-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200
                ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-zinc-800/80 border-zinc-700'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                      Spot On! Natural Flow
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-black text-yellow-300 uppercase tracking-wider">
                      Good try! Here's the native vibe:
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#E4E4E7] leading-relaxed">
                {currentChallenge.explanation ||
                  'Natural communication focuses on conversational tone, genuine empathy, and relaxed flow.'}
              </p>
            </div>
          )}

        </div>

        {/* Bottom CTA Action Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#18181B] flex items-center justify-between gap-3">
          <div className="text-[11px] text-zinc-400 font-medium">
            Objective: <span className="text-white">{currentChallenge.learningObjective || 'Real-World Fluency'}</span>
          </div>

          <div>
            {!submittedStep ? (
              <button
                disabled={!selectedOption && !speechTranscript}
                onClick={handleVerifyStep}
                className={`
                  px-6 py-2.5 rounded-xl font-black text-xs transition cursor-pointer shadow-md
                  ${
                    selectedOption || speechTranscript
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:opacity-95 shadow-purple-500/25'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }
                `}
              >
                CHECK VIBE
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-black text-xs shadow-md shadow-emerald-500/25 hover:opacity-95 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentIndex + 1 < totalChallenges ? 'NEXT STEP' : 'COMPLETE MISSION'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
