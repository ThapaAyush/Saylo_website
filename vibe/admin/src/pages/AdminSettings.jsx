import React, { useState } from 'react';
import { Sliders, Shield, Key, Bell, Check } from 'lucide-react';

export const AdminSettings = () => {
  const [provider, setProvider] = useState('mock');
  const [bilingualDefault, setBilingualDefault] = useState('hindi');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>PRODUCT CONFIGURATION</span>
          <span className="text-xl">⚙️</span>
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          AI engine providers, language bridges, and production flags.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Provider Engine */}
        <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-[#8B5CF6]" />
            <span>AI Orchestration Engine</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#A1A1AA] block mb-1">
                Active Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full p-3 bg-[#18181B] border border-white/10 rounded-2xl text-xs text-white"
              >
                <option value="mock">Built-in Mock AI Provider (Fast, zero-latency, realistic)</option>
                <option value="gemini">Google Gemini 1.5 Flash (via Backend API Key)</option>
              </select>
            </div>

            <p className="text-xs text-[#71717A]">
              API keys are safely isolated inside backend environment variables and never exposed to client browsers.
            </p>
          </div>
        </div>

        {/* Bilingual Bridge Configuration */}
        <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#22D3EE]" />
            <span>Bilingual Scaffolding Support</span>
          </h2>

          <div>
            <label className="text-xs font-bold text-[#A1A1AA] block mb-1">
              Primary Regional Assistance Language
            </label>
            <select
              value={bilingualDefault}
              onChange={(e) => setBilingualDefault(e.target.value)}
              className="w-full p-3 bg-[#18181B] border border-white/10 rounded-2xl text-xs text-white"
            >
              <option value="hindi">Hindi (हिंदी - मतलब / उदाहरण)</option>
              <option value="none">English Only (Immersion Mode)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-emerald-400 font-semibold">
            {saved && 'Settings applied successfully! ✓'}
          </span>
          <button
            type="submit"
            className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-2xl transition cursor-pointer shadow-lg shadow-purple-500/20"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
