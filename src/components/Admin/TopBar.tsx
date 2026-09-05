"use client";

import { useState, useEffect } from "react";
import { simulator, RoleType } from "@/lib/mockData";
import AICopilotDrawer from "./AICopilotDrawer";
import NotificationDrawer from "./NotificationDrawer";

interface TopBarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function TopBar({ collapsed, onToggle }: TopBarProps) {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleType>("MANAGEMENT");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setCurrentRole(simulator.getCurrentRole());
      setUnreadCount(simulator.getAlerts().filter((a) => !a.isRead).length);
    };
    update();
    return simulator.subscribe(update);
  }, []);

  const handleRoleChange = (newRole: RoleType) => {
    simulator.setCurrentRole(newRole);
    setCurrentRole(newRole);
  };

  const roles: RoleType[] = [
    "MANAGEMENT",
    "OPERATOR",
    "MAINTENANCE",
    "ESG TEAM",
    "HR / WORKFORCE",
    "AUDITOR",
  ];

  return (
    <>
      <header className="admin-topbar">
        <div className="topbar-left">
          <button onClick={onToggle} className="topbar-menu-btn" aria-label="Toggle Sidebar" title="Toggle Sidebar">
            <span className="material-icons">menu</span>
          </button>

          <div className="topbar-status">
            <span className="status-dot"></span>
            <span className="status-text font-bold text-slate-800">SMN SYNERGY</span>
            <span className="status-divider"></span>
            <span className="status-text">20 Pilot Nodes</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/80 rounded-md text-xs text-emerald-800 font-medium ml-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Telemetry Active</span>
          </div>
        </div>

        <div className="topbar-right">
          {/* Role Perspective Switcher */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
            <span className="material-icons text-slate-400 text-sm">badge</span>
            <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">Role View:</span>
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as RoleType)}
              className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* AI Copilot Trigger matching C:/pkm button-primary style */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] text-[#4B6BFB] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            title="AI Decision Copilot"
          >
            <span className="material-icons text-base text-[#4B6BFB]">psychology</span>
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative topbar-icon-btn"
            title="Notifications & Alerts"
          >
            <span className="material-icons">notifications_none</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center font-mono animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <span className="topbar-divider hidden sm:block"></span>

          {/* User Profile */}
          <div className="topbar-profile font-sans">
            <div className="profile-info hidden sm:flex">
              <span className="profile-name">PT SMN HQ</span>
              <span className="profile-role font-mono">{currentRole}</span>
            </div>
            <div className="profile-avatar shadow-xs">
              <span>{currentRole.slice(0, 2)}</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .admin-topbar {
            height: 56px;
            background: #ffffff;
            border-bottom: 1px solid var(--color-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            position: sticky;
            top: 0;
            z-index: 90;
          }

          .topbar-left,
          .topbar-right {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .topbar-menu-btn {
            color: #64748B;
            background: none;
            border: none;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s;
            border-radius: 8px;
          }

          .topbar-menu-btn:hover {
            background: var(--color-shell);
            color: var(--color-foreground);
          }

          .topbar-menu-btn .material-icons {
            font-size: 22px;
          }

          .topbar-status {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 12px;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10B981;
            animation: pulse-dot 2s ease-in-out infinite;
          }

          @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .status-text {
            font-size: 13px;
            color: #64748B;
            font-weight: 500;
          }

          .status-divider {
            width: 1px;
            height: 16px;
            background: var(--color-border);
          }

          .topbar-icon-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            border: 1px solid var(--color-border);
            background: white;
            color: #64748B;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s;
          }

          .topbar-icon-btn:hover {
            background: var(--color-shell);
            color: var(--color-foreground);
          }

          .topbar-icon-btn .material-icons {
            font-size: 18px;
          }

          .topbar-divider {
            width: 1px;
            height: 24px;
            background: var(--color-border);
            margin: 0 4px;
          }

          .topbar-profile {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .profile-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .profile-name {
            font-size: 13px;
            font-weight: 600;
            color: var(--color-foreground);
            line-height: 1.2;
          }

          .profile-role {
            font-size: 11px;
            color: var(--color-muted);
            font-weight: 500;
            text-transform: uppercase;
          }

          .profile-avatar {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: var(--color-accent);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 13px;
          }

          @media (max-width: 640px) {
            .topbar-status,
            .profile-info {
              display: none;
            }
          }
        `}</style>
      </header>

      {/* Global AI Copilot Drawer */}
      <AICopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />

      {/* Global Notification Drawer */}
      <NotificationDrawer isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  );
}
