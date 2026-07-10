import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare, Star, User, Building, Calendar,
  Eye, Edit, Trash2, Reply, Plus, Search,
  Filter, Download, RefreshCw, ChevronLeft,
  ChevronRight, ChevronsLeft, ChevronsRight,
  AlertCircle, CheckCircle2, Clock, XCircle,
  Star as StarIcon
} from 'lucide-react';
import FeedbackReplyModal from './FeedbackReplyModal';
import FeedbackDeleteModal from './FeedbackDeleteModal';

// Mock Data
const mockFeedbacks = [
  {
    id: 'F00001',
    user: { name: 'Ahmad Khan', email: 'ahmad@email.com', phone: '+93 700 123 456', avatar: null },
    property: { name: 'Kabul Residence', unit: 'A-101', address: 'Kabul, Afghanistan', rent: 500 },
    type: 'Complaint',
    subject: 'Water leakage problem',
    message: 'There is a water leakage in the bathroom. Please fix it urgently.',
    rating: 3,
    status: 'Pending',
    createdAt: '2026-07-06 10:30',
    images: ['leakage1.jpg'],
    replies: [
      { id: 1, user: 'Owner', message: 'We will send a technician tomorrow.', createdAt: '2026-07-06 11:00' }
    ]
  },
  {
    id: 'F00002',
    user: { name: 'Sarah Karimi', email: 'sarah@email.com', phone: '+93 700 234 567', avatar: null },
    property: { name: 'Herat Tower', unit: 'B-202', address: 'Herat, Afghanistan', rent: 750 },
    type: 'Suggestion',
    subject: 'New playground for children',
    message: 'It would be great to have a children\'s playground in the community.',
    rating: 5,
    status: 'Resolved',
    createdAt: '2026-07-05 14:20',
    images: [],
    replies: [
      { id: 1, user: 'Owner', message: 'Great suggestion! We will consider it for next year\'s budget.', createdAt: '2026-07-05 15:00' },
      { id: 2, user: 'Sarah Karimi', message: 'Thank you for considering!', createdAt: '2026-07-05 15:30' }
    ]
  },
  {
    id: 'F00003',
    user: { name: 'Mohammad Reza', email: 'reza@email.com', phone: '+93 700 345 678', avatar: null },
    property: { name: 'Mazar Garden', unit: 'C-303', address: 'Mazar-e-Sharif, Afghanistan', rent: 600 },
    type: 'Complaint',
    subject: 'Noise from construction site',
    message: 'The construction next door is making too much noise early in the morning.',
    rating: 2,
    status: 'In Progress',
    createdAt: '2026-07-04 09:15',
    images: ['noise.jpg'],
    replies: [
      { id: 1, user: 'Owner', message: 'We have contacted the construction manager. They will reduce noise.', createdAt: '2026-07-04 10:00' }
    ]
  },
  {
    id: 'F00004',
    user: { name: 'Fatima Noori', email: 'fatima@email.com', phone: '+93 700 456 789', avatar: null },
    property: { name: 'Kandahar Palace', unit: 'D-404', address: 'Kandahar, Afghanistan', rent: 850 },
    type: 'Appreciation',
    subject: 'Excellent maintenance service',
    message: 'The maintenance team is doing an excellent job. Very professional.',
    rating: 5,
    status: 'Resolved',
    createdAt: '2026-07-03 16:45',
    images: [],
    replies: [
      { id: 1, user: 'Owner', message: 'Thank you for your kind words! We will share this with the team.', createdAt: '2026-07-03 17:00' }
    ]
  },
  {
    id: 'F00005',
    user: { name: 'Ali Wahid', email: 'ali@email.com', phone: '+93 700 567 890', avatar: null },
    property: { name: 'Balkh Residence', unit: 'E-505', address: 'Balkh, Afghanistan', rent: 550 },
    type: 'Review',
    subject: 'Building security review',
    message: 'The building security is excellent. Guards are very attentive.',
    rating: 4,
    status: 'Pending',
    createdAt: '2026-07-02 11:30',
    images: [],
    replies: []
  },
  {
    id: 'F00006',
    user: { name: 'Zahra Ahmadi', email: 'zahra@email.com', phone: '+93 700 678 901', avatar: null },
    property: { name: 'Kabul Residence', unit: 'A-102', address: 'Kabul, Afghanistan', rent: 480 },
    type: 'Complaint',
    subject: 'Elevator not working',
    message: 'The elevator has been out of service for 2 days.',
    rating: 1,
    status: 'Rejected',
    createdAt: '2026-07-01 08:00',
    images: ['elevator.jpg'],
    replies: [
      { id: 1, user: 'Owner', message: 'The elevator is scheduled for repair on July 5th.', createdAt: '2026-07-01 09:00' },
      { id: 2, user: 'Owner', message: 'The elevator has been repaired.', createdAt: '2026-07-05 14:00' }
    ]
  },
  {
    id: 'F00007',
    user: { name: 'Omar Farhad', email: 'omar@email.com', phone: '+93 700 789 012', avatar: null },
    property: { name: 'Herat Tower', unit: 'B-203', address: 'Herat, Afghanistan', rent: 720 },
    type: 'Suggestion',
    subject: 'More parking spaces needed',
    message: 'The parking area is too small for all residents.',
    rating: 3,
    status: 'Pending',
    createdAt: '2026-06-30 12:45',
    images: ['parking.jpg'],
    replies: []
  },
  {
    id: 'F00008',
    user: { name: 'Laila Karim', email: 'laila@email.com', phone: '+93 700 890 123', avatar: null },
    property: { name: 'Mazar Garden', unit: 'C-304', address: 'Mazar-e-Sharif, Afghanistan', rent: 620 },
    type: 'Appreciation',
    subject: 'Great community events',
    message: 'The community events organized by the management are fantastic.',
    rating: 5,
    status: 'Resolved',
    createdAt: '2026-06-29 15:20',
    images: ['event.jpg'],
    replies: [
      { id: 1, user: 'Owner', message: 'We\'re glad you enjoyed them! More events coming soon.', createdAt: '2026-06-29 16:00' }
    ]
  }
];

