import { useLocalization } from "../../hooks/useLocalization";

const BookingSummary = ({ booking }) => {
  const { t } = useLocalization();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        {t("booking.summary.title")}
      </h3>
      <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between">
          <span>{t("booking.summary.guest")}</span>
          <span>{booking?.guest}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("booking.summary.property")}</span>
          <span>{booking?.property}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("booking.summary.checkIn")}</span>
          <span>{booking?.checkIn}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("booking.summary.total")}</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ${booking?.amount?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;