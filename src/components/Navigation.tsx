"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="flex items-center justify-between pb-6 border-b border-slate-200">
      <Link href="/" className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-50 border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm text-[#4B6BFB]">
          <span className="material-icons text-xl">precision_manufacturing</span>
        </div>
        <span className="font-sans text-base font-bold tracking-tight text-slate-800 uppercase">
          PT SMN - SmartGreen
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
        <a href="#overview" className="text-[#4B6BFB] font-semibold hover:text-blue-700 transition-colors">
          Overview
        </a>
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

      <Link
        href="/admin/dashboard"
        className="px-5 py-2.5 rounded-xl bg-[#4B6BFB] hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
      >
        Login Control Tower
      </Link>
    </nav>
  );
}
