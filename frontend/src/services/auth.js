// src/services/auth.js
import api from './api';

export const loginUser = (email, password) => {
  return api.post('/auth/token', new URLSearchParams({
    username: email,
    password: password,
  }));
};

export const registerUser = (email, password) => {
  return api.post('/auth/register', { email, password });
};