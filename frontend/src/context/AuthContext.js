// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setAuthToken } from '../services/api';
import * as authService from '../services/auth'; // Importe les services

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Vérifier si le token n'est pas expiré (simplifié)
        if (decoded.exp * 1000 > Date.now()) {
          setAuthToken(token); // 2. Appliquer le token au démarrage
          setUser({ email: decoded.sub });
        } else {
          // Token expiré, on nettoie
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Token invalide:", error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await authService.loginUser(email, password); // Utilise le service
    localStorage.setItem('token', data.access_token);
    setAuthToken(data.access_token);
    const decoded = jwtDecode(data.access_token);
    setUser({ email: decoded.sub });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null); // 4. Retirer le token IMMÉDIATEMENT après déconnexion
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};