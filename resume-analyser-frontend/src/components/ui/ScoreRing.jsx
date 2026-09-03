// Renders exactly the score the backend returned. Never recalculated here.
function toneFor(score) {
  if (score >= 70) return "var(--good)";
  if (score >= 40) return "var(--warn)";
  return "var(--bad)";
}

export function ScoreRing({ score }) {
  const clamped = Math.max(0, Math.min(100, score ?? 0));
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const tone = toneFor(clamped);

  return (
    <div className="score-ring-wrap">
      <svg viewBox="0 0 148 148" width="148" height="148">
        <circle cx="74" cy="74" r={radius} fill="none" stroke="var(--line)" strokeWidth="8" />
        <circle
          cx="74"
          cy="74"
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 74 74)"
        />
      </svg>
      <div className="score-ring-value">
        <span className="score-ring-number">{Math.round(clamped)}</span>
        <span className="score-ring-label">Match score</span>
      </div>
    </div>
  );
}
