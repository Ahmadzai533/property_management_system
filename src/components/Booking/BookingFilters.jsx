import {
  Search,
  RefreshCcw,
  Download,
  Printer,
  SlidersHorizontal,
} from "lucide-react";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization";

const BookingFilters = ({
  searchTerm,
  onSearchChange,
  propertyFilter,
  onPropertyFilterChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
  sourceFilter,
  onSourceFilterChange,
  onReset,
  onExport,
  onPrint,
  onRefresh,
}) => {
  const { t, isRTL } = useLocalization();

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="grid gap-3 lg:grid-cols-[1.2fr,0.8fr,0.8fr,0.8fr,0.8fr] xl:grid-cols-[1.4fr,0.8fr,0.7fr,0.7fr,0.7fr]">
        <label className="relative block">
          <Search
            className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
              isRTL ? "right-3" : "left-3"
            }`}
          />
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t("booking.filters.search")}
            className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm outline-none transition focus:border-[#6D28D9] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900 ${
              isRTL ? "pr-9 pl-3" : "pl-9 pr-3"
            }`}
          />
        </label>

        <select
          value={propertyFilter}
          onChange={(event) => onPropertyFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">{t("booking.filters.allProperties")}</option>
          <option value="Sunset Residence">{t("booking.properties.sunsetResidence")}</option>
          <option value="Marina Bay">{t("booking.properties.marinaBay")}</option>
          <option value="Rosewood Villa">{t("booking.properties.rosewoodVilla")}</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">{t("booking.filters.bookingStatus")}</option>
          <option value="Confirmed">{t("booking.status.confirmed")}</option>
          <option value="Pending">{t("booking.status.pending")}</option>
          <option value="Checked In">{t("booking.status.checkedIn")}</option>
          <option value="Checked Out">{t("booking.status.checkedOut")}</option>
          <option value="Cancelled">{t("booking.status.cancelled")}</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(event) => onPaymentFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">{t("booking.filters.paymentStatus")}</option>
          <option value="Paid">{t("booking.payment.paid")}</option>
          <option value="Pending">{t("booking.payment.pending")}</option>
          <option value="Partial">{t("booking.payment.partial")}</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(event) => onSourceFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">{t("booking.filters.bookingSource")}</option>
          <option value="Direct">{t("booking.source.direct")}</option>
          <option value="OTA">{t("booking.source.ota")}</option>
          <option value="Corporate">{t("booking.source.corporate")}</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onReset}
          icon={RefreshCcw}
        >
          {t("booking.actions.reset")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          icon={Download}
        >
          {t("booking.actions.export")}
        </Button>
        <Button variant="secondary" size="sm" onClick={onPrint} icon={Printer}>
          {t("booking.actions.print")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          icon={RefreshCcw}
        >
          {t("booking.actions.refresh")}
        </Button>
        <Button variant="secondary" size="sm" icon={SlidersHorizontal}>
          {t("booking.actions.advanced")}
        </Button>
      </div>
    </div>
  );
};

export default BookingFilters;