// src/components/properties/PropertyHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Filter, RefreshCw } from 'lucide-react';
import Button from '../common/Button';

const PropertyHeader = ({ 
  title = 'Own Properties',
  description = 'Manage and monitor your entire property portfolio',
  onAddProperty,
  onExport,
  onRefresh,
  onFilter,
  totalProperties = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description} • <span className="font-medium">{totalProperties}</span> properties
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="gap-2"
          aria-label="Refresh properties"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onFilter}
          className="gap-2"
          aria-label="Filter properties"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="gap-2"
          aria-label="Export properties"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        
        <Button
          variant="primary"
          size="sm"
          onClick={onAddProperty}
          className="gap-2"
          aria-label="Add new property"
        >
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyHeader;