import { useRef, useState } from "react";

// The backend (ResumeService.extractText) only accepts .pdf and .docx,
// checked by filename extension. We validate the same thing client-side
// so the person gets immediate feedback instead of a round trip.
const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];
const MAX_SIZE_BYTES = 1 * 1024 * 1024; // Spring Boot's default multipart limit is 1MB/file

function validateFile(file) {
  const name = file.name.toLowerCase();
  const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));

  if (!hasValidExtension) {
    return "Only PDF and DOCX files are supported.";
  }

  if (file.size > MAX_SIZE_BYTES) {
    return "This file is larger than 1MB, the server's upload limit. Try a smaller file.";
  }

  return null;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export function FileDropzone({ file, onFileSelected, error }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(fileList) {
    const selected = fileList[0];
    if (!selected) return;
    const validationError = validateFile(selected);
    onFileSelected(selected, validationError);
  }

  if (file && !error) {
    return (
      <div className="file-picked">
        <div style={{ minWidth: 0 }}>
          <div className="file-picked-name">{file.name}</div>
          <div className="file-picked-meta">{formatSize(file.size)}</div>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onFileSelected(null, null)}
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`dropzone ${dragging ? "dragging" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        aria-label="Upload resume file, PDF or DOCX"
      >
        <div className="dropzone-icon" aria-hidden="true">📄</div>
        <div className="dropzone-title">Drag & drop your resume</div>
        <div className="dropzone-hint">PDF or DOCX, up to 1MB — or click to choose a file</div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && (
        <p className="field-error-text" role="alert" style={{ marginTop: 8 }}>
          {error}
        </p>
      )}
    </div>
  );
}
