import { motion } from "framer-motion";
import {
  Search,
  RotateCcw,
  Download,
  Printer,
  RefreshCw,
  Filter,
} from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

export function ReportFilters({
  title,
  onGenerate,
  onReset,
  onExport,
  onPrint,
  onRefresh,
  onToggleAdvanced,
}) {
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between ${isRTL ? "lg:flex-row-reverse" : ""}`}>
        <div className={isRTL ? "text-right" : "text-left"}>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title || t("reports.filters.title")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("reports.filters.description")}
          </p>
        </div>
        <div className={`flex flex-wrap gap-2 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={onRefresh}
          >
            {t("reports.actions.refresh")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Filter}
            onClick={onToggleAdvanced}
          >
            {t("reports.filters.advanced")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={onExport}
          >
            {t("reports.export.excel")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={onPrint}
          >
            {t("reports.actions.print")}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
            {t("reports.filters.search")}
          </span>
          <div className={`flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className={`w-full bg-transparent text-sm outline-none ${isRTL ? "text-right" : "text-left"}`}
              placeholder={t("reports.filters.searchPlaceholder")}
            />
          </div>
        </label>
        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
            {t("reports.filters.property")}
          </span>
          <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
            <option>{t("reports.filters.allProperties")}</option>
            <option>{t("reports.filters.sunsetTowers")}</option>
            <option>{t("reports.filters.oceanView")}</option>
          </select>
        </label>
        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
            {t("reports.filters.paymentMethod")}
          </span>
          <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
            <option>{t("reports.filters.allMethods")}</option>
            <option>{t("reports.filters.bankTransfer")}</option>
            <option>{t("reports.filters.creditCard")}</option>
          </select>
        </label>
        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
            {t("reports.filters.period")}
          </span>
          <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
            <option>{t("reports.filters.monthly")}</option>
            <option>{t("reports.filters.quarterly")}</option>
            <option>{t("reports.filters.yearly")}</option>
          </select>
        </label>
      </div>

      <div className={`mt-3 flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        <Button variant="primary" size="sm" onClick={onGenerate}>
          {t("reports.actions.generate")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={RotateCcw}
          onClick={onReset}
        >
          {t("reports.actions.resetFilters")}
        </Button>
      </div>
    </motion.div>
  );
}