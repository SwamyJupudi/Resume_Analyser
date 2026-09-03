// The backend has no "current user" / profile endpoint. The JWT's subject
// claim is the user's email (see JwtService.generateToken), so we decode
// that locally just to display who's logged in. This does NOT verify the
// token's signature — it's read-only, for display, never for authorization
// decisions (the backend is the only party that verifies signatures).
export function getEmailFromToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded.sub || null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}
