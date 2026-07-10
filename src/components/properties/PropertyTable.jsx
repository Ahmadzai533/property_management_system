// src/components/properties/PropertyTable.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Archive, 
  Trash2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import PropertyStatusBadge from './PropertyStatusBadge';
import { useLocalization } from '../../hooks/useLocalization';

const PropertyTable = ({ 
  properties = [], 
  onSelect, 
  onRowClick,
  onEdit,
  onDelete,
  onArchive,
  onView,
  isLoading = false 
}) => {
  const { t } = useLocalization();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(properties.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedIds.length === properties.length}
                onChange={handleSelectAll}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('properties.table.property', 'Property')}
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center gap-1">
                ID
                {sortField === 'id' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('properties.table.type', 'Type')}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('properties.table.address', 'Address')}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('properties.table.units', 'Units')}
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => handleSort('revenue')}
            >
              <div className="flex items-center gap-1">
                {t('properties.table.revenue', 'Revenue')}
                {sortField === 'revenue' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('properties.table.status', 'Status')}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('properties.table.actions', 'Actions')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {properties.map((property, index) => (
            <motion.tr
              key={property.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(property.id)}
            >
              <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(property.id)}
                  onChange={() => handleSelect(property.id)}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                    <img 
                      src={property.image || '/api/placeholder/64/48'} 
                      alt={property.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{property.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{property.occupancy}% {t('properties.occupied', 'Occupied')}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                #{property.id.slice(0, 8)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                {property.type}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                {property.address}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                {property.units}
              </td>
              <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(property.revenue)}
              </td>
              <td className="px-4 py-4">
                <PropertyStatusBadge status={property.status} />
              </td>
              <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onView?.(property.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                    title={t('common.view', 'View')}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit?.(property.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                    title={t('common.edit', 'Edit')}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onArchive?.(property.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                    title={t('common.archive', 'Archive')}
                  >
                    <Archive className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete?.(property.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
                    title={t('common.delete', 'Delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;