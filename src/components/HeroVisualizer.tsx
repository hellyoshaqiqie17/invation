"use client";

import { useState } from "react";
import { Cpu, Zap, Droplets, ShieldCheck, ArrowRight, Play, RefreshCw } from "lucide-react";

export default function HeroVisualizer() {
  const [stage, setStage] = useState<0 | 1 | 2>(2);

  const stageTitles = [
    "01. Legacy Factory (Kondisi Baseline)",
    "02. Connected Retrofit Factory (Tahap Sensor IoT)",
    "03. Smart & Green Transformation (Visi Final 5.0)"
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[90px] transition-all duration-700 pointer-events-none ${
        stage === 0 ? "bg-amber-600/20" : stage === 1 ? "bg-[#4B6BFB]/25" : "bg-emerald-500/30"
      }`} />
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Simulasi Interaktif Evolusi Pabrik
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">
            {stageTitles[stage]}
          </h3>
        </div>

        {/* Stage Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setStage(0)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              stage === 0 ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Legacy
          </button>
          <button
            onClick={() => setStage(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              stage === 1 ? "bg-blue-500 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Connected
          </button>
          <button
            onClick={() => setStage(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              stage === 2 ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Smart & Green
          </button>
        </div>
      </div>

      {/* Interactive Graphic Scene */}
      <div className="my-8 relative h-[300px] sm:h-[340px] w-full flex items-center justify-center">
        
        {/* Machine Line SVG Canvas */}
        <svg viewBox="0 0 800 320" className="w-full h-full drop-shadow-md select-none">
          {/* Floor grid line */}
          <line x1="50" y1="260" x2="750" y2="260" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />

          {/* Machine 01 Body */}
          <rect x="80" y="130" width="160" height="120" rx="8" fill="#1e293b" stroke={stage === 0 ? "#f59e0b" : stage === 1 ? "#3b82f6" : "#10b981"} strokeWidth="2.5" />
          <text x="160" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">PILOT MACHINE 01</text>
          
          {/* Machine 02 Body */}
          <rect x="320" y="130" width="160" height="120" rx="8" fill="#1e293b" stroke={stage === 0 ? "#ef4444" : stage === 1 ? "#3b82f6" : "#10b981"} strokeWidth="2.5" />
          <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">PILOT MACHINE 02</text>

          {/* Control Tower Unit */}
          <rect x="580" y="110" width="140" height="140" rx="12" fill={stage === 2 ? "#064e3b" : "#0f172a"} stroke={stage === 2 ? "#10b981" : "#475569"} strokeWidth="2.5" />
          <text x="650" y="140" textAnchor="middle" fill={stage === 2 ? "#34d399" : "#64748b"} fontSize="11" fontWeight="bold">ESG TOWER</text>

          {/* STAGE 0: Legacy Indicators */}
          {stage === 0 && (
            <g className="animate-pulse">
              {/* Alert smokes */}
              <circle cx="200" cy="110" r="14" fill="#ef4444" opacity="0.4" />
              <text x="200" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">!</text>
              <text x="160" y="210" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">Downtime: 45h/bln</text>
              <text x="400" y="210" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">Defect: 4.5%</text>
              <text x="650" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Manual Excel</text>
            </g>
          )}

          {/* STAGE 1: Connected Retrofit Sensors */}
          {stage >= 1 && (
            <g>
              {/* Vibration Sensors */}
              <circle cx="110" cy="120" r="8" fill="#3b82f6" />
              <text x="110" y="123" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">VIB</text>

              <circle cx="350" cy="120" r="8" fill="#3b82f6" />
              <text x="350" y="123" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">VIB</text>

              {/* Temp Sensors */}
              <circle cx="210" cy="120" r="8" fill="#ef4444" />
              <text x="210" y="123" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">TMP</text>

              <circle cx="450" cy="120" r="8" fill="#ef4444" />
              <text x="450" y="123" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">TMP</text>

              {/* Data Communication Cables */}
              <path d="M 160 130 Q 240 80 320 80 T 650 110" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
              <circle cx="320" cy="80" r="4" fill="#60a5fa" />
              
              <text x="160" y="210" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">IoT Gateway Ready</text>
              <text x="400" y="210" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">MQTT Telemetry</text>
            </g>
          )}

          {/* STAGE 2: Smart & Green Optimization */}
          {stage === 2 && (
            <g>
              {/* Water Loop Tube */}
              <path d="M 240 230 C 280 280, 480 280, 520 230" fill="none" stroke="#10b981" strokeWidth="3" />
              <text x="380" y="285" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Circular Water Loop (64% Recycled)</text>

              {/* Energy Monitor Badges */}
              <rect x="110" y="225" width="100" height="20" rx="4" fill="#065f46" />
              <text x="160" y="238" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Power: 18.5 kW (Opt)</text>

              <rect x="350" y="225" width="100" height="20" rx="4" fill="#065f46" />
              <text x="400" y="238" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Health: 94% Normal</text>

              {/* ESG Tower Live Stream */}
              <circle cx="650" cy="180" r="18" fill="#10b981" opacity="0.3" className="animate-ping" />
              <circle cx="650" cy="180" r="12" fill="#10b981" />
              <text x="650" y="184" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">LIVE</text>
            </g>
          )}
        </svg>

      </div>

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Energi & OPEX</span>
            <span className="font-bold text-slate-200">
              {stage === 0 ? "Boros 40 MWh/mo (Rp16B OPEX)" : stage === 1 ? "Monitoring Idle Energy" : "Hemat 15-20% (Rp2.4B-Rp3.2B/thn)"}
            </span>
          </div>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Air Tanah & Limbah B3</span>
            <span className="font-bold text-slate-200">
              {stage === 0 ? "Pengambilan Air Berlebih" : stage === 1 ? "Sensor Flow Rate" : "Daur Ulang Air Loop Closed"}
            </span>
          </div>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">SDM & Just Transition</span>
            <span className="font-bold text-slate-200">
              {stage === 0 ? "Risiko PHK / Cemas AI" : stage === 1 ? "Program Upskilling Level 1" : "Reskilled ke Operator Smart (Rp1.2B)"}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
