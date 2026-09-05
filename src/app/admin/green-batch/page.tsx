"use client";

import { useState } from "react";
import {
  simulator,
  GreenBatchPassport,
  TraceabilityNode,
} from "@/lib/mockData";

export default function GreenBatchPassportPage() {
  const passports = simulator.getGreenBatchPassports();
  const [selectedBatchId, setSelectedBatchId] = useState<string>("SMN-2026-00124");
  const [selectedNode, setSelectedNode] = useState<TraceabilityNode | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const currentPassport: GreenBatchPassport =
    passports.find((p) => p.batchId === selectedBatchId) || passports[0];

  const handleExport = () => {
    setExportNotice(
      `Digital Product Passport for batch ${currentPassport.batchId} has been successfully generated as an audit-ready PDF certificate.`
    );
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Digital Product Passport
            </span>
            <span className="text-xs text-slate-400">• End-to-End Provenance & Traceability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Green Batch Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Digital identity for sustainable manufacturing: verifiable raw material provenance, product carbon footprint (PCF), and CBAM/ISO compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
            ✓ Tamper-Proof Cryptographic Ledger
          </span>
        </div>
      </div>

      {/* Export Toast */}
      {exportNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-xs animate-in fade-in">
          <span className="material-icons text-emerald-600 text-sm">check_circle</span>
          <span className="font-semibold">{exportNotice}</span>
        </div>
      )}

      {/* Batch Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Select Production Batch:</span>
          <div className="flex gap-2">
            {passports.map((p) => (
              <button
                key={p.batchId}
                onClick={() => {
                  setSelectedBatchId(p.batchId);
                  setSelectedNode(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedBatchId === p.batchId
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {p.batchId}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span className="material-icons text-sm">download</span>
            <span>Export Passport</span>
          </button>
        </div>
      </div>

      {/* DIGITAL PASSPORT CARD */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Verification Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <span className="material-icons text-2xl">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  Batch ID: <span className="font-mono">{currentPassport.batchId}</span>
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                    currentPassport.status === "VERIFIED"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {currentPassport.status === "VERIFIED" ? "Terverifikasi" : "Dalam Tinjauan"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Penerbit: {currentPassport.verifier} • Diterbitkan: {currentPassport.issuedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-14 w-14 bg-slate-50 border border-slate-200 rounded-xl p-1 flex flex-col items-center justify-center text-slate-900">
              <span className="material-icons text-2xl">qr_code_2</span>
              <span className="text-[9px] font-mono text-slate-500">{currentPassport.qrHash.slice(0, 10)}</span>
            </div>
          </div>
        </div>

        {/* Passport Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 block">Spesifikasi Material</span>
            <div className="text-xs font-bold text-slate-900">{currentPassport.material}</div>
            <span className="text-[11px] text-slate-500 block">Pemasok: {currentPassport.supplier}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 block">Lini & Mesin Pemroses</span>
            <div className="text-xs font-bold text-slate-900">{currentPassport.productionLine}</div>
            <span className="text-[11px] text-slate-500 block font-mono">{currentPassport.machineId}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 block">Konsumsi Sumber Daya</span>
            <div className="text-xs font-bold text-slate-900 font-mono">
              {currentPassport.energyKwh} kWh • {currentPassport.waterLiters} L
            </div>
            <span className="text-[11px] text-slate-500 block">Limbah: {currentPassport.wasteKg} kg scrap</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 block">Skor ESG & Jejak Karbon</span>
            <div className="text-xs font-bold text-emerald-600 font-mono">
              Grade {currentPassport.esgScore} • {currentPassport.carbonFootprintKgCO2e} kgCO₂e
            </div>
            <span className="text-[11px] text-[#4B6BFB] font-semibold block">
              QC: {currentPassport.qualityStatus}
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400">
          <span>Digital Passport Hash: <strong className="font-mono text-slate-600">{currentPassport.qrHash}</strong></span>
          <span className="mt-1 sm:mt-0 font-medium text-emerald-700">✓ ISO 14067 & CBAM Green Export Audit Standard Compliant</span>
        </div>
      </div>

      {/* FULL LIFECYCLE INTERACTIVE TIMELINE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Jalur Ketertelusuran Siklus Hidup Batch (10-Node Lifecycle)
            </h3>
            <p className="text-xs text-slate-500">
              Klik pada simpul mana saja untuk memeriksa bukti sensor dan stempel audit (*audit trail evidence*).
            </p>
          </div>
          <span className="text-xs font-medium bg-[#EEF2FF] text-[#4B6BFB] px-2.5 py-1 rounded-lg border border-indigo-100">
            10 Simpul Terverifikasi
          </span>
        </div>

        {/* Horizontal Visual Timeline Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 overflow-x-auto pb-2">
          {currentPassport.lifecycle.map((node, i) => {
            const isCurrent = selectedNode?.step === node.step;

            return (
              <button
                key={i}
                onClick={() => setSelectedNode(node)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] cursor-pointer ${
                  isCurrent
                    ? "bg-[#EEF2FF] border-[#4B6BFB] ring-2 ring-[#4B6BFB]/20 shadow-xs"
                    : node.verified
                    ? "bg-slate-50 border-slate-200 hover:border-[#4B6BFB]/30"
                    : "bg-amber-50/70 border-amber-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">#{i + 1}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        node.verified ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                      }`}
                    ></span>
                  </div>
                  <span className="text-xs font-semibold text-slate-900 block mt-1 truncate">
                    {node.step}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 leading-tight line-clamp-2 mt-1">
                  {node.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Audit Evidence Drilldown Panel */}
        {selectedNode ? (
          <div className="bg-[#EEF2FF]/70 border border-indigo-100 rounded-2xl p-5 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="material-icons text-[#4B6BFB] text-lg">verified_user</span>
                <h4 className="text-xs font-semibold text-slate-900">
                  Bukti Audit Node: {selectedNode.step} — {selectedNode.title}
                </h4>
              </div>
              <span className="text-xs font-mono bg-white text-[#4B6BFB] border border-indigo-200 px-2.5 py-0.5 rounded-md font-semibold">
                {selectedNode.evidenceCode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-800">
              <div>
                <span className="text-xs text-slate-500 block mb-0.5">Waktu Pencatatan</span>
                <span className="font-bold text-slate-900 font-mono">{selectedNode.timestamp}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-0.5">Parameter Terverifikasi</span>
                <span className="font-bold text-slate-900">{selectedNode.parameter}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-0.5">Status Integritas</span>
                <span className="font-bold text-emerald-700">
                  {selectedNode.verified ? "✓ Valid & Terverifikasi" : "⚠️ Memerlukan Tinjauan"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pt-1">
              <strong>Keterangan Sistem:</strong> {selectedNode.description}. Data ini direkam langsung dari modul gateway Modbus/MQTT tanpa modifikasi manual.
            </p>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xs text-slate-500">
            Pilih salah satu simpul (node) di atas untuk melihat detail rekaman parameter fisik, stempel waktu, dan kode verifikasi audit.
          </div>
        )}

      </div>

    </div>
  );
}
