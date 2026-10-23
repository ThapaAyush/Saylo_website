import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TopNav } from './components/common/TopNav';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';

import { Home } from './pages/Home';
import { GamePage } from './pages/GamePage';
import { VocabularyPage } from './pages/VocabularyPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { ReadingPage } from './pages/ReadingPage';
import { WritingPage } from './pages/WritingPage';
import { ProfilePage } from './pages/ProfilePage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

const AppLayout = () => {
  const location = useLocation();
  const hideNav = ['/login', '/signup'].includes(location.pathname);
  const isGamePage = location.pathname.startsWith('/game');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#8B5CF6]/30 transition-colors duration-200">
      {!hideNav && <TopNav />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* SAYLO Game World Adventure */}
          <Route path="/game" element={<GamePage />} />

          {/* The 5 Core Sections */}
          <Route path="/home" element={<Home />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/writing" element={<WritingPage />} />

          {/* Legacy / Alias paths redirected to the core 5 */}
          <Route path="/discover" element={<Navigate to="/vocabulary" replace />} />
          <Route path="/talk" element={<Navigate to="/speaking" replace />} />
          <Route path="/learn" element={<Navigate to="/reading" replace />} />
          <Route path="/create" element={<Navigate to="/writing" replace />} />

          {/* Account & Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      {!isGamePage && !hideNav && <Footer />}
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
