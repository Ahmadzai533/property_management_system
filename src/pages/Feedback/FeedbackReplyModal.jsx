import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, MessageSquare } from 'lucide-react';

const FeedbackReplyModal = ({ isOpen, onClose, feedback, onReply }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    onReply(message);
    setIsSubmitting(false);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full shadow-2xl border border-white/20 dark:border-slate-700/30"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white">Reply to Feedback</h2>
                <p className="text-purple-100 text-sm mt-1">
                  {feedback?.subject || 'Feedback Reply'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Previous Replies */}
            {feedback?.replies && feedback.replies.length > 0 && (
              <div className="mb-4 max-h-48 overflow-y-auto space-y-3">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Previous Replies
                </h3>
                {feedback.replies.map((reply) => (
                  <div key={reply.id} className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                        {reply.user}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {reply.createdAt}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {reply.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Reply *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                placeholder="Type your reply here..."
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackReplyModal;