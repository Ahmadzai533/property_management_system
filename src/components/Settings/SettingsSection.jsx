import { motion } from "framer-motion";
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

const SettingsSection = ({
  title,
  description,
  icon: Icon,
  children,
  actions,
}) => {
  const { locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${
          isRTL ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {Icon && (
            <div className="rounded-2xl bg-violet-100 p-2.5 text-violet-600 dark:bg-slate-800 dark:text-violet-300">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className={isRTL ? "text-right" : ""}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
        {actions}
      </div>
      <div className="mt-6 space-y-4">{children}</div>
    </motion.section>
  );
};

export default SettingsSection;