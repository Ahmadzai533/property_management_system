import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useLocalization } from '../../hooks/useLocalization'
import DateText from '../../components/common/DateText'

const UpcomingRentTable = () => {
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('dueDate')
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('All')
  const itemsPerPage = 5

  const [data] = useState([
    { id: 1, tenant: 'Sarah Johnson', property: 'Sunset Villa #3B', dueDate: '2026-06-25', amount: 2400, status: 'Pending' },
    { id: 2, tenant: 'Michael Chen', property: 'Ocean View #12A', dueDate: '2026-06-28', amount: 3200, status: 'Paid' },
    { id: 3, tenant: 'Emily Davis', property: 'Mountain Lodge #7', dueDate: '2026-07-01', amount: 1800, status: 'Pending' },
    { id: 4, tenant: 'James Wilson', property: 'City Heights #5C', dueDate: '2026-06-20', amount: 2750, status: 'Overdue' },
    { id: 5, tenant: 'Maria Garcia', property: 'Sunset Villa #2A', dueDate: '2026-07-05', amount: 2100, status: 'Pending' },
    { id: 6, tenant: 'Robert Kim', property: 'Ocean View #8B', dueDate: '2026-06-22', amount: 2950, status: 'Paid' },
    { id: 7, tenant: 'Lisa Park', property: 'City Heights #10D', dueDate: '2026-07-08', amount: 1650, status: 'Pending' },
    { id: 8, tenant: 'David Wong', property: 'Mountain Lodge #4', dueDate: '2026-06-30', amount: 2200, status: 'Overdue' },
    { id: 9, tenant: 'Amanda Lee', property: 'Sunset Villa #1C', dueDate: '2026-07-12', amount: 2600, status: 'Pending' },
    { id: 10, tenant: 'Thomas Brown', property: 'Ocean View #9D', dueDate: '2026-06-18', amount: 3100, status: 'Paid' },
  ])

  const statusColors = {
    Paid: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', icon: CheckCircle },
    Pending: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', icon: Clock },
    Overdue: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800', icon: AlertCircle },
  }

  const statusOptions = ['All', 'Paid', 'Pending', 'Overdue']

  const filteredData = useMemo(() => {
    let result = data.filter(item =>
      item.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    if (statusFilter !== 'All') {
      result = result.filter(item => item.status === statusFilter)
    }
    
    return result
  }, [data, searchTerm, statusFilter])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]
      
      if (sortField === 'amount') {
        aVal = Number(aVal)
        bVal = Number(bVal)
      }
      
      if (sortField === 'dueDate') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortField, sortDirection])

  const totalItems = sortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusIcon = (status) => {
    const statusConfig = statusColors[status]
    const Icon = statusConfig.icon
    return <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${statusConfig.text}`} />
  }

  const getStatusCount = (status) => {
    if (status === 'All') return data.length
    return data.filter(item => item.status === status).length
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setCurrentPage(1)
  }

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const tableHeaders = [
    t('dashboard.table.tenant'),
    t('dashboard.table.property'),
    t('dashboard.table.dueDate'),
    t('dashboard.table.amount'),
    t('dashboard.table.status'),
  ]

  const fieldMap = ['tenant', 'property', 'dueDate', 'amount', 'status']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-slate-800/30 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-5 md:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
            {t('dashboard.rent.title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {totalItems} {t('dashboard.rent.dueRentPayments', { count: totalItems })}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:min-w-[200px] lg:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder={t('dashboard.rent.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all duration-300 dark:text-white dark:placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCurrentPage(1)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            {statusOptions.map(status => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setCurrentPage(1)
                }}
                className={`
                  px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium 
                  transition-all duration-200 whitespace-nowrap
                  ${statusFilter === status
                    ? 'bg-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30'
                    : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }
                `}
              >
                {status === 'All' ? t('dashboard.rent.all') : t(`dashboard.status.${status.toLowerCase()}`)} ({getStatusCount(status)})
              </button>
            ))}
            {(searchTerm || statusFilter !== 'All') && (
              <button
                onClick={clearFilters}
                className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors whitespace-nowrap"
              >
                {t('dashboard.rent.clear')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                {tableHeaders.map((header, index) => {
                  const field = fieldMap[index]
                  return (
                    <th
                      key={header}
                      className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider py-3 px-3 sm:px-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors group"
                      onClick={() => handleSort(field)}
                    >
                      <div className="flex items-center gap-1">
                        <span>{header}</span>
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDirection === 'asc' ? 'text-[#6D28D9]' : 'text-slate-400 dark:text-slate-500'}`} />
                          <ChevronDown className={`w-2.5 h-2.5 -mt-0.5 ${sortField === field && sortDirection === 'desc' ? 'text-[#6D28D9]' : 'text-slate-400 dark:text-slate-500'}`} />
                        </div>
                        {sortField === field && (
                          <span className="text-[10px] text-[#6D28D9] ml-0.5">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => {
                    const statusConfig = statusColors[item.status]
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
                      >
                        <td className="py-3 px-3 sm:px-4">
                          <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-none">
                              {item.tenant}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <p className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-[120px] sm:max-w-none">
                            {item.property}
                          </p>
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            <DateText value={item.dueDate} />
                          </p>
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                            ${item.amount.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <div className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                            {getStatusIcon(item.status)}
                            <span className="hidden xs:inline">{t(`dashboard.status.${item.status.toLowerCase()}`)}</span>
                            <span className="xs:hidden">
                              {item.status === 'Paid' ? '✓' : item.status === 'Pending' ? '⏳' : '⚠'}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-full">
                          <Search className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{t('dashboard.rent.noResults')}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{t('dashboard.rent.adjustSearch')}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
            {t('dashboard.rent.pagination', { start: ((currentPage - 1) * itemsPerPage) + 1, end: Math.min(currentPage * itemsPerPage, totalItems), total: totalItems })}
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                p-1.5 sm:p-2 rounded-lg transition-all duration-200
                ${currentPage === 1 
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 active:scale-95'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`
                      min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-2 sm:px-3 
                      rounded-lg text-xs sm:text-sm font-semibold 
                      transition-all duration-200
                      ${currentPage === pageNum
                        ? 'bg-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30'
                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                )
              }
              return null
            })}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                p-1.5 sm:p-2 rounded-lg transition-all duration-200
                ${currentPage === totalPages 
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 active:scale-95'
                }
              `}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default UpcomingRentTable