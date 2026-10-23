import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Eye,
  Brain,
  PenTool,
  Repeat,
  Volume2,
  Sparkles,
  Send,
  Mic,
  MicOff,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Flame,
  Check,
  Calendar,
  Compass,
} from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

export const VocabularyAspects = ({
  vocab,
  isRemembered,
  onToggleRemembered,
  onNextWord,
}) => {
  const [activeAspect, setActiveAspect] = useState('discover'); // 'discover', 'understand', 'use', 'remember'
  const { speak, startListening, stopListening, isListening, transcript } = useSpeech();

  // "Use" aspect state
  const [userSentence, setUserSentence] = useState('');
  const [useEvaluating, setUseEvaluating] = useState(false);
  const [useFeedback, setUseFeedback] = useState(null);

  // "Remember" aspect recall check state
  const [recallRevealed, setRecallRevealed] = useState(false);

  // Sync speech transcript into input if user is using voice
  React.useEffect(() => {
    if (transcript) {
      setUserSentence(transcript);
    }
  }, [transcript]);

  // Reset exercise when word changes
  React.useEffect(() => {
    setUserSentence('');
    setUseFeedback(null);
    setRecallRevealed(false);
    setActiveAspect('discover');
  }, [vocab._id, vocab.word]);

  const handleEvaluateUse = async (e) => {
    e.preventDefault();
    if (!userSentence.trim()) return;

    setUseEvaluating(true);
    setUseFeedback(null);
    try {
      const res = await api.tryItWord(
        vocab.word,
        userSentence,
        vocab.caughtInTheWild?.miniChallenge?.friendPrompt || `Use ${vocab.word} in a sentence`
      );
      setUseFeedback(res);
      if (res.passed) {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      }
    } catch (err) {
      console.error(err);
      // Fallback local evaluation
      const hasWord = userSentence.toLowerCase().includes(vocab.word.toLowerCase());
      setUseFeedback({
        passed: hasWord,
        feedback: hasWord
          ? `Great job! You used "${vocab.word}" accurately in your response.`
          : `Try including the word "${vocab.word}" in your response to practice using it actively!`,
      });
    } finally {
      setUseEvaluating(false);
    }
  };

  const aspects = [
    { id: 'discover', label: '1. Discover', icon: Eye, emoji: '👀', desc: 'Real context & in-the-wild' },
    { id: 'understand', label: '2. Understand', icon: Brain, emoji: '🧠', desc: 'Word DNA & nuance' },
    { id: 'use', label: '3. Use', icon: PenTool, emoji: '✍️🗣️', desc: 'Active sentence practice' },
    { id: 'remember', label: '4. Remember & Reuse', icon: Repeat, emoji: '🔁', desc: 'Spaced recall roadmap' },
  ];

  // Context sentence for "Discover"
  const wildQuote = vocab.caughtInTheWild?.quote || vocab.examples?.[0] || `I'm completely ${vocab.word} today.`;
  const wildContext = vocab.caughtInTheWild?.context || 'Everyday modern conversation.';
  const wildPrompt = vocab.caughtInTheWild?.miniChallenge?.friendPrompt || `When was the last time you felt or acted ${vocab.word}?`;

  return (
    <Card className="p-5 sm:p-7 bg-[#121216] border-white/10 space-y-6 shadow-2xl">
      {/* Word Header & Completion Status Badge */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">{vocab.word}</h2>
          {vocab.phonetic && <span className="text-xs font-mono text-zinc-400">{vocab.phonetic}</span>}
        </div>
        {isRemembered ? (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow-sm">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Remembered</span>
          </span>
        ) : (
          <span className="text-xs text-zinc-500 font-mono">Learning in progress</span>
        )}
      </div>

      {/* 4 Aspects Segmented Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-[#18181F] rounded-2xl border border-white/8">
        {aspects.map((asp) => {
          const isActive = activeAspect === asp.id;
          const Icon = asp.icon;
          return (
            <button
              key={asp.id}
              onClick={() => setActiveAspect(asp.id)}
              className={`
                p-2.5 sm:p-3 rounded-xl text-left transition flex items-center gap-2.5 cursor-pointer
                ${isActive
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <span className="text-lg">{asp.emoji}</span>
              <div className="min-w-0">
                <span className="text-xs font-black block leading-tight truncate">
                  {asp.label}
                </span>
                <span className={`text-[10px] hidden sm:block truncate ${isActive ? 'text-purple-200' : 'text-zinc-500'}`}>
                  {asp.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================== */}
      {/* ASPECT 1: DISCOVER 👀                                      */}
      {/* Learn words inside sentences and authentic real context   */}
      {/* ========================================================== */}
      {activeAspect === 'discover' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wider">
                  Aspect 1 • Caught In The Wild
                </span>
                <Badge variant="purple" size="xs">
                  {vocab.category || 'Casual'}
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Meet "{vocab.word}" in real life
              </h2>
            </div>

            <button
              onClick={() => speak(`${vocab.word}. ${wildQuote}`)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#22D3EE] border border-white/5 transition self-start sm:self-center font-bold text-xs"
              title="Pronounce word and sentence"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Sentence</span>
            </button>
          </div>

          {/* Real context card */}
          <div className="p-6 bg-gradient-to-br from-[#181822] to-[#121217] rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#8B5CF6]" />
                <span>Found In Context: <strong className="text-white">{wildContext}</strong></span>
              </span>
              <span className="font-mono text-zinc-500">{vocab.phonetic}</span>
            </div>

            {/* The Quote in Sentence Form */}
            <blockquote className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              “{wildQuote}”
            </blockquote>

            {/* Micro Breakdown of the word inside the sentence */}
            <div className="p-3.5 bg-black/40 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#22D3EE] uppercase tracking-wider block">
                  How it works here:
                </span>
                <p className="text-xs text-zinc-300 mt-0.5">
                  <strong className="text-white font-mono">{vocab.word}</strong> = {vocab.meaning}
                </p>
              </div>

              {vocab.hindiMeaning && (
                <div className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 shrink-0">
                  मतलब: {vocab.hindiMeaning}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-zinc-500">Step 1 of 4: Discovering in authentic situation</span>
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveAspect('understand')}
              icon={ArrowRight}
              className="text-xs font-bold"
            >
              Understand Meaning & Nuance →
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* ASPECT 2: UNDERSTAND 🧠 (WORD DNA)                        */}
      {/* Meaning, pronunciation, formal vs casual, guardrails       */}
      {/* ========================================================== */}
      {activeAspect === 'understand' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wider">
                Aspect 2 • Word DNA & Nuance
              </span>
              <div className="flex items-center gap-3 mt-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white">{vocab.word}</h2>
                <span className="text-sm font-mono text-[#A1A1AA]">{vocab.phonetic}</span>
                <button
                  onClick={() => speak(vocab.word)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#22D3EE] transition"
                  title="Pronounce"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Badge variant="cyan" size="sm">
              Formality: {vocab.formality || 5}/10
            </Badge>
          </div>

          {/* Definition & Feeling Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Meaning */}
            <div className="p-4 bg-white/3 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[11px] font-bold text-[#A78BFA] uppercase tracking-wider block">
                What it actually means
              </span>
              <p className="text-sm text-white font-medium leading-relaxed">{vocab.meaning}</p>
              {vocab.hindiMeaning && (
                <p className="text-xs text-amber-300">
                  हिंदी अर्थ: {vocab.hindiMeaning}
                </p>
              )}
            </div>

            {/* Formal vs Casual Scale */}
            <div className="p-4 bg-white/3 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[11px] font-bold text-[#22D3EE] uppercase tracking-wider block">
                Tone & Formality Meter
              </span>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Casual / Street</span>
                  <span className="font-bold text-white">{vocab.tone || 'Casual'}</span>
                  <span>Boardroom / Formal</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#F472B6]"
                    style={{ width: `${Math.min(100, (vocab.formality || 4) * 10)}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Energy: <strong>{vocab.energy || 7}/10</strong> • Commonness in daily speech: <strong>{vocab.commonness || 8}/10</strong>
              </p>
            </div>
          </div>

          {/* Synonyms & Opposites */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/15 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Similar Words (Synonyms)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(vocab.synonyms?.length ? vocab.synonyms : ['related term', 'expressive form']).map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 rounded-lg text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/15 space-y-2">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                Opposite Feeling (Antonyms)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(vocab.antonyms?.length ? vocab.antonyms : ['opposite', 'counter-vibe']).map((a, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-rose-500/10 text-rose-300 rounded-lg text-xs font-semibold">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* When to use vs When NOT to use (Guardrails) */}
          <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/15 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Where NOT to use this word:
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {vocab.dontUseIn || 'Avoid in stiff legal contracts or ultra-formal corporate filings.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={() => setActiveAspect('discover')} className="text-xs text-zinc-400">
              ← Back to Context
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveAspect('use')}
              icon={ArrowRight}
              className="text-xs font-bold"
            >
              Put It To Use ✍️🗣️ →
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* ASPECT 3: USE ✍️🗣️ (ACTIVE PRACTICE)                     */}
      {/* Make sentences, speaking challenge, situational response   */}
      {/* ========================================================== */}
      {activeAspect === 'use' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-white/5 pb-4 space-y-1">
            <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wider">
              Aspect 3 • Active Usage Drill
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Turn passive memory into active speech
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Don't just know the definition. Actually use <strong className="text-white">"{vocab.word}"</strong> to answer this real-life scenario:
            </p>
          </div>

          {/* Conversational prompt from friend */}
          <div className="p-5 bg-gradient-to-br from-[#1C1A27] to-[#121217] rounded-3xl border border-[#8B5CF6]/30 space-y-3">
            <span className="text-[11px] font-bold text-[#A78BFA] uppercase tracking-wider block">
              💬 Incoming Conversation:
            </span>
            <p className="text-lg font-bold text-white">
              “{wildPrompt}”
            </p>
            <span className="text-xs text-zinc-400 block">
              Goal: Reply back naturally using the word <strong className="text-[#22D3EE]">"{vocab.word}"</strong>.
            </span>
          </div>

          {/* Input form with text & voice */}
          <form onSubmit={handleEvaluateUse} className="space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={userSentence}
                onChange={(e) => setUserSentence(e.target.value)}
                placeholder={`Type your answer using "${vocab.word}"...`}
                className="w-full p-4 pr-12 bg-[#18181D] border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6] resize-none"
                required
              />

              {/* Mic button for speaking practice */}
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`
                  absolute right-3 bottom-3 p-2.5 rounded-xl transition cursor-pointer
                  ${isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20'}
                `}
                title={isListening ? 'Stop listening' : 'Speak your answer out loud'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] text-zinc-500">
                {isListening ? 'Listening... speak clearly into mic' : 'Tip: Tap mic to speak or type directly.'}
              </span>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={useEvaluating || !userSentence.trim()}
                icon={useEvaluating ? Sparkles : Send}
                className="text-xs font-bold"
              >
                {useEvaluating ? 'Checking...' : 'Check My Usage ✨'}
              </Button>
            </div>
          </form>

          {/* Feedback result */}
          {useFeedback && (
            <div
              className={`p-4 rounded-2xl border space-y-2 animate-in fade-in ${
                useFeedback.passed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {useFeedback.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <span className="text-xs font-black uppercase tracking-wider">
                  {useFeedback.passed ? 'Natural Phrasing Approved!' : 'Needs Alignment'}
                </span>
              </div>
              <p className="text-xs leading-relaxed">{useFeedback.feedback}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={() => setActiveAspect('understand')} className="text-xs text-zinc-400">
              ← Back to Understand
            </Button>
            <Button
              variant="accent"
              size="md"
              onClick={() => setActiveAspect('remember')}
              icon={ArrowRight}
              className="text-xs font-bold"
            >
              Remember & Spaced Retention 🔁 →
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* ASPECT 4: REMEMBER & REUSE 🔁                              */}
      {/* Retention roadmap (Day 1, 2, 4, 7, 14), Active Recall check */}
      {/* ========================================================== */}
      {activeAspect === 'remember' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wider">
                Aspect 4 • Spaced Retention & Active Recall
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Lock "{vocab.word}" into long-term memory
              </h2>
            </div>

            {/* Remember Toggle Button */}
            <button
              onClick={() => onToggleRemembered(vocab._id || vocab.word)}
              className={`
                px-4 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 cursor-pointer
                ${isRemembered
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-[#18181F] hover:bg-white/10 text-zinc-300 border border-white/10'}
              `}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{isRemembered ? 'Remembered & In File ✓' : 'Mark as Remembered'}</span>
            </button>
          </div>

          {/* Retention Roadmap: Day 1 to Day 14 */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider block">
              Automated Retention Roadmap for "{vocab.word}":
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {[
                { day: 'Day 1', label: 'Discover', desc: 'Real context encounter', active: true, icon: '👀' },
                { day: 'Day 2', label: 'Recall Drill', desc: 'Active memory test', active: isRemembered, icon: '⚡' },
                { day: 'Day 4', label: 'AI Chat', desc: 'Use in natural text chat', active: false, icon: '💬' },
                { day: 'Day 7', label: 'Speaking', desc: 'Speak in voice roleplay', active: false, icon: '🎙️' },
                { day: 'Day 14', label: 'Mastered', desc: 'Permanent reflex', active: false, icon: '🏆' },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition flex flex-col justify-between ${
                    step.active
                      ? 'bg-purple-600/15 border-purple-500/50 text-white'
                      : 'bg-black/30 border-white/5 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={step.active ? 'text-[#22D3EE]' : 'text-zinc-600'}>{step.day}</span>
                    <span>{step.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-200">{step.label}</span>
                  <span className="text-[10px] text-zinc-400 mt-1 leading-tight">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Active Recall Check Card */}
          <div className="p-5 bg-white/3 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider">
                ⚡ Active Recall Check:
              </span>
              <button
                onClick={() => setRecallRevealed(!recallRevealed)}
                className="text-xs font-bold text-[#8B5CF6] hover:text-[#A78BFA] underline cursor-pointer"
              >
                {recallRevealed ? 'Hide Answer' : 'Test Memory (Reveal Meaning)'}
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                "What does <strong className="text-[#22D3EE]">{vocab.word}</strong> mean, and can you use it in one sentence?"
              </p>
              {recallRevealed && (
                <div className="p-3 bg-black/50 rounded-xl border border-white/10 text-xs text-zinc-300 space-y-1 animate-in fade-in">
                  <p><strong>Meaning:</strong> {vocab.meaning}</p>
                  <p><strong>Example:</strong> "{wildQuote}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-zinc-400">
              {isRemembered
                ? '🌟 This word is saved in your personal word file!'
                : 'Tap "Mark as Remembered" to save it into your file.'}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onToggleRemembered(vocab._id || vocab.word)}
                className="text-xs font-bold"
              >
                {isRemembered ? 'Saved in File ✓' : 'Remember This Word'}
              </Button>
              {onNextWord && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={onNextWord}
                  icon={ArrowRight}
                  className="text-xs font-bold"
                >
                  Next Word
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
