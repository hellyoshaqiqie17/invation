"use client";

import FinancialCalculator from "@/components/FinancialCalculator";
import { CASE_FINANCIALS } from "@/lib/mockData";
import { DollarSign, ShieldCheck, TrendingUp, PieChart } from "lucide-react";

export default function FinancialsReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Laporan Finansial & Kalkulator ROI Transisi
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Validasi finansial dengan batas CAPEX Rp8,0 Miliar, target penghematan OPEX 15-20%, payback ≤ 3.5 tahun, dan IRR ≥ 15%.
        </p>
      </div>

      <FinancialCalculator />

      {/* Baseline OPEX Table Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Breakdown OPEX Baseline Tahunan PT SMN (Total Rp16.0 Miliar)</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[10px]">1. KONSUMSI LISTRIK</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block">Rp 9.6 Miliar</span>
            <span className="text-[10px] text-slate-400">60.0% dari Total OPEX</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[10px]">2. PENGELOLAAN LIMBAH B3</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block">Rp 2.4 Miliar</span>
            <span className="text-[10px] text-slate-400">15.0% dari Total OPEX</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[10px]">3. MAINTENANCE REAKTIF</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block">Rp 2.2 Miliar</span>
            <span className="text-[10px] text-slate-400">13.75% dari Total OPEX</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-500 block text-[10px]">4. KONSUMSI AIR TANAH</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block">Rp 1.8 Miliar</span>
            <span className="text-[10px] text-slate-400">11.25% dari Total OPEX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
