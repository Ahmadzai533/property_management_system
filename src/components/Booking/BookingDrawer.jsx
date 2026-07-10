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

const BookingDrawer = ({ isOpen, onClose, booking }) => {
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Booking Details
                </p>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {booking.bookingNumber}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close drawer"
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
                      Check-in
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {booking.checkIn}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Check-out
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {booking.checkOut}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Booking Information
                </h3>
                <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Source</span>
                    <span>{booking.source}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Assigned Staff</span>
                    <span>{booking.assignedStaff}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment</span>
                    <span>
                      <BookingStatusBadge
                        status={booking.paymentStatus}
                        type="payment"
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Amount</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${booking.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Activity Timeline
                </h3>
                <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    Booking created · {booking.createdBy}
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    Guest confirmed stay preferences
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    Payment status updated to {booking.paymentStatus}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
              <Button variant="secondary" icon={Printer}>
                Print
              </Button>
              <Button variant="secondary" icon={Download}>
                PDF
              </Button>
              <Button icon={CheckCircle2}>Check In</Button>
              <Button variant="danger" icon={LogOut}>
                Check Out
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingDrawer;
