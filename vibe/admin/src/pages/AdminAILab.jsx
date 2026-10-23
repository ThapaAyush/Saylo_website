import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';
import { Bot, Sparkles, Send, Check, Play, Settings2, Sliders, ShieldAlert } from 'lucide-react';

export const AdminAILab = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [systemPromptDraft, setSystemPromptDraft] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // AI Content Generator state
  const [genContentType, setGenContentType] = useState('vocabulary');
  const [genTopic, setGenTopic] = useState('rizz');
  const [genTone, setGenTone] = useState('Casual Gen-Z');
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(false);

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const data = await adminApi.getAICharacters();
        setCharacters(data || []);
        if (data?.length > 0) {
          setSelectedChar(data[0]);
          setSystemPromptDraft(data[0].systemPrompt);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChars();
  }, []);

  const handleSelectChar = (c) => {
    setSelectedChar(c);
    setSystemPromptDraft(c.systemPrompt);
    setSaveSuccess(false);
  };

  const handleSavePrompt = async () => {
    if (!selectedChar) return;
    try {
      await adminApi.updateAICharacter(selectedChar._id, {
        systemPrompt: systemPromptDraft,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateContent = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setPublishSuccess(false);
    try {
      const res = await adminApi.generateAIContent(genContentType, genTopic, genTone);
      setGeneratedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleApprovePublish = async () => {
    if (!generatedResult) return;
    try {
      if (genContentType === 'vocabulary') {
        await adminApi.createVocabulary(generatedResult);
      } else {
        await adminApi.createReading(generatedResult);
      }
      setPublishSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>AI LAB & CHARACTER OPS</span>
          <span className="text-xl">🧪</span>
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Tune conversational persona prompts, guardrails, and generate supervised learning drops.
        </p>
      </div>

      {/* Grid: Character prompt editor on left, AI Generator on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHARACTER PERSONA CONFIG */}
        <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#8B5CF6]" />
              <span>Persona System Prompts</span>
            </h2>
            <span className="text-xs text-[#A1A1AA]">6 Active Personalities</span>
          </div>

          {/* Character selector pills */}
          <div className="flex flex-wrap gap-2">
            {characters.map(c => (
              <button
                key={c._id}
                onClick={() => handleSelectChar(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border ${selectedChar?._id === c._id ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]' : 'bg-[#18181B] text-[#A1A1AA] border-white/5 hover:text-white'}`}
              >
                <span>{c.avatar}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          {selectedChar && (
            <div className="space-y-4 pt-2">
              <div className="p-3.5 bg-black/40 rounded-2xl border border-white/5 text-xs text-[#A1A1AA] space-y-1">
                <p><strong className="text-white">Role:</strong> {selectedChar.role}</p>
                <p><strong className="text-white">Tone:</strong> {selectedChar.speakingStyle}</p>
                <p><strong className="text-white">Preferred Scenarios:</strong> {selectedChar.scenarioPreferences?.join(', ')}</p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider block mb-1">
                  Active System Prompt:
                </label>
                <textarea
                  rows={8}
                  value={systemPromptDraft}
                  onChange={(e) => setSystemPromptDraft(e.target.value)}
                  className="w-full p-4 bg-[#18181B] border border-white/10 rounded-2xl text-xs font-mono text-[#F5F5F5] leading-relaxed focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-emerald-400 font-semibold">
                  {saveSuccess && 'System prompt updated! ✓'}
                </span>
                <button
                  onClick={handleSavePrompt}
                  className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Save Prompt
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI CONTENT GENERATOR & APPROVAL QUEUE */}
        <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
              <span>AI Content Synthesis & Approval</span>
            </h2>
            <span className="text-xs text-[#22D3EE] font-mono">Sandbox</span>
          </div>

          <form onSubmit={handleGenerateContent} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#A1A1AA]">Content Format</label>
                <select
                  value={genContentType}
                  onChange={(e) => setGenContentType(e.target.value)}
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                >
                  <option value="vocabulary">Vocabulary Item</option>
                  <option value="reading">Chat Story</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#A1A1AA]">Tone</label>
                <select
                  value={genTone}
                  onChange={(e) => setGenTone(e.target.value)}
                  className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                >
                  <option value="Casual Gen-Z">Casual Gen-Z</option>
                  <option value="Corporate Tech">Corporate Tech</option>
                  <option value="Street Slang">Street Slang</option>
                  <option value="Travel Practical">Travel Practical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#A1A1AA]">Topic / Keyword Target</label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                placeholder="e.g. rizz, late night gaming, job offer negotiation..."
                className="w-full p-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-2.5 bg-[#22D3EE] hover:bg-[#06B6D4] text-black font-bold text-xs rounded-xl transition cursor-pointer"
            >
              {generating ? 'Synthesizing...' : 'Generate Preview →'}
            </button>
          </form>

          {/* Generated Content Preview & Approval */}
          {generatedResult && (
            <div className="p-4 bg-black/50 rounded-2xl border border-white/10 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Generated Draft</span>
                <span className="text-[10px] text-[#A1A1AA] uppercase">Requires Admin Approval</span>
              </div>

              <pre className="text-[11px] font-mono text-[#D4D4D8] bg-[#18181B] p-3 rounded-xl overflow-x-auto max-h-48 border border-white/5">
                {JSON.stringify(generatedResult, null, 2)}
              </pre>

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-emerald-400 font-semibold">
                  {publishSuccess && 'Published live to Learner App! 🎉'}
                </span>
                <button
                  onClick={handleApprovePublish}
                  disabled={publishSuccess}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  {publishSuccess ? 'Live in App ✓' : 'Approve & Publish Live →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
