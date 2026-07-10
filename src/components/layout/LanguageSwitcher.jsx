import { useLocalization } from "../../hooks/useLocalization";

const LanguageSwitcher = () => {
  const { language, setLanguage, supportedLanguages, currentLanguage } =
    useLocalization();

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {currentLanguage.nativeName}
      </span>
      <select
        aria-label="Language"
        className="bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {supportedLanguages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
