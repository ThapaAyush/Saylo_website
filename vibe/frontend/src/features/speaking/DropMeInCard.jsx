import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Headphones, Mic, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

export const DropMeInCard = ({ scenario, onStart }) => {
  return (
    <Card hoverEffect className="group flex flex-col justify-between p-5 border-white/8 bg-[#111113] hover:border-[#8B5CF6]/30 transition-all duration-300">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl p-2.5 rounded-2xl bg-white/5 border border-white/5 shadow-inner select-none">
            {scenario.emoji || '🎙️'}
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="xs">
              {scenario.category}
            </Badge>
            <span className="text-[10px] font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full border border-[#8B5CF6]/20">
              4 Aspects
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-white transition tracking-tight mb-2">
          {scenario.title}
        </h3>

        <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
          {scenario.context}
        </p>

        {/* 4-Aspects Roadmap Indicator */}
        <div className="mb-4 p-3 bg-[#18181F] rounded-2xl border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">
            The 4-Aspect Speaking Loop:
          </span>
          <div className="grid grid-cols-4 gap-1 text-center">
            {[
              { emoji: '👂', title: 'Listen' },
              { emoji: '🗣️', title: 'Practice' },
              { emoji: '🎭', title: 'Express' },
              { emoji: '🔁', title: 'Improve' },
            ].map((step, i) => (
              <div key={i} className="p-1 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm block">{step.emoji}</span>
                <span className="text-[10px] font-semibold text-zinc-300 block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Launch Button */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[11px] text-[#A1A1AA] capitalize">
          Partner: <strong className="text-zinc-200">{scenario.defaultCharacter || 'Alex'}</strong>
        </span>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onStart(scenario)}
          icon={Mic}
          className="text-xs"
        >
          Start Speaking Loop →
        </Button>
      </div>
    </Card>
  );
};
