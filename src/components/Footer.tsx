"use client";

import Link from "next/link";
import { Leaf, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1350px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow">
            <Leaf className="h-4 w-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block">PT SMN SmartGreen Transformation</span>
            <span className="text-xs text-slate-400">Platform Terintegrasi Manufaktur Cerdas & Hijau</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-slate-400">
          <Link href="/admin/dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium">
            <span>Buka SMN Control Tower</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <span>•</span>
          <span>CAPEX Ceiling: <strong className="font-mono text-slate-200">Rp 8.0 M</strong></span>
          <span>•</span>
          <span>Porsi Sosial: <strong className="font-mono text-slate-200">Rp 1.6 M (20%)</strong></span>
        </div>

        {/* Right copyright */}
        <div className="text-xs text-slate-500">
          © 2026 PT Sinergi Manufaktur Nusantara
        </div>
      </div>
    </footer>
  );
}