const FeedbackList = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    rating: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setFeedbacks(mockFeedbacks);
      setLoading(false);
    }, 500);
  }, []);

  const filteredFeedbacks = useMemo(() => {
    let result = feedbacks;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(f =>
        f.user.name.toLowerCase().includes(term) ||
        f.property.name.toLowerCase().includes(term) ||
        f.subject.toLowerCase().includes(term)
      );
    }

    if (filters.type) result = result.filter(f => f.type === filters.type);
    if (filters.status) result = result.filter(f => f.status === filters.status);
    if (filters.rating) result = result.filter(f => f.rating === parseInt(filters.rating));

    return result;
  }, [feedbacks, searchTerm, filters]);

  const totalFeedbacks = filteredFeedbacks.length;
  const totalPages = Math.ceil(totalFeedbacks / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalFeedbacks);
  const currentFeedbacks = filteredFeedbacks.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ type: '', status: '', rating: '' });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === currentFeedbacks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentFeedbacks.map(f => f.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setFeedbacks(mockFeedbacks);
      setLoading(false);
    }, 500);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      Reviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  // Statistics
  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'Pending' || f.status === 'In Progress').length,
    resolved: feedbacks.filter(f => f.status === 'Resolved').length,
    avgRating: feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : 0
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-2 sm:p-3 md:p-4 lg:p-5 max-w-7xl mx-auto"
    >
      {/* Breadcrumb & Header Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6"
      >
        {/* Breadcrumb */}
        <div className="mb-2 sm:mb-3 md:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-purple-200">
            <Link
              to="/dashboard"
              className="hover:text-white transition-colors font-medium"
            >
              Dashboard
            </Link>
            <span className="text-purple-300 font-medium">&gt;</span>
            <span className="text-white font-semibold">
              Feedback
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Feedback Management
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-0.5 sm:mt-1">
              Manage feedback, complaints, and suggestions from tenants
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Link
              to="/owner/feedback/create"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-300 border border-white/20"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Add Feedback</span>
              <span className="xs:hidden">Add</span>
            </Link>
            <button className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all duration-200 border border-white/20 backdrop-blur-sm">
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button 
              onClick={handleRefresh} 
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all duration-200 border border-white/20 backdrop-blur-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6"
      >
        {[
          { label: 'Total', value: stats.total, icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-yellow-500 to-amber-600' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
          { label: 'Avg Rating', value: stats.avgRating, icon: Star, color: 'from-purple-500 to-violet-600' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full translate-x-6 -translate-y-6`} />
            <div className="flex items-center gap-2 sm:gap-3 relative">
              <div className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <motion.p
                  key={stat.value}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-base sm:text-lg md:text-2xl font-bold text-slate-800 dark:text-white"
                >
                  {stat.value}
                </motion.p>
                <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-4 mb-3 sm:mb-4 md:mb-6 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user, property, subject..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="flex-1 sm:flex-none px-2 sm:px-3 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all min-w-[80px] sm:min-w-[100px]"
            >
              <option value="">All Types</option>
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Appreciation">Appreciation</option>
              <option value="Review">Review</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="flex-1 sm:flex-none px-2 sm:px-3 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all min-w-[80px] sm:min-w-[100px]"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="flex-1 sm:flex-none px-2 sm:px-3 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all min-w-[80px] sm:min-w-[100px]"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-2 sm:px-3 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-300"
              >
                {selectedIds.length} selected
              </motion.span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              disabled={selectedIds.length === 0}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Delete Selected</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        {loading ? (
          <div className="p-6 sm:p-8 md:p-12 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
            />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400">Loading feedback...</p>
          </div>
        ) : currentFeedbacks.length === 0 ? (
          <div className="p-6 sm:p-8 md:p-12 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-300 mb-1 sm:mb-2">
              No Feedback Found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
              Create your first feedback entry to start managing responses.
            </p>
            <Link
              to="/owner/feedback/create"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Feedback
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View - No Scroll */}
            <div className="hidden lg:block overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-3 py-2.5 text-left w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === currentFeedbacks.length && currentFeedbacks.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 dark:border-slate-600"
                      />
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs">ID</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs">User</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs hidden lg:table-cell">Property</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs hidden 2xl:table-cell">Type</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs">Subject</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs hidden sm:table-cell">Status</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-slate-600 dark:text-slate-300 text-xs hidden xl:table-cell">Created</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-slate-600 dark:text-slate-300 text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFeedbacks.map((feedback, idx) => (
                    <motion.tr
                      key={feedback.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(feedback.id)}
                          onChange={() => handleSelect(feedback.id)}
                          className="rounded border-slate-300 dark:border-slate-600"
                        />
                      </td>
                      <td className="px-3 py-2.5 font-mono text-xs text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {feedback.id}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold flex-shrink-0">
                            {feedback.user.name.charAt(0)}
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
                            {feedback.user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 hidden lg:table-cell text-slate-600 dark:text-slate-400 text-xs sm:text-sm whitespace-nowrap">
                        {feedback.property.name}
                      </td>
                      <td className="px-3 py-2.5 hidden 2xl:table-cell">
                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                          feedback.type === 'Complaint' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          feedback.type === 'Suggestion' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          feedback.type === 'Appreciation' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}>
                          {feedback.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm max-w-[100px] sm:max-w-[150px] truncate">
                        {feedback.subject}
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell">
                        {getStatusBadge(feedback.status)}
                      </td>
                      <td className="px-3 py-2.5 hidden xl:table-cell text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">
                        {feedback.createdAt}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                          <button
                            onClick={() => navigate(`/owner/feedback/${feedback.id}`)}
                            className="p-1 sm:p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-500 hover:text-blue-600 transition-all"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/owner/feedback/${feedback.id}/edit`)}
                            className="p-1 sm:p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-slate-500 hover:text-green-600 transition-all"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFeedback(feedback);
                              setShowReplyModal(true);
                            }}
                            className="p-1 sm:p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 text-slate-500 hover:text-purple-600 transition-all"
                            title="Reply"
                          >
                            <Reply className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFeedback(feedback);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 sm:p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-600 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View - No Scroll */}
            <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-700">
              {currentFeedbacks.map((feedback, idx) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-2.5 sm:p-3 md:p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(feedback.id)}
                      onChange={() => handleSelect(feedback.id)}
                      className="mt-1 rounded border-slate-300 dark:border-slate-600 flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      {/* Header: ID and Status */}
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="font-mono text-[10px] sm:text-xs text-blue-600 dark:text-blue-400">
                          {feedback.id}
                        </span>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(feedback.status)}
                        </div>
                      </div>

                      {/* User and Property */}
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold flex-shrink-0">
                          {feedback.user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                            {feedback.user.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                            {feedback.property.name} • Unit {feedback.property.unit}
                          </p>
                        </div>
                      </div>

                      {/* Subject and Type */}
                      <div className="mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-medium ${
                            feedback.type === 'Complaint' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            feedback.type === 'Suggestion' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            feedback.type === 'Appreciation' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {feedback.type}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate flex-1">
                            {feedback.subject}
                          </p>
                        </div>
                      </div>

                      {/* Rating and Date */}
                      <div className="flex items-center justify-between flex-wrap gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="flex gap-0.5">
                            {renderStars(feedback.rating)}
                          </div>
                          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                            ({feedback.rating})
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                          {feedback.createdAt}
                        </span>
                      </div>

                      {/* Actions - Responsive Grid */}
                      <div className="grid grid-cols-2 xs:grid-cols-4 gap-1 sm:gap-1.5 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-700">
                        <button
                          onClick={() => navigate(`/owner/feedback/${feedback.id}`)}
                          className="flex items-center justify-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all text-[10px] sm:text-xs md:text-sm"
                        >
                          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                          <span className="hidden xs:inline">View</span>
                        </button>
                        <button
                          onClick={() => navigate(`/owner/feedback/${feedback.id}/edit`)}
                          className="flex items-center justify-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all text-[10px] sm:text-xs md:text-sm"
                        >
                          <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                          <span className="hidden xs:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setShowReplyModal(true);
                          }}
                          className="flex items-center justify-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all text-[10px] sm:text-xs md:text-sm"
                        >
                          <Reply className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                          <span className="hidden xs:inline">Reply</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center justify-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-[10px] sm:text-xs md:text-sm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                          <span className="hidden xs:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination - Responsive */}
            <div className="flex flex-col xs:flex-row items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400">
                <span>Rows:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-[10px] sm:text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {[5, 10, 25, 50].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <span className="hidden xs:inline ml-1 sm:ml-2">
                  Showing {startIndex + 1}-{endIndex} of {totalFeedbacks}
                </span>
                <span className="xs:hidden">
                  {startIndex + 1}-{endIndex}/{totalFeedbacks}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="p-1 sm:p-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 sm:p-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </button>
                {[...Array(Math.min(3, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs md:text-sm transition-all ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 sm:p-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-1 sm:p-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Reply Modal */}
      <FeedbackReplyModal
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setSelectedFeedback(null);
        }}
        feedback={selectedFeedback}
        onReply={(message) => {
          // Handle reply logic here
          setShowReplyModal(false);
          setSelectedFeedback(null);
        }}
      />

      {/* Delete Modal */}
      <FeedbackDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedFeedback(null);
        }}
        onConfirm={() => {
          // Handle delete logic here
          setShowDeleteModal(false);
          setSelectedFeedback(null);
        }}
        feedback={selectedFeedback}
      />
    </motion.div>
  );
};

export default FeedbackList;