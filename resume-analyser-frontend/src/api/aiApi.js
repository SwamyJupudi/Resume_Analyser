import client from "./client";

// GET /api/ai/test — a health-check endpoint for the Gemini integration.
// Not part of the main user flow; exposed here for completeness/debugging.
export async function pingAI() {
  const { data } = await client.get("/api/ai/test");
  return String(data);
}

// POST /api/ai/analyze — JSON body { resumeText, jobDescription }, returns
// an AIAnalysisResponse directly. The main analysis flow gets this same
// data via POST /api/job/match instead (which also handles file extraction,
// skill matching, and history persistence in one call), so this is not
// wired into a page — it would duplicate that flow.
export async function analyzeWithAI({ resumeText, jobDescription }) {
  const { data } = await client.post("/api/ai/analyze", {
    resumeText,
    jobDescription,
  });
  return data;
}
