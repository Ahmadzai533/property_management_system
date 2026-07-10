import { motion } from "framer-motion";
import Breadcrumb from "../common/Breadcrumb";

const SettingsHeader = ({
  title,
  description,
  actions,
  badge = "Enterprise",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg shadow-violet-500/20 dark:from-[#4C1D95] dark:to-[#7C3AED]"
    >
      <Breadcrumb white={true} />
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            {badge}
          </div>
          <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            {description}
          </p>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </motion.div>
  );
};

export default SettingsHeader;
