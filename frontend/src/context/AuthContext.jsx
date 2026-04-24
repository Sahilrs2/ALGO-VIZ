import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app startup, verify the stored token with the backend
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Verify token with the backend
        const response = await axios.get(`${BASE_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUser(response.data.user);
        setToken(storedToken);
      } catch (error) {
        // Token is invalid or expired — clear it
        console.warn("Stored token is invalid, clearing...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { user: loggedInUser, token: authToken } = response.data;
      setUser(loggedInUser);
      setToken(authToken);
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const signup = async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      const { user: newUser, token: authToken } = response.data;
      setUser(newUser);
      setToken(authToken);
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      throw new Error(error.response?.data?.error || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
