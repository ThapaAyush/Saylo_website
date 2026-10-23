import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Volume2, Sparkles, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { api } from '../../services/api';

export const ExplainModal = ({
  isOpen,
  onClose,
  initialWord = '',
  context = '',
}) => {
  const [word, setWord] = useState(initialWord);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('simple'); // 'simple', 'casual_vs_formal', 'hindi', 'guardrails'
  const { speak } = useSpeech();

  useEffect(() => {
    if (initialWord) {
      setWord(initialWord);
      fetchExplanation(initialWord);
    }
  }, [initialWord, isOpen]);

  const fetchExplanation = async (targetWord) => {
    if (!targetWord) return;
    setLoading(true);
    try {
      const res = await api.explainWord(targetWord, context, 'hindi');
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePronounce = () => {
    if (data?.word || word) {
      speak(data?.word || word);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Decode Language in the Wild"
      subtitle="Context, nuance, tone and intuitive meaning"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Header Word Banner */}
        <div className="p-4 bg-[#18181B] rounded-2xl border border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-[#F5F5F5]">{data?.word || word}</h2>
              {data?.phonetic && (
                <span className="text-xs font-mono text-[#A1A1AA]">{data.phonetic}</span>
              )}
            </div>
            <p className="text-xs text-[#A78BFA] mt-1 font-medium">
              Tone: {data?.tone || 'Contextual & Expressive'}
            </p>
          </div>
          <button
            onClick={handlePronounce}
            className="p-3 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#A78BFA] rounded-xl transition cursor-pointer"
            title="Listen to native pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-[#18181B] rounded-xl border border-white/5 overflow-x-auto">
          {[
            { id: 'simple', label: 'Simple Meaning' },
            { id: 'casual_vs_formal', label: 'Casual vs Formal' },
            { id: 'hindi', label: 'Hindi / मतलब' },
            { id: 'guardrails', label: 'When NOT to use' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer
                ${activeTab === t.id ? 'bg-[#8B5CF6] text-white font-semibold' : 'text-[#A1A1AA] hover:text-[#F5F5F5]'}
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {loading ? (
          <div className="py-12 text-center text-sm text-[#A1A1AA] animate-pulse">
            Decoding contextual vibe...
          </div>
        ) : data ? (
          <div className="space-y-4">
            {activeTab === 'simple' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">
                    Intuitive Meaning
                  </h4>
                  <p className="text-base text-[#F5F5F5] font-medium leading-relaxed">
                    {data.meaning || data.simpleMeaning}
                  </p>
                </div>

                {data.examples?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
                      Natural Examples
                    </h4>
                    {data.examples.map((ex, idx) => (
                      <div key={idx} className="p-3 bg-[#18181B] rounded-xl text-xs text-[#E4E4E7] border border-white/5">
                        “{ex}”
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'casual_vs_formal' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="p-3.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] mb-1">
                    <span>😎 Casual Street / Social</span>
                  </div>
                  <p className="text-sm text-[#F5F5F5]">
                    {data.casualExample || data.examples?.[0] || 'Bro really thought he could pull that off.'}
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#A1A1AA] mb-1">
                    <span>💼 Formal / Workplace</span>
                  </div>
                  <p className="text-sm text-[#E4E4E7]">
                    {data.formalExample || 'He performed the requirements with remarkable competence.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'hindi' && (
              <div className="space-y-3 animate-in fade-in duration-150 p-4 bg-[#18181B] rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Badge variant="orange" size="xs">Bilingual Aid</Badge>
                  <span className="text-xs font-bold text-[#FB923C]">हिंदी में मतलब</span>
                </div>
                <p className="text-lg font-semibold text-[#F5F5F5]">
                  {data.hindiMeaning || 'आम बोलचाल में इस्तेमाल होने वाला स्वाभाविक शब्द।'}
                </p>
                {data.hindiExample && (
                  <div className="pt-2 border-t border-white/5 text-xs text-[#A1A1AA]">
                    <span className="text-white font-medium">उदाहरण: </span>
                    {data.hindiExample}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'guardrails' && (
              <div className="space-y-3 animate-in fade-in duration-150 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>When NOT to use this word:</span>
                </div>
                <p className="text-sm text-[#F5F5F5]">
                  {data.dontUseIn || data.whenNotToUse || 'Avoid using in formal contracts or academic theses.'}
                </p>
              </div>
            )}
          </div>
        ) : null}

        <div className="pt-2 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  );
};
