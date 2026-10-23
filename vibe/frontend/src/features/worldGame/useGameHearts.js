import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../../services/api';

const REFILL_INTERVAL_SECONDS = 5 * 60; // 5 minutes = 300 seconds
const MAX_HEARTS = 5;

export const useGameHearts = (initialEnergy) => {
  const [hearts, setHearts] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_game_hearts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.current === 'number') {
          return {
            current: Math.min(MAX_HEARTS, Math.max(0, parsed.current)),
            max: MAX_HEARTS,
            lastRefill: parsed.lastRefill ? new Date(parsed.lastRefill) : new Date(),
          };
        }
      }
    } catch (e) {}

    return {
      current: initialEnergy?.current ?? 5,
      max: MAX_HEARTS,
      lastRefill: initialEnergy?.lastRefill ? new Date(initialEnergy.lastRefill) : new Date(),
    };
  });

  const [secondsRemaining, setSecondsRemaining] = useState(0);

  // Sync when initialEnergy from backend changes
  useEffect(() => {
    if (initialEnergy && typeof initialEnergy.current === 'number') {
      setHearts((prev) => {
        // Only override if backend is fresh or different
        const updated = {
          current: Math.min(MAX_HEARTS, Math.max(0, initialEnergy.current)),
          max: MAX_HEARTS,
          lastRefill: initialEnergy.lastRefill ? new Date(initialEnergy.lastRefill) : prev.lastRefill,
        };
        try {
          localStorage.setItem('vibe_game_hearts', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [initialEnergy?.current, initialEnergy?.lastRefill]);

  // Save to localStorage whenever hearts state changes
  useEffect(() => {
    try {
      localStorage.setItem('vibe_game_hearts', JSON.stringify(hearts));
    } catch (e) {}
  }, [hearts]);

  // Main 1-second regeneration ticker
  useEffect(() => {
    const updateCountdown = () => {
      if (hearts.current >= MAX_HEARTS) {
        setSecondsRemaining(0);
        return;
      }

      const now = Date.now();
      const last = new Date(hearts.lastRefill || now).getTime();
      const elapsedSeconds = Math.max(0, Math.floor((now - last) / 1000));

      if (elapsedSeconds >= REFILL_INTERVAL_SECONDS) {
        // Regenerate heart(s)
        const heartsToAdd = Math.floor(elapsedSeconds / REFILL_INTERVAL_SECONDS);
        const newCount = Math.min(MAX_HEARTS, hearts.current + heartsToAdd);

        const newLastRefill =
          newCount >= MAX_HEARTS
            ? new Date()
            : new Date(last + heartsToAdd * REFILL_INTERVAL_SECONDS * 1000);

        setHearts({
          current: newCount,
          max: MAX_HEARTS,
          lastRefill: newLastRefill,
        });

        // Notify backend
        api.regenGameHeart(newCount).catch(() => {});
      } else {
        const remaining = REFILL_INTERVAL_SECONDS - elapsedSeconds;
        setSecondsRemaining(Math.max(0, remaining));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [hearts.current, hearts.lastRefill]);

  // Deduct 1 heart on incorrect answer
  const deductHeart = useCallback(async () => {
    let nextCount = 0;
    let nextRefill = new Date();

    setHearts((prev) => {
      nextCount = Math.max(0, prev.current - 1);
      // If dropping from max 5, the 5-minute timer starts right now
      nextRefill = prev.current === MAX_HEARTS ? new Date() : prev.lastRefill;
      const updated = {
        current: nextCount,
        max: MAX_HEARTS,
        lastRefill: nextRefill,
      };
      try {
        localStorage.setItem('vibe_game_hearts', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await api.deductGameHeart(nextCount, nextRefill);
    } catch (err) {
      console.warn('Failed to sync heart deduction with backend:', err);
    }

    return nextCount;
  }, []);

  // Add 1 heart on level completion (only if current < 5, never exceeds 5)
  const addHeartOnLevelComplete = useCallback(async () => {
    let updated = null;
    setHearts((prev) => {
      if (prev.current >= MAX_HEARTS) {
        return prev; // Remains 5/5
      }
      const nextCount = Math.min(MAX_HEARTS, prev.current + 1);
      updated = {
        current: nextCount,
        max: MAX_HEARTS,
        lastRefill: nextCount === MAX_HEARTS ? new Date() : prev.lastRefill,
      };
      try {
        localStorage.setItem('vibe_game_hearts', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Format MM:SS
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    hearts: hearts.current,
    maxHearts: MAX_HEARTS,
    isFull: hearts.current >= MAX_HEARTS,
    isOutOfHearts: hearts.current <= 0,
    secondsRemaining,
    timerFormatted: formatTimer(secondsRemaining),
    deductHeart,
    addHeartOnLevelComplete,
    rawEnergy: hearts,
  };
};
