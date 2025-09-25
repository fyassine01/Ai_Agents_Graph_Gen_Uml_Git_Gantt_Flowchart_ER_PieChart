// src/components/Sidebar/Sidebar.jsx

import React from 'react';
import ConversationHistory from './ConversationHistory'; 
import DiagramTypeSelector from './DiagramTypeSelector';

export default function Sidebar({ 
  conversations, 
  activeConversationId,
  onSelectConversation, 
  onNewConversation, 
  diagramTypes, 
  selectedType, 
  onTypeChange,
  onDeleteConversation,
  isOpen,
  onClose
}) {
  // Classes CSS pour gérer l'affichage fixe et coulissant sur mobile, 
  // et l'affichage relatif (statique) sur les plus grands écrans.
  const sidebarClasses = `
    w-80 bg-gray-50 dark:bg-gray-900 flex flex-col border-r border-gray-200 dark:border-gray-700 h-full
    transform transition-transform duration-300 ease-in-out
    md:relative md:translate-x-0
    fixed inset-y-0 left-0 z-40
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Fond sombre semi-transparent qui s'affiche derrière la sidebar sur mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="p-6 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mermaid Gen</h1>
            </div>
            {/* Bouton pour fermer la sidebar sur mobile */}
            <button onClick={onClose} className="md:hidden p-2 text-gray-500 hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div className="flex-shrink-0">
            <button 
              onClick={onNewConversation}
              className="btn-primary w-full mb-6 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Nouvelle Conversation
            </button>
            
            <DiagramTypeSelector 
              types={diagramTypes}
              selected={selectedType}
              onChange={onTypeChange}
            />
          </div>
          
          <div className="mt-6 flex flex-col flex-1 overflow-hidden">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex-shrink-0">
              Historique
            </h2>
            <ConversationHistory 
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
            />
          </div>
        </div>
      </aside>
    </>
  );
}