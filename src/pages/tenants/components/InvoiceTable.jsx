// src/components/tenant/InvoiceTable.jsx
import React from 'react';
import { Download } from 'lucide-react';
import { TenantStatusBadge } from './TenantStatusBadge';

export const InvoiceTable = ({ invoices }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm">
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Invoice #</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="py-3 px-4 text-sm">{invoice.date}</td>
                <td className="py-3 px-4 font-medium">${invoice.amount}</td>
                <td className="py-3 px-4">
                  <TenantStatusBadge status={invoice.status} />
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};