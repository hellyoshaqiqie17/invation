"use client";

import { useState } from "react";
import { Droplets, RefreshCcw, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";

export default function WaterLoopSvg() {
  const [viewMode, setViewMode] = useState<"after" | "before">("after");

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            SISTEM REKAYASA LINGKUNGAN
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
            Make Every Watt, Drop, and Material Count.
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Visualisasi sistem sirkulasi air tertutup (Closed Circular Water Loop) untuk mengurangi pengambilan air tanah secara signifikan dan mencegah kecemburuan sosial warga sekitar.
          </p>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode("before")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "before" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Kondisi Baseline (Before)
          </button>
          <button
            onClick={() => setViewMode("after")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "after" ? "bg-emerald-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Smart & Green Loop (After)
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 relative">
        
        {viewMode === "before" ? (
          /* BEFORE DIAGRAM: Linear groundwater depletion & community stress */
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 border-b border-slate-800 pb-3">
              <span className="font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                BASELINE: ALUR AIR LINIER (PEMBOROSAN AIR TANAH)
              </span>
              <span>100% Groundwater Withdrawal</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center items-center my-6">
              <div className="bg-slate-800 p-4 rounded-xl border border-amber-500/50">
                <span className="text-[10px] font-mono text-amber-400 block">SUMBER AIR</span>
                <span className="text-sm font-bold text-slate-100 mt-1 block">Air Tanah (Groundwater)</span>
                <span className="text-[10px] text-amber-400 mt-1 block font-mono">Boros 100% Air Sumur</span>
              </div>

              <ArrowRight className="hidden sm:block w-6 h-6 text-slate-500 mx-auto" />

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 block">PENGGUNAAN PABRIK</span>
                <span className="text-sm font-bold text-slate-100 mt-1 block">Cooling System (Mesin 20)</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Sekali Pakai (Once Through)</span>
              </div>

              <ArrowRight className="hidden sm:block w-6 h-6 text-slate-500 mx-auto" />

              <div className="bg-red-950/60 p-4 rounded-xl border border-red-500/80">
                <span className="text-[10px] font-mono text-red-400 block">DAMPAK LINGKUNGAN</span>
                <span className="text-sm font-bold text-red-200 mt-1 block">Sumur Warga Kering</span>
                <span className="text-[10px] text-red-400 mt-1 block font-mono">Konflik Sosial Warga Pesisir</span>
              </div>
            </div>

            <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-900/60 text-xs text-amber-200">
              <strong>Masalah Baseline:</strong> Tanpa recycling loop, pabrik menyedot air tanah secara berlebihan untuk mendinginkan mesin, menyedot air sumur dangkal masyarakat sekitar dan memicu resistensi warga.
            </div>
          </div>
        ) : (
          /* AFTER DIAGRAM: Circular Water Loop with Treatment & Sensor Monitoring */
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 border-b border-slate-800 pb-3">
              <span className="font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                SMART & GREEN: CIRCULAR CLOSED WATER LOOP
              </span>
              <span>Hingga 64% Penghematan Air Tanah</span>
            </div>

            {/* Circular Loop Graphic SVG */}
            <div className="relative h-[240px] w-full flex items-center justify-center">
              <svg viewBox="0 0 700 220" className="w-full h-full select-none">
                {/* Outer Loop Ellipse */}
                <ellipse cx="350" cy="110" rx="260" ry="75" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
                
                {/* Node 1: Cooling System */}
                <g>
                  <rect x="80" y="80" width="130" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="145" y="105" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Cooling System</text>
                  <text x="145" y="123" textAnchor="middle" fill="#34d399" fontSize="9" fontStyle="italic">Mesin Line 1 & 2</text>
                </g>

                {/* Node 2: Used Water Flow */}
                <g>
                  <rect x="285" y="25" width="130" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="350" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Flow Monitoring</text>
                  <text x="350" y="63" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace">IoT Flow Meters</text>
                </g>

                {/* Node 3: Water Treatment */}
                <g>
                  <rect x="490" y="80" width="130" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="555" y="105" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Water Treatment</text>
                  <text x="555" y="123" textAnchor="middle" fill="#34d399" fontSize="9" fontStyle="italic">Filter & pH Sensor</text>
                </g>

                {/* Node 4: Storage & Reuse */}
                <g>
                  <rect x="285" y="145" width="130" height="50" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                  <text x="350" y="168" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Storage & Reuse</text>
                  <text x="350" y="183" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontStyle="italic">Recycled Water Tank</text>
                </g>

                <circle cx="350" cy="110" r="28" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                <text x="350" y="114" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">REUSE</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-mono">REDUKSI AIR TANAH</span>
                <span className="text-sm font-bold text-emerald-400">Turun 4200 m³/bulan</span>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-mono">TINGKAT DAUR ULANG</span>
                <span className="text-sm font-bold text-emerald-400">64% Water Recycled</span>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-mono">HUBUNGAN KEMASYARAKATAN</span>
                <span className="text-sm font-bold text-emerald-400">Konflik Air Sumur 0%</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
