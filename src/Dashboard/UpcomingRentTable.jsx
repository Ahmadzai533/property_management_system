import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronUp, ChevronDown, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const UpcomingRentTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('dueDate')
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [data] = useState([
    { id: 1, tenant: 'Sarah Johnson', property: 'Sunset Villa #3B', dueDate: '2026-06-25', amount: 2400, status: 'Pending' },
    { id: 2, tenant: 'Michael Chen', property: 'Ocean View #12A', dueDate: '2026-06-28', amount: 3200, status: 'Paid' },
    { id: 3, tenant: 'Emily Davis', property: 'Mountain Lodge #7', dueDate: '2026-07-01', amount: 1800, status: 'Pending' },
    { id: 4, tenant: 'James Wilson', property: 'City Heights #5C', dueDate: '2026-06-20', amount: 2750, status: 'Overdue' },
    { id: 5, tenant: 'Maria Garcia', property: 'Sunset Villa #2A', dueDate: '2026-07-05', amount: 2100, status: 'Pending' },
    { id: 6, tenant: 'Robert Kim', property: 'Ocean View #8B', dueDate: '2026-06-22', amount: 2950, status: 'Paid' },
    { id: 7, tenant: 'Lisa Park', property: 'City Heights #10D', dueDate: '2026-07-08', amount: 1650, status: 'Pending' },
  ])

  const statusColors = {
    Paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle },
    Pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
    Overdue: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
  }

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]
      
      if (sortField === 'amount') {
        aVal = Number(aVal)
        bVal = Number(bVal)
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortField, sortDirection])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

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
    return <Icon className={`w-4 h-4 ${statusConfig.text}`} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xl shadow-slate-200/30"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Upcoming Rent</h3>
          <p className="text-sm text-slate-500">Due rent payments</p>
        </div>
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tenants or properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              {['Tenant', 'Property', 'Due Date', 'Amount', 'Status'].map((header, index) => {
                const fieldMap = ['tenant', 'property', 'dueDate', 'amount', 'status']
                const field = fieldMap[index]
                return (
                  <th
                    key={header}
                    className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4 cursor-pointer hover:text-slate-700 transition-colors"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      {sortField === field && (
                        sortDirection === 'asc' ? 
                          <ChevronUp className="w-3 h-3" /> : 
                          <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const statusConfig = statusColors[item.status]
              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium text-slate-800">
                    {item.tenant}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {item.property}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {new Date(item.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-800">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default UpcomingRentTable