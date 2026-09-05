"use client";

import { useState, useEffect } from "react";
import { simulator, AlertItem } from "@/lib/mockData";
import Link from "next/link";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  useEffect(() => {
    const update = () => {
      setAlerts([...simulator.getAlerts()]);
    };
    update();
    return simulator.subscribe(update);
  }, []);

  if (!isOpen) return null;

  const categories = ["ALL", "Machine", "Energy", "Water", "Waste", "ESG", "Safety", "Workforce"];

  const filteredAlerts = alerts.filter((a) => {
    if (activeCategory === "ALL") return true;
    return a.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200 font-sans">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <span className="material-icons text-lg">notifications_active</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Notification & Alert Center</h2>
              <p className="text-[11px] text-slate-500">{unreadCount} notifikasi aktif butuh perhatian</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <span className="material-icons text-base">close</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="p-2.5 border-b border-slate-100 flex gap-1.5 overflow-x-auto bg-white shrink-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === c
                  ? "bg-slate-900 text-white font-semibold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Alert List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              <span className="material-icons text-3xl mb-2 text-slate-300">check_circle_outline</span>
              <p>Tidak ada notifikasi dalam kategori ini.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                  alert.severity === "CRITICAL"
                    ? "bg-red-50/70 border-red-200 text-red-950"
                    : alert.severity === "WARNING"
                    ? "bg-amber-50/70 border-amber-200 text-amber-950"
                    : "bg-[#EEF2FF]/70 border-indigo-100 text-slate-800"
                } ${alert.isRead ? "opacity-75" : "shadow-xs"}`}
              >
                {/* Meta Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        alert.severity === "CRITICAL"
                          ? "bg-red-600 text-white"
                          : alert.severity === "WARNING"
                          ? "bg-amber-600 text-white"
                          : "bg-[#4B6BFB] text-white"
                      }`}
                    >
                      {alert.severity === "CRITICAL" ? "Kritis" : alert.severity === "WARNING" ? "Peringatan" : "Info"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{alert.category}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-xs font-bold leading-snug">{alert.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                </div>

                {/* Action Row (View -> Analyze -> Action) */}
                <div className="pt-1 flex items-center justify-between border-t border-slate-200/60">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <span>Lihat</span>
                    <span>→</span>
                    <span>Analisis</span>
                    <span>→</span>
                    <span className="text-slate-700 font-semibold">Aksi</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!alert.isRead && (
                      <button
                        onClick={() => simulator.markAlertReviewed(alert.id)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded cursor-pointer"
                      >
                        Tandai Dibaca
                      </button>
                    )}
                    <Link
                      href={alert.actionRoute}
                      onClick={onClose}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg shadow-2xs transition-all ${
                        alert.severity === "CRITICAL"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {alert.actionLabel}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 text-center bg-slate-50">
          <span className="text-xs text-slate-500 font-medium">
            SMN Synergy Alert Engine • Terhubung Real-Time
          </span>
        </div>

      </div>
    </div>
  );
}
