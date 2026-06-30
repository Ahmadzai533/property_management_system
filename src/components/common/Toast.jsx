// src/components/common/Toast.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.9 },
};

const toastTypes = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200',
    iconClass: 'text-green-500',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200',
    iconClass: 'text-yellow-500',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200',
    iconClass: 'text-blue-500',
  },
};

export const Toast = ({ message, type = 'info', onClose }) => {
  const ToastIcon = toastTypes[type]?.icon || Info;

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex items-start gap-3 p-4 rounded-lg border-2 shadow-lg backdrop-blur-sm ${toastTypes[type]?.className}`}
    >
      <ToastIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${toastTypes[type]?.iconClass}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};