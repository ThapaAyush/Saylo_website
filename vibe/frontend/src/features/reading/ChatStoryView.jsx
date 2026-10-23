import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
export const ChatStoryView = ({ story, onFinish, onExplain }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (qIdx, optIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setShowExplanations(prev => ({ ...prev, [qIdx]: true }));
  };

  const handleComplete = async () => {
    try {
      await api.completeReading(story._id);
      setCompleted(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      if (onFinish) onFinish();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="xs">CHAT STORY 💬</Badge>
          <span className="text-xs text-[#A1A1AA]">{story.estimatedTime}</span>
        </div>
        <h2 className="text-2xl font-black text-[#F5F5F5]">{story.title}</h2>
        <p className="text-sm text-[#A1A1AA]">{story.summary}</p>
      </div>

      {/* Simulated Phone Messenger Screen */}
      <div className="bg-[#09090B] border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-[#A1A1AA]">
          <span className="font-semibold text-white">Group Messages</span>
          <span className="font-mono text-[11px]">Online</span>
        </div>

        <div className="space-y-3 py-2">
          {story.chatMessages?.map((msg, idx) => {
            const isUser = msg.isUser;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
              >
                {!isUser && (
                  <span className="text-[11px] font-semibold text-[#A78BFA] mb-1 px-1">
                    {msg.sender}
                  </span>
                )}
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                    ${isUser ? 'bg-[#8B5CF6] text-white rounded-br-xs' : 'bg-[#18181B] text-[#F5F5F5] border border-white/8 rounded-bl-xs'}
                  `}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#71717A] mt-1 px-1 font-mono">
                  {msg.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highlighted vocabulary from chat */}
      {story.vocabulary?.length > 0 && (
        <div className="p-4 bg-[#111113] border border-white/5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
              Natural expressions used in this chat:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {story.vocabulary.map((v, i) => (
              <button
                key={i}
                onClick={() => onExplain && onExplain(v)}
                className="px-3 py-1 bg-white/5 hover:bg-[#8B5CF6]/20 border border-white/5 hover:border-[#8B5CF6]/40 text-xs text-[#F5F5F5] rounded-xl transition cursor-pointer"
              >
                {v} →
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comprehension & Vibe Questions */}
      {story.questions?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>🧠 Intuition Check</span>
          </h3>

          {story.questions.map((q, qIdx) => {
            const selected = selectedAnswers[qIdx];
            const isCorrect = selected === q.correctIndex;
            const answered = selected !== undefined;

            return (
              <Card key={qIdx} className="space-y-3">
                <p className="text-sm font-semibold text-[#F5F5F5]">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selected === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`
                          w-full p-3 rounded-xl text-xs text-left transition flex items-center justify-between border cursor-pointer
                          ${isOptionSelected
                            ? isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                              : 'bg-red-500/10 border-red-500 text-red-300'
                            : 'bg-[#18181B] hover:bg-[#27272A] border-white/5 text-[#E4E4E7]'
                          }
                        `}
                      >
                        <span>{opt}</span>
                        {isOptionSelected && (
                          isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <p className="text-xs text-[#A1A1AA] pt-1">
                    💡 <strong className="text-white">Explanation: </strong>{q.explanation}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Complete Button */}
      <div className="pt-4 flex justify-end">
        <Button
          variant={completed ? 'secondary' : 'primary'}
          size="lg"
          onClick={handleComplete}
          disabled={completed}
        >
          {completed ? 'Story Completed ✓' : 'Complete Story →'}
        </Button>
      </div>
    </div>
  );
};
