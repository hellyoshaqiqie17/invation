"use client";

interface TopBarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function TopBar({ collapsed, onToggle }: TopBarProps) {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button onClick={onToggle} className="toggle-sidebar-btn" aria-label="Toggle Sidebar">
          <span className="material-icons">menu</span>
        </button>
        <div className="system-status-badge font-mono">
          <span className="status-dot"></span>
          <span>Sistem Online | 20 Mesin Pilot</span>
        </div>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" title="Audio Alert">
          <span className="material-icons">volume_up</span>
        </button>
        <button className="icon-btn" title="Notifikasi">
          <span className="material-icons">notifications</span>
        </button>

        <div className="user-profile font-sans">
          <div className="user-text">
            <span className="user-name">Petugas Komando</span>
            <span className="user-role">SMN Control Tower</span>
          </div>
          <div className="user-avatar">
            <span>SM</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-topbar {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .topbar-left, .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .toggle-sidebar-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 8px;
        }

        .toggle-sidebar-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .system-status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #475569;
          font-weight: 500;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
        }

        .icon-btn {
          background: none;
          border: 1px solid #e2e8f0;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
        }

        .icon-btn:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-text {
          display: flex;
          flex-direction: column;
          text-align: right;
        }

        .user-name {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }

        .user-role {
          font-size: 11px;
          color: #64748b;
        }

        .user-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #4b6bfb;
          color: white;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </header>
  );
}
