import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Chip } from '../components/ui/Chip';
import { SameThoughtVibes } from '../features/writing/SameThoughtVibes';
import { WritingFeedbackBox } from '../features/writing/WritingFeedbackBox';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  PenTool,
  Sparkles,
  Send,
  Share2,
  RefreshCw,
  Lightbulb,
  CheckCircle,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Create = () => {
  const { user, profile, gainXp } = useAuth();
  const [activeTab, setActiveTab] = useState('prompts'); // 'prompts', 'remix_vibes'
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [userText, setUserText] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [shareToFeed, setShareToFeed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'All',
    'Text someone',
    'Caption this',
    'Hot take',
    'Continue the story',
    'Make it funnier',
    'Make it professional',
    'Explain this',
    'Reply to a message'
  ];
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await api.getWritingPrompts({
          category: activeCategory === 'All' ? 'all' : activeCategory,
        });
        setPrompts(data || []);
        if (data?.length > 0 && !selectedPrompt) {
          setSelectedPrompt(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrompts();
  }, [activeCategory]);

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!userText.trim()) return;

    setEvaluating(true);
    try {
      const res = await api.getWritingFeedback(userText, selectedPrompt?.prompt || '');
      setFeedback(res);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleSubmit = async () => {
    if (!userText.trim()) return;

    try {
      await api.submitWriting({
        promptId: selectedPrompt?._id,
        originalText: userText,
        selectedVibe: 'Casual',
        feedback,
        postToFeed: shareToFeed,
      });
      setSubmitted(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
            CREATE & EXPRESS
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Use English to message, caption, debate, and transform your tone.
          </p>
        </div>

        {/* Feature switcher tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111113] rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'prompts' ? 'bg-[#8B5CF6] text-white' : 'text-[#A1A1AA] hover:text-white'}`}
          >
            ✍️ Creative Prompts
          </button>
          <button
            onClick={() => setActiveTab('remix_vibes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'remix_vibes' ? 'bg-[#8B5CF6] text-white' : 'text-[#A1A1AA] hover:text-white'}`}
          >
            🎭 Same Thought, Different Vibes
          </button>
        </div>
      </div>

      {activeTab === 'remix_vibes' ? (
        <SameThoughtVibes />
      ) : (
        <div className="space-y-6">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c) => (
              <Chip
                key={c}
                active={activeCategory === c}
                variant="purple"
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </Chip>
            ))}
          </div>

          {/* Active Prompt Workspace Card */}
          {selectedPrompt && (
            <Card className="bg-[#09090B] border border-white/10 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="xs">
                  {selectedPrompt.category}
                </Badge>
                <span className="text-xs text-[#A1A1AA]">
                  Target: {selectedPrompt.targetLength || '1-3 sentences'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1.5">
                  {selectedPrompt.title}
                </h3>
                <p className="text-sm text-[#D4D4D8] leading-relaxed">
                  {selectedPrompt.prompt}
                </p>
              </div>

              {selectedPrompt.sampleIncomingText && (
                <div className="p-3.5 bg-[#18181F] rounded-2xl border border-white/5 text-xs text-[#A1A1AA] flex items-start gap-2">
                  <span className="text-base">💬</span>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Incoming text to reply to:</span>
                    "{selectedPrompt.sampleIncomingText}"
                  </div>
                </div>
              )}

              {/* Writing Input */}
              <form onSubmit={handleEvaluate} className="space-y-3 pt-2">
                <textarea
                  rows={4}
                  value={userText}
                  onChange={(e) => {
                    setUserText(e.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="Draft your response here... Write naturally like you would in a real text or post."
                  className="w-full p-4 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-xs text-[#A1A1AA] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shareToFeed}
                      onChange={(e) => setShareToFeed(e.target.checked)}
                      className="rounded border-white/20 text-[#8B5CF6] focus:ring-0"
                    />
                    <span>Share response to Community Feed</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={evaluating || !userText.trim()}
                    >
                      {evaluating ? 'Analyzing Vibe...' : 'Get Feedback →'}
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={handleSubmit}
                      disabled={submitted || !userText.trim()}
                      icon={Share2}
                    >
                      {submitted ? 'Saved ✓' : 'Save & Post'}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* AI Pedagogical Feedback Box */}
          {feedback && (
            <WritingFeedbackBox
              feedback={feedback}
              onReset={() => setFeedback(null)}
            />
          )}

          {/* Quick Prompts Selector Carousel / Grid */}
          <div className="space-y-3 pt-4">
            <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
              More Creative Scenarios
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {prompts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => {
                    setSelectedPrompt(p);
                    setFeedback(null);
                    setUserText('');
                    setSubmitted(false);
                  }}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between
                    ${selectedPrompt?._id === p._id ? 'bg-[#18181F] border-[#8B5CF6]' : 'bg-[#111113] hover:bg-[#18181B] border-white/5'}
                  `}
                >
                  <span className="text-[10px] font-bold text-[#A78BFA] uppercase block mb-1">
                    {p.category}
                  </span>
                  <h5 className="text-sm font-bold text-white line-clamp-1 mb-1">
                    {p.title}
                  </h5>
                  <p className="text-xs text-[#A1A1AA] line-clamp-2">
                    {p.prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
