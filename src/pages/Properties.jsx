import PropertyCard from "../components/properties/PropertyCard";

const Properties = () => {
  return (
    <div style={{ padding: "20px" }}>
      <PropertyCard
        name="Sunset Apartments"
        address="742 Evergreen Terrace, Springfield"
        image="https://example.com/property.jpg"
        status="occupied"
        monthlyRent={2450}
        owner="Jane Smith"
        onView={() => alert("View clicked")}
        onEdit={() => alert("Edit clicked")}
      />
    </div>
  );
};

export default Properties;