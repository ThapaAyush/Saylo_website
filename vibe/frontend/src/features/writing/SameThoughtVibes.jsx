import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, Copy, Check, Heart, Send } from 'lucide-react';
import { api } from '../../services/api';
export const SameThoughtVibes = ({ initialText = '', onSelectVibe }) => {
  const [inputText, setInputText] = useState(initialText || "I don't want to go.");
  const [loading, setLoading] = useState(false);
  const [vibes, setVibes] = useState([
    { vibe: 'Neutral', text: "I don't want to go." },
    { vibe: 'Casual', text: "I'm not really feeling it rn tbh." },
    { vibe: 'Funny', text: "Yeah... I'm gonna respectfully disappear ✌️💀" },
    { vibe: 'Professional', text: "I'm afraid I won't be able to attend." },
    { vibe: 'Gentle', text: "I don't think I'm up for going today, but thank you!" },
    { vibe: 'Confident', text: "I'm passing on this one. Let's catch up later." },
    { vibe: 'Gen-Z', text: "ngl that's a hard pass for me bro 😭" },
  ]);
  const [selectedVibe, setSelectedVibe] = useState('Casual');
  const [copiedVibe, setCopiedVibe] = useState(null);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const res = await api.generateVibes(inputText);
      if (res.vibes && res.vibes.length > 0) {
        setVibes(res.vibes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, vibeName) => {
    navigator.clipboard.writeText(text);
    setCopiedVibe(vibeName);
    setTimeout(() => setCopiedVibe(null), 2000);
  };

  const handlePickVibe = (v) => {
    setSelectedVibe(v.vibe);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    if (onSelectVibe) onSelectVibe(v);
  };

  const vibeColors = {
    Neutral: 'border-white/10 text-zinc-300',
    Casual: 'border-[#8B5CF6]/40 text-[#A78BFA] bg-[#8B5CF6]/5',
    Funny: 'border-[#FB923C]/40 text-[#FB923C] bg-[#FB923C]/5',
    Professional: 'border-[#22D3EE]/40 text-[#22D3EE] bg-[#22D3EE]/5',
    Gentle: 'border-[#F472B6]/40 text-[#F472B6] bg-[#F472B6]/5',
    Confident: 'border-[#A3E635]/40 text-[#A3E635] bg-[#A3E635]/5',
    'Gen-Z': 'border-purple-400/40 text-purple-300 bg-purple-500/5',
  };

  return (
    <div className="space-y-6">
      {/* Input box */}
      <Card className="p-5 bg-[#09090B] border border-white/10 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
              <span>🎭 Same Thought, Different Vibes</span>
            </span>
            <span className="text-[11px] text-[#A1A1AA]">Type anything below</span>
          </div>
          <p className="text-xs text-[#A1A1AA]">
            See how native speakers express the exact same idea across casual, funny, and professional tones.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. I am tired, Thank you for your help, I am running late..."
            className="flex-1 px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading || !inputText.trim()}
          >
            {loading ? 'Transforming...' : 'Remix Vibes →'}
          </Button>
        </form>
      </Card>

      {/* Vibes Showcase Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
            Which one sounds most like you?
          </h4>
          <span className="text-xs text-[#A78BFA]">Tap heart to lock your voice</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {vibes.map((v) => {
            const isChosen = selectedVibe === v.vibe;
            return (
              <div
                key={v.vibe}
                onClick={() => handlePickVibe(v)}
                className={`
                  p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3
                  ${isChosen ? 'bg-[#18181F] border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/10 scale-[1.01]' : 'bg-[#111113] hover:bg-[#18181B] border-white/5'}
                `}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${vibeColors[v.vibe] || 'border-white/10 text-white'}`}>
                      {v.vibe}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(v.text, v.vibe);
                        }}
                        className="p-1 text-[#71717A] hover:text-white transition"
                        title="Copy text"
                      >
                        {copiedVibe === v.vibe ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePickVibe(v);
                        }}
                        className={`p-1 transition ${isChosen ? 'text-[#EC4899]' : 'text-[#71717A] hover:text-[#EC4899]'}`}
                        title="Pick as my style"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-[#F5F5F5] leading-relaxed">
                    “{v.text}”
                  </p>
                </div>

                {isChosen && (
                  <span className="text-[10px] font-semibold text-[#8B5CF6] flex items-center gap-1">
                    ✓ Your preferred style
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
