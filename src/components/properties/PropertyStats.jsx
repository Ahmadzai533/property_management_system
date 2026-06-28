// src/components/properties/PropertyStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Key, 
  Wrench, 
  DollarSign, 
  TrendingUp,
  Users,
  Percent
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subValue, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {subValue && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subValue}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                {trend}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
};

const PropertyStats = ({ stats }) => {
  const statConfigs = [
    { key: 'total', icon: Building2, label: 'Total Properties', color: 'blue' },
    { key: 'occupied', icon: Home, label: 'Occupied', color: 'green' },
    { key: 'vacant', icon: Key, label: 'Vacant', color: 'yellow' },
    { key: 'maintenance', icon: Wrench, label: 'Maintenance', color: 'red' },
    { key: 'units', icon: Building2, label: 'Total Units', color: 'purple' },
    { key: 'monthlyRevenue', icon: DollarSign, label: 'Monthly Revenue', color: 'green' },
    { key: 'yearlyRevenue', icon: TrendingUp, label: 'Yearly Revenue', color: 'indigo' },
    { key: 'occupancyRate', icon: Percent, label: 'Occupancy Rate', color: 'blue' },
    { key: 'averageRent', icon: DollarSign, label: 'Average Rent', color: 'purple' },
  ];

  const displayStats = statConfigs
    .filter(config => stats[config.key] !== undefined)
    .map(config => ({
      ...config,
      value: stats[config.key],
      subValue: config.key === 'occupancyRate' ? `${stats.occupied}/${stats.total}` : undefined,
      trend: config.key === 'total' ? '+12%' : undefined,
    }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayStats.map((stat, index) => (
        <StatCard
          key={stat.key}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          subValue={stat.subValue}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default PropertyStats;