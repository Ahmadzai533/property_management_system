import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Building2 } from 'lucide-react'

const OccupancyChart = () => {
  const [data] = useState([
    { property: 'Sunset Villa', occupied: 18, vacant: 2 },
    { property: 'Ocean View', occupied: 12, vacant: 3 },
    { property: 'Mountain Lodge', occupied: 8, vacant: 1 },
    { property: 'City Heights', occupied: 15, vacant: 2 },
  ])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-200/60">
          <p className="text-sm font-semibold text-slate-800 mb-1">{label}</p>
          <p className="text-sm text-emerald-600 font-semibold">
            Occupied: {payload[0].value}
          </p>
          <p className="text-sm text-red-500 font-semibold">
            Vacant: {payload[1].value}
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
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xl shadow-slate-200/30"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Occupancy Rate</h3>
          <p className="text-sm text-slate-500">Property occupancy status</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#6D28D9]/10 rounded-lg">
          <Building2 className="w-4 h-4 text-[#6D28D9]" />
          <span className="text-sm font-semibold text-[#6D28D9]">85.7%</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              type="category"
              dataKey="property"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              width={100}
            />
            <Tooltip content={CustomTooltip } />
            <Bar 
              dataKey="occupied" 
              fill="#10B981" 
              radius={[0, 8, 8, 0]}
              barSize={24}
            />
            <Bar 
              dataKey="vacant" 
              fill="#EF4444" 
              radius={[0, 8, 8, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default OccupancyChart