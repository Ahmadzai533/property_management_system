const STATUS_STYLES = {
  occupied: {
    label: "Occupied",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
  },
  vacant: {
    label: "Vacant",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  },
  maintenance: {
    label: "Maintenance",
    className:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800",
  },
  listed: {
    label: "Listed",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  leased: {
    label: "Leased",
    className:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800",
  },
};

const DEFAULT_STYLE = {
  label: null,
  className:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

const PropertyStatusBadge = ({ status, className = "" }) => {
  const normalizedStatus = status?.toLowerCase?.()?.trim() ?? "";
  const config = STATUS_STYLES[normalizedStatus] ?? DEFAULT_STYLE;
  const label =
    config.label ??
    (status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : "Unknown");

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold leading-none ${config.className} ${className}`}
    >
      {label}
    </span>
  );
};

export default PropertyStatusBadge;
