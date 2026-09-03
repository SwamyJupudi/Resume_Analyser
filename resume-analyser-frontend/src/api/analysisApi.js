import client from "./client";

// GET /api/analysis/history — newest first. Each item only has
// { id, matchScore, jobDescription, createdAt } — the backend does not
// persist matching/missing skills, suggestions, or AI output, so history
// can never show those fields.
export async function getHistory() {
  const { data } = await client.get("/api/analysis/history");
  return data;
}

// GET /api/analysis/{id} — same shape as one history item.
export async function getAnalysisById(id) {
  const { data } = await client.get(`/api/analysis/${id}`);
  return data;
}

// DELETE /api/analysis/{id} — returns a plain-text confirmation string.
export async function deleteAnalysis(id) {
  const { data } = await client.delete(`/api/analysis/${id}`);
  return String(data);
}
