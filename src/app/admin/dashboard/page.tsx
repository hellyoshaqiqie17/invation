"use client";

import { useEffect, useState, useMemo } from "react";
import {
  simulator,
  MachineData,
  WaterLoopData,
  EnergyLoopData,
  ESGScorecard,
  RoleType,
} from "@/lib/mockData";
import Link from "next/link";

export default function ControlTowerDashboard() {
  const [machines, setMachines] = useState<MachineData[]>([]);
  const [water, setWater] = useState<WaterLoopData>(simulator.getWaterLoop());
  const [energy, setEnergy] = useState<EnergyLoopData>(simulator.getEnergyLoop());
  const [esg, setEsg] = useState<ESGScorecard>(simulator.getESGScorecard());
  const [currentRole, setCurrentRole] = useState<RoleType>(simulator.getCurrentRole());

  useEffect(() => {
    const update = () => {
      setMachines([...simulator.getMachines()]);
      setWater({ ...simulator.getWaterLoop() });
      setEnergy({ ...simulator.getEnergyLoop() });
      setEsg({ ...simulator.getESGScorecard() });
      setCurrentRole(simulator.getCurrentRole());
    };
    update();
    return simulator.subscribe(update);
  }, []);

  // Compute production & fleet metrics
  const totalMachines = machines.length;
  const runningMachines = machines.filter((m) => m.state === "RUNNING").length;
  const warningMachines = machines.filter((m) => m.status === "warning");
  const criticalMachines = machines.filter((m) => m.status === "critical");
  const atRiskCount = warningMachines.length + criticalMachines.length;
  const avgHealth = machines.length
    ? Math.round(machines.reduce((acc, m) => acc + m.healthScore, 0) / machines.length)
    : 0;

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#4B6BFB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B6BFB]"></span>
              SMN Control Tower
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Real-Time Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Operational Control Tower
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Platform komando terpadu untuk monitoring manufaktur cerdas, sirkularitas ESG, dan kesiapan tenaga kerja.
          </p>
        </div>

        {/* Role Highlight Chip */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xs">
          <div className="h-8 w-8 rounded-lg bg-[#EEF2FF] text-[#4B6BFB] flex items-center justify-center font-bold text-xs">
            {currentRole.slice(0, 2)}
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Active Workspace</span>
            <span className="text-xs font-semibold text-slate-800">{currentRole} View</span>
          </div>
        </div>
      </div>

      {/* Priority Action Board */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <span className="material-icons text-base">priority_high</span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Priority Action Board</h2>
              <p className="text-xs text-slate-500">3 intervensi operasional mendesak yang memerlukan tindakan cepat lintas divisi.</p>
            </div>
          </div>
          <span className="text-xs bg-slate-50 px-3 py-1 rounded-full border border-slate-200 text-slate-600 font-medium self-start sm:self-auto">
            {atRiskCount} Machine Anomalies • 1 Water Alert • 1 Workforce Gate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Machine Critical M13 */}
          <div className="bg-slate-50/50 border border-red-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-md">
                  Critical • Machine M13
                </span>
                <span className="text-xs text-slate-400 font-medium">Line 2</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-2">Vibration Spike (8.9 mm/s) & Thermal Alert</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Unit Secondary Stamping M13 berisiko bearing lockup dalam &lt; 48 jam jika tidak diintervensi.
              </p>
            </div>
            <Link
              href="/admin/machines"
              className="inline-flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all shadow-xs"
            >
              <span>Open Sense & Predict</span>
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Card 2: Water Loop Alert */}
          <div className="bg-slate-50/50 border border-amber-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                  Warning • Cooling Water Loop
                </span>
                <span className="text-xs text-slate-400 font-medium">Pump M17</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-2">Circulation Flow Rate Anomaly</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Debit pendingin Line 02 berkurang -14.2 L/menit. Daur ulang air 64% tetap berjalan.
              </p>
            </div>
            <Link
              href="/admin/esg?tab=WATER"
              className="inline-flex items-center justify-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all shadow-xs"
            >
              <span>Inspect Cooling Loop</span>
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Card 3: Workforce Human Readiness Gate */}
          <div className="bg-slate-50/50 border border-indigo-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold bg-[#EEF2FF] text-[#4B6BFB] px-2 py-0.5 rounded-md">
                  Human Readiness Gate
                </span>
                <span className="text-xs text-slate-400 font-medium">Line 2</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-2">Predictive Go-Live Blocked (4 Technicians)</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Hardware IoT siap, namun modul sertifikasi getaran belum selesai. Safety gate aktif.
              </p>
            </div>
            <Link
              href="/admin/workforce?section=gatekeeper"
              className="inline-flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all shadow-xs"
            >
              <span>Resolve Workforce Gate</span>
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CORE KPI SUMMARY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Production Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Fleet Status</span>
            <span className="h-8 w-8 rounded-xl bg-[#EEF2FF] text-[#4B6BFB] flex items-center justify-center">
              <span className="material-icons text-base">precision_manufacturing</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">
              {runningMachines} <span className="text-sm font-semibold text-slate-500">/ {totalMachines} Units</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Line 1 Optimal • Line 2 Restricted</span>
            </div>
          </div>
        </div>

        {/* AI Machine Health Score */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Health Score</span>
            <span className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-icons text-base">monitor_heart</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">
              {avgHealth}% <span className="text-xs font-bold text-amber-600">({atRiskCount} Anomalies)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              ISO 10816 Predictive Monitoring
            </div>
          </div>
        </div>

        {/* Circular Water Recycling Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Closed-Loop Water Recovery</span>
            <span className="h-8 w-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <span className="material-icons text-base">water_drop</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-cyan-700">
              {water.recyclingRatePercent}% <span className="text-xs font-normal text-slate-400">Recovery Rate</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Saving Rp 150 Jt / month
            </div>
          </div>
        </div>

        {/* Energy & Carbon Footprint */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Power & Energy Load</span>
            <span className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <span className="material-icons text-base">bolt</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">
              {energy.currentPowerKw} <span className="text-xs font-semibold text-slate-500">kW</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Idle Loss: <strong className="text-amber-600">{energy.idleLossKw} kW</strong> (~12.6%)
            </div>
          </div>
        </div>

      </div>

      {/* DOMAIN SECTIONS: PRODUCTION, AI & MAINTENANCE, CIRCULAR LOOPS, ESG & WORKFORCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Production & Machine Live Telemetry (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* PRODUCTION & FLEET OVERVIEW CARD */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-[#4B6BFB] block">Lini Produksi & Mesin</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Status 20 Mesin Lini 1 & Lini 2</h3>
              </div>
              <Link
                href="/admin/machines"
                className="text-xs font-semibold text-[#4B6BFB] hover:text-[#3B5BEB] flex items-center gap-1"
              >
                <span>Lihat Semua Mesin</span>
                <span className="material-icons text-xs">arrow_forward</span>
              </Link>
            </div>

            {/* Production Lines Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Lini 1 (Stamping & Machining)</span>
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-sans">
                    95% Sehat
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unit Aktif:</span>
                    <span className="font-semibold text-slate-900">10 / 10 Unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Beban Daya:</span>
                    <span className="font-semibold text-slate-900 font-mono">{energy.line1ConsumptionKw} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Anomali:</span>
                    <span className="font-semibold text-amber-600">Unit M03 (Warning)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Lini 2 (Finishing & Assembly)</span>
                  <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-md font-sans">
                    Kritis (M13 Henti)
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unit Aktif:</span>
                    <span className="font-semibold text-slate-900">9 / 10 Unit (M13 STOP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Beban Daya:</span>
                    <span className="font-semibold text-slate-900 font-mono">{energy.line2ConsumptionKw} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Anomali:</span>
                    <span className="font-semibold text-red-600">Unit M13 (STOP 58 Jam)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Fleet Telemetry Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-medium">
                    <th className="pb-2.5">Mesin</th>
                    <th className="pb-2.5">Lini</th>
                    <th className="pb-2.5">Vibrasi</th>
                    <th className="pb-2.5">Suhu</th>
                    <th className="pb-2.5">Health</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {machines.slice(0, 6).map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 font-bold text-slate-900">
                        {m.id} <span className="text-slate-500 font-normal">({m.type})</span>
                      </td>
                      <td className="py-2.5 text-slate-600">{m.line}</td>
                      <td className="py-2.5 font-mono">
                        <span className={m.vibration > 4.5 ? "text-amber-600 font-bold" : "text-slate-700"}>
                          {m.vibration} mm/s
                        </span>
                      </td>
                      <td className="py-2.5 font-mono">
                        <span className={m.temp > 70 ? "text-red-500 font-bold" : "text-slate-700"}>
                          {m.temp} °C
                        </span>
                      </td>
                      <td className="py-2.5 font-mono font-bold text-emerald-700">{m.healthScore}%</td>
                      <td className="py-2.5">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-md capitalize ${
                            m.status === "critical"
                              ? "bg-red-100 text-red-700"
                              : m.status === "warning"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <Link
                          href="/admin/machines"
                          className="text-[11px] font-semibold text-[#4B6BFB] hover:text-[#3B5BEB]"
                        >
                          Detail →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCULAR RESOURCE MANAGEMENT (WATER, WASTE, ENERGY LOOPS) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-cyan-700 block">Sirkulasi Sumber Daya Sirkular</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Water, Waste & Energy Closed-Loops</h3>
              </div>
              <Link
                href="/admin/esg"
                className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
              >
                <span>Buka Close The Loop</span>
                <span className="material-icons text-xs">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              {/* Water Card */}
              <div className="bg-cyan-50/50 border border-cyan-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-900">Sirkulasi Air</span>
                  <span className="material-icons text-cyan-600 text-base">water_drop</span>
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-950">64%</div>
                <p className="text-[11px] text-cyan-800 leading-tight">
                  Tingkat daur ulang air pendingin mesin loop tertutup.
                </p>
                <div className="pt-2 border-t border-cyan-200/60 text-[10px] text-amber-800 font-semibold">
                  ⚠️ Peringatan aliran pada pompa M17
                </div>
              </div>

              {/* Waste Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Manajemen Limbah</span>
                  <span className="material-icons text-slate-600 text-base">delete_outline</span>
                </div>
                <div className="text-2xl font-bold font-mono text-slate-900">140 kg</div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Limbah B3 oli terkontaminasi tertampung aman di kontainer berizin.
                </p>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-[#4B6BFB] font-semibold">
                  ✓ Manifest PPLI terjadwal
                </div>
              </div>

              {/* Energy Card */}
              <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-900">Efisiensi Energi</span>
                  <span className="material-icons text-amber-600 text-base">bolt</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-950">48.2 kW</div>
                <p className="text-[11px] text-amber-800 leading-tight">
                  Daya terbuang pada mesin idle. Potensi hemat Rp1.85jt/hari.
                </p>
                <div className="pt-2 border-t border-amber-200/60 text-[10px] text-amber-800 font-semibold">
                  ⚠️ Auto-standby cut-off disarankan
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ESG, Green Batch Passport & Workforce (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* GREEN BATCH PASSPORT & TRACEABILITY SNAPSHOT */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-700 block">Ketertelusuran & Integritas Produk</span>
                <h3 className="text-sm font-bold text-slate-900">Green Batch Passport & Traceability</h3>
              </div>
              <Link
                href="/admin/green-batch"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Lihat Paspor →
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Batch Terakhir Diverifikasi</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">SMN-2026-00124</span>
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                  Verified A+
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Karbon</span>
                  <span className="font-bold text-slate-800 font-mono text-xs">18.5 kg</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Air Tanah</span>
                  <span className="font-bold text-emerald-600 font-mono text-xs">0 L</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Kualitas</span>
                  <span className="font-bold text-[#4B6BFB] font-mono text-xs">100% Pass</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bukti ketertelusuran rantai pasok dari PT Sinar Baja Utama hingga CNC M01 tercatat permanen dalam paspor digital.
              </p>
            </div>
          </div>

          {/* WORKFORCE JUST TRANSITION & READINESS GATE */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-indigo-700 block">Kesiapan Tenaga Kerja</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">Grow with SMN & Readiness Gate</h3>
              </div>
              <Link
                href="/admin/workforce"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Kelola SDM →
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Kesiapan Keahlian Digital SDM</span>
                <span className="font-bold text-slate-900 font-mono">114 / 120 Pekerja (95%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: "95%" }}></div>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <span>Pintu Kesiapan Karyawan (Human Gate)</span>
                  <span className="text-xs font-medium bg-amber-200/80 px-2 py-0.5 rounded-md">
                    Hold Go-Live
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 leading-snug">
                  4 teknisi Lini 2 butuh penuntasan sertifikasi vibrasi 3-axis sebelum kontrol pengereman otomatis diaktifkan.
                </p>
                <Link
                  href="/admin/workforce"
                  className="inline-block text-[11px] font-bold text-amber-900 underline hover:text-amber-950"
                >
                  Selesaikan Pelatihan →
                </Link>
              </div>
            </div>
          </div>

          {/* FINANCIAL VALUE & ROI PREVIEW */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-400 block">Kelayakan Finansial & Nilai Bisnis</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Transformation Value</h3>
              </div>
              <Link
                href="/admin/financials"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Kalkulator ROI →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                <span className="text-xs text-slate-400 font-medium block">Target Hemat OPEX</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">18.0%</span>
                <span className="text-xs text-slate-400 block">Rp 2.88 Miliar/thn</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                <span className="text-xs text-slate-400 font-medium block">Estimasi Payback</span>
                <span className="text-lg font-bold text-white font-mono">2.78 Thn</span>
                <span className="text-xs text-emerald-400 block">IRR ~23.5%</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              "Innovation Must Pay for Itself." Efisiensi energi, daur ulang air, dan penurunan downtime membiayai sendiri modal transformasi digital.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
