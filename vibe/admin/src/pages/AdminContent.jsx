import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import {
  Gamepad2,
  BookOpen,
  Mic,
  FileText,
  PenTool,
  Plus,
  Trash2,
  Edit2,
  Search,
  Check,
  X,
  Sparkles,
  Save,
  ExternalLink,
  RefreshCw,
  Trophy,
} from 'lucide-react';

export const AdminContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'game';

  // Data states
  const [levels, setLevels] = useState([]);
  const [worlds, setWorlds] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [totalVocab, setTotalVocab] = useState(0);
  const [readings, setReadings] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Edit states
  const [editingGameLevel, setEditingGameLevel] = useState(null);
  const [editingVocab, setEditingVocab] = useState(null);
  const [editingSpeaking, setEditingSpeaking] = useState(null);
  const [editingReading, setEditingReading] = useState(null);
  const [editingWriting, setEditingWriting] = useState(null);

  // Add states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('vocabulary');

  // Form states for adding
  const [newVocab, setNewVocab] = useState({
    word: '',
    meaning: '',
    phonetic: '',
    category: 'internet',
    tone: 'Casual',
    formality: 3,
    energy: 7,
    commonness: 8,
    isSlang: true,
    examples: [''],
    hindiMeaning: '',
    dontUseIn: 'Formal board meeting or resume',
  });

  const [newSpeaking, setNewSpeaking] = useState({
    title: '',
    category: 'Café',
    emoji: '🎙️',
    difficulty: 'beginner',
    context: '',
    starterPrompt: '',
    firstBotMessage: '',
    objectives: ['Order food or drink naturally'],
  });

  const [newReading, setNewReading] = useState({
    title: '',
    type: 'chat_story',
    category: 'social',
    difficulty: 'beginner',
    estimatedTime: '5 min read',
    summary: '',
    content: '',
  });

  const [newWriting, setNewWriting] = useState({
    title: '',
    category: 'Tell a story',
    difficulty: 'beginner',
    targetLength: 'Up to 300 words',
    prompt: '',
    situationContext: '',
  });

  // Fetch all curriculum data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [gRes, vRes, rRes, pRes, sRes] = await Promise.all([
        adminApi.getGameAdminLevels().catch(() => ({ levels: [], worlds: [] })),
        adminApi.getVocabulary({ limit: 100, search }).catch(() => ({ items: [], total: 0 })),
        adminApi.getReadings().catch(() => []),
        adminApi.getWritingPrompts().catch(() => []),
        adminApi.getSpeakingScenarios().catch(() => []),
      ]);

      setLevels(Array.isArray(gRes?.levels) ? gRes.levels : (Array.isArray(gRes) ? gRes : []));
      setWorlds(gRes?.worlds || []);
      
      const vocabList = Array.isArray(vRes?.items) ? vRes.items : (Array.isArray(vRes) ? vRes : (vRes?.words || []));
      setVocabulary(vocabList);
      setTotalVocab(vRes?.total || vocabList.length);

      const readingList = Array.isArray(rRes) ? rRes : (rRes?.readingContents || rRes?.items || []);
      setReadings(readingList);

      const promptList = Array.isArray(pRes) ? pRes : (pRes?.prompts || pRes?.items || []);
      setPrompts(promptList);

      const scenarioList = Array.isArray(sRes) ? sRes : (sRes?.scenarios || sRes?.items || []);
      setScenarios(scenarioList);
    } catch (err) {
      console.error('Error fetching admin curriculum:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  // Tab switcher
  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  // ==========================================
  // GAME LEVEL EDIT HANDLERS
  // ==========================================
  const handleSaveGameLevel = async (e) => {
    e.preventDefault();
    if (!editingGameLevel) return;
    setSaving(true);
    try {
      await adminApi.updateGameLevel(editingGameLevel.levelNumber, {
        title: editingGameLevel.title,
        topic: editingGameLevel.topic,
        passPercentage: Number(editingGameLevel.passPercentage || 80),
        rewardXP: Number(editingGameLevel.rewardXP || 100),
        star3Score: Number(editingGameLevel.star3Score || 90),
      });
      setLevels((prev) =>
        prev.map((lvl) =>
          lvl.levelNumber === editingGameLevel.levelNumber ? { ...lvl, ...editingGameLevel } : lvl
        )
      );
      setEditingGameLevel(null);
    } catch (err) {
      alert('Failed to update game level: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // VOCABULARY CRUD HANDLERS
  // ==========================================
  const handleSaveVocab = async (e) => {
    e.preventDefault();
    if (!editingVocab) return;
    setSaving(true);
    try {
      const updated = await adminApi.updateVocabulary(editingVocab._id, editingVocab);
      setVocabulary((prev) => prev.map((v) => (v._id === editingVocab._id ? updated : v)));
      setEditingVocab(null);
    } catch (err) {
      alert('Failed to update vocabulary: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateVocab = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await adminApi.createVocabulary({
        ...newVocab,
        word: newVocab.word.toLowerCase().trim(),
        caughtInTheWild: {
          quote: `“That new track with ${newVocab.word} is pure heat 🔥”`,
          context: 'Social commentary',
        },
      });
      setVocabulary((prev) => [created, ...prev]);
      setShowAddModal(false);
      setNewVocab({
        word: '',
        meaning: '',
        phonetic: '',
        category: 'internet',
        tone: 'Casual',
        formality: 3,
        energy: 7,
        commonness: 8,
        isSlang: true,
        examples: [''],
        hindiMeaning: '',
        dontUseIn: 'Formal documents',
      });
    } catch (err) {
      alert('Failed to create vocabulary: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVocab = async (id) => {
    if (!window.confirm('Delete this vocabulary item?')) return;
    try {
      await adminApi.deleteVocabulary(id);
      setVocabulary((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert('Failed to delete vocabulary: ' + err.message);
    }
  };

  // ==========================================
  // SPEAKING SCENARIO CRUD HANDLERS
  // ==========================================
  const handleSaveSpeaking = async (e) => {
    e.preventDefault();
    if (!editingSpeaking) return;
    setSaving(true);
    try {
      const updated = await adminApi.updateSpeakingScenario(editingSpeaking._id, editingSpeaking);
      setScenarios((prev) => prev.map((s) => (s._id === editingSpeaking._id ? updated : s)));
      setEditingSpeaking(null);
    } catch (err) {
      alert('Failed to update speaking topic: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSpeaking = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const scenarioId = `scenario_${Date.now()}`;
      const created = await adminApi.createSpeakingScenario({
        ...newSpeaking,
        scenarioId,
      });
      setScenarios((prev) => [created, ...prev]);
      setShowAddModal(false);
      setNewSpeaking({
        title: '',
        category: 'Café',
        emoji: '🎙️',
        difficulty: 'beginner',
        context: '',
        starterPrompt: '',
        firstBotMessage: '',
        objectives: ['Order food or drink naturally'],
      });
    } catch (err) {
      alert('Failed to create speaking topic: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSpeaking = async (id) => {
    if (!window.confirm('Delete this speaking topic?')) return;
    try {
      await adminApi.deleteSpeakingScenario(id);
      setScenarios((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert('Failed to delete speaking topic: ' + err.message);
    }
  };

  // ==========================================
  // READING STORY CRUD HANDLERS
  // ==========================================
  const handleSaveReading = async (e) => {
    e.preventDefault();
    if (!editingReading) return;
    setSaving(true);
    try {
      const updated = await adminApi.updateReading(editingReading._id, editingReading);
      setReadings((prev) => prev.map((r) => (r._id === editingReading._id ? updated : r)));
      setEditingReading(null);
    } catch (err) {
      alert('Failed to update story: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateReading = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await adminApi.createReading(newReading);
      setReadings((prev) => [created, ...prev]);
      setShowAddModal(false);
      setNewReading({
        title: '',
        type: 'chat_story',
        category: 'social',
        difficulty: 'beginner',
        estimatedTime: '5 min read',
        summary: '',
        content: '',
      });
    } catch (err) {
      alert('Failed to create story: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReading = async (id) => {
    if (!window.confirm('Delete this reading passage?')) return;
    try {
      await adminApi.deleteReading(id);
      setReadings((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert('Failed to delete story: ' + err.message);
    }
  };

  // ==========================================
  // WRITING PROMPT CRUD HANDLERS
  // ==========================================
  const handleSaveWriting = async (e) => {
    e.preventDefault();
    if (!editingWriting) return;
    setSaving(true);
    try {
      const updated = await adminApi.updateWritingPrompt(editingWriting._id, editingWriting);
      setPrompts((prev) => prev.map((p) => (p._id === editingWriting._id ? updated : p)));
      setEditingWriting(null);
    } catch (err) {
      alert('Failed to update writing prompt: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateWriting = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await adminApi.createWritingPrompt(newWriting);
      setPrompts((prev) => [created, ...prev]);
      setShowAddModal(false);
      setNewWriting({
        title: '',
        category: 'Tell a story',
        difficulty: 'beginner',
        targetLength: 'Up to 300 words',
        prompt: '',
        situationContext: '',
      });
    } catch (err) {
      alert('Failed to create writing prompt: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteWriting = async (id) => {
    if (!window.confirm('Delete this writing prompt?')) return;
    try {
      await adminApi.deleteWritingPrompt(id);
      setPrompts((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert('Failed to delete writing prompt: ' + err.message);
    }
  };

  // The 5 Core Sections matching the learner navigation
  const curriculumSections = [
    { id: 'game', label: 'Game', icon: Gamepad2, count: levels.length, color: 'text-amber-400' },
    { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen, count: totalVocab || vocabulary.length, color: 'text-purple-400' },
    { id: 'speaking', label: 'Speaking', icon: Mic, count: scenarios.length, color: 'text-cyan-400' },
    { id: 'reading', label: 'Reading', icon: FileText, count: readings.length, color: 'text-rose-400' },
    { id: 'writing', label: 'Writing', icon: PenTool, count: prompts.length, color: 'text-lime-400' },
  ];

  return (
    <div className="space-y-6 p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>CURRICULUM & MODULE OPS</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold">
              Live Database Connected
            </span>
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Manage, customize, and edit the 5 core learning tracks: Game, Vocabulary, Speaking, Reading, and Writing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-zinc-300 transition cursor-pointer"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {activeTab !== 'game' && (
            <button
              onClick={() => {
                setAddType(activeTab);
                setShowAddModal(true);
              }}
              className="px-4 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-2xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
            </button>
          )}

          {activeTab === 'game' && (
            <Link
              to="/admin/game-world"
              className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-2xl transition flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Challenge Designer</span>
            </Link>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5-PILLAR CAPSULE NAVIGATION BAR (Matches Learner App Navigation Exactly)    */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 p-1.5 bg-[#111116] rounded-2xl border border-white/10 w-fit shadow-xl flex-wrap">
        {curriculumSections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeTab === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleTabChange(sec.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer
                ${
                  isActive
                    ? 'bg-[#1E1E28] text-white shadow-md border border-white/15'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? sec.color : 'text-zinc-500'}`} />
              <span>{sec.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-white/5 text-zinc-400">
                {sec.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. GAME SECTION (30-LEVEL MAP)                                            */}
      {/* ========================================================================= */}
      {activeTab === 'game' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Showing all 30 Adventure Map Levels across 3 Worlds</span>
            <span className="font-mono text-amber-400 font-bold">Requirement: 3-Stars to Advance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((lvl) => (
              <div
                key={lvl.levelNumber}
                className="p-5 bg-[#111115] rounded-3xl border border-white/8 space-y-3 relative group hover:border-amber-500/40 transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                      Level {String(lvl.levelNumber).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {lvl.challengeCount || 5} Challenges
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{lvl.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-1">{lvl.topic || 'General Adventure'}</p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span>Pass: {lvl.passPercentage || 80}%</span>
                    <span>XP: +{lvl.rewardXP || 100}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>3★ Threshold: {lvl.star3Score || 90}%</span>
                  </span>
                  <button
                    onClick={() => setEditingGameLevel(lvl)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VOCABULARY SECTION (500 WORDS)                                         */}
      {/* ========================================================================= */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search words, meanings, or hindi..."
                className="w-full pl-9 pr-4 py-2 bg-[#111116] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500"
              />
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              Total {totalVocab || vocabulary.length} Words in Database
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/8 bg-[#111113]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#18181B] text-[#A1A1AA] uppercase tracking-wider font-mono text-[10px] border-b border-white/5">
                <tr>
                  <th className="p-4">Word</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Tone & DNA</th>
                  <th className="p-4">Meaning</th>
                  <th className="p-4">Hindi / मतलब</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#E4E4E7]">
                {vocabulary.map((v) => (
                  <tr key={v._id} className="hover:bg-white/2 transition">
                    <td className="p-4 font-bold text-white font-mono text-sm">
                      {v.word}
                      {v.phonetic && (
                        <span className="text-[10px] text-zinc-500 block font-normal font-sans">
                          {v.phonetic}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-medium uppercase text-[#A78BFA]">
                        {v.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-zinc-300 font-medium block">{v.tone}</span>
                      <span className="text-[10px] text-[#71717A] font-mono">
                        F:{v.formality || 3}/10 E:{v.energy || 7}/10
                      </span>
                    </td>
                    <td className="p-4 max-w-xs truncate text-[#A1A1AA]">{v.meaning}</td>
                    <td className="p-4 text-[#FB923C] font-medium">{v.hindiMeaning || '—'}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingVocab(v)}
                          className="p-1.5 text-zinc-400 hover:text-purple-400 transition cursor-pointer"
                          title="Edit word"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVocab(v._id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                          title="Delete word"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SPEAKING SECTION (SCENARIOS & TOPICS)                                  */}
      {/* ========================================================================= */}
      {activeTab === 'speaking' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Showing all Voice Practice Scenarios & Topics</span>
            <span className="font-mono text-cyan-400 font-bold">{scenarios.length} Topics Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s) => (
              <div
                key={s._id}
                className="p-5 bg-[#111115] rounded-3xl border border-white/8 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl select-none">{s.emoji || '🎙️'}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        {s.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {s.difficulty || 'beginner'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{s.context || s.starterPrompt}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingSpeaking(s)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteSpeaking(s._id)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                    title="Delete topic"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. READING SECTION (STORIES & PASSAGES)                                   */}
      {/* ========================================================================= */}
      {activeTab === 'reading' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Showing all Reading Passages & Comprehension Stories</span>
            <span className="font-mono text-rose-400 font-bold">{readings.length} Stories Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readings.map((r) => (
              <div
                key={r._id}
                className="p-5 bg-[#111115] rounded-3xl border border-white/8 space-y-3 flex flex-col justify-between hover:border-rose-500/40 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-rose-400 uppercase bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                      {r.category || 'Story'}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {r.estimatedTime || '5 min read'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{r.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {r.summary || r.content?.slice(0, 100) || 'Reading passage content...'}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingReading(r)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteReading(r._id)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                    title="Delete reading"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. WRITING SECTION (PROMPTS & TASKS)                                      */}
      {/* ========================================================================= */}
      {activeTab === 'writing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Showing all Natural Writing Prompts & Assignments</span>
            <span className="font-mono text-lime-400 font-bold">{prompts.length} Prompts Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((p) => (
              <div
                key={p._id}
                className="p-5 bg-[#111115] rounded-3xl border border-white/8 space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-lime-400 uppercase bg-lime-500/10 px-2.5 py-0.5 rounded-full border border-lime-500/20">
                      {p.category}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {p.targetLength || 'Up to 300 words'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{p.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{p.prompt}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingWriting(p)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-lime-500/20 text-zinc-300 hover:text-lime-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteWriting(p._id)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                    title="Delete prompt"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL: GAME LEVEL                                                    */}
      {/* ========================================================================= */}
      {editingGameLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-[#111115] border border-white/10 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span>Edit Game Level {editingGameLevel.levelNumber}</span>
              </h3>
              <button
                onClick={() => setEditingGameLevel(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGameLevel} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400">Level Title</label>
                <input
                  type="text"
                  value={editingGameLevel.title || ''}
                  onChange={(e) =>
                    setEditingGameLevel({ ...editingGameLevel, title: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Topic / Core Focus</label>
                <input
                  type="text"
                  value={editingGameLevel.topic || ''}
                  onChange={(e) =>
                    setEditingGameLevel({ ...editingGameLevel, topic: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Pass %</label>
                  <input
                    type="number"
                    value={editingGameLevel.passPercentage || 80}
                    onChange={(e) =>
                      setEditingGameLevel({ ...editingGameLevel, passPercentage: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Reward XP</label>
                  <input
                    type="number"
                    value={editingGameLevel.rewardXP || 100}
                    onChange={(e) =>
                      setEditingGameLevel({ ...editingGameLevel, rewardXP: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">3-Star Threshold</label>
                  <input
                    type="number"
                    value={editingGameLevel.star3Score || 90}
                    onChange={(e) =>
                      setEditingGameLevel({ ...editingGameLevel, star3Score: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingGameLevel(null)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL: VOCABULARY                                                    */}
      {/* ========================================================================= */}
      {editingVocab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-[#111115] border border-white/10 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Edit Word: {editingVocab.word}</span>
              </h3>
              <button
                onClick={() => setEditingVocab(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVocab} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400">Word / Expression</label>
                <input
                  type="text"
                  value={editingVocab.word || ''}
                  onChange={(e) => setEditingVocab({ ...editingVocab, word: e.target.value })}
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Phonetic</label>
                <input
                  type="text"
                  value={editingVocab.phonetic || ''}
                  onChange={(e) => setEditingVocab({ ...editingVocab, phonetic: e.target.value })}
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Meaning</label>
                <textarea
                  rows={2}
                  value={editingVocab.meaning || ''}
                  onChange={(e) => setEditingVocab({ ...editingVocab, meaning: e.target.value })}
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Category</label>
                  <input
                    type="text"
                    value={editingVocab.category || ''}
                    onChange={(e) => setEditingVocab({ ...editingVocab, category: e.target.value })}
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Tone</label>
                  <input
                    type="text"
                    value={editingVocab.tone || ''}
                    onChange={(e) => setEditingVocab({ ...editingVocab, tone: e.target.value })}
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Hindi Meaning (मतलब)</label>
                <input
                  type="text"
                  value={editingVocab.hindiMeaning || ''}
                  onChange={(e) => setEditingVocab({ ...editingVocab, hindiMeaning: e.target.value })}
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingVocab(null)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL: SPEAKING                                                      */}
      {/* ========================================================================= */}
      {editingSpeaking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-[#111115] border border-white/10 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-cyan-400" />
                <span>Edit Speaking Topic</span>
              </h3>
              <button
                onClick={() => setEditingSpeaking(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSpeaking} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400">Topic Title</label>
                <input
                  type="text"
                  value={editingSpeaking.title || ''}
                  onChange={(e) =>
                    setEditingSpeaking({ ...editingSpeaking, title: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Emoji</label>
                  <input
                    type="text"
                    value={editingSpeaking.emoji || '🎙️'}
                    onChange={(e) =>
                      setEditingSpeaking({ ...editingSpeaking, emoji: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Category</label>
                  <input
                    type="text"
                    value={editingSpeaking.category || ''}
                    onChange={(e) =>
                      setEditingSpeaking({ ...editingSpeaking, category: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Difficulty</label>
                  <select
                    value={editingSpeaking.difficulty || 'beginner'}
                    onChange={(e) =>
                      setEditingSpeaking({ ...editingSpeaking, difficulty: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Context / Explanation</label>
                <textarea
                  rows={2}
                  value={editingSpeaking.context || ''}
                  onChange={(e) =>
                    setEditingSpeaking({ ...editingSpeaking, context: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Starter Prompt</label>
                <input
                  type="text"
                  value={editingSpeaking.starterPrompt || ''}
                  onChange={(e) =>
                    setEditingSpeaking({ ...editingSpeaking, starterPrompt: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingSpeaking(null)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL: READING                                                       */}
      {/* ========================================================================= */}
      {editingReading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-[#111115] border border-white/10 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-400" />
                <span>Edit Reading Story</span>
              </h3>
              <button
                onClick={() => setEditingReading(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReading} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400">Story Title</label>
                <input
                  type="text"
                  value={editingReading.title || ''}
                  onChange={(e) =>
                    setEditingReading({ ...editingReading, title: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Category</label>
                  <input
                    type="text"
                    value={editingReading.category || ''}
                    onChange={(e) =>
                      setEditingReading({ ...editingReading, category: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Estimated Time</label>
                  <input
                    type="text"
                    value={editingReading.estimatedTime || '5 min read'}
                    onChange={(e) =>
                      setEditingReading({ ...editingReading, estimatedTime: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Difficulty</label>
                  <select
                    value={editingReading.difficulty || 'beginner'}
                    onChange={(e) =>
                      setEditingReading({ ...editingReading, difficulty: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Summary / Teaser</label>
                <textarea
                  rows={2}
                  value={editingReading.summary || ''}
                  onChange={(e) =>
                    setEditingReading({ ...editingReading, summary: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Story Passage Text</label>
                <textarea
                  rows={4}
                  value={editingReading.content || ''}
                  onChange={(e) =>
                    setEditingReading({ ...editingReading, content: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white font-serif leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingReading(null)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL: WRITING                                                       */}
      {/* ========================================================================= */}
      {editingWriting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-[#111115] border border-white/10 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PenTool className="w-4 h-4 text-lime-400" />
                <span>Edit Writing Prompt</span>
              </h3>
              <button
                onClick={() => setEditingWriting(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWriting} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400">Prompt Title</label>
                <input
                  type="text"
                  value={editingWriting.title || ''}
                  onChange={(e) =>
                    setEditingWriting({ ...editingWriting, title: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Category</label>
                  <input
                    type="text"
                    value={editingWriting.category || ''}
                    onChange={(e) =>
                      setEditingWriting({ ...editingWriting, category: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Target Length</label>
                  <input
                    type="text"
                    value={editingWriting.targetLength || 'Up to 300 words'}
                    onChange={(e) =>
                      setEditingWriting({ ...editingWriting, targetLength: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Prompt Instructions</label>
                <textarea
                  rows={3}
                  value={editingWriting.prompt || ''}
                  onChange={(e) =>
                    setEditingWriting({ ...editingWriting, prompt: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400">Situation Context</label>
                <input
                  type="text"
                  value={editingWriting.situationContext || ''}
                  onChange={(e) =>
                    setEditingWriting({ ...editingWriting, situationContext: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingWriting(null)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-black font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GENERIC ADD MODAL FOR VOCABULARY, SPEAKING, READING, WRITING               */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-[#111115] border border-white/10 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold text-white capitalize">
                Add New {addType} Entry
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ADD VOCABULARY FORM */}
            {addType === 'vocabulary' && (
              <form onSubmit={handleCreateVocab} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Word / Expression</label>
                  <input
                    type="text"
                    value={newVocab.word}
                    onChange={(e) => setNewVocab({ ...newVocab, word: e.target.value })}
                    placeholder="e.g. delulu, rizz, touch grass"
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Meaning</label>
                  <textarea
                    rows={2}
                    value={newVocab.meaning}
                    onChange={(e) => setNewVocab({ ...newVocab, meaning: e.target.value })}
                    placeholder="Clear contextual definition..."
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Category</label>
                    <select
                      value={newVocab.category}
                      onChange={(e) => setNewVocab({ ...newVocab, category: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    >
                      <option value="internet">Internet Slang</option>
                      <option value="casual">Casual / Social</option>
                      <option value="work">Work & Career</option>
                      <option value="gaming">Gaming</option>
                      <option value="travel">Travel</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Tone</label>
                    <input
                      type="text"
                      value={newVocab.tone}
                      onChange={(e) => setNewVocab({ ...newVocab, tone: e.target.value })}
                      placeholder="e.g. Playful"
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Hindi Meaning (मतलब)</label>
                  <input
                    type="text"
                    value={newVocab.hindiMeaning}
                    onChange={(e) => setNewVocab({ ...newVocab, hindiMeaning: e.target.value })}
                    placeholder="Hindi meaning..."
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl"
                  >
                    {saving ? 'Creating...' : 'Create Word'}
                  </button>
                </div>
              </form>
            )}

            {/* ADD SPEAKING FORM */}
            {addType === 'speaking' && (
              <form onSubmit={handleCreateSpeaking} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Topic Title</label>
                  <input
                    type="text"
                    value={newSpeaking.title}
                    onChange={(e) => setNewSpeaking({ ...newSpeaking, title: e.target.value })}
                    placeholder="e.g. Coffee & Morning Routine"
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Emoji</label>
                    <input
                      type="text"
                      value={newSpeaking.emoji}
                      onChange={(e) => setNewSpeaking({ ...newSpeaking, emoji: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Difficulty</label>
                    <select
                      value={newSpeaking.difficulty}
                      onChange={(e) => setNewSpeaking({ ...newSpeaking, difficulty: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Context Prompt</label>
                  <textarea
                    rows={2}
                    value={newSpeaking.context}
                    onChange={(e) => setNewSpeaking({ ...newSpeaking, context: e.target.value })}
                    placeholder="Scenario context..."
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-cyan-500 text-black text-xs font-bold rounded-xl"
                  >
                    {saving ? 'Creating...' : 'Create Topic'}
                  </button>
                </div>
              </form>
            )}

            {/* ADD READING FORM */}
            {addType === 'reading' && (
              <form onSubmit={handleCreateReading} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Story Title</label>
                  <input
                    type="text"
                    value={newReading.title}
                    onChange={(e) => setNewReading({ ...newReading, title: e.target.value })}
                    placeholder="e.g. The Cold Friday Diner"
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Category</label>
                    <input
                      type="text"
                      value={newReading.category}
                      onChange={(e) => setNewReading({ ...newReading, category: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Difficulty</label>
                    <select
                      value={newReading.difficulty}
                      onChange={(e) => setNewReading({ ...newReading, difficulty: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Story Passage Content</label>
                  <textarea
                    rows={3}
                    value={newReading.content}
                    onChange={(e) => setNewReading({ ...newReading, content: e.target.value })}
                    placeholder="Paragraph text..."
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl"
                  >
                    {saving ? 'Creating...' : 'Create Story'}
                  </button>
                </div>
              </form>
            )}

            {/* ADD WRITING FORM */}
            {addType === 'writing' && (
              <form onSubmit={handleCreateWriting} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Prompt Title</label>
                  <input
                    type="text"
                    value={newWriting.title}
                    onChange={(e) => setNewWriting({ ...newWriting, title: e.target.value })}
                    placeholder="e.g. My Favorite Neighborhood Street Food"
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Category</label>
                    <input
                      type="text"
                      value={newWriting.category}
                      onChange={(e) => setNewWriting({ ...newWriting, category: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400">Target Length</label>
                    <input
                      type="text"
                      value={newWriting.targetLength}
                      onChange={(e) => setNewWriting({ ...newWriting, targetLength: e.target.value })}
                      className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400">Prompt Text</label>
                  <textarea
                    rows={2}
                    value={newWriting.prompt}
                    onChange={(e) => setNewWriting({ ...newWriting, prompt: e.target.value })}
                    placeholder="Describe what the student should write about..."
                    className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-lime-500 text-black text-xs font-bold rounded-xl"
                  >
                    {saving ? 'Creating...' : 'Create Prompt'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
