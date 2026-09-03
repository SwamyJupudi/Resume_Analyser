import { Link } from "react-router-dom";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-inner">
        <div className="public-footer-brand">
          <div className="public-footer-mark">Resume Analyser</div>
          <p>Match your resume against a real job description and see exactly where you stand.</p>
        </div>
        <nav className="public-footer-links" aria-label="Footer">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Create account</Link>
        </nav>
      </div>
    </footer>
  );
}
