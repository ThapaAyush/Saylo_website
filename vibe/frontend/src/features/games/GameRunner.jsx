import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Timer, CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { api } from '../../services/api';
export const GameRunner = ({ game, onExit }) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(game.timeLimitSec || 45);
  const [isGameOver, setIsGameOver] = useState(false);

  const rounds = game.rounds || [];
  const currentRound = rounds[currentRoundIdx];

  // Timer countdown
  useEffect(() => {
    if (isGameOver || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, isAnswered, currentRoundIdx]);

  const handleTimeUp = () => {
    setIsAnswered(true);
  };

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentRound.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    }
  };

  const handleNextRound = () => {
    if (currentRoundIdx + 1 < rounds.length) {
      setCurrentRoundIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(game.timeLimitSec || 45);
    } else {
      handleFinishGame();
    }
  };

  const handleFinishGame = async () => {
    setIsGameOver(true);
    const finalScore = score + (selectedOption === currentRound?.correctAnswer ? 10 : 0);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    try {
      await api.submitGameScore(game.gameId || game._id, {
        score: finalScore,
        roundsPlayed: rounds.length,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestart = () => {
    setCurrentRoundIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(game.timeLimitSec || 45);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <Card className="max-w-xl mx-auto p-8 text-center bg-gradient-to-b from-[#111113] to-[#181824] border border-white/10 space-y-5 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl shadow-lg">
          🏆
        </div>

        <div>
          <h2 className="text-2xl font-black text-white">Game Set!</h2>
          <p className="text-xs text-[#A1A1AA] mt-1">{game.title} Complete</p>
        </div>

        <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex justify-around">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A1A1AA] block">Score</span>
            <span className="text-2xl font-black text-white font-mono">{score} pts</span>
          </div>
          <div className="border-r border-white/5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#A1A1AA] block">Rounds</span>
            <span className="text-2xl font-black text-[#A78BFA] font-mono">{rounds.length} Done</span>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-3">
          <Button variant="secondary" size="md" onClick={handleRestart} icon={RotateCcw}>
            Play Again
          </Button>
          <Button variant="primary" size="md" onClick={onExit}>
            Back to Games →
          </Button>
        </div>
      </Card>
    );
  }

  if (!currentRound) return null;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Game Header Bar */}
      <div className="flex items-center justify-between p-4 bg-[#111113] rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none">{game.emoji || '🎮'}</span>
          <div>
            <h3 className="font-bold text-sm text-white">{game.title}</h3>
            <span className="text-[11px] text-[#A1A1AA]">
              Round {currentRoundIdx + 1} of {rounds.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs font-mono">
            <Timer className={`w-3.5 h-3.5 ${timeLeft <= 10 ? 'text-red-400 animate-spin' : 'text-[#22D3EE]'}`} />
            <span className={timeLeft <= 10 ? 'text-red-400 font-bold' : 'text-white'}>
              {timeLeft}s
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#A78BFA]">
            {score} pts
          </span>
        </div>
      </div>

      {/* Round Question Box */}
      <Card className="bg-[#09090B] border border-white/10 p-6 space-y-4">
        {/* Context / Scenario if present */}
        {currentRound.context && (
          <div className="p-3.5 bg-[#18181F] rounded-xl border border-white/5 text-xs text-[#E4E4E7] leading-relaxed">
            💬 {currentRound.context}
          </div>
        )}

        {/* Forbidden Words (for Word Battle) */}
        {currentRound.forbiddenWords?.length > 0 && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-red-400 block">
              ⚠️ Taboo Forbidden Words (DO NOT USE):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentRound.forbiddenWords.map((fw, i) => (
                <span key={i} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                  {fw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Clues (for Word Battle) */}
        {currentRound.clues?.length > 0 && (
          <div className="space-y-1.5 text-xs text-[#D4D4D8]">
            <span className="text-[10px] uppercase font-bold text-[#A1A1AA] block">Clues:</span>
            {currentRound.clues.map((c, i) => (
              <p key={i} className="pl-2 border-l-2 border-[#8B5CF6]">
                {c}
              </p>
            ))}
          </div>
        )}

        <h4 className="text-base sm:text-lg font-bold text-white pt-1">
          {currentRound.prompt}
        </h4>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentRound.options?.map((opt, optIdx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentRound.correctAnswer;

            let btnStyle = 'bg-[#18181B] hover:bg-[#27272A] border-white/5 text-[#F5F5F5]';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
              } else if (isSelected) {
                btnStyle = 'bg-red-500/20 border-red-500 text-red-200';
              } else {
                btnStyle = 'bg-[#18181B]/50 border-white/5 text-[#71717A] opacity-50';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && (
                  isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> : isSelected ? <XCircle className="w-5 h-5 text-red-400 shrink-0" /> : null
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {isAnswered && (
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs text-[#D4D4D8] animate-in fade-in space-y-1">
            <span className="font-bold text-white block">💡 Breakdown:</span>
            <p>{currentRound.explanation}</p>
          </div>
        )}
      </Card>

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end animate-in fade-in">
          <Button
            variant="primary"
            size="md"
            onClick={handleNextRound}
            icon={ArrowRight}
            iconPosition="right"
          >
            {currentRoundIdx + 1 < rounds.length ? 'Next Round' : 'Finish Game'}
          </Button>
        </div>
      )}
    </div>
  );
};
