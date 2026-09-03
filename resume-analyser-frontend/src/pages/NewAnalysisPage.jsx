import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { matchResume } from "../api/jobApi";
import { Button, Card, ErrorBanner, TextArea } from "../components/ui/Primitives";
import { FileDropzone } from "../components/analysis/FileDropzone";
import { AnalysisLoadingStages } from "../components/analysis/AnalysisLoadingStages";

const MIN_JD_LENGTH = 20;

export default function NewAnalysisPage() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jdError, setJdError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleFileSelected(selectedFile, error) {
    setFile(selectedFile);
    setFileError(error);
  }

  const canSubmit = Boolean(file) && !fileError && jobDescription.trim().length >= MIN_JD_LENGTH;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (!file || fileError) {
      setFileError(fileError || "Choose a resume file to continue.");
      return;
    }

    if (jobDescription.trim().length < MIN_JD_LENGTH) {
      setJdError(`Add a bit more detail (at least ${MIN_JD_LENGTH} characters).`);
      return;
    }

    setSubmitting(true);
    try {
      const result = await matchResume({ file, jobDescription: jobDescription.trim() });
      // Pass the full response via navigation state — the backend does not
      // return an id for this call, and re-fetching by id would only return
      // the partial history shape (no matching skills / AI data), so we
      // carry the complete result forward instead of re-fetching it.
      navigate("/analyze/result", { state: { result, jobDescription: jobDescription.trim() } });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitting) {
    return (
      <>
        <div className="page-header">
          <h1>New analysis</h1>
        </div>
        <Card padded>
          <AnalysisLoadingStages />
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>New analysis</h1>
        <p>Upload your resume and paste the job description you're targeting.</p>
      </div>

      <ErrorBanner>{submitError}</ErrorBanner>

      <form onSubmit={handleSubmit} noValidate>
        <Card>
          <div className="analysis-grid">
            <div>
              <div className="section-title">Resume</div>
              <FileDropzone file={file} error={fileError} onFileSelected={handleFileSelected} />
            </div>
            <div>
              <div className="section-title">Job description</div>
              <TextArea
                id="jobDescription"
                label={<span className="visually-hidden">Job description</span>}
                placeholder="Paste the target job description here…"
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (jdError) setJdError("");
                }}
                error={jdError}
              />
            </div>
          </div>

          <div className="analysis-actions">
            <Button type="submit" disabled={!canSubmit}>
              Analyse resume
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
}
