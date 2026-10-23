import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  emoji = '👀',
  title = 'Nothing here yet 👀',
  description = 'Your next English milestone is waiting for you.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-white/10 rounded-3xl bg-[#111113]/50 ${className}`}>
      <span className="text-4xl sm:text-5xl mb-4 animate-bounce duration-1000 select-none">{emoji}</span>
      <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] mb-1.5">{title}</h3>
      <p className="text-sm text-[#A1A1AA] max-w-sm mb-6">{description}</p>
      {actionText && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
