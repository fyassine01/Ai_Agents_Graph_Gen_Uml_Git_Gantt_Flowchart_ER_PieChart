import React from 'react';

export default function DiagramTypeSelector({ types, selected, onChange }) {
  const getIconForType = (type) => {
    if (type.includes('classe')) return '📊';
    if (type.includes('séquence')) return '⏱️';
    if (type.includes('Flowchart')) return '📈';
    if (type.includes('Gantt')) return '📅';
    if (type.includes('ER')) return '🔗';
    if (type.includes('Git')) return '🌿';
    if (type.includes('Pie')) return '🥧';
    return '📝';
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Type de Diagramme
      </label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="input-field appearance-none pr-10"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500">{getIconForType(selected)}</span>
        </div>
      </div>
    </div>
  );
}