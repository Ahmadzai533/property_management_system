import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  User,
  CreditCard,
  CheckCircle2,
  XCircle,
  Download,
  Printer,
  Edit,
  Trash2,
} from "lucide-react";
import Button from "../common/Button";
import { ExpenseCategoryBadge } from "./ExpenseCategoryBadge";
import { ExpenseTimeline } from "./ExpenseTimeline";

export function ExpenseDetails({ expense, onClose }) {
  const timeline = [
    {
      title: "Expense submitted",
      description: "Submitted by Nadia for HVAC service",
      time: "Jun 18, 2026 10:12",
    },
    {
      title: "Awaiting approval",
      description: "Assigned to finance manager",
      time: "Jun 19, 2026 09:10",
    },
    {
      title: "Approved",
      description: "Approved by finance operations",
      time: "Jun 20, 2026 11:30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Expense Summary
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {expense?.title}
          </h3>
        </div>
        <ExpenseCategoryBadge category={expense?.category} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <FileText className="h-4 w-4" /> Summary
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Expense ID</span>
              <span className="font-semibold">{expense?.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount</span>
              <span className="font-semibold">
                ${expense?.amount?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold">
                ${expense?.tax?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">
                ${expense?.total?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Building2 className="h-4 w-4" /> Property
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Property</span>
              <span className="font-semibold">{expense?.property}</span>
            </div>
            <div className="flex justify-between">
              <span>Unit</span>
              <span className="font-semibold">{expense?.unit}</span>
            </div>
            <div className="flex justify-between">
              <span>Vendor</span>
              <span className="font-semibold">{expense?.vendor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <CreditCard className="h-4 w-4" /> Payment Details
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Payment Method
            </p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {expense?.paymentMethod}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Payment Status
            </p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {expense?.status}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <User className="h-4 w-4" /> Approval Timeline
        </div>
        <div className="mt-4">
          <ExpenseTimeline items={timeline} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" icon={Edit}>
          Edit
        </Button>
        <Button variant="secondary" icon={Printer}>
          Print
        </Button>
        <Button variant="secondary" icon={Download}>
          Download PDF
        </Button>
        <Button variant="success" icon={CheckCircle2}>
          Approve
        </Button>
        <Button variant="danger" icon={XCircle}>
          Reject
        </Button>
        <Button variant="secondary" icon={Trash2}>
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
