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
import { useLocalization } from "../../hooks/useLocalization";

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

const BookingDetailsPage = () => {
  const { t } = useLocalization();

  const timeline = [
    {
      title: t("booking.details.timeline.bookingCreated"),
      description: t("booking.details.timeline.bookingCreatedDesc"),
      time: "Jun 18, 2026 10:12",
    },
    {
      title: t("booking.details.timeline.paymentReceived"),
      description: t("booking.details.timeline.paymentReceivedDesc"),
      time: "Jun 18, 2026 10:24",
    },
    {
      title: t("booking.details.timeline.guestConfirmed"),
      description: t("booking.details.timeline.guestConfirmedDesc"),
      time: "Jun 20, 2026 09:40",
    },
  ];

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">
              {t("booking.details.overview")}
            </p>
            <h1 className="mt-1 text-2xl font-bold">{booking.bookingNumber}</h1>
            <p className="mt-2 text-sm text-white/80">
              {t("booking.details.premiumDetails", { guest: booking.guest })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              icon={Printer}
            >
              {t("booking.actions.print")}
            </Button>
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              icon={Download}
            >
              {t("booking.actions.pdf")}
            </Button>
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              icon={CheckCircle2}
            >
              {t("booking.actions.checkIn")}
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
                {t("booking.details.guestProfile")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("booking.details.primaryReservationHolder")}
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
                {t("booking.details.corporateGuest")}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Home className="h-4 w-4" /> {t("booking.summary.property")}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.property}
              </p>
              <p className="text-sm text-slate-500">{t("booking.details.unit")} {booking.unit}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <CalendarDays className="h-4 w-4" /> {t("booking.details.stay")}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.checkIn} → {booking.checkOut}
              </p>
              <p className="text-sm text-slate-500">{t("booking.details.nights", { count: 4 })}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <User className="h-4 w-4" /> {t("booking.drawer.assignedStaff")}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.assignedStaff}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <CreditCard className="h-4 w-4" /> {t("booking.table.payment")}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {booking.paymentStatus}
              </p>
              <p className="text-sm text-slate-500">
                {t("booking.details.deposit")} ${booking.deposit}
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
                {t("booking.timeline.title")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("booking.details.reservationActivityHistory")}
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
                {t("booking.details.totalAmount")}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${booking.amount.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                {t("booking.details.outstanding")}
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