// src/components/tenant/TenantActionsDropdown.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Eye, Edit, Trash2, FileText } from 'lucide-react';

export const TenantActionsDropdown = ({ tenantId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: 'View Details', icon: Eye, onClick: () => console.log('View', tenantId) },
    { label: 'Edit Tenant', icon: Edit, onClick: () => console.log('Edit', tenantId) },
    { label: 'Delete Tenant', icon: Trash2, onClick: () => console.log('Delete', tenantId), danger: true },
    { label: 'Download Agreement', icon: FileText, onClick: () => console.log('Download', tenantId) }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
          >
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  action.danger ? 'text-red-600' : 'text-gray-700'
                }`}
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};