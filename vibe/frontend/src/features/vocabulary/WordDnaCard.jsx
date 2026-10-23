import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Volume2, Bookmark, CheckCircle, Sparkles, AlertOctagon } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
export const WordDnaCard = ({ vocab, onExplain }) => {
  const { speak } = useSpeech();
  const [bookmarked, setBookmarked] = useState(false);
  const [learned, setLearned] = useState(false);

  const handlePronounce = (e) => {
    e.stopPropagation();
    speak(vocab.word);
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      const res = await api.bookmarkWord(vocab._id);
      setBookmarked(res.bookmarked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkLearned = async (e) => {
    e.stopPropagation();
    try {
      await api.learnWord(vocab._id);
      setLearned(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card hoverEffect className="group relative flex flex-col justify-between overflow-hidden">
      {/* Top row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={vocab.isSlang ? 'pink' : 'purple'} size="xs">
              {vocab.category}
            </Badge>
            <span className="text-xs text-[#A1A1AA] font-mono">{vocab.phonetic}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePronounce}
              className="p-1.5 text-[#A1A1AA] hover:text-[#8B5CF6] hover:bg-white/5 rounded-lg transition cursor-pointer"
              title="Pronounce"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-lg transition cursor-pointer ${bookmarked ? 'text-[#22D3EE]' : 'text-[#71717A] hover:text-white'}`}
              title="Save to bookmarks"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Word Title */}
        <div className="mb-2">
          <h3 className="text-2xl font-extrabold text-[#F5F5F5] group-hover:text-white transition tracking-tight">
            {vocab.word}
          </h3>
          <p className="text-xs font-semibold text-[#A78BFA] mt-0.5">{vocab.tone}</p>
        </div>

        {/* Meaning */}
        <p className="text-sm text-[#D4D4D8] leading-relaxed mb-4">
          {vocab.meaning}
        </p>

        {/* Hindi meaning if available */}
        {vocab.hindiMeaning && (
          <div className="p-2.5 mb-4 bg-white/3 rounded-xl border border-white/5 text-xs text-[#FB923C] flex items-baseline gap-2">
            <span className="text-[10px] uppercase font-bold text-[#A1A1AA]">मतलब:</span>
            <span>{vocab.hindiMeaning}</span>
          </div>
        )}

        {/* DNA Scales */}
        <div className="space-y-2 py-3 border-y border-white/5 text-[11px] mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[#A1A1AA]">Formality</span>
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-1.5 rounded-sm ${i < (vocab.formality || 4) ? 'bg-[#8B5CF6]' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A1A1AA]">Energy</span>
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-1.5 rounded-sm ${i < (vocab.energy || 7) ? 'bg-[#EC4899]' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A1A1AA]">Commonness</span>
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-1.5 rounded-sm ${i < (vocab.commonness || 8) ? 'bg-[#22D3EE]' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Don't use in... */}
        {vocab.dontUseIn && (
          <div className="text-[11px] text-[#A1A1AA] flex items-center gap-1.5 mb-4">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Don’t use in: <strong className="text-zinc-300 font-medium">{vocab.dontUseIn}</strong></span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onExplain && onExplain(vocab.word)}
          className="text-xs"
        >
          Decode DNA →
        </Button>

        <Button
          variant={learned ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleMarkLearned}
          disabled={learned}
          className="text-xs"
        >
          {learned ? 'Mastered ✓' : 'Mark Learned +15XP'}
        </Button>
      </div>
    </Card>
  );
};
