// src/components/tenant/TenantProfileCard.jsx
import React from 'react';
import { Mail, Phone, MapPin, User, AlertCircle } from 'lucide-react';
import { TenantStatusBadge } from './TenantStatusBadge';

export const TenantProfileCard = ({ tenant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
      <div className="text-center">
        <img 
          src={tenant.avatar} 
          alt={tenant.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
        />
        <h2 className="text-xl font-bold text-gray-900">{tenant.name}</h2>
        <div className="mt-2">
          <TenantStatusBadge status={tenant.status} />
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{tenant.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{tenant.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{tenant.city}, {tenant.country}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">ID: {tenant.nationalId}</span>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Emergency Contact</h4>
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-gray-900">{tenant.emergencyContact.name}</p>
          <p className="text-sm text-gray-600">{tenant.emergencyContact.relationship}</p>
          <p className="text-sm text-gray-600">{tenant.emergencyContact.phone}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Lease Expires</p>
              <p className="text-sm text-blue-700">{tenant.leaseEnd}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};