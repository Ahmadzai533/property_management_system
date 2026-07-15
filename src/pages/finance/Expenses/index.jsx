import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Receipt,
  Building2,
  BadgeCheck,
  CircleDollarSign,
  Banknote,
  TrendingUp,
} from "lucide-react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Button from "../../../components/common/Button";
import { ExpenseStats } from "../../../components/Expenses/ExpenseStats";
import { ExpenseFilters } from "../../../components/Expenses/ExpenseFilters";
import { ExpenseTable } from "../../../components/Expenses/ExpenseTable";
import { ExpenseDrawer } from "../../../components/Expenses/ExpenseDrawer";
import { ExpenseDetails } from "../../../components/Expenses/ExpenseDetails";
import { DeleteExpenseModal } from "../../../components/Expenses/DeleteExpenseModal";
import { useToast } from "../../../hooks/useToast";
import { useLocalization } from "../../../hooks/useLocalization";

export default function ExpensesPage() {
  const { t } = useLocalization();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading] = useState(false);
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: t('nav.finance'), href: "/finance" },
    { label: t('finance.expenses') },
  ];

  const initialExpenses = [
    {
      id: "EXP-2041",
      title: "HVAC Service & Maintenance",
      category: "Maintenance",
      property: "Sunset Towers",
      unit: "A-1201",
      vendor: "BluePeak HVAC",
      amount: 4200,
      tax: 420,
      total: 4620,
      paymentMethod: "Bank Transfer",
      status: "Paid",
      approvalStatus: "Approved",
      expenseDate: "2026-06-18",
      dueDate: "2026-06-24",
      createdBy: "Nadia Khan",
      lastUpdated: "2h ago",
    },
    {
      id: "EXP-2042",
      title: "Water Utility Refill",
      category: "Water",
      property: "Ocean View",
      unit: "B-304",
      vendor: "Metro Water Co.",
      amount: 850,
      tax: 85,
      total: 935,
      paymentMethod: "Cash",
      status: "Pending Approval",
      approvalStatus: "Pending",
      expenseDate: "2026-06-20",
      dueDate: "2026-06-27",
      createdBy: "Ayesha Noor",
      lastUpdated: "5h ago",
    },
    {
      id: "EXP-2043",
      title: "Security Patrol Services",
      category: "Security",
      property: "Garden Heights",
      unit: "C-502",
      vendor: "PeakGuard Security",
      amount: 2800,
      tax: 280,
      total: 3080,
      paymentMethod: "Credit Card",
      status: "Approved",
      approvalStatus: "Approved",
      expenseDate: "2026-06-17",
      dueDate: "2026-06-25",
      createdBy: "Liam Cruz",
      lastUpdated: "1d ago",
    },
  ];

  const statsData = [
    {
      title: t('finance.expense.stats.totalExpenses'),
      value: 2845000,
      prefix: "$",
      trend: 12.4,
      subtitle: t('finance.expense.stats.ytdSpend'),
      icon: Receipt,
      iconClassName: "bg-[#6D28D9]/10 text-[#6D28D9]",
    },
    {
      title: t('finance.expense.stats.monthlyExpenses'),
      value: 324500,
      prefix: "$",
      trend: 8.2,
      subtitle: t('finance.expense.stats.currentMonth'),
      icon: CircleDollarSign,
      iconClassName:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      title: t('finance.expense.stats.pendingApprovals'),
      value: 18,
      trend: -2.1,
      subtitle: t('finance.expense.stats.awaitingReview'),
      icon: BadgeCheck,
      iconClassName:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    },
    {
      title: t('finance.expense.stats.vendorPayments'),
      value: 214,
      trend: 11.3,
      subtitle: t('finance.expense.stats.processedThisMonth'),
      icon: Banknote,
      iconClassName:
        "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
    },
  ];

  const handleAction = (action, row) => {
    switch (action) {
      case "view":
        setSelectedExpense(row);
        setDetailsOpen(true);
        break;
      case "edit":
        setSelectedExpense(row);
        setDrawerOpen(true);
        break;
      case "duplicate":
        toast.info(t('finance.expense.messages.duplicated'));
        break;
      case "approve":
        setExpenses((prev) =>
          prev.map((item) =>
            item.id === row.id
              ? { ...item, status: "Approved", approvalStatus: "Approved" }
              : item,
          ),
        );
        toast.success(t('finance.expense.messages.approved'));
        break;
      case "reject":
        setExpenses((prev) =>
          prev.map((item) =>
            item.id === row.id
              ? { ...item, status: "Rejected", approvalStatus: "Rejected" }
              : item,
          ),
        );
        toast.error(t('finance.expense.messages.rejected'));
        break;
      case "pay":
        setExpenses((prev) =>
          prev.map((item) =>
            item.id === row.id
              ? { ...item, status: "Paid", approvalStatus: "Approved" }
              : item,
          ),
        );
        toast.success(t('finance.expense.messages.paymentCompleted'));
        break;
      case "delete":
        setSelectedExpense(row);
        setDeleteOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteConfirm = () => {
    setExpenses((prev) =>
      prev.filter((item) => item.id !== selectedExpense?.id),
    );
    setDeleteOpen(false);
    toast.error(t('finance.expense.messages.deleted'));
  };

  const visibleExpenses = useMemo(() => expenses, [expenses]);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
        <Breadcrumb items={breadcrumbItems} white={true} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('finance.expenses')}
            </h1>
            <p className="mt-1 text-white/80">
              {t('finance.expense.pageSubtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              icon={Plus}
              onClick={() => setDrawerOpen(true)}
            >
              {t('finance.expense.newExpense')}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ExpenseStats stats={statsData} isLoading={isLoading} />
      </div>

      <div className="mt-6">
        <ExpenseFilters
          onSearch={() => {}}
          onReset={() => {}}
          onExport={() => toast.info(t('finance.expense.messages.exportedReport'))}
          onPrint={() => toast.info(t('finance.expense.messages.printing'))}
          onRefresh={() => toast.info(t('finance.expense.messages.refreshed'))}
          onToggleAdvanced={() => toast.info(t('finance.expense.messages.advancedReady'))}
        />
      </div>

      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t('finance.expense.ledger')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('finance.expense.ledgerDesc')}
              </p>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {visibleExpenses.length} {t('finance.expense.records')}
            </div>
          </div>
          <ExpenseTable
            rows={visibleExpenses}
            onAction={handleAction}
            isLoading={isLoading}
          />
        </motion.div>
      </div>

      <div className="mt-6">
        {detailsOpen && selectedExpense ? (
          <ExpenseDetails
            expense={selectedExpense}
            onClose={() => setDetailsOpen(false)}
          />
        ) : null}
      </div>

      <ExpenseDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={selectedExpense ? "edit" : "create"}
      />
      <DeleteExpenseModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        expense={selectedExpense}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}