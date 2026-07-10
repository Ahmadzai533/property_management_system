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

export function ExpenseFilters({
  onSearch,
  onReset,
  onExport,
  onPrint,
  onRefresh,
  onToggleAdvanced,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Expense Intelligence
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search, filter, and export operating expenses with precision.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={onRefresh}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Filter}
            onClick={onToggleAdvanced}
          >
            Advanced
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={onExport}
          >
            Export Excel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={onPrint}
          >
            Print
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Expense ID
          </span>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search expense ID"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </label>

        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Description
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            placeholder="Search description"
          />
        </label>

        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Category
          </span>
          <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
            <option>All categories</option>
            <option>Maintenance</option>
            <option>Utilities</option>
            <option>Security</option>
          </select>
        </label>

        <label className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Property
          </span>
          <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800">
            <option>All properties</option>
            <option>Sunset Towers</option>
            <option>Ocean View</option>
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="primary" size="sm">
          Search
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={RotateCcw}
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </motion.div>
  );
}
