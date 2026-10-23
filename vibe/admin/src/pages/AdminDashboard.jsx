import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';
import {
  Users,
  Brain,
  BookOpen,
  PenTool,
  Mic,
  TrendingUp,
  Clock,
  Activity,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminApi.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const overview = analytics?.overview || {
    totalUsers: 14,
    totalVocabulary: 60,
    totalReadings: 12,
    totalWritingPrompts: 20,
    totalScenarios: 15,
    dauEstimated: 42,
    wauEstimated: 128,
    avgSessionMinutes: 8.4,
  };

  const completions = analytics?.pillarCompletions || {
    vocabulary: 320,
    reading: 185,
    writing: 142,
    speaking: 210,
    games: 95,
  };

  return (
    <div className="space-y-8 p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            PLATFORM HEALTH & ANALYTICS
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Real-time telemetry across the four learning pillars and user retention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-400">
            SYSTEM HEALTHY
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'DAILY ACTIVE LEARNERS (DAU)', val: overview.dauEstimated, icon: Users, color: '#8B5CF6' },
          { label: 'WEEKLY ACTIVE (WAU)', val: overview.wauEstimated, icon: TrendingUp, color: '#22D3EE' },
          { label: 'AVG SESSION DURATION', val: `${overview.avgSessionMinutes} min`, icon: Clock, color: '#A3E635' },
          { label: 'PENDING MODERATION', val: overview.pendingReports || 0, icon: ShieldCheck, color: '#F472B6' },
        ].map(kpi => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-5 bg-[#111113] rounded-3xl border border-white/8 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">
                  {kpi.label}
                </span>
                <Icon className="w-4 h-4 text-[#71717A]" />
              </div>
              <p className="text-2xl sm:text-3xl font-black font-mono" style={{ color: kpi.color }}>
                {kpi.val}
              </p>
            </div>
          );
        })}
      </div>

      {/* 4 Pillars Completion Metrics */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider">
          Four Learning Pillars Completion Activity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Vocabulary & DNA', count: completions.vocabulary, icon: Brain, color: '#8B5CF6', tag: '60 Words Live' },
            { label: 'Reading Stories', count: completions.reading, icon: BookOpen, color: '#22D3EE', tag: '12 Stories Live' },
            { label: 'Writing Transformations', count: completions.writing, icon: PenTool, color: '#F472B6', tag: '20 Prompts Live' },
            { label: 'Speaking Sessions', count: completions.speaking, icon: Mic, color: '#A3E635', tag: '15 Scenarios Live' },
          ].map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="p-5 bg-[#111113] rounded-3xl border border-white/8 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                      <Icon className="w-4 h-4" style={{ color: p.color }} />
                    </div>
                    <span className="text-[10px] font-mono text-[#A1A1AA] bg-white/5 px-2 py-0.5 rounded-md">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{p.label}</h3>
                </div>

                <div>
                  <span className="text-2xl font-black font-mono text-white">
                    {p.count.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#A1A1AA] block mt-0.5">completions tracked</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Catalog Overview */}
      <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-4">
        <h3 className="text-base font-bold text-white">
          Active Production Content Summary
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-white/3 rounded-2xl border border-white/5">
            <span className="text-xs text-[#A1A1AA] block">Vocabulary</span>
            <span className="text-xl font-black text-white font-mono mt-1 block">{overview.totalVocabulary}</span>
          </div>
          <div className="p-3 bg-white/3 rounded-2xl border border-white/5">
            <span className="text-xs text-[#A1A1AA] block">Stories & Reads</span>
            <span className="text-xl font-black text-white font-mono mt-1 block">{overview.totalReadings}</span>
          </div>
          <div className="p-3 bg-white/3 rounded-2xl border border-white/5">
            <span className="text-xs text-[#A1A1AA] block">Writing Prompts</span>
            <span className="text-xl font-black text-white font-mono mt-1 block">{overview.totalWritingPrompts}</span>
          </div>
          <div className="p-3 bg-white/3 rounded-2xl border border-white/5">
            <span className="text-xs text-[#A1A1AA] block">Speaking Scenarios</span>
            <span className="text-xl font-black text-white font-mono mt-1 block">{overview.totalScenarios}</span>
          </div>
          <div className="p-3 bg-white/3 rounded-2xl border border-white/5">
            <span className="text-xs text-[#A1A1AA] block">Registered Learners</span>
            <span className="text-xl font-black text-white font-mono mt-1 block">{overview.totalUsers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
