import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { authApi, TOKEN_KEY } from "../services/api";

/*
  AuthContext = a shared "who is logged in?" board that any page can read.
  Without it you'd have to hand the user from component to component by hand.

    const { user, isAuthenticated, login, logout } = useAuth();
*/

const USER_KEY = "sarab_user";
const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  // Called after a successful login/register. `data` = { token, user } from the API.
  const login = useCallback((data) => {
    try {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch {
      // storage blocked: user stays logged in for this tab only
    }
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // even if the server call fails, log the user out locally
    }
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
