import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Streak } from '../components/ui/Streak';
import { useAuth, LEVEL_LABELS } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import {
  Share2,
  BookOpen,
  MessageSquare,
  PenTool,
  Check,
  LogOut,
  Gamepad2,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfilePage = () => {
  const { user, profile, level, logout } = useAuth();
  const { isDark } = useTheme();
  const [copiedShare, setCopiedShare] = useState(false);

  // Real tracked counts of what the user did directly from MongoDB
  const [activityStats, setActivityStats] = useState({
    wordsStudied: 0,
    storiesRead: 0,
    creationsWritten: 0,
    speakingSessions: 0,
    gameLevelsCompleted: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const calculateStats = async () => {
      // 1. Fetch fresh profile from DB
      let freshProfile = profile;
      let completionsRes = null;
      let vaultWords = [];
      let gameLevelsCount = 0;

      try {
        const p = await api.getProfile();
        if (p) freshProfile = p;
      } catch (e) {}

      // 2. Fetch completions from DB
      try {
        completionsRes = await api.getActivityCompletions();
      } catch (e) {}

      // 3. Fetch vault saved words from DB
      try {
        const vaultRes = await api.getCompletedVault();
        if (vaultRes?.savedWords) vaultWords = vaultRes.savedWords;
      } catch (e) {}

      // 4. Fetch real game levels cleared from DB
      try {
        const mapData = await api.getGameMap();
        if (mapData?.progress?.completedLevels) {
          gameLevelsCount = mapData.progress.completedLevels.length;
        }
      } catch (e) {}

      // Words Studied (unique words saved or completed)
      const wordIds = new Set();
      (freshProfile?.wordsLearned || []).forEach((w) =>
        wordIds.add(typeof w === 'object' && w?._id ? String(w._id) : String(w))
      );
      (freshProfile?.completedVocabulary || []).forEach((w) => wordIds.add(String(w)));
      (completionsRes?.completedVocabulary || []).forEach((w) => wordIds.add(String(w)));
      (vaultWords || []).forEach((w) =>
        wordIds.add(typeof w === 'object' && w?._id ? String(w._id) : String(w))
      );
      try {
        const localWords = JSON.parse(localStorage.getItem('vibe_completed_vocab') || '[]');
        if (Array.isArray(localWords)) localWords.forEach((w) => wordIds.add(String(w)));
      } catch (e) {}

      // Stories Read (reading passages completed in DB)
      const readIds = new Set();
      (freshProfile?.completedReadings || []).forEach((r) => readIds.add(String(r)));
      (completionsRes?.completedReadings || []).forEach((r) => readIds.add(String(r)));
      try {
        const localRead = JSON.parse(localStorage.getItem('vibe_completed_readings') || '[]');
        if (Array.isArray(localRead)) localRead.forEach((r) => readIds.add(String(r)));
      } catch (e) {}
      const finalReadings = Math.max(readIds.size, freshProfile?.storiesCompleted || 0);

      // Creations Written (writing assignments submitted in DB)
      const writeIds = new Set();
      (freshProfile?.completedWritings || []).forEach((w) => writeIds.add(String(w)));
      (completionsRes?.completedWritings || []).forEach((w) => writeIds.add(String(w)));
      try {
        const localWrite = JSON.parse(localStorage.getItem('vibe_completed_writings') || '[]');
        if (Array.isArray(localWrite)) localWrite.forEach((w) => writeIds.add(String(w)));
      } catch (e) {}
      const finalWritings = Math.max(writeIds.size, freshProfile?.creationsCompleted || 0);

      // Speaking Sessions (voice topics finished in DB)
      const speakIds = new Set();
      (freshProfile?.completedSpeakings || []).forEach((s) => speakIds.add(String(s)));
      (completionsRes?.completedSpeakings || []).forEach((s) => speakIds.add(String(s)));
      try {
        const localSpeak = JSON.parse(localStorage.getItem('vibe_completed_speakings') || '[]');
        if (Array.isArray(localSpeak)) localSpeak.forEach((s) => speakIds.add(String(s)));
      } catch (e) {}
      const finalSpeakings = Math.max(speakIds.size, freshProfile?.conversationsCompleted || 0);

      // Game levels completed (3-star cleared in DB)
      try {
        const localGame = JSON.parse(localStorage.getItem('vibe_game_progress') || '{}');
        if (Array.isArray(localGame.completedLevels)) {
          gameLevelsCount = Math.max(gameLevelsCount, localGame.completedLevels.length);
        } else if (Array.isArray(localGame.levelScores)) {
          const starsCount = localGame.levelScores.filter((s) => (s.stars || 0) >= 3).length;
          gameLevelsCount = Math.max(gameLevelsCount, starsCount);
        }
      } catch (e) {}

      if (isMounted) {
        setActivityStats({
          wordsStudied: wordIds.size,
          storiesRead: finalReadings,
          creationsWritten: finalWritings,
          speakingSessions: finalSpeakings,
          gameLevelsCompleted: gameLevelsCount,
        });
      }
    };

    calculateStats();
    return () => {
      isMounted = false;
    };
  }, [user, profile]);

  const handleShareCard = () => {
    navigator.clipboard.writeText(`Practicing English on Saylo! 🔥 ${profile?.streakCount || 1} Day Streak.`);
    setCopiedShare(true);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const levelInfo = LEVEL_LABELS[level] || LEVEL_LABELS.beginner;
  const userInitial = (user?.displayName || user?.username || user?.email || 'L').charAt(0).toUpperCase();

  const accomplishmentStats = [
    {
      label: 'WORDS STUDIED',
      value: activityStats.wordsStudied,
      color: isDark ? '#8B5CF6' : '#7C3AED',
      border: isDark ? 'border-purple-500/25' : 'border-purple-200',
      bg: isDark ? 'bg-purple-500/[0.05]' : 'bg-purple-50/70',
      icon: BookOpen,
      desc: 'Vocabulary mastered',
    },
    {
      label: 'STORIES READ',
      value: activityStats.storiesRead,
      color: isDark ? '#22D3EE' : '#0284C7',
      border: isDark ? 'border-cyan-500/25' : 'border-cyan-200',
      bg: isDark ? 'bg-cyan-500/[0.05]' : 'bg-cyan-50/70',
      icon: FileText,
      desc: 'Comprehension stories',
    },
    {
      label: 'CREATIONS WRITTEN',
      value: activityStats.creationsWritten,
      color: isDark ? '#F472B6' : '#DB2777',
      border: isDark ? 'border-pink-500/25' : 'border-pink-200',
      bg: isDark ? 'bg-pink-500/[0.05]' : 'bg-pink-50/70',
      icon: PenTool,
      desc: 'Natural writing drafts',
    },
    {
      label: 'SPEAKING SESSIONS',
      value: activityStats.speakingSessions,
      color: isDark ? '#A3E635' : '#4D7C0F',
      border: isDark ? 'border-lime-500/25' : 'border-lime-200',
      bg: isDark ? 'bg-lime-500/[0.05]' : 'bg-lime-50/70',
      icon: MessageSquare,
      desc: 'Voice conversations',
    },
    {
      label: 'GAME LEVELS CLEARED',
      value: `${activityStats.gameLevelsCompleted}/30`,
      color: isDark ? '#F59E0B' : '#D97706',
      border: isDark ? 'border-amber-500/25' : 'border-amber-200',
      bg: isDark ? 'bg-amber-500/[0.05]' : 'bg-amber-50/70',
      icon: Gamepad2,
      desc: '3-Star World Map',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Profile Card */}
      <Card
        className={`p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#14141A] via-[#111116] to-[#0D0D11] border-white/10 shadow-2xl'
            : 'bg-white border-slate-200 shadow-xl'
        }`}
      >
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-purple-600/10' : 'bg-purple-500/5'}`} />

        {/* Top Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white flex items-center justify-center text-2xl font-black shadow-lg">
              {userInitial}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {user?.displayName || (user?.username ? user.username.split('@')[0] : (user?.email ? user.email.split('@')[0] : 'Learner'))}
              </h1>

              <span className="text-xs text-[#A1A1AA] font-mono block mt-0.5">
                {user?.email || (user?.username ? `@${user.username}` : '@learner')}
              </span>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <Badge variant="purple" size="xs">
                  {levelInfo.badge}
                </Badge>
                {user?.createdAt && (
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Streak count={profile?.streakCount || 1} />
            <button
              onClick={handleShareCard}
              className={`p-2.5 rounded-xl transition cursor-pointer border ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              }`}
              title="Share profile"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Fixed English Proficiency Level (Non-Changeable / Read-Only) */}
        <div
          className={`relative z-10 p-4 rounded-2xl border flex items-center justify-between ${
            isDark ? 'bg-white/[0.03] border-white/8' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border ${
              isDark ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/30' : 'bg-purple-100 border-purple-200 text-[#7C3AED]'
            }`}>
              {levelInfo.emoji || '🌱'}
            </span>
            <div>
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Current Proficiency Level:
              </span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span>{levelInfo.badge}</span>
              </span>
            </div>
          </div>
        </div>

        {/* What User Did: Activity & Accomplishments Grid */}
        <div className="space-y-3 relative z-10 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider block">
              WHAT YOU DID & ACCOMPLISHED:
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Live Database Records
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {accomplishmentStats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`p-4 rounded-2xl border ${s.border} ${s.bg} flex flex-col justify-between gap-2 transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block truncate">
                      {s.label}
                    </span>
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: s.color }} />
                  </div>

                  <div>
                    <span
                      className="text-2xl font-black font-mono block tracking-tight"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-0.5 block truncate">
                      {s.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls: Log Out */}
        <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-end">
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              icon={LogOut}
              className="text-xs text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              Sign Out
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
