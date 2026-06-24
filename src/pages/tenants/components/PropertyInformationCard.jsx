// src/components/tenant/PropertyInformationCard.jsx
import React from 'react';
import { Building2, Home, MapPin, Hash } from 'lucide-react';

export const PropertyInformationCard = ({ tenant }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Property</p>
            <p className="font-medium text-gray-900">{tenant.property}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Home className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Unit</p>
            <p className="font-medium text-gray-900">{tenant.unit}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Hash className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Floor</p>
            <p className="font-medium text-gray-900">Floor {tenant.floor}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-900">{tenant.streetAddress}, {tenant.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};