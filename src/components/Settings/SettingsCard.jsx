import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

const SettingsCard = ({
  title,
  description,
  options,
  icon: Icon,
  route,
  onClick,
}) => {
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-start shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 p-3 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight
          className={`mt-1 h-4 w-4 text-slate-400 transition-all dark:text-slate-500 ${
            isRTL
              ? "group-hover:-translate-x-1 rotate-180"
              : "group-hover:translate-x-1"
          }`}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {options} {t("settings.configurableOptions")}
      </div>
    </motion.button>
  );
};

export default SettingsCard;