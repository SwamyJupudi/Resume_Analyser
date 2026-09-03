import { Card } from "../ui/Primitives";
import { ScoreRing } from "../ui/ScoreRing";

// The verdict copy is purely a label for the backend's own matchScore —
// it does not compute or alter the score in any way.
function verdictFor(score) {
  if (score >= 80) return "Strong match — your resume aligns closely with this role.";
  if (score >= 60) return "Good match — you cover most of what this role is asking for.";
  if (score >= 35) return "Partial match — several key skills for this role aren't showing up yet.";
  return "Limited match — this resume and job description share few detected skills.";
}

export function ResultHero({ matchScore, jobDescription }) {
  return (
    <Card className="result-hero">
      <ScoreRing score={matchScore} />
      <div className="result-hero-text">
        <h2>Resume match result</h2>
        <p className="result-verdict">{verdictFor(matchScore)}</p>
        {jobDescription && (
          <p className="result-jd-label">
            Compared against: “{jobDescription.slice(0, 140)}
            {jobDescription.length > 140 ? "…" : ""}”
          </p>
        )}
      </div>
    </Card>
  );
}
