import { Card } from "../ui/Primitives";

export function AIInsights({ aiAnalysis }) {
  if (!aiAnalysis) return null;

  const { summary, strengths = [], weaknesses = [], recommendations = [] } = aiAnalysis;

  return (
    <Card>
      <div className="section-title">AI insights</div>
      <div className="ai-section">
        {summary && (
          <div className="ai-block">
            <h3>Summary</h3>
            <p className="ai-summary">{summary}</p>
          </div>
        )}

        <div className="ai-two-col">
          <div className="ai-block">
            <h3>Strengths</h3>
            <div className="suggestions-list">
              {strengths.length > 0 ? (
                strengths.map((item) => (
                  <div className="suggestion-item" key={item}>
                    {item}
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>None returned.</p>
              )}
            </div>
          </div>
          <div className="ai-block">
            <h3>Weaknesses</h3>
            <div className="suggestions-list">
              {weaknesses.length > 0 ? (
                weaknesses.map((item) => (
                  <div className="suggestion-item" key={item}>
                    {item}
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>None returned.</p>
              )}
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="ai-block">
            <h3>Recommendations</h3>
            <div className="suggestions-list">
              {recommendations.map((item) => (
                <div className="suggestion-item" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
