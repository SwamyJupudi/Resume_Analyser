import { Card } from "../ui/Primitives";

export function SkillsPanel({ matchingSkills = [], missingSkills = [] }) {
  return (
    <Card>
      <div className="skills-grid">
        <div>
          <div className="section-title">Matching skills</div>
          {matchingSkills.length > 0 ? (
            <div className="skill-chip-list">
              {matchingSkills.map((skill) => (
                <span className="skill-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>
              No overlapping skills were detected.
            </p>
          )}
        </div>
        <div>
          <div className="section-title">Missing skills</div>
          {missingSkills.length > 0 ? (
            <div className="skill-chip-list">
              {missingSkills.map((skill) => (
                <span className="skill-chip missing" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>
              Nothing from the job description is missing.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function SuggestionsPanel({ suggestions = [] }) {
  if (suggestions.length === 0) return null;
  return (
    <Card>
      <div className="section-title">What to improve</div>
      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div className="suggestion-item" key={suggestion}>
            {suggestion}
          </div>
        ))}
      </div>
    </Card>
  );
}
