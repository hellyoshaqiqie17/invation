"use client";

import { useEffect, useState, useMemo } from "react";
import { simulator, MachineData } from "@/lib/mockData";
import Link from "next/link";

export default function DashboardHome() {
  const [machines, setMachines] = useState<MachineData[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>("M03");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [presenceFilter, setPresenceFilter] = useState<"all" | "line-1" | "line-2" | "warning">("all");

  useEffect(() => {
    const updateData = () => {
      const allMachines = simulator.getMachines();
      setMachines([...allMachines]);

      if (allMachines.length > 0 && !selectedMachineId) {
        setSelectedMachineId(allMachines[0].id);
      }
    };

    updateData();
    return simulator.subscribe(updateData);
  }, [selectedMachineId]);

  // Filters for machine list
  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (presenceFilter === "line-1") {
        matchesFilter = m.line === "Line 1";
      } else if (presenceFilter === "line-2") {
        matchesFilter = m.line === "Line 2";
      } else if (presenceFilter === "warning") {
        matchesFilter = m.status !== "normal";
      }

      return matchesSearch && matchesFilter;
    });
  }, [machines, searchQuery, presenceFilter]);

  const selectedMachine = machines.find((m) => m.id === selectedMachineId);

  // Compute KPI Statistics
  const total = machines.length;
  const activeOperating = machines.filter(m => m.state === "RUNNING").length;
  const optimalCount = machines.filter(m => m.status === "normal").length;
  const anomalyCount = machines.filter(m => m.status !== "normal").length;

  return (
    <div className="space-y-6 font-sans text-slate-900">
      {/* Page Header matching WearOcean */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Selamat Datang Kembali 👋</h1>
        <p className="text-sm text-slate-500 mt-1">Berikut adalah aktivitas armada mesin dan lini produksi Anda hari ini.</p>
      </div>

      {/* KPI Cards Grid matching WearOcean */}
      <div className="grid-kpis">
        {[
          { label: "Total Terdaftar", value: `${total} Unit`, icon: "settings_input_component", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
          { label: "Sedang Beroperasi", value: `${activeOperating} Unit`, icon: "precision_manufacturing", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
          { label: "Normal & Optimal", value: `${optimalCount} Unit`, icon: "check_circle", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
          { 
            label: "Kasus Anomali Aktif", 
            value: `${anomalyCount} Unit`, 
            icon: "warning", 
            iconBg: anomalyCount > 0 ? "bg-red-50" : "bg-slate-50",
            iconColor: anomalyCount > 0 ? "text-red-500" : "text-slate-400"
          }
        ].map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div>
              <span className="text-xs text-slate-500 font-medium">{k.label}</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">{k.value}</div>
            </div>
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${k.iconBg}`}>
              <span className={`material-icons text-xl ${k.iconColor}`}>{k.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Presence & Detail Panel Split Layout matching WearOcean */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Side: Machine List Card */}
        <div className="lg:col-span-7 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden h-[540px] shadow-sm" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="material-icons text-blue-500 text-lg">precision_manufacturing</span>
                Telemetri Langsung (20 Mesin)
              </h2>
              <span className="text-xs text-slate-500">{filteredMachines.length} unit</span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
              <input
                type="text"
                placeholder="Cari mesin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 w-fit">
              <button
                onClick={() => setPresenceFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  presenceFilter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setPresenceFilter("line-1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  presenceFilter === "line-1" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
              >
                Lini 1
              </button>
              <button
                onClick={() => setPresenceFilter("line-2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  presenceFilter === "line-2" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
              >
                Lini 2
              </button>
              <button
                onClick={() => setPresenceFilter("warning")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  presenceFilter === "warning" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
              >
                Anomali
              </button>
            </div>
          </div>

          {/* Scrollable Machine List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMachines.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">Tidak ada mesin yang cocok.</div>
            ) : (
              filteredMachines.map((m) => {
                const isSelected = selectedMachineId === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMachineId(m.id)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition-all border-b border-slate-50 ${
                      isSelected ? "bg-blue-50/60 border-l-[3px] border-l-blue-500" : "border-l-[3px] border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                          <span className="material-icons text-lg">settings_suggest</span>
                        </div>
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          m.status === "critical" ? "bg-red-500 animate-pulse" :
                          m.status === "warning" ? "bg-amber-500" : "bg-emerald-500"
                        }`}></span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">{m.id} - {m.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {m.line} • {m.type}
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="text-right flex items-center gap-3">
                      <div className="hidden sm:block text-right">
                        <span className="text-[11px] text-slate-400 block">Vibrasi / Power</span>
                        <span className="text-xs font-medium text-slate-900">
                          {m.vibration} mm/s / {m.power} kW
                        </span>
                      </div>
                      <span className="material-icons text-slate-300 text-lg">chevron_right</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Detail Panel matching WearOcean */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 h-[540px] flex flex-col justify-between overflow-y-auto shadow-sm" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {selectedMachine ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Detail Telemetri Mesin</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-mono font-medium">
                  {selectedMachine.id}
                </span>
              </div>

              {/* Machine Header Profile */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#4B6BFB]">
                  <span className="material-icons text-2xl">precision_manufacturing</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{selectedMachine.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      selectedMachine.status === "critical" ? "bg-red-50 text-red-600 animate-pulse" :
                      selectedMachine.status === "warning" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {selectedMachine.status.toUpperCase()}
                    </span>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      selectedMachine.status !== "normal" ? "bg-red-50 text-red-600" : "bg-blue-50 text-[#4B6BFB]"
                    }`}>
                      <span className="material-icons text-[10px]">psychology</span>
                      AI: {selectedMachine.status !== "normal" ? "Risiko Tinggi" : "Risiko Rendah"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Machine Status Grid matching WearOcean */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="col-span-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">STATUS MESIN & INTERVENSI</div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Vibrasi Bearing</span>
                  <span className={`font-semibold text-sm ${selectedMachine.vibration > 4.5 ? "text-amber-600 font-bold" : "text-slate-800"}`}>
                    {selectedMachine.vibration} mm/s
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Suhu Motor</span>
                  <span className={`font-semibold text-sm ${selectedMachine.temp > 70 ? "text-red-500 font-bold" : "text-slate-800"}`}>
                    {selectedMachine.temp} °C
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Daya Listrik</span>
                  <span className="font-semibold text-sm text-slate-800">
                    {selectedMachine.power} kW
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Health Score</span>
                  <span className={`font-semibold ${selectedMachine.healthScore < 60 ? "text-amber-600 font-bold" : "text-emerald-600"}`}>
                    {selectedMachine.healthScore}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Downtime Bulanan</span>
                  <span className="font-semibold text-slate-800">
                    {selectedMachine.downtimeHours} Jam
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Status Daur Ulang</span>
                  <span className="font-semibold text-blue-600">
                    DAUR ULANG LOOP
                  </span>
                </div>
              </div>

              {/* Environmental Telemetry BME280 */}
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Kondisi Lingkungan (BME280)</div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Suhu Sekitar</span>
                  <span className="font-semibold text-slate-700">29.2°C</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Kelembapan</span>
                  <span className="font-semibold text-slate-700">76%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Tekanan</span>
                  <span className="font-semibold text-slate-700 text-[10px] font-mono">1011 hPa</span>
                </div>
              </div>

              {/* Runtime & Energy Logs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="col-span-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Daya & Log Perjalanan</div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Kapasitas Daya</span>
                  <span className="font-semibold text-slate-800">87.75%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Est. Waktu Aktif</span>
                  <span className="font-semibold text-slate-800">~42.1 Jam</span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Action Link Button matching WearOcean */}
          {selectedMachine && (
            <Link
              href="/admin/machines"
              className="py-3 px-4 rounded-xl bg-[#4B6BFB] hover:bg-blue-600 text-sm font-semibold text-white text-center transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span className="material-icons text-sm">explore</span>
              Temukan di Skema Mesin
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
