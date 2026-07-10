import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Pencil, Trash2, Building2, Bell, Plus
} from 'lucide-react';

// Badge Components
const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return (
    <span className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    Low: 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };
  return (
    <span className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${styles[priority] || styles.Medium}`}>
      {priority}
    </span>
  );
};

const NoticeList = ({
  notices,
  loading,
  selectedIds,
  onSelect,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-2xl p-12 text-center shadow-lg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
        />
        <p className="mt-4 text-slate-500 dark:text-slate-400">Loading notices...</p>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-2xl p-8 md:p-12 text-center shadow-lg"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 md:w-10 md:h-10 text-purple-500 dark:text-purple-400" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          No Notices Available
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Create your first notice to notify tenants and property owners.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-slate-50/80 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === notices.length && notices.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
              </th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">SL</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300">Title</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300 hidden lg:table-cell">Property</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300 hidden xl:table-cell">Details</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Start</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">End</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300">Status</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">Priority</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-center font-semibold text-slate-600 dark:text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, idx) => (
              <motion.tr
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors group"
              >
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(notice.id)}
                    onChange={() => onSelect(notice.id)}
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-slate-500 dark:text-slate-400 font-mono hidden sm:table-cell">
                  {String(idx + 1).padStart(2, '0')}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <span className="font-medium text-slate-700 dark:text-slate-200 text-xs md:text-sm line-clamp-1">
                    {notice.title}
                  </span>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 hidden lg:table-cell">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">{notice.property}</span>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 hidden xl:table-cell">
                  <p className="text-slate-500 dark:text-slate-400 text-xs truncate max-w-[120px]" title={notice.shortDetails}>
                    {notice.shortDetails}
                  </p>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell text-slate-600 dark:text-slate-300 text-xs">
                  {notice.startDate}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell text-slate-600 dark:text-slate-300 text-xs">
                  {notice.endDate}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <StatusBadge status={notice.status} />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">
                  <PriorityBadge priority={notice.priority} />
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onView(notice)}
                      className="p-1 md:p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 text-slate-500 hover:text-purple-600 transition-all"
                      title="View"
                    >
                      <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(notice)}
                      className="p-1 md:p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-500 hover:text-blue-600 transition-all"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(notice.id)}
                      className="p-1 md:p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-600 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default NoticeList;