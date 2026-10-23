import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, Mic, Volume2, CheckCircle2, RotateCcw } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import confetti from 'canvas-confetti';
export const SpeakingResultsModal = ({ isOpen, onClose, evaluation }) => {
  const { speak } = useSpeech();
  const [practicedFixes, setPracticedFixes] = useState({});

  if (!evaluation) return null;

  const metrics = evaluation.metrics || {
    fluency: 74,
    vocabulary: 82,
    grammar: 68,
    naturalness: 60,
  };

  const handleSayItAgain = (idx, naturalPhrase) => {
    speak(naturalPhrase);
    setPracticedFixes(prev => ({ ...prev, [idx]: true }));
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Speaking Flow Debrief 🎙️"
      subtitle="How your conversational rhythm sounded"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Fluency', val: metrics.fluency, color: '#8B5CF6' },
            { label: 'Vocabulary', val: metrics.vocabulary, color: '#22D3EE' },
            { label: 'Grammar', val: metrics.grammar, color: '#A3E635' },
            { label: 'Naturalness', val: metrics.naturalness, color: '#F472B6' },
          ].map(m => (
            <div
              key={m.label}
              className="p-3 bg-[#18181B] rounded-2xl border border-white/5 text-center flex flex-col justify-between"
            >
              <span className="text-[11px] font-semibold text-[#A1A1AA] uppercase">
                {m.label}
              </span>
              <span
                className="text-2xl font-black font-mono my-1"
                style={{ color: m.color }}
              >
                {m.val}%
              </span>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${m.val}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Fixes Breakdown */}
        {evaluation.quickFixes?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
                ⚡ Quick Fixes (Turn into intuition)
              </h4>
            </div>

            <div className="space-y-3">
              {evaluation.quickFixes.map((fix, idx) => {
                const practiced = practicedFixes[idx];
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#18181F] border border-white/8 rounded-2xl space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-red-400">
                        <span className="text-[10px] uppercase font-bold text-[#71717A] block">You said:</span>
                        “{fix.youSaid}”
                      </div>
                      <div className="text-xs text-right text-emerald-400">
                        <span className="text-[10px] uppercase font-bold text-[#71717A] block">More natural:</span>
                        “{fix.natural}”
                      </div>
                    </div>

                    <p className="text-[11px] text-[#A1A1AA] leading-relaxed border-t border-white/5 pt-2">
                      💡 {fix.explanation}
                    </p>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleSayItAgain(idx, fix.natural)}
                        className={`
                          px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer
                          ${practiced
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#A78BFA] border border-[#8B5CF6]/30'
                          }
                        `}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{practiced ? 'Repeated ✓' : 'Say it again 🔊'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="md" onClick={onClose}>
            Done →
          </Button>
        </div>
      </div>
    </Modal>
  );
};
