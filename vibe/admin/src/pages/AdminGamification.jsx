import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';
import { Trophy, Award, Flame, Zap, Check } from 'lucide-react';

export const AdminGamification = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await adminApi.getQuests();
        setQuests(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  }, []);

  return (
    <div className="space-y-8 p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>GAMIFICATION & PROGRESSION RULES</span>
          <span className="text-xl">🏆</span>
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          XP rules, streak algorithms, and quest incentives.
        </p>
      </div>

      {/* XP Economy Engine Rules */}
      <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Active XP Economy Settings</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Vocabulary Word Mastered', xp: '+15 XP' },
            { label: 'Chat / Interactive Story Completed', xp: '+25 XP' },
            { label: 'Writing Transformation Submitted', xp: '+30 XP' },
            { label: 'Spoken Scenario Finished', xp: '+35 XP' },
            { label: 'Community Reaction Given', xp: '+5 XP' },
            { label: 'Say It Again Spoken Drill', xp: '+10 XP' },
            { label: 'Weekly Quest Milestone Claimed', xp: '+50 XP' },
            { label: 'Streak Bonus Daily', xp: '+20 XP' },
          ].map(r => (
            <div key={r.label} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1">
              <span className="text-[11px] text-[#A1A1AA] block">{r.label}</span>
              <span className="text-lg font-black font-mono text-[#A78BFA]">{r.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Quests & Badges list */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">
          Active Weekly Mission Badges ({quests.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quests.map((q) => (
            <div key={q._id} className="p-5 bg-[#111113] rounded-3xl border border-white/8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl select-none">{q.icon}</span>
                <span className="text-xs font-mono font-bold text-[#A78BFA]">+{q.rewardXp} XP</span>
              </div>
              <h3 className="font-bold text-sm text-white">{q.title}</h3>
              <p className="text-xs text-[#A1A1AA]">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
