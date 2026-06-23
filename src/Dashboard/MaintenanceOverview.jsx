import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Wrench } from 'lucide-react'

const MaintenanceOverview = () => {
  const [data] = useState([
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 28, color: '#F59E0B' },
    { name: 'Pending', value: 18, color: '#6D28D9' },
    { name: 'Overdue', value: 9, color: '#EF4444' },
  ])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-200/60">
          <p className="text-sm font-semibold text-slate-800">
            {payload[0].name}
          </p>
          <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
            {payload[0].value} tasks
          </p>
          <p className="text-xs text-slate-500">
            {Math.round((payload[0].value / 100) * 100)}%
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-slate-600">{entry.value}</span>
        </div>
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xl shadow-slate-200/30"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Maintenance Overview</h3>
          <p className="text-sm text-slate-500">Task status distribution</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg">
          <Wrench className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-600">100 tasks</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend content={CustomLegend } />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default MaintenanceOverview