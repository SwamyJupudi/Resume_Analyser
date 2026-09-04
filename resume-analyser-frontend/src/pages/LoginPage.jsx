import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Card, ErrorBanner, TextField } from "../components/ui/Primitives";
import { AuthHeader } from "../components/auth/AuthHeader";
import { AuthIllustration } from "../components/auth/AuthIllustration";
import resumeAnalysisRobot from "../assets/illustrations/resume-analysis-robot.png";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ email: email.trim(), password });
      if (result.success) {
        navigate(redirectTo, { replace: true });
      } else {
        setError(result.message || "Invalid email or password.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <AuthHeader />
      <div className="auth-body">
        <div className="auth-body-inner">
          <AuthIllustration src={resumeAnalysisRobot} />
          <div className="auth-form-col">
            <div className="auth-card">
              <Card>
                <h1>Welcome back</h1>
                <p className="auth-sub">Sign in to analyse your resume.</p>

                <ErrorBanner>{error}</ErrorBanner>

                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" className="btn-block" loading={loading}>
                    Sign in
                  </Button>
                </form>
              </Card>
              <p className="auth-switch">
                Don't have an account? <Link to="/register">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
