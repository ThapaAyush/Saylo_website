import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';
import {
  Gamepad2,
  Compass,
  Trophy,
  Users,
  Zap,
  Edit3,
  CheckCircle2,
  Lock,
  Sparkles,
  Search,
  Filter,
  Eye,
  Save,
  X,
  Crown,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const AdminGameWorld = () => {
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [worlds, setWorlds] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'mapPreview' | 'analytics'
  const [search, setSearch] = useState('');
  const [filterWorld, setFilterWorld] = useState('all');

  // Editing Modal State
  const [editingLevel, setEditingLevel] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    difficulty: 'easy',
    xpReward: 150,
    estimatedTime: '5 min',
    bossLevel: false,
    active: true,
    scenarioBrief: '',
    scenarioSetting: '',
    scenarioCharacter: '',
  });
  const [saving, setSaving] = useState(false);

  // Preview Modal
  const [previewLevel, setPreviewLevel] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [levelsRes, analyticsRes] = await Promise.all([
        adminApi.getGameAdminLevels(),
        adminApi.getGameAnalytics(),
      ]);
      setLevels(levelsRes.levels || []);
      setWorlds(levelsRes.worlds || []);
      setAnalytics(analyticsRes);
    } catch (err) {
      console.error('Failed to load admin game data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditModal = (lvl) => {
    setEditingLevel(lvl);
    setEditFormData({
      title: lvl.title || '',
      difficulty: lvl.difficulty || 'easy',
      xpReward: lvl.xpReward || 150,
      estimatedTime: lvl.estimatedTime || '5 min',
      bossLevel: !!lvl.bossLevel,
      active: lvl.active !== false,
      scenarioBrief: lvl.scenario?.missionBrief || lvl.description || '',
      scenarioSetting: lvl.scenario?.setting || '',
      scenarioCharacter: lvl.scenario?.character || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingLevel) return;
    try {
      setSaving(true);
      await adminApi.updateGameLevel(editingLevel.levelNumber, {
        title: editFormData.title,
        difficulty: editFormData.difficulty,
        xpReward: Number(editFormData.xpReward),
        estimatedTime: editFormData.estimatedTime,
        bossLevel: editFormData.bossLevel,
        active: editFormData.active,
        scenario: {
          setting: editFormData.scenarioSetting,
          character: editFormData.scenarioCharacter,
          missionBrief: editFormData.scenarioBrief,
          context: `You arrive at ${editFormData.scenarioSetting} to meet ${editFormData.scenarioCharacter}.`,
        },
      });

      // Update local state
      setLevels((prev) =>
        prev.map((l) =>
          l.levelNumber === editingLevel.levelNumber
            ? {
                ...l,
                ...editFormData,
                scenario: {
                  setting: editFormData.scenarioSetting,
                  character: editFormData.scenarioCharacter,
                  missionBrief: editFormData.scenarioBrief,
                },
              }
            : l
        )
      );
      setEditingLevel(null);
    } catch (err) {
      console.error('Failed to save level:', err);
    } finally {
      setSaving(false);
    }
  };

  // Filtered levels
  const filteredLevels = levels.filter((lvl) => {
    const matchesSearch =
      lvl.title.toLowerCase().includes(search.toLowerCase()) ||
      lvl.levelNumber.toString().includes(search) ||
      lvl.scenario?.character?.toLowerCase().includes(search.toLowerCase());
    const matchesWorld =
      filterWorld === 'all' ||
      (filterWorld === '1' && lvl.levelNumber <= 10) ||
      (filterWorld === '2' && lvl.levelNumber > 10 && lvl.levelNumber <= 20) ||
      (filterWorld === '3' && lvl.levelNumber > 20);
    return matchesSearch && matchesWorld;
  });

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh] text-zinc-400">
        Loading Game World operations...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30 text-[10px] font-black uppercase tracking-widest">
              30-LEVEL ADVENTURE ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Game World Management
          </h1>
          <p className="text-xs text-zinc-400">
            Configure levels, scenario briefs, bosses, challenge counts, and live player analytics.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-[#18181B] p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'list'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Level Roster (30)
          </button>
          <button
            onClick={() => setActiveTab('mapPreview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'mapPreview'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Map Path Preview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Telemetry & Funnels
          </button>
        </div>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#121215] border border-white/5">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Adventure Levels</div>
          <div className="text-2xl font-black text-white mt-1">30</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">3 Worlds Configured</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121215] border border-white/5">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Challenges</div>
          <div className="text-2xl font-black text-[#22D3EE] mt-1">240</div>
          <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">Easy (4) • Med (8) • Hard (12)</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121215] border border-white/5">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Active Adventurers</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{analytics?.totalPlayers || 42}</div>
          <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">Demo User at Level 14</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121215] border border-white/5">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Boss Milestones</div>
          <div className="text-2xl font-black text-purple-400 mt-1">3 Bosses</div>
          <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">Lvl 10, Lvl 20 & Summit Lvl 30</div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: LEVEL ROSTER */}
      {/* ===================================================================== */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121215] p-3 rounded-2xl border border-white/5">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search level title or character..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Levels (30)' },
                { id: '1', label: 'World 1: Start (1-10)' },
                { id: '2', label: 'World 2: Build (11-20)' },
                { id: '3', label: 'World 3: Master (21-30)' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setFilterWorld(w.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    filterWorld === w.id
                      ? 'bg-[#8B5CF6] text-white'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Levels Table */}
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#121215]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#18181B] text-zinc-400 font-semibold border-b border-white/5">
                <tr>
                  <th className="p-3.5">Lvl #</th>
                  <th className="p-3.5">Title & Setting</th>
                  <th className="p-3.5">World & Difficulty</th>
                  <th className="p-3.5">Challenges</th>
                  <th className="p-3.5">XP</th>
                  <th className="p-3.5">Est. Time</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLevels.map((lvl) => {
                  const isBoss = lvl.bossLevel;
                  const difficultyColor =
                    lvl.difficulty === 'easy'
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                      : lvl.difficulty === 'medium'
                      ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                      : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

                  return (
                    <tr
                      key={lvl.levelNumber}
                      className="hover:bg-white/[0.02] transition"
                    >
                      <td className="p-3.5 font-mono font-black text-white">
                        <div className="flex items-center gap-1.5">
                          {isBoss && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                          <span>#{String(lvl.levelNumber).padStart(2, '0')}</span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-white leading-snug">
                          {lvl.title}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate max-w-xs">
                          {lvl.scenario?.setting} • {lvl.scenario?.character}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${difficultyColor}`}>
                          {lvl.difficulty}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono text-zinc-300">
                        {lvl.challengeCount || (lvl.levelNumber <= 10 ? 4 : lvl.levelNumber <= 20 ? 8 : 12)} steps
                      </td>

                      <td className="p-3.5 font-mono font-bold text-yellow-400">
                        +{lvl.xpReward} XP
                      </td>

                      <td className="p-3.5 text-zinc-400">
                        {lvl.estimatedTime || '5 min'}
                      </td>

                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setPreviewLevel(lvl)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                          title="Preview Level"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(lvl)}
                          className="p-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-[#A78BFA] transition cursor-pointer"
                          title="Edit Level"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: VISUAL MAP PREVIEW */}
      {/* ===================================================================== */}
      {activeTab === 'mapPreview' && (
        <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#22D3EE]" />
              <span>Organic Serpentine Coordinates Preview</span>
            </h3>
            <span className="text-xs text-zinc-400">30 Nodes positioned along winding SVG trail</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-[500px] overflow-y-auto p-2">
            {levels.map((lvl) => (
              <div
                key={lvl.levelNumber}
                onClick={() => setPreviewLevel(lvl)}
                className="p-3 rounded-xl bg-[#18181B] border border-white/5 hover:border-[#8B5CF6] transition cursor-pointer text-left space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xs text-white">
                    Level {lvl.levelNumber}
                  </span>
                  {lvl.bossLevel ? (
                    <span className="text-[10px] text-amber-400 font-bold">👑 Boss</span>
                  ) : (
                    <span className="text-[10px] text-zinc-500">{lvl.difficulty}</span>
                  )}
                </div>
                <div className="text-[11px] text-zinc-300 font-medium truncate">
                  {lvl.title}
                </div>
                <div className="text-[9px] font-mono text-zinc-500">
                  x: {lvl.mapPosition?.x}% • y: {lvl.mapPosition?.y}px
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: ANALYTICS & TELEMETRY */}
      {/* ===================================================================== */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white">Adventure Drop-Off Funnel</h3>
            <p className="text-xs text-zinc-400">
              Completion velocity across the 3 Worlds:
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>🌱 World 1: Start (Levels 1–10)</span>
                  <span className="text-emerald-400 font-mono">94% Completion</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>⚡ World 2: Build (Levels 11–20)</span>
                  <span className="text-cyan-400 font-mono">76% Completion</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>🔥 World 3: Master (Levels 21–30)</span>
                  <span className="text-amber-400 font-mono">48% Completion</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white">Skill Balance Across Missions</h3>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded-2xl bg-[#18181B] text-center">
                <span className="text-xs font-bold text-violet-400">Vocabulary</span>
                <div className="text-lg font-black text-white mt-1">60 Challenges</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#18181B] text-center">
                <span className="text-xs font-bold text-cyan-400">Reading</span>
                <div className="text-lg font-black text-white mt-1">60 Challenges</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#18181B] text-center">
                <span className="text-xs font-bold text-pink-400">Writing</span>
                <div className="text-lg font-black text-white mt-1">60 Challenges</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#18181B] text-center">
                <span className="text-xs font-bold text-amber-400">Speaking</span>
                <div className="text-lg font-black text-white mt-1">60 Challenges</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* EDIT MODAL */}
      {/* ===================================================================== */}
      {editingLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-[#18181B] border border-white/10 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-white">
                Edit Level #{editingLevel.levelNumber}: {editingLevel.title}
              </h3>
              <button
                onClick={() => setEditingLevel(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Level Title</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full p-2.5 bg-[#121215] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Difficulty</label>
                  <select
                    value={editFormData.difficulty}
                    onChange={(e) => setEditFormData({ ...editFormData, difficulty: e.target.value })}
                    className="w-full p-2.5 bg-[#121215] border border-white/10 rounded-xl text-white"
                  >
                    <option value="easy">Easy (Start)</option>
                    <option value="medium">Medium (Build)</option>
                    <option value="hard">Hard (Master)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={editFormData.xpReward}
                    onChange={(e) => setEditFormData({ ...editFormData, xpReward: e.target.value })}
                    className="w-full p-2.5 bg-[#121215] border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Setting / Environment</label>
                <input
                  type="text"
                  value={editFormData.scenarioSetting}
                  onChange={(e) => setEditFormData({ ...editFormData, scenarioSetting: e.target.value })}
                  className="w-full p-2.5 bg-[#121215] border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Character / Contact</label>
                <input
                  type="text"
                  value={editFormData.scenarioCharacter}
                  onChange={(e) => setEditFormData({ ...editFormData, scenarioCharacter: e.target.value })}
                  className="w-full p-2.5 bg-[#121215] border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Narrative Mission Briefing</label>
                <textarea
                  rows={3}
                  value={editFormData.scenarioBrief}
                  onChange={(e) => setEditFormData({ ...editFormData, scenarioBrief: e.target.value })}
                  className="w-full p-2.5 bg-[#121215] border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.bossLevel}
                    onChange={(e) => setEditFormData({ ...editFormData, bossLevel: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B5CF6]"
                  />
                  <span className="font-bold text-amber-300">Milestone Boss Level</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.active}
                    onChange={(e) => setEditFormData({ ...editFormData, active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#8B5CF6]"
                  />
                  <span className="font-bold text-white">Active / Published</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-3">
              <button
                onClick={() => setEditingLevel(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-black flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="text-xs font-black text-[#A78BFA] uppercase">
                Level #{previewLevel.levelNumber} Preview
              </div>
              <button
                onClick={() => setPreviewLevel(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">"{previewLevel.title}"</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {previewLevel.scenario?.missionBrief || previewLevel.description}
              </p>
              <div className="text-[11px] text-zinc-400">
                Contact: <span className="text-white font-semibold">{previewLevel.scenario?.character}</span> at {previewLevel.scenario?.setting}
              </div>
              <div className="flex items-center gap-2 pt-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-300 font-bold">
                  +{previewLevel.xpReward} XP
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-bold">
                  {previewLevel.estimatedTime || '5 min'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setPreviewLevel(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
