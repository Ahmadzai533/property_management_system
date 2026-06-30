import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  FileText,
  Building,
  DollarSign,
  AlertCircle,
  Search,
  Plus,
  Download,
  Printer,
  RefreshCw,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Archive,
  CreditCard,
  File,
  Clock,
  User,
  Home,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreVertical,
  Info,
  Shield,
  Award,
  UserPlus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ============================================================
// DUMMY DATA
// ============================================================
const generateTenantData = () => {
  const firstNames = ['Liam', 'William', 'Najib', 'Ahmed', 'Fatima', 'Mohammed', 'Zainab', 'Ali', 'Sara', 'Omar', 'Layla', 'Hassan', 'Aisha', 'Khalid', 'Noor', 'Yusuf', 'Mariam', 'Ibrahim', 'Haya', 'Salem'];
  const lastNames = ['Noah', 'James', 'Ahmadi', 'Al-Fahd', 'Al-Rashid', 'Al-Saud', 'Al-Qahtani', 'Al-Dosari', 'Al-Otaibi', 'Al-Shammari', 'Al-Harbi', 'Al-Ghamdi', 'Al-Zahrani', 'Al-Malki', 'Al-Anzi', 'Al-Subaie', 'Al-Mutairi', 'Al-Rajhi', 'Al-Faisal', 'Al-Turki'];
  const statuses = ['Active', 'Draft', 'Inactive'];
  const properties = ['Al Barsha Heights', 'Jumeirah Village Circle', 'Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Dubai Hills Estate', 'Arabian Ranches', 'Mirdif', 'Al Quoz', 'Deira'];
  const units = ['A101', 'B202', 'C303', 'D404', 'E505', 'F606', 'G707', 'H808', 'I909', 'J1010'];
  const buildingNames = ['Tower 1', 'Tower 2', 'Tower 3', 'Tower 4', 'Tower 5', 'Tower 6', 'Tower 7', 'Tower 8', 'Tower 9', 'Tower 10'];
  const genders = ['Male', 'Female'];
  const occupations = ['Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Student', 'Government Employee', 'Private Sector', 'Entrepreneur', 'Consultant', 'Manager'];
  const paymentMethods = ['Bank Transfer', 'Credit Card', 'Cheque', 'Cash', 'Digital Wallet'];

  const tenants = [];
  
  for (let i = 1; i <= 30; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const property = properties[Math.floor(Math.random() * properties.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    const building = buildingNames[Math.floor(Math.random() * buildingNames.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];
    const rent = Math.floor(Math.random() * 50000) + 15000;
    const deposit = Math.floor(Math.random() * 10000) + 5000;
    
    const leaseStart = new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
    const leaseEnd = new Date(leaseStart);
    leaseEnd.setFullYear(leaseEnd.getFullYear() + 1);
    
    const payments = Array.from({ length: Math.floor(Math.random() * 6) + 3 }, (_, idx) => {
      const paymentDate = new Date(leaseStart);
      paymentDate.setMonth(paymentDate.getMonth() + idx);
      return {
        month: paymentDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
        amount: rent,
        status: ['Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 3)],
        date: paymentDate.toISOString().split('T')[0],
        method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      };
    });

    tenants.push({
      id: i,
      sl: i,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+971 ${Math.floor(Math.random() * 9999999)}`,
      gender,
      nationality: ['Saudi', 'UAE', 'Kuwaiti', 'Qatari', 'Omani', 'Bahraini'][Math.floor(Math.random() * 6)],
      occupation,
      emergencyContact: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]} - +971 ${Math.floor(Math.random() * 9999999)}`,
      address: `${Math.floor(Math.random() * 1000)} ${property}`,
      city: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'][Math.floor(Math.random() * 4)],
      country: 'UAE',
      nationalId: `784-${Math.floor(Math.random() * 999999999)}`,
      passport: `A${Math.floor(Math.random() * 9999999)}`,
      property,
      building,
      unit,
      floor: Math.floor(Math.random() * 50) + 1,
      propertyType: ['Apartment', 'Villa', 'Townhouse', 'Studio', 'Penthouse'][Math.floor(Math.random() * 5)],
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      rent,
      deposit,
      leaseStart: leaseStart.toISOString().split('T')[0],
      leaseEnd: leaseEnd.toISOString().split('T')[0],
      leaseDuration: '12 months',
      leaseStatus: ['Active', 'Expired', 'Pending Renewal'][Math.floor(Math.random() * 3)],
      status,
      payments,
      documents: [
        { name: 'National ID Card', type: 'PDF', size: '2.4 MB' },
        { name: 'Passport Copy', type: 'PDF', size: '1.8 MB' },
        { name: 'Lease Agreement', type: 'PDF', size: '3.2 MB' },
        { name: 'Rental Contract', type: 'PDF', size: '2.1 MB' },
        { name: 'Move-out Form', type: 'PDF', size: '1.2 MB' },
      ],
      registeredDate: new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      verified: Math.random() > 0.3,
      approved: Math.random() > 0.4,
      totalPaid: rent * (Math.floor(Math.random() * 6) + 3),
      pendingPayments: Math.floor(Math.random() * 3),
    });
  }

  // Ensure some specific records for demo
  tenants[0].status = 'Active';
  tenants[0].rent = 45000;
  tenants[1].status = 'Active';
  tenants[1].rent = 38000;
  tenants[2].status = 'Active';
  tenants[2].rent = 52000;
  tenants[3].status = 'Draft';
  tenants[3].rent = 0;
  tenants[4].status = 'Inactive';
  tenants[4].rent = 0;

  return tenants;
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const formatCurrency = (amount) => {
  if (amount === 0) return 'AED 0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getStatusBadge = (status) => {
  const configs = {
    Active: {
      icon: CheckCircle,
      color: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
    },
    Draft: {
      icon: AlertCircle,
      color: 'text-yellow-700 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-200 dark:border-yellow-800',
    },
    Inactive: {
      icon: XCircle,
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
    },
    'Pending Renewal': {
      icon: Clock,
      color: 'text-orange-700 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/30',
      border: 'border-orange-200 dark:border-orange-800',
    },
    Expired: {
      icon: XCircle,
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
    },
    Paid: {
      icon: CheckCircle,
      color: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
    },
    Pending: {
      icon: Clock,
      color: 'text-yellow-700 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-200 dark:border-yellow-800',
    },
    Overdue: {
      icon: AlertCircle,
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
    },
  };
  return configs[status] || configs.Active;
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const TenantTable = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    property: '',
    unit: '',
    minRent: '',
    maxRent: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'sl', direction: 'asc' });
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [toast, setToast] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({});

  const actionButtonRefs = useRef({});
  const menuRef = useRef(null);
  const modalRef = useRef(null);

  // Click outside handler to close action menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openActionMenu !== null) {
        const button = actionButtonRefs.current[openActionMenu];
        const menu = menuRef.current;
        
        if (button && !button.contains(event.target) && menu && !menu.contains(event.target)) {
          setOpenActionMenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openActionMenu]);

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpenActionMenu(null);
        if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  // Close modal on outside click - IMPROVED
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutsideModal);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = generateTenantData();
      setTenants(data);
      setFilteredTenants(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Search and filter
  useEffect(() => {
    let result = [...tenants];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(tenant =>
        tenant.fullName.toLowerCase().includes(term) ||
        tenant.email.toLowerCase().includes(term) ||
        tenant.property.toLowerCase().includes(term) ||
        tenant.unit.toLowerCase().includes(term)
      );
    }

    if (filters.status) {
      result = result.filter(t => t.status === filters.status);
    }
    if (filters.property) {
      result = result.filter(t => t.property.toLowerCase().includes(filters.property.toLowerCase()));
    }
    if (filters.unit) {
      result = result.filter(t => t.unit.toLowerCase().includes(filters.unit.toLowerCase()));
    }
    if (filters.minRent) {
      result = result.filter(t => t.rent >= parseInt(filters.minRent));
    }
    if (filters.maxRent) {
      result = result.filter(t => t.rent <= parseInt(filters.maxRent));
    }

    setFilteredTenants(result);
    setCurrentPage(1);
  }, [searchTerm, filters, tenants]);

  // Sorting
  const sortedTenants = useMemo(() => {
    const sorted = [...filteredTenants];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === 'rent') {
          aVal = a.rent;
          bVal = b.rent;
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredTenants, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTenants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTenants.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => {
    const total = tenants.length;
    const active = tenants.filter(t => t.status === 'Active').length;
    const draft = tenants.filter(t => t.status === 'Draft').length;
    const inactive = tenants.filter(t => t.status === 'Inactive').length;
    const totalRevenue = tenants.reduce((sum, t) => sum + t.totalPaid, 0);
    const pendingPayments = tenants.reduce((sum, t) => sum + t.pendingPayments, 0);
    const uniqueProperties = new Set(tenants.map(t => t.property)).size;
    return { total, active, draft, inactive, totalRevenue, pendingPayments, uniqueProperties };
  }, [tenants]);

  // Handlers
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ status: '', property: '', unit: '', minRent: '', maxRent: '' });
    setSearchTerm('');
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleView = (tenant) => {
    setSelectedTenant(tenant);
    setActiveTab('profile');
    setIsModalOpen(true);
    setOpenActionMenu(null);
  };
  
  const navigate = useNavigate();

  const handleEdit = (tenant) => {
    showToast(`Edit tenant: ${tenant.fullName}`, 'info');
    setOpenActionMenu(null);
  };

  const handleDelete = (tenant) => {
    showToast(`Delete tenant: ${tenant.fullName}`, 'error');
    setOpenActionMenu(null);
  };

  const handleArchive = (tenant) => {
    const updated = tenants.map(t =>
      t.id === tenant.id ? { ...t, status: 'Inactive' } : t
    );
    setTenants(updated);
    setFilteredTenants(updated);
    showToast(`Archived: ${tenant.fullName}`, 'success');
    setOpenActionMenu(null);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = generateTenantData();
      setTenants(data);
      setFilteredTenants(data);
      setIsLoading(false);
      showToast('Data refreshed', 'success');
    }, 800);
  };

  const handleExport = () => {
    showToast('Export started', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleActionMenuToggle = (tenantId, event) => {
    if (openActionMenu === tenantId) {
      setOpenActionMenu(null);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const menuHeight = 250;
    
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    let position = {};
    if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
      position = {
        bottom: '100%',
        top: 'auto',
        transformOrigin: 'bottom right',
      };
    } else {
      position = {
        top: '100%',
        bottom: 'auto',
        transformOrigin: 'top right',
      };
    }
    
    setMenuPosition(position);
    setOpenActionMenu(tenantId);
  };

  // ============================================================
  // LOADING SKELETON
  // ============================================================
  if (isLoading) {
    return (
      <div className="p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-4">
        {/* Purple Header Skeleton */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="space-y-2">
            <div className="h-7 sm:h-8 w-36 sm:w-48 bg-purple-400/30 rounded animate-pulse"></div>
            <div className="h-3 sm:h-4 w-48 sm:w-64 bg-purple-400/20 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm animate-pulse">
              <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-6 sm:h-8 w-10 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="h-9 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="w-full">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <th key={i} className="px-2 sm:px-4 md:px-6 py-2 sm:py-3">
                      <div className="h-3 sm:h-4 w-10 sm:w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                    {[1, 2, 3, 4, 5, 6, 7].map(j => (
                      <td key={j} className="px-2 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div className="h-3 sm:h-4 w-12 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
    >
      {/* ===== PURPLE HEADER ===== */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Tenant Management
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-0.5 sm:mt-1 hidden xs:block">
              Manage all tenants, properties, and rental records
            </p>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-purple-300 mt-0.5 sm:mt-1">
              <span>Dashboard</span>
              <span>/</span>
              <span>Tenants</span>
              <span>/</span>
              <span className="text-white">history</span>
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-medium hover:bg-white/30 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex flex-wrap gap-2">
            <button
              onClick={() => {
                navigate('/tenants/form');
                showToast('Add tenant form opens', 'info');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white text-purple-700 rounded-lg hover:shadow-lg transition-all hover:scale-105 text-xs md:text-sm font-medium"
            >
              <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden xs:inline">Add Tenant</span>
              <span className="xs:hidden">Add</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors text-xs md:text-sm font-medium"
            >
              <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden md:inline">Export</span>
            </button>
            <button
              onClick={handleRefresh}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Printer className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Action Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-1.5 pt-2 pb-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/tenants/form');
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-purple-700 rounded-lg text-xs font-medium"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Tenant
                </button>
                <button
                  onClick={() => {
                    handleExport();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-xs font-medium"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
                <button
                  onClick={() => {
                    handleRefresh();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-xs font-medium"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    handlePrint();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg text-xs font-medium"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: stats.active, icon: UserCheck, color: 'from-green-500 to-green-600' },
          { label: 'Draft', value: stats.draft, icon: FileText, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Properties', value: stats.uniqueProperties, icon: Building, color: 'from-purple-500 to-purple-600' },
          { label: 'Revenue', value: formatCurrency(stats.totalRevenue).replace('AED', '').trim(), icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Pending', value: stats.pendingPayments, icon: AlertCircle, color: 'from-red-500 to-red-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-2.5 sm:p-3 md:p-4 shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
                    className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white mt-0.5 truncate"
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 ml-1.5 sm:ml-2`}>
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ===== SEARCH & FILTERS ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-2.5 sm:p-3 md:p-4 flex flex-col xs:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border transition-all text-xs sm:text-sm ${
                isFilterOpen
                  ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Filters</span>
              {Object.values(filters).some(v => v) && (
                <span className="ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
                  {Object.values(filters).filter(v => v).length}
                </span>
              )}
            </button>
            <button
              onClick={resetFilters}
              className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 md:pb-4 border-t border-gray-100 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 pt-2.5 sm:pt-3 md:pt-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 sm:mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 sm:mb-1">
                    Property
                  </label>
                  <input
                    type="text"
                    value={filters.property}
                    onChange={(e) => handleFilterChange('property', e.target.value)}
                    placeholder="Search..."
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 sm:mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={filters.unit}
                    onChange={(e) => handleFilterChange('unit', e.target.value)}
                    placeholder="Unit..."
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 sm:mb-1">
                    Min Rent
                  </label>
                  <input
                    type="number"
                    value={filters.minRent}
                    onChange={(e) => handleFilterChange('minRent', e.target.value)}
                    placeholder="0"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 sm:mb-1">
                    Max Rent
                  </label>
                  <input
                    type="number"
                    value={filters.maxRent}
                    onChange={(e) => handleFilterChange('maxRent', e.target.value)}
                    placeholder="100000"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== DATA TABLE ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] md:min-w-0">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {[
                  { key: 'sl', label: '#', className: 'w-12' },
                  { key: 'fullName', label: 'Name', className: 'min-w-[120px]' },
                  { key: 'property', label: 'Property', className: 'min-w-[120px] hidden sm:table-cell' },
                  { key: 'unit', label: 'Unit', className: 'w-20' },
                  { key: 'rent', label: 'Rent', className: 'w-24' },
                  { key: 'status', label: 'Status', className: 'w-24' },
                  { key: 'actions', label: '', className: 'w-16' },
                ].map((header) => (
                  <th
                    key={header.key}
                    className={`px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${header.className || ''}`}
                  >
                    {header.key !== 'actions' ? (
                      <button
                        onClick={() => handleSort(header.key)}
                        className="flex items-center gap-0.5 sm:gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                      >
                        {header.label}
                        {sortConfig.key === header.key && (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          ) : (
                            <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          )
                        )}
                      </button>
                    ) : (
                      header.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-4 md:px-6 py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                      <Users className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gray-300 dark:text-gray-600" />
                      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">No tenants found</p>
                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                      <button
                        onClick={resetFilters}
                        className="mt-1 sm:mt-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((tenant, index) => {
                  const StatusIcon = getStatusBadge(tenant.status).icon;
                  const statusConfig = getStatusBadge(tenant.status);

                  return (
                    <motion.tr
                      key={tenant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {tenant.sl}
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-medium text-[8px] sm:text-[10px] md:text-sm flex-shrink-0">
                            {tenant.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
                              {tenant.fullName}
                            </p>
                            <p className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 truncate hidden xs:block">
                              {tenant.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 hidden sm:table-cell">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-900 dark:text-white truncate max-w-[100px] md:max-w-[150px]">
                            {tenant.property}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                            {tenant.building}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {tenant.unit}
                        </span>
                        <p className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">
                          F{tenant.floor}
                        </p>
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(tenant.rent)}
                        </p>
                        <p className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 hidden xs:block">
                          Dep: {formatCurrency(tenant.deposit)}
                        </p>
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-medium border ${statusConfig.color} ${statusConfig.bg} ${statusConfig.border}`}>
                          <StatusIcon className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                          <span className="hidden sm:inline">{tenant.status}</span>
                          <span className="sm:hidden">{tenant.status.charAt(0)}</span>
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4">
                        <div className="relative inline-block">
                          <button
                            ref={(el) => {
                              if (el) {
                                actionButtonRefs.current[tenant.id] = el;
                              }
                            }}
                            onClick={(e) => handleActionMenuToggle(tenant.id, e)}
                            className="p-0.5 sm:p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400" />
                          </button>

                          <AnimatePresence>
                            {openActionMenu === tenant.id && (
                              <motion.div
                                ref={menuRef}
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className={`absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50`}
                                style={{
                                  ...menuPosition,
                                  maxHeight: '300px',
                                  overflowY: 'auto',
                                }}
                              >
                                <div className="py-1">
                                  <button
                                    onClick={() => handleView(tenant)}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors text-left"
                                  >
                                    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleEdit(tenant)}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors text-left"
                                  >
                                    <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleArchive(tenant)}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors text-left"
                                  >
                                    <Archive className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Archive
                                  </button>
                                  <button
                                    onClick={() => handleDelete(tenant)}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 w-full transition-colors text-left"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Delete
                                  </button>
                                  <hr className="border-gray-100 dark:border-gray-700" />
                                  <button
                                    onClick={() => showToast(`Payment history for ${tenant.fullName}`, 'info')}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors text-left"
                                  >
                                    <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Payments
                                  </button>
                                  <button
                                    onClick={() => showToast(`Lease info for ${tenant.fullName}`, 'info')}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors text-left"
                                  >
                                    <File className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Lease
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ===== PAGINATION ===== */}
        {sortedTenants.length > 0 && (
          <div className="px-2.5 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col xs:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center xs:text-left">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedTenants.length)} of {sortedTenants.length}
            </p>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 sm:p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 sm:p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="ml-0.5 sm:ml-1 md:ml-2 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-[10px] sm:text-xs md:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ===== VIEW MODAL - IMPROVED OVERFLOW ===== */}
      <AnimatePresence>
        {isModalOpen && selectedTenant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            style={{ 
              overflow: 'hidden',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header - Fixed */}
              <div className="flex-shrink-0 p-3 sm:p-4 md:p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base md:text-lg flex-shrink-0">
                    {selectedTenant.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {selectedTenant.fullName}
                    </h2>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {selectedTenant.email} • {selectedTenant.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="sm:ml-auto p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 self-end sm:self-center"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Tabs - Fixed */}
              <div className="flex-shrink-0 border-b border-gray-100 dark:border-gray-700 px-3 sm:px-4 md:px-6 overflow-x-auto">
                <div className="flex gap-2 sm:gap-3 md:gap-6 min-w-max">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'property', label: 'Property', icon: Home },
                    { id: 'lease', label: 'Lease', icon: File },
                    { id: 'payments', label: 'Payments', icon: CreditCard },
                    { id: 'documents', label: 'Docs', icon: FileText },
                    { id: 'timeline', label: 'Timeline', icon: Clock },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 sm:py-3 px-0.5 sm:px-1 border-b-2 transition-colors flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm ${
                          activeTab === tab.id
                            ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        <span className="hidden xs:inline">{tab.label}</span>
                        <span className="xs:hidden">{tab.label.charAt(0)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">Personal</h3>
                          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Full Name</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right truncate ml-2">{selectedTenant.fullName}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Email</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right truncate ml-2">{selectedTenant.email}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Phone</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.phone}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Gender</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.gender}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Nationality</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.nationality}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">Additional</h3>
                          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Occupation</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.occupation}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Emergency</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2 text-[10px] sm:text-xs truncate max-w-[120px] sm:max-w-none">{selectedTenant.emergencyContact}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Address</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2 text-[10px] sm:text-xs truncate max-w-[120px] sm:max-w-none">{selectedTenant.address}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">City</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.city}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-500 dark:text-gray-400">National ID</span>
                              <span className="font-medium text-gray-900 dark:text-white text-right ml-2 text-[10px] sm:text-xs">{selectedTenant.nationalId}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Property Tab */}
                    {activeTab === 'property' && (
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">Property Details</h3>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Property</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2 text-[10px] sm:text-xs truncate max-w-[120px] sm:max-w-none">{selectedTenant.property}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Building</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.building}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Unit</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.unit}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Floor</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.floor}</span>
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">Specifications</h3>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Type</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.propertyType}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Bedrooms</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.bedrooms}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Bathrooms</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.bathrooms}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Rent</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{formatCurrency(selectedTenant.rent)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Lease Tab */}
                    {activeTab === 'lease' && (
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">Lease Info</h3>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Start</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{formatDate(selectedTenant.leaseStart)}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">End</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{formatDate(selectedTenant.leaseEnd)}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Duration</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{selectedTenant.leaseDuration}</span>
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">Financial</h3>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Monthly Rent</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{formatCurrency(selectedTenant.rent)}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Deposit</span>
                            <span className="font-medium text-gray-900 dark:text-white text-right ml-2">{formatCurrency(selectedTenant.deposit)}</span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm items-center">
                            <span className="text-gray-500 dark:text-gray-400">Status</span>
                            <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-xs font-medium border ${getStatusBadge(selectedTenant.leaseStatus).color} ${getStatusBadge(selectedTenant.leaseStatus).bg} ${getStatusBadge(selectedTenant.leaseStatus).border}`}>
                              {selectedTenant.leaseStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payments Tab */}
                    {activeTab === 'payments' && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                          <div className="p-2.5 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">Total Paid</p>
                            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedTenant.totalPaid)}</p>
                          </div>
                          <div className="p-2.5 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">Pending</p>
                            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white">{selectedTenant.pendingPayments}</p>
                          </div>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          {selectedTenant.payments.map((payment, idx) => {
                            const statusConfig = getStatusBadge(payment.status);
                            const StatusIcon = statusConfig.icon;
                            return (
                              <div key={idx} className="flex flex-col xs:flex-row xs:items-center justify-between p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors gap-1.5 sm:gap-2">
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{payment.month}</p>
                                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{payment.method}</p>
                                </div>
                                <div className="flex items-center justify-between xs:justify-end gap-2 sm:gap-3 w-full xs:w-auto">
                                  <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{formatCurrency(payment.amount)}</p>
                                  <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-xs font-medium border ${statusConfig.color} ${statusConfig.bg} ${statusConfig.border}`}>
                                    <StatusIcon className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                                    {payment.status}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === 'documents' && (
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        {selectedTenant.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white text-[10px] sm:text-xs md:text-sm truncate">{doc.name}</p>
                                <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{doc.type} • {doc.size}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                              <button className="p-0.5 sm:p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Preview">
                                <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-500" />
                              </button>
                              <button className="p-0.5 sm:p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Download">
                                <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === 'timeline' && (
                      <div className="relative pl-5 sm:pl-6 md:pl-8 space-y-3 sm:space-y-4 md:space-y-6 before:absolute before:left-1.5 sm:before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                        {[
                          { icon: UserPlus, label: 'Tenant Created', date: selectedTenant.registeredDate, color: 'bg-purple-500' },
                          { icon: Shield, label: 'Verified', date: selectedTenant.verified ? selectedTenant.registeredDate : null, color: 'bg-green-500' },
                          { icon: Award, label: 'Approved', date: selectedTenant.approved ? selectedTenant.registeredDate : null, color: 'bg-purple-500' },
                          { icon: Home, label: 'Assigned Property', date: selectedTenant.leaseStart, color: 'bg-indigo-500' },
                          { icon: File, label: 'Lease Started', date: selectedTenant.leaseStart, color: 'bg-teal-500' },
                          { icon: CreditCard, label: 'Payments Made', date: selectedTenant.payments[0]?.date, color: 'bg-emerald-500' },
                          { icon: Calendar, label: 'Lease Ended', date: selectedTenant.leaseEnd, color: 'bg-orange-500' },
                          { icon: Archive, label: 'Archived', date: selectedTenant.status === 'Inactive' ? selectedTenant.leaseEnd : null, color: 'bg-gray-500' },
                        ].filter(item => item.date).map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="relative"
                            >
                              <div className={`absolute -left-5 sm:-left-6 md:-left-8 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${item.color} ring-2 sm:ring-4 ring-white dark:ring-gray-800 mt-1`}></div>
                              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 xs:gap-2">
                                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-500 dark:text-gray-400" />
                                  <span className="font-medium text-gray-900 dark:text-white text-[10px] sm:text-xs md:text-sm">{item.label}</span>
                                </div>
                                <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-5 xs:ml-0">{formatDate(item.date)}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TOAST ===== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-3 sm:bottom-4 md:bottom-6 left-3 right-3 sm:left-auto sm:right-4 md:right-6 z-50"
          >
            <div className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-600' :
              toast.type === 'error' ? 'bg-red-600' :
              toast.type === 'warning' ? 'bg-yellow-600' :
              'bg-blue-600'
            } text-white max-w-full sm:max-w-md`}>
              {toast.type === 'success' && <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />}
              {toast.type === 'error' && <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />}
              {toast.type === 'info' && <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />}
              <span className="text-[10px] sm:text-xs md:text-sm font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 z-40 p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </motion.button>
    </motion.div>
  );
};

export default TenantTable;