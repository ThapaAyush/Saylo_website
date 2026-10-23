import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({
  message = 'cooking your response...',
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-3 text-center ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-2 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center text-xs">⚡</span>
      </div>
      <p className="text-sm font-medium text-[#A1A1AA] animate-pulse">{message}</p>
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-[#111113] border border-white/5 rounded-3xl p-5 animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-4 bg-white/10 rounded w-12" />
    </div>
    <div className="h-6 bg-white/10 rounded w-3/4" />
    <div className="h-4 bg-white/5 rounded w-full" />
    <div className="h-4 bg-white/5 rounded w-2/3" />
    <div className="pt-2 flex gap-2">
      <div className="h-8 bg-white/10 rounded-xl w-20" />
      <div className="h-8 bg-white/10 rounded-xl w-24" />
    </div>
  </div>
);
