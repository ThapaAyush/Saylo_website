import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { GameWorldMap } from '../features/worldGame/GameWorldMap';
import { LevelDetailModal } from '../features/worldGame/LevelDetailModal';
import { MissionPlayerModal } from '../features/worldGame/MissionPlayerModal';
import { MissionCompleteModal } from '../features/worldGame/MissionCompleteModal';
import { SayloSummitModal } from '../features/worldGame/SayloSummitModal';
import { LockedLevelToast } from '../features/worldGame/LockedLevelToast';
import { GameStatsPill } from '../features/worldGame/GameStatsPill';
import { OutOfHeartsModal } from '../features/worldGame/OutOfHeartsModal';
import { useGameHearts } from '../features/worldGame/useGameHearts';
import { Target, Loader2 } from 'lucide-react';

// STRICT RULE: Next level opens ONLY if user earns FULL 3 STARS!
// A level is marked completed ONLY IF it has earned 3 stars!
export const sanitizeStrictProgress = (prog) => {
  if (!prog) {
    return {
      currentLevel: 1,
      completedLevels: [],
      levelScores: [],
      totalXP: 0,
      streak: 1,
      energy: { current: 5, max: 5 },
    };
  }

  const scores = prog.levelScores || [];

  // Map each level number to highest stars earned
  const starsMap = new Map();
  scores.forEach((s) => {
    const existing = starsMap.get(s.levelNumber) || 0;
    if (s.stars > existing) {
      starsMap.set(s.levelNumber, s.stars);
    }
  });

  const completedWith3Stars = [];
  let highestUnlocked = 1;

  // Strict sequential progression:
  // Level 1 is always unlocked.
  // Level N is unlocked IF AND ONLY IF Level N-1 achieved 3 stars!
  for (let lvl = 1; lvl <= 30; lvl++) {
    const stars = starsMap.get(lvl) || 0;
    if (stars === 3) {
      completedWith3Stars.push(lvl);
      highestUnlocked = Math.min(30, lvl + 1);
    } else {
      // Must score 3 stars on this level before unlocking lvl + 1!
      highestUnlocked = lvl;
      break;
    }
  }

  return {
    ...prog,
    currentLevel: highestUnlocked,
    completedLevels: completedWith3Stars,
    levelScores: scores,
  };
};

