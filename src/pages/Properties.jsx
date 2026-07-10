import { useMemo, useState } from "react";
import { Building2, Plus, FileText, Home } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb";
import PropertyCard from "../components/properties/PropertyCard";
import PropertyFilter from "../components/properties/PropertyFilter";
import AddPropertyModal from "../components/properties/AddPropertyModal";
import FloatingActionButton from "../components/properties/FloatingActionButton";
import { useLocalization } from "../hooks/useLocalization";

const PROPERTIES_DATA = [
  {
    id: "prop-001",
    name: "Sunset Apartments",
    address: "742 Evergreen Terrace, Springfield, IL",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    status: "occupied",
    type: "apartment",
    monthlyRent: 2450,
    owner: "Jane Smith",
  },
  {
    id: "prop-002",
    name: "Ocean View Condos",
    address: "1200 Pacific Coast Hwy, Malibu, CA",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    status: "leased",
    type: "condo",
    monthlyRent: 4200,
    owner: "Robert Chen",
  },
  {
    id: "prop-003",
    name: "Park Residence",
    address: "88 Central Park West, New York, NY",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    status: "vacant",
    type: "house",
    monthlyRent: 5800,
    owner: "Jane Smith",
  },
  {
    id: "prop-004",
    name: "Riverside Studios",
    address: "455 River Road, Austin, TX",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1e1e936d88?w=800&q=80",
    status: "listed",
    type: "studio",
    monthlyRent: 1650,
    owner: "Maria Lopez",
  },
  {
    id: "prop-005",
    name: "Green Valley Townhomes",
    address: "19 Maple Lane, Denver, CO",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "maintenance",
    type: "townhouse",
    monthlyRent: 3100,
    owner: "Robert Chen",
  },
  {
    id: "prop-006",
    name: "City Center Plaza",
    address: "500 Main Street, Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    status: "occupied",
    type: "commercial",
    monthlyRent: 8900,
    owner: "Maria Lopez",
  },
];

const Properties = () => {
  const { t } = useLocalization();
  const [properties, setProperties] = useState(PROPERTIES_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPropertyTypeFilter("");
    setOwnerFilter("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleAddProperty = (newProperty) => {
    const propertyWithId = {
      ...newProperty,
      id: `prop-${String(properties.length + 1).padStart(3, "0")}`,
    };
    setProperties([...properties, propertyWithId]);
    setIsAddModalOpen(false);
  };

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    return properties.filter((property) => {
      const matchesSearch =
        !query ||
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.id.toLowerCase().includes(query);

      const matchesStatus = !statusFilter || property.status === statusFilter;

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
    properties,
  ]);

  const currentOwners = [...new Set(properties.map((p) => p.owner))];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 space-x-2 sm:space-x-2 lg:space-x-3">
      <div className="rounded-2xl ml-2 bg-gradient-to-r bg-[#6D28D9] p-6 text-white shadow-lg dark:bg-[#6D28D9]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Breadcrumb />
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('properties.portfolio', 'Property Portfolio')}
            </h1>
            <p className="mt-1 text-sm text-blue-100 md:text-base">
              {t('properties.portfolioDesc', 'Manage and monitor your entire property portfolio')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-200" />
                <span className="text-sm font-medium">
                  {properties.length} {t('properties.pagination.properties', 'Properties')}
                </span>
              </div>
              <div className="hidden h-6 w-px bg-white/20 sm:block" />
              <div className="hidden items-center gap-2 sm:flex">
                <Building2 className="h-4 w-4 text-blue-200" />
                <span className="text-sm font-medium">
                  {new Set(properties.map((p) => p.owner)).size} {t('properties.owners', 'Owners')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-xl active:scale-95 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">{t('properties.addProperty', 'Add New Property')}</span>
              <span className="sm:hidden">{t('common.add', 'Add')}</span>
            </button>
          </div>
        </div>
      </div>

      <PropertyFilter
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        propertyTypeFilter={propertyTypeFilter}
        onPropertyTypeFilter={setPropertyTypeFilter}
        ownerFilter={ownerFilter}
        onOwnerFilter={setOwnerFilter}
        owners={currentOwners}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={handleReset}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('properties.pagination.showing', 'Showing')}{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredProperties.length}
          </span>{" "}
          {t('properties.pagination.of', 'of')}{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {properties.length}
          </span>{" "}
          {t('properties.pagination.properties', 'properties')}
        </p>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
          <FileText className="h-3.5 w-3.5" />
          {t('properties.exportReport', 'Export Report')}
        </button>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
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
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-slate-800">
            <Building2 className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {t('properties.empty.title', 'No properties found')}
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {t('properties.empty.description', 'Try adjusting your search or filters, or')}{" "}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {t('properties.empty.addLink', 'add a new property')}
            </button>
          </p>
        </div>
      )}

      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProperty}
      />

      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
    </div>
  );
};

export default Properties;