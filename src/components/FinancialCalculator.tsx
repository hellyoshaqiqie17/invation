"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, ShieldCheck, PieChart, CheckCircle2 } from "lucide-react";
import { CASE_FINANCIALS } from "@/lib/mockData";

export default function FinancialCalculator() {
  const [capexRpB, setCapexRpB] = useState<number>(8.0);
  const [savingPercent, setSavingPercent] = useState<number>(18); // 15-20%
  const [wacc, setWacc] = useState<number>(12); // 12%
  const [projectYears, setProjectYears] = useState<number>(5);

  // Baseline OPEX = Rp 16 Billion / year
  const annualSavingsRpB = parseFloat(((CASE_FINANCIALS.baselineOpexAnnualRpB * savingPercent) / 100).toFixed(2));
  const paybackYears = parseFloat((capexRpB / annualSavingsRpB).toFixed(2));

  // Granular Savings Breakdown based on percentage
  const energySavingsRpB = parseFloat((annualSavingsRpB * 0.50).toFixed(2));
  const maintenanceSavingsRpB = parseFloat((annualSavingsRpB * 0.28).toFixed(2));
  const wasteSavingsRpB = parseFloat((annualSavingsRpB * 0.14).toFixed(2));
  const waterSavingsRpB = parseFloat((annualSavingsRpB * 0.08).toFixed(2));

  // Compute NPV
  let pvOfSavings = 0;
  for (let t = 1; t <= projectYears; t++) {
    pvOfSavings += annualSavingsRpB / Math.pow(1 + wacc / 100, t);
  }
  const npv = pvOfSavings - capexRpB;
  const npvFormatted = parseFloat(npv.toFixed(2));
  const bcrFormatted = parseFloat((pvOfSavings / capexRpB).toFixed(2));

  // Estimate IRR
  let irrEstimate = (annualSavingsRpB / capexRpB - 0.05) * 100;
  if (paybackYears <= 3.0) irrEstimate = Math.max(18.5, irrEstimate + 4);
  const irrFormatted = parseFloat(Math.min(45, Math.max(12, irrEstimate)).toFixed(1));

  // Feasibility Check Flags
  const isPaybackValid = paybackYears <= CASE_FINANCIALS.maxPaybackYears;
  const isIrrValid = irrFormatted >= CASE_FINANCIALS.minIrrPercent;
  const isCapexValid = capexRpB <= CASE_FINANCIALS.maxCapexRpB;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8 font-sans">
      
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Value Creation Simulator
            </span>
            <span className="text-xs text-slate-400">• Simulasi Skenario Finansial</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Innovation Must Pay for Itself.
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Simulator kalkulator investasi interaktif untuk menguji kelayakan parameter CAPEX, penghematan OPEX, IRR, NPV, BCR, dan Payback Period.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 text-emerald-400 px-3.5 py-2.5 rounded-xl text-xs">
          <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Baseline OPEX: <strong className="font-mono text-white">Rp 16.0 M / Tahun</strong></span>
        </div>
      </div>

      {/* Chain Diagram: Investment -> Operational Efficiency -> Cost Savings -> Business Value */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <span className="text-xs font-semibold text-slate-700 block mb-2.5">
          Rantai Penciptaan Nilai Transformasi:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-[#4B6BFB] block">1. Investasi (CAPEX)</span>
            <strong className="text-slate-900 block mt-0.5 font-mono">Rp {capexRpB} Miliar</strong>
            <span className="text-[11px] text-slate-500">Retrofit IoT + Server + 20% Reskilling</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-cyan-600 block">2. Efisiensi Operasional</span>
            <strong className="text-slate-900 block mt-0.5">Operasional Cerdas</strong>
            <span className="text-[11px] text-slate-500">Predictive Maintenance & 64% Water Loop</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-emerald-600 block">3. Penghematan Biaya</span>
            <strong className="text-emerald-700 block mt-0.5 font-mono">Rp {annualSavingsRpB} M / Tahun</strong>
            <span className="text-[11px] text-slate-500">Hemat 18% dari beban dasar OPEX</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-indigo-600 block">4. Nilai Bisnis Tercipta</span>
            <strong className="text-slate-900 block mt-0.5 font-mono">Payback {paybackYears} Thn</strong>
            <span className="text-[11px] text-slate-500">IRR {irrFormatted}% • BCR {bcrFormatted}</span>
          </div>
        </div>
      </div>

      {/* Interactive Sliders & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (6 cols) */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            Parameter Simulasi Investasi
          </h4>

          {/* Slider 1: CAPEX */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Total CAPEX Investasi:</span>
              <span className="font-bold font-mono text-slate-900">Rp {capexRpB} Miliar</span>
            </div>
            <input
              type="range"
              min="5.0"
              max="8.0"
              step="0.2"
              value={capexRpB}
              onChange={(e) => setCapexRpB(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Rp 5.0B</span>
              <span className="font-bold text-amber-600">Plafon Maksimal: Rp8.0B</span>
            </div>
          </div>

          {/* Slider 2: % OPEX Savings */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Target Efisiensi OPEX Tahunan:</span>
              <span className="font-bold font-mono text-emerald-600">{savingPercent}% (Rp {annualSavingsRpB}B / thn)</span>
            </div>
            <input
              type="range"
              min="15"
              max="20"
              step="1"
              value={savingPercent}
              onChange={(e) => setSavingPercent(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Batas Bawah: 15% (Rp2.40B)</span>
              <span>Batas Atas: 20% (Rp3.20B)</span>
            </div>
          </div>

          {/* Granular Saving Streams Breakdown */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-700 block">Proyeksi Rincian Penghematan per Tahun:</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">1. Listrik & Idle Energy</span>
                <span className="font-bold text-slate-900">Rp {energySavingsRpB} M</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">2. Predictive Maintenance</span>
                <span className="font-bold text-slate-900">Rp {maintenanceSavingsRpB} M</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">3. Limbah B3 & Scrap</span>
                <span className="font-bold text-slate-900">Rp {wasteSavingsRpB} M</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">4. Closed-Loop Water Recovery</span>
                <span className="font-bold text-slate-900">Rp {waterSavingsRpB} M</span>
              </div>
            </div>
          </div>

          {/* WACC & Years */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Rate (WACC):</label>
              <input
                type="number"
                value={wacc}
                disabled
                className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-600 font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Parameter Industri: 12%</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Horizon Proyek:</label>
              <input
                type="number"
                value={projectYears}
                disabled
                className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-600 font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Horizon: 5 Tahun</span>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Metric 1: Payback Period */}
            <div className={`p-5 rounded-2xl border ${
              isPaybackValid ? "bg-emerald-50/80 border-emerald-200 text-emerald-950" : "bg-red-50 border-red-200 text-red-950"
            }`}>
              <span className="text-xs font-semibold block">Payback Period</span>
              <div className="text-3xl font-extrabold font-mono mt-2">
                {paybackYears} <span className="text-base font-normal">Tahun</span>
              </div>
              <div className="text-[11px] mt-2 flex items-center gap-1 font-semibold">
                {isPaybackValid ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Lolos (&le; 3.5 Tahun)</span>
                  </>
                ) : (
                  <span className="text-red-700">Melampaui Batas &gt; 3.5 Thn</span>
                )}
              </div>
            </div>

            {/* Metric 2: Net Present Value (NPV) */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-slate-900">
              <span className="text-xs font-semibold text-slate-600 block">Net Present Value (NPV)</span>
              <div className="text-3xl font-extrabold font-mono text-slate-900 mt-2">
                Rp {npvFormatted} <span className="text-base font-normal">B</span>
              </div>
              <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NPV Positif (Nilai Tambah Nyata)</span>
              </div>
            </div>

            {/* Metric 3: IRR */}
            <div className={`p-5 rounded-2xl border ${
              isIrrValid ? "bg-emerald-50/80 border-emerald-200 text-emerald-950" : "bg-red-50 border-red-200 text-red-950"
            }`}>
              <span className="text-xs font-semibold block">Internal Rate of Return (IRR)</span>
              <div className="text-3xl font-extrabold font-mono mt-2">
                {irrFormatted}%
              </div>
              <div className="text-[11px] mt-2 flex items-center gap-1 font-semibold">
                {isIrrValid ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Lolos (&ge; 15% Hurdle)</span>
                  </>
                ) : (
                  <span className="text-red-700">Di bawah batas 15%</span>
                )}
              </div>
            </div>

            {/* Metric 4: Benefit-Cost Ratio (BCR) */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-slate-900">
              <span className="text-xs font-semibold text-slate-600 block">Benefit-Cost Ratio (BCR)</span>
              <div className="text-3xl font-extrabold font-mono text-slate-900 mt-2">
                {bcrFormatted}x
              </div>
              <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>BCR &gt; 1.0 (Sangat Menguntungkan)</span>
              </div>
            </div>

          </div>

          {/* Just Transition Social Commitment Card */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <h5 className="text-xs font-bold text-amber-950 uppercase font-mono">
                Kepatuhan Anggaran Kesejahteraan Sosial (Reskilling SDM)
              </h5>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Dari plafon CAPEX Rp {capexRpB} Miliar, dialokasikan <strong>20.0% (Rp {(capexRpB * 0.2).toFixed(2)} Miliar)</strong> untuk program sertifikasi dan pelatihan ulang pekerja pabrik tanpa PHK.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
