import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, BellRing, Plus, Search, Download, 
  Printer, RefreshCw, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, FileText, AlertCircle, CheckCircle2,
  Trash2, Pin, Calendar, Clock, Building2, Users, 
  AlertTriangle, X
} from 'lucide-react';
import NoticeList from './NoticeList';
import NoticeForm from './NoticeForm';
import NoticeView from './NoticeView';
import { Link } from "react-router-dom";
// import { ChevronRight } from "lucide-react";

// Mock Data
const mockNotices = [
  {
    id: 'N-2024-001',
    title: 'Rent Collection Reminder - July 2024',
    property: 'Sunrise Apartment',
    category: 'Rent',
    priority: 'High',
    status: 'Active',
    audience: 'Tenants',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    createdBy: 'John Admin',
    createdAt: '2024-06-28 10:30',
    shortDetails: 'Monthly rent payment reminder for all tenants.',
    fullDetails: 'Dear tenants, This is a reminder that the rent for July 2024 is due by the 5th of July.',
    image: null,
    attachment: 'rent_reminder_july.pdf',
    isPinned: true,
    comments: 12,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-002',
    title: 'Water Supply Maintenance',
    property: 'Royal Villa',
    category: 'Maintenance',
    priority: 'High',
    status: 'Active',
    audience: 'Everyone',
    startDate: '2024-07-05',
    endDate: '2024-07-06',
    createdBy: 'Maintenance Team',
    createdAt: '2024-07-03 09:15',
    shortDetails: 'Emergency water supply maintenance scheduled.',
    fullDetails: 'Water supply will be interrupted for maintenance work on July 5th from 9:00 AM to 6:00 PM.',
    image: null,
    attachment: 'water_maintenance.pdf',
    isPinned: false,
    comments: 5,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-003',
    title: 'Parking Area Closed',
    property: 'Green Residency',
    category: 'Maintenance',
    priority: 'Medium',
    status: 'Active',
    audience: 'Owners',
    startDate: '2024-07-10',
    endDate: '2024-07-15',
    createdBy: 'Property Manager',
    createdAt: '2024-07-08 14:20',
    shortDetails: 'Parking area closed for resurfacing work.',
    fullDetails: 'The main parking area will be closed from July 10th to 15th for resurfacing.',
    image: null,
    attachment: 'parking_notice.pdf',
    isPinned: false,
    comments: 8,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-004',
    title: 'Emergency Fire Drill',
    property: 'Sky Tower',
    category: 'Emergency',
    priority: 'Urgent',
    status: 'Active',
    audience: 'Everyone',
    startDate: '2024-07-12',
    endDate: '2024-07-12',
    createdBy: 'Safety Officer',
    createdAt: '2024-07-10 11:00',
    shortDetails: 'Mandatory fire drill for all residents.',
    fullDetails: 'A mandatory fire drill will be conducted on July 12th at 10:00 AM.',
    image: null,
    attachment: 'evacuation_plan.pdf',
    isPinned: true,
    comments: 3,
    allowComments: false,
    sendNotification: true
  },
  {
    id: 'N-2024-005',
    title: 'Annual Building Meeting',
    property: 'Blue Residency',
    category: 'Meeting',
    priority: 'Low',
    status: 'Scheduled',
    audience: 'Owners',
    startDate: '2024-07-20',
    endDate: '2024-07-20',
    createdBy: 'Board Secretary',
    createdAt: '2024-07-15 16:45',
    shortDetails: 'Annual general meeting for all owners.',
    fullDetails: 'The Annual General Meeting will be held on July 20th at 6:00 PM in the community hall.',
    image: null,
    attachment: 'agenda_2024.pdf',
    isPinned: false,
    comments: 15,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-006',
    title: 'Elevator Maintenance Notice',
    property: 'Sunrise Apartment',
    category: 'Maintenance',
    priority: 'Medium',
    status: 'Active',
    audience: 'Tenants',
    startDate: '2024-07-08',
    endDate: '2024-07-09',
    createdBy: 'Maintenance Team',
    createdAt: '2024-07-06 08:30',
    shortDetails: 'Elevator maintenance scheduled.',
    fullDetails: 'Elevators will be under maintenance on July 8th and 9th.',
    image: null,
    attachment: null,
    isPinned: false,
    comments: 2,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-007',
    title: 'Security Alert - Suspicious Activity',
    property: 'Royal Villa',
    category: 'Emergency',
    priority: 'Urgent',
    status: 'Active',
    audience: 'Everyone',
    startDate: '2024-07-07',
    endDate: '2024-07-14',
    createdBy: 'Security Manager',
    createdAt: '2024-07-07 22:00',
    shortDetails: 'Report of suspicious activity in the area.',
    fullDetails: 'Residents are advised to be vigilant. There have been reports of suspicious individuals.',
    image: null,
    attachment: 'security_bulletin.pdf',
    isPinned: true,
    comments: 20,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-008',
    title: 'Power Shutdown Notice',
    property: 'Green Residency',
    category: 'Maintenance',
    priority: 'High',
    status: 'Scheduled',
    audience: 'Everyone',
    startDate: '2024-07-25',
    endDate: '2024-07-25',
    createdBy: 'Utility Department',
    createdAt: '2024-07-20 10:00',
    shortDetails: 'Scheduled power shutdown for maintenance.',
    fullDetails: 'Power will be shut down on July 25th from 8:00 AM to 2:00 PM.',
    image: null,
    attachment: 'power_shutdown.pdf',
    isPinned: false,
    comments: 6,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-009',
    title: 'Holiday Office Closing',
    property: 'Sky Tower',
    category: 'Holiday',
    priority: 'Low',
    status: 'Active',
    audience: 'Everyone',
    startDate: '2024-07-17',
    endDate: '2024-07-18',
    createdBy: 'Admin Team',
    createdAt: '2024-07-14 12:00',
    shortDetails: 'Management office closed for holiday.',
    fullDetails: 'The management office will be closed on July 17th and 18th for the holiday.',
    image: null,
    attachment: null,
    isPinned: false,
    comments: 0,
    allowComments: false,
    sendNotification: true
  },
  {
    id: 'N-2024-010',
    title: 'Swimming Pool Cleaning',
    property: 'Blue Residency',
    category: 'Maintenance',
    priority: 'Medium',
    status: 'Active',
    audience: 'Tenants',
    startDate: '2024-07-11',
    endDate: '2024-07-12',
    createdBy: 'Maintenance Team',
    createdAt: '2024-07-09 15:30',
    shortDetails: 'Pool cleaning and maintenance.',
    fullDetails: 'The swimming pool will be closed for cleaning on July 11th and 12th.',
    image: null,
    attachment: null,
    isPinned: false,
    comments: 4,
    allowComments: true,
    sendNotification: true
  },
  {
    id: 'N-2024-011',
    title: 'New Waste Management Policy',
    property: 'Sunrise Apartment',
    category: 'General',
    priority: 'Medium',
    status: 'Draft',
    audience: 'Everyone',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    createdBy: 'Environmental Officer',
    createdAt: '2024-07-25 09:00',
    shortDetails: 'New waste segregation policy.',
    fullDetails: 'A new waste management policy will be implemented from August 1st.',
    image: null,
    attachment: 'waste_policy.pdf',
    isPinned: false,
    comments: 0,
    allowComments: true,
    sendNotification: false
  },
  {
    id: 'N-2024-012',
    title: 'Parking Fee Revision',
    property: 'Royal Villa',
    category: 'General',
    priority: 'Medium',
    status: 'Draft',
    audience: 'Owners',
    startDate: '2024-08-01',
    endDate: '2024-08-15',
    createdBy: 'Finance Department',
    createdAt: '2024-07-26 11:30',
    shortDetails: 'Parking fees to be revised.',
    fullDetails: 'Parking fees will be revised effective August 1st.',
    image: null,
    attachment: 'parking_fees.pdf',
    isPinned: false,
    comments: 0,
    allowComments: false,
    sendNotification: true
  }
];

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    property: '',
    sortBy: 'newest'
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [viewingNotice, setViewingNotice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setNotices(mockNotices);
      setLoading(false);
    }, 600);
  }, []);

  const properties = useMemo(() => [...new Set(notices.map(n => n.property))], [notices]);
  const categories = useMemo(() => [...new Set(notices.map(n => n.category))], [notices]);
  const statuses = ['Active', 'Expired', 'Draft', 'Scheduled'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const filteredNotices = useMemo(() => {
    let result = notices;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(term) ||
        n.property.toLowerCase().includes(term) ||
        n.createdBy.toLowerCase().includes(term) ||
        n.category.toLowerCase().includes(term)
      );
    }
    
    if (filters.status) result = result.filter(n => n.status === filters.status);
    if (filters.category) result = result.filter(n => n.category === filters.category);
    if (filters.priority) result = result.filter(n => n.priority === filters.priority);
    if (filters.property) result = result.filter(n => n.property === filters.property);
    
    if (filters.sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'oldest') {
      result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortBy === 'a-z') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'z-a') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }
    
    return result;
  }, [notices, searchTerm, filters]);

  const totalNotices = filteredNotices.length;
  const totalPages = Math.ceil(totalNotices / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalNotices);
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
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
    setFilters({
      status: '',
      category: '',
      priority: '',
      property: '',
      sortBy: 'newest'
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === currentNotices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentNotices.map(n => n.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setDeletingId(null);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setNotices(prev => prev.filter(n => n.id !== deletingId));
      setDeletingId(null);
    } else if (selectedIds.length > 0) {
      setNotices(prev => prev.filter(n => !selectedIds.includes(n.id)));
      setSelectedIds([]);
    }
    setShowDeleteModal(false);
  };

  const handleCreate = () => {
    setEditingNotice(null);
    setShowForm(true);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleView = (notice) => {
    setViewingNotice(notice);
    setShowView(true);
  };

  const handleSave = (data) => {
    if (editingNotice) {
      setNotices(prev => prev.map(n => 
        n.id === editingNotice.id ? { ...n, ...data, updatedAt: new Date().toISOString() } : n
      ));
    } else {
      const newNotice = {
        ...data,
        id: `N-2024-${String(notices.length + 1).padStart(3, '0')}`,
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: 0
      };
      setNotices(prev => [newNotice, ...prev]);
    }
    setShowForm(false);
    setEditingNotice(null);
  };

  const handleDuplicate = (notice) => {
    const newNotice = {
      ...notice,
      id: `N-2024-${String(notices.length + 1).padStart(3, '0')}`,
      title: `${notice.title} (Copy)`,
      status: 'Draft',
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: 0,
      isPinned: false
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const handlePin = (id) => {
    setNotices(prev => prev.map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    ));
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setNotices(mockNotices);
      setLoading(false);
    }, 500);
  };

  const stats = {
    total: notices.length,
    active: notices.filter(n => n.status === 'Active').length,
    expired: notices.filter(n => n.status === 'Expired').length,
    scheduled: notices.filter(n => n.status === 'Scheduled').length,
    pinned: notices.filter(n => n.isPinned).length
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:px-5 max-w-7xl "
    >
        
      {/* Breadcrumb */}
        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-4 md:p-6 mb-6"
      >
    {/* Breadcrumb */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="mb-6"
>
  <div className="flex items-center gap-2 text-sm text-purple-200  hover:text-white dark:text-slate-400">
    <Link
      to="/dashboard"
      className=" dark:hover:text-purple-400 transition-colors font-medium dark:text-purple-600"
    >
      Dashboard
    </Link>

    <span className="text-slate-400 font-medium">&gt;</span>

    <span className="text-white dark:text-purple-400 font-semibold">
      Notice Management
    </span>
  </div>
</motion.div>

      {/* Header */}
    
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Notice Management
            </h1>
            <p className="text-purple-100 text-sm ">
              Create, publish and manage property notices for owners, tenants and maintenance staff.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl text-sm font-medium transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Notice
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm transition-all duration-200">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            {/* <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm transition-all duration-200">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button> */}
            {/* <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm transition-all duration-200">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button> */}
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6"
      >
        {[
          { label: 'Total', value: stats.total, icon: FileText, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: stats.active, icon: BellRing, color: 'from-green-500 to-emerald-600' },
          { label: 'Expired', value: stats.expired, icon: Clock, color: 'from-red-500 to-rose-600' },
          { label: 'Scheduled', value: stats.scheduled, icon: Calendar, color: 'from-yellow-500 to-amber-600' },
          { label: 'Pinned', value: stats.pinned, icon: Pin, color: 'from-purple-500 to-violet-600' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full translate-x-6 -translate-y-6`} />
            <div className="flex items-center gap-2 md:gap-3 relative">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <motion.p 
                  key={stat.value}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100"
                >
                  {stat.value}
                </motion.p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
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
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-2xl p-4 mb-6 shadow-lg"
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notice title, property, creator..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all min-w-[100px]"
            >
              <option value="">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-3 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all min-w-[100px]"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-3 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all min-w-[100px]"
            >
              <option value="">All Priority</option>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              value={filters.property}
              onChange={(e) => handleFilterChange('property', e.target.value)}
              className="px-3 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all min-w-[100px]"
            >
              <option value="">All Properties</option>
              {properties.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-3 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all min-w-[100px]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-3 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-sm transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                {selectedIds.length} selected
              </motion.span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notice List */}
      <NoticeList
        notices={currentNotices}
        loading={loading}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(id) => {
          setDeletingId(id);
          setShowDeleteModal(true);
        }}
        onDuplicate={handleDuplicate}
        onPin={handlePin}
      />

      {/* Pagination */}
      {!loading && totalNotices > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 rounded-2xl p-4 shadow-lg"
        >
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {[5, 10, 25, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="hidden sm:inline ml-2">
              Showing {startIndex + 1}-{endIndex} of {totalNotices}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/50 dark:bg-slate-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Delete Notice?
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Are you sure you want to delete this notice?
                </p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                  This action cannot be undone.
                </p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-all shadow-lg shadow-red-500/25"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notice Form Modal */}
      <AnimatePresence>
        {showForm && (
          <NoticeForm
            notice={editingNotice}
            onClose={() => {
              setShowForm(false);
              setEditingNotice(null);
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* Notice View Modal */}
      <AnimatePresence>
        {showView && viewingNotice && (
          <NoticeView
            notice={viewingNotice}
            onClose={() => {
              setShowView(false);
              setViewingNotice(null);
            }}
            onEdit={() => {
              setShowView(false);
              handleEdit(viewingNotice);
            }}
            onDelete={() => {
              setShowView(false);
              setDeletingId(viewingNotice.id);
              setShowDeleteModal(true);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoticeManagement;