import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function LensIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
    </svg>
  );
}
const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analyze", label: "New analysis" },
  { to: "/history", label: "History" },
];

export function AppShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <span className="topbar-mark">Resume Analyser</span>
        <button
          className="btn btn-ghost"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          ☰
        </button>
      </div>

      {drawerOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
      )}

      <aside className={`sidebar ${drawerOpen ? "open" : ""}`}>
        <div className="sidebar-mark">
          <span className="auth-header-icon">
            <LensIcon />
          </span>
          <span>FitLens</span>
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={() => setDrawerOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          {email && <div className="sidebar-user">{email}</div>}
          <button className="btn btn-ghost btn-block" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="main-column">
        <main className="page">{children}</main>
      </div>
    </div>
  );
}
