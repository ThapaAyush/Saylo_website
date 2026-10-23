import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Chip } from '../components/ui/Chip';
import { DropMeInCard } from '../features/speaking/DropMeInCard';
import { CharacterCard } from '../features/speaking/CharacterCard';
import { VoiceConvoScreen } from '../features/speaking/VoiceConvoScreen';
import { api } from '../services/api';
import { Mic, Users, Sparkles, Compass } from 'lucide-react';

export const Talk = () => {
  const [activeSession, setActiveSession] = useState(null); // { scenario, character }
  const [scenarios, setScenarios] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Situations' },
    { id: 'Café', label: 'Café & Dining ☕' },
    { id: 'Airport', label: 'Airport & Travel ✈️' },
    { id: 'Party', label: 'Party & Social 🎉' },
    { id: 'Job interview', label: 'Job Interview 💼' },
    { id: 'Gaming', label: 'Gaming Discord 🎮' },
    { id: 'Meeting', label: 'Workplace Meeting 📊' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [scenariosRes, charsRes] = await Promise.all([
          api.getSpeakingScenarios({ category: activeCategory }),
          api.getSpeakingCharacters(),
        ]);
        setScenarios(scenariosRes || []);
        setCharacters(charsRes || []);
        if (charsRes?.length > 0 && !selectedCharacter) {
          setSelectedCharacter(charsRes[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  const handleStartScenario = (scenario) => {
    setActiveSession({
      scenario,
      character: selectedCharacter || characters[0],
    });
  };

  if (activeSession) {
    return (
      <div className="py-6 sm:py-10 px-4">
        <VoiceConvoScreen
          scenario={activeSession.scenario}
          character={activeSession.character}
          onExit={() => setActiveSession(null)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight flex items-center gap-2">
            <span>DROP ME IN</span>
            <span className="text-lg">🎙️</span>
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Skip robotic "repeat after me" drills. Jump straight into real-life spoken situations.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => {
            if (scenarios[0]) handleStartScenario(scenarios[0]);
          }}
          icon={Mic}
        >
          Quick Voice Session
        </Button>
      </div>

      {/* AI Conversational Partners Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Choose Your Conversational Partner
            </h2>
          </div>
          <span className="text-xs text-[#A1A1AA]">
            Selected: <strong className="text-[#A78BFA]">{selectedCharacter?.name || 'Alex'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {characters.map((char) => (
            <CharacterCard
              key={char._id}
              character={char}
              isSelected={selectedCharacter?._id === char._id}
              onSelect={(c) => setSelectedCharacter(c)}
            />
          ))}
        </div>
      </div>

      {/* Situations / Scenarios section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Choose Your Situation
          </h2>
          <span className="text-xs text-[#A1A1AA]">{scenarios.length} scenarios ready</span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={activeCategory === c.id}
              variant="cyan"
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
            </Chip>
          ))}
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <DropMeInCard
              key={scenario._id}
              scenario={scenario}
              onStart={handleStartScenario}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
