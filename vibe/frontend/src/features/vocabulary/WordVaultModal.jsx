import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  FileText,
  Download,
  Trash2,
  X,
  Search,
  Volume2,
  ExternalLink,
  BookMarked,
  Sparkles,
} from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';

export const WordVaultModal = ({ isOpen, onClose, savedWords = [], onRemoveWord }) => {
  const [search, setSearch] = useState('');
  const { speak } = useSpeech();

  if (!isOpen) return null;

  const filteredWords = savedWords.filter((w) => {
    const q = search.toLowerCase();
    return (
      w.word?.toLowerCase().includes(q) ||
      w.meaning?.toLowerCase().includes(q) ||
      w.category?.toLowerCase().includes(q)
    );
  });

  const exportAsTextFile = () => {
    if (savedWords.length === 0) return;
    const dateStr = new Date().toISOString().split('T')[0];
    let fileContent = `=======================================================\n`;
    fileContent += `  MY SAYLO VOCABULARY NOTEBOOK — SAVED WORDS FILE\n`;
    fileContent += `  Say it. Mean it. Own it.\n`;
    fileContent += `  Export Date: ${dateStr}\n`;
    fileContent += `  Total Words Mastered: ${savedWords.length}\n`;
    fileContent += `=======================================================\n\n`;

    savedWords.forEach((item, index) => {
      fileContent += `[${index + 1}] ${item.word.toUpperCase()} ${item.phonetic ? `(${item.phonetic})` : ''}\n`;
      fileContent += `Difficulty: ${item.difficulty || 'Everyday'} | Category: ${item.category || 'General'}\n`;
      fileContent += `Meaning: ${item.meaning}\n`;
      if (item.hindiMeaning) fileContent += `Hindi Translation: ${item.hindiMeaning}\n`;
      if (item.caughtInTheWild?.quote) {
        fileContent += `Context Example: "${item.caughtInTheWild.quote}"\n`;
      } else if (item.examples?.[0]) {
        fileContent += `Example: "${item.examples[0]}"\n`;
      }
      if (item.dontUseIn) fileContent += `Avoid In: ${item.dontUseIn}\n`;
      fileContent += `-------------------------------------------------------\n\n`;
    });

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my_saylo_vocabulary_${dateStr}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsJsonFile = () => {
    if (savedWords.length === 0) return;
    const dateStr = new Date().toISOString().split('T')[0];
    const dataStr = JSON.stringify(savedWords, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my_saylo_vocabulary_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#111114] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#15151A]">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">My Vocabulary File</h3>
                <Badge variant="purple" size="xs">
                  {savedWords.length} Saved
                </Badge>
              </div>
              <p className="text-xs text-[#A1A1AA]">
                All words you've learned & remembered are securely kept in this file.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search & Export actions */}
        <div className="p-4 border-b border-white/5 bg-[#121216] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search saved words..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#18181D] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAsTextFile}
              disabled={savedWords.length === 0}
              icon={Download}
              className="text-xs font-bold shrink-0"
              title="Download text file to your device"
            >
              Export as .TXT File
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportAsJsonFile}
              disabled={savedWords.length === 0}
              className="text-xs font-bold text-zinc-400 hover:text-white shrink-0"
            >
              .JSON
            </Button>
          </div>
        </div>

        {/* Word List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {savedWords.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <span className="text-4xl block">📖</span>
              <h4 className="text-base font-bold text-white">Your Word File is Empty</h4>
              <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
                As you learn and mark words as "Remembered", they will automatically be filed here so you never lose them!
              </p>
            </div>
          ) : filteredWords.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500">
              No saved words matched "{search}".
            </div>
          ) : (
            filteredWords.map((item, idx) => (
              <div
                key={item._id || item.word || idx}
                className="p-4 bg-[#16161B] rounded-2xl border border-white/5 hover:border-white/10 transition flex items-start justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.sequenceNumber && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                        #{String(item.sequenceNumber).padStart(3, '0')}
                      </span>
                    )}
                    <span className="text-base font-black text-white">{item.word}</span>
                    {item.phonetic && (
                      <span className="text-xs font-mono text-[#A1A1AA]">{item.phonetic}</span>
                    )}
                    <button
                      onClick={() => speak(item.word)}
                      className="p-1 rounded-md text-[#22D3EE] hover:bg-white/5 transition"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <Badge variant="purple" size="xs">
                      {item.category || 'Casual'}
                    </Badge>
                    <Badge variant="cyan" size="xs">
                      {item.difficulty || 'Daily'}
                    </Badge>
                  </div>

                  <p className="text-xs text-[#D4D4D8] leading-relaxed">{item.meaning}</p>

                  {item.hindiMeaning && (
                    <p className="text-[11px] text-amber-300">
                      मतलब: {item.hindiMeaning}
                    </p>
                  )}

                  {item.caughtInTheWild?.quote && (
                    <div className="p-2 bg-black/40 rounded-xl border border-white/5 text-[11px] text-zinc-400">
                      <span className="text-[#A78BFA] font-medium">In Context: </span>
                      "{item.caughtInTheWild.quote}"
                    </div>
                  )}
                </div>

                {onRemoveWord && (
                  <button
                    onClick={() => onRemoveWord(item._id || item.word)}
                    className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition cursor-pointer shrink-0"
                    title="Remove from my file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-[#141418] flex items-center justify-between text-xs text-zinc-500">
          <span>Persisted automatically across sessions</span>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs font-bold text-white">
            Close File
          </Button>
        </div>
      </div>
    </div>
  );
};
