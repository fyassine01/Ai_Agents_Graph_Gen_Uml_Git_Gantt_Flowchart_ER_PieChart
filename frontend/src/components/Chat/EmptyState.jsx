import React from 'react';

const AnimatedDiagramIcon = () => (
  <div className="relative">
    {/* Icône principale avec effet de lueur */}
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-gray-700/30">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl animate-pulse"></div>
    </div>

    {/* Halo lumineux */}
    <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-indigo-500/20 rounded-full blur-lg sm:blur-xl animate-pulse"></div>

    {/* Particules flottantes */}
    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-3 h-2 sm:h-3 bg-blue-400 rounded-full animate-bounce"></div>
    <div className="absolute -bottom-1 -left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute top-1/2 -right-2 sm:-right-3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
  </div>
);

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <div
    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center mb-3 sm:mb-4">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-sm sm:text-base">{title}</h3>
    </div>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{description}</p>
  </div>
);

export default function EmptyState({ onNewConversation }) {
  const features = [
    {
      icon: <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
      title: "Génération Rapide",
      description: "Créez des diagrammes en quelques secondes avec l'IA"
    },
    {
      icon: <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>,
      title: "Export SVG",
      description: "Téléchargez vos diagrammes en SVG haute qualité"
    },
    {
      icon: <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
      title: "Code Mermaid",
      description: "Accédez au code source et personnalisez vos schémas"
    }
  ];

  const diagramTypes = [
    "Flowchart", "Sequence", "Class", "State", "ER", "Gantt", "Journey", "GitGraph"
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">

        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 2px, transparent 2px), radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-full text-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Icône animée */}
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <AnimatedDiagramIcon />
            </div>

            {/* Titre et description */}
            <div className="mb-10 sm:mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                Mermaid Diagram Generator
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                Décrivez simplement ce que vous voulez, et laissez l’IA générer le code Mermaid pour vous.
              </p>

              {/* Types de diagrammes supportés */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
                {diagramTypes.map((type, index) => (
                  <span
                    key={type}
                    className="px-3 py-1 text-xs sm:text-sm bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/30 backdrop-blur-sm"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Bouton principal */}
            <div className="mb-10 sm:mb-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <button
                onClick={onNewConversation}
                className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-base sm:text-lg"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span>Créer un nouveau diagramme</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12"></path>
                  </svg>
                </div>
              </button>
            </div>

            {/* Cartes de fonctionnalités */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  delay={1000 + index * 200}
                />
              ))}
            </div>

            {/* Section d’exemple */}
            <div className="mt-12 sm:mt-16 p-4 sm:p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700/30 animate-fade-in" style={{ animationDelay: '1400ms' }}>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Exemples d’utilisation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <div className="space-y-1 sm:space-y-2">
                  <p>• "Crée un flowchart pour le processus de commande"</p>
                  <p>• "Diagramme de séquence pour l’authentification"</p>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p>• "Schéma de base de données pour un e-commerce"</p>
                  <p>• "Gantt pour le planning d’un projet"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
