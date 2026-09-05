"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { simulator, MachineData, MaintenanceTask } from "@/lib/mockData";

function SenseAndPredictContent() {
  const searchParams = useSearchParams();
  const [machines, setMachines] = useState<MachineData[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<MachineData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lineFilter, setLineFilter] = useState<"ALL" | "Line 1" | "Line 2" | "AT_RISK">("ALL");
  const [trendRange, setTrendRange] = useState<"24h" | "7d" | "30d">("24h");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    const lineParam = searchParams.get("line");
    if (filterParam === "AT_RISK") {
      setLineFilter("AT_RISK");
    } else if (lineParam === "Line 1") {
      setLineFilter("Line 1");
    } else if (lineParam === "Line 2") {
      setLineFilter("Line 2");
    }
  }, [searchParams]);

  useEffect(() => {
    const update = () => {
      const all = simulator.getMachines();
      setMachines([...all]);
      if (selectedMachine) {
        const refreshed = all.find((m) => m.id === selectedMachine.id);
        if (refreshed) setSelectedMachine(refreshed);
      }
    };
    update();
    return simulator.subscribe(update);
  }, [selectedMachine]);

  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      const matchQuery =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.type.toLowerCase().includes(searchQuery.toLowerCase());

      let matchLine = true;
      if (lineFilter === "Line 1") matchLine = m.line === "Line 1";
      if (lineFilter === "Line 2") matchLine = m.line === "Line 2";
      if (lineFilter === "AT_RISK") matchLine = m.status !== "normal";

      return matchQuery && matchLine;
    });
  }, [machines, searchQuery, lineFilter]);

  const handleCreateTask = (machine: MachineData) => {
    const task = simulator.createMaintenanceTask(machine.id);
    setFeedbackMsg(`Tiket perbaikan ${task.id} berhasil diterbitkan untuk ${machine.name}.`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleMarkReviewed = (machineId: string) => {
    setFeedbackMsg(`Kondisi sensor mesin ${machineId} telah ditandai telah direviu oleh teknisi.`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Predictive Maintenance
            </span>
            <span className="text-xs text-slate-400">• Sense & Predict Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sense & Predict
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Mengubah pemeliharaan dari reaktif menjadi prediktif berbasis getaran 3-axis, profil suhu, dan beban daya IoT.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            Prototipe Telemetri 20 Mesin
          </span>
        </div>
      </div>

      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-xs animate-in fade-in">
          <span className="material-icons text-emerald-600 text-sm">check_circle</span>
          <span className="font-semibold">{feedbackMsg}</span>
        </div>
      )}

      {/* Filters & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
            search
          </span>
          <input
            type="text"
            placeholder="Cari ID mesin, nama, atau tipe unit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4B6BFB] focus:ring-1 focus:ring-[#4B6BFB]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto">
          {[
            { key: "ALL", label: "Semua (20)" },
            { key: "Line 1", label: "Lini 1 (10)" },
            { key: "Line 2", label: "Lini 2 (10)" },
            { key: "AT_RISK", label: "Butuh Perhatian (Anomali)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setLineFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                lineFilter === tab.key
                  ? "bg-[#4B6BFB] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Machine Actionable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMachines.map((machine) => {
          const isSelected = selectedMachine?.id === machine.id;
          const isCritical = machine.status === "critical";
          const isWarning = machine.status === "warning";

          return (
            <div
              key={machine.id}
              className={`bg-white border rounded-3xl p-5 shadow-xs flex flex-col justify-between transition-all relative ${
                isCritical
                  ? "border-red-300 ring-2 ring-red-500/20"
                  : isWarning
                  ? "border-amber-300"
                  : "border-slate-200 hover:border-[#4B6BFB]/30 hover:shadow-md"
              } ${isSelected ? "ring-2 ring-[#4B6BFB]" : ""}`}
            >
              <div>
                {/* Top Row: ID, Line, Status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {machine.id}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{machine.line}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${
                        isCritical
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : isWarning
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {isCritical ? "Kritis" : isWarning ? "Peringatan" : "Normal"}
                    </span>
                  </div>
                </div>

                {/* Machine Name & Type */}
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{machine.name}</h3>
                  <span className="text-xs text-slate-400 block mt-0.5">{machine.type}</span>
                </div>

                {/* Health Score Meter */}
                <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600">Health Score</span>
                    <span
                      className={`font-mono font-bold ${
                        machine.healthScore < 50
                          ? "text-red-600"
                          : machine.healthScore < 75
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {machine.healthScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        machine.healthScore < 50
                          ? "bg-red-500"
                          : machine.healthScore < 75
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${machine.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sensor Conditions Grid */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 block">VIBRASI</span>
                    <span
                      className={`font-bold ${
                        machine.vibration > 4.5 ? "text-amber-600" : "text-slate-800"
                      }`}
                    >
                      {machine.vibration} <span className="text-[9px] font-normal">mm/s</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 block">SUHU</span>
                    <span
                      className={`font-bold ${
                        machine.temp > 70 ? "text-red-500" : "text-slate-800"
                      }`}
                    >
                      {machine.temp} <span className="text-[9px] font-normal">°C</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 block">DAYA</span>
                    <span className="font-bold text-slate-800">
                      {machine.power} <span className="text-[9px] font-normal">kW</span>
                    </span>
                  </div>
                </div>

                {/* AI Risk Detection Box */}
                <div
                  className={`mt-3 p-3 rounded-2xl border text-xs leading-relaxed space-y-1.5 ${
                    isCritical
                      ? "bg-red-50/70 border-red-200 text-red-950"
                      : isWarning
                      ? "bg-amber-50/70 border-amber-200 text-amber-950"
                      : "bg-slate-50 border-slate-100 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-0.5">
                    <span className="material-icons text-sm text-[#4B6BFB]">psychology</span>
                    <span>Analisis Anomali AI: {machine.aiRiskDetection.riskLevel}</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-800">
                    {machine.aiRiskDetection.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedMachine(machine)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors text-center shadow-xs cursor-pointer"
                >
                  Detail Mesin
                </button>

                {(isCritical || isWarning) && (
                  <button
                    onClick={() => handleCreateTask(machine)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors shadow-xs cursor-pointer"
                    title="Buat Tiket Perbaikan"
                  >
                    + Tiket
                  </button>
                )}

                <button
                  onClick={() => handleMarkReviewed(machine.id)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
                  title="Tandai Sudah Direviu"
                >
                  <span className="material-icons text-sm">check</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MACHINE DETAIL DRAWER / MODAL */}
      {selectedMachine && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200 font-sans overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-[#4B6BFB] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                  {selectedMachine.id}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">{selectedMachine.name}</h2>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${
                        selectedMachine.status === "critical"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : selectedMachine.status === "warning"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {selectedMachine.status === "critical" ? "Kritis" : selectedMachine.status === "warning" ? "Peringatan" : "Normal"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedMachine.line} • {selectedMachine.type} • Status: {selectedMachine.state}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMachine(null)}
                className="h-8 w-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
              >
                <span className="material-icons text-lg">close</span>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6">
              
              {/* Telemetry Live Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Skor Kesehatan</span>
                  <span className="text-xl font-extrabold text-slate-900 font-mono">
                    {selectedMachine.healthScore}%
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Vibrasi (3-Axis)</span>
                  <span
                    className={`text-xl font-extrabold font-mono ${
                      selectedMachine.vibration > 4.5 ? "text-amber-600" : "text-slate-900"
                    }`}
                  >
                    {selectedMachine.vibration} <span className="text-xs font-sans text-slate-500 font-normal">mm/s</span>
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Suhu Bearing</span>
                  <span
                    className={`text-xl font-extrabold font-mono ${
                      selectedMachine.temp > 70 ? "text-red-500" : "text-slate-900"
                    }`}
                  >
                    {selectedMachine.temp} <span className="text-xs font-sans text-slate-500 font-normal">°C</span>
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Daya Aktif</span>
                  <span className="text-xl font-extrabold text-slate-900 font-mono">
                    {selectedMachine.power} <span className="text-xs font-sans text-slate-500 font-normal">kW</span>
                  </span>
                </div>
              </div>

              {/* Sensor Condition Diagnosis */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-semibold text-slate-900">
                  Kondisi Sensor Retrofit IoT:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedMachine.sensorCondition.note}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedMachine.retrofitSensors.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trend Analysis (24h / 7d / 30d simulated) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Analisis Tren Telemetri Mesin</h4>
                    <span className="text-xs text-slate-400">Data Riwayat Telemetri Operasional</span>
                  </div>
                  <div className="bg-slate-100 p-1 rounded-xl flex gap-1 text-xs">
                    {(["24h", "7d", "30d"] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTrendRange(range)}
                        className={`px-2.5 py-0.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                          trendRange === range ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Visual Sparkline Bars */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Fluktuasi Vibrasi ({trendRange})</span>
                    <span className="font-bold text-slate-900 font-mono">{selectedMachine.vibration} mm/s</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1.5 h-16 items-end bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const h = Math.min(
                        100,
                        Math.max(20, (selectedMachine.vibration / 10) * 100 + (Math.sin(i) * 20))
                      );
                      return (
                        <div
                          key={i}
                          className={`rounded-t transition-all ${
                            h > 70 ? "bg-red-500" : h > 45 ? "bg-amber-400" : "bg-blue-500"
                          }`}
                          style={{ height: `${h}%` }}
                          title={`Sampel ${i + 1}`}
                        ></div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Awal Periode</span>
                    <span>Median</span>
                    <span>Terkini (Live)</span>
                  </div>
                </div>
              </div>

              {/* AI Predictive Anomaly & Failure Forecast */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-indigo-600 text-lg">psychology</span>
                    <h4 className="text-xs font-semibold text-indigo-950">
                      Analisis Prediksi Kerusakan AI Copilot
                    </h4>
                  </div>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-900 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                    Prioritas: {selectedMachine.aiRiskDetection.priority}
                  </span>
                </div>

                <div className="text-xs text-indigo-900 space-y-1.5">
                  <div>
                    <strong className="text-slate-600">Jenis Anomali:</strong>{" "}
                    <span className="font-bold">{selectedMachine.aiRiskDetection.anomalyType}</span>
                  </div>
                  <div>
                    <strong className="text-slate-600">Estimasi Waktu Kerusakan (Failure Window):</strong>{" "}
                    <span className="font-bold text-red-600">{selectedMachine.aiRiskDetection.failurePredictionWindow}</span>
                  </div>
                  <div>
                    <strong className="text-slate-600">Rekomendasi Tindakan:</strong>{" "}
                    <span>{selectedMachine.aiRiskDetection.recommendedAction}</span>
                  </div>
                </div>
              </div>

              {/* Maintenance History */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Riwayat Perawatan Terakhir</h4>
                <div className="divide-y divide-slate-100 text-xs">
                  {selectedMachine.maintenanceHistory.map((h, i) => (
                    <div key={i} className="py-2.5 flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 block">{h.action}</span>
                        <span className="text-slate-500 text-[11px]">Teknisi: {h.technician} • Hasil: {h.result}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] shrink-0">{h.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    handleCreateTask(selectedMachine);
                    setSelectedMachine(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-icons text-base">assignment_add</span>
                  <span>Terbitkan Tiket Pemeliharaan</span>
                </button>

                <button
                  onClick={() => {
                    handleMarkReviewed(selectedMachine.id);
                    setSelectedMachine(null);
                  }}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-icons text-base">done_all</span>
                  <span>Tandai Sudah Direviu</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function SenseAndPredictPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500 font-sans">
          Memuat modul Sense & Predict...
        </div>
      }
    >
      <SenseAndPredictContent />
    </Suspense>
  );
}

