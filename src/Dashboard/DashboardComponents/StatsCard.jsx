import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  change = 0,
  gradient = false,
}) => {
  const isPositive = change >= 0;
  const showChange = change !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      className={`
        relative overflow-hidden rounded-2xl p-5 sm:p-6 
        min-h-[140px] sm:min-h-[160px] md:min-h-[180px]
        flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${
          gradient
            ? "gradient-primary text-white shadow-xl shadow-[#6D28D9]/20"
            : "bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-2xl dark:shadow-slate-800/30"
        }
        ${gradient ? "hover:shadow-2xl hover:shadow-[#6D28D9]/30" : ""}
      `}
      role="article"
      aria-label={`${title} card: ${value}`}
    >
      {/* Background decorative patterns */}
      <div
        className={`
          absolute -right-8 -top-8 w-24 sm:w-32 h-24 sm:h-32 
          rounded-full transition-all duration-500
          ${gradient ? "bg-white/10" : "bg-slate-50 dark:bg-slate-700/30"}
        `}
        aria-hidden="true"
      />
      <div
        className={`
          absolute -right-4 -bottom-4 w-16 sm:w-20 h-16 sm:h-20 
          rounded-full transition-all duration-500
          ${gradient ? "bg-white/10" : "bg-slate-50/80 dark:bg-slate-700/20"}
        `}
        aria-hidden="true"
      />
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          w-48 h-48 rounded-full opacity-[0.03]
          ${gradient ? "bg-white" : "bg-[#6D28D9]"}
        `}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top section: Icon and Change indicator */}
        <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
          <div
            className={`
              flex-shrink-0 p-2.5 sm:p-3 rounded-xl
              transition-all duration-300 ease-in-out
              ${
                gradient
                  ? "bg-white/20 hover:bg-white/30"
                  : "bg-[#6D28D9]/10 hover:bg-[#6D28D9]/15 dark:bg-[#6D28D9]/20 dark:hover:bg-[#6D28D9]/30"
              }
            `}
            aria-hidden="true"
          >
            <Icon
              className={`
                w-4 h-4 sm:w-5 sm:h-5 
                transition-transform duration-300 ease-in-out
                group-hover:scale-110
                ${gradient ? "text-white" : "text-[#6D28D9]"}
              `}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          {showChange && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className={`
                flex-shrink-0 flex items-center gap-1 px-2 sm:px-2.5 
                py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs 
                font-semibold whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${
                  isPositive
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-900/70"
                    : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/70"
                }
                ${gradient ? "backdrop-blur-sm bg-opacity-90" : ""}
              `}
              role="status"
              aria-label={`${isPositive ? "Increase" : "Decrease"} of ${Math.abs(change)}%`}
            >
              {isPositive ? (
                <ArrowUp
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <ArrowDown
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <span>{Math.abs(change)}%</span>
            </motion.div>
          )}
        </div>

        {/* Bottom section: Title and Value */}
        <div className="flex flex-col flex-1 justify-end">
          <h3
            className={`
              text-xs sm:text-sm font-medium mb-1 sm:mb-1.5
              truncate transition-colors duration-300
              ${gradient ? "text-white/80" : "text-slate-500 dark:text-slate-400"}
            `}
          >
            {title}
          </h3>
          <p
            className={`
              text-xl sm:text-2xl md:text-3xl font-bold
              tracking-tight transition-all duration-300
              ${gradient ? "text-white" : "text-slate-800 dark:text-white"}
              break-words
            `}
            aria-label={`Value: ${value}`}
          >
            {value}
          </p>
        </div>
      </div>

      {/* Interactive hover glow effect - only for non-gradient cards */}
      {!gradient && (
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6D28D9]/0 via-[#6D28D9]/0 to-transparent opacity-0 hover:opacity-5 transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export default StatsCard;