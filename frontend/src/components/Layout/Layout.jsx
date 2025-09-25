// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ChatInterface from '../Chat/ChatInterface';
import Header from './Header';
import EmptyState from '../Chat/EmptyState';
import { useChat } from '../../hooks/useChat';

const DIAGRAM_TYPES = [
    "Flowchart", "UML - Diagramme de séquence", "UML - Diagramme de classe", 
    "ER Diagram", "Gantt", "Git Graph", "Pie Chart"
];

export default function Layout() {
  const { 
    conversations, 
    activeConversation, 
    selectConversation, 
    createNewConversation, 
    handleNewMessage,
    deleteConversation 
  } = useChat();
  
  const [diagramType, setDiagramType] = useState(DIAGRAM_TYPES[0]);
  
  // NOUVEAU: État pour la visibilité de la sidebar sur mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans overflow-hidden">
      {/* MODIFIÉ: On passe les props pour gérer l'état de la sidebar */}
      <Sidebar 
        conversations={conversations} 
        activeConversationId={activeConversation?.id}
        onSelectConversation={(conv) => {
          selectConversation(conv);
          setSidebarOpen(false); // Ferme la sidebar après sélection sur mobile
        }}
        onNewConversation={() => {
          createNewConversation();
          setSidebarOpen(false); // Ferme la sidebar après création sur mobile
        }}
        diagramTypes={DIAGRAM_TYPES}
        selectedType={diagramType}
        onTypeChange={setDiagramType}
        onDeleteConversation={deleteConversation}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col bg-gray-800 transition-all duration-300">
        {/* MODIFIÉ: On passe une fonction pour basculer la sidebar */}
        <Header 
          conversationTitle={activeConversation?.title} 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 overflow-hidden">
          {activeConversation || activeConversation === null ? (
            <ChatInterface
              key={activeConversation ? activeConversation.id : 'new'}
              conversation={activeConversation}
              onNewMessage={handleNewMessage}
              diagramType={diagramType}
            />
          ) : (
            <EmptyState onNewConversation={createNewConversation} />
          )}
        </div>
      </main>
    </div>
  );
}