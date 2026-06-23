import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const RevenueChart = () => {
  const [data] = useState([
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 7800 },
    { month: 'Apr', revenue: 10500 },
    { month: 'May', revenue: 11200 },
    { month: 'Jun', revenue: 9800 },
    { month: 'Jul', revenue: 12500 },
  ])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-200/60">
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          <p className="text-sm text-[#6D28D9] font-bold">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xl shadow-slate-200/30"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Revenue Overview</h3>
          <p className="text-sm text-slate-500">Monthly income trend</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-600">+12.5%</span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={CustomTooltip } />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6D28D9"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              activeDot={{ r: 8, fill: '#6D28D9' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default RevenueChart