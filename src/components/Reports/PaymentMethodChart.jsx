import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Bank Transfer", value: 42 },
  { name: "Credit Card", value: 28 },
  { name: "Cash", value: 15 },
  { name: "Wallet", value: 15 },
];

const colors = ["#6D28D9", "#10B981", "#F59E0B", "#3B82F6"];

export function PaymentMethodChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Payment Methods
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Distribution across settlement channels.
        </p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
