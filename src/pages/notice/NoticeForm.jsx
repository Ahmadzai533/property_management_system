import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  X, Image as ImageIcon, FileText, 
  Calendar, Users, Bell, CheckCircle2, Loader2,
  Clock, Pin, AlertCircle
} from 'lucide-react';

const NoticeForm = ({ notice, onClose, onSave }) => {
  const isEdit = !!notice;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(notice?.image || null);
  const [attachmentName, setAttachmentName] = useState(notice?.attachment || '');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: isEdit ? {
      ...notice,
      startDate: notice.startDate || '',
      endDate: notice.endDate || ''
    } : {
      title: '',
      property: 'Sunrise Apartment',
      category: 'General',
      priority: 'Medium',
      status: 'Draft',
      audience: 'Tenants',
      startDate: '',
      endDate: '',
      shortDetails: '',
      fullDetails: '',
      isPinned: false,
      sendNotification: true,
      schedulePublish: false
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(data);
    setIsSubmitting(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) setAttachmentName(file.name);
  };

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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 md:p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                {isEdit ? 'Edit Notice' : 'Create New Notice'}
              </h2>
              <p className="text-purple-100 text-xs md:text-sm mt-1">
                {isEdit ? 'Update notice details' : 'Fill in the details to create a new notice'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Notice Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="Enter notice title"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Property */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Property *
                </label>
                <select
                  {...register('property', { required: 'Property is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                >
                  <option value="Sunrise Apartment">Sunrise Apartment</option>
                  <option value="Royal Villa">Royal Villa</option>
                  <option value="Green Residency">Green Residency</option>
                  <option value="Sky Tower">Sky Tower</option>
                  <option value="Blue Residency">Blue Residency</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                >
                  <option value="General">General</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Rent">Rent</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Reminder">Reminder</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Priority *
                </label>
                <select
                  {...register('priority', { required: 'Priority is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status *
                </label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              {/* Audience */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Audience *
                </label>
                <select
                  {...register('audience', { required: 'Audience is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                >
                  <option value="Owners">Owners</option>
                  <option value="Tenants">Tenants</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Security">Security</option>
                  <option value="Everyone">Everyone</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  {...register('startDate', { required: 'Start date is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  {...register('endDate', { required: 'End date is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
              </div>

              {/* Short Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Short Description *
                </label>
                <input
                  {...register('shortDetails', { required: 'Short description is required' })}
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  placeholder="Brief summary of the notice"
                />
              </div>

              {/* Full Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Details
                </label>
                <textarea
                  {...register('fullDetails')}
                  rows="3"
                  className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                  placeholder="Detailed description of the notice"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Upload Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-purple-400 transition-all">
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {imagePreview ? 'Change image' : 'Upload image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Attachment Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Upload Attachment
              </label>
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-purple-400 transition-all">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {attachmentName || 'Upload file (PDF, DOC, etc.)'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAttachmentChange}
                  />
                </div>
              </label>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  {...register('isPinned')}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <Pin className="w-4 h-4" />
                Pin Notice
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  {...register('sendNotification')}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <Bell className="w-4 h-4" />
                Send Notification
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  {...register('schedulePublish')}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <Clock className="w-4 h-4" />
                Schedule Publish
              </label>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex justify-end gap-3 p-4 md:p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/20 rounded-b-2xl flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                {isEdit ? 'Update Notice' : 'Create Notice'}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoticeForm;