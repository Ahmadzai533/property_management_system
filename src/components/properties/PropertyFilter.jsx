import { useState } from "react";
import { Filter, ChevronDown, X, Search } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const PropertyFilters = ({
  searchTerm,
  onSearch,
  statusFilter,
  onStatusFilter,
  propertyTypeFilter,
  onPropertyTypeFilter,
  ownerFilter,
  onOwnerFilter,
  owners,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}) => {
  const { t } = useLocalization();
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const statusOptions = ["vacant", "occupied", "leased", "listed", "maintenance"];
  const typeOptions = ["apartment", "condo", "house", "studio", "townhouse", "commercial"];

  const hasActiveFilters =
    statusFilter ||
    propertyTypeFilter ||
    ownerFilter ||
    minPrice ||
    maxPrice;

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t('properties.searchPlaceholder', 'Search properties by name, address, or ID...')}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between lg:hidden">
        <button
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Filter className="h-4 w-4" />
          {t('common.filters', 'Filters')}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isFiltersVisible ? "rotate-180" : ""
            }`}
          />
          {hasActiveFilters && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              {
                [statusFilter, propertyTypeFilter, ownerFilter, minPrice, maxPrice].filter(
                  Boolean
                ).length
              }
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <X className="h-4 w-4" />
            {t('common.reset', 'Reset')}
          </button>
        )}
      </div>

      <div className={`${isFiltersVisible ? "block" : "hidden"} lg:block`}>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="min-w-[140px] flex-1">
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              {t('properties.statusLabel', 'Status')}
            </label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">{t('common.allStatuses', 'All Statuses')}</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {t(`properties.status.${status}`, status.charAt(0).toUpperCase() + status.slice(1))}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[140px] flex-1">
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              {t('properties.propertyType', 'Property Type')}
            </label>
            <select
              value={propertyTypeFilter}
              onChange={(e) => onPropertyTypeFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">{t('common.allTypes', 'All Types')}</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {t(`properties.types.${type}`, type.charAt(0).toUpperCase() + type.slice(1))}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[140px] flex-1">
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              {t('properties.owner', 'Owner')}
            </label>
            <select
              value={ownerFilter}
              onChange={(e) => onOwnerFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">{t('common.allOwners', 'All Owners')}</option>
              {owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[180px] flex-1">
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              {t('properties.monthlyRentRange', 'Monthly Rent Range')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder={t('common.min', 'Min')}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <span className="text-slate-400">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder={t('common.max', 'Max')}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <button
              onClick={onReset}
              className="mt-5 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              {t('common.resetFilters', 'Reset Filters')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;