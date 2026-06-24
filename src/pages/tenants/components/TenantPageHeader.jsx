// src/components/tenant/TenantPageHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const TenantPageHeader = ({ title, actions = [] }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">Tenant Management</span>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          {title}
        </motion.h1>
        
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  action.variant === 'primary' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {action.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};