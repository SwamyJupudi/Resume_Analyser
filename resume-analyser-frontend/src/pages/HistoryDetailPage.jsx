import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAnalysisById, deleteAnalysis } from "../api/analysisApi";
import { Button, Card, ConfirmDialog, ErrorBanner, InfoBanner, Skeleton } from "../components/ui/Primitives";
import { ScoreRing } from "../components/ui/ScoreRing";
import { formatDateTime } from "../utils/formatDate";

// GET /api/analysis/{id} returns ONLY { id, matchScore, jobDescription,
// createdAt } — the backend never persisted matching/missing skills,
// suggestions, or the AI summary/strengths/weaknesses/recommendations for
// this record, so this page must not show or imply any of those exist here.
export default function HistoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    setError("");
    setRecord(null);
    getAnalysisById(id)
      .then(setRecord)
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleConfirmDelete() {
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteAnalysis(id);
      navigate("/history", { replace: true });
    } catch (err) {
      setDeleteError(err.message || "Couldn't delete this analysis. Try again.");
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Saved analysis</h1>
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {!record && !error && (
        <Card>
          <Skeleton height="120px" />
        </Card>
      )}

      {record && (
        <>
          <Card className="result-hero">
            <ScoreRing score={record.matchScore} />
            <div className="result-hero-text">
              <h2>Match score</h2>
              <p className="result-jd-label" style={{ marginTop: 0, fontSize: 13 }}>
                {formatDateTime(record.createdAt)}
              </p>
            </div>
          </Card>

          <div style={{ height: 20 }} />

          <Card>
            <div className="section-title">Job description</div>
            <p style={{ fontSize: 14.5, whiteSpace: "pre-wrap" }}>{record.jobDescription}</p>
          </Card>

          <div style={{ height: 20 }} />

          <InfoBanner>
            Only the match score, job description, and date are saved for past
            analyses. Matching/missing skills and AI insights are only shown
            right after you run a new analysis — they aren't stored, so this
            saved record can't display them.
          </InfoBanner>

          <div className="result-actions">
            <Button as={Link} to="/history" variant="secondary">
              Back to history
            </Button>
            <Button variant="danger" onClick={() => setConfirmingDelete(true)}>
              Delete this record
            </Button>
          </div>
        </>
      )}

      {confirmingDelete && (
        <ConfirmDialog
          title="Delete this analysis?"
          description={deleteError || "This will permanently remove this saved analysis. This can't be undone."}
          confirmLabel="Delete"
          loading={deleting}
          onCancel={() => {
            setConfirmingDelete(false);
            setDeleteError("");
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
