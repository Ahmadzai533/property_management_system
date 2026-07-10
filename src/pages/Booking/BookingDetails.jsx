import { motion } from "framer-motion";
import {
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
import BookingTimeline from "../../components/Booking/BookingTimeline";
import BookingStatusBadge from "../../components/Booking/BookingStatusBadge";
import Button from "../../components/common/Button";

const booking = {
  bookingNumber: "BK-1042",
  guest: "Ava Thompson",
  property: "Sunset Residence",
  unit: "A-204",
  status: "Confirmed",
  paymentStatus: "Paid",
  amount: 3200,
  deposit: 800,
  checkIn: "2026-07-08",
  checkOut: "2026-07-12",
  source: "Direct",
  assignedStaff: "Nadia",
};

const timeline = [
  {
    title: "Booking created",
    description: "Reservation captured by Ayesha",
    time: "Jun 18, 2026 10:12",
  },
  {
    title: "Payment received",
    description: "Deposit paid successfully",
    time: "Jun 18, 2026 10:24",
  },
  {
    title: "Guest confirmed",
    description: "Arrival details shared",
    time: "Jun 20, 2026 09:40",
  },
];

const BookingDetailsPage = () => {
  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">
              Booking Overview
            </p>
            <h1 className="mt-1 text-2xl font-bold">{booking.bookingNumber}</h1>
            <p className="mt-2 text-sm text-white/80">
              Premium reservation details for {booking.guest}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              icon={Printer}
            >
              Print
            </Button>
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              icon={Download}
            >
              PDF
            </Button>
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              icon={CheckCircle2}
            >
              Check In
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Guest Profile
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Primary reservation holder
              </p>
            </div>
            <BookingStatusBadge status={booking.status} />
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6D28D9]/10 text-lg font-semibold text-[#6D28D9]">
              AT
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {booking.guest}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Corporate guest · Premium tier
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Home className="h-4 w-4" /> Property
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.property}
              </p>
              <p className="text-sm text-slate-500">Unit {booking.unit}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <CalendarDays className="h-4 w-4" /> Stay
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.checkIn} → {booking.checkOut}
              </p>
              <p className="text-sm text-slate-500">4 nights</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <User className="h-4 w-4" /> Assigned Staff
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.assignedStaff}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <CreditCard className="h-4 w-4" /> Payment
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.paymentStatus}
              </p>
              <p className="text-sm text-slate-500">
                Deposit ${booking.deposit}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Timeline
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Reservation activity history
              </p>
            </div>
            <BookingStatusBadge status={booking.paymentStatus} type="payment" />
          </div>
          <div className="mt-4">
            <BookingTimeline items={timeline} />
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Total Amount
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${booking.amount.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Outstanding
              </span>
              <span className="font-semibold text-amber-600">$0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
