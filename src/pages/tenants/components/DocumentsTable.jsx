// src/components/tenant/DocumentsTable.jsx
import React from 'react';
import { FileText, Image, File, Download } from 'lucide-react';

export const DocumentsTable = ({ documents }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'PDF': return FileText;
      case 'Image': return Image;
      default: return File;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc, index) => {
          const Icon = getIcon(doc.type);
          return (
            <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};