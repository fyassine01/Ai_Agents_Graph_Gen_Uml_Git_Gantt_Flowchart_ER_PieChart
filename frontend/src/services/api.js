// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Cette fonction sera appelée par notre AuthContext
export const setAuthToken = (token) => {
  if (token) {
    // Appliquer le header d'autorisation à chaque requête si on est loggé
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Supprimer le header si on n'est pas loggé
    delete api.defaults.headers.common['Authorization'];
  }
};

// L'intercepteur est toujours utile pour les rechargements de page,
// mais setAuthToken gère la connexion/déconnexion en temps réel.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;