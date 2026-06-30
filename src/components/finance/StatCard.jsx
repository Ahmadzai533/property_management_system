// src/components/finance/StatCard.jsx
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  subtitle,
  prefix = '',
  suffix = '',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {prefix}
            {typeof value === 'number' ? value.toLocaleString() : value}
            {suffix}
          </div>
          {subtitle && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </div>
          )}
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${
              trend >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {trend >= 0 ? (
              <ArrowUp className="w-4 h-4 mr-0.5" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-0.5" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </motion.div>
  );
};