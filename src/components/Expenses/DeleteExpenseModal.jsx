import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "../common/Button";

export function DeleteExpenseModal({ open, onClose, expense, onConfirm }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4"
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-rose-100 p-3 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Delete Expense?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              {expense?.title}
            </p>
            <p className="mt-1">
              {expense?.id} · ${expense?.amount?.toLocaleString()}
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
