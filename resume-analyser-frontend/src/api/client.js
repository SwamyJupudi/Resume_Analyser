import axios from "axios";

// Configurable backend base URL. The backend's application.properties sets
// server.port=8081 — NOT the Spring Boot default 8080 — so that is the
// correct default here. Override via VITE_API_BASE_URL in .env if needed.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

const client = axios.create({
  baseURL: API_BASE_URL,
});

const TOKEN_KEY = "resume_analyser_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Attach the JWT to every outgoing request. Never log the token itself.
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A single place to react to session expiry. Individual pages/components
// subscribe to this instead of each one duplicating 401 handling.
const unauthorizedListeners = new Set();

export function onUnauthorized(listener) {
  unauthorizedListeners.add(listener);
  return () => unauthorizedListeners.delete(listener);
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response && error.response.status;

    // IMPORTANT: this backend's SecurityConfig has no custom
    // AuthenticationEntryPoint, no httpBasic()/formLogin(), and no
    // @PreAuthorize/role checks anywhere. That means when
    // JwtAuthenticationFilter doesn't set an authentication (token
    // missing, malformed, or expired) and anyRequest().authenticated()
    // rejects the request, Spring Security's default
    // Http403ForbiddenEntryPoint returns 403 — NOT 401. Since there is no
    // role/permission system in this app, a 403 here can only ever mean
    // "not authenticated," never "authenticated but insufficient
    // permission." Both statuses are therefore treated as session expiry.
    if (status === 401 || status === 403) {
      clearToken();
      unauthorizedListeners.forEach((listener) => listener());
    }
    return Promise.reject(normalizeError(error));
  }
);

// The backend has two different error shapes depending on which layer
// rejects the request:
//   - GlobalExceptionHandler (IllegalArgumentException / RuntimeException)
//     returns { "error": "message" }.
//   - Everything else (missing multipart params, oversized files, Spring
//     Security 403s, network failures) returns Spring Boot's default shape
//     or no JSON body at all.
// This normalizes both into a single { status, message } shape so the UI
// never has to guess which one it got.
function normalizeError(error) {
  if (!error.response) {
    return {
      status: 0,
      message: "Could not reach the server. Check your connection and try again.",
    };
  }

  const { status, data } = error.response;

  if (data && typeof data === "object" && typeof data.error === "string") {
    return { status, message: data.error };
  }

  if (data && typeof data === "object" && typeof data.message === "string") {
    return { status, message: data.message };
  }

  if (status === 401 || status === 403) {
    return { status, message: "Your session has expired. Please log in again." };
  }

  if (status === 413) {
    return { status, message: "That file is too large." };
  }

  if (status >= 500) {
    return { status, message: "Something went wrong on the server. Please try again." };
  }

  return { status, message: "Something went wrong. Please try again." };
}

export default client;
