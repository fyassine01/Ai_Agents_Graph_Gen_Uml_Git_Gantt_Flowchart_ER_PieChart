import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Spinner principal avec effet de gradient */}
      <div className="relative mb-4">
        {/* Cercle externe qui tourne */}
        <div className="w-12 h-12 border-4 border-gray-700 rounded-full animate-spin">
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Cercle interne qui pulse */}
        <div className="absolute inset-2 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
        
        {/* Point central */}
        <div className="absolute inset-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>

      {/* Texte animé */}
      <div className="text-center">
        <p className="text-gray-300 font-medium mb-2">Génération en cours...</p>
        
        {/* Points de chargement animés */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>

      {/* Barre de progression stylisée */}
      <div className="w-48 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar"></div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}