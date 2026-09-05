"use client";

import { useState } from "react";
import { simulator } from "@/lib/mockData";

export type ModalType =
  | "shift_checklist"
  | "andon_calling"
  | "digital_sop"
  | "service_schedule"
  | "crypto_verify"
  | null;

interface RoleActionModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export default function RoleActionModals({ activeModal, onClose }: RoleActionModalsProps) {
  // Shift Checklist State
  const [checklist, setChecklist] = useState({
    lubricantVerified: true,
    fiveSCleaned: true,
    infraredTempCheck: false,
    emergencyStopOk: true,
    scrapTrayEmpty: true,
    noiseNormal: false,
  });
  const [handoverNotes, setHandoverNotes] = useState("");
  const [checklistSigned, setChecklistSigned] = useState(false);

  // Andon Calling State
  const [andonLine, setAndonLine] = useState<"Line 1" | "Line 2">("Line 2");
  const [andonTarget, setAndonTarget] = useState("Mechanical Maintenance Team");
  const [andonUrgency, setAndonUrgency] = useState<"NORMAL" | "WARNING" | "CRITICAL">("WARNING");
  const [andonNotes, setAndonNotes] = useState("");
  const [andonSuccess, setAndonSuccess] = useState(false);

  // Digital SOP State
  const [selectedSop, setSelectedSop] = useState<"SOP-01" | "SOP-02" | "SOP-03" | "SOP-04">("SOP-01");

