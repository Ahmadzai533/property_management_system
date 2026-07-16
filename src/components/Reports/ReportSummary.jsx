import { motion } from "framer-motion";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

export function ReportSummary({ title, items = [] }) {
  const { t } = useLocalization();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {t("reports.summary.insights")}
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {title || t("reports.summary.title")}
          </h3>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}