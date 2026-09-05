"use client";

import { useState } from "react";
import { simulator, COPILOT_PRESET_PROMPTS, AICopilotResponse } from "@/lib/mockData";
import Link from "next/link";

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICopilotDrawer({ isOpen, onClose }: AICopilotDrawerProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<{ question: string; response: AICopilotResponse }[]>([
    {
      question: "Mesin mana saja yang membutuhkan perhatian segera hari ini?",
      response: simulator.queryCopilot("Mesin mana saja yang membutuhkan perhatian segera hari ini?"),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleAsk = (questionText: string) => {
    if (!questionText.trim()) return;
    setIsTyping(true);
    setTimeout(() => {
      const res = simulator.queryCopilot(questionText);
      setHistory((prev) => [...prev, { question: questionText, response: res }]);
      setIsTyping(false);
      setQuery("");
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200 font-sans">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#4B6BFB] text-white flex items-center justify-center shadow-xs">
              <span className="material-icons text-xl">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">SMN AI Copilot</h2>
                <span className="text-xs bg-[#EEF2FF] text-[#4B6BFB] font-medium px-2 py-0.5 rounded-md border border-indigo-100">
                  Decision Support
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Manufacturing Intelligence & Root-Cause Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        </div>

        {/* Prototype Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="material-icons text-sm text-[#4B6BFB]">psychology</span>
            Mode: Autonomous Manufacturing Copilot
          </span>
          <span className="text-[10px] bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded-md">Simulasi Demo</span>
        </div>

        {/* Chat / Query Flow */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-3">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="bg-[#4B6BFB] text-white text-xs rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[85%] shadow-sm leading-relaxed">
                  {item.question}
                </div>
              </div>

              {/* AI Structured Response */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                
                {/* INSIGHT */}
                <div className="border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4B6BFB]">
                    <span className="material-icons text-sm">insights</span>
                    Wawasan Analisis (Insight)
                  </div>
                  <p className="text-xs text-slate-900 font-semibold mt-1 leading-snug">
                    {item.response.insight}
                  </p>
                </div>

                {/* EVIDENCE */}
                <div className="border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span className="material-icons text-sm">assessment</span>
                    Bukti Sensor (Evidence)
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.response.evidence}
                  </p>
                </div>

                {/* RECOMMENDATION */}
                <div className="border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <span className="material-icons text-sm">tips_and_updates</span>
                    Rekomendasi Preskriptif (Actionable Advice)
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                    {item.response.recommendation}
                  </p>
                </div>

                {/* ACTION BUTTON */}
                <div className="pt-1 flex justify-end">
                  <Link
                    href={item.response.actionRoute}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 bg-[#4B6BFB] hover:bg-[#3B5BEB] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>{item.response.actionText}</span>
                    <span className="material-icons text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <span className="material-icons animate-spin text-sm">sync</span>
              <span>AI Copilot sedang menganalisis data telemetri...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-500 font-medium mb-2">
            Rekomendasi Pertanyaan Operasional:
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {COPILOT_PRESET_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleAsk(p.question)}
                className="text-left text-[11px] bg-white hover:bg-[#EEF2FF] hover:text-[#4B6BFB] hover:border-indigo-200 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 transition-colors shrink-0 cursor-pointer"
              >
                {p.question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(query);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tanyakan analisis mesin, energi, limbah, atau SDM..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4B6BFB] focus:ring-1 focus:ring-[#4B6BFB]"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="bg-[#4B6BFB] hover:bg-[#3B5BEB] disabled:opacity-40 text-white p-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span className="material-icons text-base">send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
