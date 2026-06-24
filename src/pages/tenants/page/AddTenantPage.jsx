// src/pages/tenant/AddTenantPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TenantForm } from '../components/TenantForm';

export const AddTenantPage = () => {
  const handleSubmit = (data) => {
    console.log('New Tenant Data:', data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <button 
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tenants
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Tenant</h1>
        <p className="text-gray-500 mb-6">Fill in the details to add a new tenant to the system</p>
        
        <TenantForm onSubmit={handleSubmit} submitLabel="Add Tenant" />
      </div>
    </motion.div>
  );
};