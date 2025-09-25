import React, { useEffect, useRef } from 'react';
import DiagramViewer from './DiagramViewer';
import LoadingSpinner from '../Common/LoadingSpinner';

const AssistantMessage = ({ message, index }) => {
  const [showCode, setShowCode] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.mermaid_code);
    
    // Notification moderne avec animation
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center transform transition-all duration-300 translate-y-0';
    notification.innerHTML = `
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      Code copié dans le presse-papiers !
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    requestAnimationFrame(() => {
      notification.style.transform = 'translateY(-8px)';
    });
    
    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      {/* En-tête du message assistant */}
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <div className="ml-3">
          <span className="text-sm font-semibold text-gray-200">Assistant IA</span>
          <div className="text-xs text-gray-400 flex items-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            En ligne
          </div>
        </div>
      </div>

      {/* Contenu du message */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <div className="p-6">
          <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-[15px]">{message.content}</p>
          
          {message.mermaid_code && (
            <>
              {/* Diagramme */}
              <div className="mt-6">
                <DiagramViewer 
                  code={message.mermaid_code} 
                  id={`msg-${index}`}
                />
              </div>

              {/* Barre d'actions */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowCode(!showCode)}
                      className="group inline-flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
                    >
                      <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                      {showCode ? "Masquer le code" : "Voir le code"}
                    </button>
                    
                    <button 
                      onClick={copyToClipboard}
                      className="group inline-flex items-center px-4 py-2 bg-gray-700/50 hover:bg-emerald-600/20 text-gray-300 hover:text-emerald-300 rounded-xl font-medium transition-all duration-200 border border-gray-600/30 hover:border-emerald-500/30"
                    >
                      <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                      Copier le code
                    </button>
                  </div>

                  {/* Indicateur de longueur du code */}
                  <div className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                    {message.mermaid_code.split('\n').length} lignes
                  </div>
                </div>
              </div>

              {/* Affichage du code source */}
              {showCode && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-700/50">
                  <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-medium">Code Mermaid</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-900/80">
                    <pre className="text-sm text-emerald-400 overflow-x-auto font-mono leading-relaxed">
                      <code>{message.mermaid_code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const UserMessage = ({ message }) => (
  <div className="max-w-3xl ml-auto animate-fade-in">
    {/* En-tête du message utilisateur */}
    <div className="flex items-center justify-end mb-3">
      <div className="mr-3 text-right">
        <span className="text-sm font-semibold text-gray-200">Vous</span>
        <div className="text-xs text-gray-400 mt-1">
          {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      </div>
    </div>

    {/* Contenu du message */}
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl border border-indigo-500/20">
      <div className="p-6">
        <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{message.content}</p>
      </div>
    </div>
  </div>
);

export default function MessageList({ messages, isLoading }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Arrière-plan avec motif */}
      <div className="min-h-full bg-transparent dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
        {/* Motif de fond subtil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative z-10 p-8 space-y-8">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-gray-700/30">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Prêt à créer des diagrammes</h3>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Décrivez le diagramme que vous souhaitez créer et je le génèrerai pour vous avec Mermaid
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'user' ? (
                <UserMessage message={message} />
              ) : (
                <AssistantMessage message={message} index={index} />
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="max-w-4xl">
                {/* En-tête du message assistant en cours de chargement */}
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-semibold text-gray-200">Assistant IA</span>
                    <div className="text-xs text-gray-400 flex items-center mt-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                      Génération en cours...
                    </div>
                  </div>
                </div>

                {/* Contenu du message de chargement */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl">
                  <div className="p-6">
                    <LoadingSpinner />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </div>
  );
}