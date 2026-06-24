// src/components/tenant/TenantFilters.jsx
import React from 'react';
import { Search, X } from 'lucide-react';

export const TenantFilters = ({
  searchTerm,
  onSearch,
  statusFilter,
  onStatusFilter,
  propertyFilter,
  onPropertyFilter,
  unitFilter,
  onUnitFilter,
  properties,
  units,
  onReset
}) => {
  const statuses = ['Active', 'Inactive', 'Pending', 'Expired'];

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tenants by name or email..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilter(e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px]"
      >
        <option value="">All Status</option>
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <select
        value={propertyFilter}
        onChange={(e) => onPropertyFilter(e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px]"
      >
        <option value="">All Properties</option>
        {properties.map(property => (
          <option key={property} value={property}>{property}</option>
        ))}
      </select>

      <select
        value={unitFilter}
        onChange={(e) => onUnitFilter(e.target.value)}
        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px]"
      >
        <option value="">All Units</option>
        {units.map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <X className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
};