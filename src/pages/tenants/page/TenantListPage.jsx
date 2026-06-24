// src/pages/tenant/TenantListPage.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Upload } from 'lucide-react';
import { TenantPageHeader } from '../components/TenantPageHeader';
import { TenantStatsCards } from '../components/TenantStatsCards';
import { TenantFilters } from '../components/TenantFilters';
import { TenantTable } from '../components/TenantTable';
import { TenantPagination } from '../components/TenantPagination';
import { generateTenants } from '../tenantData';

export const TenantListPage = () => {
  const [tenants] = useState(generateTenants(30));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = useMemo(() => ({
    total: tenants.length,
    active: tenants.filter(t => t.status === 'Active').length,
    inactive: tenants.filter(t => t.status === 'Inactive').length,
    expired: tenants.filter(t => t.status === 'Expired').length,
    revenue: tenants.reduce((acc, t) => acc + t.monthlyRent, 0)
  }), [tenants]);

  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || tenant.status === statusFilter;
      const matchesProperty = !propertyFilter || tenant.property === propertyFilter;
      const matchesUnit = !unitFilter || tenant.unit === unitFilter;
      return matchesSearch && matchesStatus && matchesProperty && matchesUnit;
    });
  }, [tenants, searchTerm, statusFilter, propertyFilter, unitFilter]);

  const paginatedTenants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTenants.slice(start, start + itemsPerPage);
  }, [filteredTenants, currentPage]);

  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

  const uniqueProperties = [...new Set(tenants.map(t => t.property))];
  const uniqueUnits = [...new Set(tenants.map(t => t.unit))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <TenantPageHeader 
        title="Tenant Management"
        actions={[
          { label: 'Add Tenant', icon: Plus, variant: 'primary', onClick: () => console.log('Add Tenant') },
          { label: 'Export', icon: Download, variant: 'secondary', onClick: () => console.log('Export') },
          { label: 'Import', icon: Upload, variant: 'secondary', onClick: () => console.log('Import') }
        ]}
      />

      <TenantStatsCards stats={stats} />

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
        <TenantFilters
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          propertyFilter={propertyFilter}
          onPropertyFilter={setPropertyFilter}
          unitFilter={unitFilter}
          onUnitFilter={setUnitFilter}
          properties={uniqueProperties}
          units={uniqueUnits}
          onReset={() => {
            setSearchTerm('');
            setStatusFilter('');
            setPropertyFilter('');
            setUnitFilter('');
            setCurrentPage(1);
          }}
        />

        <TenantTable tenants={paginatedTenants} />

        <TenantPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredTenants.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </motion.div>
  );
};