import { motion } from "framer-motion";
import {
  Search,
  RotateCcw,
  Download,
  Printer,
  RefreshCw,
  Filter,
} from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization";

export function ExpenseFilters({
  onSearch,
  onReset,
  onExport,
  onPrint,
  onRefresh,
  onToggleAdvanced,
}) {
  const { t } = useLocalization();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t('finance.expense.intelligence')}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('finance.expense.intelligenceDesc')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={onRefresh}
          >
            {t('common.refresh')}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Filter}
            onClick={onToggleAdvanced}
          >
            {t('finance.expense.advanced')}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={onExport}
          >
            {t('finance.expense.exportExcel')}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={onPrint}
          >
            {t('common.print')}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t('finance.expense.expenseId')}
          </span>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              placeholder={t('finance.expense.searchExpenseId')}
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </label>

        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t('finance.expense.description')}
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            placeholder={t('finance.expense.searchDescription')}
          />
        </label>

        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t('finance.expense.category')}
          </span>
          <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
            <option>{t('finance.expense.allCategories')}</option>
            <option>{t('finance.expense.categories.Maintenance')}</option>
            <option>{t('finance.expense.categories.Utilities')}</option>
            <option>{t('finance.expense.categories.Security')}</option>
          </select>
        </label>

        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {t('finance.expense.property')}
          </span>
          <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
            <option>{t('finance.expense.allProperties')}</option>
            <option>{t('finance.properties.sunsetTowers')}</option>
            <option>{t('finance.properties.oceanView')}</option>
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="primary" size="sm">
          {t('common.search')}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={RotateCcw}
          onClick={onReset}
        >
          {t('common.reset')}
        </Button>
      </div>
    </motion.div>
  );
}