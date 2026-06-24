// src/components/tenant/TenantStatsCards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Calendar, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

export const TenantStatsCards = ({ stats }) => {
  const cards = [
    { icon: Users, label: 'Total Tenants', value: stats.total, color: 'bg-blue-500' },
    { icon: UserCheck, label: 'Active Tenants', value: stats.active, color: 'bg-green-500' },
    { icon: UserX, label: 'Inactive Tenants', value: stats.inactive, color: 'bg-gray-500' },
    { icon: Calendar, label: 'Expired Contracts', value: stats.expired, color: 'bg-red-500' },
    { icon: DollarSign, label: 'Monthly Revenue', value: `$${stats.revenue.toLocaleString()}`, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};