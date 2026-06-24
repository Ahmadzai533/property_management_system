// src/components/tenant/TenantStatusBadge.jsx
import React from 'react';

const statusConfig = {
  Active: { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  Inactive: { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  Pending: { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  Expired: { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
};

export const TenantStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.Inactive;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};