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
} from "recharts";

const data = [
  { name: "Jan", cash: 18000 },
  { name: "Feb", cash: 21000 },
  { name: "Mar", cash: 24000 },
  { name: "Apr", cash: 26000 },
  { name: "May", cash: 29000 },
  { name: "Jun", cash: 31000 },
];

export function CashFlowChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Cash Flow
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Operating liquidity over the reporting period.
          </p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cash"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
