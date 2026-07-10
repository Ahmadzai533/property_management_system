import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Eye, Pencil, Trash2, Printer, Share2, 
  Calendar, Clock, Users, FileText, Paperclip,
  Bell, MessageSquare, Download, ExternalLink,
  Building2, User, Pin, Sparkles, CheckCircle2
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Draft}`}>
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
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[priority] || styles.Medium}`}>
      {priority}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  const colors = {
    Maintenance: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Emergency: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Meeting: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    Rent: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Holiday: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    General: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Reminder: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    Security: 'bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[category] || colors.General}`}>
      {category}
    </span>
  );
};

const NoticeView = ({ notice, onClose, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!notice) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-white/20 dark:border-slate-700/30 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 md:p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {notice.isPinned && (
                  <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-medium text-white flex items-center gap-1">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </span>
                )}
                <StatusBadge status={notice.status} />
                <PriorityBadge priority={notice.priority} />
                <CategoryBadge category={notice.category} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white truncate">{notice.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-purple-100 text-xs md:text-sm">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {notice.createdBy}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(notice.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 flex-shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('attachments')}
            className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'attachments'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Attachments
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'history'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            History
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Short Description
                </h3>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium">
                  {notice.shortDetails}
                </p>
              </div>

              <div>
                <h3 className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Full Details
                </h3>
                <div className="bg-slate-50 dark:bg-slate-700/30 p-3 md:p-4 rounded-xl">
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {notice.fullDetails || 'No detailed description provided.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Property</p>
                  <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {notice.property}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Audience</p>
                  <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {notice.audience}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Start Date</p>
                  <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {notice.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">End Date</p>
                  <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {notice.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Created By</p>
                  <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                    {notice.createdBy}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Last Updated</p>
                  <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                    {notice.updatedAt ? new Date(notice.updatedAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  {notice.sendNotification ? (
                    <Bell className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Bell className="w-3.5 h-3.5 text-red-500" />
                  )}
                  {notice.sendNotification ? 'Notifications sent' : 'No notifications'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  {notice.allowComments ? (
                    <MessageSquare className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                  )}
                  {notice.allowComments ? 'Comments allowed' : 'Comments disabled'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  {notice.schedulePublish ? 'Scheduled publish' : 'Immediate publish'}
                </span>
                {notice.comments > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {notice.comments} comments
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'attachments' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {notice.image && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Image
                  </h3>
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img 
                      src={notice.image} 
                      alt={notice.title}
                      className="w-full max-h-64 object-cover"
                    />
                  </div>
                </div>
              )}

              {notice.attachment ? (
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Attachment
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                          {notice.attachment}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Uploaded on {notice.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-sm transition-all">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-all">
                        <ExternalLink className="w-4 h-4" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <Paperclip className="w-10 h-10 md:w-12 md:h-12 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="mt-2 text-slate-500 dark:text-slate-400">No attachments</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Notice created
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    By {notice.createdBy} • {new Date(notice.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {notice.updatedAt && notice.updatedAt !== notice.createdAt && (
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Notice updated
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(notice.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {notice.status === 'Active' && (
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Notice published
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Published on {notice.startDate}
                    </p>
                  </div>
                </div>
              )}

              {notice.isPinned && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Pin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Notice pinned
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pinned for priority visibility
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/20 rounded-b-2xl flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onEdit()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg text-sm transition-all"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-sm transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm transition-all">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg text-sm transition-all">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoticeView;