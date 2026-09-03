import client from "./client";

// POST /api/resume/upload — multipart field "file". Returns raw extracted
// text as plain text (not JSON).
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await client.post("/api/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return String(data);
}

// POST /api/resume/analyze — multipart field "file". Returns a partial
// ResumeAnalysisResponse: skills, missingSkills, suggestions only.
// matchingSkills, matchScore, aiAnalysis are NOT populated by this endpoint
// (no job description is involved) — the UI must not pretend otherwise.
export async function analyzeResumeOnly(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await client.post("/api/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
