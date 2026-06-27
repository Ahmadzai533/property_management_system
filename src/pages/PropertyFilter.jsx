import { useState } from "react";
import PropertyFilters from "../components/properties/PropertyFilters";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <PropertyFilters
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      statusFilter={statusFilter}
      onStatusFilter={setStatusFilter}
      propertyTypeFilter={propertyTypeFilter}
      onPropertyTypeFilter={setPropertyTypeFilter}
      ownerFilter={ownerFilter}
      onOwnerFilter={setOwnerFilter}
      owners={["Jane Smith", "John Doe"]}
      minPrice={minPrice}
      maxPrice={maxPrice}
      onMinPriceChange={setMinPrice}
      onMaxPriceChange={setMaxPrice}
      onReset={() => {
        setSearchTerm("");
        setStatusFilter("");
        setPropertyTypeFilter("");
        setOwnerFilter("");
        setMinPrice("");
        setMaxPrice("");
      }}
    />
  );
};

export default Properties;