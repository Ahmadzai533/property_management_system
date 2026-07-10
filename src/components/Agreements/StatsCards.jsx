// src/pages/agreements/components/StatsCards.jsx
import { motion } from "framer-motion";
import { FileText, FileCheck, AlertTriangle, FileX } from "lucide-react";

const statsData = [
  {
    title: "Total Agreements",
    value: 247,
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
    subtitle: "All contracts",
  },
  {
    title: "Active Agreements",
    value: 189,
    icon: FileCheck,
    gradient: "from-green-500 to-emerald-600",
    subtitle: "76.5% of total",
  },
  {
    title: "Expiring Soon",
    value: 32,
    icon: AlertTriangle,
    gradient: "from-yellow-500 to-amber-600",
    subtitle: "7-30 days remaining",
  },
  {
    title: "Terminated / Ended",
    value: 26,
    icon: FileX,
    gradient: "from-red-500 to-rose-600",
    subtitle: "10.5% of total",
  },
];

const StatCard = ({ stat, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl -mr-8 -mt-8`}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {stat.title}
          </span>
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
          >
            <stat.icon className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
          {stat.value}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {stat.subtitle}
        </div>
      </div>
    </motion.div>
  );
};

export default function StatsCards({ isLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} stat={stat} isLoading={isLoading} />
      ))}
    </div>
  );
}
