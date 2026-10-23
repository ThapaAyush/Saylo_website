import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const normalizeLevel = (lvl) => {
  if (!lvl) return 'beginner';
  const l = lvl.toLowerCase();
  if (l === 'intermediate' || l === 'medium' || l === 'miden' || l === 'casual_speaker' || l === 'fluent_builder') {
    return 'intermediate';
  }
  if (l === 'advanced' || l === 'advance' || l === 'vibe_master') {
    return 'advanced';
  }
  return 'beginner';
};

export const LEVEL_LABELS = {
  beginner: { label: 'Beginner', badge: '🌱 Beginner', desc: 'Easy daily words & basic conversations' },
  intermediate: { label: 'Medium', badge: '⚡ Medium', desc: 'Casual slang & natural social dialogue' },
  advanced: { label: 'Advance', badge: '🚀 Advance', desc: 'Nuanced idioms, professional & debate English' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [level, setLevelState] = useState(() => {
    const saved = localStorage.getItem('vibe_level');
    return normalizeLevel(saved || 'beginner');
  });

  const initAuth = async () => {
    const token = localStorage.getItem('saylo_token') || localStorage.getItem('vibe_token');
    if (token) {
      try {
        const data = await api.getMe();
        setUser(data.user);
        setProfile(data.profile);
        if (data.profile?.level) {
          const norm = normalizeLevel(data.profile.level);
          setLevelState(norm);
          localStorage.setItem('vibe_level', norm);
        }
      } catch (err) {
        console.warn('Stored token invalid, clearing');
        localStorage.removeItem('saylo_token');
        localStorage.removeItem('vibe_token');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const changeLevel = async (newLevel) => {
    const norm = normalizeLevel(newLevel);
    setLevelState(norm);
    localStorage.setItem('vibe_level', norm);
    if (user) {
      try {
        const updated = await api.updateProfile({ level: norm });
        if (updated) setProfile(updated);
      } catch (err) {
        console.error('Failed to update level on profile:', err);
      }
    }
  };

  const login = async (emailOrUsername, password) => {
    const data = await api.login(emailOrUsername, password);
    localStorage.setItem('saylo_token', data.token);
    localStorage.setItem('vibe_token', data.token);
    setUser(data.user);
    setProfile(data.profile);
    if (data.profile?.level) {
      const norm = normalizeLevel(data.profile.level);
      setLevelState(norm);
      localStorage.setItem('vibe_level', norm);
    }
    return data;
  };

  const googleLogin = useCallback(async (credential) => {
    const data = await api.googleLogin(credential);
    localStorage.setItem('saylo_token', data.token);
    localStorage.setItem('vibe_token', data.token);
    setUser(data.user);
    setProfile(data.profile);
    if (data.profile?.level) {
      const norm = normalizeLevel(data.profile.level);
      setLevelState(norm);
      localStorage.setItem('vibe_level', norm);
    }
    return data;
  }, []);

  const register = async (userData) => {
    const data = await api.register({
      ...userData,
      level: userData.level || level,
    });
    localStorage.setItem('saylo_token', data.token);
    localStorage.setItem('vibe_token', data.token);
    setUser(data.user);
    setProfile(data.profile);
    if (data.profile?.level) {
      const norm = normalizeLevel(data.profile.level);
      setLevelState(norm);
      localStorage.setItem('vibe_level', norm);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('saylo_token');
    localStorage.removeItem('vibe_token');
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    try {
      const p = await api.getProfile();
      setProfile(p);
      if (p?.level) {
        const norm = normalizeLevel(p.level);
        setLevelState(norm);
        localStorage.setItem('vibe_level', norm);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // XP mode removed: gainXp is a silent no-op
  const gainXp = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        level,
        changeLevel,
        login,
        googleLogin,
        register,
        logout,
        refreshProfile,
        gainXp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) || {};
