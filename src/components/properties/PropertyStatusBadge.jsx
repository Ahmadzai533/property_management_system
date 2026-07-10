import { useLocalization } from "../../hooks/useLocalization";

const PropertyStatusBadge = ({ status, className = "" }) => {
  const { t } = useLocalization();
  const normalizedStatus = status?.toLowerCase?.()?.trim() ?? "";
  
  const className_map = {
    occupied: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
    vacant: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
    maintenance: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800",
    listed: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
    leased: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800",
  };

  const defaultClassName = "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  const badgeClassName = className_map[normalizedStatus] || defaultClassName;
  const label = t(`properties.status.${normalizedStatus}`, status || "Unknown");

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold leading-none ${badgeClassName} ${className}`}
    >
      {label}
    </span>
  );
};

export default PropertyStatusBadge;