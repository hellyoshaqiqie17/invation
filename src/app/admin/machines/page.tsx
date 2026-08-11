"use client";

import { useState } from "react";
import { simulator, MachineData } from "@/lib/mockData";
import { Cpu, Activity, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export default function MachinesFleetPage() {
  const machines: MachineData[] = simulator.getMachines();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Fleet Mesin Pilot (20 Unit Line 1 & Line 2)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Matriks kesehatan mesin, tingkat getaran, suhu bearing, downtime historis, dan sensor IoT retrofit.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider">
              <th className="pb-3 px-2">ID & Nama Mesin</th>
              <th className="pb-3 px-2">Lini</th>
              <th className="pb-3 px-2">Tipe Unit</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2">Health Score</th>
              <th className="pb-3 px-2">Vibrasi (mm/s)</th>
              <th className="pb-3 px-2">Suhu (°C)</th>
              <th className="pb-3 px-2">Downtime (Jam/Bln)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {machines.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-2 font-bold text-slate-900">{m.id} - {m.name}</td>
                <td className="py-3 px-2 text-slate-600">{m.line}</td>
                <td className="py-3 px-2 text-slate-600">{m.type}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    m.status === "critical" ? "bg-red-100 text-red-700" :
                    m.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {m.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-2 font-bold text-emerald-600">{m.healthScore}%</td>
                <td className="py-3 px-2 text-slate-800">{m.vibration}</td>
                <td className="py-3 px-2 text-slate-800">{m.temp}</td>
                <td className="py-3 px-2 text-slate-800">{m.downtimeHours} jam</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
