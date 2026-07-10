import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Sun, 
  Moon, 
  User, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Plus,
  X,
  ChevronDown,
  Home,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  Building,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateText from '../../components/common/DateText';

const TenantDashboard = () => {
    const navigate = useNavigate();
    
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Sample Tenant Data
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff&size=80',
      property: 'Riverside Apartments',
      unit: 'A-304',
      rent: 1850,
      status: 'active',
      payment: 'paid',
      startDate: '2023-01-15',
      endDate: '2024-01-14'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      phone: '(555) 987-6543',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff&size=80',
      property: 'Oakwood Heights',
      unit: 'B-201',
      rent: 2200,
      status: 'active',
      payment: 'pending',
      startDate: '2023-03-01',
      endDate: '2024-02-28'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '(555) 456-7890',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=ec4899&color=fff&size=80',
      property: 'Maple Leaf Towers',
      unit: 'C-1502',
      rent: 3100,
      status: 'inactive',
      payment: 'due',
      startDate: '2022-11-01',
      endDate: '2023-10-31'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.w@email.com',
      phone: '(555) 234-5678',
      avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=14b8a6&color=fff&size=80',
      property: 'Parkview Residences',
      unit: 'D-702',
      rent: 1650,
      status: 'pending',
      payment: 'paid',
      startDate: '2023-06-01',
      endDate: '2024-05-31'
    },
    {
      id: 5,
      name: 'Amanda Lee',
      email: 'amanda.l@email.com',
      phone: '(555) 876-5432',
      avatar: 'https://ui-avatars.com/api/?name=Amanda+Lee&background=f59e0b&color=fff&size=80',
      property: 'Sunset Gardens',
      unit: 'E-45',
      rent: 1950,
      status: 'active',
      payment: 'late',
      startDate: '2023-02-15',
      endDate: '2024-02-14'
    },
    {
      id: 6,
      name: 'Robert Taylor',
      email: 'robert.t@email.com',
      phone: '(555) 345-6789',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=ef4444&color=fff&size=80',
      property: 'Hilltop Estates',
      unit: 'F-203',
      rent: 2750,
      status: 'active',
      payment: 'paid',
      startDate: '2023-04-01',
      endDate: '2024-03-31'
    }
  ]);

  // Loading state for skeleton
  const [loading, setLoading] = useState(true);
  
  // State for confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  // Effect for dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || tenant.payment === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPaymentFilter('all');
  };

  // Navigation Functions for Migration
  const handleViewTenant = (tenant) => {
    // Navigate to tenant details page
    navigate('/tenants/view');
  };

  const handleEditTenant = (tenant) => {
    // Navigate to tenant edit page
    navigate('/tenants/edit');
  };

  const handleDeleteTenant = (tenant) => {
    // Show confirmation modal
    setSelectedTenant(tenant);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Delete the tenant and navigate back or show success message
    setTenants(tenants.filter(t => t.id !== selectedTenant.id));
    setShowDeleteModal(false);
    setSelectedTenant(null);
    
    // Optional: Show success toast or notification
    console.log(`Tenant ${selectedTenant.name} deleted successfully`);
  };

  const handleDocuments = (tenant) => {
    // Navigate to documents page
    navigate('/tenants/document');
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
    }
  };

  // Get payment badge color
  const getPaymentColor = (payment) => {
    switch(payment) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'due': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'late': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
    }
  };

  // Skeleton Card (larger)
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm animate-pulse">
      <div className="flex items-center gap-5 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 dark:border dark:border-white/15 rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Building className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tenant<span className="text-indigo-600 dark:text-indigo-400">Dashboard</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, property, or unit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-base"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <button
                // onClick={() => setDarkMode(!darkMode)}
                // className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                {/* {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} */}
              </button>

              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Filter Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 transition-colors duration-300">
                <div className="flex flex-wrap items-end gap-6">
                  <div className="flex-1 min-w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="flex-1 min-w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Payment
                    </label>
                    <select
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                    >
                      <option value="all">All Payments</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="due">Due</option>
                      <option value="late">Late</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={resetFilters}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-base font-medium"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-base font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-base text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredTenants.length}</span> of <span className="font-semibold">{tenants.length}</span> tenants
          </p>
        </div>

        {/* Tenant Grid - Larger Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredTenants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">No tenants found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {filteredTenants.map((tenant, index) => (
              <motion.div
                key={tenant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-8">
                  {/* Header with Avatar */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={tenant.avatar}
                        alt={tenant.name}
                        className="w-16 h-16 rounded-full ring-2 ring-indigo-100 dark:ring-indigo-900/30"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {tenant.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Mail className="w-4 h-4" />
                          <span>{tenant.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>{tenant.phone}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(tenant.status)}`}>
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </span>
                  </div>

                  {/* Property Info */}
                  <div className="mb-5 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                      <Home className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                      <span className="font-medium">{tenant.property}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Unit {tenant.unit}</span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-300">
                        <DollarSign className="w-5 h-5 text-green-500 dark:text-green-400" />
                        <span className="font-semibold text-lg">${tenant.rent.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm">/ month</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPaymentColor(tenant.payment)}`}>
                      {tenant.payment.charAt(0).toUpperCase() + tenant.payment.slice(1)}
                    </span>
                  </div>

                  {/* Contract Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6 px-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <DateText value={tenant.startDate} />
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <DateText value={tenant.endDate} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewTenant(tenant)}
                        className="p-3 rounded-lg transition-all text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 group relative"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          View
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditTenant(tenant)}
                        className="p-3 rounded-lg transition-all text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group relative"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Edit
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteTenant(tenant)}
                        className="p-3 rounded-lg transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 group relative"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Delete
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDocuments(tenant)}
                        className="p-3 rounded-lg transition-all text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/30 group relative"
                        title="Documents"
                      >
                        <FileText className="w-5 h-5" />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Documents
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedTenant && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Delete Tenant
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{selectedTenant.name}</span>? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteModal(false)}
                      className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={confirmDelete}
                      className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Add Button */}
        <motion.button 
          onClick={() => navigate('/tenants/form')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-5 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        >
          <Plus className="w-7 h-7" />
        </motion.button>

      </div>
    </div>
  );
};

export default TenantDashboard;