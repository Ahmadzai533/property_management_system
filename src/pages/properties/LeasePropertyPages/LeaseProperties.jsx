// src/pages/properties/LeaseProperties.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Eye, Edit, Home, List, LayoutGrid, Calendar, Users, DollarSign, Shield, Repeat } from 'lucide-react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import PropertyStats from '../../../components/properties/PropertyStats';
import PropertyToolbar from '../../../components/properties/PropertyToolbar';
import PropertyTable from '../../../components/properties/PropertyTable';
import PropertyPagination from '../../../components/properties/PropertyPagination';
import PropertyBulkActions from '../../../components/properties/PropertyBulkActions';
import PropertyEmptyState from '../../../components/properties/PropertyEmptyState';
import { useLeaseProperties } from '../../../hooks/useLeaseProperties';

const LeaseProperties = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  
  const { properties, loading, stats, total } = useLeaseProperties({
    page: currentPage,
    pageSize,
    search: searchQuery,
    filters,
  });

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    if (key === 'reset') {
      setFilters({});
    } else {
      setFilters(prev => ({ ...prev, [key]: value === 'All' ? undefined : value }));
    }
    setCurrentPage(1);
  }, []);

  const handleViewChange = useCallback((view) => {
    setViewMode(view);
  }, []);

  const handleAddLease = useCallback(() => {
    navigate('/properties/lease/add');
  }, [navigate]);

  const handleViewLease = useCallback((id) => {
    navigate(`/properties/lease/${id}`);
  }, [navigate]);

  const handleEditLease = useCallback((id) => {
    navigate(`/properties/lease/edit/${id}`);
  }, [navigate]);

  const handleDeleteLease = useCallback((id) => {
    console.log('Delete lease:', id);
  }, []);

  const handleArchiveLease = useCallback((id) => {
    console.log('Archive lease:', id);
  }, []);

  const handleExport = useCallback(() => {
    console.log('Export leases');
  }, []);

  const handleRefresh = useCallback(() => {
    console.log('Refresh leases');
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleBulkAction = useCallback((action) => {
    console.log(`Bulk action: ${action} for ${selectedIds.length} items`);
    setSelectedIds([]);
  }, [selectedIds]);

  const breadcrumbItems = useMemo(() => [
    { label: 'Dashboard', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Lease Properties', path: '/properties/lease', active: true },
  ], []);

  const firstLeaseId = properties.length > 0 ? properties[0].id : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-2 sm:px-2 lg:px-2">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Lease Properties</h1>
                <p className="text-white/80 mt-0.5">Manage and monitor all lease agreements across your portfolio</p>
              </div>
            </div>
            
            <button
              onClick={handleAddLease}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Lease
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/20">
            <button
              onClick={() => navigate('/properties/lease')}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
            >
              <Home className="h-4 w-4" />
              All Leases
            </button>
            <button
              onClick={() => navigate('/properties/lease/add')}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
            {firstLeaseId && (
              <>
                <button
                  onClick={() => navigate(`/properties/lease/${firstLeaseId}`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
                >
                  <Eye className="h-4 w-4" />
                  View First
                </button>
                <button
                  onClick={() => navigate(`/properties/lease/edit/${firstLeaseId}`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
                >
                  <Edit className="h-4 w-4" />
                  Edit First
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4 mt-4">
          <PropertyStats stats={stats} />
          
          <PropertyToolbar
            onSearch={handleSearch}
            onViewChange={handleViewChange}
            viewMode={viewMode}
            onExport={handleExport}
            onRefresh={handleRefresh}
            totalResults={total}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <PropertyEmptyState 
                onAddProperty={handleAddLease} 
                title="No lease properties found"
              />
            ) : (
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {viewMode === 'table' ? (
                  <PropertyTable
                    properties={properties}
                    onRowClick={handleViewLease}
                    onEdit={handleEditLease}
                    onDelete={handleDeleteLease}
                    onArchive={handleArchiveLease}
                    onView={handleViewLease}
                    isLoading={loading}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {properties.map((property) => (
                      <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
                        <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{property.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{property.tenant}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">${property.monthlyRent}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            property.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                            property.status === 'Expired' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                            property.status === 'Expiring Soon' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {properties.length > 0 && (
            <PropertyPagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / pageSize)}
              pageSize={pageSize}
              totalItems={total}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </div>
      
      <PropertyBulkActions
        selectedCount={selectedIds.length}
        onArchive={() => handleBulkAction('archive')}
        onDelete={() => handleBulkAction('delete')}
        onExport={() => handleBulkAction('export')}
        onEmail={() => handleBulkAction('email')}
        onEdit={() => handleBulkAction('edit')}
        onClear={() => setSelectedIds([])}
        totalItems={total}
      />
    </div>
  );
};

export default LeaseProperties;