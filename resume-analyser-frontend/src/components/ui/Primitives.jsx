export function Button({
  as: Component = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </Component>
  );
}

export function Card({ children, className = "", padded = true }) {
  return <div className={`card ${padded ? "card-pad" : ""} ${className}`}>{children}</div>;
}

export function TextField({ label, id, error, hint, ...props }) {
  return (
    <div className={`field ${error ? "field-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && (
        <span id={`${id}-error`} className="field-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export function TextArea({ label, id, error, hint, ...props }) {
  return (
    <div className={`field ${error ? "field-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && (
        <span id={`${id}-error`} className="field-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export function ErrorBanner({ children }) {
  if (!children) return null;
  return (
    <div className="banner banner-error" role="alert">
      <span aria-hidden="true">⚠</span>
      <span>{children}</span>
    </div>
  );
}

export function InfoBanner({ children }) {
  if (!children) return null;
  return (
    <div className="banner banner-info">
      <span aria-hidden="true">ⓘ</span>
      <span>{children}</span>
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function Skeleton({ width = "100%", height = "16px", style = {} }) {
  return (
    <div className="skeleton" style={{ width, height, ...style }} aria-hidden="true" />
  );
}

export function ConfirmDialog({ title, description, confirmLabel = "Confirm", onConfirm, onCancel, loading }) {
  return (
    <div className="confirm-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <Card className="confirm-dialog">
        <h3 id="confirm-title">{title}</h3>
        <p>{description}</p>
        <div className="confirm-dialog-actions">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
}
