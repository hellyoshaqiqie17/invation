"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

interface CauseChain {
  id: string;
  category: "OPERATIONAL" | "ENVIRONMENTAL" | "GOVERNANCE" | "SOCIAL";
  title: string;
  nodes: string[];
  impactDesc: string;
  solutionImpact: string;
}

const chains: CauseChain[] = [
  {
    id: "chain-1",
    category: "OPERATIONAL",
    title: "Mesin Tua & Energi Boros",
    nodes: ["Mesin Legacy (Tanpa Sensor)", "Low Efficiency / Heat Loss", "Energy Waste (40 MWh/mo)", "High OPEX (Rp16B/thn)"],
    impactDesc: "Mesin beroperasi dalam kondisi suboptimal tanpa monitoring daya, memicu pemborosan listrik grid batu bara hingga Rp9,6 miliar per tahun.",
    solutionImpact: "Retrofit Power Meter & Sensor Suhu memicu Optimasi Energi & mendeteksi idle state otomatis."
  },
  {
    id: "chain-2",
    category: "OPERATIONAL",
    title: "Kerusakan Tak Terduga & Downtime",
    nodes: ["Mesin Legacy", "Unexpected Breakdown", "Downtime (45 Jam/Mesin/Bln)", "Low Machine Utilization (65%)"],
    impactDesc: "Pemeliharaan reaktif membuat komponen rusak total sebelum diperbaiki, menghentikan lini produksi hingga 45 jam per mesin setiap bulan.",
    solutionImpact: "Predictive Maintenance berbasis getaran (vibration analysis) mendeteksi degradasi komponen sebelum breakdown terjadi."
  },
  {
    id: "chain-3",
    category: "ENVIRONMENTAL",
    title: "Inspeksi Manual & Defek Produk",
    nodes: ["Inspeksi QC Manual", "High Defect Rate (4.5%)", "B3 Waste Excess", "Tinggi OPEX Limbah (Rp2.4B/thn)"],
    impactDesc: "Defek produk akhir yang baru terdeteksi di ujung lini manufaktur membuang material olahan dan menghasilkan limbah B3 berbiaya tinggi.",
    solutionImpact: "Digital Quality Inspection & Computer Vision mengurangi defect rate secara drastis sejak tahap awal batch."
  },
  {
    id: "chain-4",
    category: "GOVERNANCE",
    title: "Spreadsheet & Risiko Audit ESG",
    nodes: ["Manual Spreadsheet Tracking", "Data Tidak Akurat / Manipulatif", "Audit Lingkungan Gagal", "Risiko Sanksi & Kehilangan Klien"],
    impactDesc: "Pencatatan konsumsi air, energi, dan limbah secara manual sangat rentan human-error dan gagal memenuhi standar audit ESG global.",
    solutionImpact: "Digital ESG Control Tower menyajikan data terverifikasi single-source-of-truth langsung dari sensor terhubung."
  },
  {
    id: "chain-5",
    category: "SOCIAL",
    title: "Kecemasan Otomatisasi Pekerja",
    nodes: ["Isu Otomatisasi Pabrik", "Kecemasan Pekerja (40% Vulnerable)", "Resistensi Sosial & Penolakan", "Risiko Disrupsi Operasional"],
    impactDesc: "Ketakutan akan PHK masal pada 40% buruh kasar lulusan SMA/SMK menciptakan friksi dan penurunan kesadaran K3.",
    solutionImpact: "Just Transition Framework (Rp1,2B+) menjamin tidak ada PHK masal melalui program upskilling Future Skill Academy."
  }
];

export default function CausalMap() {
  const [activeId, setActiveId] = useState<string>("chain-1");

  const selectedChain = chains.find((c) => c.id === activeId) || chains[0];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Pemetaan Kausalitas Masalah
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
          The Problems Are Connected.
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Klik pada salah satu rantai hubungan sebab-akibat di bawah ini untuk melihat bagaimana akar masalah operasional saling memicu masalah lingkungan, sosial, dan finansial.
        </p>
      </div>

      {/* Chain Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {chains.map((chain) => {
          const isActive = chain.id === activeId;
          return (
            <button
              key={chain.id}
              onClick={() => setActiveId(chain.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-[1.02]"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded block w-fit mb-2 ${
                isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {chain.category}
              </span>
              <h4 className="text-xs font-bold leading-snug">{chain.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Visual Chain Node Flow */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs text-emerald-400 font-semibold">
            Alur Kausalitas: {selectedChain.title}
          </span>
          <span className="text-xs text-slate-400">Diagram Alir Sebab-Akibat</span>
        </div>

        {/* Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
          {selectedChain.nodes.map((nodeText, idx) => (
            <div key={idx} className="relative flex items-center">
              <div className={`w-full p-3.5 rounded-xl border text-center ${
                idx === selectedChain.nodes.length - 1
                  ? "bg-red-950/80 border-red-500/80 text-red-200 font-bold"
                  : "bg-slate-800 border-slate-700 text-slate-200 font-medium"
              }`}>
                <span className="text-[10px] text-slate-400 block mb-0.5">Langkah {idx + 1}</span>
                <span className="text-xs">{nodeText}</span>
              </div>
              {idx < selectedChain.nodes.length - 1 && (
                <div className="hidden sm:block absolute -right-3 z-10 text-emerald-400 bg-slate-900 p-0.5 rounded-full border border-slate-700">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Explanation Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4">
            <span className="font-bold text-red-400 block mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Dampak Mengapa Terjadi (Baseline):
            </span>
            <p className="text-slate-300 leading-relaxed">{selectedChain.impactDesc}</p>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-xl p-4">
            <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Solusi SMN SmartGreen:
            </span>
            <p className="text-slate-300 leading-relaxed">{selectedChain.solutionImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
