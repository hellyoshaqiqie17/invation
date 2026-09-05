"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  simulator,
  SkillGapRole,
  HumanReadinessGateItem,
} from "@/lib/mockData";

function WorkforceContent() {
  const searchParams = useSearchParams();
  const [skillRoles, setSkillRoles] = useState<SkillGapRole[]>([]);
  const [readinessGates, setReadinessGates] = useState<HumanReadinessGateItem[]>([]);
  const [enrollNotice, setEnrollNotice] = useState<string | null>(null);

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const update = () => {
      setSkillRoles([...simulator.getSkillGapRoles()]);
      setReadinessGates([...simulator.getHumanReadinessGates()]);
    };
    update();
    return simulator.subscribe(update);
  }, []);

  const handleEnrollTraining = (gateId: string) => {
    simulator.enrollWorkerTraining(gateId);
    setEnrollNotice(
      "Akselerasi pelatihan kilat berhasil diaktifkan. 4 pekerja telah menyelesaikan modul uji getaran. Status gate berubah menjadi READY FOR GO-LIVE."
    );
    setTimeout(() => setEnrollNotice(null), 5000);
  };

  return (
    <div className="space-y-8 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-800">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              Human-Centered Transformation & Just Transition
            </span>
            <span className="text-xs text-slate-400">• People & Workforce Growth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Grow with SMN
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Human-Centered Industry 5.0 Transformation — Workforce reskilling without layoffs (Zero Layoff Commitment).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-medium border border-indigo-200">
            Zero Layoff Commitment
          </span>
        </div>
      </div>

      {/* Enroll Action Toast */}
      {enrollNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 shadow-xs animate-in fade-in">
          <span className="material-icons text-emerald-600 text-lg">verified</span>
          <span className="font-semibold leading-relaxed">{enrollNotice}</span>
        </div>
      )}

      {/* WORKFORCE READINESS KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Total Workforce Enrolled</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            120 <span className="text-xs text-slate-400">Workers</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            0% Layoff Risk (Just Transition)
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Digital Skill Readiness</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">
            95%
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">114 / 120 Certified</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">EHS Safety Record</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
            98.8%
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">412 Days Zero Incident</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Reskilling Budget Allocation</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            Rp 1.6 M <span className="text-xs text-slate-400">(20% CAPEX)</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Target &ge; 15% Achieved
          </span>
        </div>

      </div>

      {/* SECTION 1: HUMAN READINESS GATE */}
      <div id="gatekeeper" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Human Readiness Gatekeeper
              </span>
            </div>
            <p className="text-xs text-slate-500">
              SMN Core Principle: Technology deployment is incomplete without workforce qualification. System go-live strictly requires verified human readiness.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {readinessGates.map((gate) => {
            const isReady = gate.overallStatus === "READY FOR GO-LIVE";

            return (
              <div
                key={gate.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  isReady
                    ? "bg-emerald-50/50 border-emerald-200"
                    : "bg-amber-50/50 border-amber-200"
                }`}
              >
                {/* Gate Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{gate.technologyName}</span>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${
                          isReady ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-900 border border-amber-200"
                        }`}
                      >
                        {isReady ? "Siap Go-Live" : "Menunggu Sertifikasi Operator"}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Target Area: <strong>{gate.deploymentTarget}</strong>
                    </span>
                  </div>

                  {/* 3 Pillars Check */}
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-emerald-700">
                      ✓ Teknis: {gate.technicalReadiness}
                    </span>
                    <span
                      className={`border px-2.5 py-1 rounded-lg ${
                        gate.workforceReadiness === "READY"
                          ? "bg-white border-slate-200 text-emerald-700"
                          : "bg-amber-100 border-amber-300 text-amber-900"
                      }`}
                    >
                      {gate.workforceReadiness === "READY" ? "✓" : "⏳"} SDM: {gate.workforceReadiness === "READY" ? "Siap" : "Pelatihan"}
                    </span>
                    <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-emerald-700">
                      ✓ K3: {gate.safetyReadiness}
                    </span>
                  </div>
                </div>

                {/* Blocker Reason & Recommended Action */}
                <div className="text-xs text-slate-700 bg-white/80 p-3.5 rounded-xl border border-slate-200/80 space-y-1 leading-relaxed">
                  <div className="text-slate-500">
                    <strong className="text-slate-800">Status Kesiapan:</strong> {gate.blockerReason}
                  </div>
                  <div className="text-slate-800 font-medium">
                    <strong>Rekomendasi Manajerial:</strong> {gate.recommendedAction}
                  </div>
                </div>

                {/* Action Row */}
                {!isReady && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => handleEnrollTraining(gate.id)}
                      className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <span className="material-icons text-sm">school</span>
                      <span>Fast-Track Training ({gate.affectedWorkers} Workers)</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: SKILL GAP & ROLE TRANSITION MATRIX */}
      <div id="skillgap" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Skill Gap Matrix & Career Transition Pathways
            </h3>
            <p className="text-xs text-slate-500">
              Upskilling pathways transitioning conventional machine operators into Industry 5.0 digital custodians.
            </p>
          </div>
          <span className="text-xs font-medium bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-lg border border-indigo-200">
            5 Career Pathways (Zero Layoff)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillRoles.map((role) => (
            <div key={role.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              {/* Transition Path Header */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 font-bold">{role.id}</span>
                <span className="font-bold text-indigo-600">
                  <span className="font-mono">{role.certifiedCount} / {role.targetCount}</span> Lulus ({role.progressPercent}%)
                </span>
              </div>

              {/* Roles Badge Arrow */}
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-medium text-slate-600 truncate">
                  {role.currentRole}
                </span>
                <span className="material-icons text-slate-400 text-sm">arrow_forward</span>
                <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-lg font-bold truncate">
                  {role.targetRole}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${role.progressPercent}%` }}
                ></div>
              </div>

              {/* Modules List */}
              <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-slate-700 block text-xs mb-1">Modul Kompetensi Terkait:</span>
                {role.modules.map((mod, mi) => (
                  <div key={mi} className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function WorkforcePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500 font-sans">
          Memuat modul Grow with SMN...
        </div>
      }
    >
      <WorkforceContent />
    </Suspense>
  );
}

