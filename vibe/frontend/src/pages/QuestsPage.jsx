import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Layers, CheckCircle2, Award, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuestsPage = () => {
  const { profile } = useAuth();
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await api.getQuests();
        setQuests(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  }, []);

  const handleClaim = async (questId) => {
    try {
      await api.claimQuest(questId);
      setQuests(prev => prev.map(q => q._id === questId ? { ...q, isClaimed: true } : q));
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight flex items-center gap-2">
          <span>WEEKLY MISSIONS & QUESTS</span>
          <span className="text-xl">🎯</span>
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Achievable micro-habits that reinforce real English usage every week.
        </p>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        {quests.map((q) => {
          // Progress simulation based on profile stats
          let currentProgress = 0;
          if (q.targetType === 'learn_words') currentProgress = Math.min(q.targetCount, profile?.wordsLearned?.length || 10);
          if (q.targetType === 'have_conversations') currentProgress = Math.min(q.targetCount, profile?.conversationsCompleted || 2);
          if (q.targetType === 'create_posts') currentProgress = Math.min(q.targetCount, profile?.creationsCompleted || 3);
          if (q.targetType === 'finish_readings') currentProgress = Math.min(q.targetCount, profile?.storiesCompleted || 3);
          if (q.targetType === 'play_games') currentProgress = Math.min(q.targetCount, 2);

          const isComplete = currentProgress >= q.targetCount;
          const pct = Math.min(100, Math.floor((currentProgress / q.targetCount) * 100));

          return (
            <Card
              key={q._id}
              className="p-5 bg-[#111113] border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl p-3 bg-white/5 rounded-2xl border border-white/5 select-none shrink-0">
                  {q.icon || '🎯'}
                </span>
                <div className="space-y-1.5 max-w-md">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">{q.title}</h3>
                    <Badge variant="purple" size="xs">Goal: {q.targetCount}</Badge>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">{q.description}</p>

                  {/* Progress bar */}
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#A1A1AA]">
                      <span>Progress</span>
                      <span>{currentProgress} / {q.targetCount}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B5CF6] rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                {q.isClaimed ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Claimed
                  </span>
                ) : isComplete ? (
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleClaim(q._id)}
                  >
                    Claim Reward 🎁
                  </Button>
                ) : (
                  <span className="text-xs text-[#71717A] font-semibold">
                    In Progress
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
