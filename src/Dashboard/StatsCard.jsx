import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
function StatsCard({ title, value, icon: Icon, change = 0, gradient = false }) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      className={`relative overflow-hidden rounded-2xl p-6 card-hover ${
        gradient
          ? "gradient-primary text-white"
          : "bg-white border border-slate-200/60"
      }`}
    >
      {/* Background pattern */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${
          gradient ? "bg-white/5" : "bg-slate-50"
        }`}
      />
      <div
        className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full ${
          gradient ? "bg-white/5" : "bg-slate-50"
        }`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`p-3 rounded-xl ${
              gradient ? "bg-white/20" : "bg-[#6D28D9]/10"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                gradient ? "text-white" : "text-[#6D28D9]"
              }`}
            />
          </div>
          {change !== 0 && (
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                isPositive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>

        <h3
          className={`text-sm font-medium mb-1 ${
            gradient ? "text-white/80" : "text-slate-500"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-2xl font-bold ${
            gradient ? "text-white" : "text-slate-800"
          }`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

export default StatsCard;
