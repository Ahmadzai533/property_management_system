// src/components/tenant/LeaseInformationCard.jsx
import React from 'react';
import { Calendar, FileText, Clock } from 'lucide-react';

export const LeaseInformationCard = ({ tenant }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Lease Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Lease Number</p>
            <p className="font-medium text-gray-900">{tenant.leaseNumber}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Lease Period</p>
            <p className="font-medium text-gray-900">{tenant.leaseStart} - {tenant.leaseEnd}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Contract Duration</p>
            <p className="font-medium text-gray-900">{tenant.contractDuration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};