import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Plus } from "lucide-react";
import Button from "../common/Button";

export function ExpenseDrawer({ open, onClose, mode = "create" }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/50"
        onClick={onClose}
      >
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-white p-6 shadow-2xl dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                {mode === "edit" ? "Edit Expense" : "New Expense"}
              </p>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {mode === "edit"
                  ? "Update expense details"
                  : "Create a new expense record"}
              </h2>
            </div>
            <button
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              onClick={onClose}
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-2">
            <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Basic Information
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="mb-1 block">Expense Title</span>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800"
                    placeholder="HVAC maintenance"
                  />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="mb-1 block">Category</span>
                  <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800">
                    <option>Maintenance</option>
                    <option>Utilities</option>
                    <option>Security</option>
                  </select>
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
                  <span className="mb-1 block">Description</span>
                  <textarea
                    className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Describe the expense, scope, and business context"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Vendor Information
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Vendor Name
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Contact
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Email
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Phone
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Financial Information
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Amount
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Tax
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Discount
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Total
                  <input className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800" />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Attachments
              </h3>
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800/60">
                <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Drop files here or browse
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Invoices, receipts, quotations, purchase orders
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  className="mt-4"
                >
                  Add Files
                </Button>
              </div>
            </section>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary">Save Expense</Button>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
