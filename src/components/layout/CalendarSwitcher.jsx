import { useLocalization } from "../../hooks/useLocalization";

const CalendarSwitcher = () => {
  const { calendar, setCalendar, supportedCalendars } = useLocalization();

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <select
        aria-label="Calendar"
        className="bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
        value={calendar}
        onChange={(event) => setCalendar(event.target.value)}
      >
        {supportedCalendars.map((item) => (
          <option key={item.code} value={item.code}>
            {item.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendarSwitcher;
