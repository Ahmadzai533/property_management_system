import { motion } from 'framer-motion'
import { 
  UserPlus, 
  DollarSign, 
  FileCheck, 
  AlertTriangle,
  Clock
} from 'lucide-react'

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'tenant',
      icon: UserPlus,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      title: 'New tenant added',
      description: 'Sarah Johnson signed lease for Apt 3B',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'payment',
      icon: DollarSign,
      color: 'text-[#6D28D9]',
      bg: 'bg-[#6D28D9]/10',
      title: 'Payment received',
      description: '$2,400.00 from Michael Chen',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'contract',
      icon: FileCheck,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      title: 'Contract renewed',
      description: 'Emily Davis renewed for 12 months',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'maintenance',
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-100',
      title: 'Maintenance alert',
      description: 'Plumbing issue reported at 5th floor',
      time: '3 hours ago',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xl shadow-slate-200/30"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
          <p className="text-sm text-slate-500">Latest updates from your properties</p>
        </div>
        <Clock className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className={`p-2.5 rounded-xl ${activity.bg} flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 text-center text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors py-2 rounded-xl hover:bg-[#6D28D9]/5">
        View all activity
      </button>
    </motion.div>
  )
}

export default RecentActivity