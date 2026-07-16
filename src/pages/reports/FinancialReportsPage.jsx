import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  FileText,
  ArrowUpRight,
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
import { ExpenseChart } from "../../components/Reports/ExpenseChart";
import { CashFlowChart } from "../../components/Reports/CashFlowChart";
import { EmptyState } from "../../components/Reports/EmptyState";
import { useToast } from "../../hooks/useToast";
import DateText from "../../components/common/DateText";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

const financialRows = [
  {
    id: "TXN-1001",
    account: "Operating Account",
    category: "Rent",
    income: 3200,
    expense: 0,
    balance: 3200,
    date: "2026-06-16",
    reference: "INV-001",
    status: "Cleared",
  },
  {
    id: "TXN-1002",
    account: "Maintenance Reserve",
    category: "Repair",
    income: 0,
    expense: 1250,
    balance: -1250,
    date: "2026-06-16",
    reference: "PO-110",
    status: "Pending",
  },
  {
    id: "TXN-1003",
    account: "Service Account",
    category: "Utilities",
    income: 0,
    expense: 980,
    balance: -980,
    date: "2026-06-17",
    reference: "UTIL-44",
    status: "Cleared",
  },
];

export default function FinancialReportsPage() {
  const { toast } = useToast();
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: t("reports.stats.totalIncome"),
        value: 1845000,
        prefix: "$",
        trend: 15.2,
        subtitle: t("reports.stats.yearToDate"),
        icon: DollarSign,
        iconClassName:
          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
      },
      {
        title: t("reports.stats.totalExpenses"),
        value: 654000,
        prefix: "$",
        trend: 4.4,
        subtitle: t("reports.stats.operatingCosts"),
        icon: FileText,
        iconClassName:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
      },
      {
        title: t("reports.stats.netProfit"),
        value: 1191000,
        prefix: "$",
        trend: 11.7,
        subtitle: t("reports.stats.afterOverhead"),
        icon: TrendingUp,
        iconClassName:
          "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
      },
      {
        title: t("reports.stats.cashFlow"),
        value: 840000,
        prefix: "$",
        trend: 7.8,
        subtitle: t("reports.stats.liquidReserves"),
        icon: Wallet,
        iconClassName:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      },
    ],
    [t],
  );

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(t("reports.messages.financialReportGenerated"));
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#4C1D95] dark:to-[#7C3AED]">
        <Breadcrumb white={true} />
        <div className={`mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-semibold">{t("reports.financialReports.title")}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
              {t("reports.financialReports.pageDescription")}
            </p>
          </div>
          <div className={`flex flex-wrap gap-2 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info(t("reports.messages.financialExportQueued"))}
            >
              <Download className={`h-4 w-4 ${isRTL ? "ms-2" : "me-2"}`} />
              {t("reports.actions.export")}
            </Button>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info(t("reports.messages.financialPrintStarted"))}
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
          title={t("reports.financialReports.filtersTitle")}
          onGenerate={handleGenerate}
          onReset={() => toast.warning(t("reports.messages.filtersReset"))}
          onExport={() => toast.success(t("reports.messages.excelExportCompleted"))}
          onPrint={() => toast.info(t("reports.messages.printPreviewOpened"))}
          onRefresh={() => toast.success(t("reports.messages.financialDataRefreshed"))}
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
                placeholder={t("reports.filters.financialAmountRangePlaceholder")}
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
                {t("reports.filters.financialCategory")}
              </span>
              <select className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 ${isRTL ? "text-right" : "text-left"}`}>
                <option>{t("reports.filters.all")}</option>
                <option>{t("reports.filters.rent")}</option>
                <option>{t("reports.filters.maintenance")}</option>
              </select>
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

        <div className="grid gap-6 xl:grid-cols-2">
          <RevenueChart />
          <ExpenseChart />
        </div>
        <CashFlowChart />

        <ReportViewer title={t("reports.financialReports.executiveReport")} />
        <ReportSummary
          title={t("reports.summary.performanceSnapshot")}
          items={[
            { label: t("reports.summary.profitMargin"), value: "64.5%" },
            { label: t("reports.summary.expenseRatio"), value: "35.4%" },
            { label: t("reports.summary.annualGrowth"), value: "+18.2%" },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className={`mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t("reports.financialReports.transactionLedger")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("reports.financialReports.transactionLedgerDescription")}
              </p>
            </div>
            <div className={`flex flex-wrap gap-2 ${isRTL ? "md:flex-row-reverse" : ""}`}>
              <Button variant="secondary" size="sm" icon={ArrowUpRight}>
                {t("reports.export.pdf")}
              </Button>
              <Button variant="secondary" size="sm" icon={Download}>
                {t("reports.export.csv")}
              </Button>
            </div>
          </div>

          {financialRows.length > 0 ? (
            <div className="overflow-x-auto" dir={isRTL ? "rtl" : "ltr"}>
              <table className="min-w-full text-sm">
                <thead className={`bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                  <tr>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.transactionId")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.account")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.category")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.income")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.expense")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.netBalance")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.date")}</th>
                    <th className="px-3 py-3 font-semibold">{t("reports.table.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {financialRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                        {row.id}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.account}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {row.category}
                      </td>
                      <td className="px-3 py-3 text-emerald-600 dark:text-emerald-400" dir="ltr">
                        ${row.income.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-rose-600 dark:text-rose-400" dir="ltr">
                        ${row.expense.toLocaleString()}
                      </td>
                      <td
                        className={`px-3 py-3 font-semibold ${row.balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                        dir="ltr"
                      >
                        ${row.balance.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        <DateText value={row.date} />
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            row.status === "Cleared" 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" 
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          }`}
                        >
                          {t(`reports.financialStatus.${row.status.toLowerCase()}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title={t("reports.empty.noFinancialTransactions")}
              description={t("reports.empty.noFinancialTransactionsDescription")}
              onRefresh={() => toast.success(t("reports.messages.ledgerRefreshed"))}
            />
          )}
        </div>
      </div>
    </div>
  );
}