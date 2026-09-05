"use client";

import { useState } from "react";
import { Cpu, Activity, Thermometer, Zap, Radio, CheckCircle, AlertTriangle, ShieldAlert } from "lucide-react";

interface SensorInfo {
  id: string;
  name: string;
  type: string;
  protocol: string;
  desc: string;
  impact: string;
  icon: any;
  color: string;
}

const sensors: SensorInfo[] = [
  {
    id: "vib",
    name: "Industrial Vibration Sensor (3-Axis Accelerometer)",
    type: "Piezoelectric Accelerometer",
    protocol: "4-20mA / Modbus RTU",
    desc: "Detects abnormal vibration patterns that indicate mechanical bearing wear, shaft misalignment, or structural looseness.",
    impact: "Provides early anomaly detection 3 to 4 weeks before catastrophic mechanical failure.",
    icon: Activity,
    color: "#3b82f6"
  },
  {
    id: "temp",
    name: "Thermal Probe & Bearing Temp Sensor",
    type: "PT100 RTD Digital Probe",
    protocol: "OneWire / Modbus RTU",
    desc: "Monitors thermal behavior of motor windings and bearing housing components under load.",
    impact: "Prevents motor burnout and detects lubrication degradation before heat spikes cause shutdown.",
    icon: Thermometer,
    color: "#ef4444"
  },
  {
    id: "power",
    name: "IoT Smart Power Meter & CT Clamp",
    type: "3-Phase Current Transformer (CT)",
    protocol: "Modbus TCP / MQTT",
    desc: "Measures machine-level electricity consumption, active power (kW), power factor, and idle energy.",
    impact: "Identifies energy waste during non-productive idle hours and monitors electrical efficiency.",
    icon: Zap,
    color: "#10b981"
  },
  {
    id: "status",
    name: "Machine State & Cycle Time Sensor",
    type: "Inductive Proximity / Optocoupler",
    protocol: "Digital I/O to Gateway",
    desc: "Determines real-time running, idle, standby, and stop states by sensing stroke counts and cycle speed.",
    impact: "Feeds precise cycle time (baseline 25 min) and machine utilization metrics (baseline 65%) to ESG tower.",
    icon: Radio,
    color: "#8b5cf6"
  },
  {
    id: "plc",
    name: "Legacy PLC Modbus Gateway Adapter",
    type: "RS485 to Ethernet Modbus Gateway",
    protocol: "Modbus RTU/TCP / MQTT",
    desc: "Existing PLC data (Omron / Siemens / Mitsubishi) integrated through RS485 industrial protocols without stopping operations.",
    impact: "Retrofits legacy machines at < 15% of the cost of buying new automated machinery.",
    icon: Cpu,
    color: "#f59e0b"
  }
];

