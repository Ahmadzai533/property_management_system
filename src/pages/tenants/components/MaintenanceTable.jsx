// src/components/tenant/MaintenanceTable.jsx
import React from 'react';
import { TenantStatusBadge } from './TenantStatusBadge';

export const MaintenanceTable = ({ requests }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Requests</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Request</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Priority</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{request.title}</td>
                <td className="py-3 px-4 text-sm">{request.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <TenantStatusBadge status={request.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};