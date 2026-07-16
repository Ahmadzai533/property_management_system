import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Home,
  CalendarDays,
  Users,
  CircleDollarSign,
  BedDouble,
  ArrowRightLeft,
} from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";

const iconMap = {
  bookings: CalendarDays,
  active: Home,
  pending: Users,
  confirmed: BedDouble,
  checkedIn: ArrowRightLeft,
  checkedOut: Home,
  cancelled: CircleDollarSign,
  arrivals: CalendarDays,
  departures: CalendarDays,
  occupancy: TrendingUp,
};

const BookingStats = ({ stats, isLoading = false }) => {
  const { t } = useLocalization();

  if (isLoading) {
    return (
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.key] || CalendarDays;
        const isPositive = stat.trend >= 0;

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t(`booking.stats.${stat.key}`, stat.label)}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-xl bg-[#6D28D9]/10 p-2.5 text-[#6D28D9] dark:bg-[#6D28D9]/20">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div
                className={`flex items-center gap-1 font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(stat.trend)}%
              </div>
              <span className="text-slate-500 dark:text-slate-400">
                {stat.caption}
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6]"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BookingStats;