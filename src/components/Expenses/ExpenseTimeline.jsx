import { motion } from "framer-motion";

export function ExpenseTimeline({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex gap-3"
        >
          <div className="flex flex-col items-center">
            <div className="mt-1 h-3 w-3 rounded-full bg-[#6D28D9]" />
            {index < items.length - 1 && (
              <div className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-700" />
            )}
          </div>
          <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.title}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {item.description}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              {item.time}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
