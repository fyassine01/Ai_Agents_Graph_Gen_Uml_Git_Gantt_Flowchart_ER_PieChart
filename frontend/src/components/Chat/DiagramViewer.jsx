import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';

// Configuration globale de Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'monospace'
});

let diagramCounter = 0;

export default function DiagramViewer({ code }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagramId] = useState(() => `diagram-${Date.now()}-${diagramCounter++}`);

  const renderDiagram = useCallback(async () => {
    if (!containerRef.current || !code || !code.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      containerRef.current.innerHTML = '';
      const uniqueId = `${diagramId}-${Date.now()}`;

      // Vérifier le type Mermaid
      /*
      if (!code.trim().match(/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|gitgraph|mindmap|timeline|sankey|block|packet)/)) {
        throw new Error('Le code doit commencer par un type de diagramme valide (graph, flowchart, sequenceDiagram, etc.)');
      }
      */
      const renderResult = await mermaid.render(uniqueId, code.trim());

      if (renderResult?.svg && containerRef.current) {
        containerRef.current.innerHTML = renderResult.svg;

        const svg = containerRef.current.querySelector('svg');
        if (svg) {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
          svg.style.maxWidth = '100%';
          svg.style.height = 'auto';
          svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

          if (!svg.getAttribute('viewBox')) {
            const bbox = svg.getBBox();
            svg.setAttribute('viewBox', `0 0 ${bbox.width || 100} ${bbox.height || 100}`);
          }
        }
      }
    } catch (err) {
      console.error('Erreur lors du rendu Mermaid:', err);
      setError(err.message || 'Erreur de syntaxe dans le diagramme Mermaid');
      if (containerRef.current) containerRef.current.innerHTML = '';
    } finally {
      setIsLoading(false);
    }
  }, [code, diagramId]);

  useEffect(() => {
    const timer = setTimeout(() => renderDiagram(), 100);
    return () => clearTimeout(timer);
  }, [renderDiagram]);

  useEffect(() => {
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  const handleDownloadSVG = () => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;

    const clone = svg.cloneNode(true);
    const bbox = svg.getBBox();

    const margin = 20;
    const totalWidth = bbox.width + margin * 2;
    const totalHeight = bbox.height + margin * 2;
    const offsetX = margin - bbox.x;
    const offsetY = margin - bbox.y;

    clone.setAttribute('width', totalWidth);
    clone.setAttribute('height', totalHeight);
    clone.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);

    // envelopper le contenu pour appliquer translate
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    while (clone.firstChild) {
      g.appendChild(clone.firstChild);
    }
    g.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
    clone.appendChild(g);

    if (!clone.getAttribute('xmlns')) {
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    const title = document.createElement('title');
    title.textContent = 'Generated Diagram';
    clone.insertBefore(title, clone.firstChild);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clone);

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `diagram-${new Date().toISOString().slice(0, 19)}.svg`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-400">Génération du diagramme...</span>
        </div>
      )}

      {/* Erreurs */}
      {error && !isLoading && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 m-2 w-full">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <strong className="text-red-400">Erreur de syntaxe Mermaid</strong>
          </div>
          <p className="text-red-300 mt-2 text-sm whitespace-pre-wrap">{error}</p>
          <details className="mt-2">
            <summary className="text-red-300 text-xs cursor-pointer hover:text-red-200">Code source</summary>
            <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded mt-1 overflow-x-auto">{code}</pre>
          </details>
        </div>
      )}

      {/* Diagramme centré */}
      <div
        ref={containerRef}
        className={`mermaid-container flex justify-center items-center w-full min-h-[100px] ${
          isLoading ? 'hidden' : ''
        } ${error ? 'hidden' : ''}`}
        style={{ backgroundColor: 'transparent' }}
      />

      {/* Bouton export */}
      {!isLoading && !error && code && (
        <button
          onClick={handleDownloadSVG}
          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow hover:opacity-90 transition"
        >
          Télécharger SVG
        </button>
      )}

      {/* Pas de code */}
      {!code && !isLoading && !error && (
        <div className="flex justify-center items-center p-8 text-gray-500">
          <svg className="w-12 h-12 mr-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span>Aucun diagramme à afficher</span>
        </div>
      )}
    </div>
  );
}