export default function MachineRetrofitSvg() {
  const [selectedSensorId, setSelectedSensorId] = useState<string>("vib");

  const selectedSensor = sensors.find((s) => s.id === selectedSensorId) || sensors[0];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-950/70 border border-blue-800/80 text-xs font-medium text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Arsitektur Retrofit-First
          </span>
          <h3 className="text-2xl font-extrabold text-slate-100 mt-2">
            Don't Replace the Factory. Retrofit It.
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Klik pada titik sensor (hotspot) pada skema mesin industri di bawah ini untuk melihat spesifikasi teknis dan dampak pemantauan.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Biaya Retrofit Pilot: &lt; <strong className="font-mono text-white">Rp 140 Juta / Mesin</strong></span>
        </div>
      </div>

      {/* Grid: SVG Graphic & Sensor Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left SVG Schematic (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative min-h-[320px]">
          <svg viewBox="0 0 540 320" className="w-full h-full drop-shadow-lg select-none">
            {/* Machine Base */}
            <rect x="70" y="150" width="400" height="130" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            <rect x="100" y="100" width="180" height="70" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <circle cx="380" cy="180" r="45" fill="#0f172a" stroke="#475569" strokeWidth="3" />
            <text x="380" y="185" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold" fontFamily="monospace">FLYWHEEL</text>
            <text x="190" y="140" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">HYDRAULIC PRESS M03</text>

            {/* Hotspot 1: Vibration (Front Bearing) */}
            <g onClick={() => setSelectedSensorId("vib")} className="cursor-pointer group">
              <circle cx="380" cy="135" r="16" fill={selectedSensorId === "vib" ? "#3b82f6" : "#1e293b"} stroke="#3b82f6" strokeWidth="3" className="transition-all" />
              <circle cx="380" cy="135" r="22" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" />
              <text x="380" y="139" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">VIB</text>
            </g>

            {/* Hotspot 2: Temp (Motor Casing) */}
            <g onClick={() => setSelectedSensorId("temp")} className="cursor-pointer group">
              <circle cx="140" cy="90" r="16" fill={selectedSensorId === "temp" ? "#ef4444" : "#1e293b"} stroke="#ef4444" strokeWidth="3" className="transition-all" />
              <text x="140" y="94" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">TMP</text>
            </g>

            {/* Hotspot 3: Power Meter (Electrical Box) */}
            <g onClick={() => setSelectedSensorId("power")} className="cursor-pointer group">
              <circle cx="90" cy="220" r="16" fill={selectedSensorId === "power" ? "#10b981" : "#1e293b"} stroke="#10b981" strokeWidth="3" className="transition-all" />
              <text x="90" y="224" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">PWR</text>
            </g>

            {/* Hotspot 4: Machine Status (Stroke Sensor) */}
            <g onClick={() => setSelectedSensorId("status")} className="cursor-pointer group">
              <circle cx="260" cy="220" r="16" fill={selectedSensorId === "status" ? "#8b5cf6" : "#1e293b"} stroke="#8b5cf6" strokeWidth="3" className="transition-all" />
              <text x="260" y="224" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">STA</text>
            </g>

            {/* Hotspot 5: PLC Interface (Gateway Modbus) */}
            <g onClick={() => setSelectedSensorId("plc")} className="cursor-pointer group">
              <circle cx="450" cy="240" r="16" fill={selectedSensorId === "plc" ? "#f59e0b" : "#1e293b"} stroke="#f59e0b" strokeWidth="3" className="transition-all" />
              <text x="450" y="244" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">PLC</text>
            </g>

            {/* IoT Edge Gateway Hub Box */}
            <rect x="210" y="25" width="120" height="40" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="270" y="49" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">IoT EDGE GATEWAY</text>

            {/* Connecting Signal Lines */}
            <line x1="140" y1="74" x2="210" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="380" y1="119" x2="330" y2="45" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="90" y1="204" x2="210" y2="45" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="450" y1="224" x2="330" y2="45" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          <span className="text-xs text-slate-500 mt-2">Diagram Retrofit IoT Mesin Industri (Klik icon sensor untuk detail)</span>
        </div>

        {/* Right Detail Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700" style={{ color: selectedSensor.color }}>
              <selectedSensor.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-400">Detail Sensor Terpilih</span>
              <h4 className="text-base font-bold text-white mt-0.5">{selectedSensor.name}</h4>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-xs">Tipe Hardware & Protokol:</span>
              <span className="font-mono text-emerald-400 font-semibold">{selectedSensor.type} ({selectedSensor.protocol})</span>
            </div>

            <div>
              <span className="text-slate-400 block text-xs">Fungsi Pemantauan:</span>
              <p className="text-slate-300 leading-relaxed mt-0.5">{selectedSensor.desc}</p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
              <span className="text-blue-400 block text-xs font-semibold">Nilai Tambah & Nilai Dampak:</span>
              <p className="text-slate-200 mt-1 leading-relaxed">{selectedSensor.impact}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Live Health Status Demo Matrix */}
      <div className="border-t border-slate-800 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold text-slate-300">
            Demo Stream Status Kesehatan Mesin (Predictive Maintenance Pipeline)
          </h4>
          <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">Data Ilustratif Prototipe</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "M01", name: "CNC Press 01", health: 94, status: "NORMAL", color: "emerald", vib: "1.8 mm/s", temp: "42.5°C" },
            { id: "M02", name: "Milling Unit 02", health: 88, status: "NORMAL", color: "emerald", vib: "2.3 mm/s", temp: "48.0°C" },
            { id: "M03", name: "Hydraulic Press 03", health: 51, status: "WARNING (ANOMALY)", color: "amber", vib: "6.7 mm/s (High)", temp: "78.4°C (Hot)" },
            { id: "M04", name: "Robotic Weld 04", health: 91, status: "NORMAL", color: "emerald", vib: "1.2 mm/s", temp: "39.1°C" },
          ].map((m) => (
            <div key={m.id} className={`p-4 rounded-xl border ${
              m.status.includes("WARNING") 
                ? "bg-amber-950/40 border-amber-500/80 shadow-md shadow-amber-500/10" 
                : "bg-slate-800/60 border-slate-700"
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-white">{m.id} - {m.name}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${
                  m.status.includes("WARNING") ? "bg-amber-500 text-slate-950 animate-pulse" : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {m.status}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Machine Health Score:</span>
                  <span className={`font-bold font-mono ${m.health < 60 ? "text-amber-400" : "text-emerald-400"}`}>{m.health}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full ${m.health < 60 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${m.health}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>Vib: {m.vib}</span>
                  <span>Temp: {m.temp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 mt-3 italic">
          * Catatan: Sistem memulai dari condition monitoring & anomaly detection. Machine learning (ML) akan dikembangkan secara bertahap setelah dataset historis telemetri terkumpul di Cloud Platform.
        </p>
      </div>
    </div>
  );
}
