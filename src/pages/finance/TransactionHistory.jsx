// src/pages/finance/TransactionHistory.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  XCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Printer,
} from 'lucide-react';
import { StatCard } from '../../components/finance/StatCard';
import { FinanceTable } from '../../components/finance/FinanceTable';
import { FinanceFilters } from '../../components/finance/FinanceFilters';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/Button';

const breadcrumbItems = [
  { label: 'Finance', href: '/finance' },
  { label: 'Transaction History' },
];

const statsData = [
  {
    title: 'Total Transactions',
    value: 2847,
    icon: <Activity className="w-6 h-6" />,
    trend: 15.3,
    subtitle: 'Last 30 days',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Income',
    value: 2847500,
    icon: <ArrowUp className="w-6 h-6" />,
    trend: 12.5,
    subtitle: 'Total received',
    prefix: '$',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Expenses',
    value: 847500,
    icon: <ArrowDown className="w-6 h-6" />,
    trend: -8.2,
    subtitle: 'Total paid',
    prefix: '$',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    title: 'Refunds',
    value: 42500,
    icon: <RefreshCw className="w-6 h-6" />,
    trend: -3.7,
    subtitle: 'Processed refunds',
    prefix: '$',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    title: 'Pending',
    value: 32,
    icon: <Clock className="w-6 h-6" />,
    trend: -12.4,
    subtitle: 'Awaiting confirmation',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    title: 'Failed',
    value: 8,
    icon: <XCircle className="w-6 h-6" />,
    trend: -25.0,
    subtitle: 'Failed transactions',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Successful',
    value: 2807,
    icon: <CheckCircle className="w-6 h-6" />,
    trend: 18.2,
    subtitle: 'Completed transactions',
    gradient: 'from-teal-500 to-cyan-600',
  },
];

const transactionData = [
  {
    id: 'TX-2024-001',
    date: '2024-01-28T14:30:00',
    property: 'Sunset Towers',
    unit: 'A-1201',
    tenant: 'John Smith',
    category: 'Rent Payment',
    reference: 'INV-2024-001',
    paymentMethod: 'Bank Transfer',
    amount: 2500,
    status: 'Completed',
    createdBy: 'Jane Doe',
  },
  {
    id: 'TX-2024-002',
    date: '2024-01-27T10:15:00',
    property: 'Ocean View',
    unit: 'B-304',
    tenant: 'Sarah Johnson',
    category: 'Deposit',
    reference: 'DEP-2024-001',
    paymentMethod: 'Credit Card',
    amount: 3200,
    status: 'Pending',
    createdBy: 'John Smith',
  },
  {
    id: 'TX-2024-003',
    date: '2024-01-26T16:45:00',
    property: 'Garden Heights',
    unit: 'C-502',
    tenant: 'Michael Brown',
    category: 'Late Fee',
    reference: 'LAT-2024-001',
    paymentMethod: 'Cash',
    amount: 50,
    status: 'Failed',
    createdBy: 'Jane Doe',
  },
];

export default function TransactionHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const columns = [
    { key: 'id', header: 'Transaction ID', sortable: true, sticky: true },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      accessor: (row) => new Date(row.date).toLocaleString(),
    },
    { key: 'property', header: 'Property', sortable: true },
    { key: 'unit', header: 'Unit' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'category', header: 'Category' },
    { key: 'reference', header: 'Reference' },
    { key: 'paymentMethod', header: 'Payment Method' },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      accessor: (row) => `$${row.amount.toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            row.status === 'Completed'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : row.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: 'createdBy', header: 'Created By' },
  ];

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      {/* Gradient Header */}
      <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
        <Breadcrumb items={breadcrumbItems} white={true} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Transaction History
            </h1>
            <p className="text-white/80 mt-1">
              Complete audit trail of all financial transactions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            subtitle={stat.subtitle}
            prefix={stat.prefix}
            suffix={stat.suffix}
            gradient={stat.gradient}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <FinanceFilters
          searchPlaceholder="Search by transaction ID, tenant, property..."
          filters={[
            {
              key: 'type',
              label: 'Transaction Type',
              options: [
                { value: 'rent', label: 'Rent Payment' },
                { value: 'invoice', label: 'Invoice Payment' },
                { value: 'deposit', label: 'Deposit' },
                { value: 'refund', label: 'Refund' },
                { value: 'adjustment', label: 'Adjustment' },
                { value: 'expense', label: 'Expense' },
                { value: 'latefee', label: 'Late Fee' },
                { value: 'discount', label: 'Discount' },
              ],
            },
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' },
              ],
            },
            {
              key: 'method',
              label: 'Payment Method',
              options: [
                { value: 'bank', label: 'Bank Transfer' },
                { value: 'card', label: 'Credit Card' },
                { value: 'cash', label: 'Cash' },
                { value: 'check', label: 'Check' },
              ],
            },
          ]}
          onSearch={(value) => console.log('Search:', value)}
          onFilter={(key, value) => console.log('Filter:', key, value)}
          onDateRange={(start, end) => console.log('Date range:', start, end)}
          onReset={() => console.log('Reset filters')}
          onExport={() => console.log('Export')}
        />

        <div className="mt-4">
          <FinanceTable
            columns={columns}
            data={transactionData}
            onRowClick={(row) => {
              setSelectedTransaction(row);
              setIsDetailsOpen(true);
            }}
            onSort={(key, direction) =>
              console.log('Sort:', key, direction)
            }
            isLoading={isLoading}
            stickyHeader
            stickyFirstColumn
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1-{transactionData.length} of 2,847 transactions
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              3
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {isDetailsOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsDetailsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6D28D9]/10 to-[#8B5CF6]/10 dark:from-[#6D28D9]/20 dark:to-[#8B5CF6]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Transaction Details
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedTransaction.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="p-2 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Transaction Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Amount:</span>{' '}
                        <span className="font-medium">${selectedTransaction.amount.toLocaleString()}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Category:</span>{' '}
                        {selectedTransaction.category}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Status:</span>{' '}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          selectedTransaction.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : selectedTransaction.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {selectedTransaction.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Audit Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Created By:</span>{' '}
                        {selectedTransaction.createdBy}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>{' '}
                        {new Date(selectedTransaction.date).toLocaleString()}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Reference:</span>{' '}
                        {selectedTransaction.reference}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Timeline
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm font-medium">Transaction Created</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(selectedTransaction.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Processed</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(new Date(selectedTransaction.date).getTime() + 3600000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedTransaction.status === 'Completed' && (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                        <div>
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(new Date(selectedTransaction.date).getTime() + 7200000).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}