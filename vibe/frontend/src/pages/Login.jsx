import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const googleButtonRef = useRef(null);
  const [emailOrUsername, setEmailOrUsername] = useState('demo@vibe.app');
  const [password, setPassword] = useState('password123');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(emailOrUsername, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmailOrUsername('demo@vibe.app');
    setPassword('password123');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-[#111113] border-white/10 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] mx-auto flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
            ⚡
          </div>
          <h1 className="text-2xl font-black text-white">Sign In to Saylo</h1>
          <p className="text-xs font-semibold text-[#A78BFA]">
            Say it. Mean it. Own it.
          </p>

        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Email or Username</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Username or email"
              className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            icon={LogIn}
            className="w-full text-sm font-bold py-3.5 mt-2"
          >
            {loading ? 'Signing In...' : 'Sign In →'}
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

        <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-[#A1A1AA]">
          <div>
            <span className="block text-zinc-400">Demo account:</span>
            <strong className="text-white font-mono text-[11px]">demo@vibe.app / password123</strong>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs text-[#8B5CF6] hover:text-[#A78BFA] font-bold underline cursor-pointer"
          >
            Fill Demo
          </button>
        </div>

        <div className="text-center text-xs text-[#71717A]">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#8B5CF6] hover:underline font-semibold">
            Create an account
          </Link>
        </div>
      </Card>
    </div>
  );
};
