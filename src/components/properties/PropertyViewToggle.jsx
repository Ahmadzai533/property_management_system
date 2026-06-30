// src/components/properties/PropertyViewToggle.jsx
import React from 'react';
import { LayoutGrid, List, Grid } from 'lucide-react';  // Changed from Grid3x3

const PropertyViewToggle = ({ view, onChange }) => {
  const views = [
    { id: 'table', icon: List, label: 'Table View' },
    { id: 'grid', icon: LayoutGrid, label: 'Grid View' },  // Changed from Grid3x3
    { id: 'compact', icon: Grid, label: 'Compact View' },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {views.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`p-2 rounded-lg transition-all ${
            view === id
              ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};

export default PropertyViewToggle;