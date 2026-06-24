// src/components/tenant/TenantTableRow.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TenantStatusBadge } from './TenantStatusBadge';
import { TenantActionsDropdown } from './TenantActionsDropdown';

export const TenantTableRow = ({ tenant, index }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <img 
            src={tenant.avatar} 
            alt={tenant.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium text-gray-900">{tenant.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-gray-600">{tenant.email}</td>
      <td className="py-3 px-4 text-gray-600">{tenant.phone}</td>
      <td className="py-3 px-4 text-gray-600">{tenant.property}</td>
      <td className="py-3 px-4 text-gray-600">{tenant.unit}</td>
      <td className="py-3 px-4 text-gray-600">
        <div className="text-sm">
          <div>{tenant.leaseStart}</div>
          <div className="text-gray-400">to {tenant.leaseEnd}</div>
        </div>
      </td>
      <td className="py-3 px-4 font-medium text-gray-900">${tenant.monthlyRent.toLocaleString()}</td>
      <td className="py-3 px-4">
        <TenantStatusBadge status={tenant.status} />
      </td>
      <td className="py-3 px-4">
        <TenantActionsDropdown tenantId={tenant.id} />
      </td>
    </motion.tr>
  );
};