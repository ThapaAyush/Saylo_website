import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, MessageCircle, Send, CheckCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';
export const CaughtInWildCard = ({ vocab, onExplain }) => {
  const wild = vocab.caughtInTheWild;
  const [isTryItOpen, setIsTryItOpen] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState(null);

  if (!wild || !wild.quote) return null;

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!userResponse.trim()) return;

    setEvaluating(true);
    try {
      const res = await api.tryItWord(vocab.word, userResponse, wild.context);
      setResult(res);
      if (res.passed) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-[#121215] to-[#18181F] border border-white/10 p-6 relative overflow-hidden">
      {/* Decorative tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="xs">CAUGHT IN THE WILD 🌿</Badge>
          <span className="text-xs text-[#A1A1AA]">{wild.context}</span>
        </div>
        <button
          onClick={() => onExplain(vocab.word)}
          className="text-xs text-[#8B5CF6] hover:text-[#A78BFA] font-semibold transition cursor-pointer"
        >
          Breakdown →
        </button>
      </div>

      {/* Wild Quote */}
      <blockquote className="my-3 text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-tight leading-snug">
        “{wild.quote}”
      </blockquote>

      {/* Quick context info */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-[#A1A1AA] mt-2 mb-5">
        <span>Word: <strong className="text-[#22D3EE] font-mono">{vocab.word}</strong></span>
        <span>•</span>
        <span>Tone: <strong className="text-white">{vocab.tone}</strong></span>
        <span>•</span>
        <span>Best for: <strong className="text-white">Friends & Casual chats</strong></span>
      </div>

      {/* Mini Try-It Interactive Section */}
      {!isTryItOpen ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsTryItOpen(true)}
          className="w-full text-xs"
        >
          Try using it yourself ✨
        </Button>
      ) : (
        <div className="p-4 bg-[#09090B] rounded-2xl border border-white/10 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5 text-xs text-[#D4D4D8]">
            <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/30 flex items-center justify-center shrink-0">
              💬
            </div>
            <div>
              <p className="font-semibold text-white">Friend asks:</p>
              <p className="text-[#A1A1AA] mt-0.5">
                "{wild.miniChallenge?.friendPrompt || `Did you like that yesterday?`}"
              </p>
            </div>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-2">
            <input
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder={`Use "${vocab.word}" in your response...`}
              className="w-full px-3.5 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-xs text-[#F5F5F5] placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
            />

            <div className="flex justify-between items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setUserResponse('');
                  setResult(null);
                  setIsTryItOpen(false);
                }}
                className="text-xs text-[#71717A] hover:text-[#A1A1AA] transition"
              >
                Cancel
              </button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={evaluating || !userResponse.trim()}
                className="text-xs"
              >
                {evaluating ? 'Checking...' : 'Check Vibe →'}
              </Button>
            </div>
          </form>

          {/* Feedback banner */}
          {result && (
            <div className={`p-3 rounded-xl text-xs border ${result.passed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {result.passed ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                <span>{result.passed ? 'Natural Flow! Well done' : 'Almost there!'}</span>
              </div>
              <p>{result.feedback}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
