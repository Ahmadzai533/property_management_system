import { useState, useMemo } from 'react'
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
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { useLocalization } from '../../hooks/useLocalization'

const RevenueChart = () => {
  const { t } = useLocalization();

  const [data] = useState([
    { month: t('dashboard.charts.months.jan'), revenue: 8500 },
    { month: t('dashboard.charts.months.feb'), revenue: 9200 },
    { month: t('dashboard.charts.months.mar'), revenue: 7800 },
    { month: t('dashboard.charts.months.apr'), revenue: 10500 },
    { month: t('dashboard.charts.months.may'), revenue: 11200 },
    { month: t('dashboard.charts.months.jun'), revenue: 9800 },
    { month: t('dashboard.charts.months.jul'), revenue: 12500 },
  ])

  const stats = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.revenue, 0)
    const average = total / data.length
    const max = Math.max(...data.map(item => item.revenue))
    const min = Math.min(...data.map(item => item.revenue))
    const lastMonth = data[data.length - 1]?.revenue || 0
    const previousMonth = data[data.length - 2]?.revenue || 0
    const change = previousMonth > 0 ? ((lastMonth - previousMonth) / previousMonth * 100) : 0
    
    return { total, average, max, min, change, lastMonth, previousMonth }
  }, [data])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      const isPositive = value >= 0
      
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 min-w-[140px] sm:min-w-[160px]">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">{label}</p>
          <p className="text-lg sm:text-xl font-bold text-[#6D28D9]">
            ${value.toLocaleString()}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isPositive ? '↑' : '↓'} {isPositive ? t('dashboard.charts.positiveTrend') : t('dashboard.charts.negativeTrend')}
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-slate-800/30 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
            {t('dashboard.charts.revenue')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t('dashboard.charts.revenueSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <div className={`
            flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 
            rounded-lg transition-colors duration-200
            ${stats.change >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50' : 'bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50'}
          `}>
            {stats.change >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
            )}
            <span className={`
              text-xs sm:text-sm font-semibold whitespace-nowrap
              ${stats.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}
            `}>
              {stats.change >= 0 ? '+' : ''}{stats.change.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#6D28D9]/10 dark:bg-[#6D28D9]/20 rounded-lg hover:bg-[#6D28D9]/15 dark:hover:bg-[#6D28D9]/30 transition-colors duration-200">
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6D28D9]" />
            <span className="text-xs sm:text-sm font-semibold text-[#6D28D9] whitespace-nowrap">
              ${stats.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 sm:p-3">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t('dashboard.charts.average')}</p>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            ${stats.average.toFixed(0)}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 sm:p-3">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t('dashboard.charts.highest')}</p>
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            ${stats.max.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 sm:p-3">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t('dashboard.charts.lowest')}</p>
          <p className="text-xs sm:text-sm font-semibold text-red-500 dark:text-red-400">
            ${stats.min.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 sm:p-3">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t('dashboard.charts.current')}</p>
          <p className="text-xs sm:text-sm font-semibold text-[#6D28D9]">
            ${stats.lastMonth.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickMargin={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value/1000}k`}
              tickMargin={8}
            />
            <Tooltip 
              content={CustomTooltip}
              cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6D28D9"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              activeDot={{ 
                r: 6,
                fill: '#6D28D9',
                stroke: '#fff',
                strokeWidth: 2
              }}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            {t('dashboard.charts.totalRevenuePeriod')}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#6D28D9]" />
              <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300">{t('dashboard.charts.monthlyRevenue')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300">{t('dashboard.charts.trendingUp')}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RevenueChart