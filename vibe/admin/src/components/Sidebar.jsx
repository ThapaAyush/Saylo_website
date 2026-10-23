import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Bot,
  Users,
  Trophy,
  Sliders,
  ExternalLink,
  Sparkles,
  Gamepad2,
  Mic,
  FileText,
  PenTool,
  ChevronDown,
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: 'Overview & Analytics', path: '/admin', icon: BarChart3 },
    { label: 'Game World (30 Lvl)', path: '/admin/game-world', icon: Gamepad2 },
    { 
      label: 'Curriculum & Tracks', 
      path: '/admin/content', 
      icon: BookOpen,
      subTracks: [
        { label: 'Game', tab: 'game', icon: Gamepad2 },
        { label: 'Vocabulary', tab: 'vocabulary', icon: BookOpen },
        { label: 'Speaking', tab: 'speaking', icon: Mic },
        { label: 'Reading', tab: 'reading', icon: FileText },
        { label: 'Writing', tab: 'writing', icon: PenTool },
      ]
    },
    { label: 'AI Lab & Personalities', path: '/admin/ai-lab', icon: Bot },
    { label: 'Users & Moderation', path: '/admin/users', icon: Users },
    { label: 'Gamification & Quests', path: '/admin/gamification', icon: Trophy },
    { label: 'Product Settings', path: '/admin/settings', icon: Sliders },
  ];

  const currentTab = new URLSearchParams(location.search).get('tab') || 'game';

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin' || location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#09090B] border-r border-white/8 min-h-screen flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-500/30">
            ⚡
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wider text-white">Saylo Ops</h1>
            <span className="text-[10px] text-[#A78BFA] font-mono">Product & AI Control</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {links.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            const isContent = link.path === '/admin/content';

            return (
              <div key={link.path} className="space-y-1">
                <Link
                  to={link.path}
                  className={`
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${active ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20' : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#71717A]'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.subTracks && (
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono">5</span>
                  )}
                </Link>

                {/* Sub tracks for curriculum */}
                {isContent && (
                  <div className="pl-4 pr-1 py-1 space-y-0.5">
                    {link.subTracks.map((track) => {
                      const SubIcon = track.icon;
                      const isTrackActive = active && currentTab === track.tab;
                      return (
                        <Link
                          key={track.tab}
                          to={`/admin/content?tab=${track.tab}`}
                          className={`
                            flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all
                            ${isTrackActive
                              ? 'bg-purple-500/20 text-[#A78BFA] font-semibold border-l-2 border-[#8B5CF6]'
                              : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }
                          `}
                        >
                          <SubIcon className={`w-3.5 h-3.5 ${isTrackActive ? 'text-[#A78BFA]' : 'text-zinc-500'}`} />
                          <span>{track.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Switch to learner portal */}
      <div className="p-3 bg-[#111113] rounded-2xl border border-white/5 space-y-2">
        <span className="text-[10px] uppercase font-bold text-[#71717A] tracking-wider block">
          Learner App
        </span>
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between text-xs font-semibold text-[#22D3EE] hover:underline"
        >
          <span>Open Saylo Web App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
