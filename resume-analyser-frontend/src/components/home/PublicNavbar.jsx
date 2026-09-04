import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Primitives";
import { IconMenu, IconX  } from "./Icons";


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

export function PublicNavbar() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="public-nav">
      <div className="public-nav-inner">
        <Link to="/" className="public-nav-mark" onClick={() => setOpen(false)}>
          <span className="public-nav-brand">
            <span className="auth-header-icon">
              <LensIcon />
            </span>
            <span>FitLens</span>

            <span className="public-nav-brand-tagline">
              — An AI-Powered Resume Analyser
            </span>
          </span>
        </Link>

        <nav className="public-nav-links" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
        </nav>

        <div className="public-nav-actions">
          {isAuthenticated ? (
            <Button as={Link} to="/dashboard" variant="secondary">
              Dashboard
            </Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost">
                Sign in
              </Button>
              <Button as={Link} to="/register">
                Create account
              </Button>
            </>
          )}
        </div>

        <button
          className="public-nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="public-nav-mobile">
          <a href="#home" onClick={() => setOpen(false)}>
            Home
          </a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>
            How it works
          </a>
          <a href="#features" onClick={() => setOpen(false)}>
            Features
          </a>
          <div className="public-nav-mobile-actions">
            {isAuthenticated ? (
              <Button as={Link} to="/dashboard" variant="secondary" className="btn-block">
                Dashboard
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="secondary" className="btn-block">
                  Sign in
                </Button>
                <Button as={Link} to="/register" className="btn-block">
                  Create account
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
