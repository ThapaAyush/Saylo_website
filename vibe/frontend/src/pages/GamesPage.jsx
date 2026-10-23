import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { GameRunner } from '../features/games/GameRunner';
import { api } from '../services/api';
import { Gamepad2, Zap, Trophy, Timer, Play, ArrowLeft } from 'lucide-react';

export const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await api.getGames();
        setGames(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (activeGame) {
    return (
      <div className="py-6 sm:py-10 px-4">
        <div className="max-w-xl mx-auto mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveGame(null)}
            icon={ArrowLeft}
            className="text-xs"
          >
            Back to Arcade
          </Button>
        </div>
        <GameRunner game={activeGame} onExit={() => setActiveGame(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight flex items-center gap-2">
          <span>VOCABULARY ARCADE</span>
          <span className="text-xl">🎮</span>
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Fast-paced intuitive language games. No boring multiple-choice grammar quizzes.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((g) => (
          <Card
            key={g._id || g.gameId}
            hoverEffect
            className="p-6 bg-[#111113] border-white/8 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition duration-200 select-none">
                  {g.emoji || '🎮'}
                </span>
                <Badge variant={g.difficulty === 'spicy' ? 'pink' : g.difficulty === 'easy' ? 'lime' : 'purple'} size="xs">
                  {g.difficulty || 'medium'}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-[#A78BFA] transition">
                {g.title}
              </h3>
              <p className="text-xs font-semibold text-[#22D3EE] mb-2">
                {g.tagline}
              </p>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                {g.instructions}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-[#71717A] flex items-center gap-1 font-mono">
                <Timer className="w-3.5 h-3.5" /> {g.timeLimitSec}s timer
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveGame(g)}
                icon={Play}
                className="text-xs"
              >
                Play Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
