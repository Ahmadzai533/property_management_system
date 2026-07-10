import { motion } from "framer-motion";

const statusStyles = {
  Confirmed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Checked In": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  "Checked Out":
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Draft:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
};

const paymentStyles = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Partial: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Refunded:
    "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
};

const BookingStatusBadge = ({ status, type = "status" }) => {
  const styles = type === "payment" ? paymentStyles : statusStyles;
  const tone =
    styles[status] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
    >
      {status}
    </motion.span>
  );
};

export default BookingStatusBadge;
