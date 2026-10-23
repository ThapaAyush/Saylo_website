import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Onboarding = () => {
  const navigate = useNavigate();
  const { profile, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);

  // Screen 1: Interests
  const allInterests = [
    { id: 'Gaming', label: '🎮 Gaming' },
    { id: 'Music', label: '🎵 Music' },
    { id: 'Movies', label: '🎬 Movies' },
    { id: 'Tech', label: '💻 Tech' },
    { id: 'Fashion', label: '👟 Fashion' },
    { id: 'Football', label: '⚽ Football' },
    { id: 'Travel', label: '🌍 Travel' },
    { id: 'Food', label: '🍔 Food' },
    { id: 'Business', label: '📈 Business' },
    { id: 'Creators', label: '🎥 Creators' },
    { id: 'Art', label: '🎨 Art' },
    { id: 'Books', label: '📚 Books' },
  ];
  const [selectedInterests, setSelectedInterests] = useState(['Gaming', 'Music', 'Tech']);

  // Screen 2: English Goals
  const allGoals = [
    { id: 'talk to people', label: '💬 Talk to people naturally' },
    { id: 'understand content', label: '🎬 Understand memes, movies & creators' },
    { id: 'work', label: '💼 Sound confident at work & meetings' },
    { id: 'travel', label: '🌍 Travel the world without hesitation' },
    { id: 'gaming', label: '🎮 Discord & multiplayer team banter' },
    { id: 'study', label: '🎓 Study abroad & college presentations' },
    { id: 'confidence', label: '🗣️ Stop overthinking and freeze-ups' },
  ];
  const [selectedGoals, setSelectedGoals] = useState(['talk to people', 'understand content']);

  // Screen 3: Adaptive assessment (3 quick intuitive questions)
  const assessmentQuestions = [
    {
      q: 'Which sounds most like what a friend would text you when running late?',
      options: [
        'I am apologizing for my current vehicular delay.',
        'Bro literally sprinting rn 😭 be there in 5!',
        'I proceed rapidly toward you.',
      ],
      correct: 1,
    },
    {
      q: 'When your friend says a song "hits different", they mean:',
      options: [
        'The music speaker literally hit their ear',
        'The song has a special, uniquely great emotional feeling',
        'The volume was turned down',
      ],
      correct: 1,
    },
  ];
  const [assessmentAnswers, setAssessmentAnswers] = useState({});

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    try {
      await api.updateOnboarding({
        interests: selectedInterests,
        englishGoals: selectedGoals,
        level: 'casual_speaker',
        nativeLanguage: 'hindi',
      });
      await refreshProfile();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      navigate('/home');
    } catch (err) {
      console.error(err);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-xl p-6 sm:p-10 bg-[#111113] border-white/10 space-y-8 shadow-2xl relative">
        {/* Progress dots */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <span className="text-xs font-mono font-bold text-[#A78BFA]">STEP 0{step} / 04</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`w-6 h-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-[#8B5CF6]' : 'bg-white/10'}`}
              />
            ))}
          </div>
        </div>

        {/* SCREEN 1: What are you into? */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                yo 👋 <br />
                let's build your English.
              </h1>
              <p className="text-sm text-[#A1A1AA]">
                but first... <strong className="text-white">what are you into?</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {allInterests.map(item => {
                const active = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`
                      p-3 rounded-2xl text-xs font-semibold text-left transition-all duration-200 border cursor-pointer
                      ${active ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/15' : 'bg-[#18181B] border-white/5 text-[#A1A1AA] hover:text-white'}
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(2)}
                disabled={selectedInterests.length === 0}
                icon={ArrowRight}
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 2: How do you want to use English? */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                how do you want to use English?
              </h2>
              <p className="text-xs text-[#A1A1AA]">
                Select everything that matters to you right now.
              </p>
            </div>

            <div className="space-y-2.5">
              {allGoals.map(g => {
                const active = selectedGoals.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`
                      w-full p-3.5 rounded-2xl text-xs font-semibold text-left transition-all duration-200 border flex items-center justify-between cursor-pointer
                      ${active ? 'bg-[#22D3EE]/15 border-[#22D3EE] text-white' : 'bg-[#18181B] border-white/5 text-[#A1A1AA] hover:text-white'}
                    `}
                  >
                    <span>{g.label}</span>
                    {active && <Check className="w-4 h-4 text-[#22D3EE]" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(3)}
                disabled={selectedGoals.length === 0}
                icon={ArrowRight}
                iconPosition="right"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Adaptive Quick Vibe Assessment */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="purple" size="xs">ADAPTIVE VIBE CHECK</Badge>
                <span className="text-[11px] text-[#A1A1AA]">Initial estimate only</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Let's check your intuition
              </h2>
            </div>

            <div className="space-y-4">
              {assessmentQuestions.map((qItem, qIdx) => (
                <div key={qIdx} className="p-4 bg-[#18181B] rounded-2xl border border-white/5 space-y-2.5">
                  <p className="text-xs font-bold text-white">{qItem.q}</p>
                  <div className="space-y-1.5">
                    {qItem.options.map((opt, optIdx) => {
                      const selected = assessmentAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setAssessmentAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                          className={`
                            w-full text-left p-3 rounded-xl text-xs transition border cursor-pointer
                            ${selected ? 'bg-[#8B5CF6] text-white font-semibold border-[#8B5CF6]' : 'bg-[#111113] border-white/5 text-[#D4D4D8] hover:text-white'}
                          `}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(4)}
                icon={ArrowRight}
                iconPosition="right"
              >
                Calibrate Vibe
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 4: Ready! */}
        {step === 4 && (
          <div className="space-y-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] mx-auto flex items-center justify-center text-3xl shadow-xl shadow-purple-500/20">
              ⚡
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">
                okay, we've got your vibe.
              </h2>
              <p className="text-sm text-[#A1A1AA]">
                Estimated Level: <strong className="text-[#22D3EE]">Casual Speaker 💬</strong>
              </p>
              <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                Your feed has been personalized with {selectedInterests.join(', ')} conversations and today's first Drop.
              </p>
            </div>

            <div className="pt-4">
              <Button
                variant="accent"
                size="lg"
                onClick={handleFinish}
                className="w-full text-base py-4 font-black tracking-wide"
              >
                LET'S GO →
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
