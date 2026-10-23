import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GitFork, CheckCircle, RotateCcw } from 'lucide-react';
export const BranchingStoryView = ({ story, onFinish, onExplain }) => {
  const branching = story.branchingStory;
  const startId = branching?.startNodeId || 'node_start';

  const [currentNodeId, setCurrentNodeId] = useState(startId);
  const [history, setHistory] = useState([]);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentNode = branching?.nodes?.find(n => n.nodeId === currentNodeId);

  const handleChoose = (choice) => {
    setLastFeedback(choice.feedback);
    setHistory(prev => [
      ...prev,
      {
        speaker: currentNode.speaker,
        message: currentNode.message,
        userChoice: choice.text,
        feedback: choice.feedback,
        isBestNatural: choice.isBestNatural,
      },
    ]);

    if (!choice.nextNodeId || choice.nextNodeId === 'node_end_win' || choice.nextNodeId.includes('end')) {
      setIsFinished(true);
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
      api.completeReading(story._id).catch(() => {});
    } else {
      setCurrentNodeId(choice.nextNodeId);
    }
  };

  const handleRestart = () => {
    setCurrentNodeId(startId);
    setHistory([]);
    setLastFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="purple" size="xs">BRANCHING SCENARIO 🔀</Badge>
          <span className="text-xs text-[#A1A1AA]">{story.estimatedTime}</span>
        </div>
        <h2 className="text-2xl font-black text-[#F5F5F5]">{story.title}</h2>
        <p className="text-sm text-[#A1A1AA]">{branching?.scenario || story.summary}</p>
      </div>

      {/* Conversation Thread History */}
      <div className="space-y-4">
        {history.map((step, idx) => (
          <div key={idx} className="space-y-2 p-4 bg-[#111113] rounded-2xl border border-white/5 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs text-[#A78BFA] font-bold">
              <span>{step.speaker}:</span>
              <span className="text-white font-normal">"{step.message}"</span>
            </div>
            <div className="p-3 bg-[#8B5CF6]/15 rounded-xl border border-[#8B5CF6]/30 text-xs text-white">
              <span className="text-[10px] uppercase font-bold text-[#A78BFA] block mb-1">Your response:</span>
              "{step.userChoice}"
            </div>
            {step.feedback && (
              <div className={`p-2.5 rounded-lg text-xs flex items-start gap-2 ${step.isBestNatural ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>
                <span>💡</span>
                <span>{step.feedback}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Branch Prompt / Decision Box */}
      {!isFinished && currentNode ? (
        <Card className="bg-[#09090B] border border-white/10 p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center font-bold text-sm text-[#A78BFA]">
              {currentNode.speaker?.charAt(0) || '💬'}
            </div>
            <div>
              <span className="text-xs font-bold text-[#A78BFA]">{currentNode.speaker}</span>
              <p className="text-lg font-bold text-[#F5F5F5] mt-0.5">
                “{currentNode.message}”
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider block">
              Choose your response:
            </span>
            {currentNode.choices?.map((choice, cIdx) => (
              <button
                key={cIdx}
                onClick={() => handleChoose(choice)}
                className="w-full text-left p-4 rounded-2xl bg-[#18181B] hover:bg-[#27272A] hover:border-[#8B5CF6]/50 border border-white/5 text-sm text-[#F5F5F5] transition duration-200 cursor-pointer flex items-center justify-between group"
              >
                <span>{choice.text}</span>
                <span className="text-xs text-[#71717A] group-hover:text-[#A78BFA] transition">
                  Select →
                </span>
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="text-center p-8 bg-gradient-to-br from-[#121215] to-[#1E1E28] border border-white/10 space-y-4">
          <span className="text-4xl animate-bounce">🎉</span>
          <h3 className="text-xl font-bold text-white">Scenario Complete!</h3>
          <p className="text-sm text-[#A1A1AA]">
            You navigated the situation naturally using authentic English intuition.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="secondary" size="md" onClick={handleRestart} icon={RotateCcw}>
              Try Again
            </Button>
            <Button variant="primary" size="md" onClick={onFinish}>
              Next Challenge →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
