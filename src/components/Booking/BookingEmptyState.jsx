import { CalendarDays } from "lucide-react";
import Button from "../common/Button";

const BookingEmptyState = ({ onCreate }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6D28D9]/10 text-[#6D28D9]">
        <CalendarDays className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        No bookings yet
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Create your first premium reservation and start managing arrivals,
        stays, and departures.
      </p>
      <div className="mt-5 flex justify-center">
        <Button onClick={onCreate}>Create Booking</Button>
      </div>
    </div>
  );
};

export default BookingEmptyState;
