import { Link } from "react-router-dom";
import { Button } from "../components/ui/Primitives";

export default function NotFoundPage() {
  return (
    <div className="auth-screen">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Page not found</h1>
        <p style={{ color: "var(--ink-muted)", marginBottom: 22 }}>
          That page doesn't exist or has moved.
        </p>
        <Button as={Link} to="/dashboard">
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
