"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const allHardware = [
    // Smart Factory Sensors & Retrofit Components
    { id: "esp32s3", name: "Industrial Edge IoT Gateway (ESP32-S3 / RS485)", desc: "Pengendali utama berbasis Wi-Fi & Industrial Modbus/MQTT yang mengelola pembacaan sensor dan telemetri mesin.", price: "$28.50", priceIdr: "Rp 440.000" },
    { id: "vib_sensor", name: "Industrial Vibration Sensor (3-Axis Accelerometer)", desc: "Sensor piezoelektrik presisi tinggi untuk mendeteksi degradasi bantalan bearing dan anomali poros mesin.", price: "$18.20", priceIdr: "Rp 280.000" },
    { id: "temp_probe", name: "Sensor Suhu Digital High-Temp PT100", desc: "Sensor suhu digital kedap minyak untuk memantau suhu kerja kumparan motor utama dan minyak hidrolik.", price: "$9.50", priceIdr: "Rp 148.000" },
    { id: "power_meter", name: "Smart 3-Phase Power Meter & CT Clamp", desc: "Modul pengukur arus 3-fase untuk mendeteksi konsumsi energi aktif (kW) dan energi boros idle state.", price: "$24.00", priceIdr: "Rp 370.000" },
    { id: "flow_meter", name: "Sensor Aliran Air Loop (Flow Meter & pH)", desc: "Sensor pengukur debit sirkulasi air daur ulang closed loop dan kualitas kejernihan pH air.", price: "$15.40", priceIdr: "Rp 238.000" },
    { id: "k3_sensor", name: "Sensor Deteksi Gas Chemical Exposure K3", desc: "Detektor paparan uap bahan kimia berbahaya di sekitar tempat kerja buruh manufaktur.", price: "$14.00", priceIdr: "Rp 215.000" },
    { id: "camera_ai", name: "Camera Vision Quality Inspection Unit", desc: "Kamera inspeksi visual berkecepatan tinggi untuk deteksi dini defek permukaan produk di lini pilot.", price: "$45.00", priceIdr: "Rp 695.000" },

    // Control Tower Gateway & Infrastructure
    { id: "gw_server", name: "Digital ESG Control Tower Server", desc: "Pusat pengendali komando pabrik yang mengagregasi stream data telemetri 20 mesin ke database Firestore & AI Copilot.", price: "$120.00", priceIdr: "Rp 1.850.000" },
    { id: "gw_mqtt", name: "Modul Komunikasi Industrial Ethernet W5500", desc: "Modul komunikasi kabel LAN berkecepatan tinggi untuk transfer data andal bebas gangguan frekuensi.", price: "$8.50", priceIdr: "Rp 130.000" },

    // Software & AI Copilot
    { id: "sw_copilot", name: "Digital AI Anomaly Copilot Engine", desc: "Asisten AI diagnosa anomali mesin, prediksi waktu breakdown, dan optimasi energi idle.", price: "$15.00", priceIdr: "Rp 230.000" }
  ];

  const activeHardware = allHardware.find(h => h.id === hoveredComponent);

  return (
    <div className="relative min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans theme-transition overflow-hidden text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Dotted Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20 z-0" />

      {/* Floating Animated Gradient Blobs */}
      <div className="absolute top-[5%] left-[-15%] w-[40rem] h-[40rem] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-15%] w-[45rem] h-[45rem] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-[10%] w-[35rem] h-[35rem] bg-indigo-400/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Glass Content Card Container matching WearOcean */}
      <div className="relative z-10 max-w-[1300px] mx-auto bg-white rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 shadow-xl border border-slate-200 theme-transition space-y-16">
        
        {/* Navigation Bar */}
        <nav id="overview" className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm text-[#4B6BFB]">
              <span className="material-icons text-xl">precision_manufacturing</span>
            </div>
            <span className="font-sans text-base font-bold tracking-tight text-slate-800 uppercase">
              PT SMN - SMARTGREEN
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <Link href="/" className="text-[#4B6BFB] font-semibold hover:text-blue-700 transition-colors">
              Overview
            </Link>
            <a href="#baseline" className="hover:text-slate-800 transition-colors">
              Baseline Case
            </a>
            <a href="#features" className="hover:text-slate-800 transition-colors">
              Fitur Utama
            </a>
            <a href="#schematics" className="hover:text-slate-800 transition-colors">
              Skema Perangkat
            </a>
            <a href="#pricing" className="hover:text-slate-800 transition-colors">
              Rincian Anggaran
            </a>
            <a href="#architecture" className="hover:text-slate-800 transition-colors">
              Alur Sistem
            </a>
          </div>

          <Link href="/admin/dashboard" className="px-5 py-2.5 rounded-xl bg-[#4B6BFB] hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-md shadow-blue-500/10 cursor-pointer">
            Login Control Tower
          </Link>
        </nav>

        {/* Hero Section Split Layout matching WearOcean */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col gap-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit">
                SMART & GREEN FACTORY TRANSFORMATION
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Transformasi Industri Generasi Baru untuk PT SMN
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                Rangkaian pemantauan telemetri mesin berkelanjutan, deteksi anomali getaran, dan optimasi energi idle. Terhubung secara terintegrasi melalui <strong className="text-blue-600 font-semibold">IoT Edge Gateway</strong> langsung ke Control Tower tanpa menghentikan jalur produksi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-white bg-[#4B6BFB] hover:bg-blue-600 px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/15 transition-all cursor-pointer">
                <span className="material-icons text-base">space_dashboard</span>
                <span>Masuk ke Admin panel</span>
              </Link>
              <a href="#schematics" className="inline-flex items-center gap-2 text-slate-700 bg-slate-100 hover:bg-slate-200 px-6 py-3.5 rounded-xl font-semibold transition-all">
                <span className="material-icons text-base">developer_board</span>
                <span>Skema hardware</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Retrofit Sensors IoT</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Daur Ulang Air Loop 64%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                <span>Asisten Keselamatan AI</span>
              </div>
            </div>
          </div>

          {/* Right Column - Live Admin Dashboard Visualizations matching WearOcean */}
          <div className="grid grid-cols-2 gap-4 h-full text-left font-sans">
            
            {/* Card 1: Detail Panel Telemetri Mesin (col-span-2) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 col-span-2 flex flex-col justify-between shadow-sm min-h-[220px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 tracking-tight">Detail Telemetri Mesin</h3>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">pilot-m03</span>
              </div>

              {/* Machine info */}
              <div className="flex items-center gap-3 my-2.5">
                <div className="h-9 w-9 rounded-xl border border-slate-200 bg-blue-50 flex items-center justify-center text-[#4B6BFB]">
                  <span className="material-icons text-lg">precision_manufacturing</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">Hydraulic Press Unit M03</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">ANOMALI DETECTED</span>
                    <span className="text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                      <span className="material-icons text-[9px]">psychology</span> AI: Risiko Tinggi
                    </span>
                  </div>
                </div>
              </div>

              {/* Physiological / Machine status grid */}
              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                <div>
                  <span className="text-slate-400 block text-[9px]">Vibrasi Bearing</span>
                  <span className="font-bold text-amber-600">6.7 mm/s</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Suhu Motor</span>
                  <span className="font-bold text-red-500">78.4 °C (Panas)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Daya Listrik</span>
                  <span className="font-bold text-slate-800">34.2 kW</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Downtime Bulanan</span>
                  <span className="font-bold text-red-500">42 Jam</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Health Score</span>
                  <span className="font-bold text-amber-600">51% (Perhatian)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Status Air Loop</span>
                  <span className="font-bold text-blue-600">DAUR ULANG</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-[10px] transition-all cursor-pointer shadow-sm">
                  Hubungi Tim Maintenance
                </button>
                <button className="px-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2 rounded-lg text-[10px] transition-all cursor-pointer">
                  Abaikan
                </button>
              </div>
            </div>

            {/* Card 2: Parameter Lingkungan BME280 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 flex flex-col justify-between shadow-sm min-h-[190px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-800 tracking-tight">Kondisi Cuaca (BME280)</span>
                <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono font-semibold">SMN-BASE</span>
              </div>

              <div className="my-2.5 space-y-2 text-[10px]">
                <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="text-slate-400">Suhu Sekitar</span>
                  <span className="font-bold text-slate-800">29.2 °C</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="text-slate-400">Kelembaban Udara</span>
                  <span className="font-bold text-slate-800">76%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tekanan Atmosfer</span>
                  <span className="font-bold text-slate-800">1011 hPa</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/50 rounded-lg p-2 text-[9px] text-slate-500 font-medium leading-relaxed">
                Kondisi sekitar pabrik SMN terpantau berawan dengan sirkulasi udara lantai produksi stabil.
              </div>
            </div>

            {/* Card 3: Asisten AI: Rekomendasi Keselamatan */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 flex flex-col justify-between shadow-sm min-h-[190px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-800 tracking-tight flex items-center gap-1">
                  <span className="material-icons text-indigo-500 text-xs">psychology</span> Asisten Diagnosa AI
                </span>
                <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-mono font-semibold">COPILOT-AI</span>
              </div>

              <div className="my-2 z-10 text-[10px]">
                <div className="font-bold text-slate-800 leading-tight">Analisis Risiko Getaran Bearing</div>
                <div className="text-slate-400 text-[9px] mt-0.5">Unit Mesin: Press M03 (pilot-m03)</div>
                <p className="text-slate-500 mt-1.5 leading-relaxed text-[9px]">
                  Kenaikan getaran bearing (<span className="font-bold text-amber-600">6.7 mm/s</span>) terdeteksi di lini 1.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100/50 rounded-lg p-2 text-[9px] text-indigo-700 font-medium">
                Rekomendasi "Jadwalkan pelumasan ulang bearing pada shift 3" dikirim ke teknisi.
              </div>

              <button className="mt-2 w-full bg-[#4B6BFB] hover:bg-[#3B5BEB] text-white font-bold py-2 rounded-lg text-[9px] transition-all cursor-pointer shadow-sm">
                Kirim Saran ke Mesin
              </button>
            </div>

          </div>
        </section>

        {/* Features Section matching WearOcean */}
        <section id="features" className="py-12 border-t border-slate-200">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Fungsional Utama</h2>
            <p className="mt-2 text-sm text-slate-500">Fitur sistem terintegrasi Smart & Green Factory PT SMN.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "monitor_heart", title: "Pemantauan Telemetri Real-Time", desc: "Memantau getaran 3-axis, suhu bearing, dan daya listrik 3-phase secara kontinu untuk mendeteksi tanda-tanda degradasi mesin." },
              { icon: "analytics", title: "Model Predictive Maintenance", desc: "Menggabungkan tren vibration analysis dan thermal RTD untuk mengklasifikasikan skor kesehatan mesin (Normal / Warning / Critical)." },
              { icon: "opacity", title: "Circular Water Loop Daur Ulang", desc: "Mengkorelasikan debit flow meter dengan kualitas air jernih pH untuk mengurangi penggunaan air tanah hingga 64%." },
              { icon: "bolt", title: "Deteksi Energi Idle Otomatis", desc: "Mendeteksi secara instan mesin berdaya tinggi yang dibiarkan dalam kondisi idle untuk menghemat OPEX listrik hingga Rp3,2B/thn." },
              { icon: "security", title: "Pemantauan K3 Paparan Kimia", desc: "Memantau sensor paparan bahan kimia dan kepatuhan APD buruh pabrik untuk menciptakan lingkungan kerja yang aman." },
              { icon: "fact_check", title: "Single Source of Truth Traceability", desc: "Pelacakan batch material dari supplier hingga produk akhir secara digital untuk transparansi laporan audit ESG." }
            ].map((f, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 text-[#4B6BFB] flex items-center justify-center mb-5">
                  <span className="material-icons text-xl">{f.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Schematics Section matching WearOcean */}
        <section id="schematics" className="py-12 border-t border-slate-200">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Skema Hardware Mesin</h2>
            <p className="mt-2 text-sm text-slate-500">Arahkan kursor ke modul mana saja pada diagram Unit Mesin Retrofit atau IoT Edge Gateway untuk melihat detail spesifikasi dan biaya komponen.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* 1. Machine Retrofit Diagram */}
            <div className="xl:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                <span className="material-icons text-blue-600 text-lg">developer_board</span>
                Papan Sirkuit Retrofit Mesin Industri
              </h3>
              
              <svg width="340" height="360" viewBox="0 0 340 360" className="w-full drop-shadow-sm select-none">
                <rect x="95" y="80" width="150" height="210" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2.5" />
                
                {/* CPU ESP32-S3 */}
                <g 
                  onMouseEnter={() => setHoveredComponent("esp32s3")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "esp32s3" ? "0.3" : "1"}
                >
                  <rect x="145" y="150" width="50" height="50" rx="4" fill="#ffffff" stroke="#4B6BFB" strokeWidth="2" />
                  <text x="147" y="178" fill="#4B6BFB" fontSize="7" fontWeight="bold" fontFamily="monospace">ESP32-S3</text>
                  <circle cx="170" cy="195" r="2.5" fill="#10B981" />
                </g>

                {/* Vibration Sensor */}
                <g 
                  onMouseEnter={() => setHoveredComponent("vib_sensor")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "vib_sensor" ? "0.3" : "1"}
                >
                  <rect x="105" y="100" width="40" height="35" rx="3" fill="#ffffff" stroke="#4B6BFB" strokeWidth="1.5" />
                  <text x="111" y="121" fill="#1e293b" fontSize="8" fontWeight="bold" fontFamily="monospace">VIB-3X</text>
                </g>

                {/* Temperature Sensor */}
                <g 
                  onMouseEnter={() => setHoveredComponent("temp_probe")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "temp_probe" ? "0.3" : "1"}
                >
                  <rect x="195" y="100" width="40" height="35" rx="3" fill="#ffffff" stroke="#EF4444" strokeWidth="1.5" />
                  <text x="199" y="121" fill="#EF4444" fontSize="8" fontWeight="bold" fontFamily="monospace">PT100</text>
                </g>

                {/* Power Meter */}
                <g 
                  onMouseEnter={() => setHoveredComponent("power_meter")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "power_meter" ? "0.3" : "1"}
                >
                  <rect x="105" y="240" width="130" height="40" rx="6" fill="#ffffff" stroke="#10B981" strokeWidth="2" />
                  <text x="125" y="264" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">SMART POWER METER CT</text>
                </g>
              </svg>
            </div>

            {/* 2. Control Tower Gateway Diagram */}
            <div className="xl:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                <span className="material-icons text-blue-600 text-lg">dns</span>
                Control Tower Server Infrastructure
              </h3>

              <svg width="340" height="360" viewBox="0 0 340 360" className="w-full drop-shadow-sm select-none">
                <rect x="95" y="80" width="150" height="210" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2.5" />
                
                <g 
                  onMouseEnter={() => setHoveredComponent("gw_server")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "gw_server" ? "0.3" : "1"}
                >
                  <rect x="115" y="120" width="110" height="60" rx="6" fill="#ffffff" stroke="#4B6BFB" strokeWidth="2" />
                  <text x="135" y="155" fill="#4B6BFB" fontSize="9" fontWeight="bold" fontFamily="monospace">ESG TOWER SERVER</text>
                </g>
              </svg>
            </div>

            {/* 3. Central Hover Info Card */}
            <div className="xl:col-span-3 space-y-6 self-stretch flex flex-col justify-between">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[240px] flex flex-col justify-between shadow-sm flex-1">
                {activeHardware ? (
                  <div>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider font-mono">MODUL TERPILIH</span>
                    <h3 className="text-base font-bold mt-1 text-slate-900 leading-snug">{activeHardware.name}</h3>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                      {activeHardware.desc}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full my-auto py-8">
                    <span className="material-icons text-slate-400 text-3xl animate-pulse">touch_app</span>
                    <p className="text-slate-500 text-xs mt-3 font-semibold">Arahkan kursor ke komponen untuk memeriksa detail skema dan biaya modul.</p>
                  </div>
                )}
                
                {activeHardware && (
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest mt-4 uppercase border-t border-slate-200 pt-3">
                    Estimasi Biaya: <strong className="text-blue-600">{activeHardware.price}</strong> ({activeHardware.priceIdr})
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Pricing / Bill of Materials (BOM) Section matching WearOcean */}
        <section id="pricing" className="py-12 border-t border-slate-200">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Rincian Anggaran Komponen (BOM)</h2>
            <p className="mt-2 text-sm text-slate-500">Daftar harga modul retrofit IoT untuk implementasi Smart & Green Factory.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex justify-between">
                <span>BOM Module Retrofit Per Mesin</span>
                <span className="text-[#4B6BFB] text-sm">$85.60 (~Rp 1.343.000)</span>
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {allHardware.filter(h => !h.id.startsWith("gw_") && !h.id.startsWith("sw_")).map((item, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-800 block truncate">{item.name}</span>
                    <span className="font-mono text-slate-600 shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex justify-between">
                <span>BOM Infrastructure Server</span>
                <span className="text-[#4B6BFB] text-sm">$128.50 (~Rp 1.980.000)</span>
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {allHardware.filter(h => h.id.startsWith("gw_")).map((item, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-800 block truncate">{item.name}</span>
                    <span className="font-mono text-slate-600 shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex justify-between">
                <span>Layanan Software AI Copilot</span>
                <span className="text-[#4B6BFB] text-sm">$15.00 (~Rp 230.000)</span>
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {allHardware.filter(h => h.id.startsWith("sw_")).map((item, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="font-semibold text-slate-800 block truncate">{item.name}</span>
                    <span className="font-mono text-slate-600 shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture Section matching WearOcean */}
        <section id="architecture" className="py-12 border-t border-slate-200">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Alur Transmisi Data Telemetri</h2>
            <p className="mt-2 text-sm text-slate-500">Bagaimana modul perangkat keras beroperasi bersama untuk mengirimkan data ke ESG Control Tower.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: 1, label: "Akuisisi Sensor Mesin", desc: "Sensors (vibrasi, suhu, power CT, flow meter) mengukur kondisi fisik mesin 20 unit." },
              { step: 2, label: "Logika Edge Processing", desc: "ESP32-S3 memproses sinyal Modbus/I2C dan mengemas payload telemetri." },
              { step: 3, label: "Transmisi Industrial Ethernet", desc: "Modul Ethernet W5500 mengirim paket data MQTT/HTTPS berkecepatan tinggi." },
              { step: 4, label: "Infrastruktur Data Platform", desc: "Time-series database mengolah skor kesehatan mesin dan menghitung emisi karbon." },
              { step: 5, label: "Dasbor ESG Control Tower", desc: "Konsol pemantau menampilkan status real-time, alert anomali, dan kelayakan finansial." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-blue-50 border border-blue-100 text-[#4B6BFB] flex items-center justify-center text-xs font-bold font-mono">
                  {item.step}
                </div>
                <h4 className="font-sans text-xs font-bold text-slate-950 mt-4 leading-snug">{item.label}</h4>
                <p className="text-slate-500 text-[11px] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 text-center text-slate-400 text-[10px] font-mono tracking-widest">
          <p>© 2026 PT Sinergi Manufaktur Nusantara (SMN) — SmartGreen Transformation</p>
        </footer>

      </div>
    </div>
  );
}
