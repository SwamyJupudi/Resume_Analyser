import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Card, ErrorBanner, TextField } from "../components/ui/Primitives";




export default function RegisterPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Fill in your name, email, and password.");
      return;
    }

    if (password.length < 6) {
      setError("Use a password with at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const result = await register({ name: name.trim(), email: email.trim(), password });

      if (!result.success) {
        setError(result.message || "Registration failed.");
        return;
      }

      // The backend has no auto-login on register, so log in immediately
      // afterward for a smooth flow — using the credentials just submitted.
      const loginResult = await login({ email: email.trim(), password });
      if (loginResult.success) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-mark">Resume Analyser</div>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px",
            marginBottom: "16px",
            borderRadius: "8px",
            backgroundColor: "#204B42",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </Link>
        <Card>
          <h1>Create your account</h1>
          <p className="auth-sub">Start matching your resume against real job descriptions.</p>

          <ErrorBanner>{error}</ErrorBanner>

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              autoComplete="new-password"
              hint="At least 6 characters."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="btn-block" loading={loading}>
              Create account
            </Button>
          </form>
        </Card>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
