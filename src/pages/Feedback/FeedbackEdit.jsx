import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft, Star, Upload, X, Image as ImageIcon,
  Building, User, FileText, Save, Loader2
} from 'lucide-react';

const FeedbackEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    // Mock API call to fetch feedback data
    setTimeout(() => {
      const mockData = {
        property: 'Kabul Residence',
        user: 'Ahmad Khan',
        type: 'Complaint',
        subject: 'Water leakage problem',
        message: 'There is a water leakage in the bathroom. It started 3 days ago and is getting worse.',
        status: 'Pending'
      };
      setRating(3);
      Object.keys(mockData).forEach(key => setValue(key, mockData[key]));
      setLoading(false);
    }, 500);
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log({ ...data, rating, id });
    setIsSubmitting(false);
    navigate('/owner/feedback');
  };

  const renderStars = (count, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-8 h-8 cursor-pointer transition-all ${
          i < (interactive ? (hoveredRating || rating) : rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        } ${interactive ? 'hover:scale-110' : ''}`}
        onMouseEnter={() => interactive && setHoveredRating(i + 1)}
        onMouseLeave={() => interactive && setHoveredRating(0)}
        onClick={() => interactive && setRating(i + 1)}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/owner/feedback')}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Edit Feedback
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {id} • Update feedback details
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Property */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Property *
              </label>
              <select
                {...register('property', { required: 'Property is required' })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="Kabul Residence">Kabul Residence</option>
                <option value="Herat Tower">Herat Tower</option>
                <option value="Mazar Garden">Mazar Garden</option>
                <option value="Kandahar Palace">Kandahar Palace</option>
                <option value="Balkh Residence">Balkh Residence</option>
              </select>
              {errors.property && (
                <p className="text-xs text-red-500 mt-1">{errors.property.message}</p>
              )}
            </div>

            {/* User */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                User *
              </label>
              <select
                {...register('user', { required: 'User is required' })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="Ahmad Khan">Ahmad Khan</option>
                <option value="Sarah Karimi">Sarah Karimi</option>
                <option value="Mohammad Reza">Mohammad Reza</option>
                <option value="Fatima Noori">Fatima Noori</option>
                <option value="Ali Wahid">Ali Wahid</option>
              </select>
              {errors.user && (
                <p className="text-xs text-red-500 mt-1">{errors.user.message}</p>
              )}
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Feedback Type *
              </label>
              <select
                {...register('type', { required: 'Type is required' })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="Complaint">Complaint</option>
                <option value="Suggestion">Suggestion</option>
                <option value="Appreciation">Appreciation</option>
                <option value="Review">Review</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Status *
              </label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject *
            </label>
            <input
              {...register('subject', { required: 'Subject is required' })}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter feedback subject"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message *
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              rows="4"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
              placeholder="Describe the feedback in detail..."
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Rating *
            </label>
            <div className="flex gap-1">
              {renderStars(5, true)}
            </div>
            {rating === 0 && (
              <p className="text-xs text-red-500 mt-1">Please select a rating</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Link
              to="/owner/feedback"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-sm transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Update Feedback
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackEdit;