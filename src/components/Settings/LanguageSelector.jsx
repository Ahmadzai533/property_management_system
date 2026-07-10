import { motion } from "framer-motion";

const languages = [
  { code: "fa", name: "Dari", flag: "🇦🇫", rtl: true },
  { code: "ps", name: "Pashto", flag: "🇦🇫", rtl: true },
  { code: "en", name: "English", flag: "🇺🇸", rtl: false },
];

const LanguageSelector = ({ value, onChange }) => {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {languages.map((language) => {
        const isSelected = value === language.code;
        return (
          <motion.button
            key={language.code}
            whileHover={{ y: -2 }}
            onClick={() => onChange(language.code)}
            className={`rounded-2xl border p-4 text-left transition-all ${
              isSelected
                ? "border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-400 dark:bg-slate-800 dark:text-violet-300"
                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{language.flag}</span>
              <div>
                <p className="font-semibold">{language.name}</p>
                <p className="text-sm opacity-70">
                  {language.code.toUpperCase()}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
