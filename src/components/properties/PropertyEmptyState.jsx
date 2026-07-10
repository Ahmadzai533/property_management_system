// src/components/properties/PropertyEmptyState.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus } from 'lucide-react';
import Button from '../common/Button';
import { useLocalization } from '../../hooks/useLocalization';

const PropertyEmptyState = ({ onAddProperty, title }) => {
  const { t } = useLocalization();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Building2 className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title || t('properties.empty.title', 'No properties found')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {t('properties.empty.description', 'Get started by adding your first property. You can manage all your properties from here.')}
      </p>
      <Button
        variant="primary"
        onClick={onAddProperty}
        className="gap-2"
      >
        <Plus className="h-5 w-5" />
        {t('properties.empty.addFirst', 'Add Your First Property')}
      </Button>
    </motion.div>
  );
};

export default PropertyEmptyState;