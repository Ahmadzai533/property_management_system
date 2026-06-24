// src/components/tenant/TenantTabs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, CreditCard, Receipt, FolderOpen, Wrench } from 'lucide-react';

export const TenantTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'lease', label: 'Lease Information', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench }
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};