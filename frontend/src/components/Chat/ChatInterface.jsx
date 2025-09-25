import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import api from '../../services/api';

export default function ChatInterface({ conversation, onNewMessage, diagramType }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMessages(conversation ? conversation.messages : []);
    setError(null); // Reset error when conversation changes
  }, [conversation]);

  const handleSendMessage = async (userMessage) => {
    setIsLoading(true);
    setError(null);
    
    // Ajouter immédiatement le message utilisateur à l'interface
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const payload = {
        conversation_id: conversation ? conversation.id : null,
        user_message: userMessage,
        diagram_type: diagramType,
      };
      
      const { data } = await api.post('/diagrams/generate', payload);
      onNewMessage(data); // Notifie le parent pour mettre à jour la conversation
      setMessages(data.full_history);

    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      
      // Gestion des erreurs plus détaillée
      let errorMessage = "Une erreur s'est produite lors de la génération du diagramme.";
      
      if (error.response?.status === 429) {
        errorMessage = "Trop de requêtes. Veuillez patienter avant de réessayer.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Erreur du serveur. Veuillez réessayer dans quelques instants.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (!navigator.onLine) {
        errorMessage = "Pas de connexion internet. Vérifiez votre connexion.";
      }

      setError(errorMessage);
      
      // Retirer le message utilisateur en cas d'erreur
      setMessages(prev => prev.slice(0, -1));
      
      // Afficher une notification d'erreur
      showErrorNotification(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  const showErrorNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 max-w-md transform transition-all duration-300 translate-x-0';
    notification.innerHTML = `
      <div class="flex items-start">
        <svg class="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h4 class="font-semibold mb-1">Erreur</h4>
          <p class="text-sm opacity-90">${message}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/70 hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(-8px)';
    });
    
    // Suppression automatique après 5 secondes
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  };

  const retryLastMessage = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
      if (lastUserMessage) {
        handleSendMessage(lastUserMessage.content);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Arrière-plan avec effets visuels */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Barre d'erreur si nécessaire */}
        {error && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-red-300 text-sm">{error}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={retryLastMessage}
                className="text-red-300 hover:text-red-200 text-sm px-3 py-1 bg-red-500/20 rounded-lg transition-colors"
              >
                Réessayer
              </button>
              <button
                onClick={() => setError(null)}
                className="text-red-300 hover:text-red-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Zone des messages */}
        <MessageList messages={messages} isLoading={isLoading} />
        
        {/* Zone de saisie */}
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}