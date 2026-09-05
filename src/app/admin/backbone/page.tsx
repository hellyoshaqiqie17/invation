"use client";

import { useState } from "react";
import Link from "next/link";

export default function DigitalBackbonePage() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>("control_tower");

  const layers = [
    {
      id: "machine",
      name: "01. Armada Mesin Fisik",
      protocol: "Industrial Hardware",
      icon: "precision_manufacturing",
      desc: "20 unit mesin manufaktur pada Lini 1 & Lini 2 (Stamping Press, Milling, CNC, Lathe, Welding, Cooling Pump).",
      signals: ["Putaran Poros Bearing", "Getaran Vibrasi 3-Axis", "Suhu Motor PT100", "Beban Arus Listrik 3-Phase"],
    },
    {
      id: "sensor",
      name: "02. IoT Sensors Retrofit",
      protocol: "Analog / Digital Probe",
      icon: "sensors",
      desc: "Modul sensor non-intrusif berbiaya terjangkau ($85.60 per mesin) dipasang tanpa memodifikasi sirkuit orisinil mesin.",
      signals: ["Akselerometer Piezoelektrik", "Termokopel PT100", "CT Clamp Transformer", "Turbidity & pH Sensor"],
    },
    {
      id: "hub",
      name: "03. IoT Edge Hub Gateway",
      protocol: "ESP32-S3 / RS485 Modbus / MQTT",
      icon: "router",
      desc: "Mikrokontroler Edge mengagregasi sinyal, melakukan filtering sinyal derau (noise filtering), dan mengemas payload telemetri.",
      signals: ["Komunikasi Kabel Ethernet W5500", "Protokol Ringan MQTT / JSON", "Enkripsi TLS Edge-to-Cloud"],
    },
    {
      id: "processing",
      name: "04. Real-Time Data Ingestion",
      protocol: "Kafka / MQTT Broker",
      icon: "swap_horiz",
      desc: "Sistem penerima stream data berkecepatan tinggi dengan latensi sub-detik untuk memastikan deteksi bahaya instan.",
      signals: ["Ingestion Rate: 100 packet/detik", "Deduplikasi & Kalibrasi Nilai", "Penyaringan Outlier Sensor"],
    },
    {
      id: "lake",
      name: "05. Central Data Lake",
      protocol: "Time-Series Database",
      icon: "dns",
      desc: "Pusat penyimpanan tunggal kebenaran (*Single Source of Truth*) untuk seluruh riwayat operasi, konsumsi energi, dan air.",
      signals: ["Penyimpanan Berkas Telemetri", "Logging Siklus Hidup Batch", "Audit Trail Terenkripsi & Permanen"],
    },
    {
      id: "ai",
      name: "06. AI Predictive Analytics Engine",
      protocol: "Edge AI & Cloud Inference",
      icon: "psychology",
      desc: "Model pembelajaran mesin mendeteksi anomali getaran (ISO 10816) dan memprediksi waktu kegagalan bantalan bearing.",
      signals: ["Failure Prediction Window", "Klasifikasi Normal/Warning/Critical", "Rekomendasi Preskriptif Perbaikan"],
    },
    {
      id: "control_tower",
      name: "07. SMN Control Tower",
      protocol: "Unified Web Platform",
      icon: "space_dashboard",
      desc: "Pusat komando operasional yang menyatukan pemantauan telemetri, alert dini, dan orkestrasi keputusan manajerial.",
      signals: ["Visualisasi Real-Time 20 Mesin", "Intervensi Tindakan Langsung", "Multi-Role Dashboard Switcher"],
    },
  ];

  const downstreamStreams = [
    {
      name: "Laporan Transparansi ESG",
      icon: "eco",
      desc: "Menghitung emisi Scope 1 & 2, reduksi ekstraksi air tanah (daur ulang 64%), dan sertifikasi hijau audit-ready.",
      route: "/admin/esg",
      color: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    {
      name: "Green Batch Passport",
      icon: "verified_user",
      desc: "Menerbitkan sertifikat identitas ketertelusuran produk dari pemasok baja hingga barang jadi.",
      route: "/admin/green-batch",
      color: "border-indigo-100 bg-[#EEF2FF] text-[#4B6BFB]",
    },
    {
      name: "Transformation Value & ROI",
      icon: "trending_up",
      desc: "Kalkulasi penghematan OPEX 18% dari reduksi idle power dan downtime guna menjamin payback ≤ 3.5 tahun.",
      route: "/admin/financials",
      color: "border-indigo-200 bg-indigo-50 text-indigo-900",
    },
    {
      name: "Grow with SMN & Readiness Gate",
      icon: "school",
      desc: "Human Readiness Gatekeeper memastikan tenaga kerja tersertifikasi sebelum fitur kendali otomatis diaktifkan.",
      route: "/admin/workforce",
      color: "border-amber-200 bg-amber-50 text-amber-900",
    },
  ];

  const activeLayerObj = layers.find((l) => l.id === selectedLayer) || layers[6];

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-xs font-medium text-[#4B6BFB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B6BFB]"></span>
              Arsitektur Sistem Enterprise
            </span>
            <span className="text-xs text-slate-400">• Digital Backbone SMN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Digital Backbone
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Arsitektur transmisi data terintegrasi: dari sensor fisik di lantai pabrik menuju komando SMN Control Tower.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            MQTT / TLS / Modbus RS485
          </span>
        </div>
      </div>

      {/* CORE DATA PIPELINE VISUALIZATION */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pipa Aliran Telemetri & Logika Pemrosesan (Pipeline)
            </h3>
            <p className="text-xs text-slate-500">
              Klik pada layer untuk melihat spesifikasi protokol, sinyal yang diproses, dan fungsi sistem.
            </p>
          </div>
          <span className="text-xs font-medium bg-[#EEF2FF] text-[#4B6BFB] px-2.5 py-1 rounded-lg border border-indigo-100">
            7 Lapisan Arsitektur
          </span>
        </div>

        {/* 7 Layer Step Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer === layer.id;

            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[140px] cursor-pointer ${
                  isSelected
                    ? "bg-[#4B6BFB] text-white border-[#4B6BFB] shadow-xs ring-2 ring-[#4B6BFB]/50"
                    : "bg-slate-50 border-slate-200 text-slate-900 hover:border-[#4B6BFB]/30 hover:bg-slate-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isSelected ? "bg-[#3B5BEB] text-white" : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      Layer 0{idx + 1}
                    </span>
                    <span
                      className={`material-icons text-lg ${
                        isSelected ? "text-white" : "text-[#4B6BFB]"
                      }`}
                    >
                      {layer.icon}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold mt-2.5 leading-snug">{layer.name}</h4>
                </div>

                <div
                  className={`text-xs mt-2 truncate font-mono ${
                    isSelected ? "text-indigo-100" : "text-slate-500"
                  }`}
                >
                  {layer.protocol}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Details Panel */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#4B6BFB] text-white flex items-center justify-center">
                <span className="material-icons text-base">{activeLayerObj.icon}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{activeLayerObj.name}</h4>
                <span className="text-xs text-slate-500 font-mono">{activeLayerObj.protocol}</span>
              </div>
            </div>
            <span className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-medium">
              Status: Beroperasi Normal & Optimal
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">{activeLayerObj.desc}</p>

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Sinyal & Parameter yang Ditransmisikan:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeLayerObj.signals.map((sig, i) => (
                <span
                  key={i}
                  className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-800 shadow-2xs font-medium"
                >
                  ⚡ {sig}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DOWNSTREAM ENTERPRISE STREAMS */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">
            Integrasi Hilir Platform (Downstream Enterprise Streams)
          </h3>
          <p className="text-xs text-slate-500">
            Dari SMN Control Tower, data telemetri yang telah dianalisis secara otomatis mengalir ke 4 domain keputusan strategis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {downstreamStreams.map((stream, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${stream.color} flex flex-col justify-between space-y-3`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="material-icons text-xl">{stream.icon}</span>
                  <span className="text-xs font-medium">Domain 0{idx + 1}</span>
                </div>
                <h4 className="text-xs font-bold mt-2">{stream.name}</h4>
                <p className="text-[11px] opacity-80 mt-1 leading-relaxed">{stream.desc}</p>
              </div>

              <Link
                href={stream.route}
                className="inline-flex items-center gap-1 text-xs font-bold underline mt-2"
              >
                <span>Buka Modul</span>
                <span className="material-icons text-xs">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
