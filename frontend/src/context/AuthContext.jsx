import { createContext, useContext, useEffect, useState } from "react";

import { apiRequest } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("sporty_token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("sporty_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    apiRequest("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("sporty_user", JSON.stringify(data.user));
      })
      .catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("sporty_token");
        localStorage.removeItem("sporty_user");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const persistAuth = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("sporty_token", data.token);
    localStorage.setItem("sporty_user", JSON.stringify(data.user));
  };

  const login = async (payload) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    persistAuth(data);
  };

  const signup = async (payload) => {
    const data = await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    persistAuth(data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("sporty_token");
    localStorage.removeItem("sporty_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, signup, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
