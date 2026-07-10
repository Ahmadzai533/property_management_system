import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Building, Mail, Phone, MapPin,
  Star, Calendar, MessageSquare, FileText, Image,
  Edit, Trash2, Reply, Clock, CheckCircle2, XCircle,
  Star as StarIcon
} from 'lucide-react';

const FeedbackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const mockData = {
        id: 'F00001',
        user: {
          name: 'Ahmad Khan',
          email: 'ahmad@email.com',
          phone: '+93 700 123 456',
          avatar: null,
          joined: '2024-01-15'
        },
        property: {
          name: 'Kabul Residence',
          unit: 'A-101',
          address: 'Kabul, Afghanistan',
          rent: 500,
          type: 'Apartment'
        },
        type: 'Complaint',
        subject: 'Water leakage problem',
        message: 'There is a water leakage in the bathroom. It started 3 days ago and is getting worse. Please fix it urgently as it is damaging the walls.',
        rating: 3,
        status: 'Pending',
        createdAt: '2026-07-06 10:30',
        updatedAt: '2026-07-06 10:30',
        images: ['leakage1.jpg', 'leakage2.jpg'],
        replies: [
          {
            id: 1,
            user: 'Owner',
            message: 'We will send a technician tomorrow morning to fix the issue.',
            createdAt: '2026-07-06 11:00'
          },
          {
            id: 2,
            user: 'Ahmad Khan',
            message: 'Thank you for the quick response. I will be home tomorrow morning.',
            createdAt: '2026-07-06 11:30'
          }
        ]
      };
      setFeedback(mockData);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      Reviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
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

  if (!feedback) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          Feedback not found
        </h3>
        <Link to="/owner/feedback" className="text-blue-600 hover:underline mt-2 inline-block">
          Back to Feedback List
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 max-w-7xl mx-auto"
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
            Feedback Details
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {feedback.id} • {feedback.createdAt}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Link
            to={`/owner/feedback/${feedback.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-all">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Feedback Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    feedback.type === 'Complaint' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    feedback.type === 'Suggestion' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    feedback.type === 'Appreciation' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {feedback.type}
                  </span>
                  {getStatusBadge(feedback.status)}
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {feedback.subject}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {renderStars(feedback.rating)}
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  ({feedback.rating}/5)
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Message
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {feedback.message}
              </p>
            </div>

            {feedback.images && feedback.images.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                  Attached Images
                </h3>
                <div className="flex flex-wrap gap-3">
                  {feedback.images.map((img, idx) => (
                    <div key={idx} className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-600">
                      <Image className="w-8 h-8 text-slate-400" />
                      <span className="sr-only">{img}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Replies */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Replies ({feedback.replies.length})
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm transition-all">
                <Reply className="w-4 h-4" />
                Add Reply
              </button>
            </div>

            <div className="space-y-4">
              {feedback.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${
                    reply.user === 'Owner' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {reply.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {reply.user}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {reply.createdAt}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {reply.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
              User Information
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
                {feedback.user.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {feedback.user.name}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Member since {feedback.user.joined}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-slate-400" />
                {feedback.user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-slate-400" />
                {feedback.user.phone}
              </div>
            </div>
          </motion.div>

          {/* Property Card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
              Property Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Building className="w-4 h-4 text-slate-400" />
                {feedback.property.name}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400" />
                {feedback.property.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="text-slate-400">Unit:</span>
                {feedback.property.unit}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="text-slate-400">Rent:</span>
                ${feedback.property.rent}/month
              </div>
            </div>
          </motion.div>

          {/* Meta Card */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
              Feedback Metadata
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-slate-400" />
                Created: {feedback.createdAt}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4 text-slate-400" />
                Updated: {feedback.updatedAt}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                {feedback.replies.length} replies
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackDetails;