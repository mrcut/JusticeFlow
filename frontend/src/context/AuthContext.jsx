import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Création du contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔹 Récupération du token et user depuis localStorage
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔹 Fonction pour la connexion
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response.data.error };
    }
  };

  // 🔹 Fonction pour la déconnexion
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
