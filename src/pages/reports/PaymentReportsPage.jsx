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
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: "Total Payments",
        value: 1842,
        prefix: "$",
        trend: 12.4,
        subtitle: "Monthly collections",
        icon: Wallet,
        iconClassName:
          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
      },
      {
        title: "Paid Amount",
        value: 1245000,
        prefix: "$",
        trend: 9.8,
        subtitle: "Collected this period",
        icon: CheckCircle2,
        iconClassName:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
      },
      {
        title: "Pending Payments",
        value: 128,
        trend: -3.1,
        subtitle: "Awaiting settlement",
        icon: AlertCircle,
        iconClassName:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      },
      {
        title: "Failed Payments",
        value: 26,
        trend: -2.5,
        subtitle: "Requires follow-up",
        icon: CircleDollarSign,
        iconClassName:
          "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
      },
    ],
    [],
  );

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Payment report generated");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#4C1D95] dark:to-[#7C3AED]">
        <Breadcrumb white={true} />
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Payment Reports</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
              Track payer activity, collection performance, outstanding
              balances, and payment success across your portfolio.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info("Export queued")}
            >
              {" "}
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info("Print started")}
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
          title="Payment report filters"
          onGenerate={handleGenerate}
          onReset={() => toast.warning("Filters reset")}
          onExport={() => toast.success("Excel export completed")}
          onPrint={() => toast.info("Print preview opened")}
          onRefresh={() => toast.success("Payment data refreshed")}
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
                placeholder="$1,000 - $5,000"
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
                Created By
              </span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                placeholder="Finance Admin"
              />
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

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <RevenueChart />
          <PaymentMethodChart />
        </div>

        <ReportViewer title="Payment Performance Report" />
        <ReportSummary
          title="Payment Summary"
          items={[
            { label: "Collection Rate", value: "94.8%" },
            { label: "Refunds", value: "2.1%" },
            { label: "Outstanding", value: "$184K" },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Payments Ledger
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                A detailed view of recent payment activity and settlement
                status.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" icon={FileText}>
                View Details
              </Button>
              <Button variant="secondary" size="sm" icon={Printer}>
                Print Receipt
              </Button>
              <Button variant="secondary" size="sm" icon={Download}>
                Export CSV
              </Button>
            </div>
          </div>

          {paymentRows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-3 font-semibold">Payment ID</th>
                    <th className="px-3 py-3 font-semibold">Receipt</th>
                    <th className="px-3 py-3 font-semibold">Tenant</th>
                    <th className="px-3 py-3 font-semibold">Property</th>
                    <th className="px-3 py-3 font-semibold">Unit</th>
                    <th className="px-3 py-3 font-semibold">Payment Date</th>
                    <th className="px-3 py-3 font-semibold">Method</th>
                    <th className="px-3 py-3 font-semibold">Total</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
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
                      <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white">
                        ${row.total.toLocaleString()}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : row.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"}`}
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
              title="No payment records found"
              description="Try broadening the date range or removing a filter to surface complete payment history."
              onRefresh={() => toast.success("Payment list refreshed")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
