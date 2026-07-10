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
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: "Total Income",
        value: 1845000,
        prefix: "$",
        trend: 15.2,
        subtitle: "Year to date",
        icon: DollarSign,
        iconClassName:
          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
      },
      {
        title: "Total Expenses",
        value: 654000,
        prefix: "$",
        trend: 4.4,
        subtitle: "Operating costs",
        icon: FileText,
        iconClassName:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
      },
      {
        title: "Net Profit",
        value: 1191000,
        prefix: "$",
        trend: 11.7,
        subtitle: "After overhead",
        icon: TrendingUp,
        iconClassName:
          "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
      },
      {
        title: "Cash Flow",
        value: 840000,
        prefix: "$",
        trend: 7.8,
        subtitle: "Liquid reserves",
        icon: Wallet,
        iconClassName:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      },
    ],
    [],
  );

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Financial report generated");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#4C1D95] dark:to-[#7C3AED]">
        <Breadcrumb white={true} />
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Financial Reports</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
              Analyze revenue, spending, profit margins, and cash positions with
              executive-level reporting tools.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info("Financial export queued")}
            >
              {" "}
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info("Financial print started")}
            >
              {" "}
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <ReportStats stats={stats} isLoading={isLoading} />
        <ReportFilters
          title="Financial report filters"
          onGenerate={handleGenerate}
          onReset={() => toast.warning("Filters reset")}
          onExport={() => toast.success("Excel export completed")}
          onPrint={() => toast.info("Print preview opened")}
          onRefresh={() => toast.success("Financial data refreshed")}
          onToggleAdvanced={() => setShowAdvanced((prev) => !prev)}
        />

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 xl:grid-cols-4"
          >
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Amount Range
              </span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                placeholder="$5,000 - $50,000"
              />
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Currency
              </span>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
                <option>USD</option>
                <option>EUR</option>
              </select>
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Financial Category
              </span>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
                <option>All</option>
                <option>Rent</option>
                <option>Maintenance</option>
              </select>
            </label>
            <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Approval Status
              </span>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
                <option>Approved</option>
                <option>Pending</option>
              </select>
            </label>
          </motion.div>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          <RevenueChart />
          <ExpenseChart />
        </div>
        <CashFlowChart />

        <ReportViewer title="Executive Financial Report" />
        <ReportSummary
          title="Performance Snapshot"
          items={[
            { label: "Profit Margin", value: "64.5%" },
            { label: "Expense Ratio", value: "35.4%" },
            { label: "Annual Growth", value: "+18.2%" },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Transaction Ledger
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                A concise ledger of financial activity with balance movement.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" icon={ArrowUpRight}>
                Export PDF
              </Button>
              <Button variant="secondary" size="sm" icon={Download}>
                Export CSV
              </Button>
            </div>
          </div>

          {financialRows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-3 font-semibold">Transaction ID</th>
                    <th className="px-3 py-3 font-semibold">Account</th>
                    <th className="px-3 py-3 font-semibold">Category</th>
                    <th className="px-3 py-3 font-semibold">Income</th>
                    <th className="px-3 py-3 font-semibold">Expense</th>
                    <th className="px-3 py-3 font-semibold">Net Balance</th>
                    <th className="px-3 py-3 font-semibold">Date</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
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
                      <td className="px-3 py-3 text-emerald-600 dark:text-emerald-400">
                        ${row.income.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-rose-600 dark:text-rose-400">
                        ${row.expense.toLocaleString()}
                      </td>
                      <td
                        className={`px-3 py-3 font-semibold ${row.balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                      >
                        ${row.balance.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        <DateText value={row.date} />
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === "Cleared" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No financial transactions found"
              description="Broaden your filters to reveal ledger entries for the selected period."
              onRefresh={() => toast.success("Ledger refreshed")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
