// src/components/tenant/PaymentHistoryTable.jsx
import React from 'react';
import { DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { TenantStatusBadge } from './TenantStatusBadge';

export const PaymentHistoryTable = ({ payments }) => {
  const summary = {
    total: payments.reduce((acc, p) => acc + p.amount, 0),
    paid: payments.filter(p => p.status === 'Paid').length,
    pending: payments.filter(p => p.status === 'Pending').length,
    overdue: payments.filter(p => p.status === 'Overdue').length
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-600">Total Payments</p>
          <p className="text-xl font-bold text-blue-900">${summary.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-green-600">Paid</p>
          <p className="text-xl font-bold text-green-900">{summary.paid}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-xl font-bold text-yellow-900">{summary.pending}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm text-red-600">Overdue</p>
          <p className="text-xl font-bold text-red-900">{summary.overdue}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Method</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{payment.date}</td>
                <td className="py-3 px-4 font-medium">${payment.amount}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{payment.method}</td>
                <td className="py-3 px-4">
                  <TenantStatusBadge status={payment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};