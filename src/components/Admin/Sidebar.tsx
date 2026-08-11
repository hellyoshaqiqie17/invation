"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { simulator } from "@/lib/mockData";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo Header */}
      <div className="admin-sidebar-header">
        <div className="admin-logo">
          <div className="logo-icon">
            <span className="material-icons">precision_manufacturing</span>
          </div>
          <div className="logo-text">
            <span className="logo-name">PT SMN</span>
            <span className="logo-sub">ESG Control Tower</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-nav-section">
        <div className="nav-group-label">Menu Utama</div>
        <Link href="/admin/dashboard" className={`admin-nav-item ${isActive("/admin/dashboard")}`}>
          <span className="material-icons">grid_view</span>
          Dasbor
        </Link>
        <Link href="/admin/machines" className={`admin-nav-item ${isActive("/admin/machines")}`}>
          <span className="material-icons">settings_input_component</span>
          Fleet Mesin 20 Unit
        </Link>
        <Link href="/admin/esg" className={`admin-nav-item ${isActive("/admin/esg")}`}>
          <span className="material-icons">water_drop</span>
          ESG & Traceability
          <span className="nav-badge danger">3</span>
        </Link>

        <div className="nav-group-label">Manajemen</div>
        <Link href="/admin/financials" className={`admin-nav-item ${isActive("/admin/financials")}`}>
          <span className="material-icons">monetization_on</span>
          Laporan Finansial
        </Link>
        <Link href="/admin/workforce" className={`admin-nav-item ${isActive("/admin/workforce")}`}>
          <span className="material-icons">school</span>
          Just Transition SDM
        </Link>

        <div className="nav-group-label">Analitik & AI</div>
        <Link href="/admin/ai-assistant" className={`admin-nav-item ${isActive("/admin/ai-assistant")}`}>
          <span className="material-icons">smart_toy</span>
          Asisten AI Copilot
        </Link>
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <Link href="/" className="back-to-site">
          <span className="material-icons">arrow_back</span>
          Kembali ke Beranda
        </Link>
      </div>

      <style jsx global>{`
        .admin-sidebar {
          width: 260px;
          height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-sidebar.collapsed {
          transform: translateX(-100%);
        }

        .admin-sidebar-header {
          padding: 20px 20px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .admin-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #4B6BFB;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon .material-icons {
          color: white;
          font-size: 20px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.2px;
          line-height: 1.2;
        }

        .logo-sub {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }

        .admin-nav-section {
          flex: 1;
          padding: 8px 12px;
          overflow-y: auto;
        }

        .nav-group-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 16px 12px 6px;
        }

        .nav-group-label:first-child {
          padding-top: 8px;
        }

        .admin-nav-item {
          display: flex !important;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          color: #475569;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.15s ease;
          margin-bottom: 2px;
          width: 100%;
          box-sizing: border-box;
          position: relative;
        }

        .admin-nav-item:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .admin-nav-item.active {
          background: #eef2ff;
          color: #4b6bfb;
          font-weight: 600;
        }

        .admin-nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: #4b6bfb;
          border-radius: 0 4px 4px 0;
        }

        .admin-nav-item .material-icons {
          font-size: 20px;
          color: #94a3b8;
          transition: color 0.15s;
        }

        .admin-nav-item.active .material-icons {
          color: #4b6bfb;
        }

        .nav-badge {
          margin-left: auto;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
        }

        .nav-badge.danger {
          background: #fee2e2;
          color: #dc2626;
        }

        .admin-sidebar-footer {
          padding: 16px;
          border-top: 1px solid #e2e8f0;
        }

        .back-to-site {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 10px;
          color: #64748b;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.15s;
          justify-content: center;
        }

        .back-to-site:hover {
          background: #f8fafc;
          color: #0f172a;
        }
      `}</style>
    </aside>
  );
}
