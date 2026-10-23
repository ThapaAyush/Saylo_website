import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Flag,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { api } from '../../services/api';
import { SpeakingResultsModal } from './SpeakingResultsModal';
import { ExplainModal } from '../../components/common/ExplainModal';

export const VoiceConvoScreen = ({
  scenario,
  character,
  onExit,
}) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [explainWord, setExplainWord] = useState('');

  const {
    isListening,
    transcript,
    setTranscript,
    recognitionSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech();

  const chatBottomRef = useRef(null);

  // Sync speech transcript into inputVal
  useEffect(() => {
    if (transcript) {
      setInputVal(transcript);
    }
  }, [transcript]);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiReplying]);

  // Start session on mount
  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.startConversation({
          scenarioId: scenario?._id,
          characterId: character?._id,
        });
        setSessionId(res.sessionId);
        setMessages(res.messages || []);

        // Speak initial greeting if not muted
        if (res.messages?.[0]?.text && !voiceMuted) {
          speak(res.messages[0].text);
        }
      } catch (err) {
        console.error(err);
      }
    };
    init();

    return () => {
      stopSpeaking();
      stopListening();
    };
  }, [scenario, character]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isAiReplying) return;

    stopListening();
    setInputVal('');
    setTranscript('');

    const userMsg = { sender: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsAiReplying(true);

    try {
      const res = await api.sendConversationMessage({
        sessionId,
        text,
        characterName: character?.name || 'Alex',
        scenarioContext: { context: scenario?.context || 'Casual talk' },
      });

      const aiMsg = { sender: 'ai', text: res.reply, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);

      // Speak reply aloud
      if (!voiceMuted) {
        speak(res.reply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiReplying(false);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
      if (inputVal.trim()) {
        handleSendMessage(inputVal);
      }
    } else {
      startListening();
    }
  };

  const handleWrapUp = async () => {
    stopSpeaking();
    stopListening();
    try {
      const res = await api.completeConversation({
        sessionId,
        messages,
        scenarioContext: { title: scenario?.title, context: scenario?.context },
      });
      setResultsData(res.evaluation);
      setShowResults(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] bg-[#09090B] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Top Scenario Bar */}
      <div className="p-4 bg-[#111113] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/20 border border-white/10 flex items-center justify-center text-xl shadow-inner">
            {character?.avatar || '😎'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">{character?.name || 'Alex'}</span>
              <span className="text-[10px] text-[#22D3EE] font-medium bg-[#22D3EE]/10 px-2 py-0.5 rounded-full border border-[#22D3EE]/20">
                Live Session
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] truncate max-w-xs sm:max-w-md">
              {scenario?.title || 'Casual Banter'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceMuted(!voiceMuted)}
            className={`p-2 rounded-xl border transition cursor-pointer ${voiceMuted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-zinc-300'}`}
            title={voiceMuted ? 'Unmute AI voice' : 'Mute AI voice'}
          >
            {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <Button variant="danger" size="sm" onClick={handleWrapUp} className="text-xs">
            Finish Call
          </Button>
        </div>
      </div>

      {/* Live Chat Message Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {scenario?.starterPrompt && (
          <div className="p-3 bg-[#18181F] rounded-2xl border border-white/5 text-xs text-[#A1A1AA] flex items-start gap-2">
            <span className="text-[#8B5CF6] text-base">🎯</span>
            <div>
              <strong className="text-white">Goal: </strong>
              {scenario.starterPrompt}
            </div>
          </div>
        )}

        {messages.map((m, idx) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={idx}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
            >
              <div
                className={`
                  max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed
                  ${isUser ? 'bg-[#8B5CF6] text-white rounded-br-xs shadow-lg shadow-[#8B5CF6]/15' : 'bg-[#18181B] text-[#F5F5F5] border border-white/8 rounded-bl-xs'}
                `}
              >
                <p>{m.text}</p>
              </div>

              {!isUser && (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <button
                    onClick={() => speak(m.text)}
                    className="text-[11px] text-[#71717A] hover:text-[#A78BFA] transition cursor-pointer flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Replay
                  </button>
                  <button
                    onClick={() => setExplainWord(m.text.split(' ')[0])}
                    className="text-[11px] text-[#71717A] hover:text-[#22D3EE] transition cursor-pointer"
                  >
                    Decode words
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {isAiReplying && (
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] animate-pulse p-2">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
            <span>{character?.name || 'Alex'} is replying...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Voice / Mic Waveform & Input Bar */}
      <div className="p-4 bg-[#111113] border-t border-white/5 space-y-3">
        {/* Pulsating Waveform when Listening */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 py-2 animate-in fade-in">
            <div className="w-1.5 h-6 bg-[#22D3EE] rounded-full animate-bounce" />
            <div className="w-1.5 h-10 bg-[#8B5CF6] rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-1.5 h-8 bg-[#EC4899] rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-12 bg-[#8B5CF6] rounded-full animate-bounce [animation-delay:0.15s]" />
            <div className="w-1.5 h-5 bg-[#22D3EE] rounded-full animate-bounce" />
            <span className="ml-3 text-xs font-bold text-[#22D3EE] animate-pulse">
              Listening to your voice... Speak naturally!
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Mic Button */}
          <button
            onClick={handleToggleMic}
            className={`
              w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer shadow-lg
              ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-red-500/30' : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-purple-500/25'}
            `}
            title={isListening ? 'Tap to finish voice input' : 'Tap to speak'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text input for fallback or editing */}
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? 'Listening...' : 'Type or speak your answer...'}
            className="flex-1 px-4 py-3 bg-[#18181B] border border-white/10 rounded-2xl text-sm text-[#F5F5F5] placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
          />

          <Button
            variant="primary"
            size="md"
            onClick={() => handleSendMessage()}
            disabled={!inputVal.trim() || isAiReplying}
            icon={Send}
            className="h-12 w-12 !p-0 rounded-2xl shrink-0"
          />
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <SpeakingResultsModal
          isOpen={showResults}
          onClose={() => {
            setShowResults(false);
            if (onExit) onExit();
          }}
          evaluation={resultsData}
        />
      )}

      {/* Word decoder modal */}
      {explainWord && (
        <ExplainModal
          isOpen={Boolean(explainWord)}
          onClose={() => setExplainWord('')}
          initialWord={explainWord}
        />
      )}
    </div>
  );
};
