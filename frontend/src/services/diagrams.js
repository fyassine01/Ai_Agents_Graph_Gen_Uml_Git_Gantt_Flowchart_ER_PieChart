// src/services/diagrams.js
import api from './api';

export const fetchAllConversations = () => {
  return api.get('/conversations/');
};

export const generateNewDiagram = (payload) => {
  return api.post('/diagrams/generate', payload);
};

export const getConversationById = (id) => {
    return api.get(`/conversations/${id}`);
}
export const deleteConversation = (id) => {
  return api.delete(`/conversations/${id}`);
};