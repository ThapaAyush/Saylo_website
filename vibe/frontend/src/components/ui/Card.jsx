import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glow = null, // 'purple', 'cyan', 'pink', null
  onClick,
  ...props
}) => {
  const glowStyles = {
    purple: 'hover:border-[#8B5CF6]/50 hover:shadow-lg hover:shadow-[#8B5CF6]/10',
    cyan: 'hover:border-[#22D3EE]/50 hover:shadow-lg hover:shadow-[#22D3EE]/10',
    pink: 'hover:border-[#F472B6]/50 hover:shadow-lg hover:shadow-[#F472B6]/10',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-[#111113] border border-white/8 rounded-3xl p-5 
        ${hoverEffect ? 'transition-all duration-300 hover:-translate-y-1 cursor-pointer' : ''}
        ${glow ? glowStyles[glow] : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
