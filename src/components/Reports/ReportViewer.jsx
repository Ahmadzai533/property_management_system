import { motion } from "framer-motion";
import { FileText, Download, Printer, Share2, RefreshCw } from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

export function ReportViewer({ title }) {
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between ${isRTL ? "lg:flex-row-reverse" : ""}`}>
        <div className={isRTL ? "text-right" : "text-left"}>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {t("reports.viewer.preview")}
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {title || t("reports.viewer.title")}
          </h3>
        </div>
        <div className={`flex flex-wrap gap-2 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <Button variant="secondary" size="sm" icon={Printer}>
            {t("reports.actions.print")}
          </Button>
          <Button variant="secondary" size="sm" icon={Download}>
            {t("reports.export.pdf")}
          </Button>
          <Button variant="secondary" size="sm" icon={Share2}>
            {t("reports.actions.share")}
          </Button>
          <Button variant="secondary" size="sm" icon={RefreshCw}>
            {t("reports.actions.refresh")}
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
        <div className={`flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white ${isRTL ? "flex-row-reverse" : ""}`}>
          <FileText className="h-4 w-4" /> {t("reports.viewer.summary")}
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
            <p className={`text-xs uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
              {t("reports.viewer.period")}
            </p>
            <p className={`mt-1 font-semibold text-slate-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}>
              {t("reports.viewer.periodExample")}
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
            <p className={`text-xs uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
              {t("reports.viewer.records")}
            </p>
            <p className={`mt-1 font-semibold text-slate-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}>
              {t("reports.viewer.recordsExample")}
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
            <p className={`text-xs uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
              {t("reports.viewer.generatedBy")}
            </p>
            <p className={`mt-1 font-semibold text-slate-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}>
              {t("reports.viewer.generatedByExample")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}