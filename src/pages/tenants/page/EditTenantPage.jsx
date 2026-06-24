// src/pages/tenant/EditTenantPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TenantForm } from '../components/TenantForm';
import { generateTenants } from '../tenantData';

export const EditTenantPage = () => {
  const [tenant] = useState(generateTenants(1)[0]);

  const handleSubmit = (data) => {
    console.log('Updated Tenant Data:', data);
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
        Back to Tenant Details
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Tenant</h1>
        <p className="text-gray-500 mb-6">Update the tenant information below</p>
        
        <TenantForm 
          onSubmit={handleSubmit} 
          initialData={tenant}
          submitLabel="Update Tenant" 
        />
      </div>
    </motion.div>
  );
};