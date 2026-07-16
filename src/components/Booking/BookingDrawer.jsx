import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  CreditCard,
  Home,
  User,
  CalendarDays,
  Printer,
  Download,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import Button from "../common/Button";
import BookingStatusBadge from "./BookingStatusBadge";
import { useLocalization } from "../../hooks/useLocalization";

const BookingDrawer = ({ isOpen, onClose, booking }) => {
  const { t, isRTL } = useLocalization();

  if (!booking) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={`fixed top-0 z-50 flex h-full w-full max-w-xl flex-col border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 ${
              isRTL
                ? "left-0 border-r"
                : "right-0 border-l"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {t("booking.drawer.bookingDetails")}
                </p>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {booking.bookingNumber}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={t("booking.actions.close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {booking.guest}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {booking.property} · {booking.unit}
                    </p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {t("booking.table.checkIn")}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {booking.checkIn}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {t("booking.table.checkOut")}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {booking.checkOut}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t("booking.drawer.bookingInformation")}
                </h3>
                <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>{t("booking.drawer.source")}</span>
                    <span>{booking.source}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("booking.drawer.assignedStaff")}</span>
                    <span>{booking.assignedStaff}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("booking.table.payment")}</span>
                    <span>
                      <BookingStatusBadge
                        status={booking.paymentStatus}
                        type="payment"
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("booking.table.amount")}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${booking.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t("booking.drawer.activityTimeline")}
                </h3>
                <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    {t("booking.drawer.bookingCreated")} · {booking.createdBy}
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    {t("booking.drawer.guestConfirmedPreferences")}
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    {t("booking.drawer.paymentUpdated", { status: booking.paymentStatus })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
              <Button variant="secondary" icon={Printer}>
                {t("booking.actions.print")}
              </Button>
              <Button variant="secondary" icon={Download}>
                {t("booking.actions.pdf")}
              </Button>
              <Button icon={CheckCircle2}>{t("booking.actions.checkIn")}</Button>
              <Button variant="danger" icon={LogOut}>
                {t("booking.actions.checkOut")}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingDrawer;