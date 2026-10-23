import { useState, useEffect, useRef, useCallback } from 'react';
import { playSuccessSound, playNoticeSound, playMicSound } from '../services/soundEffects';

/**
 * Intelligent Voice Selection:
 * Automatically identifies the highest quality, clearest, most natural voice on the user's browser.
 * Supports natural neural voices, Indian English, British English, and American English without artificial pitch distortion.
 */
export const selectBestVoice = (voices = [], preference = 'natural') => {
  if (!voices || voices.length === 0) return null;

  const pref = preference.toLowerCase();

  const isNatural = (v) => {
    const name = (v.name || '').toLowerCase();
    return name.includes('natural') || name.includes('online') || name.includes('neural') || name.includes('multilingual');
  };

  const isEnglish = (v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.startsWith('en');
  };

  // Preference: Indian English ('indian' or 'en-in')
  if (pref === 'indian') {
    const naturalIndian = voices.find((v) => {
      const lang = (v.lang || '').toLowerCase();
      return (lang.includes('en-in') || lang.includes('en_in') || v.name.toLowerCase().includes('india')) && isNatural(v);
    });
    if (naturalIndian) return naturalIndian;

    const knownIndian = voices.find((v) => {
      const name = v.name.toLowerCase();
      const lang = (v.lang || '').toLowerCase();
      const isIndLang = lang.includes('en-in') || lang.includes('en_in') || name.includes('india');
      return isIndLang && (name.includes('neerja') || name.includes('ravi') || name.includes('prabhat') || name.includes('heera') || name.includes('google'));
    });
    if (knownIndian) return knownIndian;

    const anyIndian = voices.find((v) => {
      const lang = (v.lang || '').toLowerCase();
      return lang.includes('en-in') || lang.includes('en_in');
    });
    if (anyIndian) return anyIndian;
  }

  // Preference: British English ('uk' or 'british')
  if (pref === 'uk' || pref === 'british') {
    const ukNatural = voices.find((v) => (v.lang || '').toLowerCase().includes('en-gb') && isNatural(v));
    if (ukNatural) return ukNatural;
    const ukAny = voices.find((v) => (v.lang || '').toLowerCase().includes('en-gb'));
    if (ukAny) return ukAny;
  }

  // Preference: US English ('us' or 'american')
  if (pref === 'us' || pref === 'american') {
    const usNatural = voices.find((v) => (v.lang || '').toLowerCase().includes('en-us') && isNatural(v));
    if (usNatural) return usNatural;
    const usAny = voices.find((v) => (v.lang || '').toLowerCase().includes('en-us'));
    if (usAny) return usAny;
  }

  // Default 'natural': Pick the premier studio-grade Natural/Neural English voice
  const topNatural = voices.find((v) => isEnglish(v) && isNatural(v));
  if (topNatural) return topNatural;

  const popularHighQuality = voices.find((v) => {
    const name = v.name.toLowerCase();
    return (
      isEnglish(v) &&
      (name.includes('google') ||
        name.includes('david') ||
        name.includes('george') ||
        name.includes('mark') ||
        name.includes('samantha') ||
        name.includes('daniel') ||
        name.includes('guy') ||
        name.includes('jenny'))
    );
  });
  if (popularHighQuality) return popularHighQuality;

  const anyEnglish = voices.find(isEnglish);
  if (anyEnglish) return anyEnglish;

  return voices[0] || null;
};

export const useSpeech = (initialVoicePreference = 'natural') => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micError, setMicError] = useState(null);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [voicePreference, setVoicePreference] = useState(initialVoicePreference);
  const [activeVoice, setActiveVoice] = useState(null);

  const recognitionRef = useRef(null);
  const isListeningIntendedRef = useRef(false);
  const utterancesQueueRef = useRef([]);
  const isCancelledRef = useRef(false);
  const sessionFinalAccumulatedRef = useRef('');
  const transcriptRef = useRef('');

  // Initialize and load system voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    setSynthesisSupported(true);

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        setVoices(available);
        const selected = selectBestVoice(available, voicePreference);
        setActiveVoice(selected);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [voicePreference]);

  // Update active voice when preference changes
  const changeVoicePreference = useCallback(
    (newPref) => {
      setVoicePreference(newPref);
      if (voices.length > 0) {
        const selected = selectBestVoice(voices, newPref);
        setActiveVoice(selected);
      }
    },
    [voices]
  );

  // Determine ideal recognition language
  const getRecognitionLocale = useCallback(() => {
    if (voicePreference === 'indian') return 'en-IN';
    if (voicePreference === 'uk') return 'en-GB';
    if (voicePreference === 'us') return 'en-US';
    // If browser is in India or English locale, prioritize en-IN for crystal-clear phonetics
    if (typeof navigator !== 'undefined') {
      const navLang = navigator.language || '';
      if (navLang.toLowerCase().includes('in')) return 'en-IN';
      if (navLang.toLowerCase().startsWith('en')) return navLang;
    }
    return 'en-IN';
  }, [voicePreference]);

  // Initialize Speech Recognition (Smooth, Continuous, Real-time Word-by-Word)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    setRecognitionSupported(true);
    const recognition = new SpeechRecognition();

    // continuous keeps the microphone open without stopping after 1 word
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = getRecognitionLocale();

    recognition.onstart = () => {
      setIsListening(true);
      setMicError(null);
      playMicSound(true);
    };

    recognition.onresult = (event) => {
      let currentSessionFinal = '';
      let currentInterim = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const phrase = result[0]?.transcript || '';
        if (result.isFinal) {
          currentSessionFinal += phrase + ' ';
        } else {
          currentInterim += phrase;
        }
      }

      const basePrefix = sessionFinalAccumulatedRef.current ? sessionFinalAccumulatedRef.current.trim() + ' ' : '';
      const fullFinal = (basePrefix + currentSessionFinal).trim();
      const fullCombined = (fullFinal + (currentInterim ? ' ' + currentInterim : '')).trim();

      transcriptRef.current = fullCombined;
      setTranscript(fullCombined);
      setInterimTranscript(currentInterim.trim());
    };

    recognition.onerror = (event) => {
      console.warn('[Speech Recognition Event]:', event.error);

      // 'no-speech' is silence while thinking — do NOT stop the mic
      if (event.error === 'no-speech') {
        return;
      }

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setMicError('Microphone permission blocked. Please allow mic access in your browser address bar 🔒');
        isListeningIntendedRef.current = false;
        setIsListening(false);
        playMicSound(false);
      } else if (event.error === 'audio-capture') {
        setMicError('No microphone detected. Please plug in or enable your microphone.');
        isListeningIntendedRef.current = false;
        setIsListening(false);
        playMicSound(false);
      }
    };

    recognition.onend = () => {
      // Seamless auto-restart if user still wants to speak
      if (isListeningIntendedRef.current) {
        if (transcriptRef.current) {
          sessionFinalAccumulatedRef.current = transcriptRef.current;
        }
        try {
          recognition.start();
        } catch (e) {
          setTimeout(() => {
            if (isListeningIntendedRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (err) {}
            }
          }, 250);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
  }, [getRecognitionLocale]);

  // Update recognition language when preference changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getRecognitionLocale();
    }
  }, [getRecognitionLocale]);

  /**
   * Start listening smoothly and catch each word
   */
  const startListening = useCallback(async () => {
    setMicError(null);
    setTranscript('');
    setInterimTranscript('');
    transcriptRef.current = '';
    sessionFinalAccumulatedRef.current = '';
    isListeningIntendedRef.current = true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError('Speech recognition is not supported in this browser. Please use Chrome or Edge for live mic capture, or type directly in the box.');
      isListeningIntendedRef.current = false;
      setIsListening(false);
      return;
    }

    // Check permission without destroying audio stream
    if (navigator?.permissions?.query) {
      try {
        const permStatus = await navigator.permissions.query({ name: 'microphone' });
        if (permStatus.state === 'denied') {
          setMicError('Microphone permission was denied. Click the lock/settings icon in your browser address bar to allow microphone access.');
          isListeningIntendedRef.current = false;
          setIsListening(false);
          return;
        }
      } catch (e) {}
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = getRecognitionLocale();
        recognitionRef.current.start();
      } catch (e) {
        if (e.name === 'InvalidStateError') {
          // Already running or starting
        } else {
          console.warn('Speech recognition start:', e);
        }
      }
    }
  }, [getRecognitionLocale]);

  /**
   * Stop listening cleanly
   */
  const stopListening = useCallback(() => {
    isListeningIntendedRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    playMicSound(false);
  }, []);

  const audioElementRef = useRef(null);

  /**
   * Stop all ongoing speech synthesis and clear active queues
   */
  const stopSpeaking = useCallback(() => {
    isCancelledRef.current = true;
    utterancesQueueRef.current = [];
    if (audioElementRef.current) {
      try {
        audioElementRef.current.pause();
        audioElementRef.current.currentTime = 0;
      } catch (e) {}
      audioElementRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume(); // Reset any frozen speech pause state
    }
    setIsSpeaking(false);
  }, []);

  /**
   * Internal browser-based SpeechSynthesis chunker fallback
   */
  const speakBrowserFallback = useCallback(
    (text, options = {}) => {
      if (!('speechSynthesis' in window) || !text || !text.trim()) return;

      const {
        pitch = 1.0,
        rate = 0.98,
        volume = 1.0,
        voice = null,
        onEnd = null,
      } = options;

      const voiceToUse = voice || activeVoice || selectBestVoice(window.speechSynthesis.getVoices(), voicePreference);
      const sentences = text
        .trim()
        .split(/(?<=[.?!;:\n])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (sentences.length === 0) return;

      setIsSpeaking(true);
      let currentIndex = 0;

      const speakNextChunk = () => {
        if (isCancelledRef.current) return;

        if (currentIndex >= sentences.length) {
          setIsSpeaking(false);
          if (onEnd) onEnd();
          return;
        }

        const sentenceText = sentences[currentIndex];
        currentIndex += 1;

        const utterance = new SpeechSynthesisUtterance(sentenceText);
        if (voiceToUse) {
          utterance.voice = voiceToUse;
          utterance.lang = voiceToUse.lang || 'en-US';
        } else {
          utterance.lang = 'en-US';
        }

        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;

        window.__currentSpeechUtterance = utterance;

        utterance.onend = () => {
          if (!isCancelledRef.current) speakNextChunk();
        };

        utterance.onerror = () => {
          if (!isCancelledRef.current) speakNextChunk();
        };

        try {
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          setIsSpeaking(false);
        }
      };

      speakNextChunk();
    },
    [activeVoice, voicePreference]
  );

  /**
   * Speak text: Attempts Cloud Studio Voice first (ElevenLabs / OpenAI if API key set in .env),
   * smoothly falling back to the browser's high-definition Speech Synthesis.
   */
  const speak = useCallback(
    async (text, options = {}) => {
      if (!text || !text.trim()) return;

      stopSpeaking();
      isCancelledRef.current = false;

      // Check if Cloud Studio Voice API is configured in backend
      try {
        const res = await fetch('/api/speaking/synthesize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voicePreference }),
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('audio')) {
          const blob = await res.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          audioElementRef.current = audio;

          setIsSpeaking(true);
          audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
            audioElementRef.current = null;
            if (options.onEnd) options.onEnd();
          };
          audio.onerror = () => {
            setIsSpeaking(false);
            audioElementRef.current = null;
            speakBrowserFallback(text, options);
          };

          await audio.play();
          return;
        }
      } catch (err) {
        // Fallback to browser
      }

      // Safe resume in case speech engine was paused
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      speakBrowserFallback(text, options);
    },
    [stopSpeaking, speakBrowserFallback, voicePreference]
  );

  return {
    isListening,
    isSpeaking,
    transcript,
    interimTranscript,
    setTranscript,
    micError,
    setMicError,
    recognitionSupported,
    synthesisSupported,
    voices,
    activeVoice,
    voicePreference,
    changeVoicePreference,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    // Integrated sound effects
    playSuccessSound,
    playNoticeSound,
    playMicSound,
  };
};
