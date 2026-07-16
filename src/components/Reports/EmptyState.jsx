import { motion } from "framer-motion";
import { FileSpreadsheet, RefreshCw } from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

export function EmptyState({
  title,
  description,
  onRefresh,
}) {
  const { t } = useLocalization();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
        <FileSpreadsheet className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {title || t("reports.empty.title")}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {description || t("reports.empty.description")}
      </p>
      {onRefresh && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={onRefresh}
          >
            {t("reports.actions.refresh")}
          </Button>
        </div>
      )}
    </motion.div>
  );
}