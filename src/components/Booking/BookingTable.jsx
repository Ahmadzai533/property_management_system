import {
  Eye,
  Pencil,
  UserCheck,
  LogOut,
  CheckCircle2,
  Copy,
  Printer,
  FileDown,
  Trash2,
} from "lucide-react";
import BookingStatusBadge from "./BookingStatusBadge";
import { useLocalization } from "../../hooks/useLocalization";

const BookingTable = ({ bookings, isLoading, onAction }) => {
  const { t, isRTL } = useLocalization();

  const tableHeaders = [
    "booking.table.booking",
    "booking.table.guest",
    "booking.table.property",
    "booking.table.checkIn",
    "booking.table.checkOut",
    "booking.table.amount",
    "booking.table.payment",
    "booking.table.status",
    "booking.table.actions",
  ];

  const actionButtons = [
    { icon: Eye, action: "view", label: "booking.actions.view" },
    { icon: Pencil, action: "edit", label: "booking.actions.edit" },
    { icon: UserCheck, action: "checkin", label: "booking.actions.checkIn" },
    { icon: LogOut, action: "checkout", label: "booking.actions.checkOut" },
    { icon: CheckCircle2, action: "confirm", label: "booking.actions.confirm" },
    { icon: Copy, action: "duplicate", label: "booking.actions.duplicate" },
    { icon: Printer, action: "print", label: "booking.actions.print" },
    { icon: FileDown, action: "pdf", label: "booking.actions.downloadPdf" },
    { icon: Trash2, action: "delete", label: "booking.actions.delete" },
  ];

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60">
              <tr>
                {tableHeaders.map((headerKey) => (
                  <th
                    key={headerKey}
                    className={`px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t(headerKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 9 }).map((__, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3">
                      <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50/80 dark:bg-slate-800/60">
            <tr>
              {tableHeaders.map((headerKey) => (
                <th
                  key={headerKey}
                  className={`px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t(headerKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {booking.bookingNumber}
                  </div>
                  <div className="text-xs text-slate-500">{booking.unit}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900 dark:text-white">
                    {booking.guest}
                  </div>
                  <div className="text-xs text-slate-500">
                    {booking.assignedStaff}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {booking.property}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {booking.checkIn}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {booking.checkOut}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  ${booking.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <BookingStatusBadge
                    status={booking.paymentStatus}
                    type="payment"
                  />
                </td>
                <td className="px-4 py-3">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {actionButtons.map(({ icon: Icon, action, label }) => (
                      <button
                        key={action}
                        onClick={() => onAction(action, booking)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-[#6D28D9] hover:text-[#6D28D9] dark:border-slate-700 dark:text-slate-400"
                        aria-label={t(label)}
                        title={t(label)}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;