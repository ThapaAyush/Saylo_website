import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MessageSquare } from 'lucide-react';

export const CharacterCard = ({ character, isSelected, onSelect }) => {
  return (
    <Card
      hoverEffect
      onClick={() => onSelect(character)}
      className={`
        cursor-pointer transition-all duration-200 p-5 flex flex-col justify-between
        ${isSelected ? 'border-[#8B5CF6] bg-[#18181F] shadow-lg shadow-[#8B5CF6]/10 scale-[1.02]' : 'border-white/5 bg-[#111113]'}
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/20 border border-white/10 flex items-center justify-center text-xl shadow-inner">
            {character.avatar || '😎'}
          </div>
          <Badge variant="purple" size="xs">
            {character.tag || character.role}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-[#F5F5F5] tracking-tight mb-1">
          {character.name}
        </h3>
        <p className="text-xs text-[#A78BFA] font-medium mb-2.5">
          {character.role}
        </p>

        <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-3">
          {character.personality}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#71717A]">
        <span className="capitalize">{character.difficulty}</span>
        <span className={`font-semibold transition ${isSelected ? 'text-[#8B5CF6]' : 'hover:text-white'}`}>
          {isSelected ? 'Selected ✓' : 'Chat →'}
        </span>
      </div>
    </Card>
  );
};
