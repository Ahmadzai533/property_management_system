import { motion } from "framer-motion";
import {
  MapPin,
  User,
  DollarSign,
  Eye,
  Pencil,
  Building2,
} from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const STATUS_STYLES = {
  occupied: {
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
  },
  vacant: {
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  },
  maintenance: {
    className:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800",
  },
  listed: {
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  },
  leased: {
    className:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800",
  },
};

const formatRent = (rent, currencySymbol = "$") => {
  if (rent == null || rent === "") return "—";
  if (typeof rent === "number") {
    return `${currencySymbol}${rent.toLocaleString()}`;
  }
  return rent.startsWith(currencySymbol) ? rent : `${currencySymbol}${rent}`;
};

const PropertyCard = ({
  name,
  address,
  image,
  imageAlt,
  status = "vacant",
  monthlyRent,
  owner,
  currencySymbol = "$",
  onView,
  onEdit,
  className = "",
}) => {
  const { t } = useLocalization();
  const normalizedStatus = status?.toLowerCase?.() ?? "vacant";
  const statusConfig = STATUS_STYLES[normalizedStatus] ?? {
    className:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-slate-950/50 ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {image ? (
          <motion.img
            src={image}
            alt={imageAlt || name || "Property"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
            <Building2 className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span
          className={`absolute left-3 top-3 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${statusConfig.className}`}
        >
          {t(`properties.status.${normalizedStatus}`, normalizedStatus)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            {name}
          </h3>

          <p className="flex items-start gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="line-clamp-2">{address}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#6D28D9]/10 text-[#6D28D9] dark:bg-[#6D28D9]/20">
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('properties.monthlyRent', 'Monthly Rent')}
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {formatRent(monthlyRent, currencySymbol)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('properties.owner', 'Owner')}
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {owner || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <motion.button
            type="button"
            onClick={onView}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6D28D9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5B21B6] hover:shadow-lg hover:shadow-[#6D28D9]/25"
          >
            <Eye className="h-4 w-4" />
            {t('common.view', 'View')}
          </motion.button>

          <motion.button
            type="button"
            onClick={onEdit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
            {t('common.edit', 'Edit')}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default PropertyCard;