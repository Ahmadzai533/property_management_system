import { motion } from "framer-motion";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

export function LoadingSkeleton() {
  const { t } = useLocalization();
  
  return (
    <div className="space-y-6" role="status" aria-label={t("reports.loading.title")}>
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
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
        <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
      </div>
      <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
      <span className="sr-only">{t("reports.loading.title")}</span>
    </div>
  );
}