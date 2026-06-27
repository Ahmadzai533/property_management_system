import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
import PropertyCard from "../../components/properties/PropertyCard";
import PropertyFilters from "../../components/properties/PropertyFilters";
import PropertySearch from "../../components/properties/PropertySearch";

const PROPERTIES_DATA = [
  {
    id: "prop-001",
    name: "Sunset Apartments",
    address: "742 Evergreen Terrace, Springfield, IL",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    status: "occupied",
    type: "apartment",
    monthlyRent: 2450,
    owner: "Jane Smith",
  },
  {
    id: "prop-002",
    name: "Ocean View Condos",
    address: "1200 Pacific Coast Hwy, Malibu, CA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    status: "leased",
    type: "condo",
    monthlyRent: 4200,
    owner: "Robert Chen",
  },
  {
    id: "prop-003",
    name: "Park Residence",
    address: "88 Central Park West, New York, NY",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    status: "vacant",
    type: "house",
    monthlyRent: 5800,
    owner: "Jane Smith",
  },
  {
    id: "prop-004",
    name: "Riverside Studios",
    address: "455 River Road, Austin, TX",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e2e936d88?w=800&q=80",
    status: "listed",
    type: "studio",
    monthlyRent: 1650,
    owner: "Maria Lopez",
  },
  {
    id: "prop-005",
    name: "Green Valley Townhomes",
    address: "19 Maple Lane, Denver, CO",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "maintenance",
    type: "townhouse",
    monthlyRent: 3100,
    owner: "Robert Chen",
  },
  {
    id: "prop-006",
    name: "City Center Plaza",
    address: "500 Main Street, Chicago, IL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    status: "occupied",
    type: "commercial",
    monthlyRent: 8900,
    owner: "Maria Lopez",
  },
];

const OWNERS = [...new Set(PROPERTIES_DATA.map((p) => p.owner))];

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPropertyTypeFilter("");
    setOwnerFilter("");
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    return PROPERTIES_DATA.filter((property) => {
      const matchesSearch =
        !query ||
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.id.toLowerCase().includes(query);

      const matchesStatus =
        !statusFilter || property.status === statusFilter;

      const matchesType =
        !propertyTypeFilter || property.type === propertyTypeFilter;

      const matchesOwner = !ownerFilter || property.owner === ownerFilter;

      const matchesMin = min == null || property.monthlyRent >= min;
      const matchesMax = max == null || property.monthlyRent <= max;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesOwner &&
        matchesMin &&
        matchesMax
      );
    });
  }, [
    searchTerm,
    statusFilter,
    propertyTypeFilter,
    ownerFilter,
    minPrice,
    maxPrice,
  ]);

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <Breadcrumb />
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-800 dark:text-white md:text-3xl">
            All Properties
          </h1>
          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400 md:text-base">
            Browse and manage your property portfolio.
          </p>
        </div>

        <div className="w-full md:max-w-sm lg:max-w-md">
          <PropertySearch
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Quick search properties..."
          />
        </div>
      </div>

      {/* Filters */}
      <PropertyFilters
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        propertyTypeFilter={propertyTypeFilter}
        onPropertyTypeFilter={setPropertyTypeFilter}
        ownerFilter={ownerFilter}
        onOwnerFilter={setOwnerFilter}
        owners={OWNERS}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={handleReset}
      />

      {/* Results count */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {filteredProperties.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {PROPERTIES_DATA.length}
        </span>{" "}
        properties
      </p>

      {/* Property grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              name={property.name}
              address={property.address}
              image={property.image}
              imageAlt={property.name}
              status={property.status}
              monthlyRent={property.monthlyRent}
              owner={property.owner}
              onView={() => console.log("View", property.id)}
              onEdit={() => console.log("Edit", property.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <Building2 className="h-7 w-7 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            No properties found
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Try adjusting your search or filters to find what you are looking
            for.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
