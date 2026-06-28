import { MapPin, User, DollarSign, Eye, Edit } from "lucide-react";

const PropertyCard = ({
  name,
  address,
  image,
  imageAlt = "Property",
  status,
  monthlyRent,
  owner,
  onView,
  onEdit,
}) => {
  const getStatusColor = (status) => {
    const colors = {
      occupied: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      vacant: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      leased: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      listed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      maintenance: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[status] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
          }}
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-800 dark:text-white">
          {name}
        </h3>
        
        <div className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="line-clamp-1">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span>{owner}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="font-medium text-slate-800 dark:text-white">
              ${monthlyRent.toLocaleString()}/mo
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          <button
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;