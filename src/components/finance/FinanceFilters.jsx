import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { useLocalization } from '../../hooks/useLocalization';

export const FinanceFilters = ({
  searchPlaceholder,
  filters = [],
  onSearch,
  onFilter,
  onDateRange,
  onReset,
  onExport,
  onPrint,
  onViewToggle,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const { t } = useLocalization();

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    onFilter?.(key, value);
  };

  const handleReset = () => {
    setSearchValue('');
    setActiveFilters({});
    setStartDate(null);
    setEndDate(null);
    onReset?.();
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key]
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder || t('finance.filters.search')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            className="relative px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            {t('finance.filters.filters')}
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
          {onExport && (
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={onExport}
            >
              {t('common.export')}
            </button>
          )}
          {onPrint && (
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={onPrint}
            >
              {t('common.print')}
            </button>
          )}
          {onViewToggle && (
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-r border-gray-300 dark:border-gray-600"
                onClick={() => onViewToggle('table')}
              >
                {t('common.view.table')}
              </button>
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => onViewToggle('grid')}
              >
                {t('common.view.grid')}
              </button>
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {filter.label}
                </label>
                <select
                  value={activeFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('finance.filters.all')}</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('finance.filters.dateRange')}
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate || ''}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={endDate || ''}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={handleReset}
            >
              <X className="w-4 h-4 inline mr-1" />
              {t('common.reset')}
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => onDateRange?.(startDate, endDate)}
            >
              {t('finance.filters.applyFilters')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};