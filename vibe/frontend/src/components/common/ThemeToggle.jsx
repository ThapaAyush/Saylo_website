import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      title={isDark ? 'Switch to Light Theme ☀️' : 'Switch to Dark Theme 🌙'}
      className={`
        relative p-2 rounded-xl transition-all duration-300 cursor-pointer group flex items-center justify-center
        ${isDark
          ? 'bg-[#18181B] hover:bg-[#202024] text-amber-400 border border-white/10 hover:border-amber-400/40 shadow-sm hover:shadow-amber-500/10'
          : 'bg-white hover:bg-slate-50 text-[#7C3AED] border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-purple-500/10'
        }
        ${className}
      `}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (Visible in Dark Mode to switch to Light) */}
        <Sun
          className={`w-4 h-4 transition-all duration-300 transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-amber-400'
              : 'opacity-0 -rotate-90 scale-50 absolute pointer-events-none'
          } group-hover:rotate-45`}
        />

        {/* Moon Icon (Visible in Light Mode to switch to Dark) */}
        <Moon
          className={`w-4 h-4 transition-all duration-300 transform ${
            !isDark
              ? 'opacity-100 rotate-0 scale-100 text-[#7C3AED]'
              : 'opacity-0 rotate-90 scale-50 absolute pointer-events-none'
          } group-hover:-rotate-12`}
        />
      </div>
    </button>
  );
};
