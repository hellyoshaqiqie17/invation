"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  simulator,
  WaterLoopData,
  WasteBatchRecord,
  EnergyLoopData,
  ESGScorecard,
} from "@/lib/mockData";

function CloseTheLoopContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"WATER" | "WASTE" | "ENERGY" | "ESG">("WATER");
  const [water, setWater] = useState<WaterLoopData>(simulator.getWaterLoop());
  const [wasteBatches, setWasteBatches] = useState<WasteBatchRecord[]>(simulator.getWasteBatches());
  const [energy, setEnergy] = useState<EnergyLoopData>(simulator.getEnergyLoop());
  const [esg, setEsg] = useState<ESGScorecard>(simulator.getESGScorecard());
  const [selectedBatch, setSelectedBatch] = useState<WasteBatchRecord | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab")?.toUpperCase();
    if (tabParam === "WATER" || tabParam === "WASTE" || tabParam === "ENERGY" || tabParam === "ESG") {
      setActiveTab(tabParam as "WATER" | "WASTE" | "ENERGY" | "ESG");
    }
  }, [searchParams]);

  useEffect(() => {
    const update = () => {
      setWater({ ...simulator.getWaterLoop() });
      setWasteBatches([...simulator.getWasteBatches()]);
      setEnergy({ ...simulator.getEnergyLoop() });
      setEsg({ ...simulator.getESGScorecard() });
    };
    update();
    return simulator.subscribe(update);
  }, []);

  const handleVerifyWaste = (batchId: string) => {
    simulator.verifyWasteBatch(batchId);
    setActionNotice(`Batch limbah ${batchId} berhasil diverifikasi dan disahkan ke manifest resmi.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-50 border border-cyan-200 text-xs font-medium text-cyan-800">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
              Circular Economy & ESG Governance
            </span>
            <span className="text-xs text-slate-400">• Closed-Loop Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Close the Loop & ESG
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Circular resource management & real-time ESG metrics — Water, Hazardous Waste, Energy, & Corporate Governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            Audit-Ready Digital Manifest
          </span>
        </div>
      </div>

      {/* Action Toast */}
      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-xs animate-in fade-in">
          <span className="material-icons text-emerald-600 text-sm">check_circle</span>
          <span className="font-semibold">{actionNotice}</span>
        </div>
      )}

      {/* Navigation Tab Bar */}
      <div className="flex gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 w-fit overflow-x-auto">
        {[
          { key: "WATER", label: "Water Loop (64% Recycled)", icon: "water_drop" },
          { key: "WASTE", label: "Hazardous Waste Loop (B3)", icon: "recycling" },
          { key: "ENERGY", label: "Energy & Idle Power Loop", icon: "bolt" },
          { key: "ESG", label: "ESG Scorecard & Governance", icon: "verified" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="material-icons text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: WATER LOOP */}
      {activeTab === "WATER" && (
        <div className="space-y-6">
          
          {/* Top KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Inflow Air Harian</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {water.inflowM3Day} <span className="text-xs text-slate-400">m³/hari</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Pasokan eksternal</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Tingkat Daur Ulang (Recycling Rate)</span>
              <div className="text-2xl font-extrabold text-cyan-600 mt-1 font-mono">
                {water.recyclingRatePercent}%
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                Target 64% tercapai
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Air Tersirkulasi Ulang</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {water.recycledM3Day} <span className="text-xs text-slate-400">m³/hari</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Pendingin mesin M17 & M18</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Penghematan Biaya Air</span>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
                Rp 150 Jt <span className="text-xs text-slate-400">/ bln</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Reduksi ekstraksi air tanah</span>
            </div>
          </div>

          {/* Visual: Circular Flow Diagram */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Alur Sirkulasi Air Tertutup (Closed-Loop)</h3>
                <p className="text-xs text-slate-500">Visualisasi input, pendinginan, pengolahan limbah cair, dan pemanfaatan kembali.</p>
              </div>
              <span className="text-xs font-medium bg-cyan-50 text-cyan-800 px-2.5 py-1 rounded-lg border border-cyan-200">
                Efisiensi Daur Ulang 64%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { step: "01", name: "Water Input", desc: "Air baku awal diukur flow meter", metric: "180 m³/hari", icon: "water" },
                { step: "02", name: "Cooling Process", desc: "Pendinginan mesin stamping & press", metric: "145 m³ cooling", icon: "ac_unit" },
                { step: "03", name: "Treatment", desc: "Filter membran & netralisasi pH", metric: "< 5 NTU Jernih", icon: "science" },
                { step: "04", name: "Recycling", desc: "Penampungan loop reservoir", metric: "115.2 m³ kembali", icon: "autorenew" },
                { step: "05", name: "Closed Reuse", desc: "Dialirkan kembali tanpa air tanah", metric: "0 Ekstraksi Baru", icon: "check_circle" },
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Tahap {s.step}</span>
                    <span className="material-icons text-cyan-600 text-lg">{s.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{s.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 font-mono text-xs font-bold text-cyan-900">
                    {s.metric}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Leakage Warning Card */}
            {water.activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-icons text-lg">warning</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-amber-950">{alert.title}</h4>
                      <span className="text-[9px] font-mono bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-amber-900 mt-1">
                      Lokasi: <strong>{alert.line}</strong> • Deviasi Debit: <strong>{alert.flowRateDiff}</strong>
                    </p>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Rekomendasi Tindakan: <em>"{alert.recommendation}"</em>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActionNotice("Perintah inspeksi pipa seal Line 02 telah dikirim ke teknisi utilitas.");
                    setTimeout(() => setActionNotice(null), 4000);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-3.5 rounded-xl whitespace-nowrap shadow-xs transition-all cursor-pointer"
                >
                  Inspeksi Cooling Line 02
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: WASTE LOOP */}
      {activeTab === "WASTE" && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total Limbah B3 Tertampung</span>
              <div className="text-2xl font-extrabold text-red-600 mt-1 font-mono">
                460 <span className="text-xs text-slate-400">kg (2 Batch)</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Oli hidrolik & sludge fosfat</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Limbah Non-B3 Didaur Ulang</span>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
                2.270 <span className="text-xs text-slate-400">kg</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Scrap baja potong & karton</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Kepatuhan Manifest KLHK</span>
              <div className="text-2xl font-extrabold text-[#4B6BFB] mt-1 font-mono">
                100% Digital
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Vendor bersertifikasi PPLI & Wastec</span>
            </div>
          </div>

          {/* Waste Batches Table with QR Tracking Interface */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Manajemen Limbah Digital (Digital Waste Manifest)</h3>
                <p className="text-xs text-slate-500">Pelacakan end-to-end dari sumber mesin hingga pemusnahan resmi berizin.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs font-medium">
                    <th className="pb-3">Batch ID</th>
                    <th className="pb-3">Sumber / Lini</th>
                    <th className="pb-3">Jenis Limbah</th>
                    <th className="pb-3">Kategori</th>
                    <th className="pb-3">Volume</th>
                    <th className="pb-3">Vendor Berizin</th>
                    <th className="pb-3">Status Pelacakan</th>
                    <th className="pb-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {wasteBatches.map((w) => (
                    <tr key={w.batchId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-mono font-semibold text-slate-900">{w.batchId}</td>
                      <td className="py-3 text-slate-600">{w.source}</td>
                      <td className="py-3 font-medium text-slate-800">{w.wasteType}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                            w.isB3 ? "bg-red-100 text-red-700 border border-red-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {w.isB3 ? "B3 Berbahaya" : "Non-B3 Daur Ulang"}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-semibold">{w.quantityKg} kg</td>
                      <td className="py-3 text-slate-600 text-[11px]">{w.authorizedVendor}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                            w.trackingStatus === "VERIFIED_TREATED"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : w.trackingStatus === "CONTAINED"
                              ? "bg-[#EEF2FF] text-[#4B6BFB] border border-indigo-100"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {w.trackingStatus === "VERIFIED_TREATED" ? "Terverifikasi Olah" : w.trackingStatus === "CONTAINED" ? "Terkontainer" : "Dalam Pengangkutan"}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => setSelectedBatch(w)}
                          className="text-xs font-medium text-[#4B6BFB] hover:text-[#3B5BEB] underline cursor-pointer"
                        >
                          Lacak QR
                        </button>
                        {!w.esgVerified && (
                          <button
                            onClick={() => handleVerifyWaste(w.batchId)}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-1 px-2.5 rounded-lg cursor-pointer transition-colors"
                          >
                            Verifikasi
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QR-Style Modal Drawer */}
          {selectedBatch && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Digital Waste Passport</span>
                    <h3 className="text-sm font-bold text-slate-900 font-mono">{selectedBatch.batchId}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedBatch(null)}
                    className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
                  >
                    <span className="material-icons text-base">close</span>
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
                  <div className="h-32 w-32 mx-auto bg-white border border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center">
                    <span className="material-icons text-5xl text-slate-900">qr_code_2</span>
                    <span className="text-[9px] font-mono text-slate-400 mt-1">{selectedBatch.manifestCode}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{selectedBatch.wasteType}</p>
                  <span className="text-xs text-slate-500 block">
                    Vendor Berizin: <strong>{selectedBatch.authorizedVendor}</strong>
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Sumber Lini:</span>
                    <span className="font-semibold text-slate-900">{selectedBatch.source}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Volume Timbangan:</span>
                    <span className="font-semibold text-slate-900 font-mono">{selectedBatch.quantityKg} kg</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Jadwal Penjemputan:</span>
                    <span className="font-semibold text-slate-900">{selectedBatch.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status Verifikasi:</span>
                    <span className="font-semibold text-emerald-600">
                      {selectedBatch.esgVerified ? "✓ Terverifikasi ESG" : "⏳ Menunggu Verifikasi"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBatch(null)}
                  className="w-full bg-slate-900 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Tutup Rincian Manifest
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: ENERGY LOOP */}
      {activeTab === "ENERGY" && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Beban Daya Aktif Total</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
                {energy.currentPowerKw} <span className="text-xs text-slate-400">kW</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Telemetri sensor 3-phase</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Konsumsi Energi Harian</span>
              <div className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
                {energy.dailyConsumptionMwh} <span className="text-xs text-slate-400">MWh</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Shift 1 & Shift 2</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Daya Boros Idle (Idle Loss)</span>
              <div className="text-2xl font-extrabold text-amber-600 mt-1 font-mono">
                {energy.idleLossKw} <span className="text-xs text-slate-400">kW</span>
              </div>
              <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                Pemborosan Rp 1.85 Jt/hari
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Kontribusi Energi Terbarukan</span>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
                {energy.renewableContributionPercent}%
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Rooftop Solar PV Unit</span>
            </div>
          </div>

          {/* Energy Flow & Idle Detection Alert */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Alur Konsumsi Energi Pabrik</h3>
                <p className="text-xs text-slate-500">Distribusi daya dari Gardu Induk menuju Mesin Produksi dan Utilitas.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Gardu Induk (PLN + Solar)", value: "382.4 kW", desc: "Total input daya listrik pabrik", color: "bg-[#EEF2FF] border-indigo-100" },
                { title: "Lini 1 (Stamping & Machining)", value: `${energy.line1ConsumptionKw} kW`, desc: "10 mesin aktif beroperasi normal", color: "bg-emerald-50 border-emerald-200" },
                { title: "Lini 2 (Finishing & Assembly)", value: `${energy.line2ConsumptionKw} kW`, desc: "9 mesin aktif (Unit M13 henti)", color: "bg-amber-50 border-amber-200" },
                { title: "Beban Idle & Utilitas", value: `${energy.idleLossKw} kW`, desc: "Daya motor saat jeda produksi", color: "bg-red-50 border-red-200" },
              ].map((b, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${b.color} space-y-1.5`}>
                  <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                  <div className="text-xl font-extrabold font-mono text-slate-900">{b.value}</div>
                  <p className="text-[11px] text-slate-600 leading-tight">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Energy Anomaly Alert */}
            {energy.activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                      ANOMALI ENERGI IDLE
                    </span>
                    <h4 className="text-xs font-bold text-amber-950">{alert.title}</h4>
                  </div>
                  <p className="text-xs text-amber-900 mt-1">
                    Beban Daya Hilang: <strong>+{alert.excessKw} kW</strong> di luar jadwal produksi normal.
                  </p>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Rekomendasi Tindakan: <em>"{alert.recommendation}"</em>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActionNotice("Protokol auto-standby cut-off telah dikirim ke PLC inverter Lini 2.");
                    setTimeout(() => setActionNotice(null), 4000);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 px-3.5 rounded-xl whitespace-nowrap shadow-xs transition-all cursor-pointer"
                >
                  Terapkan Auto-Standby
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: ESG & SUSTAINABILITY CONTROL */}
      {activeTab === "ESG" && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ENVIRONMENTAL (E) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 border-t-4 border-t-emerald-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  Lingkungan — Environmental (E)
                </span>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  Status: {esg.environment.status}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Scope 1 Direct Carbon:</span>
                  <span className="font-semibold text-slate-900 font-mono">{esg.environment.carbonFootprintScope1Tons} tCO₂e/bln</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Scope 2 Grid Carbon:</span>
                  <span className="font-semibold text-slate-900 font-mono">{esg.environment.carbonFootprintScope2Tons} tCO₂e/bln</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Reduksi Air Tanah:</span>
                  <span className="font-semibold text-emerald-600 font-mono">{esg.environment.groundwaterReductionPercent}% (Tercapai)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reduksi Idle Energy:</span>
                  <span className="font-semibold text-[#4B6BFB] font-mono">{esg.environment.energyIdleReductionPercent}%</span>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-500 leading-relaxed">
                Bukti pemantauan audit emisi terekam real-time dari meteran CT dan sensor alir digital.
              </div>
            </div>

            {/* SOCIAL (S) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 border-t-4 border-t-amber-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800">
                  Sosial — Social (S)
                </span>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  Status: {esg.social.status}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Alokasi Reskilling:</span>
                  <span className="font-semibold text-amber-800 font-mono">Rp {esg.social.reskillingBudgetRpB} Miliar (20% CAPEX)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Pekerja Tersertifikasi:</span>
                  <span className="font-semibold text-slate-900 font-mono">{esg.social.workforceCertifiedCount} / {esg.social.workforceTotal} Orang</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Risiko PHK Masal:</span>
                  <span className="font-semibold text-emerald-600 font-mono">{esg.social.layoffRiskPercent}% (Zero Layoff)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hari Bebas Kecelakaan K3:</span>
                  <span className="font-semibold text-slate-900 font-mono">{esg.social.safetyIncidentFreeDays} Hari</span>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-500 leading-relaxed">
                Prinsip Just Transition menjamin seluruh buruh pabrik ditingkatkan keahliannya seiring otomasi.
              </div>
            </div>

            {/* GOVERNANCE (G) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 border-t-4 border-t-[#4B6BFB]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#4B6BFB]">
                  Tata Kelola — Governance (G)
                </span>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  Status: {esg.governance.status}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Ketertelusuran Digital:</span>
                  <span className="font-semibold text-[#4B6BFB] font-mono">{esg.governance.digitalTraceabilityRate}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Green Batch Terverifikasi:</span>
                  <span className="font-semibold text-slate-900 font-mono">{esg.governance.verifiedGreenBatchesPercent}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Skor Kepatuhan Audit:</span>
                  <span className="font-semibold text-emerald-600 font-mono">{esg.governance.auditComplianceScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kesiapan Audit:</span>
                  <span className="font-semibold text-slate-900">Audit-Ready (ISO 14001)</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 leading-relaxed">
                Tunggal data kebenaran (*Single Source of Truth*) bebas manipulasi manual spreadsheet.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default function CloseTheLoopPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500 font-sans">
          Memuat modul Close The Loop & ESG...
        </div>
      }
    >
      <CloseTheLoopContent />
    </Suspense>
  );
}

