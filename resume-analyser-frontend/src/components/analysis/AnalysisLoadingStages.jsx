import { useEffect, useState } from "react";

// POST /api/job/match is a single synchronous backend call — there is no
// real progress data to report. These stages are UX-only pacing so the
// screen doesn't feel frozen while Gemini responds; they do not reflect
// actual backend checkpoints.
const STAGES = [
  "Extracting text from your resume",
  "Detecting skills",
  "Comparing with the job description",
  "Generating AI insights",
];

// Roughly paced so the last stage is the one showing when the real
// response is slowest to arrive (the Gemini call).
const STAGE_DURATIONS_MS = [900, 900, 1100, 999999];

export function AnalysisLoadingStages() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= STAGES.length - 1) return;
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), STAGE_DURATIONS_MS[activeIndex]);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className="loading-stages" role="status" aria-live="polite">
      {STAGES.map((label, i) => (
        <div
          key={label}
          className={`loading-stage ${i === activeIndex ? "active" : i < activeIndex ? "done" : ""}`}
        >
          <span className="loading-dot" aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
