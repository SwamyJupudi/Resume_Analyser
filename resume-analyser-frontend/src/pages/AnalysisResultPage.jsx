import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Primitives";
import { ResultHero } from "../components/analysis/ResultHero";
import { SkillsPanel, SuggestionsPanel } from "../components/analysis/SkillsPanel";
import { AIInsights } from "../components/analysis/AIInsights";

// This page only ever renders data handed to it directly by NewAnalysisPage
// after a successful POST /api/job/match — it never re-fetches, because
// GET /api/analysis/{id} only returns the persisted subset (score, job
// description, date), not matching/missing skills or AI output.
export default function AnalysisResultPage() {
  const location = useLocation();
  const state = location.state;

  if (!state?.result) {
    // Reached directly (e.g. page refresh) with no result to show —
    // there's nothing to fetch, so send the person back to start one.
    return <Navigate to="/analyze" replace />;
  }

  const { result, jobDescription } = state;
  const { matchScore, matchingSkills, missingSkills, suggestions, aiAnalysis } = result;

  return (
    <>
      <div className="page-header">
        <h1>Analysis result</h1>
      </div>

      <ResultHero matchScore={matchScore} jobDescription={jobDescription} />

      <div style={{ height: 20 }} />
      <SkillsPanel matchingSkills={matchingSkills} missingSkills={missingSkills} />

      <div style={{ height: 20 }} />
      <SuggestionsPanel suggestions={suggestions} />

      {aiAnalysis && (
        <>
          <div style={{ height: 20 }} />
          <AIInsights aiAnalysis={aiAnalysis} />
        </>
      )}

      <div className="result-actions">
        <Button as={Link} to="/analyze" variant="secondary">
          Analyse another resume
        </Button>
        <Button as={Link} to="/history" variant="secondary">
          View history
        </Button>
        <Button as={Link} to="/dashboard" variant="ghost">
          Back to dashboard
        </Button>
      </div>
    </>
  );
}
