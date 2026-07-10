import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Trash2 } from 'lucide-react';

const FeedbackDeleteModal = ({ isOpen, onClose, onConfirm, feedback }) => {
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
          className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/20 dark:border-slate-700/30"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4"
            >
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </motion.div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Delete Feedback?
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Are you sure you want to delete this feedback?
            </p>

            {feedback && (
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-2">
                "{feedback.subject}"
              </p>
            )}

            <p className="text-xs text-red-500 dark:text-red-400 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-all shadow-lg shadow-red-500/25 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackDeleteModal;