import { useState } from "react";
import PropertyCard from "../components/properties/PropertyCard";
import PropertySkeleton from "../components/properties/PropertySkeleton";

const Properties = () => {
  const [isLoading, setIsLoading] = useState(false);

  const properties = [
    {
      name: "Sunset Apartments",
      address: "Springfield",
      status: "occupied",
      monthlyRent: 2000,
      owner: "John",
    },
  ];

  return (
    <div className="p-6">
      {/* LOADING STATE */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertySkeleton key={i} />
          ))}
        </div>
      ) : (
        /* REAL DATA */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((property, i) => (
            <PropertyCard key={i} {...property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;