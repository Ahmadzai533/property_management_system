import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  Download,
  FileText,
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
import { PaymentMethodChart } from "../../components/Reports/PaymentMethodChart";
import { EmptyState } from "../../components/Reports/EmptyState";
import { useToast } from "../../hooks/useToast";
import DateText from "../../components/common/DateText";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

const paymentRows = [
  {
    id: "PAY-1001",
    receipt: "RCPT-001",
    tenant: "Alicia Stone",
    property: "Sunset Towers",
    unit: "A-1201",
    paidOn: "2026-06-08",
    dueDate: "2026-06-10",
    method: "Bank Transfer",
    amount: 3200,
    tax: 320,
    discount: 0,
    total: 3520,
    status: "Completed",
    collectedBy: "Mina",
    notes: "Auto-allocated",
  },
  {
    id: "PAY-1002",
    receipt: "RCPT-002",
    tenant: "Ben Carter",
    property: "Ocean View",
    unit: "B-304",
    paidOn: "2026-06-12",
    dueDate: "2026-06-15",
    method: "Card",
    amount: 1800,
    tax: 180,
    discount: 100,
    total: 1880,
    status: "Pending",
    collectedBy: "Liam",
    notes: "Pending clearance",
  },
  {
    id: "PAY-1003",
    receipt: "RCPT-003",
    tenant: "Nora Lee",
    property: "Garden Heights",
    unit: "C-502",
    paidOn: "2026-06-14",
    dueDate: "2026-06-14",
    method: "Cash",
    amount: 2500,
    tax: 250,
    discount: 0,
    total: 2750,
    status: "Refunded",
    collectedBy: "Sara",
    notes: "Refund initiated",
  },
];

export default function PaymentReportsPage() {
  const { toast } = useToast();
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: t("reports.stats.totalPayments"),
        value: 1842,
        prefix: "$",
        trend: 12.4,
        subtitle: t("reports.stats.monthlyCollections"),
        icon: Wallet,
        iconClassName:
          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
      },
      {
        title: t("reports.stats.paidAmount"),
        value: 1245000,
        prefix: "$",
        trend: 9.8,
        subtitle: t("reports.stats.collectedThisPeriod"),
        icon: CheckCircle2,
        iconClassName:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
      },
      {
        title: t("reports.stats.pendingPayments"),
        value: 128,
        trend: -3.1,
        subtitle: t("reports.stats.awaitingSettlement"),
        icon: AlertCircle,
        iconClassName:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      },
      {
        title: t("reports.stats.failedPayments"),
        value: 26,
        trend: -2.5,
        subtitle: t("reports.stats.requiresFollowUp"),
        icon: CircleDollarSign,
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
      toast.success(t("reports.messages.paymentReportGenerated"));
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#4C1D95] dark:to-[#7C3AED]">
        <Breadcrumb white={true} />
        <div className={`mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-semibold">{t("reports.paymentReports.title")}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
              {t("reports.paymentReports.pageDescription")}
            </p>
          </div>
          <div className={`flex flex-wrap gap-2 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info(t("reports.messages.exportQueued"))}
            >
              <Download className={`h-4 w-4 ${isRTL ? "ms-2" : "me-2"}`} />
              {t("reports.actions.export")}
            </Button>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info(t("reports.messages.printStarted"))}
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
          title={t("reports.paymentReports.filtersTitle")}
          onGenerate={handleGenerate}
          onReset={() => toast.warning(t("reports.messages.filtersReset"))}
          onExport={() => toast.success(t("reports.messages.excelExportCompleted"))}
          onPrint={() => toast.info(t("reports.messages.printPreviewOpened"))}
          onRefresh={() => toast.success(t("reports.messages.paymentDataRefreshed"))}
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
                {t("reports.filters.amountRange")}
              </span>
              <input
                className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}
                placeholder={t("reports.filters.amountRangePlaceholder")}
              />
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
                {t("reports.filters.currency")}
              </span>
              <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
                <option>{t("reports.filters.usd")}</option>
                <option>{t("reports.filters.eur")}</option>
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
          <PaymentMethodChart />
        </div>

        <ReportViewer title={t("reports.paymentReports.performanceReport")} />
        <ReportSummary
          title={t("reports.summary.paymentSummary")}
          items={[
            { label: t("reports.summary.collectionRate"), value: "94.8%" },
            { label: t("reports.summary.refunds"), value: "2.1%" },
            { label: t("reports.summary.outstanding"), value: "$184K" },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className={`mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t("reports.paymentReports.ledger")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("reports.paymentReports.ledgerDescription")}
              </p>
            </div>
            <div className={`flex flex-wrap gap-2 ${isRTL ? "md:flex-row-reverse" : ""}`}>
              <Button variant="secondary" size="sm" icon={FileText}>
                {t("reports.actions.viewDetails")}
              </Button>
              <Button variant="secondary" size="sm" icon={Printer}>
                {t("reports.actions.printReceipt")}
              </Button>
              <Button variant="secondary" size="sm" icon={Download}>
                {t("reports.export.csv")}
              </Button>
            </div>
          </div>

          {paymentRows.length > 0 ? (
            <div className="overflow-x-auto" dir={isRTL ? "rtl" : "ltr"}>
              <table className="min-w-full text-sm">
                <thead className={`bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                  <tr>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.paymentId")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.receipt")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.tenant")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.property")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.unit")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.paymentDate")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.method")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.total")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                        {row.id}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.receipt}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.tenant}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.property}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.unit}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        <DateText value={row.paidOn} />
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.method}
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white" dir="ltr">
                        ${row.total.toLocaleString()}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            row.status === "Completed" 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" 
                              : row.status === "Pending" 
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" 
                                : "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"
                          }`}
                        >
                          {t(`reports.status.${row.status.toLowerCase()}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title={t("reports.empty.noPaymentRecords")}
              description={t("reports.empty.noPaymentRecordsDescription")}
              onRefresh={() => toast.success(t("reports.messages.paymentListRefreshed"))}
            />
          )}
        </div>
      </div>
    </div>
  );
}