import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  FileText,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  Home,
  Hammer,
  Wrench,
  Award,
  Briefcase,
  File,
  Upload,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  BadgeCheck,
  Clipboard,
  Settings,
  Bell,
  Star,
  Target,
  Layers,
  Grid,
  List,
  ArrowUpDown,
  Check,
  X,
  Plus,
  Minus,
  Save,
  AlertTriangle,
  UserCheck,
  UserX,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  Lock,
  Key,
  Fingerprint
} from 'lucide-react';

// ------------------------------------------------------------
// 1. Reusable UI Components
// ------------------------------------------------------------

const GlassCard = ({ children, className = '', ...props }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Avatar = ({ src, name, size = 'md', className = '' }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  return (
    <div className={`relative flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold ${sizes[size] || sizes.md} ${className}`}>
      {src ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover" /> : initials}
    </div>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', icon, className = '', ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200/50 dark:shadow-indigo-900/30',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red-200/50 dark:shadow-red-900/30',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200/50 dark:shadow-emerald-900/30',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${variants[variant]} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};

const Input = ({ label, error, icon, className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
      <input
        className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800/50 border ${error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${icon ? 'pl-10' : ''}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, options, error, className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <select
      className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800/50 border ${error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 transition-all text-slate-800 dark:text-slate-200`}
      {...props}
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// ------------------------------------------------------------
// 2. Custom Hooks
// ------------------------------------------------------------

const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, open, close, toggle };
};

const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goTo = (page) => setCurrentPage(Math.min(Math.max(1, page), totalPages));
  return { currentPage, totalPages, currentData, goTo, setCurrentPage };
};

// ------------------------------------------------------------
// 3. Main Data
// ------------------------------------------------------------

const mockMaintainers = [
  { id: 'M-1001', name: 'James Wilson', phone: '+1 234 567 890', email: 'james.w@pm.com', property: 'Pine Valley', skills: ['Electrical', 'Plumbing', 'HVAC'], experience: '8 yrs', jobs: 145, availability: 'Available', status: 'Active', joinDate: '2021-03-15', avatar: '' },
  { id: 'M-1002', name: 'Sarah Chen', phone: '+1 345 678 901', email: 'sarah.c@pm.com', property: 'Oakwood Heights', skills: ['Carpenter', 'Painter'], experience: '5 yrs', jobs: 89, availability: 'On Duty', status: 'Active', joinDate: '2022-07-01', avatar: '' },
  { id: 'M-1003', name: 'Michael Brown', phone: '+1 456 789 012', email: 'michael.b@pm.com', property: 'Sunset Towers', skills: ['Plumbing', 'General Maintenance'], experience: '12 yrs', jobs: 210, availability: 'On Leave', status: 'Inactive', joinDate: '2019-11-20', avatar: '' },
  { id: 'M-1004', name: 'Emily Davis', phone: '+1 567 890 123', email: 'emily.d@pm.com', property: 'Riverside', skills: ['Cleaner', 'Locksmith'], experience: '3 yrs', jobs: 47, availability: 'Available', status: 'Active', joinDate: '2023-01-10', avatar: '' },
  { id: 'M-1005', name: 'David Kim', phone: '+1 678 901 234', email: 'david.k@pm.com', property: 'Willow Creek', skills: ['HVAC', 'Electrical'], experience: '6 yrs', jobs: 112, availability: 'On Duty', status: 'Busy', joinDate: '2020-09-05', avatar: '' },
  { id: 'M-1006', name: 'Lisa Martinez', phone: '+1 789 012 345', email: 'lisa.m@pm.com', property: 'Cedar Ridge', skills: ['Gardener', 'Painter'], experience: '4 yrs', jobs: 68, availability: 'Available', status: 'Active', joinDate: '2022-04-12', avatar: '' },
  { id: 'M-1007', name: 'Robert Taylor', phone: '+1 890 123 456', email: 'robert.t@pm.com', property: 'Highland Park', skills: ['Electrical', 'Plumbing', 'HVAC', 'Locksmith'], experience: '15 yrs', jobs: 312, availability: 'On Duty', status: 'Active', joinDate: '2018-06-18', avatar: '' },
];

const skillColors = {
  Electrical: 'sky', Plumbing: 'blue', Carpenter: 'amber', Painter: 'pink',
  Cleaner: 'emerald', HVAC: 'purple', Gardener: 'emerald', Locksmith: 'indigo',
  'General Maintenance': 'slate', Other: 'slate'
};

const statusColors = {
  Active: 'success', Inactive: 'danger', Busy: 'warning', Available: 'info'
};

const availabilityColors = {
  Available: 'success', 'On Duty': 'info', 'On Leave': 'warning'
};

// ------------------------------------------------------------
// 4. Maintainer List Page
// ------------------------------------------------------------

const MaintainerList = ({ onAdd, onEdit, onView, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = mockMaintainers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Stats
  const stats = [
    { label: 'Total Maintainers', value: mockMaintainers.length, icon: Users, color: 'from-indigo-500 to-purple-500', change: '+12%' },
    { label: 'Active', value: mockMaintainers.filter(m => m.status === 'Active').length, icon: UserCheck, color: 'from-emerald-500 to-teal-500', change: '+8%' },
    { label: 'Inactive', value: mockMaintainers.filter(m => m.status === 'Inactive').length, icon: UserX, color: 'from-red-500 to-rose-500', change: '-3%' },
    { label: 'Busy', value: mockMaintainers.filter(m => m.status === 'Busy').length, icon: Clock, color: 'from-amber-500 to-orange-500', change: '+5%' },
    { label: 'Available', value: mockMaintainers.filter(m => m.availability === 'Available').length, icon: CheckCircle, color: 'from-sky-500 to-blue-500', change: '+2%' },
    { label: 'Assigned Properties', value: new Set(mockMaintainers.map(m => m.property)).size, icon: Building, color: 'from-violet-500 to-purple-500', change: '+4%' },
    { label: 'Completed Jobs', value: mockMaintainers.reduce((sum, m) => sum + m.jobs, 0), icon: Clipboard, color: 'from-fuchsia-500 to-pink-500', change: '+18%' },
    { label: 'Pending Jobs', value: 24, icon: AlertCircle, color: 'from-amber-500 to-yellow-500', change: '-7%' },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">Maintainers</motion.h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage all property maintainers efficiently.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button icon={<UserPlus size={16} />} onClick={onAdd}>Add Maintainer</Button>
          <Button variant="secondary" icon={<FileText size={16} />}>Export</Button>
          <Button variant="secondary" icon={<RefreshCw size={16} />} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/30 p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-2`}>
              <stat.icon size={18} />
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
            <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{stat.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Busy">Busy</option>
          </select>
          <Button variant="secondary" icon={<Filter size={16} />}>Filter</Button>
          <Button variant="secondary">Reset</Button>
        </div>
      </div>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left"><input type="checkbox" className="rounded border-slate-300 dark:border-slate-600" /></th>
                <th className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300">Maintainer</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300 hidden md:table-cell">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300 hidden lg:table-cell">Property</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300 hidden xl:table-cell">Skills</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300 hidden sm:table-cell">Jobs</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600 dark:text-slate-300">Status</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((m, idx) => (
                <motion.tr
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300 dark:border-slate-600" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} size="sm" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-xs">
                      <p className="text-slate-600 dark:text-slate-300">{m.email}</p>
                      <p className="text-slate-400">{m.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600 dark:text-slate-300">{m.property}</td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {m.skills.slice(0, 2).map(s => (
                        <Badge key={s} variant={skillColors[s] || 'default'}>{s}</Badge>
                      ))}
                      {m.skills.length > 2 && <Badge variant="default">+{m.skills.length - 2}</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-600 dark:text-slate-300">{m.jobs}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <Badge variant={statusColors[m.status] || 'default'}>{m.status}</Badge>
                      <Badge variant={availabilityColors[m.availability] || 'default'} className="text-[10px]">{m.availability}</Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" icon={<Eye size={14} />} onClick={() => onView(m)} />
                      <Button variant="ghost" size="sm" icon={<Edit size={14} />} onClick={() => onEdit(m)} />
                      <Button variant="ghost" size="sm" icon={<Trash size={14} />} onClick={() => onDelete(m)} className="text-red-500 hover:text-red-700" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft size={14} /></Button>
            <span className="text-sm text-slate-600 dark:text-slate-300">Page {currentPage} of {totalPages}</span>
            <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight size={14} /></Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ------------------------------------------------------------
// 5. Create/Edit Maintainer Form (Stepper)
// ------------------------------------------------------------

const MaintainerForm = ({ initialData = null, onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [form, setForm] = useState({
    // Step 1
    fullName: '', maintainerId: '', email: '', phone: '', altPhone: '', gender: '', dob: '', nationality: '',
    address: '', city: '', country: '', postalCode: '',
    // Step 2
    property: '', building: '', unit: '', department: '', jobTitle: '', experience: '', qualification: '',
    joiningDate: '', salary: '', shift: '', workingHours: '', availability: 'Available', status: 'Active',
    // Step 3
    skills: [], skillLevel: 'Intermediate', certificates: null, license: null, cv: null,
    // Step 4
    emergencyName: '', emergencyRelationship: '', emergencyPhone: '', emergencyEmail: '', emergencyAddress: '',
    // Step 5
    username: '', password: '', confirmPassword: '', role: 'Maintainer',
  });

  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const validateStep = () => {
    const err = {};
    if (step === 1) {
      if (!form.fullName.trim()) err.fullName = 'Full name is required';
      if (!form.email.trim()) err.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Invalid email';
      if (!form.phone.trim()) err.phone = 'Phone is required';
      if (!form.maintainerId.trim()) err.maintainerId = 'Maintainer ID is required';
    }
    if (step === 2) {
      if (!form.property.trim()) err.property = 'Property is required';
      if (!form.jobTitle.trim()) err.jobTitle = 'Job title is required';
      if (!form.joiningDate) err.joiningDate = 'Joining date is required';
    }
    if (step === 5) {
      if (!form.username.trim()) err.username = 'Username is required';
      if (!form.password) err.password = 'Password is required';
      else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
      if (form.password !== form.confirmPassword) err.confirmPassword = 'Passwords do not match';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(s => Math.min(s + 1, totalSteps)); };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (validateStep()) onSave(form);
  };

  const StepIndicator = ({ number, label }) => (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= number ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
        {number}
      </div>
      <span className={`text-sm font-medium ${step >= number ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>{label}</span>
    </div>
  );

  const skillOptions = ['Electrical', 'Plumbing', 'Carpenter', 'Painter', 'Cleaner', 'HVAC', 'Gardener', 'Locksmith', 'General Maintenance', 'Other'];

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{initialData ? 'Edit Maintainer' : 'Add New Maintainer'}</h2>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>

      {/* Stepper */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/30">
        <StepIndicator number={1} label="Personal" />
        <StepIndicator number={2} label="Professional" />
        <StepIndicator number={3} label="Skills" />
        <StepIndicator number={4} label="Emergency" />
        <StepIndicator number={5} label="Account" />
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/30 p-6 space-y-5"
      >
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"><User size={18} /> Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name *" value={form.fullName} onChange={e => update('fullName', e.target.value)} error={errors.fullName} />
              <Input label="Maintainer ID *" value={form.maintainerId} onChange={e => update('maintainerId', e.target.value)} error={errors.maintainerId} />
              <Input label="Email *" type="email" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} icon={<Mail size={16} />} />
              <Input label="Phone *" value={form.phone} onChange={e => update('phone', e.target.value)} error={errors.phone} icon={<Phone size={16} />} />
              <Input label="Alternative Phone" value={form.altPhone} onChange={e => update('altPhone', e.target.value)} />
              <Select label="Gender" options={[{ value: '', label: 'Select' }, { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]} value={form.gender} onChange={e => update('gender', e.target.value)} />
              <Input label="Date of Birth" type="date" value={form.dob} onChange={e => update('dob', e.target.value)} />
              <Input label="Nationality" value={form.nationality} onChange={e => update('nationality', e.target.value)} />
              <Input label="Address" value={form.address} onChange={e => update('address', e.target.value)} className="md:col-span-2" />
              <Input label="City" value={form.city} onChange={e => update('city', e.target.value)} />
              <Input label="Country" value={form.country} onChange={e => update('country', e.target.value)} />
              <Input label="Postal Code" value={form.postalCode} onChange={e => update('postalCode', e.target.value)} />
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Briefcase size={18} /> Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Assign Property *" value={form.property} onChange={e => update('property', e.target.value)} error={errors.property} />
              <Input label="Building" value={form.building} onChange={e => update('building', e.target.value)} />
              <Input label="Unit (Optional)" value={form.unit} onChange={e => update('unit', e.target.value)} />
              <Input label="Department" value={form.department} onChange={e => update('department', e.target.value)} />
              <Input label="Job Title *" value={form.jobTitle} onChange={e => update('jobTitle', e.target.value)} error={errors.jobTitle} />
              <Input label="Experience (years)" value={form.experience} onChange={e => update('experience', e.target.value)} />
              <Input label="Qualification" value={form.qualification} onChange={e => update('qualification', e.target.value)} />
              <Input label="Joining Date *" type="date" value={form.joiningDate} onChange={e => update('joiningDate', e.target.value)} error={errors.joiningDate} />
              <Input label="Salary (Optional)" value={form.salary} onChange={e => update('salary', e.target.value)} />
              <Select label="Shift" options={[{ value: '', label: 'Select' }, { value: 'Morning', label: 'Morning' }, { value: 'Evening', label: 'Evening' }, { value: 'Night', label: 'Night' }]} value={form.shift} onChange={e => update('shift', e.target.value)} />
              <Input label="Working Hours" value={form.workingHours} onChange={e => update('workingHours', e.target.value)} />
              <Select label="Availability" options={[{ value: 'Available', label: 'Available' }, { value: 'On Duty', label: 'On Duty' }, { value: 'On Leave', label: 'On Leave' }]} value={form.availability} onChange={e => update('availability', e.target.value)} />
              <Select label="Status" options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }, { value: 'Busy', label: 'Busy' }]} value={form.status} onChange={e => update('status', e.target.value)} />
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Wrench size={18} /> Skills & Documents</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Skills (Multi Select)</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(skill => (
                    <Badge
                      key={skill}
                      variant={form.skills.includes(skill) ? 'success' : 'default'}
                      className="cursor-pointer px-3 py-1.5 text-xs"
                      onClick={() => {
                        if (form.skills.includes(skill)) update('skills', form.skills.filter(s => s !== skill));
                        else update('skills', [...form.skills, skill]);
                      }}
                    >
                      {skill} {form.skills.includes(skill) && <Check size={12} className="ml-1" />}
                    </Badge>
                  ))}
                </div>
              </div>
              <Select label="Skill Level" options={[{ value: 'Beginner', label: 'Beginner' }, { value: 'Intermediate', label: 'Intermediate' }, { value: 'Expert', label: 'Expert' }]} value={form.skillLevel} onChange={e => update('skillLevel', e.target.value)} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-slate-400" />
                  <p className="text-xs text-slate-500 mt-1">Certificates</p>
                  <input type="file" className="hidden" onChange={e => update('certificates', e.target.files[0])} />
                </div>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-slate-400" />
                  <p className="text-xs text-slate-500 mt-1">License</p>
                  <input type="file" className="hidden" onChange={e => update('license', e.target.files[0])} />
                </div>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-slate-400" />
                  <p className="text-xs text-slate-500 mt-1">CV / Resume</p>
                  <input type="file" className="hidden" onChange={e => update('cv', e.target.files[0])} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Phone size={18} /> Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Contact Name *" value={form.emergencyName} onChange={e => update('emergencyName', e.target.value)} />
              <Input label="Relationship" value={form.emergencyRelationship} onChange={e => update('emergencyRelationship', e.target.value)} />
              <Input label="Phone *" value={form.emergencyPhone} onChange={e => update('emergencyPhone', e.target.value)} />
              <Input label="Email" value={form.emergencyEmail} onChange={e => update('emergencyEmail', e.target.value)} />
              <Input label="Address" value={form.emergencyAddress} onChange={e => update('emergencyAddress', e.target.value)} className="md:col-span-2" />
            </div>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Lock size={18} /> Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Username *" value={form.username} onChange={e => update('username', e.target.value)} error={errors.username} />
              <Input label="Role" value={form.role} onChange={e => update('role', e.target.value)} disabled />
              <Input label="Password *" type="password" value={form.password} onChange={e => update('password', e.target.value)} error={errors.password} />
              <Input label="Confirm Password *" type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} error={errors.confirmPassword} />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Permissions Preview</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="info">View Maintainers</Badge>
                <Badge variant="success">Create Maintainers</Badge>
                <Badge variant="warning">Edit Maintainers</Badge>
                <Badge variant="danger">Delete Maintainers</Badge>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={prevStep} disabled={step === 1}><ChevronLeft size={16} /> Back</Button>
        {step < totalSteps ? (
          <Button onClick={nextStep}>Next <ChevronRight size={16} /></Button>
        ) : (
          <Button onClick={handleSubmit} icon={<Save size={16} />}>{initialData ? 'Update Maintainer' : 'Create Maintainer'}</Button>
        )}
      </div>
    </div>
  );
};

// ------------------------------------------------------------
// 6. Modals: View & Delete
// ------------------------------------------------------------

const ViewModal = ({ isOpen, onClose, data }) => {
  if (!data) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Maintainer Profile</h2>
              <Button variant="ghost" onClick={onClose}><X size={20} /></Button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Avatar name={data.name} size="lg" />
              <div>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{data.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{data.id} • {data.property}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500 dark:text-slate-400">Email:</span> {data.email}</div>
              <div><span className="text-slate-500 dark:text-slate-400">Phone:</span> {data.phone}</div>
              <div><span className="text-slate-500 dark:text-slate-400">Experience:</span> {data.experience}</div>
              <div><span className="text-slate-500 dark:text-slate-400">Jobs Completed:</span> {data.jobs}</div>
              <div><span className="text-slate-500 dark:text-slate-400">Status:</span> <Badge variant={statusColors[data.status] || 'default'}>{data.status}</Badge></div>
              <div><span className="text-slate-500 dark:text-slate-400">Availability:</span> <Badge variant={availabilityColors[data.availability] || 'default'}>{data.availability}</Badge></div>
              <div className="col-span-2"><span className="text-slate-500 dark:text-slate-400">Skills:</span> {data.skills.map(s => <Badge key={s} variant={skillColors[s] || 'default'} className="mr-1">{s}</Badge>)}</div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, data }) => {
  if (!data) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Delete Maintainer</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Are you sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-200">{data.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-3 mt-6 justify-center">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="danger" onClick={() => { onConfirm(data); onClose(); }}>Delete</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ------------------------------------------------------------
// 7. Main App Component
// ------------------------------------------------------------

const MaintainerManagement = () => {
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const viewModal = useModal();
  const deleteModal = useModal();

  const handleAdd = () => { setEditData(null); setView('form'); };
  const handleEdit = (data) => { setEditData(data); setView('form'); };
  const handleView = (data) => { setViewData(data); viewModal.open(); };
  const handleDelete = (data) => { setDeleteData(data); deleteModal.open(); };
  const handleSave = (data) => {
    console.log('Saved:', data);
    setView('list');
    // In real app, would update mockData here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50">
      {view === 'list' ? (
        <MaintainerList onAdd={handleAdd} onEdit={handleEdit} onView={handleView} onDelete={handleDelete} />
      ) : (
        <MaintainerForm initialData={editData} onSave={handleSave} onCancel={() => setView('list')} />
      )}
      <ViewModal isOpen={viewModal.isOpen} onClose={viewModal.close} data={viewData} />
      <DeleteModal isOpen={deleteModal.isOpen} onClose={deleteModal.close} onConfirm={() => console.log('Deleted:', deleteData)} data={deleteData} />
    </div>
  );
};

export default MaintainerManagement;