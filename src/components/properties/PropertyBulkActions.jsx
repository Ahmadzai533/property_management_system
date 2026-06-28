// src/components/properties/PropertyBulkActions.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Archive, 
  Trash2, 
  Download, 
  Mail,
  X,
  Edit
} from 'lucide-react';
import Button from '../common/Button';

const PropertyBulkActions = ({
  selectedCount = 0,
  onArchive,
  onDelete,
  onExport,
  onEmail,
  onEdit,
  onClear,
  totalItems = 0
}) => {
  if (selectedCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <CheckSquare className="h-5 w-5 text-blue-500" />
            <span>
              <span className="font-semibold">{selectedCount}</span> selected
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">{totalItems} total</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              title="Edit selected"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={onArchive}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              title="Archive selected"
            >
              <Archive className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
              title="Delete selected"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onExport}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              title="Export selected"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={onEmail}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              title="Email selected"
            >
              <Mail className="h-4 w-4" />
            </button>
          </div>
          
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
          
          <button
            onClick={onClear}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
            title="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyBulkActions;