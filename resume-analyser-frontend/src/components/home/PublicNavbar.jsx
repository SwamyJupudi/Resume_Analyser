import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Primitives";
import { IconMenu, IconX } from "./Icons";

export function PublicNavbar() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="public-nav">
      <div className="public-nav-inner">
        <Link to="/" className="public-nav-mark" onClick={() => setOpen(false)}>
          Resume Analyser
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