  // Crypto Verify State
  const [verifying, setVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<boolean | null>(null);

  if (!activeModal) return null;

  // Handlers
  const handleSaveChecklist = () => {
    setChecklistSigned(true);
    setTimeout(() => {
      onClose();
      setChecklistSigned(false);
    }, 1500);
  };

  const handleSendAndon = () => {
    simulator.triggerAndonCall(andonLine, andonTarget, andonUrgency, andonNotes);
    setAndonSuccess(true);
    setTimeout(() => {
      onClose();
      setAndonSuccess(false);
      setAndonNotes("");
    }, 1800);
  };

  const handleRunVerification = () => {
    setVerifying(true);
    setVerifiedResult(null);
    setTimeout(() => {
      setVerifying(false);
      setVerifiedResult(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* ================= MODAL 1: OPERATOR SHIFT CHECKLIST ================= */}
        {activeModal === "shift_checklist" && (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 text-[#4B6BFB] flex items-center justify-center">
                  <span className="material-icons">fact_check</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Shift Handover & Operational Checklist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Shift 1 (07:00 - 15:00 WIB) • Shop Floor Line 1 & Line 2
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <span className="material-icons text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {checklistSigned ? (
                <div className="py-8 text-center space-y-3">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <span className="material-icons text-3xl">check</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Shift Handover Submitted Successfully</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Inspection log has been recorded to digital audit trail and forwarded to Shift 2 Lead.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-blue-950 block">Active Shift Leader:</span>
                      <span className="text-blue-800">Agus Supriyadi (ID: OPR-L2-014)</span>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100/80 text-blue-800 rounded-lg font-medium">
                      Status: Operational
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                      1. Safety & Machine Health Verification
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        { key: "emergencyStopOk", label: "Emergency Stop switch response verified across all active units" },
                        { key: "lubricantVerified", label: "Hydraulic oil & coolant levels verified within operating threshold (Max-Min)" },
                        { key: "infraredTempCheck", label: "Main spindle & motor bearing thermal check (< 75°C normal)" },
                        { key: "fiveSCleaned", label: "5S housekeeping: scrap metal cleared from operator walkway & machine bed" },
                        { key: "scrapTrayEmpty", label: "Stamping scrap bin emptied & prepared for incoming cycle" },
                        { key: "noiseNormal", label: "Acoustic & vibration check: no abnormal resonance or harmonic hum detected" },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50/80 cursor-pointer transition-colors text-xs text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={checklist[item.key as keyof typeof checklist]}
                            onChange={(e) =>
                              setChecklist({ ...checklist, [item.key]: e.target.checked })
                            }
                            className="mt-0.5 h-4 w-4 rounded text-[#4B6BFB] focus:ring-[#4B6BFB]"
                          />
                          <span className="font-medium leading-relaxed">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                      2. Shift Handover Notes & Remarks
                    </label>
                    <textarea
                      value={handoverNotes}
                      onChange={(e) => setHandoverNotes(e.target.value)}
                      placeholder="e.g. Unit M13 exhibited elevated vibration toward the end of shift (8.9 mm/s), maintenance work order #TSK-01 auto-generated."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B6BFB]/20 focus:border-[#4B6BFB] text-slate-800 placeholder:text-slate-400 resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {!checklistSigned && (
              <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/30">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChecklist}
                  className="px-5 py-2 rounded-xl bg-[#4B6BFB] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-icons text-sm">assignment_turned_in</span>
                  <span>Submit Shift Handover</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= MODAL 2: ANDON CALLING SYSTEM ================= */}
        {activeModal === "andon_calling" && (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <span className="material-icons">campaign</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Trigger Andon Alert
                  </h3>
                  <p className="text-xs text-slate-500">
                    Shop floor emergency escalation & technical assistance system
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <span className="material-icons text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {andonSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="h-14 w-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto animate-pulse">
                    <span className="material-icons text-3xl">notifications_active</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Andon Alert Broadcasted Successfully</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Dispatch alert transmitted to {andonTarget}. Incident logged on SMN Control Tower.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      1. Select Production Line
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["Line 1", "Line 2"] as const).map((line) => (
                        <button
                          key={line}
                          type="button"
                          onClick={() => setAndonLine(line)}
                          className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                            andonLine === line
                              ? "border-[#4B6BFB] bg-[#EEF2FF] text-[#4B6BFB] font-bold shadow-xs"
                              : "border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <div>
                            <span className="text-xs block font-bold">
                              {line === "Line 1" ? "Line 1 — Heavy Stamping" : "Line 2 — Precision Finishing"}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {line === "Line 1" ? "10 Hydraulic Press Units" : "10 CNC & Assembly Cells"}
                            </span>
                          </div>
                          {andonLine === line && (
                            <span className="material-icons text-base text-[#4B6BFB]">check_circle</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      2. Target Assistance Team
                    </label>
                    <div className="space-y-2">
                      {[
                        { title: "Mechanical Maintenance Team", desc: "Vibrasi abnormal, bearing overheating, atau isu hidrolik", icon: "build" },
                        { title: "Electrical & IoT Specialist", desc: "Sensor telemetry offline, inverter fault, atau PLC alarm", icon: "bolt" },
                        { title: "Quality Assurance (QA) Inspector", desc: "Deviasi dimensi toleransi part (> 0.05mm), spike reject rate", icon: "verified" },
                        { title: "EHS / Safety Officer", desc: "Potensi resiko kecelakaan, tumpahan oli/coolant, atau bahaya K3", icon: "health_and_safety" },
                      ].map((item) => (
                        <div
                          key={item.title}
                          onClick={() => setAndonTarget(item.title)}
                          className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                            andonTarget === item.title
                              ? "border-[#4B6BFB] bg-[#EEF2FF] shadow-xs"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${andonTarget === item.title ? "bg-[#4B6BFB] text-white" : "bg-slate-100 text-slate-600"}`}>
                            <span className="material-icons text-base">{item.icon}</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-bold text-slate-900 block">{item.title}</span>
                            <span className="text-[11px] text-slate-500">{item.desc}</span>
                          </div>
                          <input
                            type="radio"
                            name="andonTarget"
                            checked={andonTarget === item.title}
                            onChange={() => setAndonTarget(item.title)}
                            className="h-4 w-4 text-[#4B6BFB]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      3. Priority Level
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { key: "NORMAL", label: "Normal", sub: "Response SLA < 15 mins", color: "border-blue-200 bg-blue-50/50 text-blue-800" },
                        { key: "WARNING", label: "High Priority", sub: "Response SLA < 5 mins", color: "border-amber-200 bg-amber-50/50 text-amber-800" },
                        { key: "CRITICAL", label: "Critical / Line Stop", sub: "Immediate Response", color: "border-red-200 bg-red-50/50 text-red-800" },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setAndonUrgency(item.key as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            andonUrgency === item.key
                              ? `${item.color} font-bold ring-2 ring-[#4B6BFB]/30`
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-xs block font-bold">{item.label}</span>
                          <span className="text-[10px] text-slate-500">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                      4. Incident Description & Field Remarks
                    </label>
                    <input
                      type="text"
                      value={andonNotes}
                      onChange={(e) => setAndonNotes(e.target.value)}
                      placeholder="e.g. Heavy knocking acoustic detected on M13 spindle bearing, temperature rising."
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B6BFB]/20 focus:border-[#4B6BFB] text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </>
              )}
            </div>

            {!andonSuccess && (
              <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/30">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAndon}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-icons text-sm">campaign</span>
                  <span>Broadcast Andon Alert</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= MODAL 3: DIGITAL SOP & SAFETY GUIDELINES ================= */}
        {activeModal === "digital_sop" && (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <span className="material-icons">menu_book</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Digital SOP & Safety Protocols
                  </h3>
                  <p className="text-xs text-slate-500">
                    Standard operating procedures & Industry 5.0 human safety guidelines
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <span className="material-icons text-xl">close</span>
              </button>
            </div>

            {/* SOP Selector Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 overflow-x-auto gap-2 py-2">
              {[
                { id: "SOP-01", label: "Hydraulic Press Start-up" },
                { id: "SOP-02", label: "ISO 10816 Vibration Threshold" },
                { id: "SOP-03", label: "Mandatory PPE (EHS)" },
                { id: "SOP-04", label: "LOTO Protocol (Zero Energy)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSop(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedSop === tab.id
                      ? "bg-white text-[#4B6BFB] shadow-xs border border-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs text-slate-700 leading-relaxed">
              {selectedSop === "SOP-01" && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <h4 className="font-bold text-blue-950 text-xs mb-1">Doc Code: SOP-OPR-SMN-01 (Rev 3.2)</h4>
                    <p className="text-blue-800 text-[11px]">Target Scope: Heavy Stamping Presses M01 - M10 (Line 1)</p>
                  </div>
                  <h5 className="font-bold text-slate-900">Step 1: Pre-Start Verification</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Confirm main circuit breaker is in ON position and green status pilot lamp is illuminated.</li>
                    <li>Verify hydraulic fluid level on primary sight glass (minimum 75% capacity required).</li>
                    <li>Inspect optical safety light curtain: verify lenses are clean and beam interruption triggers immediate halt.</li>
                  </ul>
                  <h5 className="font-bold text-slate-900 mt-2">Step 2: No-Load Warm-Up & Calibration</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Run hydraulic circulating pump idle for 5 minutes to achieve target 40°C operating viscosity.</li>
                    <li>Execute 3 no-load dry cycles before positioning sheet metal blanks.</li>
                    <li>Check Sense & Predict telemetry panel on operator tablet: vibration velocity must be &lt; 2.8 mm/s.</li>
                  </ul>
                </div>
              )}

              {selectedSop === "SOP-02" && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl">
                    <h4 className="font-bold text-amber-950 text-xs mb-1">ISO 10816-3 Mechanical Vibration Severity (Class III & IV)</h4>
                    <p className="text-amber-800 text-[11px]">Standard baseline for motor and spindle bearing health grading</p>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <span className="font-bold text-emerald-800">Zone A (0.0 - 2.8 mm/s)</span>
                      <span className="text-emerald-700">New Commissioned / Excellent</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                      <span className="font-bold text-blue-800">Zone B (2.8 - 4.5 mm/s)</span>
                      <span className="text-blue-700">Normal Continuous Operation</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                      <span className="font-bold text-amber-800">Zone C (4.5 - 7.1 mm/s)</span>
                      <span className="text-amber-700">Warning: Schedule Preventive Service</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
                      <span className="font-bold text-red-800">Zone D (&gt; 7.1 mm/s)</span>
                      <span className="text-red-700">Critical: Risk of Permanent Mechanical Failure</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    *When vibration exceeds 7.1 mm/s (e.g. Unit M13 at 8.9 mm/s), dispatch maintenance work order immediately.
                  </p>
                </div>
              )}

              {selectedSop === "SOP-03" && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                    <h4 className="font-bold text-indigo-950 text-xs mb-1">Mandatory PPE Protocol — PT SMN Facility</h4>
                    <p className="text-indigo-800 text-[11px]">EHS zero accident compliance requirements</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                      <span className="font-bold text-slate-900 block">1. Safety Helmet (EN 397)</span>
                      <span className="text-slate-500 text-[11px]">Mandatory across all shop floor active zones</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                      <span className="font-bold text-slate-900 block">2. Hearing Protection (&gt; 85 dB)</span>
                      <span className="text-slate-500 text-[11px]">Required in stamping & compressor perimeter</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                      <span className="font-bold text-slate-900 block">3. Safety Shoes (200J Toe Cap)</span>
                      <span className="text-slate-500 text-[11px]">Impact & slip-resistant for coolant safety</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                      <span className="font-bold text-slate-900 block">4. Cut-Resistant Gloves (Level 5)</span>
                      <span className="text-slate-500 text-[11px]">Mandatory for sheet metal coil handling</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSop === "SOP-04" && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-2xl">
                    <h4 className="font-bold text-red-950 text-xs mb-1">Lockout / Tagout (LOTO) Zero Energy Protocol</h4>
                    <p className="text-red-800 text-[11px]">Mandatory isolation procedure prior to maintenance</p>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    <li>Notify all active operators in the affected cell before initiating shutdown.</li>
                    <li>Disengage main circuit breaker and secure with personal Lockout Padlock.</li>
                    <li>Attach warning tag: *&quot;DANGER — DO NOT OPERATE — EQUIPMENT UNDER SERVICE&quot;*.</li>
                    <li>De-pressurize hydraulic accumulators and bleed residual pneumatic lines to zero pressure.</li>
                    <li>Attempt test restart on local panel to confirm Zero Energy State verified.</li>
                  </ol>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-[11px] text-slate-400">Standard: ISO 45001 & SMK3 Compliant</span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                Close SOP
              </button>
            </div>
          </>
        )}

        {/* ================= MODAL 4: PREVENTIVE MAINTENANCE & SPARE PARTS ================= */}
        {activeModal === "service_schedule" && (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 text-[#4B6BFB] flex items-center justify-center">
                  <span className="material-icons">calendar_month</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Preventive Maintenance & Spare Parts
                  </h3>
                  <p className="text-xs text-slate-500">
                    Condition-based maintenance planning & critical components inventory
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <span className="material-icons text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  1. Scheduled Interventions This Week
                </h4>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl border border-red-200 bg-red-50/30 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 font-bold text-[10px]">
                          PRIORITY 1
                        </span>
                        <span className="font-bold text-xs text-slate-900">Unit M13 • Secondary Stamping</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Spherical Roller Bearing replacement & spindle re-alignment. Est. downtime: 3.5 hrs.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Scheduled: Tomorrow 08:30 WIB • Lead: Budi Santoso
                      </span>
                    </div>
                    <span className="text-xs font-bold text-red-600 px-3 py-1 bg-red-100/60 rounded-xl">
                      Pending
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-amber-200 bg-amber-50/30 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">
                          PRIORITY 2
                        </span>
                        <span className="font-bold text-xs text-slate-900">Unit M04 • Hydraulic Press Line 1</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Hydraulic fluid flushing & 10-micron filter element replacement.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Scheduled: Day 2 13:00 WIB • Lead: Hendra W.
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-700 px-3 py-1 bg-amber-100/60 rounded-xl">
                      Scheduled
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[10px]">
                          ROUTINE
                        </span>
                        <span className="font-bold text-xs text-slate-900">Circulation Pump M17 • Cooling Water Loop</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Mechanical seal inspection & flow rate differential calibration.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Scheduled: Friday 10:00 WIB • Utilities Team
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-slate-200/60 rounded-xl">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  2. Critical Spare Parts Inventory
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl border border-slate-200 bg-white">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900">SKF 22218 Bearing</span>
                      <span className="text-xs font-bold text-emerald-600">8 Units</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">Spherical Roller Spindle Spec</span>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold">
                      In Stock
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-slate-200 bg-white">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900">RS485 Vibration Sensor</span>
                      <span className="text-xs font-bold text-emerald-600">14 Units</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">Piezoelectric Accelerometer</span>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold">
                      In Stock
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-slate-200 bg-white">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900">ISO VG 46 Hydraulic Oil</span>
                      <span className="text-xs font-bold text-emerald-600">4 Drums</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">800 Liters Ready Stock</span>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold">
                      In Stock
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl border border-amber-200 bg-amber-50/20">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900">Viton Mechanical Seal</span>
                      <span className="text-xs font-bold text-amber-700">2 Units</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">120mm Pump Flange Seal</span>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-semibold">
                      Restock Needed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex items-center justify-end bg-slate-50/30">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                Close Schedule
              </button>
            </div>
          </>
        )}

        {/* ================= MODAL 5: CRYPTO HASH VERIFICATION (AUDITOR) ================= */}
        {activeModal === "crypto_verify" && (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="material-icons">fingerprint</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cryptographic Hash & Provenance Verification
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mathematical integrity audit & immutable supply chain proof
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <span className="material-icons text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Target Batch ID:</span>
                  <span className="font-bold text-slate-900 font-mono">SMN-2026-00124</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Product Item:</span>
                  <span className="font-semibold text-slate-800">Precision High-Tensile Steel Bracket</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Hashing Standard:</span>
                  <span className="font-semibold text-slate-800 font-mono">SHA-256 with Merkle Tree Proof</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                  Merkle Root Hash
                </label>
                <div className="p-3 bg-slate-950 rounded-xl text-emerald-400 font-mono text-[11px] break-all border border-slate-800">
                  7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                  Genesis Block & Digital Signature Timestamp
                </label>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-600 font-mono text-[11px] border border-slate-200">
                  BLOCK #004128 • 2026-03-01T04:12:08Z • PUBLIC_KEY_SMN_CERT_NODE_01
                </div>
              </div>

              {verifying && (
                <div className="py-4 text-center space-y-2 bg-blue-50/50 border border-blue-100 rounded-2xl">
                  <div className="inline-block animate-spin text-[#4B6BFB]">
                    <span className="material-icons">sync</span>
                  </div>
                  <p className="text-xs font-bold text-blue-900">
                    Validating cryptographic proofs across 10 supply chain nodes...
                  </p>
                </div>
              )}

              {verifiedResult && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <span className="material-icons text-base text-emerald-600">verified</span>
                    <span>100% VALID — PROVENANCE INTEGRITY CONFIRMED</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    Every node from scrap ore procurement, green smelting, CNC stamping, to B3 circular waste handling matches the immutable ledger. Zero tampering detected post-production.
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-[11px] text-slate-400">Standard: ISO 14067 & CBAM Compliant</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunVerification}
                  disabled={verifying}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-icons text-sm">security</span>
                  <span>Verify Cryptographic Proof</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
