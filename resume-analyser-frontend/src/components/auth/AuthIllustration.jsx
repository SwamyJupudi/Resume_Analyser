// Purely decorative — hidden from assistive tech, never a functional
// element. Aspect ratio is preserved via object-fit: contain; sizing and
// responsive hiding are handled in CSS (.auth-illustration-col). alt="" is
// intentional (WCAG: decorative images should have empty alt text).
export function AuthIllustration({ src }) {
  return (
    <div className="auth-illustration-col" aria-hidden="true">
      <img src={src} alt="" className="auth-illustration-img" />
    </div>
  );
}
