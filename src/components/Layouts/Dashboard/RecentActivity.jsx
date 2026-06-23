// ==============================================
// 12. components/dashboard/RecentActivity.jsx
// ==============================================

import { motion } from 'framer-motion';
import { UserPlus, DollarSign, FileText, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'tenant',
    icon: UserPlus,
    color: 'text-green-500',
    bg: 'bg-green-50',
    title: 'New tenant added',
    description: 'Sarah Johnson signed lease for Apt 3B',
    time: '5 minutes ago',
  },
  {
    id: 2,
    type: 'payment',
    icon: DollarSign,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    title: 'Payment received',
    description: '$1,200 rent payment from Mike Chen',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'contract',
    icon: FileText,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    title: 'Contract renewed',
    description: 'Emily Davis renewed lease for 12 months',
    time: '3 hours ago',
  },
  {
    id: 4,
    type: 'maintenance',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Maintenance alert',
    description: 'Plumbing issue reported at Greenwood Ave',
    time: '5 hours ago',
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500">Latest updates from your properties</p>
        </div>
        <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-xl ${activity.bg}`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 truncate">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;