import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Jan", revenue: 24000, expenses: 18000 },
  { name: "Feb", revenue: 26000, expenses: 19000 },
  { name: "Mar", revenue: 28000, expenses: 20000 },
  { name: "Apr", revenue: 30000, expenses: 21000 },
  { name: "May", revenue: 32000, expenses: 22000 },
  { name: "Jun", revenue: 34000, expenses: 23000 },
];

export function RevenueChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Revenue Trend
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly financial performance overview.
          </p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6D28D9"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
