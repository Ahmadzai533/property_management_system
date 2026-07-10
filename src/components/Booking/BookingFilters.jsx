import {
  Search,
  RefreshCcw,
  Download,
  Printer,
  SlidersHorizontal,
} from "lucide-react";
import Button from "../common/Button";

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
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="grid gap-3 lg:grid-cols-[1.2fr,0.8fr,0.8fr,0.8fr,0.8fr] xl:grid-cols-[1.4fr,0.8fr,0.7fr,0.7fr,0.7fr]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search booking number or guest"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#6D28D9] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900"
          />
        </label>

        <select
          value={propertyFilter}
          onChange={(event) => onPropertyFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">All Properties</option>
          <option value="Sunset Residence">Sunset Residence</option>
          <option value="Marina Bay">Marina Bay</option>
          <option value="Rosewood Villa">Rosewood Villa</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">Booking Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Checked In">Checked In</option>
          <option value="Checked Out">Checked Out</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(event) => onPaymentFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Partial">Partial</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(event) => onSourceFilterChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">Booking Source</option>
          <option value="Direct">Direct</option>
          <option value="OTA">OTA</option>
          <option value="Corporate">Corporate</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onReset}
          icon={RefreshCcw}
        >
          Reset
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          icon={Download}
        >
          Export
        </Button>
        <Button variant="secondary" size="sm" onClick={onPrint} icon={Printer}>
          Print
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          icon={RefreshCcw}
        >
          Refresh
        </Button>
        <Button variant="secondary" size="sm" icon={SlidersHorizontal}>
          Advanced
        </Button>
      </div>
    </div>
  );
};

export default BookingFilters;
