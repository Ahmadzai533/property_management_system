import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Maintenance", amount: 12000 },
  { name: "Utilities", amount: 9000 },
  { name: "Security", amount: 7000 },
  { name: "Payroll", amount: 15000 },
  { name: "Insurance", amount: 5000 },
];

export function ExpenseChart() {
  const { t } = useLocalization();
  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t("reports.charts.expenses")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("reports.charts.expensesDescription")}
          </p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="amount" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}