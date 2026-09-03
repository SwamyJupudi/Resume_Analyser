import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistory, deleteAnalysis } from "../api/analysisApi";
import { Button, Card, ConfirmDialog, EmptyState, ErrorBanner, Skeleton } from "../components/ui/Primitives";
import { formatDate } from "../utils/formatDate";

function scoreTone(score) {
  if (score >= 70) return "";
  if (score >= 40) return "warn";
  return "bad";
}

export default function HistoryPage() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  function loadHistory() {
    setError("");
    getHistory()
      .then(setItems)
      .catch((err) => setError(err.message));
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteAnalysis(pendingDelete.id);
      setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(err.message || "Couldn't delete this analysis. Try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Analysis history</h1>
        <p>Every saved comparison, newest first.</p>
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {items === null && !error && (
        <Card padded={false}>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} height="20px" />
            ))}
          </div>
        </Card>
      )}

      {items !== null && items.length === 0 && (
        <Card>
          <EmptyState
            title="No analyses yet"
            description="Run a resume-vs-job comparison and it will show up here."
            action={
              <Button as={Link} to="/analyze">
                Start your first analysis
              </Button>
            }
          />
        </Card>
      )}

      {items !== null && items.length > 0 && (
        <>
          <div className="history-table-wrap">
            <Card padded={false}>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Job description</th>
                    <th>Score</th>
                    <th aria-hidden="true"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td style={{ whiteSpace: "nowrap", color: "var(--ink-muted)" }}>
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="history-jd-cell">{item.jobDescription}</td>
                      <td>
                        <span className={`score-pill ${scoreTone(item.matchScore)}`}>
                          {Math.round(item.matchScore)}%
                        </span>
                      </td>
                      <td className="history-actions-cell">
                        <Button as={Link} to={`/analysis/${item.id}`} variant="ghost">
                          View
                        </Button>
                        <Button variant="danger" onClick={() => setPendingDelete(item)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="history-cards">
            {items.map((item) => (
              <Card key={item.id} className="history-card">
                <div className="history-card-top">
                  <span className={`score-pill ${scoreTone(item.matchScore)}`}>
                    {Math.round(item.matchScore)}%
                  </span>
                  <span style={{ color: "var(--ink-muted)", fontSize: 12.5 }}>
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p style={{ fontSize: 14 }}>{item.jobDescription}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button as={Link} to={`/analysis/${item.id}`} variant="secondary">
                    View
                  </Button>
                  <Button variant="danger" onClick={() => setPendingDelete(item)}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this analysis?"
          description={
            deleteError ||
            "This will permanently remove this saved analysis. This can't be undone."
          }
          confirmLabel="Delete"
          loading={deleting}
          onCancel={() => {
            setPendingDelete(null);
            setDeleteError("");
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
