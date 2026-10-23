import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default', 'purple', 'cyan', 'pink', 'orange', 'lime', 'outline'
  size = 'sm',
  className = '',
}) => {
  const variants = {
    default: 'bg-white/10 text-[#F5F5F5]',
    purple: 'bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30',
    cyan: 'bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30',
    pink: 'bg-[#F472B6]/15 text-[#F472B6] border border-[#F472B6]/30',
    orange: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    lime: 'bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30',
    outline: 'border border-white/15 text-[#A1A1AA]',
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 rounded-md font-medium tracking-wide uppercase',
    sm: 'text-xs px-2.5 py-1 rounded-lg font-semibold',
    md: 'text-sm px-3 py-1.5 rounded-xl font-bold',
  };

  return (
    <span className={`inline-flex items-center gap-1 ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
