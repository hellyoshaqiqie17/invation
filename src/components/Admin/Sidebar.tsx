"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { simulator, RoleType } from "@/lib/mockData";
import RoleActionModals, { ModalType } from "./RoleActionModals";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  href?: string;
  actionModal?: ModalType;
  badge?: {
    text: string;
    variant: "danger" | "warning" | "info" | "success" | "neutral";
  };
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<RoleType>("MANAGEMENT");
  const [viewMode, setViewMode] = useState<"ROLE_FOCUSED" | "ALL_MODULES">("ROLE_FOCUSED");
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Dynamic Telemetry Badges
  const [criticalCount, setCriticalCount] = useState(0);
  const [workOrdersCount, setWorkOrdersCount] = useState(0);
  const [waterAlertCount, setWaterAlertCount] = useState(0);
  const [wastePendingCount, setWastePendingCount] = useState(0);
  const [gatePendingCount, setGatePendingCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setCurrentRole(simulator.getCurrentRole());

      const machines = simulator.getMachines();
      setCriticalCount(machines.filter((m) => m.status !== "normal").length);

      const tasks = simulator.getMaintenanceTasks();
      setWorkOrdersCount(tasks.filter((t) => t.status === "PENDING").length);

      const water = simulator.getWaterLoop();
      setWaterAlertCount(water.activeAlerts.length);

      const waste = simulator.getWasteBatches();
      setWastePendingCount(waste.filter((w) => !w.esgVerified).length);

      const gates = simulator.getHumanReadinessGates();
      setGatePendingCount(gates.filter((g) => g.workforceReadiness !== "READY").length);
    };

    update();
    return simulator.subscribe(update);
  }, []);

  const handleRoleChange = (newRole: RoleType) => {
    simulator.setCurrentRole(newRole);
    setCurrentRole(newRole);
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    const cleanPath = path.split("?")[0].split("#")[0];
    return pathname === cleanPath;
  };

  const roles: { role: RoleType; label: string; desc: string; icon: string }[] = [
    { role: "OPERATOR", label: "Plant Operator", desc: "Shift 1 • Shop Floor Operations", icon: "precision_manufacturing" },
    { role: "MAINTENANCE", label: "Maintenance Specialist", desc: "Predictive Maintenance & Health", icon: "settings_input_component" },
    { role: "ESG TEAM", label: "ESG & Sustainability Lead", desc: "Circular Loops & Decarbonization", icon: "eco" },
    { role: "MANAGEMENT", label: "Executive & Management", desc: "Strategic Control Tower & ROI", icon: "grid_view" },
    { role: "HR / WORKFORCE", label: "People Operations & EHS", desc: "Workforce Transition & Safety", icon: "groups" },
    { role: "AUDITOR", label: "Compliance & Lead Auditor", desc: "Product Integrity & ISO Audit", icon: "verified_user" },
  ];

  const currentRoleMeta = roles.find((r) => r.role === currentRole) || roles[0];

  // Role Specific Nav Configurations
  const getRoleNavGroups = (): NavGroup[] => {
    switch (currentRole) {
      case "OPERATOR":
        return [
          {
            groupLabel: "Shop Floor Operations",
            items: [
              {
                id: "opr-fleet",
                title: "Live Fleet Monitor",
                subtitle: "Real-time 20 pilot machines",
                icon: "precision_manufacturing",
                href: "/admin/machines",
              },
              {
                id: "opr-line1",
                title: "Line 1 — Heavy Stamping",
                subtitle: "10 hydraulic presses active",
                icon: "view_column",
                href: "/admin/machines?line=Line+1",
                badge: { text: "Optimal", variant: "success" },
              },
              {
                id: "opr-line2",
                title: "Line 2 — Precision Finishing",
                subtitle: "10 CNC & assembly units",
                icon: "layers",
                href: "/admin/machines?line=Line+2",
                badge: { text: "4 Anomalies", variant: "danger" },
              },
              {
                id: "opr-critical",
                title: "Critical Parameters (M13)",
                subtitle: "Vibrasi 8.9 mm/s & thermal alert",
                icon: "warning_amber",
                href: "/admin/machines?filter=AT_RISK",
                badge: { text: "Critical", variant: "danger" },
              },
            ],
          },
          {
            groupLabel: "Quick Actions & Andon",
            items: [
              {
                id: "opr-checklist",
                title: "Shift Handover & Checklist",
                subtitle: "Inspeksi 5S & verifikasi pelumas",
                icon: "fact_check",
                actionModal: "shift_checklist",
                badge: { text: "Shift 1", variant: "info" },
              },
              {
                id: "opr-andon",
                title: "Trigger Andon Alert",
                subtitle: "Eskalasi kendala ke teknisi/lead",
                icon: "campaign",
                actionModal: "andon_calling",
                badge: { text: "Standby", variant: "warning" },
              },
              {
                id: "opr-sop",
                title: "Digital SOP & Safety",
                subtitle: "Standard operating procedures",
                icon: "menu_book",
                actionModal: "digital_sop",
              },
            ],
          },
          {
            groupLabel: "Readiness & Quality Tracking",
            items: [
              {
                id: "opr-batch",
                title: "Active Production Batch",
                subtitle: "Validasi lot & lot tracking",
                icon: "qr_code_2",
                href: "/admin/green-batch",
              },
              {
                id: "opr-training",
                title: "My Upskilling Progress",
                subtitle: "Modul sertifikasi getaran",
                icon: "school",
                href: "/admin/workforce",
                badge: { text: "In Progress", variant: "info" },
              },
            ],
          },
        ];

      case "MAINTENANCE":
        return [
          {
            groupLabel: "Predictive Maintenance (PdM)",
            items: [
              {
                id: "mnt-hub",
                title: "Sense & Predict Hub",
                subtitle: "Diagnostik telemetri 20 mesin",
                icon: "settings_input_component",
                href: "/admin/machines",
              },
              {
                id: "mnt-critical",
                title: "Critical Machine Watch",
                subtitle: "M13, M04, M07, M11",
                icon: "notification_important",
                href: "/admin/machines?filter=AT_RISK",
                badge: { text: `${criticalCount} Units`, variant: "danger" },
              },
              {
                id: "mnt-vibration",
                title: "Vibration Matrix (ISO 10816)",
                subtitle: "Klasifikasi Zone C & D alerts",
                icon: "waves",
                href: "/admin/machines#vibration",
              },
            ],
          },
          {
            groupLabel: "Work Orders & Spare Parts",
            items: [
              {
                id: "mnt-tasks",
                title: "Active Work Orders",
                subtitle: "Tiket perbaikan prediktif otomatis",
                icon: "assignment",
                href: "/admin/machines#tasks",
                badge: { text: `${workOrdersCount} Active`, variant: "info" },
              },
              {
                id: "mnt-schedule",
                title: "Preventive Maintenance & Parts",
                subtitle: "Stok bearing SKF & akselerometer",
                icon: "calendar_month",
                actionModal: "service_schedule",
              },
              {
                id: "mnt-sop",
                title: "LOTO & Safety Guidelines",
                subtitle: "Prosedur isolasi daya aman",
                icon: "menu_book",
                actionModal: "digital_sop",
              },
            ],
          },
          {
            groupLabel: "IoT Infrastructure & Systems",
            items: [
              {
                id: "mnt-backbone",
                title: "IoT Gateway & Modbus Status",
                subtitle: "20/20 node online & streaming",
                icon: "hub",
                href: "/admin/backbone",
                badge: { text: "Online", variant: "success" },
              },
              {
                id: "mnt-gate",
                title: "Human Readiness Gate",
                subtitle: "Kesiapan teknisi Lini 2",
                icon: "engineering",
                href: "/admin/workforce",
                badge: { text: `${gatePendingCount} Blocked`, variant: "warning" },
              },
              {
                id: "mnt-dash",
                title: "SMN Control Tower",
                subtitle: "Operational executive summary",
                icon: "grid_view",
                href: "/admin/dashboard",
              },
            ],
          },
        ];

      case "ESG TEAM":
        return [
          {
            groupLabel: "Circular Resource Loops",
            items: [
              {
                id: "esg-hub",
                title: "Close The Loop Hub",
                subtitle: "Neraca sirkular air, limbah & daya",
                icon: "sync",
                href: "/admin/esg",
              },
              {
                id: "esg-water",
                title: "Water Loop (64% Recycled)",
                subtitle: "Recovery 288 m³/hari (Rp150M/bln)",
                icon: "water_drop",
                href: "/admin/esg?tab=WATER",
                badge: { text: "64%", variant: "info" },
              },
              {
                id: "esg-water-leak",
                title: "Flow Anomaly Detection",
                subtitle: "Penyimpangan debit Pompa M17",
                icon: "faucet",
                href: "/admin/esg?tab=WATER",
                badge: { text: `${waterAlertCount} Alert`, variant: "warning" },
              },
            ],
          },
          {
            groupLabel: "Hazardous Waste (B3) Management",
            items: [
              {
                id: "esg-waste",
                title: "Hazardous Waste Manifest",
                subtitle: "Tracking Festronik & Simbara",
                icon: "delete_sweep",
                href: "/admin/esg?tab=WASTE",
                badge: { text: `${wastePendingCount} Pending`, variant: "warning" },
              },
              {
                id: "esg-vendor",
                title: "Authorized Transporter Audit",
                subtitle: "Verifikasi izin KLHK & PPLI",
                icon: "verified",
                href: "/admin/esg?tab=WASTE",
              },
            ],
          },
          {
            groupLabel: "Energy & Decarbonization",
            items: [
              {
                id: "esg-energy",
                title: "Idle Power Loss Monitoring",
                subtitle: "Beban 1,240 kW • 156 kW idle",
                icon: "bolt",
                href: "/admin/esg?tab=ENERGY",
                badge: { text: "156 kW", variant: "warning" },
              },
              {
                id: "esg-scorecard",
                title: "ESG Scorecard (Scope 1 & 2)",
                subtitle: "Target reduksi emisi 18% on-track",
                icon: "eco",
                href: "/admin/esg?tab=ESG",
                badge: { text: "Grade A", variant: "success" },
              },
              {
                id: "esg-passport",
                title: "Green Batch Passport",
                subtitle: "Product carbon footprint tracking",
                icon: "verified_user",
                href: "/admin/green-batch",
              },
            ],
          },
        ];

      case "MANAGEMENT":
        return [
          {
            groupLabel: "Executive Control Tower",
            items: [
              {
                id: "mgmt-tower",
                title: "SMN Control Tower",
                subtitle: "OEE terpadu & performa pabrik",
                icon: "grid_view",
                href: "/admin/dashboard",
              },
              {
                id: "mgmt-actions",
                title: "Priority Action Board",
                subtitle: "3 keputusan strategis lintas lini",
                icon: "warning",
                href: "/admin/dashboard",
                badge: { text: "3 Items", variant: "danger" },
              },
              {
                id: "mgmt-fleet",
                title: "Fleet Performance & OEE",
                subtitle: "Uptime 94.2% • Lini 1 & 2",
                icon: "precision_manufacturing",
                href: "/admin/machines",
              },
            ],
          },
          {
            groupLabel: "Financial Feasibility & ROI",
            items: [
              {
                id: "mgmt-roi",
                title: "Transformation Value & ROI",
                subtitle: "CapEx Rp 7.42B • Payback 2.14 Thn",
                icon: "trending_up",
                href: "/admin/financials",
                badge: { text: "IRR 31.8%", variant: "success" },
              },
              {
                id: "mgmt-calc",
                title: "Investment Scenario Model",
                subtitle: "Simulasi sensitivitas CapEx",
                icon: "calculate",
                href: "/admin/financials",
              },
              {
                id: "mgmt-opex",
                title: "Baseline OPEX Structure",
                subtitle: "Analisis target efisiensi Rp 4.0B",
                icon: "account_balance_wallet",
                href: "/admin/financials",
              },
            ],
          },
          {
            groupLabel: "ESG Strategy & Human Capital",
            items: [
              {
                id: "mgmt-esg",
                title: "ESG Strategy & Net-Zero 2030",
                subtitle: "Roadmap keberlanjutan pabrik",
                icon: "eco",
                href: "/admin/esg?tab=ESG",
              },
              {
                id: "mgmt-people",
                title: "Grow with SMN (People First)",
                subtitle: "Zero Layoff & reskilling 120 orang",
                icon: "groups",
                href: "/admin/workforce",
              },
              {
                id: "mgmt-backbone",
                title: "Digital Backbone Architecture",
                subtitle: "Kesiapan integrasi IT/OT & MQTT",
                icon: "hub",
                href: "/admin/backbone",
              },
            ],
          },
        ];

      case "HR / WORKFORCE":
        return [
          {
            groupLabel: "Human-Centered Transformation",
            items: [
              {
                id: "hr-hub",
                title: "Grow with SMN Hub",
                subtitle: "Reskilling adil tanpa PHK",
                icon: "groups",
                href: "/admin/workforce",
              },
              {
                id: "hr-gatekeeper",
                title: "Human Readiness Gatekeeper",
                subtitle: "Prasyarat go-live teknologi baru",
                icon: "shield",
                href: "/admin/workforce?section=gatekeeper",
                badge: { text: `${gatePendingCount} Blocked`, variant: "danger" },
              },
              {
                id: "hr-training",
                title: "Upskilling Fast-Track",
                subtitle: "Pelatihan getaran 4 teknisi",
                icon: "auto_stories",
                href: "/admin/workforce?section=training",
                badge: { text: "Fast-Track", variant: "info" },
              },
            ],
          },
          {
            groupLabel: "Skill Gap & Career Matrix",
            items: [
              {
                id: "hr-skillgap",
                title: "Skill Gap Matrix",
                subtitle: "Pemetaan kompetensi 120 karyawan",
                icon: "analytics",
                href: "/admin/workforce?section=skillgap",
              },
              {
                id: "hr-transition",
                title: "Career Transition Pathways",
                subtitle: "5 jalur karir baru tanpa PHK",
                icon: "alt_route",
                href: "/admin/workforce",
              },
              {
                id: "hr-sop",
                title: "EHS & Safety Guidelines",
                subtitle: "Standar keselamatan kerja APD",
                icon: "health_and_safety",
                actionModal: "digital_sop",
              },
            ],
          },
          {
            groupLabel: "Workforce Safety & Wellness",
            items: [
              {
                id: "hr-safety",
                title: "Zero Incident Safety Tracker",
                subtitle: "1,420 jam tanpa kecelakaan",
                icon: "verified",
                href: "/admin/workforce",
                badge: { text: "Zero Incident", variant: "success" },
              },
              {
                id: "hr-tower",
                title: "SMN Control Tower",
                subtitle: "Monitoring shift & beban kerja",
                icon: "grid_view",
                href: "/admin/dashboard",
              },
            ],
          },
        ];

      case "AUDITOR":
        return [
          {
            groupLabel: "Traceability & Integrity",
            items: [
              {
                id: "aud-passport",
                title: "Green Batch Passport Hub",
                subtitle: "Digital Product Passport",
                icon: "verified_user",
                href: "/admin/green-batch",
              },
              {
                id: "aud-chain",
                title: "10-Node Provenance Chain",
                subtitle: "End-to-end supply chain audit",
                icon: "account_tree",
                href: "/admin/green-batch",
                badge: { text: "10 Nodes", variant: "success" },
              },
              {
                id: "aud-crypto",
                title: "Cryptographic Hash Verification",
                subtitle: "SHA-256 tamper-proof ledger",
                icon: "fingerprint",
                actionModal: "crypto_verify",
                badge: { text: "Verified", variant: "success" },
              },
            ],
          },
          {
            groupLabel: "Compliance & Regulations",
            items: [
              {
                id: "aud-waste",
                title: "Hazardous Waste Manifest Audit",
                subtitle: "Verifikasi transporter Festronik",
                icon: "receipt_long",
                href: "/admin/esg?tab=WASTE",
                badge: { text: `${wastePendingCount} Manifest`, variant: "warning" },
              },
              {
                id: "aud-water",
                title: "Water & Energy Balance Audit",
                subtitle: "Validasi meteran & neraca massa",
                icon: "balance",
                href: "/admin/esg?tab=WATER",
              },
              {
                id: "aud-certs",
                title: "Export Certification Packs",
                subtitle: "ISO 14001, 50001, CBAM, EU DR",
                icon: "file_download",
                href: "/admin/green-batch",
              },
            ],
          },
          {
            groupLabel: "System & Audit Trail",
            items: [
              {
                id: "aud-backbone",
                title: "Digital Backbone Audit Logs",
                subtitle: "Jejak otorisasi akses & enkripsi",
                icon: "history_edu",
                href: "/admin/backbone",
              },
              {
                id: "aud-tower",
                title: "SMN Control Tower",
                subtitle: "Operational compliance check",
                icon: "grid_view",
                href: "/admin/dashboard",
              },
            ],
          },
        ];

      default:
        return [];
    }
  };

  // Master Catalog: All Modules
  const allModulesGroups: NavGroup[] = [
    {
      groupLabel: "Operations Hub",
      items: [
        { id: "all-dash", title: "SMN Control Tower", subtitle: "Integrated command center", icon: "grid_view", href: "/admin/dashboard" },
        { id: "all-machines", title: "Sense & Predict", subtitle: "20 pilot machines telemetry", icon: "settings_input_component", href: "/admin/machines", badge: criticalCount > 0 ? { text: `${criticalCount}`, variant: "danger" } : undefined },
        { id: "all-esg", title: "Close the Loop & ESG", subtitle: "Water, waste & energy circularity", icon: "sync", href: "/admin/esg" },
      ],
    },
    {
      groupLabel: "Integrity & Human Capital",
      items: [
        { id: "all-passport", title: "Green Batch Passport", subtitle: "Digital Product Passport", icon: "verified_user", href: "/admin/green-batch" },
        { id: "all-workforce", title: "Grow with SMN", subtitle: "Human readiness & reskilling", icon: "groups", href: "/admin/workforce", badge: gatePendingCount > 0 ? { text: `${gatePendingCount}`, variant: "warning" } : undefined },
        { id: "all-fin", title: "Transformation Value", subtitle: "Financial feasibility & ROI", icon: "trending_up", href: "/admin/financials" },
      ],
    },
    {
      groupLabel: "Architecture & Quick Tools",
      items: [
        { id: "all-backbone", title: "Digital Backbone", subtitle: "Unified IT/OT & MQTT architecture", icon: "hub", href: "/admin/backbone" },
        { id: "all-checklist", title: "Shift Handover & Checklist", subtitle: "Floor operational inspection", icon: "fact_check", actionModal: "shift_checklist" },
        { id: "all-andon", title: "Trigger Andon Alert", subtitle: "Emergency dispatch & escalation", icon: "campaign", actionModal: "andon_calling" },
        { id: "all-sop", title: "Digital SOP & Safety", subtitle: "Workplace & EHS standards", icon: "menu_book", actionModal: "digital_sop" },
      ],
    },
  ];

  const displayedGroups = viewMode === "ROLE_FOCUSED" ? getRoleNavGroups() : allModulesGroups;

  return (
    <>
      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        
        {/* Top Header: Logo */}
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-logo">
            <div className="logo-icon">
              <span className="material-icons">precision_manufacturing</span>
            </div>
            <div className="logo-text">
              <span className="logo-name">SMN SYNERGY</span>
              <span className="logo-sub">Smart & Green Factory</span>
            </div>
          </Link>
        </div>

        {/* Role Workspace Selector Card */}
        <div className="role-perspective-card">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#4B6BFB] animate-pulse"></span>
              <span className="text-[10.5px] font-bold tracking-wider uppercase text-slate-500">
                Role Workspace
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-wide text-[#4B6BFB] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
              Active View
            </span>
          </div>

          <div className="flex items-center gap-2.5 mt-1 bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-[#EEF2FF] text-[#4B6BFB] flex items-center justify-center shrink-0">
              <span className="material-icons text-lg">{currentRoleMeta.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value as RoleType)}
                className="w-full bg-transparent font-bold text-xs text-slate-800 focus:outline-none cursor-pointer truncate"
                title="Switch User Role"
              >
                {roles.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.role}
                  </option>
                ))}
              </select>
              <span className="text-[10.5px] text-slate-500 block truncate">
                {currentRoleMeta.desc}
              </span>
            </div>
          </div>

          {/* Mode Switcher Toggle: Role Focus vs All Modules */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mt-2.5">
            <button
              type="button"
              onClick={() => setViewMode("ROLE_FOCUSED")}
              className={`py-1 text-[11px] font-bold rounded-lg transition-all text-center ${
                viewMode === "ROLE_FOCUSED"
                  ? "bg-white text-[#4B6BFB] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Role Focus
            </button>
            <button
              type="button"
              onClick={() => setViewMode("ALL_MODULES")}
              className={`py-1 text-[11px] font-bold rounded-lg transition-all text-center ${
                viewMode === "ALL_MODULES"
                  ? "bg-white text-[#4B6BFB] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All Modules
            </button>
          </div>
        </div>

        {/* Navigation Group Items */}
        <nav className="admin-nav-section font-sans">
          {displayedGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="nav-group-block">
              <div className="nav-group-label">{group.groupLabel}</div>
              
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.href ? isActive(item.href) : false;

                  if (item.actionModal) {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveModal(item.actionModal!)}
                        className="admin-nav-item action-btn"
                        title={item.subtitle || item.title}
                      >
                        <span className="material-icons">{item.icon}</span>
                        <div className="nav-item-text">
                          <span className="nav-item-title">{item.title}</span>
                          {item.subtitle && (
                            <span className="nav-item-sub">{item.subtitle}</span>
                          )}
                        </div>
                        {item.badge && (
                          <span className={`nav-badge ${item.badge.variant}`}>
                            {item.badge.text}
                          </span>
                        )}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href || "#"}
                      className={`admin-nav-item ${active ? "active" : ""}`}
                      title={item.subtitle || item.title}
                    >
                      <span className="material-icons">{item.icon}</span>
                      <div className="nav-item-text">
                        <span className="nav-item-title">{item.title}</span>
                        {item.subtitle && (
                          <span className="nav-item-sub">{item.subtitle}</span>
                        )}
                      </div>
                      {item.badge && (
                        <span className={`nav-badge ${item.badge.variant}`}>
                          {item.badge.text}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <Link href="/" className="back-to-site">
            <span className="material-icons text-base">home</span>
            <span>Exit to Main Portal</span>
          </Link>
        </div>

        <style jsx global>{`
          .admin-sidebar {
            width: 260px;
            height: 100vh;
            background: #ffffff;
            border-right: 1px solid var(--color-border);
            display: flex;
            flex-direction: column;
            position: fixed;
            left: 0;
            top: 0;
            overflow: hidden;
            z-index: 100;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .admin-sidebar.collapsed {
            transform: translateX(-100%);
          }

          .admin-sidebar-header {
            padding: 16px 18px 12px;
            border-bottom: 1px solid var(--color-border);
            background: #ffffff;
            shrink: 0;
          }

          .admin-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
          }

          .logo-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: var(--color-accent);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(75, 107, 251, 0.2);
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
            font-size: 14.5px;
            font-weight: 700;
            color: var(--color-foreground);
            letter-spacing: -0.2px;
            line-height: 1.2;
          }

          .logo-sub {
            font-size: 11px;
            color: var(--color-muted);
            font-weight: 500;
          }

          .role-perspective-card {
            padding: 12px 14px;
            margin: 10px 12px 4px;
            background: #f8fafc;
            border: 1px solid var(--color-border);
            border-radius: 16px;
            shrink: 0;
          }

          .admin-nav-section {
            flex: 1;
            padding: 4px 10px 16px;
            overflow-y: auto;
            overflow-x: hidden;
          }

          .admin-nav-section::-webkit-scrollbar {
            width: 4px;
          }
          .admin-nav-section::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .nav-group-block {
            margin-bottom: 10px;
          }

          .nav-group-label {
            font-size: 10.5px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            padding: 12px 10px 4px;
          }

          .admin-nav-item {
            display: flex !important;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 12px;
            color: #475569;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.15s ease;
            margin-bottom: 2px;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            text-align: left;
            border: 1px solid transparent;
            background: transparent;
            cursor: pointer;
          }

          .admin-nav-item:hover {
            background: #f8fafc;
            color: var(--color-foreground);
            border-color: #f1f5f9;
          }

          .admin-nav-item.active {
            background: var(--color-accent-light);
            color: var(--color-accent);
            font-weight: 600;
            border-color: #c7d2fe;
          }

          .admin-nav-item.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 20px;
            background: var(--color-accent);
            border-radius: 0 4px 4px 0;
          }

          .admin-nav-item .material-icons {
            font-size: 19px;
            color: #94a3b8;
            transition: color 0.15s;
            shrink: 0;
          }

          .admin-nav-item:hover .material-icons {
            color: #64748b;
          }

          .admin-nav-item.active .material-icons {
            color: var(--color-accent);
          }

          .nav-item-text {
            display: flex;
            flex-direction: column;
            min-width: 0;
            flex: 1;
          }

          .nav-item-title {
            font-size: 12.5px;
            line-height: 1.25;
            font-weight: 600;
            color: inherit;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .nav-item-sub {
            font-size: 10.5px;
            color: #94a3b8;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 1px;
          }

          .nav-badge {
            margin-left: auto;
            min-width: 18px;
            height: 18px;
            padding: 0 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 99px;
            font-size: 10px;
            font-weight: 700;
            shrink: 0;
          }

          .nav-badge.danger {
            background: #fee2e2;
            color: #dc2626;
          }

          .nav-badge.warning {
            background: #fef3c7;
            color: #d97706;
          }

          .nav-badge.info {
            background: #e0e7ff;
            color: #4338ca;
          }

          .nav-badge.success {
            background: #dcfce7;
            color: #15803d;
          }

          .nav-badge.neutral {
            background: #f1f5f9;
            color: #475569;
          }

          .admin-sidebar-footer {
            padding: 12px 14px;
            border-top: 1px solid var(--color-border);
            background: #ffffff;
            shrink: 0;
          }

          .back-to-site {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 10px;
            color: #64748b;
            font-size: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.15s;
            justify-content: center;
            border: 1px solid var(--color-border);
            background: #f8fafc;
          }

          .back-to-site:hover {
            background: #e2e8f0;
            color: var(--color-foreground);
          }
        `}</style>
      </aside>

      {/* Action Modals triggered directly from Sidebar menu */}
      <RoleActionModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
