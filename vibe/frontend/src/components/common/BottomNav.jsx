import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, BookOpen, Mic, FileText, PenTool, Gamepad2 } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();

  const mobileNav = [
    { label: 'Home', path: '/home', icon: Sparkles },
    { label: 'Game', path: '/game', icon: Gamepad2 },
    { label: 'Vocab', path: '/vocabulary', icon: BookOpen },
    { label: 'Speaking', path: '/speaking', icon: Mic },
    { label: 'Reading', path: '/reading', icon: FileText },
    { label: 'Writing', path: '/writing', icon: PenTool },
  ];

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-xl border-t border-white/8 px-1 py-1.5">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mobileNav.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all select-none
                ${active ? 'text-[#8B5CF6] scale-105' : 'text-[#71717A] hover:text-[#A1A1AA]'}
              `}
            >
              <div className={`p-1 rounded-full ${active ? 'bg-[#8B5CF6]/15' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-semibold tracking-tight ${active ? 'text-white font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
