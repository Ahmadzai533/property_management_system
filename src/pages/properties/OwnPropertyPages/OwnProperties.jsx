// src/pages/properties/OwnProperties.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Eye, Edit, FileText, Home, List, LayoutGrid } from 'lucide-react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import PropertyStats from '../../../components/properties/PropertyStats';
import PropertyToolbar from '../../../components/properties/PropertyToolbar';
import PropertyTable from '../../../components/properties/PropertyTable';
import PropertyPagination from '../../../components/properties/PropertyPagination';
import PropertyBulkActions from '../../../components/properties/PropertyBulkActions';
import PropertyEmptyState from '../../../components/properties/PropertyEmptyState';
import { useProperties } from '../../../hooks/useProperties';

const OwnProperties = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  
  const { properties, loading, stats, total } = useProperties({
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

  const handleAddProperty = useCallback(() => {
    navigate('/properties/add');
  }, [navigate]);

  const handleViewProperty = useCallback((id) => {
    navigate(`/properties/${id}`);
  }, [navigate]);

  const handleEditProperty = useCallback((id) => {
    navigate(`/properties/edit/${id}`);
  }, [navigate]);

  const handleDeleteProperty = useCallback((id) => {
    console.log('Delete property:', id);
  }, []);

  const handleArchiveProperty = useCallback((id) => {
    console.log('Archive property:', id);
  }, []);

  const handleExport = useCallback(() => {
    console.log('Export properties');
  }, []);

  const handleRefresh = useCallback(() => {
    console.log('Refresh properties');
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
    { label: 'Own Properties', path: '/properties/own', active: true },
  ], []);

  const firstPropertyId = properties.length > 0 ? properties[0].id : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-2 sm:px-2 lg:px-2  "> {/* Reduced pt-6 to pt-2, kept px-4 */}
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]"> {/* Reduced p-6 to p-5 */}
          {/* Breadcrumb inside gradient */}
           {/* Reduced mb-4 to mb-3 */}
            <Breadcrumb white={true} />
          
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"> {/* Reduced gap-4 to gap-3 */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Own Properties</h1>
                <p className="text-white/80 mt-0.5">Manage and monitor your entire property portfolio</p> {/* Reduced mt-1 to mt-0.5 */}
              </div>
            </div>
            
            <button
              onClick={handleAddProperty}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/20"> {/* Reduced mt-4 to mt-3, pt-4 to pt-3 */}
            <button
              onClick={() => navigate('/properties/own')}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
            >
              <Home className="h-4 w-4" />
              All Properties
            </button>
            <button
              onClick={() => navigate('/properties/add')}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
            <button
              onClick={() => navigate('/properties/listed')}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
            >
              <List className="h-4 w-4" />
              Listed Properties
            </button>
            {firstPropertyId && (
              <>
                <button
                  onClick={() => navigate(`/properties/${firstPropertyId}`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
                >
                  <Eye className="h-4 w-4" />
                  View First
                </button>
                <button
                  onClick={() => navigate(`/properties/edit/${firstPropertyId}`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm"
                >
                  <Edit className="h-4 w-4" />
                  Edit First
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4 mt-4"> {/* Changed space-y-6 to space-y-4, mt-6 to mt-4 */}
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
              <div className="space-y-3"> {/* Reduced space-y-4 to space-y-3 */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <PropertyEmptyState onAddProperty={handleAddProperty} />
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
                    onRowClick={handleViewProperty}
                    onEdit={handleEditProperty}
                    onDelete={handleDeleteProperty}
                    onArchive={handleArchiveProperty}
                    onView={handleViewProperty}
                    isLoading={loading}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Grid view coming soon...
                    </div>
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

export default OwnProperties;