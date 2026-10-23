import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, LEVEL_LABELS } from '../../context/AuthContext';
import {
  Sparkles,
  BookOpen,
  Mic,
  FileText,
  PenTool,
  Gamepad2,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const TopNav = () => {
  const { user, level, changeLevel, logout } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/home', icon: Sparkles },
    { label: 'Game', path: '/game', icon: Gamepad2 },
    { label: 'Vocabulary', path: '/vocabulary', icon: BookOpen },
    { label: 'Speaking', path: '/speaking', icon: Mic },
    { label: 'Reading', path: '/reading', icon: FileText },
    { label: 'Writing', path: '/writing', icon: PenTool },
  ];

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname.startsWith(path);
  };

  const levelInfo = LEVEL_LABELS[level] || LEVEL_LABELS.beginner;
  const userInitial = (user?.displayName || user?.username || 'A').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090B]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Core 5 Nav Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link to="/home" className="flex items-center gap-2 group shrink-0" title="Saylo — Say it. Mean it. Own it.">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center font-black text-white text-base shadow-lg shadow-[#8B5CF6]/30 group-hover:scale-105 transition">
              ⚡
            </span>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-wider text-[#F5F5F5] group-hover:text-white transition leading-none">
                Saylo
              </span>
              <span className="text-[9px] font-semibold text-[#A1A1AA] tracking-tight hidden sm:block">
                Say it. Mean it. Own it.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all
                    ${active ? 'text-white bg-white/10 font-semibold shadow-sm' : 'text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/5'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#8B5CF6]' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Theme Toggle & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 py-1 px-2.5 rounded-xl bg-[#18181B] hover:bg-[#202024] border border-white/10 hover:border-white/20 transition cursor-pointer group shadow-sm"
                title="Profile & Level Settings"
              >
                {/* Personalized User Initial Avatar */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-black flex items-center justify-center shadow-sm shrink-0">
                  {userInitial}
                </div>

                {/* Name */}
                <span className="text-xs font-bold text-white max-w-[100px] truncate">
                  {user.displayName || user.username}
                </span>

                {/* Relevant English Level Badge */}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD] hidden sm:inline-flex items-center">
                  {levelInfo.badge}
                </span>

                {/* Dropdown Chevron */}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 ${
                    showUserMenu ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {/* Sleek User Profile & Level Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#141416] border border-white/10 rounded-2xl p-3 shadow-2xl z-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User Identity Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white text-base font-black shadow-md shrink-0">
                      {userInitial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white truncate">
                        {user.displayName || user.username}
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">
                        {user.email || 'English Learner'}
                      </div>
                    </div>
                  </div>

                  {/* English Level (Fixed) */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium">Assigned Level:</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      {levelInfo.badge}
                    </span>
                  </div>

                  {/* Theme Mode Control */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium">Theme Mode:</span>
                    <ThemeToggle />
                  </div>

                  {/* Navigation Links */}
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition"
                    >
                      <User className="w-4 h-4 text-[#8B5CF6]" />
                      <span>Profile & Learning Stats</span>
                    </Link>
                    <Link
                      to="/game"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition"
                    >
                      <Gamepad2 className="w-4 h-4 text-[#22D3EE]" />
                      <span>Game World Adventure</span>
                    </Link>
                  </div>

                  {/* Log Out */}
                  <div className="pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#D4D4D8] hover:text-white hover:bg-white/5 border border-white/10 transition"
              >
                <LogIn className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-90 transition shadow-md shadow-purple-500/20"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
