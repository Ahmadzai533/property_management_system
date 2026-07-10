import { useMemo, useState } from "react";
import { 
  Building2, Plus, FileText, Home, 
  Eye, Edit, Trash2, MoreVertical,
  ChevronUp, ChevronDown,
  Search, Filter, X,
  CheckCircle, XCircle, Clock, AlertCircle,
  User, MapPin, DollarSign, Calendar
} from "lucide-react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import PropertyFilter from "../../../components/properties/PropertyFilter";
import AddPropertyModal from "../../../components/properties/AddPropertyModal";
import FloatingActionButton from "../../../components/properties/FloatingActionButton";
import { useLocalization } from "../../../hooks/useLocalization";
import DateText from '../../../components/common/DateText';
import PropertyCard from "../../../components/properties/PropertyCard";


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
    units: 12,
    occupiedUnits: 10,
    lastInspection: "2024-01-15",
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
    units: 8,
    occupiedUnits: 8,
    lastInspection: "2024-01-10",
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
    units: 1,
    occupiedUnits: 0,
    lastInspection: "2024-01-20",
  },
  {
    id: "prop-004",
    name: "Riverside Studios",
    address: "455 River Road, Austin, TX",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e1e936d88?w=800&q=80",
    status: "listed",
    type: "studio",
    monthlyRent: 1650,
    owner: "Maria Lopez",
    units: 15,
    occupiedUnits: 12,
    lastInspection: "2024-01-18",
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
    units: 6,
    occupiedUnits: 4,
    lastInspection: "2024-01-12",
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
    units: 20,
    occupiedUnits: 18,
    lastInspection: "2024-01-14",
  },
];

const PropertyList = () => {
  const { t } = useLocalization();
  const [properties, setProperties] = useState(PROPERTIES_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const statusConfig = useMemo(() => ({
    occupied: { label: "occupied", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400", icon: CheckCircle },
    leased: { label: "leased", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400", icon: Clock },
    vacant: { label: "vacant", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400", icon: XCircle },
    listed: { label: "listed", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400", icon: AlertCircle },
    maintenance: { label: "maintenance", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400", icon: AlertCircle },
  }), []);

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredProperties.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    let filtered = properties.filter((property) => {
      const matchesSearch =
        !query ||
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.id.toLowerCase().includes(query);

      const matchesStatus = !statusFilter || property.status === statusFilter;
      const matchesType = !propertyTypeFilter || property.type === propertyTypeFilter;
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

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, propertyTypeFilter, ownerFilter, minPrice, maxPrice, properties, sortField, sortDirection]);

  const currentOwners = [...new Set(properties.map((p) => p.owner))];

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.occupied;
    const Icon = config.icon;
    const statusLabel = t(`properties.status.${config.label}`, status);
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {statusLabel}
      </span>
    );
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortDirection === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-2 lg:px-2">
      {/* Header with Enterprise Stats */}

      <div className="rounded-2xl ml-2 bg-gradient-to-r bg-[#6D28D9] p-6 text-white shadow-lg dark:bg-[#6D28D9]">
      

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Breadcrumb white={true} />
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t("properties.title", "Property Portfolio")}
            </h1>
            <p className="mt-1 text-sm text-white md:text-base">
              {t("properties.subtitle", "Manage and monitor your entire property portfolio")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-200" />
                <span className="text-sm font-medium">{properties.length} {t("properties.properties", "Properties")}</span>
              </div>
              <div className="hidden h-6 w-px bg-white/20 sm:block" />
              <div className="hidden items-center gap-2 sm:flex">
                <Building2 className="h-4 w-4 text-blue-200" />
                <span className="text-sm font-medium">{new Set(properties.map((p) => p.owner)).size} {t("properties.owners", "Owners")}</span>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-xl active:scale-95 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">{t("properties.addNew", "Add New Property")}</span>
              <span className="sm:hidden">{t("properties.add", "Add")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
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

      {/* Results count with export option */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("properties.showing", "Showing")}{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredProperties.length}
          </span>{" "}
          {t("properties.of", "of")}{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {properties.length}
          </span>{" "}
          {t("properties.properties", "properties")}
        </p>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
          <FileText className="h-3.5 w-3.5" />
          {t("properties.exportReport", "Export Report")}
        </button>
      </div>

      {/* Enterprise Table */}
      {filteredProperties.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      {t("properties.table.property", "Property")}
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                    onClick={() => handleSort('address')}
                  >
                    <div className="flex items-center gap-1">
                      {t("properties.table.address", "Address")}
                      {getSortIcon('address')}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                    onClick={() => handleSort('owner')}
                  >
                    <div className="flex items-center gap-1">
                      {t("properties.table.owner", "Owner")}
                      {getSortIcon('owner')}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                    onClick={() => handleSort('monthlyRent')}
                  >
                    <div className="flex items-center gap-1">
                      {t("properties.table.rent", "Rent")}
                      {getSortIcon('monthlyRent')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    {t("properties.table.status", "Status")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    {t("properties.table.units", "Units")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    {t("properties.table.actions", "Actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property, index) => (
                  <tr
                    key={property.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(property.id)}
                        onChange={() => handleSelectRow(property.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {property.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {t(`properties.types.${property.type}`, property.type)}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {property.address}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {property.owner}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      ${property.monthlyRent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {property.occupiedUnits || 0}
                        </span>
                        <span className="text-gray-400"> / </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {property.units || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title={t("properties.actions.view", "View Property")}
                        >
                          <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title={t("properties.actions.edit", "Edit Property")}
                        >
                          <Edit className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title={t("properties.actions.delete", "Delete Property")}
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title={t("properties.actions.more", "More Actions")}
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t("properties.pagination.showing", "Showing")} <span className="font-medium">{filteredProperties.length}</span> {t("properties.pagination.of", "of")}{" "}
              <span className="font-medium">{properties.length}</span> {t("properties.pagination.properties", "properties")}
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {t("properties.pagination.previous", "Previous")}
              </button>
              <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {t("properties.pagination.next", "Next")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-slate-800">
            <Building2 className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {t("properties.empty.title", "No properties found")}
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {t("properties.empty.description", "Try adjusting your search or filters, or")}{" "}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {t("properties.empty.addLink", "add a new property")}
            </button>
          </p>
        </div>
      )}

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProperty}
      />

      {/* Floating Action Button for Mobile */}
      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
    </div>
  );
};

export default PropertyList;