import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Check } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();
  const googleButtonRef = useRef(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId) return undefined;

    let active = true;
    let script = document.getElementById('google-identity-services');
    const initializeGoogleSignIn = () => {
      if (!active || !window.google?.accounts?.id || !googleButtonRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async ({ credential }) => {
            if (!credential) {
              setError('Google sign-in did not return a credential. Please try again.');
              return;
            }

            setLoading(true);
            setError('');
            try {
              await googleLogin(credential);
              navigate('/home');
            } catch (err) {
              setError(err.message || 'Google sign-in failed');
            } finally {
              setLoading(false);
            }
          },
        });

        googleButtonRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          width: 320,
        });
      } catch (e) {
        console.warn('Google sign-in render error:', e);
      }
    };

    if (window.google?.accounts?.id) {
      initializeGoogleSignIn();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.id = 'google-identity-services';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', initializeGoogleSignIn, { once: true });
      script.addEventListener('error', () => {
        if (active) setError('Could not load Google sign-in. Check your connection and try again.');
      }, { once: true });
    }

    return () => {
      active = false;
    };
  }, [googleClientId, googleLogin, navigate]);

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner 🌱',
      subtitle: 'Starting out',
      desc: 'Simple words, daily phrases & easy friendly conversations',
    },
    {
      id: 'intermediate',
      title: 'Medium ⚡',
      subtitle: 'Building fluency',
      desc: 'Real slang, everyday texting & natural confident chatting',
    },
    {
      id: 'advanced',
      title: 'Advance 🚀',
      subtitle: 'Mastering nuance',
      desc: 'Professional communication, sharp debates & sophisticated vocabulary',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({
        username,
        email,
        password,
        displayName: username,
        level: selectedLevel,
      });
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg p-6 sm:p-8 bg-[#111113] border-white/10 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] mx-auto flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
            ⚡
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Join Saylo</h1>
          <p className="text-xs font-semibold text-[#A78BFA]">
            Say it. Mean it. Own it.
          </p>

        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. ayush_saylo"
              className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          {/* 3-Level Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-[#A1A1AA] flex items-center justify-between">
              <span>Select Your English Level</span>
              <span className="text-[11px] text-[#8B5CF6]">3 Curated Tracks</span>
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {levels.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`
                      w-full p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer
                      ${isSelected
                        ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/10'
                        : 'bg-[#18181B] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'}
                    `}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lvl.title}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">({lvl.subtitle})</span>
                      </div>
                      <p className="text-xs text-[#A1A1AA] mt-0.5 leading-snug">{lvl.desc}</p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white'
                          : 'border-zinc-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full text-sm font-bold py-3.5 mt-2"
          >
            {loading ? 'Creating Account...' : 'Get Started →'}
          </Button>
        </form>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-zinc-500">
            <div className="h-px flex-1 bg-white/10" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          {googleClientId ? (
            <div
              ref={googleButtonRef}
              className={`flex justify-center ${loading ? 'pointer-events-none opacity-50' : ''}`}
            />
          ) : (
            <p className="text-center text-xs text-zinc-500">
              Google sign-in is not configured. Set VITE_GOOGLE_CLIENT_ID to enable it.
            </p>
          )}
        </div>

        <div className="text-center text-xs text-[#71717A] pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-[#8B5CF6] hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};
