import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, 
  DollarSign, 
  FileCheck, 
  AlertTriangle,
  Clock,
  ChevronRight,
  Bell
} from 'lucide-react'

const RecentActivity = () => {
  const [showAll, setShowAll] = useState(false)
  
  const allActivities = [
    {
      id: 1,
      type: 'tenant',
      icon: UserPlus,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      border: 'border-emerald-200 dark:border-emerald-800',
      title: 'New tenant added',
      description: 'Sarah Johnson signed lease for Apt 3B',
      time: '2 minutes ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: 2,
      type: 'payment',
      icon: DollarSign,
      color: 'text-[#6D28D9] dark:text-[#8B5CF6]',
      bg: 'bg-[#6D28D9]/10 dark:bg-[#6D28D9]/20',
      border: 'border-[#6D28D9]/20 dark:border-[#6D28D9]/30',
      title: 'Payment received',
      description: '$2,400.00 from Michael Chen',
      time: '15 minutes ago',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: 3,
      type: 'contract',
      icon: FileCheck,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      border: 'border-amber-200 dark:border-amber-800',
      title: 'Contract renewed',
      description: 'Emily Davis renewed for 12 months',
      time: '1 hour ago',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 4,
      type: 'maintenance',
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
      title: 'Maintenance alert',
      description: 'Plumbing issue reported at 5th floor',
      time: '3 hours ago',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: 5,
      type: 'payment',
      icon: DollarSign,
      color: 'text-[#6D28D9] dark:text-[#8B5CF6]',
      bg: 'bg-[#6D28D9]/10 dark:bg-[#6D28D9]/20',
      border: 'border-[#6D28D9]/20 dark:border-[#6D28D9]/30',
      title: 'Rent collected',
      description: '$1,800.00 from Robert Kim',
      time: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 6,
      type: 'tenant',
      icon: UserPlus,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      border: 'border-emerald-200 dark:border-emerald-800',
      title: 'Lease signed',
      description: 'Maria Garcia signed lease for Apt 2A',
      time: '1 day ago',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]

  const activities = showAll ? allActivities : allActivities.slice(0, 4)

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    return timestamp.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-slate-800/30 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
            Recent Activity
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Latest updates from your properties
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500" />
            <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
              {allActivities.length} new
            </span>
          </div>
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500 hidden xs:block" />
        </div>
      </div>

      {/* Activities List */}
      <div className="flex-1 space-y-2 sm:space-y-3">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3,
                ease: "easeOut"
              }}
              layout
              className={`
                flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 
                rounded-xl transition-all duration-300 
                hover:bg-slate-50 dark:hover:bg-slate-700/50 group cursor-default
                border border-transparent hover:border-slate-200/60 dark:hover:border-slate-600/60
              `}
            >
              {/* Icon */}
              <div className={`
                p-2 sm:p-2.5 rounded-xl 
                ${activity.bg} 
                flex-shrink-0 
                group-hover:scale-110 transition-transform duration-300
                group-hover:shadow-md
              `}>
                <activity.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activity.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View All Button */}
      {allActivities.length > 4 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 sm:mt-4 text-center text-xs sm:text-sm font-semibold text-[#6D28D9] dark:text-[#8B5CF6] hover:text-[#5B21B6] dark:hover:text-[#A78BFA] transition-all duration-300 py-2 sm:py-2.5 rounded-xl hover:bg-[#6D28D9]/5 dark:hover:bg-[#6D28D9]/10 active:scale-95"
        >
          {showAll ? 'Show less' : `View all ${allActivities.length} activities`}
        </motion.button>
      )}

      {/* Empty State - Only shown if no activities */}
      {allActivities.length === 0 && (
        <div className="flex-1 flex items-center justify-center py-8">
          <p className="text-sm text-slate-400 dark:text-slate-500">No recent activities</p>
        </div>
      )}
    </motion.div>
  )
}

export default RecentActivity