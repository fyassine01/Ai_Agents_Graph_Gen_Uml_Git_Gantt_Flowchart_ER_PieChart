import React, { useState } from 'react';
import DeleteConfirmationModal from '../Common/DeleteConfirmationModal';

export default function ConversationHistory({ conversations, onSelect, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui";
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateDateString();
    }
  };

  const handleDeleteClick = (conversation) => {
    setConversationToDelete(conversation);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (conversationToDelete) {
      onDelete(conversationToDelete.id);
      setIsModalOpen(false);
      setConversationToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setConversationToDelete(null);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <p>Aucune conversation</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {conversations.map(conv => (
              <li 
                key={conv.id} 
                className="group flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
                onClick={() => onSelect(conv)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {conv.title || "Conversation sans titre"}
                  </p>
                  {conv.created_at && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(conv.created_at)}
                    </p>
                  )}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(conv); }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-150"
                  title="Supprimer la conversation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        conversationTitle={conversationToDelete?.title}
      />
    </>
  );
}