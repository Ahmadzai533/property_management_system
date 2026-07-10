const BookingSummary = ({ booking }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        Reservation Summary
      </h3>
      <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between">
          <span>Guest</span>
          <span>{booking?.guest}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Property</span>
          <span>{booking?.property}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Check-in</span>
          <span>{booking?.checkIn}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ${booking?.amount?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
