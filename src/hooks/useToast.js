// src/hooks/useToast.js
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type,
      duration,
    };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,
    toast: {
      success: (message, duration) => showToast(message, 'success', duration),
      error: (message, duration) => showToast(message, 'error', duration),
      warning: (message, duration) => showToast(message, 'warning', duration),
      info: (message, duration) => showToast(message, 'info', duration),
    },
  };
};