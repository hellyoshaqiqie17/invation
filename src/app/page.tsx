"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const allHardware = [
    {
      id: "esp32s3",
      name: "Industrial Edge IoT Gateway (ESP32-S3 / RS485)",
      desc: "Industrial-grade edge controller with dual-core MCU, Wi-Fi, RS485 Modbus RTU & MQTT Sparkplug B protocol support.",
      price: "$28.50",
      priceIdr: "Rp 440.000",
    },
    {
      id: "vib_sensor",
      name: "Industrial Vibration Sensor (3-Axis Accelerometer)",
      desc: "High-precision piezoelectric accelerometer for ISO 10816 mechanical vibration severity and bearing degradation monitoring.",
      price: "$18.20",
      priceIdr: "Rp 280.000",
    },
    {
      id: "temp_probe",
      name: "Digital High-Temp Probe (PT100 RTD)",
      desc: "Oil-resistant stainless probe for real-time spindle bearing, motor winding, and hydraulic fluid thermal profiling.",
      price: "$9.50",
      priceIdr: "Rp 148.000",
    },
    {
      id: "power_meter",
      name: "Smart 3-Phase Power Meter & CT Clamp",
      desc: "Split-core CT current transformer for 3-phase active power (kW) and idle loss energy waste monitoring.",
      price: "$24.00",
      priceIdr: "Rp 370.000",
    },
    {
      id: "flow_meter",
      name: "Closed-Loop Water Flow & pH Sensor",
      desc: "Electromagnetic flow meter & industrial pH probe for closed-loop cooling recovery balance.",
      price: "$15.40",
      priceIdr: "Rp 238.000",
    },
    {
      id: "k3_sensor",
      name: "Hazardous Chemical & Gas Sensor (EHS)",
      desc: "Electrochemical ambient sensor for detecting hazardous VOC and coolant mist exposure in operator cells.",
      price: "$14.00",
      priceIdr: "Rp 215.000",
    },
    {
      id: "camera_ai",
      name: "AI Vision Quality Inspection Unit",
      desc: "High-speed industrial CMOS sensor running edge visual inference for zero-defect surface stamping inspection.",
      price: "$45.00",
      priceIdr: "Rp 695.000",
    },
    {
      id: "gw_server",
      name: "Edge ESG Control Tower Server",
      desc: "On-premise edge computing server aggregating high-frequency MQTT streams to real-time analytics & AI Copilot.",
      price: "$120.00",
      priceIdr: "Rp 1.850.000",
    },
    {
      id: "gw_mqtt",
      name: "Industrial Ethernet W5500 Interface",
      desc: "Hardwired SPI-to-Ethernet interface for noise-immune shop floor deterministic network reliability.",
      price: "$8.50",
      priceIdr: "Rp 130.000",
    },
    {
      id: "sw_copilot",
      name: "Digital AI Anomaly Copilot Engine",
      desc: "Embedded predictive inference engine analyzing multi-variable telemetry for failure window forecasting.",
      price: "$15.00",
      priceIdr: "Rp 230.000",
    },
  ];

  const activeHardware = allHardware.find((h) => h.id === hoveredComponent);

  return (
    <div className="relative min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden text-slate-900 selection:bg-[#EEF2FF] selection:text-[#4B6BFB]">
      
      {/* Background Dotted Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20 z-0" />

      {/* Main Container Card */}
      <div className="relative z-10 max-w-[1300px] mx-auto bg-white rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 shadow-xl border border-slate-200 space-y-16">
        
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#4B6BFB] overflow-hidden flex items-center justify-center shadow-xs text-white">
              <span className="material-icons text-xl">precision_manufacturing</span>
            </div>
            <div>
              <span className="font-sans text-base font-extrabold tracking-tight text-slate-900 uppercase">
                SMN SYNERGY
              </span>
              <span className="text-xs text-slate-500 font-medium block -mt-0.5">
                PT Sinergi Manufaktur Nusantara
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#overview" className="text-[#4B6BFB] font-semibold hover:text-[#3B5BEB] transition-colors">
              Platform Overview
            </a>
            <a href="#pillars" className="hover:text-slate-800 transition-colors">
              Core Pillars
            </a>
            <a href="#schematics" className="hover:text-slate-800 transition-colors">
              Hardware Schematics
            </a>
            <a href="#architecture" className="hover:text-slate-800 transition-colors">
              Digital Backbone
            </a>
            <a href="#pricing" className="hover:text-slate-800 transition-colors">
              BOM & Economics
            </a>
          </div>

          <Link
            href="/admin/dashboard"
            className="px-5 py-2.5 rounded-xl bg-[#4B6BFB] hover:bg-[#3B5BEB] text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            Enter Control Tower
          </Link>
        </nav>

        {/* HERO SECTION */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="flex flex-col gap-y-7">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700 w-fit">
                <span className="h-2 w-2 rounded-full bg-[#4B6BFB]"></span>
                <span className="font-semibold text-slate-900">SMN SYNERGY</span>
                <span className="text-slate-300">•</span>
                <span>Smart & Green Factory Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                SMN SYNERGY
              </h1>
              <p className="text-lg text-slate-700 font-medium leading-snug">
                Smart Manufacturing. Sustainable Operations. People-Ready Transformation.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                Digital operating platform terpadu yang mengintegrasikan monitoring 20 IoT telemetry nodes, AI predictive maintenance, 64% closed-loop water recovery, Green Batch Passport traceability, dan Human Readiness Gate.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 text-white bg-[#4B6BFB] hover:bg-[#3B5BEB] px-6 py-3.5 rounded-xl font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span className="material-icons text-base">space_dashboard</span>
                <span>Enter Control Tower</span>
              </Link>
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 text-slate-700 bg-slate-100 hover:bg-slate-200 px-6 py-3.5 rounded-xl font-semibold transition-all"
              >
                <span className="material-icons text-base">explore</span>
                <span>Explore Platform</span>
              </a>
            </div>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>20 IoT Telemetry Nodes</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                <span>64% Closed-Loop Water Recovery</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#4B6BFB]"></span>
                <span>Green Batch Passport</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 bg-white shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>Zero Layoff Reskilling</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column - Live Operational Snapshot Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">
                  Live Operational Snapshot
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4B6BFB] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4B6BFB]"></span>
                Live Telemetry
              </span>
            </div>

            {/* Machine Unit M03 Spotlight */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Hydraulic Press Unit M03</h4>
                  <span className="text-[10px] text-slate-400">Line 1 • Stamping & Pressing</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  WARNING: ANOMALY
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 block">VIBRATION</span>
                  <span className="font-bold text-amber-600">6.7 mm/s</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 block">TEMP</span>
                  <span className="font-bold text-slate-800">78.4 °C</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 block">POWER</span>
                  <span className="font-bold text-slate-800">34.2 kW</span>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-[11px] text-indigo-900 space-y-1">
                <div className="flex items-center gap-1 font-bold">
                  <span className="material-icons text-xs text-indigo-600">psychology</span>
                  <span>AI Failure Window: 14 - 21 Days</span>
                </div>
                <p className="text-[10px] text-indigo-800 leading-snug">
                  "Schedule spindle bearing inspection & re-lubrication on Shift 3 maintenance window."
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/admin/machines"
                  className="flex-1 bg-[#4B6BFB] hover:bg-[#3B5BEB] text-white font-semibold py-2 rounded-xl text-xs text-center transition-colors shadow-xs"
                >
                  Analyze in Sense & Predict
                </Link>
              </div>
            </div>

            {/* Micro metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Water Loop</span>
                <span className="font-bold text-cyan-700 font-mono text-sm">64% Closed-Loop</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Digital Product Passport</span>
                <span className="font-bold text-emerald-600 font-mono text-sm">100% Verified</span>
              </div>
            </div>
          </div>

        </section>

        {/* 6 CORE PILLARS SECTION */}
        <section id="pillars" className="py-12 border-t border-slate-200 space-y-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#4B6BFB]">
              Platform Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Core Architecture Pillars — SMN SYNERGY
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Connecting physical machine telemetry with ESG circularity, financial viability, and human enablement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1: Real-Time Operations */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] text-[#4B6BFB] flex items-center justify-center">
                <span className="material-icons text-xl">space_dashboard</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Real-Time Operations</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Centralized telemetry for 20 pilot machines across Line 1 & Line 2 via SMN Control Tower. Displays real-time OEE, anomaly alerts, and priority action items.
              </p>
              <Link href="/admin/dashboard" className="inline-block text-xs font-semibold text-[#4B6BFB] hover:text-[#3B5BEB] underline pt-1">
                Open Control Tower →
              </Link>
            </div>

            {/* Pillar 2: Smart Maintenance */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-icons text-xl">settings_input_component</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Smart Predictive Maintenance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Shifting maintenance from reactive to predictive. 3-axis vibration sensors and PT100 temperature probes detect bearing degradation before catastrophic downtime.
              </p>
              <Link href="/admin/machines" className="inline-block text-xs font-semibold text-emerald-600 hover:text-emerald-800 underline pt-1">
                Open Sense & Predict →
              </Link>
            </div>

            {/* Pillar 3: Resource Efficiency */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <span className="material-icons text-xl">sync</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Resource Efficiency & Circular Loops</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Closed-loop cooling water achieving 64% circular recovery, automated flow leak detection, and digital B3 hazardous waste tracking compliant with KLHK standards.
              </p>
              <Link href="/admin/esg" className="inline-block text-xs font-semibold text-cyan-600 hover:text-cyan-800 underline pt-1">
                Open Close The Loop →
              </Link>
            </div>

            {/* Pillar 4: ESG Traceability */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span className="material-icons text-xl">verified_user</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">4. ESG Traceability & Green Batch Passport</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Green Batch Passport tracks product carbon footprint and 10-node supply chain provenance from raw steel sourcing to finished export shipment with verifiable digital proofs.
              </p>
              <Link href="/admin/green-batch" className="inline-block text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline pt-1">
                Open Green Batch Passport →
              </Link>
            </div>

            {/* Pillar 5: Workforce Readiness */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <span className="material-icons text-xl">school</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">5. Workforce Readiness (Just Transition)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Human Readiness Gate ensures automated technologies are only authorized once operators complete qualification modules. Zero Layoff Commitment.
              </p>
              <Link href="/admin/workforce" className="inline-block text-xs font-semibold text-amber-600 hover:text-amber-800 underline pt-1">
                Open Grow with SMN →
              </Link>
            </div>

            {/* Pillar 6: Financial Feasibility */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <span className="material-icons text-xl">trending_up</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">6. Transformation Value & ROI</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rigorous financial feasibility: CAPEX ceiling Rp 8.0B, target OPEX reduction 18%, Payback period 2.14 years, and IRR 31.8% ensuring self-funding innovation.
              </p>
              <Link href="/admin/financials" className="inline-block text-xs font-semibold text-slate-900 hover:text-[#4B6BFB] underline pt-1">
                Open Financial Calculator →
              </Link>
            </div>

          </div>
        </section>

        {/* INTERACTIVE HARDWARE SCHEMATICS SECTION */}
        <section id="schematics" className="py-12 border-t border-slate-200 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#4B6BFB]">
              IoT Edge Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Machine Retrofit Hardware Schematics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Hover over edge microcontrollers or sensor nodes to inspect physical specifications and unit economics.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Machine Retrofit Diagram */}
            <div className="xl:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col items-center">
              <h3 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                <span className="material-icons text-[#4B6BFB] text-base">developer_board</span>
                IoT Retrofit Kit Per Machine ($85.60 / Unit)
              </h3>
              
              <svg width="340" height="360" viewBox="0 0 340 360" className="w-full drop-shadow-sm select-none">
                <rect x="95" y="80" width="150" height="210" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                
                {/* ESP32-S3 */}
                <g 
                  onMouseEnter={() => setHoveredComponent("esp32s3")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "esp32s3" ? "0.3" : "1"}
                >
                  <rect x="145" y="150" width="50" height="50" rx="6" fill="#EEF2FF" stroke="#4B6BFB" strokeWidth="2" />
                  <text x="148" y="178" fill="#4B6BFB" fontSize="8" fontWeight="bold" fontFamily="monospace">ESP32-S3</text>
                  <circle cx="170" cy="195" r="2.5" fill="#10B981" />
                </g>

                {/* Vibration Sensor */}
                <g 
                  onMouseEnter={() => setHoveredComponent("vib_sensor")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "vib_sensor" ? "0.3" : "1"}
                >
                  <rect x="105" y="100" width="40" height="35" rx="4" fill="#F8FAFC" stroke="#4B6BFB" strokeWidth="1.5" />
                  <text x="111" y="121" fill="#1E293B" fontSize="8" fontWeight="bold" fontFamily="monospace">VIB-3X</text>
                </g>

                {/* Temperature Sensor */}
                <g 
                  onMouseEnter={() => setHoveredComponent("temp_probe")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "temp_probe" ? "0.3" : "1"}
                >
                  <rect x="195" y="100" width="40" height="35" rx="4" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.5" />
                  <text x="199" y="121" fill="#EF4444" fontSize="8" fontWeight="bold" fontFamily="monospace">PT100</text>
                </g>

                {/* Power Meter */}
                <g 
                  onMouseEnter={() => setHoveredComponent("power_meter")}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredComponent && hoveredComponent !== "power_meter" ? "0.3" : "1"}
                >
                  <rect x="105" y="240" width="130" height="40" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
                  <text x="125" y="264" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">SMART POWER CT</text>
                </g>
              </svg>
            </div>

            {/* Hover Info Card */}
            <div className="xl:col-span-6 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 min-h-[260px] flex flex-col justify-between shadow-xs">
                {activeHardware ? (
                  <div>
                    <span className="text-xs font-semibold text-[#4B6BFB] block">
                      Selected Component
                    </span>
                    <h3 className="text-base font-bold mt-1 text-slate-900 leading-snug">{activeHardware.name}</h3>
                    <p className="text-slate-600 text-xs mt-2.5 leading-relaxed">
                      {activeHardware.desc}
                    </p>
                    <div className="text-xs text-slate-700 tracking-normal mt-4 border-t border-slate-200 pt-3">
                      Estimated Cost: <strong className="text-[#4B6BFB] font-bold font-mono">{activeHardware.price}</strong> ({activeHardware.priceIdr})
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full my-auto py-12">
                    <span className="material-icons text-slate-400 text-3xl animate-pulse">touch_app</span>
                    <p className="text-slate-500 text-xs mt-3 font-semibold">
                      Hover over sensor components on the diagram to inspect technical specifications and unit economics.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick links to modules */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Explore Platform Modules:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link href="/admin/dashboard" className="p-2.5 bg-slate-50 hover:bg-[#EEF2FF] hover:text-[#4B6BFB] rounded-xl border border-slate-200 font-medium transition-colors">
                    → SMN Control Tower
                  </Link>
                  <Link href="/admin/machines" className="p-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl border border-slate-200 font-medium transition-colors">
                    → Sense & Predict
                  </Link>
                  <Link href="/admin/green-batch" className="p-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl border border-slate-200 font-medium transition-colors">
                    → Green Batch Passport
                  </Link>
                  <Link href="/admin/workforce" className="p-2.5 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 rounded-xl border border-slate-200 font-medium transition-colors">
                    → Grow with SMN
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* BILL OF MATERIALS (BOM) BUDGET SECTION */}
        <section id="pricing" className="py-12 border-t border-slate-200 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#4B6BFB]">
              Unit Economics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Bill of Materials (BOM) & Edge Economics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cost-effective edge retrofit hardware breakdown for 20 industrial manufacturing units.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Retrofit BOM Per Machine</span>
                <span className="text-[#4B6BFB] text-xs font-bold font-mono">$85.60 (~Rp 1.343.000)</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {allHardware.filter((h) => !h.id.startsWith("gw_") && !h.id.startsWith("sw_")).map((item, i) => (
                  <div key={i} className="py-2 flex justify-between gap-2">
                    <span className="text-slate-700 truncate">{item.name}</span>
                    <span className="font-mono text-slate-900 font-bold shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Server & Gateway BOM</span>
                <span className="text-[#4B6BFB] text-xs font-bold font-mono">$128.50 (~Rp 1.980.000)</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {allHardware.filter((h) => h.id.startsWith("gw_")).map((item, i) => (
                  <div key={i} className="py-2 flex justify-between gap-2">
                    <span className="text-slate-700 truncate">{item.name}</span>
                    <span className="font-mono text-slate-900 font-bold shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">AI Copilot Engine</span>
                <span className="text-[#4B6BFB] text-xs font-bold font-mono">$15.00 (~Rp 230.000)</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {allHardware.filter((h) => h.id.startsWith("sw_")).map((item, i) => (
                  <div key={i} className="py-2 flex justify-between gap-2">
                    <span className="text-slate-700 truncate">{item.name}</span>
                    <span className="font-mono text-slate-900 font-bold shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 text-center text-slate-400 text-xs">
          <p>© 2026 PT Sinergi Manufaktur Nusantara (SMN) — SMN SYNERGY Digital Operating Platform</p>
        </footer>

      </div>
    </div>
  );
}
