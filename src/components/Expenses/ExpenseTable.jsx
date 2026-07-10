import { motion } from "framer-motion";
import {
  Eye,
  Edit,
  Copy,
  CheckCircle2,
  XCircle,
  Wallet,
  Printer,
  Download,
  Trash2,
} from "lucide-react";
import { ExpenseCategoryBadge } from "./ExpenseCategoryBadge";
import DateText from "../common/DateText";

const statusClasses = {
  Draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "Pending Approval":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Approved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Paid: "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
  Cancelled:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
};

const approvalClasses = {
  Draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Approved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
};

export function ExpenseTable({ rows, onAction, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-12 animate-pulse bg-slate-100 dark:bg-slate-800" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse border-t border-slate-100 dark:border-slate-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Expense ID</th>
              <th className="px-4 py-3 font-semibold">Expense Title</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Property</th>
              <th className="px-4 py-3 font-semibold">Vendor</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Method</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Approval</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-t border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/70"
              >
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  {row.id}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900 dark:text-white">
                    {row.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {row.property} · {row.unit}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <ExpenseCategoryBadge category={row.category} />
                </td>
                <td className="px-4 py-3">{row.property}</td>
                <td className="px-4 py-3">{row.vendor}</td>
                <td className="px-4 py-3 font-semibold">
                  ${row.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">{row.paymentMethod}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[row.status] || statusClasses.Draft}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${approvalClasses[row.approvalStatus] || approvalClasses.Draft}`}
                  >
                    {row.approvalStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <DateText value={row.expenseDate} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                      onClick={() => onAction?.("view", row)}
                      aria-label={`View ${row.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                      onClick={() => onAction?.("edit", row)}
                      aria-label={`Edit ${row.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                      onClick={() => onAction?.("duplicate", row)}
                      aria-label={`Duplicate ${row.id}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      onClick={() => onAction?.("approve", row)}
                      aria-label={`Approve ${row.id}`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      onClick={() => onAction?.("reject", row)}
                      aria-label={`Reject ${row.id}`}
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                      onClick={() => onAction?.("pay", row)}
                      aria-label={`Mark paid ${row.id}`}
                    >
                      <Wallet className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                      onClick={() => onAction?.("print", row)}
                    >
                      <Printer className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                      onClick={() => onAction?.("pdf", row)}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      onClick={() => onAction?.("delete", row)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
