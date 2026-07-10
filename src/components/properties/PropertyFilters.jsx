import { Search, X } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const DEFAULT_STATUSES = [
  "occupied",
  "vacant",
  "maintenance",
  "listed",
  "leased",
];

const DEFAULT_PROPERTY_TYPES = [
  "apartment",
  "house",
  "condo",
  "commercial",
  "townhouse",
  "studio",
];

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

const selectClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

const labelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";

const PropertyFilters = ({
  searchTerm = "",
  onSearch,
  statusFilter = "",
  onStatusFilter,
  statusOptions,
  propertyTypeFilter = "",
  onPropertyTypeFilter,
  propertyTypeOptions,
  ownerFilter = "",
  onOwnerFilter,
  owners = [],
  minPrice = "",
  maxPrice = "",
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  className = "",
}) => {
  const { t } = useLocalization();

  const statusOpts = (statusOptions || DEFAULT_STATUSES).map(s => ({
    value: s,
    label: t(`properties.status.${s}`, s.charAt(0).toUpperCase() + s.slice(1))
  }));
  
  const typeOpts = (propertyTypeOptions || DEFAULT_PROPERTY_TYPES).map(s => ({
    value: s,
    label: t(`properties.types.${s}`, s.charAt(0).toUpperCase() + s.slice(1))
  }));

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(statusFilter) ||
    Boolean(propertyTypeFilter) ||
    Boolean(ownerFilter) ||
    minPrice !== "" ||
    maxPrice !== "";

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 ${className}`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <label htmlFor="property-search" className={labelClassName}>
            {t('common.search', 'Search')}
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="property-search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder={t('properties.searchPlaceholder', 'Search by name, address, or ID...')}
              className={`${inputClassName} pl-9`}
            />
          </div>
        </div>

        {/* Status */}
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
          <label htmlFor="property-status" className={labelClassName}>
            {t('properties.statusLabel', 'Status')}
          </label>
          <select
            id="property-status"
            value={statusFilter}
            onChange={(e) => onStatusFilter?.(e.target.value)}
            className={selectClassName}
          >
            <option value="">{t('common.allStatus', 'All Status')}</option>
            {statusOpts.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
          <label htmlFor="property-type" className={labelClassName}>
            {t('properties.propertyType', 'Property Type')}
          </label>
          <select
            id="property-type"
            value={propertyTypeFilter}
            onChange={(e) => onPropertyTypeFilter?.(e.target.value)}
            className={selectClassName}
          >
            <option value="">{t('common.allTypes', 'All Types')}</option>
            {typeOpts.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Owner */}
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
          <label htmlFor="property-owner" className={labelClassName}>
            {t('properties.owner', 'Owner')}
          </label>
          <select
            id="property-owner"
            value={ownerFilter}
            onChange={(e) => onOwnerFilter?.(e.target.value)}
            className={selectClassName}
          >
            <option value="">{t('common.allOwners', 'All Owners')}</option>
            {owners.map((owner) => {
              const value = typeof owner === "string" ? owner : owner.value;
              const label = typeof owner === "string" ? owner : owner.label;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        {/* Price Range */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
          <span className={labelClassName}>{t('properties.priceRange', 'Price Range')}</span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => onMinPriceChange?.(e.target.value)}
              placeholder={t('common.min', 'Min')}
              aria-label={t('common.minPrice', 'Minimum price')}
              className={inputClassName}
            />
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange?.(e.target.value)}
              placeholder={t('common.max', 'Max')}
              aria-label={t('common.maxPrice', 'Maximum price')}
              className={inputClassName}
            />
          </div>
        </div>
      </div>

      {onReset && (
        <div className="mt-4 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
            {t('common.resetFilters', 'Reset Filters')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;