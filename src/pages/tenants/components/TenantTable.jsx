// src/components/tenant/TenantTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TenantTableRow } from './TenantTableRow';

export const TenantTable = ({ tenants }) => {
  if (tenants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No tenants found</div>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Lease Period</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant, index) => (
            <TenantTableRow key={tenant.id} tenant={tenant} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};