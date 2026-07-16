import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import PageHeader from "../../components/Shared/PageHeader";
import Button from "../../components/common/Button";
import BookingStatusBadge from "../../components/Booking/BookingStatusBadge";
import { useLocalization } from "../../hooks/useLocalization";

const calendarEvents = [
  {
    id: 1,

    guest: "Ava Thompson",
    property: "Sunset Residence",
    unit: "A-204",
    status: "Confirmed",
    checkIn: "07/08",
    checkOut: "07/12",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 2,
    guest: "Liam Patel",
    property: "Marina Bay",
    unit: "P-101",
    status: "Pending",
    checkIn: "07/10",
    checkOut: "07/14",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    guest: "Sofia Hassan",
    property: "Rosewood Villa",
    unit: "V-08",
    status: "Checked In",
    checkIn: "07/09",
    checkOut: "07/15",
    color: "from-sky-500 to-cyan-600",
  },
];

const BookingCalendarPage = () => {
  const [view, setView] = useState("month");
  const { t, isRTL } = useLocalization();

  const viewOptions = [
    { key: "day", label: t("booking.calendar.views.day") },
    { key: "week", label: t("booking.calendar.views.week") },
    { key: "month", label: t("booking.calendar.views.month") },
    { key: "timeline", label: t("booking.calendar.views.timeline") },
  ];

  const weekDays = [
    t("booking.calendar.days.sun"),
    t("booking.calendar.days.mon"),
    t("booking.calendar.days.tue"),
    t("booking.calendar.days.wed"),
    t("booking.calendar.days.thu"),
    t("booking.calendar.days.fri"),
    t("booking.calendar.days.sat"),
  ];

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={[
          { label: t("navigation.dashboard"), href: "/" },
          { label: t("navigation.bookings"), href: "/bookings/list" },
          { label: t("booking.calendar.title") },
        ]}
        title={t("booking.calendar.heading")}
        subtitle={t("booking.calendar.subtitle")}
      />

      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {viewOptions.map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`rounded-xl px-3 py-2 text-sm capitalize ${view === item.key ? "bg-[#6D28D9] text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder={t("booking.calendar.searchPlaceholder")}
                className="bg-transparent outline-none"
              />
            </label>
            <Button variant="secondary" size="sm" icon={SlidersHorizontal}>
              {t("booking.actions.filter")}
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t("booking.calendar.months.july")} 2026
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t(`booking.calendar.views.${view}`).toUpperCase()}{" "}
                  {t("booking.calendar.view")}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-2 shadow-sm dark:bg-slate-900">
                <CalendarDays className="h-5 w-5 text-[#6D28D9]" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className={`flex h-20 flex-col rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <span className="text-xs text-slate-400">{index + 1}</span>
                  {index === 7 && (
                    <div className="mt-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-1 text-[10px] text-white">
                      {t("booking.calendar.guestAbbr.ava")}
                    </div>
                  )}
                  {index === 9 && (
                    <div className="mt-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 p-1 text-[10px] text-white">
                      {t("booking.calendar.guestAbbr.liam")}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border border-slate-200 bg-gradient-to-r ${event.color} p-[1px]`}
              >
                <div className="rounded-[15px] bg-white p-4 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {event.guest}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {event.property} · {event.unit}
                      </p>
                    </div>
                    <BookingStatusBadge status={event.status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>
                      {t("booking.calendar.checkIn")} {event.checkIn}
                    </span>
                    <span>
                      {t("booking.calendar.checkOut")} {event.checkOut}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarPage;
