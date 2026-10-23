import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminContent } from './pages/AdminContent';
import { AdminAILab } from './pages/AdminAILab';
import { AdminUsers } from './pages/AdminUsers';
import { AdminGamification } from './pages/AdminGamification';
import { AdminSettings } from './pages/AdminSettings';
import { AdminGameWorld } from './pages/AdminGameWorld';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#09090B] text-[#F5F5F5] font-sans selection:bg-[#8B5CF6]/30">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/game-world" element={<AdminGameWorld />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/ai-lab" element={<AdminAILab />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/gamification" element={<AdminGamification />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
