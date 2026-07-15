import { useState, useMemo } from 'react'
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
import { Building2, Users } from 'lucide-react'
import { useLocalization } from '../../hooks/useLocalization'

const OccupancyChart = () => {
  const { t } = useLocalization();

  const [data] = useState([
    { property: t('dashboard.charts.properties.sunsetVilla'), occupied: 18, vacant: 2 },
    { property: t('dashboard.charts.properties.oceanView'), occupied: 12, vacant: 3 },
    { property: t('dashboard.charts.properties.mountainLodge'), occupied: 8, vacant: 1 },
    { property: t('dashboard.charts.properties.cityHeights'), occupied: 15, vacant: 2 },
  ])

  const totalUnits = useMemo(() => {
    return data.reduce((sum, item) => sum + item.occupied + item.vacant, 0)
  }, [data])

  const totalOccupied = useMemo(() => {
    return data.reduce((sum, item) => sum + item.occupied, 0)
  }, [data])

  const occupancyRate = useMemo(() => {
    return ((totalOccupied / totalUnits) * 100).toFixed(1)
  }, [totalOccupied, totalUnits])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const occupied = payload[0]?.value || 0
      const vacant = payload[1]?.value || 0
      const total = occupied + vacant
      const occupiedPercent = total > 0 ? ((occupied / total) * 100).toFixed(1) : 0

      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 min-w-[160px] sm:min-w-[180px]">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            {label}
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{t('dashboard.charts.occupied')}</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{occupied}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{t('dashboard.charts.vacant')}</span>
              </div>
              <span className="text-sm font-semibold text-red-500 dark:text-red-400">{vacant}</span>
            </div>
            <div className="pt-1.5 mt-1.5 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{t('dashboard.charts.occupancyRate')}</span>
                <span className="text-xs font-bold text-[#6D28D9]">{occupiedPercent}%</span>
              </div>
            </div>
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
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-slate-800/30 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
            {t('dashboard.charts.occupancy')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t('dashboard.charts.occupancySubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#6D28D9]/10 dark:bg-[#6D28D9]/20 rounded-lg hover:bg-[#6D28D9]/15 dark:hover:bg-[#6D28D9]/30 transition-colors duration-200">
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6D28D9]" />
            <span className="text-xs sm:text-sm font-semibold text-[#6D28D9] whitespace-nowrap">
              {occupancyRate}%
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors duration-200">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
              {totalOccupied}/{totalUnits}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
              horizontal={false}
              vertical={true}
            />
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => value}
            />
            <YAxis 
              type="category"
              dataKey="property"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#64748b', 
                fontSize: 11,
                fontWeight: 500
              }}
              width={80}
              tickMargin={8}
            />
            <Tooltip 
              content={CustomTooltip}
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            />
            <Bar 
              dataKey="occupied" 
              fill="#10B981" 
              radius={[0, 4, 4, 0]}
              barSize={20}
              animationDuration={800}
              animationEasing="ease-out"
              className="hover:opacity-80 transition-opacity duration-200"
            />
            <Bar 
              dataKey="vacant" 
              fill="#EF4444" 
              radius={[0, 4, 4, 0]}
              barSize={20}
              animationDuration={800}
              animationEasing="ease-out"
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700">
        {data.map((item) => {
          const total = item.occupied + item.vacant
          const rate = total > 0 ? ((item.occupied / total) * 100).toFixed(0) : 0
          return (
            <div key={item.property} className="flex flex-col">
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate" title={item.property}>
                {item.property}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${rate}%`,
                      background: `linear-gradient(to right, #10B981, ${rate > 70 ? '#10B981' : rate > 40 ? '#F59E0B' : '#EF4444'})`
                    }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {rate}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default OccupancyChart