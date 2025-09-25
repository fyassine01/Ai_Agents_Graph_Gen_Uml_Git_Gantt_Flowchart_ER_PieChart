import React, { useState, useRef, useEffect } from 'react';

export default function MessageInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize du textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      // Reset la hauteur du textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickSuggestions = [
    "Crée un flowchart pour un processus de commande",
    "Diagramme de séquence pour l'authentification",
    "Schéma de base de données e-commerce",
    "Gantt pour un projet de 3 mois"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Suggestions rapides */}
      {!input && !isFocused && (
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2 self-center">
              Suggestions :
            </span>
            {quickSuggestions.slice(0, window.innerWidth < 768 ? 2 : 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full transition-colors duration-200 truncate max-w-48 sm:max-w-none"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zone de saisie principale */}
      <div className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className={`relative bg-gray-50 dark:bg-gray-700 rounded-2xl transition-all duration-200 ${
            isFocused ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}>
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Décrivez votre diagramme ou demandez une modification... (⏎ pour envoyer)"
              className="w-full px-4 py-3 pr-20 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
              rows="1"
              disabled={isLoading}
              style={{ 
                minHeight: '44px', 
                maxHeight: '120px',
                lineHeight: '1.5'
              }}
            />

            {/* Actions dans la zone de texte */}
            <div className="absolute right-2 bottom-2 flex items-center space-x-2">
              {/* Compteur de caractères */}
              {input.length > 0 && (
                <span className={`text-xs ${
                  input.length > 500 
                    ? 'text-red-500 dark:text-red-400' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {input.length}
                </span>
              )}

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  isLoading || !input.trim()
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                }`}
                title={isLoading ? "Génération en cours..." : "Envoyer le message"}
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Raccourcis clavier */}
          <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">⏎</kbd> Envoyer
              </span>
              <span className="hidden sm:inline">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Shift</kbd> + 
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs ml-1">⏎</kbd> Nouvelle ligne
              </span>
            </div>
            
            {/* Statut */}
            <div className="flex items-center space-x-2">
              {isLoading && (
                <div className="flex items-center text-blue-500 dark:text-blue-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  <span>Génération...</span>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Barre de progression pour le chargement */}
        {isLoading && (
          <div className="mt-3">
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-progress"></div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes loading-progress {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-loading-progress {
            animation: loading-progress 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}