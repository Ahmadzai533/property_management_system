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
import { useLocalization } from "../../hooks/useLocalization";

export function ExpenseDetails({ expense, onClose }) {
  const { t } = useLocalization();
  
  const timeline = [
    {
      title: t('finance.expense.timeline.submitted'),
      description: t('finance.expense.timeline.submittedDesc'),
      time: "Jun 18, 2026 10:12",
    },
    {
      title: t('finance.expense.timeline.awaitingApproval'),
      description: t('finance.expense.timeline.awaitingApprovalDesc'),
      time: "Jun 19, 2026 09:10",
    },
    {
      title: t('finance.expense.timeline.approved'),
      description: t('finance.expense.timeline.approvedDesc'),
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
            {t('finance.expense.summary')}
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
            <FileText className="h-4 w-4" /> {t('finance.expense.summary')}
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>{t('finance.expense.expenseId')}</span>
              <span className="font-semibold">{expense?.id}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('finance.expense.amount')}</span>
              <span className="font-semibold">
                ${expense?.amount?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t('finance.expense.tax')}</span>
              <span className="font-semibold">
                ${expense?.tax?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t('finance.expense.total')}</span>
              <span className="font-semibold">
                ${expense?.total?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Building2 className="h-4 w-4" /> {t('finance.expense.property')}
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>{t('finance.expense.property')}</span>
              <span className="font-semibold">{expense?.property}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('finance.expense.unit')}</span>
              <span className="font-semibold">{expense?.unit}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('finance.expense.vendor')}</span>
              <span className="font-semibold">{expense?.vendor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <CreditCard className="h-4 w-4" /> {t('finance.expense.paymentDetails')}
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {t('finance.expense.paymentMethod')}
            </p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {expense?.paymentMethod}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {t('finance.expense.paymentStatus')}
            </p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {expense?.status}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <User className="h-4 w-4" /> {t('finance.expense.approvalTimeline')}
        </div>
        <div className="mt-4">
          <ExpenseTimeline items={timeline} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" icon={Edit}>
          {t('common.edit')}
        </Button>
        <Button variant="secondary" icon={Printer}>
          {t('common.print')}
        </Button>
        <Button variant="secondary" icon={Download}>
          {t('finance.expense.downloadPdf')}
        </Button>
        <Button variant="success" icon={CheckCircle2}>
          {t('finance.expense.approve')}
        </Button>
        <Button variant="danger" icon={XCircle}>
          {t('finance.expense.reject')}
        </Button>
        <Button variant="secondary" icon={Trash2}>
          {t('common.delete')}
        </Button>
      </div>
    </motion.div>
  );
}  