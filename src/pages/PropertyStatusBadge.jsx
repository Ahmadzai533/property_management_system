import PropertyStatusBadge from "../components/properties/PropertyStatusBadge";

const Properties = () => {
  return (
    <div className="p-6 flex gap-3">
      <PropertyStatusBadge status="occupied" />
      <PropertyStatusBadge status="vacant" />
      <PropertyStatusBadge status="custom" />
    </div>
  );
};

export default Properties;