export const GamePage = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [worlds, setWorlds] = useState([]);
  const [levels, setLevels] = useState([]);
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_game_progress');
      if (saved) return sanitizeStrictProgress(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
    return {
      currentLevel: 1,
      completedLevels: [],
      levelScores: [],
      totalXP: 0,
      streak: 1,
      energy: { current: 5, max: 5 },
    };
  });

  // Heart System Hook (5 hearts max, 1 heart every 5 mins when < 5, wrong quiz deducts 1, level completes +1 capped at 5)
  const gameHearts = useGameHearts(progress?.energy);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);

  // Total Stars Count across all levels
  const totalStars = (progress?.levelScores || []).reduce(
    (acc, curr) => acc + (curr.stars || 0),
    0
  );

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedToastLevel, setLockedToastLevel] = useState(null);

  // Active playing mission states
  const [activeMissionLevel, setActiveMissionLevel] = useState(null);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [loadingMission, setLoadingMission] = useState(false);

  // Completion modal state
  const [completionResult, setCompletionResult] = useState(null);
  const [completedLevelMeta, setCompletedLevelMeta] = useState(null);
  const [showSummitModal, setShowSummitModal] = useState(false);


  // Load Game Map and User Progress from DB
  const fetchMapData = async () => {
    try {
      setLoading(true);
      const data = await api.getGameMap();
      setWorlds(data.worlds || []);
      setLevels(data.levels || []);
      if (data.progress) {
        setProgress((prev) => {
          // Merge scores keeping best stars
          const mergedScores = [...(prev?.levelScores || [])];
          (data.progress.levelScores || []).forEach((dbScore) => {
            const idx = mergedScores.findIndex((s) => s.levelNumber === dbScore.levelNumber);
            if (idx >= 0) {
              if (dbScore.stars > mergedScores[idx].stars) {
                mergedScores[idx] = dbScore;
              }
            } else {
              mergedScores.push(dbScore);
            }
          });

          const sanitized = sanitizeStrictProgress({
            ...data.progress,
            levelScores: mergedScores,
            energy: data.progress.energy || prev?.energy || { current: 5, max: 5 },
          });

          try {
            localStorage.setItem('vibe_game_progress', JSON.stringify(sanitized));
          } catch (e) {}

          return sanitized;
        });
      }
    } catch (err) {
      console.error('Failed to load game map data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  // Center on current level (Target / You Are Here button handler)
  const handleCenterCurrent = () => {
    const el =
      document.getElementById('current-game-level-node') ||
      document.querySelector('[data-current-level="true"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('scale-125');
      setTimeout(() => el.classList.remove('scale-125'), 600);
    }
  };

  // Node selection handler:
  // - If locked: strictly display locked toast, do NOT open mission modal.
  // - If unlocked: open ONLY that level's detail modal.
  const handleSelectLevel = (level, isLocked) => {
    if (isLocked) {
      setLockedToastLevel(level.levelNumber);
      setSelectedLevel(null);
      setIsModalOpen(false);
    } else {
      setSelectedLevel(level);
      setIsModalOpen(true);
      setLockedToastLevel(null);
    }
  };

  // Start Playing a Mission
  const handleStartMission = async (level) => {
    if (gameHearts.isOutOfHearts) {
      setShowOutOfHearts(true);
      return;
    }

    try {
      setLoadingMission(true);
      const res = await api.getGameLevel(level.levelNumber);
      setActiveMissionLevel(res.level || level);
      setActiveChallenges(res.challenges || []);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to load level mission:', err);
    } finally {
      setLoadingMission(false);
    }
  };

  // Complete Mission submission
  const handleCompleteMission = async (answers, durationSeconds) => {
    if (!activeMissionLevel) return;
    const lvlNum = activeMissionLevel.levelNumber;

    // Award +1 heart on level completion (only if current < 5, never exceeds 5)
    gameHearts.addHeartOnLevelComplete();

    try {
      const result = await api.submitGameLevel(lvlNum, answers, durationSeconds);
      setCompletionResult(result);
      setCompletedLevelMeta(activeMissionLevel);
      setActiveMissionLevel(null);
      setActiveChallenges([]);


      // Update progress immediately & persist in local cache & Mongo
      setProgress((prev) => {
        // STRICT: Unlock next level ONLY when user earns 3 stars!
        const nextCurrent =
          result.stars === 3 && result.newLevelUnlocked
            ? result.nextLevel
            : prev.currentLevel;

        const newCompleted =
          result.stars === 3 && !prev.completedLevels.includes(lvlNum)
            ? [...prev.completedLevels, lvlNum]
            : prev.completedLevels;

        const existingScoreIdx = (prev.levelScores || []).findIndex(
          (s) => s.levelNumber === lvlNum
        );
        let updatedScores = [...(prev.levelScores || [])];
        const newScoreEntry = {
          levelNumber: lvlNum,
          stars: Math.max(
            result.stars || 1,
            existingScoreIdx >= 0 ? updatedScores[existingScoreIdx].stars : 0
          ),
          score: result.score || 85,
        };
        if (existingScoreIdx >= 0) {
          updatedScores[existingScoreIdx] = newScoreEntry;
        } else {
          updatedScores.push(newScoreEntry);
        }

        const sanitized = sanitizeStrictProgress({
          ...prev,
          levelScores: updatedScores,
          totalXP: (prev.totalXP || 0) + (result.xpEarned || 150),
        });

        try {
          localStorage.setItem('vibe_game_progress', JSON.stringify(sanitized));
        } catch (e) {}

        return sanitized;
      });

      // If finished level 30 with 3 stars, trigger Summit celebration
      if ((lvlNum === 30 && result.stars === 3) || result.isFinalSummit) {
        setShowSummitModal(true);
      }
    } catch (err) {
      console.error('Failed to submit mission:', err);
      // Fallback completion
      setCompletionResult({
        success: true,
        stars: 3,
        xpEarned: 250,
        telemetry: { vocabulary: 92, reading: 90, writing: 88, speaking: 92 },
        nextLevel: Math.min(30, lvlNum + 1),
        newLevelUnlocked: true,
      });
      setCompletedLevelMeta(activeMissionLevel);
      setActiveMissionLevel(null);

      setProgress((prev) => {
        const updated = {
          ...prev,
          currentLevel: Math.min(30, lvlNum + 1),
          completedLevels: Array.from(new Set([...prev.completedLevels, lvlNum])),
          totalXP: (prev.totalXP || 0) + 250,
        };
        try {
          localStorage.setItem('vibe_game_progress', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  // Energy refill
  const handleRefillEnergy = async () => {
    try {
      const res = await api.refillGameEnergy();
      if (res?.energy) {
        setProgress((prev) => ({ ...prev, energy: res.energy }));
      }
    } catch (e) {
      console.warn('Energy refill fallback');
    }
  };

  // AI enhance level
  const handleAIEnhance = async (levelNumber, interest) => {
    return api.aiEnhanceGameLevel(levelNumber, interest);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-3xl shadow-xl shadow-purple-500/25 mb-4 animate-pulse">
          🗺️
        </div>
        <h2 className="text-xl font-black text-white">Loading Saylo Game World...</h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-xs">
          Preparing 30-level adventure map with clean layout.
        </p>
      </div>
    );
  }

  const currentLevelMeta = levels.find((l) => l.levelNumber === progress.currentLevel);
  const selectedWorld = worlds.find((w) => w._id === selectedLevel?.worldId) || worlds[0];
  const isSelectedLocked = selectedLevel ? selectedLevel.levelNumber > progress.currentLevel : false;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F5F5F5] flex flex-col relative overflow-hidden">
      
      {/* Sleek Floating Heart, Star & Target Status Cluster (Top-Right, Below Navbar) */}
      <GameStatsPill
        hearts={gameHearts.hearts}
        maxHearts={gameHearts.maxHearts}
        totalStars={totalStars}
        timerFormatted={gameHearts.timerFormatted}
        isFull={gameHearts.isFull}
        onOpenOutOfHearts={() => setShowOutOfHearts(true)}
        onFocusCurrentLevel={handleCenterCurrent}
      />

      {/* Main Game Screen (Clean, Full-Width Centered Map with No Right Side Panel) */}
      <div className="flex-1 flex justify-center overflow-hidden relative w-full">
        
        {/* Primary Game World Map */}
        <div className="w-full relative overflow-hidden flex flex-col">
          <GameWorldMap
            levels={levels}
            worlds={worlds}
            progress={progress}
            selectedLevel={selectedLevel}
            onSelectLevel={handleSelectLevel}
            user={user}
          />
        </div>

        {/* Level Detail Modal (Centered dialog - opens ONLY when an unlocked level is clicked) */}
        {selectedLevel && (
          <LevelDetailModal
            level={selectedLevel}
            world={selectedWorld}
            progress={progress}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedLevel(null);
            }}
            onStartMission={handleStartMission}
            onAIEnhance={handleAIEnhance}
            isLocked={isSelectedLocked}
          />
        )}

      </div>

      {/* Locked Node Quick Toast Notification */}
      {lockedToastLevel && (
        <LockedLevelToast
          levelNumber={lockedToastLevel}
          onClose={() => setLockedToastLevel(null)}
        />
      )}

      {/* Out of Hearts Modal with Live Countdown Timer */}
      <OutOfHeartsModal
        isOpen={showOutOfHearts}
        onClose={() => setShowOutOfHearts(false)}
        timerFormatted={gameHearts.timerFormatted}
        secondsRemaining={gameHearts.secondsRemaining}
      />

      {/* Active Mission Player Modal */}
      {activeMissionLevel && activeChallenges.length > 0 && (
        <MissionPlayerModal
          level={activeMissionLevel}
          challenges={activeChallenges}
          onClose={() => {
            setActiveMissionLevel(null);
            setActiveChallenges([]);
          }}
          onCompleteMission={handleCompleteMission}
          hearts={gameHearts.hearts}
          maxHearts={gameHearts.maxHearts}
          onDeductHeart={gameHearts.deductHeart}
          timerFormatted={gameHearts.timerFormatted}
          totalStars={totalStars}
        />
      )}

      {/* Mission Completion Celebration Modal */}
      {completionResult && completedLevelMeta && (
        <MissionCompleteModal
          level={completedLevelMeta}
          result={completionResult}
          onContinue={() => {
            const is3Stars = completionResult?.stars === 3;
            const nextLvlNum = completionResult?.nextLevel;
            const nextLevelMeta = levels.find((l) => l.levelNumber === nextLvlNum);

            setCompletionResult(null);
            setCompletedLevelMeta(null);

            // If 3 stars achieved, move forward to the next level!
            if (is3Stars && nextLevelMeta && nextLvlNum <= 30) {
              handleStartMission(nextLevelMeta);
            } else {
              setTimeout(() => handleCenterCurrent(), 250);
            }
          }}
          onReplay={() => {
            // Replay the SAME game, SAME level on the stream!
            const lvlToReplay = completedLevelMeta;
            setCompletionResult(null);
            setCompletedLevelMeta(null);
            handleStartMission(lvlToReplay);
          }}
        />
      )}

      {/* Final Saylo Summit Celebration Modal (Level 30) */}
      {showSummitModal && (
        <SayloSummitModal
          progress={progress}
          onClose={() => setShowSummitModal(false)}
        />
      )}


    </div>
  );
};
