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

const BookingTable = ({ bookings, isLoading, onAction }) => {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60">
              <tr>
                {[
                  "Booking",
                  "Guest",
                  "Property",
                  "Check-in",
                  "Checkout",
                  "Amount",
                  "Payment",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300"
                  >
                    {heading}
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
              {[
                "Booking",
                "Guest",
                "Property",
                "Check-in",
                "Checkout",
                "Amount",
                "Payment",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300"
                >
                  {heading}
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
                    {[
                      { icon: Eye, action: "view" },
                      { icon: Pencil, action: "edit" },
                      { icon: UserCheck, action: "checkin" },
                      { icon: LogOut, action: "checkout" },
                      { icon: CheckCircle2, action: "confirm" },
                      { icon: Copy, action: "duplicate" },
                      { icon: Printer, action: "print" },
                      { icon: FileDown, action: "pdf" },
                      { icon: Trash2, action: "delete" },
                    ].map(({ icon: Icon, action }) => (
                      <button
                        key={action}
                        onClick={() => onAction(action, booking)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-[#6D28D9] hover:text-[#6D28D9] dark:border-slate-700 dark:text-slate-400"
                        aria-label={action}
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
