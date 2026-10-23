import React from 'react';

export const Chip = ({
  children,
  active = false,
  variant = 'default', // 'default', 'purple', 'cyan', 'pink', 'lime'
  onClick,
  className = '',
  icon: Icon,
}) => {
  const activeStyles = {
    default: 'bg-white text-[#09090B] font-semibold shadow-md',
    purple: 'bg-[#8B5CF6] text-white font-semibold shadow-md shadow-[#8B5CF6]/30',
    cyan: 'bg-[#22D3EE] text-[#09090B] font-semibold shadow-md shadow-[#22D3EE]/30',
    pink: 'bg-[#F472B6] text-[#09090B] font-semibold shadow-md shadow-[#F472B6]/30',
    lime: 'bg-[#A3E635] text-[#09090B] font-semibold shadow-md shadow-[#A3E635]/30',
  };

  const inactiveStyles = 'bg-[#18181B] text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#27272A] border border-white/5';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer shrink-0
        ${active ? activeStyles[variant] : inactiveStyles}
        ${className}
      `}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </button>
  );
};
