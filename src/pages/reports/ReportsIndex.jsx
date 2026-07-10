import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Wallet,
  TrendingUp,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import { useToast } from "../../hooks/useToast";

const reportCards = [
  {
    title: "Payment Reports",
    description:
      "Monitor collections, refunds, pending balances, and payment performance by property and tenant.",
    route: "/reports/payments",
    accent: "from-violet-500 to-fuchsia-500",
    icon: Wallet,
  },
  {
    title: "Invoice Reports",
    description:
      "Track invoice issuance, overdue balances, payment status, and revenue realization trends.",
    route: "/reports/invoices",
    accent: "from-emerald-500 to-teal-500",
    icon: FileText,
  },
  {
    title: "Financial Reports",
    description:
      "Review profitability, expenses, cash flow, and month-over-month performance in one place.",
    route: "/reports/financial",
    accent: "from-sky-500 to-indigo-500",
    icon: BarChart3,
  },
];

export default function ReportsIndex() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const heroStats = useMemo(
    () => [
      { label: "Collections", value: "$1.24M" },
      { label: "Invoices", value: "1,284" },
      { label: "Net Profit", value: "$320K" },
    ],
    [],
  );

  const handleOpen = (route) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(route);
    }, 250);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#4C1D95] dark:to-[#7C3AED]">
        <Breadcrumb white={true} />
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold">Enterprise Reports Hub</h1>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Access premium payment, invoice, and financial reporting
              dashboards with filters, exports, and executive-ready analytics.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.success("Reports refreshed")}
            >
              {" "}
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30"
              onClick={() => toast.info("Exports are ready")}
            >
              {" "}
              <TrendingUp className="h-4 w-4" /> Insights
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {heroStats.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        {reportCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => handleOpen(card.route)}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`inline-flex rounded-2xl bg-gradient-to-r ${card.accent} p-3 text-white`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {card.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
