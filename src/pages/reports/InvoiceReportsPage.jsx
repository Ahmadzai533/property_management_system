import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  FilePlus2,
  Clock3,
  Download,
  Printer,
  RefreshCw,
} from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { ReportStats } from "../../components/Reports/ReportStats";
import { ReportFilters } from "../../components/Reports/ReportFilters";
import { ReportViewer } from "../../components/Reports/ReportViewer";
import { ReportSummary } from "../../components/Reports/ReportSummary";
import { RevenueChart } from "../../components/Reports/RevenueChart";
import { EmptyState } from "../../components/Reports/EmptyState";
import { useToast } from "../../hooks/useToast";
import DateText from "../../components/common/DateText";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

const invoiceRows = [
  {
    id: "INV-2026-001",
    customer: "Alicia Stone",
    property: "Sunset Towers",
    unit: "A-1201",
    invoiceDate: "2026-06-01",
    dueDate: "2026-06-15",
    amount: 3200,
    tax: 320,
    discount: 0,
    total: 3520,
    paymentStatus: "Paid",
    invoiceStatus: "Issued",
    createdBy: "Finance Admin",
  },
  {
    id: "INV-2026-002",
    customer: "Ben Carter",
    property: "Ocean View",
    unit: "B-304",
    invoiceDate: "2026-06-04",
    dueDate: "2026-06-20",
    amount: 1800,
    tax: 180,
    discount: 100,
    total: 1880,
    paymentStatus: "Pending",
    invoiceStatus: "Overdue",
    createdBy: "Accounts",
  },
  {
    id: "INV-2026-003",
    customer: "Nora Lee",
    property: "Garden Heights",
    unit: "C-502",
    invoiceDate: "2026-06-09",
    dueDate: "2026-06-25",
    amount: 2500,
    tax: 250,
    discount: 0,
    total: 2750,
    paymentStatus: "Draft",
    invoiceStatus: "Draft",
    createdBy: "Finance Admin",
  },
];

export default function InvoiceReportsPage() {
  const { toast } = useToast();
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: t("reports.stats.totalInvoices"),
        value: 1284,
        trend: 9.3,
        subtitle: t("reports.stats.issuedAcrossPortfolio"),
        icon: FileText,
        iconClassName:
          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
      },
      {
        title: t("reports.stats.paidInvoices"),
        value: 1120,
        trend: 8.2,
        subtitle: t("reports.stats.settledSuccessfully"),
        icon: CheckCircle2,
        iconClassName:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
      },
      {
        title: t("reports.stats.unpaidInvoices"),
        value: 98,
        trend: -2.1,
        subtitle: t("reports.stats.awaitingPayment"),
        icon: AlertCircle,
        iconClassName:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      },
      {
        title: t("reports.stats.overdueInvoices"),
        value: 66,
        trend: -4.8,
        subtitle: t("reports.stats.pastDue"),
        icon: Clock3,
        iconClassName:
          "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
      },
    ],
    [t],
  );

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(t("reports.messages.invoiceReportGenerated"));
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#4C1D95] dark:to-[#7C3AED]">
        <Breadcrumb white={true} />
        <div className={`mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-semibold">{t("reports.invoiceReports.title")}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
              {t("reports.invoiceReports.pageDescription")}
            </p>
          </div>
          <div className={`flex flex-wrap gap-2 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info(t("reports.messages.invoiceExportQueued"))}
            >
              <Download className={`h-4 w-4 ${isRTL ? "ms-2" : "me-2"}`} />
              {t("reports.actions.export")}
            </Button>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info(t("reports.messages.invoicePrintStarted"))}
            >
              <Printer className={`h-4 w-4 ${isRTL ? "ms-2" : "me-2"}`} />
              {t("reports.actions.print")}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <ReportStats stats={stats} isLoading={isLoading} />
        <ReportFilters
          title={t("reports.invoiceReports.filtersTitle")}
          onGenerate={handleGenerate}
          onReset={() => toast.warning(t("reports.messages.filtersReset"))}
          onExport={() => toast.success(t("reports.messages.excelExportCompleted"))}
          onPrint={() => toast.info(t("reports.messages.printPreviewOpened"))}
          onRefresh={() => toast.success(t("reports.messages.invoiceDataRefreshed"))}
          onToggleAdvanced={() => setShowAdvanced((prev) => !prev)}
        />

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 xl:grid-cols-4"
          >
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
                {t("reports.filters.invoiceStatus")}
              </span>
              <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
                <option>{t("reports.filters.all")}</option>
                <option>{t("reports.filters.issued")}</option>
                <option>{t("reports.filters.overdue")}</option>
              </select>
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
                {t("reports.filters.paymentStatus")}
              </span>
              <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
                <option>{t("reports.filters.all")}</option>
                <option>{t("reports.filters.paid")}</option>
                <option>{t("reports.filters.pending")}</option>
              </select>
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
                {t("reports.filters.createdBy")}
              </span>
              <input
                className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}
                placeholder={t("reports.filters.financeAdmin")}
              />
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
                {t("reports.filters.approvalStatus")}
              </span>
              <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
                <option>{t("reports.filters.approved")}</option>
                <option>{t("reports.filters.pending")}</option>
              </select>
            </label>
          </motion.div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <RevenueChart />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t("reports.charts.invoiceStatusBreakdown")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("reports.charts.invoiceStatusBreakdownDescription")}
              </p>
            </div>
            <div className="h-72">
              <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                {t("reports.charts.invoiceChartPlaceholder")}
              </div>
            </div>
          </div>
        </div>

        <ReportViewer title={t("reports.invoiceReports.portfolioReport")} />
        <ReportSummary
          title={t("reports.summary.invoiceSummary")}
          items={[
            { label: t("reports.summary.averageInvoice"), value: "$2,480" },
            { label: t("reports.summary.overdueRate"), value: "5.1%" },
            { label: t("reports.summary.draftCount"), value: "34" },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className={`mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t("reports.invoiceReports.ledger")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("reports.invoiceReports.ledgerDescription")}
              </p>
            </div>
            <div className={`flex flex-wrap gap-2 ${isRTL ? "md:flex-row-reverse" : ""}`}>
              <Button variant="secondary" size="sm" icon={FileText}>
                {t("reports.actions.viewInvoice")}
              </Button>
              <Button variant="secondary" size="sm" icon={Printer}>
                {t("reports.actions.print")}
              </Button>
              <Button variant="secondary" size="sm" icon={Download}>
                {t("reports.export.excel")}
              </Button>
            </div>
          </div>

          {invoiceRows.length > 0 ? (
            <div className="overflow-x-auto" dir={isRTL ? "rtl" : "ltr"}>
              <table className="min-w-full text-sm">
                <thead className={`bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                  <tr>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.invoiceNumber")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.customer")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.property")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.unit")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.invoiceDate")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.dueDate")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.total")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                        {row.id}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.customer}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.property}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.unit}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        <DateText value={row.invoiceDate} />
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        <DateText value={row.dueDate} />
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white" dir="ltr">
                        ${row.total.toLocaleString()}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            row.invoiceStatus === "Issued" 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" 
                              : row.invoiceStatus === "Overdue" 
                                ? "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400" 
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          }`}
                        >
                          {t(`reports.invoiceStatus.${row.invoiceStatus.toLowerCase()}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title={t("reports.empty.noInvoicesFound")}
              description={t("reports.empty.noInvoicesFoundDescription")}
              onRefresh={() => toast.success(t("reports.messages.invoiceListRefreshed"))}
            />
          )}
        </div>
      </div>
    </div>
  );
}