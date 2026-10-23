import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Chip } from '../components/ui/Chip';
import { ExplainModal } from '../components/common/ExplainModal';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  Flame,
  MessageCircle,
  Heart,
  Share2,
  Sparkles,
  Search,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Discover = () => {
  const { user, profile, gainXp } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [explainWord, setExplainWord] = useState('');
  const [newPostModal, setNewPostModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'internet', label: 'Internet English 💀' },
    { id: 'conversations', label: 'Conversations 💬' },
    { id: 'social', label: 'Social Vibes 🔥' },
    { id: 'work', label: 'Work English 💼' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, vocabRes] = await Promise.all([
          api.getPosts(),
          api.getVocabulary({ featured: true, limit: 10 }),
        ]);
        setPosts(postsRes.posts || []);
        setVocabulary(vocabRes.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReact = async (postId, type) => {
    try {
      const res = await api.reactToPost(postId, type);
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, reactions: res.reactions } : p));
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    try {
      const created = await api.createPost({
        content: newPostText,
        promptTag: 'Community Drop',
        tags: ['Expression', 'EnglishInAction'],
      });
      setPosts(prev => [created, ...prev]);
      setNewPostText('');
      setNewPostModal(false);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">
            DISCOVER
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Real English as it’s used today across chats, memes, and daily life.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setNewPostModal(true)}
          icon={Plus}
          className="text-xs"
        >
          Drop Post
        </Button>
      </div>

      {/* Categories chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <Chip
            key={c.id}
            active={activeCategory === c.id}
            variant="purple"
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label}
          </Chip>
        ))}
      </div>

      {/* Featured Slang Spotlight Breakdown */}
      <Card className="bg-gradient-to-br from-[#181824] via-[#121217] to-[#0A0A0E] border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="cyan" size="xs">INTERNET ENGLISH SPOTLIGHT</Badge>
          <span className="text-xs text-[#A1A1AA]">Trending slang breakdown</span>
        </div>

        <div className="p-4 bg-black/50 rounded-2xl border border-white/5">
          <p className="text-xl sm:text-2xl font-black text-white">
            “bro really thought he <span className="text-[#22D3EE] underline decoration-wavy decoration-[#22D3EE]/50">ate</span> 💀”
          </p>
        </div>

        <div className="p-3.5 bg-white/3 rounded-xl border border-white/5 space-y-1.5 text-xs text-[#D4D4D8]">
          <div className="flex items-center gap-2 font-bold text-white">
            <span>What does "ate" mean here?</span>
          </div>
          <p className="leading-relaxed">
            In modern internet culture, <strong className="text-[#22D3EE]">"ate"</strong> means doing something exceptionally well or looking flawless.
            The joke here is sarcastic: the person <em>thought</em> they looked amazing, but failed hilarious!
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExplainWord('ate')}
            className="text-xs"
          >
            Decode Word DNA →
          </Button>
        </div>
      </Card>

      {/* Infinite-Style Feed of Posts and Community Reactions */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post._id} className="p-5 space-y-4 border-white/8">
            {/* Author bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-sm">
                  {post.authorAvatar || '⚡'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {post.authorDisplayName || post.authorUsername}
                    </span>
                    <span className="text-[10px] text-[#A1A1AA]">@{post.authorUsername}</span>
                  </div>
                  <span className="text-[10px] text-[#A78BFA] font-medium">
                    {post.authorBadge || 'ENGLISH EXPLORER'}
                  </span>
                </div>
              </div>

              {post.promptTag && (
                <Badge variant="outline" size="xs">
                  {post.promptTag}
                </Badge>
              )}
            </div>

            {/* Post Content */}
            <p className="text-base text-[#F5F5F5] font-medium leading-relaxed">
              {post.content}
            </p>

            {/* Highlighted Expression if available */}
            {post.highlightExpression?.phrase && (
              <div
                onClick={() => setExplainWord(post.highlightExpression.phrase)}
                className="p-3 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl text-xs text-[#A1A1AA] flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <span className="font-bold text-[#22D3EE]">
                    Word focus: "{post.highlightExpression.phrase}"
                  </span>
                  <p className="text-[11px] mt-0.5">{post.highlightExpression.meaning}</p>
                </div>
                <span className="text-[11px] text-[#A78BFA] font-semibold">Tap to decode →</span>
              </div>
            )}

            {/* Reactions bar */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {[
                  { type: 'fire', icon: '🔥', count: post.reactions?.fire || 0 },
                  { type: 'skull', icon: '💀', count: post.reactions?.skull || 0 },
                  { type: 'hundred', icon: '💯', count: post.reactions?.hundred || 0 },
                  { type: 'handshake', icon: '🤝', count: post.reactions?.handshake || 0 },
                ].map(r => (
                  <button
                    key={r.type}
                    onClick={() => handleReact(post._id, r.type)}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>{r.icon}</span>
                    <span className="text-[11px]">{r.count}</span>
                  </button>
                ))}
              </div>

              <span className="text-xs text-[#71717A]">
                {post.commentsCount || 0} comments
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* New Post Modal */}
      {newPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 bg-[#111113] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Share English in Action</h3>
            <p className="text-xs text-[#A1A1AA]">
              Post a sentence, funny moment, or new expression you used today.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="e.g. Finally used 'rain check' with my boss today..."
                className="w-full p-3.5 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
              />

              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNewPostModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!newPostText.trim()}
                >
                  Post →
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Word Explanation modal */}
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
