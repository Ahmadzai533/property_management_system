// src/pages/properties/AllUnits.jsx
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2, Plus, Eye, Edit, Home, List, LayoutGrid, Grid,
  Package, Users, DollarSign, Calendar, AlertCircle,
} from "lucide-react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import PropertyStats from "../../../components/properties/PropertyStats";
import PropertyToolbar from "../../../components/properties/PropertyToolbar";
import PropertyTable from "../../../components/properties/PropertyTable";
import PropertyPagination from "../../../components/properties/PropertyPagination";
import PropertyBulkActions from "../../../components/properties/PropertyBulkActions";
import PropertyEmptyState from "../../../components/properties/PropertyEmptyState";
import { useUnits } from "../../../hooks/useUnits";
import { useLocalization } from "../../../hooks/useLocalization";

const AllUnits = () => {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  const { units, loading, stats, total } = useUnits({
    page: currentPage, pageSize, search: searchQuery, filters,
  });

  const handleSearch = useCallback((query) => { setSearchQuery(query); setCurrentPage(1); }, []);
  const handleFilterChange = useCallback((key, value) => {
    if (key === "reset") setFilters({});
    else setFilters((prev) => ({ ...prev, [key]: value === "All" ? undefined : value }));
    setCurrentPage(1);
  }, []);
  const handleViewChange = useCallback((view) => setViewMode(view), []);
  const handleAddUnit = useCallback(() => navigate("/properties/units/add"), [navigate]);
  const handleViewUnit = useCallback((id) => navigate(`/properties/units/${id}`), [navigate]);
  const handleEditUnit = useCallback((id) => navigate(`/properties/units/edit/${id}`), [navigate]);
  const handleDeleteUnit = useCallback((id) => console.log("Delete unit:", id), []);
  const handleArchiveUnit = useCallback((id) => console.log("Archive unit:", id), []);
  const handleExport = useCallback(() => console.log("Export units"), []);
  const handleRefresh = useCallback(() => console.log("Refresh units"), []);
  const handlePageChange = useCallback((page) => setCurrentPage(page), []);
  const handlePageSizeChange = useCallback((size) => { setPageSize(size); setCurrentPage(1); }, []);
  const handleBulkAction = useCallback((action) => { console.log(`Bulk action: ${action} for ${selectedIds.length} items`); setSelectedIds([]); }, [selectedIds]);

  const breadcrumbItems = useMemo(() => [
    { label: t('nav.dashboard', 'Dashboard'), path: "/" },
    { label: t('nav.properties', 'Properties'), path: "/properties" },
    { label: t('properties.allUnits', 'All Units'), path: "/properties/units", active: true },
  ], [t]);

  const firstUnitId = units.length > 0 ? units[0].id : null;

  const unitStats = useMemo(() => ({
    total: stats.total || 0, occupied: stats.occupied || 0, vacant: stats.vacant || 0,
    maintenance: stats.maintenance || 0, reserved: stats.reserved || 0,
    totalRentValue: stats.totalRentValue || 0, averageRent: stats.averageRent || 0,
    occupancyRate: stats.occupancyRate || 0, maintenanceRate: stats.maintenanceRate || 0,
    units: stats.units,
    monthlyRevenue: stats.monthlyRevenue,
    yearlyRevenue: stats.yearlyRevenue,
  }), [stats]);

  const getGridStatusClass = (status) => {
    const normalizedStatus = status?.toLowerCase?.() ?? "";
    if (normalizedStatus === "occupied") return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
    if (normalizedStatus === "vacant") return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    if (normalizedStatus === "maintenance") return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
    return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9] p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          <div className="mb-3"><Breadcrumb white={true} /></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20"><Package className="h-6 w-6" /></div>
              <div>
                <h1 className="text-2xl font-bold">{t('properties.allUnits', 'All Units')}</h1>
                <p className="text-white/80 mt-0.5">{t('properties.allUnitsDesc', 'Manage and monitor all units across your property portfolio')}</p>
              </div>
            </div>
            <button onClick={handleAddUnit} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium">
              <Plus className="h-4 w-4" /> {t('properties.addUnit', 'Add Unit')}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/20">
            <button onClick={() => navigate("/properties/units")} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm">
              <Home className="h-4 w-4" /> {t('properties.allUnits', 'All Units')}
            </button>
            <button onClick={() => navigate("/properties/units/add")} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm">
              <Plus className="h-4 w-4" /> {t('properties.addNew', 'Add New')}
            </button>
            {firstUnitId && (<>
              <button onClick={() => navigate(`/properties/units/${firstUnitId}`)} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm">
                <Eye className="h-4 w-4" /> {t('properties.view', 'View')}
              </button>
              <button onClick={() => navigate(`/properties/units/edit/${firstUnitId}`)} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-sm">
                <Edit className="h-4 w-4" /> {t('common.edit', 'Edit')}
              </button>
            </>)}
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <PropertyStats stats={unitStats} />
          <PropertyToolbar onSearch={handleSearch} onViewChange={handleViewChange} viewMode={viewMode} onExport={handleExport} onRefresh={handleRefresh} totalResults={total} filters={filters} onFilterChange={handleFilterChange} />
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => (<div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />))}</div>
            ) : units.length === 0 ? (
              <PropertyEmptyState onAddProperty={handleAddUnit} title={t('properties.noUnits', 'No units found')} />
            ) : (
              <motion.div key={viewMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {viewMode === "table" ? (
                  <PropertyTable properties={units} onRowClick={handleViewUnit} onEdit={handleEditUnit} onDelete={handleDeleteUnit} onArchive={handleArchiveUnit} onView={handleViewUnit} isLoading={loading} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {units.map((unit) => (
                      <div key={unit.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
                        <img src={unit.image} alt={`${t('properties.unit', 'Unit')} ${unit.unitNumber}`} className="w-full h-48 object-cover rounded-lg mb-3" />
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{t('properties.unit', 'Unit')} {unit.unitNumber}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getGridStatusClass(unit.status)}`}>
                            {t(`properties.status.${unit.status?.toLowerCase?.() ?? 'unknown'}`, unit.status || t('properties.status.unknown', 'Unknown'))}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{unit.propertyName}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">${unit.rent}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {t(`properties.types.${unit.type?.toLowerCase?.()}`, unit.type)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {units.length > 0 && <PropertyPagination currentPage={currentPage} totalPages={Math.ceil(total / pageSize)} pageSize={pageSize} totalItems={total} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />}
        </div>
      </div>
      <PropertyBulkActions selectedCount={selectedIds.length} onArchive={() => handleBulkAction("archive")} onDelete={() => handleBulkAction("delete")} onExport={() => handleBulkAction("export")} onEmail={() => handleBulkAction("email")} onEdit={() => handleBulkAction("edit")} onClear={() => setSelectedIds([])} totalItems={total} />
    </div>
  );
};

export default AllUnits;