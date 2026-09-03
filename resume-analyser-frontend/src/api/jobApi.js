import client from "./client";

// POST /api/job/description — JSON body. Returns a plain array of detected
// skill strings (not wrapped in an object).
export async function detectJobSkills(jobDescription) {
  const { data } = await client.post("/api/job/description", {
    jobDescription,
  });
  return data;
}

// POST /api/job/match — the main analysis flow. Multipart: "file" +
// "jobDescription" (a plain form field, NOT JSON). Returns the full
// ResumeAnalysisResponse including matchScore, matching/missing skills,
// suggestions, and aiAnalysis. Also persists a history record server-side.
export async function matchResume({ file, jobDescription }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("jobDescription", jobDescription);

  const { data } = await client.post("/api/job/match", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
