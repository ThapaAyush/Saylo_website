import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Chip } from '../components/ui/Chip';
import { WordDnaCard } from '../features/vocabulary/WordDnaCard';
import { CaughtInWildCard } from '../features/vocabulary/CaughtInWildCard';
import { StoryCard } from '../features/reading/StoryCard';
import { ChatStoryView } from '../features/reading/ChatStoryView';
import { BranchingStoryView } from '../features/reading/BranchingStoryView';
import { ExplainModal } from '../components/common/ExplainModal';
import { api } from '../services/api';
import {
  BookOpen,
  Sparkles,
  Search,
  Filter,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const Learn = () => {
  const [activeTab, setActiveTab] = useState('vocabulary'); // 'vocabulary', 'reading'
  const [vocabCategory, setVocabCategory] = useState('all');
  const [readingCategory, setReadingCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [vocabulary, setVocabulary] = useState([]);
  const [readings, setReadings] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [explainWord, setExplainWord] = useState('');
  const [loading, setLoading] = useState(true);

  const vocabCategories = [
    { id: 'all', label: 'All Expressions' },
    { id: 'internet', label: 'Internet Slang' },
    { id: 'casual', label: 'Casual / Social' },
    { id: 'work', label: 'Work & Professional' },
    { id: 'gaming', label: 'Gaming Banter' },
    { id: 'travel', label: 'Travel English' },
  ];

  const readingTypes = [
    { id: 'all', label: 'All Stories' },
    { id: 'chat_story', label: 'Chat Stories 💬' },
    { id: 'interactive_story', label: 'Branching Choices 🔀' },
    { id: 'article', label: 'Culture Reads 📖' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vocabRes, readingsRes] = await Promise.all([
          api.getVocabulary({ category: vocabCategory, search: searchQuery, limit: 30 }),
          api.getReadings({ type: readingCategory }),
        ]);
        setVocabulary(vocabRes.items || []);
        setReadings(readingsRes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vocabCategory, readingCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* If an active story is selected, render the dedicated reader view */}
      {activeStory ? (
        <div className="space-y-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveStory(null)}
            icon={ArrowLeft}
            className="text-xs"
          >
            Back to Stories
          </Button>

          {activeStory.type === 'chat_story' ? (
            <ChatStoryView
              story={activeStory}
              onFinish={() => setActiveStory(null)}
              onExplain={(w) => setExplainWord(w)}
            />
          ) : activeStory.type === 'interactive_story' ? (
            <BranchingStoryView
              story={activeStory}
              onFinish={() => setActiveStory(null)}
              onExplain={(w) => setExplainWord(w)}
            />
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <Badge variant="orange" size="xs">CULTURE ESSAY</Badge>
                <h1 className="text-3xl font-black text-white">{activeStory.title}</h1>
                <p className="text-xs text-[#A1A1AA]">{activeStory.estimatedTime}</p>
              </div>

              <div className="p-6 bg-[#111113] border border-white/5 rounded-3xl text-sm leading-relaxed text-[#D4D4D8] whitespace-pre-line space-y-4">
                {activeStory.content}
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={async () => {
                    await api.completeReading(activeStory._id);
                    setActiveStory(null);
                  }}
                >
                  Finished Reading →
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Top Header & Pillar Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
                LEARN IN CONTEXT
              </h1>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Language intuition through natural expression, Word DNA, and stories.
              </p>
            </div>

            {/* Pillar Switch Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#111113] rounded-2xl border border-white/5">
              <button
                onClick={() => setActiveTab('vocabulary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'vocabulary' ? 'bg-[#8B5CF6] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                🧠 Vocabulary & DNA
              </button>
              <button
                onClick={() => setActiveTab('reading')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'reading' ? 'bg-[#8B5CF6] text-white shadow-md' : 'text-[#A1A1AA] hover:text-white'}`}
              >
                📖 Stories & Scenarios
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words, idioms, slang, meanings..."
              className="w-full pl-11 pr-4 py-3 bg-[#111113] border border-white/10 rounded-2xl text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          {/* VOCABULARY TAB */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-6">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {vocabCategories.map((c) => (
                  <Chip
                    key={c.id}
                    active={vocabCategory === c.id}
                    variant="purple"
                    onClick={() => setVocabCategory(c.id)}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>

              {/* Caught in the wild banner */}
              {vocabulary[0] && vocabulary[0].caughtInTheWild && (
                <CaughtInWildCard
                  vocab={vocabulary[0]}
                  onExplain={(w) => setExplainWord(w)}
                />
              )}

              {/* Word DNA Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vocabulary.map((vocab) => (
                  <WordDnaCard
                    key={vocab._id}
                    vocab={vocab}
                    onExplain={(w) => setExplainWord(w)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* READING TAB */}
          {activeTab === 'reading' && (
            <div className="space-y-6">
              {/* Reading type filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {readingTypes.map((t) => (
                  <Chip
                    key={t.id}
                    active={readingCategory === t.id}
                    variant="cyan"
                    onClick={() => setReadingCategory(t.id)}
                  >
                    {t.label}
                  </Chip>
                ))}
              </div>

              {/* Story Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readings.map((story) => (
                  <StoryCard
                    key={story._id}
                    story={story}
                    onSelect={(s) => setActiveStory(s)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Universal Explain modal */}
      {explainWord && (
        <ExplainModal
          isOpen={Boolean(explainWord)}
          onClose={() => setExplainWord('')}
          initialWord={explainWord}
        />
      )}
    </div>
  );
};
