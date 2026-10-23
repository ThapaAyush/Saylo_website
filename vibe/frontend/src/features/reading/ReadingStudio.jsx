import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lightbulb,
  HelpCircle,
  PenTool,
  Tag,
  Mic,
  MicOff,
  Check,
  Sliders,
} from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { evaluateReadingSubmission } from './readingEvaluation';
import confetti from 'canvas-confetti';

export const ReadingStudio = ({
  item,
  onBack,
  onNext,
  hasNext,
  totalCount = 4,
  currentIndex = 0,
  isCompleted = false,
  onCompleteReading,
}) => {
  // Reading paragraph audio playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // User tasks: 1. Give Title, 2. Explain in Short
  const [userTitle, setUserTitle] = useState('');
  const [userExplanation, setUserExplanation] = useState('');
  const [isWorkChecked, setIsWorkChecked] = useState(false);
  const [workEvaluation, setWorkEvaluation] = useState(null);
  const [activeDictationField, setActiveDictationField] = useState(null); // 'title' | 'explanation' | null
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  // Question answer state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);

  // Modern Speech hook with crystal-clear playback & sound effects
  const {
    isListening,
    transcript,
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

  // Reset all states when item changes
  useEffect(() => {
    setSelectedOption(null);
    setIsQuestionSubmitted(false);
    setUserTitle('');
    setUserExplanation('');
    setIsWorkChecked(false);
    setWorkEvaluation(null);
    setActiveDictationField(null);
    stopSpeaking();
    stopListening();
    setIsPlayingAudio(false);
  }, [item?.id, item?._id, stopSpeaking, stopListening]);

  const baseDictationRef = useRef('');

  // Sync mic transcript smoothly to either title or explanation field
  useEffect(() => {
    if (transcript && isListening && activeDictationField) {
      const base = baseDictationRef.current;
      const combined = base ? `${base} ${transcript}` : transcript;
      if (activeDictationField === 'title') {
        setUserTitle(combined);
      } else if (activeDictationField === 'explanation') {
        setUserExplanation(combined);
      }
    }
  }, [transcript, isListening, activeDictationField]);

  if (!item) return null;

  const paragraphText = item.paragraph || item.content || item.summary || '';
  const question = item.question || {
    prompt: 'What is the main takeaway from this paragraph?',
    options: ['Option A', 'Option B', 'Option C'],
    correctIndex: 0,
    explanation: 'Understanding the main context helps you grasp the nuance.',
  };
  const suggestedTitle = item.title || 'Everyday Story';
  const modelShortSummary = item.shortExplanation || item.summary || 'A concise summary of the paragraph.';
  const keyVocab = item.keyVocabulary || [];

  const handlePlayParagraphAudio = () => {
    if (isPlayingAudio || isSpeaking) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speak(paragraphText, {
      rate: 0.98,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleToggleDictation = (field) => {
    if (isListening && activeDictationField === field) {
      stopListening();
      setActiveDictationField(null);
    } else {
      stopSpeaking();
      setActiveDictationField(field);
      baseDictationRef.current = (field === 'title' ? userTitle : userExplanation).trim();
      startListening();
    }
  };

  const handleCheckWork = () => {
    if (!userTitle.trim() && !userExplanation.trim()) return;
    stopListening();
    setActiveDictationField(null);

    const evaluation = evaluateReadingSubmission(userTitle, userExplanation, item);
    setWorkEvaluation(evaluation);
    setIsWorkChecked(true);

    if (onCompleteReading) {
      onCompleteReading(item.id);
    }

    if (evaluation.isHighQuality) {
      playSuccessSound();
      confetti({ particleCount: 40, spread: 65, origin: { y: 0.6 } });
      speak('Excellent reading comprehension! You captured the story accurately.');
    } else {
      playNoticeSound();
      speak('Good summary! Check the feedback below to compare with the model.');
    }
  };

  const handleSelectOption = (idx) => {
    if (isQuestionSubmitted && selectedOption === question.correctIndex) return;
    setSelectedOption(idx);
    setIsQuestionSubmitted(true);

    if (onCompleteReading) {
      onCompleteReading(item.id);
    }

    if (idx === question.correctIndex) {
      playSuccessSound();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      speak("That's right! Great job understanding the paragraph.");
    } else {
      playNoticeSound();
      speak('Not quite. Review the explanation to see why.');
    }
  };

  const handleResetQuestion = () => {
    setSelectedOption(null);
    setIsQuestionSubmitted(false);
  };

  const isCorrect = isQuestionSubmitted && selectedOption === question.correctIndex;
  const isWrong = isQuestionSubmitted && selectedOption !== question.correctIndex;
  const explanationWords = userExplanation.trim() ? userExplanation.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
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
          <span>Back to 4 Paragraphs</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-mono">
            Paragraph {currentIndex + 1} of {totalCount}
          </span>
          {hasNext && (
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onNext();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#F472B6]/10 hover:bg-[#F472B6]/20 border border-[#F472B6]/30 text-xs font-bold text-[#F472B6] transition cursor-pointer flex items-center gap-1"
            >
              <span>Next Paragraph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. READ THE PARAGRAPH CARD */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#18181B] to-[#121214] border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#F472B6] bg-[#F472B6]/10 px-2.5 py-0.5 rounded-lg border border-[#F472B6]/20">
                Paragraph 0{currentIndex + 1}
              </span>
              <Badge variant="pink" size="xs">
                {item.category}
              </Badge>
              {isCompleted && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </span>
              )}
              <span className="text-xs text-zinc-500 font-mono">
                {item.estimatedTime || '5 min read'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Read the Story & Complete the Challenges
            </h1>
          </div>

          {/* Voice Switcher & Hear Paragraph Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Voice Profile Selector */}
            <div className="relative">
              <button
                onClick={() => setShowVoiceMenu(!showVoiceMenu)}
                className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                title="Change Voice Profile"
              >
                <Sliders className="w-3.5 h-3.5 text-[#F472B6]" />
                <span className="capitalize">{voicePreference === 'natural' ? 'Studio' : voicePreference}</span>
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
                          ? 'bg-[#F472B6]/20 text-[#F472B6] font-bold'
                          : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{v.label}</span>
                      {voicePreference === v.id && <Check className="w-3 h-3 text-[#F472B6]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Play/Stop Audio Button */}
            <button
              onClick={handlePlayParagraphAudio}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer
                ${isPlayingAudio
                  ? 'bg-[#F472B6] text-black shadow-lg shadow-[#F472B6]/20 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10'}
              `}
              title="Listen to this passage in natural audio (seamless without cutoffs)"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-black" />
                  <span>Stop Audio ⏹️</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#F472B6]" />
                  <span>Hear Paragraph 🔊</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Paragraph Text */}
        <div className="space-y-3">
          <div className="p-6 sm:p-8 bg-[#111113] rounded-2xl border border-white/5 text-base sm:text-lg text-[#E4E4E7] leading-relaxed font-normal shadow-inner space-y-4">
            {paragraphText.split('\n\n').map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Key Expressions Highlight */}
        {keyVocab.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 font-semibold">Key phrases:</span>
            {keyVocab.map((v, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-zinc-300"
                title={v.meaning}
              >
                <strong className="text-[#F472B6]">{v.phrase}</strong> — {v.meaning}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* 2. USER'S TASK: GIVE TITLE & EXPLAIN IN SHORT */}
      <Card className="p-6 sm:p-8 bg-[#111113] border-white/10 space-y-6">
        <div className="border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#F472B6]/20 text-[#F472B6]">
              <PenTool className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Your Turn: Give a Title & Explain in Short
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Create your own title for this paragraph, then summarize what happened in 1–2 simple sentences.
          </p>
        </div>

        {/* TASK 1: GIVE A TITLE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-white flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>1. Give a Title for this Paragraph:</span>
            </label>

            {/* Mic Dictate for Title */}
            <button
              onClick={() => handleToggleDictation('title')}
              className={`
                px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer
                ${isListening && activeDictationField === 'title'
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300'}
              `}
              title="Dictate title with microphone"
            >
              <Mic className="w-3 h-3 text-[#F472B6]" />
              <span>{isListening && activeDictationField === 'title' ? 'Listening...' : 'Voice Dictate'}</span>
            </button>
          </div>

          <input
            type="text"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            placeholder="Type or dictate a title (e.g. A Ruined Dinner Plan)..."
            className="w-full p-3.5 bg-[#18181B] border border-white/10 rounded-xl text-sm font-semibold text-white placeholder-zinc-600 focus:outline-none focus:border-[#F472B6]"
          />
        </div>

        {/* TASK 2: EXPLAIN IN SHORT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-white flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>2. Explain this in Short (1–2 sentences):</span>
            </label>

            {/* Mic Dictate for Explanation */}
            <button
              onClick={() => handleToggleDictation('explanation')}
              className={`
                px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer
                ${isListening && activeDictationField === 'explanation'
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300'}
              `}
              title="Dictate explanation with microphone"
            >
              <Mic className="w-3 h-3 text-[#F472B6]" />
              <span>{isListening && activeDictationField === 'explanation' ? 'Listening...' : 'Voice Dictate'}</span>
            </button>
          </div>

          <textarea
            rows={3}
            value={userExplanation}
            onChange={(e) => setUserExplanation(e.target.value)}
            placeholder="In your own words, summarize what happened..."
            className="w-full p-3.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#F472B6] leading-relaxed resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-zinc-500 font-mono">
              {explanationWords} words
            </span>

            <Button
              variant="primary"
              size="md"
              disabled={!userTitle.trim() && !userExplanation.trim()}
              onClick={handleCheckWork}
              icon={Sparkles}
              className="font-bold text-xs"
            >
              {isWorkChecked ? 'Update Title & Explanation ✨' : 'Check My Title & Explanation ✨'}
            </Button>
          </div>
        </div>

        {/* COMPREHENSION EVALUATION & COMPARISON CARD */}
        {isWorkChecked && (
          <div className="p-5 bg-[#0D0D10] rounded-2xl border border-white/10 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Comprehension Evaluated: {workEvaluation ? `${workEvaluation.overallScore}% Score` : 'Recorded'}
                </span>
              </div>
              <span className="text-[11px] text-zinc-500">
                Detailed comparison and feedback below
              </span>
            </div>

            {/* 1. Title Comparison with Diagnostic Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-white/3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Title:
                  </span>
                  {workEvaluation && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      {workEvaluation.titleVerdict}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-white">
                  {userTitle.trim() ? `“${userTitle}”` : '—'}
                </p>
                {workEvaluation && (
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1 border-t border-white/5">
                    {workEvaluation.titleFeedback}
                  </p>
                )}
              </div>

              <div className="p-3.5 bg-[#F472B6]/10 rounded-xl border border-[#F472B6]/25 space-y-1">
                <span className="text-[10px] font-bold text-[#F472B6] uppercase tracking-wider block">
                  💡 Suggested Title:
                </span>
                <p className="text-sm font-bold text-pink-200">
                  “{suggestedTitle}”
                </p>
                <p className="text-[11px] text-pink-300/80 pt-1">
                  Concise and directly reflects the narrative dilemma.
                </p>
              </div>
            </div>

            {/* 2. Explanation Comparison with Concept Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-white/3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Explanation:
                  </span>
                  {workEvaluation && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      Score: {workEvaluation.explanationScore}%
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                  {userExplanation.trim() ? `“${userExplanation}”` : '—'}
                </p>
                {workEvaluation && (
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1 border-t border-white/5">
                    {workEvaluation.explanationFeedback}
                  </p>
                )}
              </div>

              <div className="p-3.5 bg-[#F472B6]/10 rounded-xl border border-[#F472B6]/25 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#F472B6] uppercase tracking-wider block">
                    💡 Model Short Summary:
                  </span>
                  <button
                    onClick={() => speak(modelShortSummary)}
                    className="p-1 rounded-lg text-pink-300 hover:text-white transition cursor-pointer"
                    title="Listen to model summary in natural voice"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-pink-100 font-medium leading-relaxed">
                  “{modelShortSummary}”
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 3. SIMPLE QUESTION FROM THIS PARAGRAPH CARD */}
      <Card className="p-6 sm:p-8 bg-[#111113] border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#F472B6]/20 text-[#F472B6]">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              3. Simple Question from this Paragraph
            </h2>
          </div>

          {isQuestionSubmitted && (
            <button
              onClick={handleResetQuestion}
              className="text-xs text-zinc-400 hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry Question</span>
            </button>
          )}
        </div>

        {/* The Question Prompt */}
        <p className="text-base sm:text-lg font-bold text-white">
          {question.prompt}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isThisOptionCorrect = idx === question.correctIndex;
            const letter = String.fromCharCode(65 + idx); // A, B, C

            let optionStyle = 'bg-[#18181B] border-white/5 hover:border-white/20 text-zinc-300';
            if (isQuestionSubmitted) {
              if (isSelected && isCorrect) {
                optionStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-bold';
              } else if (isSelected && isWrong) {
                optionStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-200';
              } else if (isThisOptionCorrect && isWrong) {
                optionStyle = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`
                  w-full p-4 rounded-2xl border text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer
                  ${optionStyle}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0
                    ${isSelected && isCorrect
                      ? 'bg-emerald-500 text-black'
                      : isSelected && isWrong
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/5 text-zinc-400'}
                  `}>
                    {letter}
                  </span>
                  <span>{opt}</span>
                </div>

                {isQuestionSubmitted && isSelected && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isQuestionSubmitted && isSelected && isWrong && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Why this is correct */}
        {isQuestionSubmitted && (
          <div className={`
            p-4 rounded-2xl border space-y-1.5 animate-in fade-in duration-200
            ${isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-300'}
          `}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              {isCorrect ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Correct Answer!</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Not quite right</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-200">
              <strong className="text-white">Why: </strong>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              onBack();
            }}
            className="text-xs text-zinc-400 hover:text-white transition cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Choose Another Paragraph</span>
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
              Next Paragraph
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
