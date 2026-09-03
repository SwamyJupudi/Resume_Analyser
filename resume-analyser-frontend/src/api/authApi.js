import client from "./client";

// Both endpoints return HTTP 200 with a plain-text body in every case —
// success and failure are both 200s, distinguished only by the string
// content. This wrapper is where that quirk is handled, so no component
// has to know about it.

export async function register({ name, email, password }) {
  const { data } = await client.post("/api/auth/register", {
    name,
    email,
    password,
  });

  const message = String(data).trim();

  if (message === "User registered successfully") {
    return { success: true, message };
  }

  // Any other string (e.g. "Email already registered") is a failure reason.
  return { success: false, message };
}

export async function login({ email, password }) {
  const { data } = await client.post("/api/auth/login", { email, password });

  const body = String(data).trim();

  if (body === "Invalid email or password") {
    return { success: false, message: body };
  }

  // On success the body IS the JWT itself — not JSON, not wrapped.
  return { success: true, token: body };
}
