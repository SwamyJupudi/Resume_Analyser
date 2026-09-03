import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { getToken, setToken, clearToken, onUnauthorized } from "../api/client";
import { login as loginRequest, register as registerRequest } from "../api/authApi";
import { getEmailFromToken, isTokenExpired } from "../utils/jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => {
    const stored = getToken();
    if (stored && !isTokenExpired(stored)) return stored;
    if (stored) clearToken(); // stale/expired token left over from a previous visit
    return null;
  });

  // If a background request comes back 401 (e.g. the token expired mid-session),
  // clear auth everywhere immediately rather than each page handling it separately.
  useEffect(() => {
    return onUnauthorized(() => {
      setTokenState(null);
    });
  }, []);

  const login = useCallback(async (credentials) => {
    const result = await loginRequest(credentials);
    if (result.success) {
      setToken(result.token);
      setTokenState(result.token);
    }
    return result;
  }, []);

  const register = useCallback(async (details) => {
    return registerRequest(details);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      email: token ? getEmailFromToken(token) : null,
      login,
      register,
      logout,
    }),
    [token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
