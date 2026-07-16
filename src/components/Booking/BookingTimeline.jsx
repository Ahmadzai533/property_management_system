import { useLocalization } from "../../hooks/useLocalization";

const BookingTimeline = ({ items = [] }) => {
  const { t, isRTL } = useLocalization();

  if (!items || items.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {t("booking.messages.noTimelineItems")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="flex flex-col items-center">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6D28D9]" />
            {index < items.length - 1 && (
              <div className="mt-2 h-full w-px bg-slate-200 dark:bg-slate-700" />
            )}
          </div>
          <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.title}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {item.description}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              {item.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingTimeline;