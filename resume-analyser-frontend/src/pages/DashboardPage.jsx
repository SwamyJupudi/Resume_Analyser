import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistory } from "../api/analysisApi";
import { useAuth } from "../context/AuthContext";
import { Button, Card, EmptyState, ErrorBanner, Skeleton } from "../components/ui/Primitives";
import { formatDate } from "../utils/formatDate";

function scoreTone(score) {
  if (score >= 70) return "";
  if (score >= 40) return "warn";
  return "bad";
}

export default function DashboardPage() {
  const { email } = useAuth();
  const [recent, setRecent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getHistory()
      .then((data) => {
        if (!cancelled) setRecent(data.slice(0, 3));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>{email ? `Signed in as ${email}` : "Welcome back."}</p>
      </div>

      <Card className="hero-cta" padded={false}>
        <div>
          <h2>Start a new analysis</h2>
          <p>Upload a resume and a target job description to see your match score, skill gaps, and AI feedback.</p>
        </div>
        <Button as={Link} to="/analyze">
          Start analysis
        </Button>
      </Card>

      <div style={{ height: 32 }} />

      <div className="section-title">Recent analyses</div>

      <ErrorBanner>{error}</ErrorBanner>

      {recent === null && !error && (
        <div className="recent-list">
          {[0, 1, 2].map((i) => (
            <div className="recent-row" key={i}>
              <Skeleton width="240px" height="14px" />
              <Skeleton width="60px" height="26px" style={{ borderRadius: 999 }} />
            </div>
          ))}
        </div>
      )}

      {recent !== null && recent.length === 0 && (
        <Card>
          <EmptyState
            title="No analyses yet"
            description="Run your first resume-vs-job comparison to see it here."
            action={
              <Button as={Link} to="/analyze">
                Start your first analysis
              </Button>
            }
          />
        </Card>
      )}

      {recent !== null && recent.length > 0 && (
        <div className="recent-list">
          {recent.map((item) => (
            <Link className="recent-row" to={`/analysis/${item.id}`} key={item.id}>
              <div className="recent-row-main">
                <div className="recent-row-jd">{item.jobDescription}</div>
                <div className="recent-row-date">{formatDate(item.createdAt)}</div>
              </div>
              <div className="recent-row-score">
                <span className={`score-pill ${scoreTone(item.matchScore)}`}>
                  {Math.round(item.matchScore)}%
                </span>
                <span style={{ color: "var(--ink-muted)", fontSize: 13 }}>View →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
