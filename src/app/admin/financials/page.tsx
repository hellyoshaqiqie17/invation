"use client";

import FinancialCalculator from "@/components/FinancialCalculator";

export default function FinancialsReportPage() {
  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Financial Feasibility & Valuation
            </span>
            <span className="text-xs text-slate-400">• Capital Allocation & ROI Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transformation Value
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Financial impact analysis & digital transformation feasibility model (CAPEX &le; Rp8.0B, Payback &le; 3.5 Years, IRR &ge; 15%).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            Baseline OPEX: Rp 16.0 M/yr
          </span>
        </div>
      </div>

      {/* Interactive Financial Calculator */}
      <FinancialCalculator />

      {/* Baseline OPEX Table Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            Baseline Annual OPEX Breakdown — PT SMN (Rp 16.0 Billion Baseline)
          </h3>
          <p className="text-xs text-slate-500">
            Operational expenditure baseline prior to intelligent smart & circular green factory implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-600 block text-xs font-medium">1. Konsumsi Listrik</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block font-mono">Rp 9.6 Miliar</span>
            <span className="text-xs text-slate-400">60.0% dari Total OPEX (Target Utama)</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-600 block text-xs font-medium">2. Pengelolaan Limbah B3</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block font-mono">Rp 2.4 Miliar</span>
            <span className="text-xs text-slate-400">15.0% dari Total OPEX</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-600 block text-xs font-medium">3. Pemeliharaan Reaktif</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block font-mono">Rp 2.2 Miliar</span>
            <span className="text-xs text-slate-400">13.75% dari Total OPEX (Downtime)</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-slate-600 block text-xs font-medium">4. Konsumsi Air Tanah</span>
            <span className="font-extrabold text-lg text-slate-900 mt-1 block font-mono">Rp 1.8 Miliar</span>
            <span className="text-xs text-slate-400">11.25% dari Total OPEX (Air Sumur)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
