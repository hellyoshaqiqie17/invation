"use client";

import { initialESGMetrics, sampleTraceabilityBatches } from "@/lib/mockData";
import { Droplets, Zap, ShieldCheck, FileCheck, Layers, Award } from "lucide-react";

export default function ESGReportingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Laporan Transparansi ESG & Audit Traceability
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Single Source of Truth untuk metrik Lingkungan (Air, Energi, Karbon), Sosial (Reskilling), dan Tata Kelola (Traceability Rantai Pasok).
        </p>
      </div>

      {/* ESG Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 font-mono">ENVIRONMENTAL (E)</span>
            <Droplets className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Konsumsi Energi:</span>
              <span className="font-bold text-slate-900">40.0 MWh / bln</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Reduksi Air Tanah:</span>
              <span className="font-bold text-emerald-600">4,200 m³ / bln (64% Recycled)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scope 2 Carbon:</span>
              <span className="font-bold text-slate-900">31.2 tCO2e / bln</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 font-mono">SOCIAL (S)</span>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Anggaran Reskilling:</span>
              <span className="font-bold text-amber-700">Rp 1.6 Miliar (20% ≥ 15%)</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Tenaga Kerja Terlatih:</span>
              <span className="font-bold text-slate-900">114 Pekerja Certified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Risiko PHK Masal:</span>
              <span className="font-bold text-emerald-600">0% (Just Transition)</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 font-mono">GOVERNANCE (G)</span>
            <FileCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Sistem Data Traceability:</span>
              <span className="font-bold text-blue-600">Digital IoT Sensors</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-500">Akurasi Data Audit:</span>
              <span className="font-bold text-emerald-600">99.8% Single Source</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Audit Compliance:</span>
              <span className="font-bold text-slate-900">Pass Green Certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Traceability Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Tabel Audit Traceability Material & Batch</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                <th className="pb-2">Batch ID</th>
                <th className="pb-2">Supplier</th>
                <th className="pb-2">Material ID</th>
                <th className="pb-2">Lini / Mesin</th>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">QC Status</th>
                <th className="pb-2">Carbon (kg)</th>
                <th className="pb-2">Audit State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleTraceabilityBatches.map((b) => (
                <tr key={b.batchId}>
                  <td className="py-2.5 font-bold text-slate-900">{b.batchId}</td>
                  <td className="py-2.5 text-slate-600">{b.supplier}</td>
                  <td className="py-2.5 text-slate-600">{b.materialId}</td>
                  <td className="py-2.5 text-slate-600">{b.lineId} ({b.machineId})</td>
                  <td className="py-2.5 text-slate-500">{b.timestamp}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.qualityStatus === "PASSED" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}>
                      {b.qualityStatus}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-800">{b.carbonFootprintKg} kg</td>
                  <td className="py-2.5 font-bold text-emerald-600">{b.esgAuditStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
