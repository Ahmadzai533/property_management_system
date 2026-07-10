import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export function ExpenseStats({ stats, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-4 h-8 w-28 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.prefix || ""}
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
                {stat.suffix || ""}
              </p>
            </div>
            <div
              className={`rounded-xl p-3 ${stat.iconClassName || "bg-[#6D28D9]/10 text-[#6D28D9]"}`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {stat.subtitle}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${stat.trend >= 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"}`}
            >
              {stat.trend >= 0 ? (
                <ArrowUp className="mr-1 h-3.5 w-3.5" />
              ) : (
                <ArrowDown className="mr-1 h-3.5 w-3.5" />
              )}
              {Math.abs(stat.trend)}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
