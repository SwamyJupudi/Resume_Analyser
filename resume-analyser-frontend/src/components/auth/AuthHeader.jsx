import { Link } from "react-router-dom";

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


export function AuthHeader() {
  return (
    <header className="auth-header">
      <div className="auth-header-brand">
        <span className="auth-header-icon">
          <LensIcon />
        </span>
        <span>
          <span className="auth-header-title">FitLens</span>{" "}
          <span className="auth-header-tagline">
            — An AI-Powered Resume Analyser
          </span>
        </span>
      </div>
      <Link
        to="/"
        className="auth-header-back"
        style={{
          backgroundColor: "#204B42",
          color: "#ffffff",
          padding: "10px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "500",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.2s ease",
        }}
      >
        Back to Home
      </Link>
    </header>
  );
}
