import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization";

const DeleteBookingModal = ({ isOpen, onClose, onConfirm, booking }) => {
  const { t } = useLocalization();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-rose-100 p-3 text-rose-600 dark:bg-rose-900/30">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {t("booking.modal.deleteTitle")}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("booking.modal.deleteWarning")}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={t("booking.actions.close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t("booking.modal.deleteConfirmation", {
                bookingNumber: booking?.bookingNumber,
                guestName: booking?.guest,
              })}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("booking.modal.deleteConsequences")}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              {t("booking.actions.cancel")}
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              {t("booking.actions.delete")}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteBookingModal;