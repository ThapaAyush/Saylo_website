import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#09090B] mt-12 py-6 text-zinc-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Brand & Slogan */}
        <div className="flex items-center gap-2.5">
          <Link to="/home" className="flex items-center gap-2 group">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center font-bold text-white text-xs shadow-md">
              ⚡
            </span>
            <span className="font-bold text-sm text-white group-hover:text-[#22D3EE] transition">
              Saylo
            </span>
          </Link>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 text-xs hidden sm:inline">
            Say it. Mean it. Own it.
          </span>
        </div>

        {/* Relevant Navigation Links */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link to="/vocabulary" className="text-zinc-400 hover:text-white transition">
            Vocabulary
          </Link>
          <Link to="/speaking" className="text-zinc-400 hover:text-white transition">
            Speaking
          </Link>
          <Link to="/reading" className="text-zinc-400 hover:text-white transition">
            Reading
          </Link>
          <Link to="/writing" className="text-zinc-400 hover:text-white transition">
            Writing
          </Link>
          <Link to="/game" className="text-[#8B5CF6] hover:text-[#A78BFA] font-semibold transition">
            Game World
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-zinc-500 font-mono text-[11px]">
          © {new Date().getFullYear()} Saylo
        </div>

      </div>
    </footer>
  );
};
