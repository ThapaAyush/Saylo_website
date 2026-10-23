import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import { BookOpen, Mic, FileText, PenTool, ArrowRight } from 'lucide-react';

export const Home = () => {
  const { user, level } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [vocabWord, setVocabWord] = useState('');
  const [speakingTitle, setSpeakingTitle] = useState('');
  const [readingTitle, setReadingTitle] = useState('');
  const [writingTitle, setWritingTitle] = useState('');

  useEffect(() => {
    const fetchQuickData = async () => {
      setLoading(true);
      try {
        const [vocabRes, speakRes, readRes, writeRes] = await Promise.all([
          api.getVocabulary({ difficulty: level, limit: 1 }),
          api.getSpeakingScenarios({ difficulty: level }),
          api.getReadings({ difficulty: level }),
          api.getWritingPrompts({ difficulty: level }),
        ]);

        setVocabWord(vocabRes?.items?.[0]?.word || 'Daily Words');
        setSpeakingTitle(speakRes?.[0]?.title || 'Casual Chat');
        setReadingTitle(readRes?.[0]?.title || 'Daily Story');
        setWritingTitle(writeRes?.[0]?.title || 'Daily Prompt');
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuickData();
  }, [level]);

  const cards = [
    {
      step: '1',
      title: 'Vocabulary',
      desc: '5 new words every day',
      preview: vocabWord,
      icon: BookOpen,
      iconColor: isDark ? 'text-[#C084FC]' : 'text-[#7C3AED]',
      iconBg: isDark ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/35' : 'bg-purple-100 border-purple-200',
      stepColor: isDark ? 'text-[#C084FC]' : 'text-[#7C3AED]',
      cardBg: isDark
        ? 'bg-gradient-to-br from-[#8B5CF6]/15 via-[#181524] to-[#0E0C13]'
        : 'bg-gradient-to-br from-purple-50 via-white to-purple-50/50',
      cardBorder: isDark ? 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]/70' : 'border-purple-200 hover:border-purple-400',
      cardShadow: isDark ? 'hover:shadow-2xl hover:shadow-[#8B5CF6]/20' : 'shadow-sm hover:shadow-xl hover:shadow-purple-500/10',
      pillBg: isDark ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/30 text-purple-200' : 'bg-purple-100/90 border-purple-200 text-purple-900',
      arrowBg: isDark ? 'bg-[#8B5CF6]/20 group-hover:bg-[#8B5CF6] text-purple-200 group-hover:text-white' : 'bg-purple-100 group-hover:bg-[#7C3AED] text-purple-700 group-hover:text-white',
      btnText: isDark ? 'text-purple-300 group-hover:text-white' : 'text-purple-700 group-hover:text-[#7C3AED]',
      path: '/vocabulary',
    },
    {
      step: '2',
      title: 'Speaking',
      desc: 'Real conversation practice',
      preview: speakingTitle,
      icon: Mic,
      iconColor: isDark ? 'text-[#22D3EE]' : 'text-[#0284C7]',
      iconBg: isDark ? 'bg-[#22D3EE]/20 border-[#22D3EE]/35' : 'bg-cyan-100 border-cyan-200',
      stepColor: isDark ? 'text-[#22D3EE]' : 'text-[#0284C7]',
      cardBg: isDark
        ? 'bg-gradient-to-br from-[#22D3EE]/15 via-[#101C20] to-[#0A1012]'
        : 'bg-gradient-to-br from-cyan-50 via-white to-sky-50/50',
      cardBorder: isDark ? 'border-[#22D3EE]/30 hover:border-[#22D3EE]/70' : 'border-cyan-200 hover:border-cyan-400',
      cardShadow: isDark ? 'hover:shadow-2xl hover:shadow-[#22D3EE]/20' : 'shadow-sm hover:shadow-xl hover:shadow-cyan-500/10',
      pillBg: isDark ? 'bg-[#22D3EE]/15 border-[#22D3EE]/30 text-cyan-200' : 'bg-cyan-100/90 border-cyan-200 text-cyan-900',
      arrowBg: isDark ? 'bg-[#22D3EE]/20 group-hover:bg-[#22D3EE] text-cyan-200 group-hover:text-black' : 'bg-cyan-100 group-hover:bg-[#0284C7] text-cyan-700 group-hover:text-white',
      btnText: isDark ? 'text-cyan-300 group-hover:text-white' : 'text-cyan-700 group-hover:text-[#0284C7]',
      path: '/speaking',
    },
    {
      step: '3',
      title: 'Reading',
      desc: '1-minute everyday stories',
      preview: readingTitle,
      icon: FileText,
      iconColor: isDark ? 'text-[#F472B6]' : 'text-[#DB2777]',
      iconBg: isDark ? 'bg-[#F472B6]/20 border-[#F472B6]/35' : 'bg-pink-100 border-pink-200',
      stepColor: isDark ? 'text-[#F472B6]' : 'text-[#DB2777]',
      cardBg: isDark
        ? 'bg-gradient-to-br from-[#F472B6]/15 via-[#22121B] to-[#120B0F]'
        : 'bg-gradient-to-br from-pink-50 via-white to-rose-50/50',
      cardBorder: isDark ? 'border-[#F472B6]/30 hover:border-[#F472B6]/70' : 'border-pink-200 hover:border-pink-400',
      cardShadow: isDark ? 'hover:shadow-2xl hover:shadow-[#F472B6]/20' : 'shadow-sm hover:shadow-xl hover:shadow-pink-500/10',
      pillBg: isDark ? 'bg-[#F472B6]/15 border-[#F472B6]/30 text-pink-200' : 'bg-pink-100/90 border-pink-200 text-pink-900',
      arrowBg: isDark ? 'bg-[#F472B6]/20 group-hover:bg-[#F472B6] text-pink-200 group-hover:text-white' : 'bg-pink-100 group-hover:bg-[#DB2777] text-pink-700 group-hover:text-white',
      btnText: isDark ? 'text-pink-300 group-hover:text-white' : 'text-pink-700 group-hover:text-[#DB2777]',
      path: '/reading',
    },
    {
      step: '4',
      title: 'Writing',
      desc: 'Say what you mean in any tone',
      preview: writingTitle,
      icon: PenTool,
      iconColor: isDark ? 'text-[#A3E635]' : 'text-[#4D7C0F]',
      iconBg: isDark ? 'bg-[#A3E635]/20 border-[#A3E635]/35' : 'bg-lime-100 border-lime-200',
      stepColor: isDark ? 'text-[#A3E635]' : 'text-[#4D7C0F]',
      cardBg: isDark
        ? 'bg-gradient-to-br from-[#A3E635]/15 via-[#171E10] to-[#0E1309]'
        : 'bg-gradient-to-br from-lime-50 via-white to-emerald-50/50',
      cardBorder: isDark ? 'border-[#A3E635]/30 hover:border-[#A3E635]/70' : 'border-lime-200 hover:border-lime-400',
      cardShadow: isDark ? 'hover:shadow-2xl hover:shadow-[#A3E635]/20' : 'shadow-sm hover:shadow-xl hover:shadow-lime-500/10',
      pillBg: isDark ? 'bg-[#A3E635]/15 border-[#A3E635]/30 text-lime-200' : 'bg-lime-100/90 border-lime-200 text-lime-900',
      arrowBg: isDark ? 'bg-[#A3E635]/20 group-hover:bg-[#A3E635] text-lime-200 group-hover:text-black' : 'bg-lime-100 group-hover:bg-[#4D7C0F] text-lime-700 group-hover:text-white',
      btnText: isDark ? 'text-lime-300 group-hover:text-white' : 'text-lime-700 group-hover:text-[#4D7C0F]',
      path: '/writing',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 w-full animate-in fade-in duration-300">
        {/* Simple, Welcoming Header with Saylo & Phrase */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-widest text-[#8B5CF6] uppercase font-mono">
              Saylo
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-bold text-[#22D3EE] tracking-wide">
              Say it. Mean it. Own it.
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hey {user?.displayName || 'there'} 👋
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Choose what you want to practice today:
          </p>
        </div>

        {/* 🗺️ SAYLO GAME WORLD HERO BANNER */}
        <div
          onClick={() => navigate('/game')}
          className={`relative p-6 sm:p-7 rounded-3xl transition-all duration-300 cursor-pointer group overflow-hidden ${
            isDark
              ? 'bg-gradient-to-r from-purple-950/70 via-[#18181B] to-cyan-950/50 border-2 border-[#8B5CF6]/40 hover:border-[#22D3EE]/60 shadow-2xl shadow-purple-950/40'
              : 'bg-gradient-to-r from-purple-100/90 via-white to-cyan-100/90 border-2 border-purple-200 hover:border-cyan-300 shadow-md shadow-purple-500/5'
          }`}
        >
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8B5CF6]/20 via-[#22D3EE]/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/30 text-[#A78BFA] border border-[#8B5CF6]/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <span>🗺️</span> 30-LEVEL ADVENTURE MAP
                </span>
                <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  NEW
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#22D3EE] transition">
                Saylo Game World
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
                Step into a vertical mobile game world. Journey from Everyday English across 30 organic winding levels up to the Saylo Summit!
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-zinc-400">
                <span className="flex items-center gap-1">🌱 Start (1-10)</span>
                <span>•</span>
                <span className="flex items-center gap-1">⚡ Build (11-20)</span>
                <span>•</span>
                <span className="flex items-center gap-1">🔥 Master (21-30)</span>
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center justify-between gap-2">
              <button
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-black shadow-lg shadow-purple-500/30 group-hover:scale-105 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ENTER MAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Beautifully Themed Practice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                onClick={() => navigate(c.path)}
                className={`
                  p-5 sm:p-6 rounded-3xl border ${c.cardBg} ${c.cardBorder} ${c.cardShadow}
                  transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 group
                  hover:scale-[1.015] relative overflow-hidden
                `}
              >
                {/* Subtle Ambient Radial Highlight in Top-Left */}
                <div
                  className={`absolute -top-12 -left-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-60 transition duration-300 ${c.iconBg}`}
                />

                {/* Card Top: Icon & Title */}
                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition group-hover:scale-105 duration-200 ${c.iconBg}`}>
                      <Icon className={`w-5 h-5 ${c.iconColor}`} />
                    </span>
                    <span className={`text-xs font-mono font-black tracking-widest px-2.5 py-0.5 rounded-lg bg-black/40 border border-white/5 ${c.stepColor}`}>
                      0{c.step}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-white group-hover:text-white transition tracking-tight">
                      {c.title}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">
                      {c.desc}
                    </p>
                  </div>

                  {/* Themed preview pill */}
                  {c.preview && !loading && (
                    <div className="pt-1">
                      <span className={`text-xs px-3 py-1.5 rounded-xl border inline-block truncate max-w-full font-medium shadow-sm ${c.pillBg}`}>
                        Today: <strong className="text-white font-bold ml-1">{c.preview}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Bottom: Action CTA */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between relative z-10">
                  <span className={`text-xs font-bold transition ${c.btnText}`}>
                    Start {c.title}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition duration-200 ${c.arrowBg}`}>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
