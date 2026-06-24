// src/pages/tenant/TenantDetailsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TenantProfileCard } from '../components/TenantProfileCard';
import { TenantTabs } from '../components/TenantTabs';
import { LeaseInformationCard } from '../components/LeaseInformationCard';
import { PropertyInformationCard } from '../components/PropertyInformationCard';
import { PaymentHistoryTable } from '../components/PaymentHistoryTable';
import { InvoiceTable } from '../components/InvoiceTable';
import { DocumentsTable } from '../components/DocumentsTable';
import { MaintenanceTable } from '../components/MaintenanceTable';
import { generateTenants } from '../tenantData';

export const TenantDetailsPage = () => {
  const [tenant] = useState(generateTenants(1)[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LeaseInformationCard tenant={tenant} />
            <PropertyInformationCard tenant={tenant} />
          </div>
        );
      case 'payments':
        return <PaymentHistoryTable payments={tenant.payments} />;
      case 'invoices':
        return <InvoiceTable invoices={tenant.invoices} />;
      case 'documents':
        return <DocumentsTable documents={tenant.documents} />;
      case 'maintenance':
        return <MaintenanceTable requests={tenant.maintenanceRequests} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <button 
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tenants
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <TenantProfileCard tenant={tenant} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <TenantTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};