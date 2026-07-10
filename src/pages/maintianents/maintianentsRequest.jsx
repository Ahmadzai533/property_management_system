import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { 
  FaClipboardList, FaBuilding, FaUser, FaWrench, FaClock, 
  FaCheckCircle, FaTimesCircle, FaFilter, FaSearch, FaPlus,
  FaEye, FaEdit, FaUserCog, FaTrash, FaCalendarAlt,
  FaArrowUp, FaArrowDown, FaBolt, FaExclamationTriangle,
  FaPaperclip, FaComment, FaSync, FaEllipsisV,
  FaPaintRoller, FaPlug, FaTint, FaSnowflake, FaDoorOpen,
  FaWindowMaximize, FaChair, FaWifi, FaShieldAlt, FaWater,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { MdOutlineMoreHoriz } from 'react-icons/md';

// =============================================
// MAINTENANCE REQUEST COMPONENT (SINGLE FILE)
// =============================================
const MaintenanceRequest = () => {
  // ---------- STATE ----------
  const [requests, setRequests] = useState([
    { id: 'REQ-101', property: 'Harbor Towers', unit: '12A', tenant: 'Eleanor Rigby', issue: 'Leaking faucet', priority: 'High', status: 'In Progress', assigned: 'Mike C.', created: '2026-06-28', expected: '2026-07-02', category: 'Plumbing', description: 'Kitchen sink leaking continuously' },
    { id: 'REQ-102', property: 'Sunset Villas', unit: '4B', tenant: 'John Doe', issue: 'AC not cooling', priority: 'Urgent', status: 'Pending', assigned: 'Sarah L.', created: '2026-06-29', expected: '2026-07-01', category: 'AC Repair', description: 'AC not cooling, blowing warm air' },
    { id: 'REQ-103', property: 'Oakwood Heights', unit: '7C', tenant: 'Jane Smith', issue: 'Broken window', priority: 'Medium', status: 'Assigned', assigned: 'Tom R.', created: '2026-06-25', expected: '2026-07-05', category: 'Window', description: 'Living room window cracked' },
    { id: 'REQ-104', property: 'Pine Grove', unit: '2A', tenant: 'Robert Johnson', issue: 'Electrical short', priority: 'Urgent', status: 'Completed', assigned: 'Anna K.', created: '2026-06-20', expected: '2026-06-24', category: 'Electrical', description: 'Power outage in bedroom' },
    { id: 'REQ-105', property: 'Maple Apartments', unit: '8D', tenant: 'Maria Garcia', issue: 'Paint peeling', priority: 'Low', status: 'Cancelled', assigned: '—', created: '2026-06-15', expected: '—', category: 'Painting', description: 'Wall paint peeling in hallway' },
  ]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ property: '', unit: '', priority: '', status: '', category: '', assigned: '' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState({ add: false, view: false, edit: false, assign: false, status: false });
  const [darkMode, setDarkMode] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, transformOrigin: 'top' });
  const buttonRefs = useRef({});

  // ---------- FORM HOOKS ----------
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { register: registerEdit, handleSubmit: handleEditSubmit, formState: { errors: editErrors }, reset: resetEdit, setValue: setEditValue } = useForm();

  // ---------- STATS ----------
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'Pending').length;
    const inProgress = requests.filter(r => r.status === 'In Progress').length;
    const completed = requests.filter(r => r.status === 'Completed').length;
    return { total, pending, inProgress, completed };
  }, [requests]);

  // ---------- FILTERED REQUESTS ----------
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchSearch = 
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.unit.toLowerCase().includes(searchTerm.toLowerCase());
      const matchProperty = !filters.property || req.property === filters.property;
      const matchUnit = !filters.unit || req.unit === filters.unit;
      const matchPriority = !filters.priority || req.priority === filters.priority;
      const matchStatus = !filters.status || req.status === filters.status;
      const matchCategory = !filters.category || req.category === filters.category;
      const matchAssigned = !filters.assigned || req.assigned === filters.assigned;
      return matchSearch && matchProperty && matchUnit && matchPriority && matchStatus && matchCategory && matchAssigned;
    });
  }, [requests, searchTerm, filters]);

  // ---------- HANDLERS ----------
  const handleAddRequest = (data) => {
    const newRequest = {
      id: `REQ-${Math.floor(Math.random() * 1000)}`,
      property: data.property,
      unit: data.unit,
      tenant: data.tenant || 'Tenant',
      issue: data.issue,
      priority: data.priority,
      status: 'Pending',
      assigned: data.assigned || '—',
      created: new Date().toISOString().split('T')[0],
      expected: data.preferredDate || '—',
      category: data.category,
      description: data.description || '',
    };
    setRequests([newRequest, ...requests]);
    setModalOpen({ ...modalOpen, add: false });
    reset();
    toast.success('Request added successfully! 🎉');
  };

  const handleEditRequest = (data) => {
    const updated = requests.map(r => 
      r.id === selectedRequest.id ? { ...r, ...data, assigned: data.assigned || r.assigned } : r
    );
    setRequests(updated);
    setModalOpen({ ...modalOpen, edit: false });
    toast.success('Request updated successfully!');
  };

  const handleDelete = (id) => {
    setOpenDropdownId(null);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      background: darkMode ? '#1e293b' : '#fff',
      color: darkMode ? '#f1f5f9' : '#1e293b',
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter(r => r.id !== id));
        toast.success('Request deleted successfully!');
      }
    });
  };

  const handleStatusUpdate = (id, newStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setModalOpen({ ...modalOpen, status: false });
    toast.success(`Status updated to ${newStatus}`);
  };

  const openViewModal = (req) => {
    setSelectedRequest(req);
    setModalOpen({ ...modalOpen, view: true });
    setOpenDropdownId(null);
  };

  const openEditModal = (req) => {
    setSelectedRequest(req);
    setEditValue('property', req.property);
    setEditValue('unit', req.unit);
    setEditValue('tenant', req.tenant);
    setEditValue('issue', req.issue);
    setEditValue('category', req.category);
    setEditValue('priority', req.priority);
    setEditValue('description', req.description);
    setEditValue('assigned', req.assigned);
    setModalOpen({ ...modalOpen, edit: true });
    setOpenDropdownId(null);
  };

  const openAssignModal = (req) => {
    setSelectedRequest(req);
    setModalOpen({ ...modalOpen, assign: true });
    setOpenDropdownId(null);
  };

  const openStatusModal = (req) => {
    setSelectedRequest(req);
    setModalOpen({ ...modalOpen, status: true });
    setOpenDropdownId(null);
  };

  const toggleDropdown = (id, event) => {
    event.stopPropagation();
    const button = buttonRefs.current[id];
    if (button) {
      const rect = button.getBoundingClientRect();
      const dropdownHeight = 340; // Approximate height of dropdown
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // Smart positioning: open upward for bottom rows, downward for top rows
      let top, transformOrigin;
      const shouldOpenUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
      
      if (shouldOpenUpward) {
        // Open upward (for bottom rows)
        top = rect.top - dropdownHeight + 10;
        transformOrigin = 'bottom';
      } else {
        // Open downward (for top rows)
        top = rect.bottom + 8;
        transformOrigin = 'top';
      }
      
      // Ensure dropdown stays within viewport
      if (top < 10) top = 10;
      if (top + dropdownHeight > window.innerHeight - 10) {
        top = window.innerHeight - dropdownHeight - 10;
      }
      
      setDropdownPosition({
        top: top,
        left: Math.min(rect.right - 220, window.innerWidth - 240),
        transformOrigin: transformOrigin,
      });
    }
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId !== null) {
        const button = buttonRefs.current[openDropdownId];
        const dropdown = document.getElementById(`dropdown-${openDropdownId}`);
        if (dropdown && !dropdown.contains(event.target) && button && !button.contains(event.target)) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // ---------- RENDER BADGES ----------
  const StatusBadge = ({ status }) => {
    const styles = {
      'Pending': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'Assigned': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'Cancelled': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.Pending}`}>{status}</span>;
  };

  const PriorityBadge = ({ priority }) => {
    const styles = {
      'Low': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
      'Medium': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      'High': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      'Urgent': 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[priority] || styles.Low}`}>{priority}</span>;
  };

  // ---------- SKELETON ----------
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3"><div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-3"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div></td>
    </tr>
  );

  // ---------- MAIN RENDER ----------
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 p-2 md:p-2 lg:p-3">
      <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />

      {/* ===== HEADER ===== */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg p-4 lg:px-6 shadow-lg"
      >
        <div>
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg"
            >
              <FaClipboardList size={28} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span>Dashboard</span>
                <span className="text-white/40">›</span>
                <span>Maintenance</span>
                <span className="text-white/40">›</span>
                <span className="text-white font-medium">Maintenance Requests</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Maintenance Requests</h1>
              <p className="text-white/70 text-sm">Manage all maintenance requests from one place.</p>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen({ ...modalOpen, add: true })}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all border border-white/20"
        >
          <FaPlus /> Add Request
        </motion.button>
      </motion.div>

      {/* ===== STATISTICS ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {[
          { title: 'Total Requests', value: stats.total, icon: FaClipboardList, color: 'from-blue-500 to-blue-600', trend: 12 },
          { title: 'Pending', value: stats.pending, icon: FaClock, color: 'from-amber-500 to-amber-600', trend: -3 },
          { title: 'In Progress', value: stats.inProgress, icon: FaWrench, color: 'from-purple-500 to-purple-600', trend: 8 },
          { title: 'Completed', value: stats.completed, icon: FaCheckCircle, color: 'from-emerald-500 to-emerald-600', trend: 5 },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 shadow-sm border border-slate-200/70 dark:border-slate-700/50 card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl font-bold mt-1 text-slate-800 dark:text-white"
                >
                  {stat.value}
                </motion.p>
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <span className={`${stat.trend > 0 ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-0.5`}>
                    {stat.trend > 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />} {Math.abs(stat.trend)}%
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== FILTERS ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass rounded-2xl p-5 mb-6 shadow-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-slate-400" />
          <h3 className="font-semibold text-slate-700 dark:text-slate-200">Filters</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.property} onChange={(e) => setFilters({...filters, property: e.target.value})}
          >
            <option value="">All Properties</option>
            <option>Harbor Towers</option><option>Sunset Villas</option><option>Oakwood Heights</option>
          </select>
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.unit} onChange={(e) => setFilters({...filters, unit: e.target.value})}
          >
            <option value="">All Units</option>
            <option>12A</option><option>4B</option><option>7C</option><option>2A</option><option>8D</option>
          </select>
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.priority} onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="">All Priorities</option>
            <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
          </select>
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option>Pending</option><option>Assigned</option><option>In Progress</option><option>Completed</option><option>Cancelled</option>
          </select>
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option>Electrical</option><option>Plumbing</option><option>Painting</option><option>AC Repair</option><option>Window</option>
          </select>
          <select 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={filters.assigned} onChange={(e) => setFilters({...filters, assigned: e.target.value})}
          >
            <option value="">All Staff</option>
            <option>Mike C.</option><option>Sarah L.</option><option>Tom R.</option><option>Anna K.</option>
          </select>
        </div>
        <div className="flex gap-3 mt-4">
          <button 
            onClick={() => setFilters({ property: '', unit: '', priority: '', status: '', category: '', assigned: '' })}
            className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Reset
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/20">
            Apply Filters
          </button>
        </div>
      </motion.div>

      {/* ===== SEARCH ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mb-6"
      >
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by Request ID, Tenant, Property, Unit, Issue..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-shadow shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <FaTimesCircle />
          </button>
        )}
      </motion.div>

      {/* ===== TABLE ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-slate-200/70 dark:border-slate-700/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Request ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Property</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Issue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Assigned</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <FaClipboardList size={48} className="text-slate-300 dark:text-slate-600" />
                      <p className="text-slate-500 dark:text-slate-400 font-medium">No Maintenance Requests Found</p>
                      <button 
                        onClick={() => setModalOpen({ ...modalOpen, add: true })}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/20"
                      >
                        <FaPlus className="inline mr-2" /> Add Request
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req, idx) => (
                  <motion.tr 
                    key={req.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">{req.id}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{req.property}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{req.unit}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 max-w-[120px] truncate">{req.issue}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={req.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{req.assigned}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{req.created}</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <motion.button
                          ref={(el) => buttonRefs.current[req.id] = el}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => toggleDropdown(req.id, e)}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <FaEllipsisV className="text-slate-400" size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Showing {filteredRequests.length} of {requests.length} requests</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Previous</button>
            <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">1</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
          </div>
        </div>
      </motion.div>

      {/* ===== DROPDOWN OVERLAY ===== */}
      <AnimatePresence>
        {openDropdownId !== null && (
          <>
            {/* Backdrop to close dropdown when clicking anywhere */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpenDropdownId(null)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              id={`dropdown-${openDropdownId}`}
              initial={{ opacity: 0, scale: 0.95, y: dropdownPosition.transformOrigin === 'top' ? -10 : 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: dropdownPosition.transformOrigin === 'top' ? -10 : 10 }}
              transition={{ duration: 0.15 }}
              className="fixed z-50 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/70 dark:border-slate-700/50 py-2"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                minWidth: '220px',
                maxWidth: '280px',
                transformOrigin: dropdownPosition.transformOrigin === 'top' ? 'top' : 'bottom',
              }}
            >
              {(() => {
                const req = requests.find(r => r.id === openDropdownId);
                if (!req) return null;
                return (
                  <>
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Actions</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{req.id}</p>
                    </div>
                    
                    <button
                      onClick={() => openViewModal(req)}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-3 transition-colors"
                    >
                      <FaEye className="text-blue-500" size={16} />
                      <span>View Details</span>
                    </button>
                    
                    <button
                      onClick={() => openEditModal(req)}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 flex items-center gap-3 transition-colors"
                    >
                      <FaEdit className="text-amber-500" size={16} />
                      <span>Edit Request</span>
                    </button>
                    
                    <button
                      onClick={() => openAssignModal(req)}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center gap-3 transition-colors"
                    >
                      <FaUserCog className="text-purple-500" size={16} />
                      <span>Assign Staff</span>
                    </button>
                    
                    <button
                      onClick={() => openStatusModal(req)}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-3 transition-colors"
                    >
                      <FaSync className="text-emerald-500" size={16} />
                      <span>Update Status</span>
                    </button>
                    
                    <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                    
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="w-full px-4 py-2.5 text-left text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-3 transition-colors"
                    >
                      <FaTrash className="text-rose-500" size={16} />
                      <span>Delete Request</span>
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== FLOATING ADD BUTTON (mobile) ===== */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setModalOpen({ ...modalOpen, add: true })}
        className="fixed bottom-6 right-6 md:hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl shadow-purple-500/30"
      >
        <FaPlus size={24} />
      </motion.button>

      {/* ============================================= */}
      {/* ===== MODALS ===== */}
      {/* ============================================= */}

      {/* ADD MODAL */}
      <AnimatePresence>
        {modalOpen.add && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen({ ...modalOpen, add: false })}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
                <FaPlus className="text-purple-500" /> Add Maintenance Request
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Fill in the details to create a new request</p>
              <form onSubmit={handleSubmit(handleAddRequest)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Property *</label>
                    <select {...register('property', { required: 'Property is required' })} className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.property ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none`}>
                      <option value="">Select Property</option>
                      <option>Harbor Towers</option><option>Sunset Villas</option><option>Oakwood Heights</option><option>Pine Grove</option>
                    </select>
                    {errors.property && <p className="text-rose-500 text-xs mt-1">{errors.property.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Unit *</label>
                    <input {...register('unit', { required: 'Unit is required' })} placeholder="e.g. 12A" className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.unit ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none`} />
                    {errors.unit && <p className="text-rose-500 text-xs mt-1">{errors.unit.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenant</label>
                    <input {...register('tenant')} placeholder="Tenant name" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Title *</label>
                    <input {...register('issue', { required: 'Issue title is required' })} placeholder="Brief issue description" className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.issue ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none`} />
                    {errors.issue && <p className="text-rose-500 text-xs mt-1">{errors.issue.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                    <select {...register('category', { required: 'Category is required' })} className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.category ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none`}>
                      <option value="">Select Category</option>
                      <option>Electrical</option><option>Plumbing</option><option>Painting</option><option>Cleaning</option><option>AC Repair</option><option>Door Repair</option><option>Window</option><option>Furniture</option><option>Water Leakage</option><option>Internet</option><option>Security</option><option>Other</option>
                    </select>
                    {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority *</label>
                    <select {...register('priority', { required: 'Priority is required' })} className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.priority ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none`}>
                      <option value="">Select Priority</option>
                      <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
                    </select>
                    {errors.priority && <p className="text-rose-500 text-xs mt-1">{errors.priority.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                    <input type="date" {...register('preferredDate')} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assigned Staff</label>
                    <select {...register('assigned')} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none">
                      <option value="">Unassigned</option>
                      <option>Mike C.</option><option>Sarah L.</option><option>Tom R.</option><option>Anna K.</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea {...register('description')} rows="3" placeholder="Detailed description of the issue" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModalOpen({ ...modalOpen, add: false })} className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                  <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 flex-1">Submit Request</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {modalOpen.view && selectedRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen({ ...modalOpen, view: false })}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedRequest.id}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Request Details</p>
                </div>
                <StatusBadge status={selectedRequest.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Property</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.property}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Unit</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.unit}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Tenant</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.tenant}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Priority</span>
                  <div className="mt-1"><PriorityBadge priority={selectedRequest.priority} /></div>
                </div>
                <div className="col-span-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Issue</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.issue}</p>
                </div>
                <div className="col-span-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Description</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{selectedRequest.description || 'No description provided'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Assigned To</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.assigned}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Category</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.category}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Created</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.created}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">Expected</span>
                  <p className="font-medium text-slate-800 dark:text-white mt-1">{selectedRequest.expected}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Timeline</h4>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2"><FaClock className="text-blue-500" /> <span>Request Created</span></div>
                  <div className="w-12 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex items-center gap-2"><FaUserCog className="text-purple-500" /> <span>Assigned</span></div>
                  <div className="w-12 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex items-center gap-2"><FaWrench className="text-amber-500" /> <span>In Progress</span></div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOpen({ ...modalOpen, view: false })} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">Close</button>
                <button onClick={() => { setModalOpen({ ...modalOpen, view: false }); openEditModal(selectedRequest); }} className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20">Edit Request</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {modalOpen.edit && selectedRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen({ ...modalOpen, edit: false })}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
                <FaEdit className="text-amber-500" /> Edit Request
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Update the request details below</p>
              
              <form onSubmit={handleEditSubmit(handleEditRequest)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Property *</label>
                    <select {...registerEdit('property', { required: true })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none">
                      <option>Harbor Towers</option><option>Sunset Villas</option><option>Oakwood Heights</option><option>Pine Grove</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Unit *</label>
                    <input {...registerEdit('unit', { required: true })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenant</label>
                    <input {...registerEdit('tenant')} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Title *</label>
                    <input {...registerEdit('issue', { required: true })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select {...registerEdit('category')} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none">
                      <option>Electrical</option><option>Plumbing</option><option>Painting</option><option>AC Repair</option><option>Window</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                    <select {...registerEdit('priority')} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none">
                      <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                    <textarea {...registerEdit('description')} rows="3" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assigned Staff</label>
                    <select {...registerEdit('assigned')} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none">
                      <option value="">Unassigned</option>
                      <option>Mike C.</option><option>Sarah L.</option><option>Tom R.</option><option>Anna K.</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModalOpen({ ...modalOpen, edit: false })} className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                  <button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 flex-1">Update Request</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ASSIGN MODAL */}
      <AnimatePresence>
        {modalOpen.assign && selectedRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen({ ...modalOpen, assign: false })}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-4">
                <FaUserCog className="text-purple-500" /> Assign Staff
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Request</label>
                  <p className="text-slate-800 dark:text-white font-medium">{selectedRequest.id} - {selectedRequest.issue}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Staff *</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none">
                    <option value="">Select Staff</option>
                    <option>Mike C.</option><option>Sarah L.</option><option>Tom R.</option><option>Anna K.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                  <textarea rows="3" placeholder="Additional notes..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setModalOpen({ ...modalOpen, assign: false })} className="flex-1 px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                <button onClick={() => { toast.success('Assigned successfully!'); setModalOpen({ ...modalOpen, assign: false }); }} className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20">Assign</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATUS UPDATE MODAL */}
      <AnimatePresence>
        {modalOpen.status && selectedRequest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen({ ...modalOpen, status: false })}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-4">
                <FaSync className="text-emerald-500" /> Update Status
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{selectedRequest.id} - Current: <StatusBadge status={selectedRequest.status} /></p>
              <div className="space-y-2">
                {['Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(selectedRequest.id, status)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <span className="text-slate-700 dark:text-slate-300">{status}</span>
                    <StatusBadge status={status} />
                  </button>
                ))}
              </div>
              <button onClick={() => setModalOpen({ ...modalOpen, status: false })} className="mt-4 w-full py-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MaintenanceRequest;