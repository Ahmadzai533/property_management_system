import { Search, X } from "lucide-react";

const DEFAULT_STATUSES = [
  { value: "occupied", label: "Occupied" },
  { value: "vacant", label: "Vacant" },
  { value: "maintenance", label: "Maintenance" },
  { value: "listed", label: "Listed" },
  { value: "leased", label: "Leased" },
];

const DEFAULT_PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "commercial", label: "Commercial" },
  { value: "townhouse", label: "Townhouse" },
  { value: "studio", label: "Studio" },
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
  statusOptions = DEFAULT_STATUSES,
  propertyTypeFilter = "",
  onPropertyTypeFilter,
  propertyTypeOptions = DEFAULT_PROPERTY_TYPES,
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
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="property-search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search by name, address, or ID..."
              className={`${inputClassName} pl-9`}
            />
          </div>
        </div>

        {/* Status */}
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
          <label htmlFor="property-status" className={labelClassName}>
            Status
          </label>
          <select
            id="property-status"
            value={statusFilter}
            onChange={(e) => onStatusFilter?.(e.target.value)}
            className={selectClassName}
          >
            <option value="">All Status</option>
            {statusOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
          <label htmlFor="property-type" className={labelClassName}>
            Property Type
          </label>
          <select
            id="property-type"
            value={propertyTypeFilter}
            onChange={(e) => onPropertyTypeFilter?.(e.target.value)}
            className={selectClassName}
          >
            <option value="">All Types</option>
            {propertyTypeOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Owner */}
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
          <label htmlFor="property-owner" className={labelClassName}>
            Owner
          </label>
          <select
            id="property-owner"
            value={ownerFilter}
            onChange={(e) => onOwnerFilter?.(e.target.value)}
            className={selectClassName}
          >
            <option value="">All Owners</option>
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
          <span className={labelClassName}>Price Range</span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => onMinPriceChange?.(e.target.value)}
              placeholder="Min"
              aria-label="Minimum price"
              className={inputClassName}
            />
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange?.(e.target.value)}
              placeholder="Max"
              aria-label="Maximum price"
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
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
