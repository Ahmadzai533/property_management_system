import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Wrench, CheckCircle, Clock, AlertCircle, AlertTriangle } from 'lucide-react'
import { useLocalization } from '../../hooks/useLocalization'

const MaintenanceOverview = () => {
  const { t } = useLocalization();

  const [data] = useState([
    { name: t('dashboard.maintenance.completed'), value: 45, color: '#10B981', icon: CheckCircle },
    { name: t('dashboard.maintenance.inProgress'), value: 28, color: '#F59E0B', icon: Clock },
    { name: t('dashboard.maintenance.pending'), value: 18, color: '#6D28D9', icon: AlertCircle },
    { name: t('dashboard.maintenance.overdue'), value: 9, color: '#EF4444', icon: AlertTriangle },
  ])

  const totalTasks = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0)
  }, [data])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      const percentage = ((item.value / totalTasks) * 100).toFixed(1)
      
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 min-w-[140px] sm:min-w-[160px]">
          <div className="flex items-center gap-2 mb-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }} 
            />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {item.name}
            </p>
          </div>
          <p className="text-lg sm:text-xl font-bold" style={{ color: item.color }}>
            {item.value} {t('dashboard.maintenance.tasks')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {percentage}% {t('dashboard.maintenance.ofTotal')}
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 px-1">
      {payload.map((entry, index) => {
        const item = data.find(d => d.name === entry.value)
        const Icon = item?.icon
        return (
          <div 
            key={`legend-${index}`} 
            className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 cursor-default"
          >
            <div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: entry.color }} 
            />
            {Icon && (
              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              {entry.value}
            </span>
          </div>
        )
      })}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-slate-800/30 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
            {t('dashboard.maintenance.title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t('dashboard.maintenance.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-amber-50 dark:bg-amber-900/30 rounded-lg flex-shrink-0 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors duration-200">
          <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 whitespace-nowrap">
            {totalTasks} {t('dashboard.maintenance.tasks')}
          </span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={3}
              dataKey="value"
              stroke="white"
              strokeWidth={2}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              content={CustomTooltip}
              cursor={{ fill: 'transparent' }}
            />
            <Legend 
              content={CustomLegend}
              verticalAlign="bottom"
              height={50}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats Footer */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }} 
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.name}</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default MaintenanceOverview