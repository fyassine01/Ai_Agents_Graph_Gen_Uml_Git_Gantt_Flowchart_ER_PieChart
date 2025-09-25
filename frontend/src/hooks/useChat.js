// src/hooks/useChat.js
import { useState, useEffect } from 'react';
import * as diagramService from '../services/diagrams';
import { useAuth } from './useAuth';

export const useChat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  
  useEffect(() => {
    const loadConversations = async () => {
      if (user) {
        try {
          const { data } = await diagramService.fetchAllConversations();
          setConversations(data);
        } catch (error) {
          console.error("Impossible de charger les conversations", error);
        }
      }
    };
    loadConversations();
  }, [user]);

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const createNewConversation = () => {
    setActiveConversation(null);
  };

  const handleNewMessage = (updatedData) => {
    // Logique de mise à jour des conversations
    const { conversation_id, full_history } = updatedData;
    
    setActiveConversation({ id: conversation_id, messages: full_history });
    
    const convIndex = conversations.findIndex(c => c.id === conversation_id);
    if (convIndex > -1) {
      const updatedList = [...conversations];
      updatedList[convIndex].messages = full_history;
      setConversations(updatedList);
    } else {
      diagramService.getConversationById(conversation_id).then(res => {
        setConversations(prev => [res.data, ...prev]);
      });
    }
  };

  const deleteConversation = async (id) => {
    try {
        await diagramService.deleteConversation(id);
        setConversations(prev => prev.filter(c => c.id !== id));
        if (activeConversation?.id === id) {
            setActiveConversation(null);
        }
    } catch (error) {
        console.error("Erreur lors de la suppression", error);
    }
};

  return {
    conversations,
    activeConversation,
    selectConversation,
    createNewConversation,
    handleNewMessage,
    deleteConversation,
  };
};



