// src/pages/finance/RentRollLedger.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building,
  Users,
  Home,
  DollarSign,
  TrendingUp,
  Percent,
  Clock,
  Shield,
  Download,
  Printer,
} from 'lucide-react';
import { StatCard } from '../../components/finance/StatCard';
import { FinanceTable } from '../../components/finance/FinanceTable';
import { FinanceFilters } from '../../components/finance/FinanceFilters';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/Button';
import DateText from '../../components/common/DateText';

const breadcrumbItems = [
  { label: 'Finance', href: '/finance' },
  { label: 'Rent Roll Ledger' },
];

const statsData = [
  {
    title: 'Expected Monthly Rent',
    value: 425000,
    icon: <DollarSign className="w-6 h-6" />,
    trend: 4.2,
    subtitle: 'Total projected',
    prefix: '$',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Collected Rent',
    value: 398750,
    icon: <TrendingUp className="w-6 h-6" />,
    trend: 6.8,
    subtitle: '93.8% collected',
    prefix: '$',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Outstanding Rent',
    value: 26250,
    icon: <Clock className="w-6 h-6" />,
    trend: -2.3,
    subtitle: '6.2% outstanding',
    prefix: '$',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    title: 'Occupancy Rate',
    value: 94.2,
    icon: <Home className="w-6 h-6" />,
    trend: 1.5,
    subtitle: 'Active leases',
    suffix: '%',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    title: 'Collection Rate',
    value: 95.6,
    icon: <Percent className="w-6 h-6" />,
    trend: 2.1,
    subtitle: 'Last 30 days',
    suffix: '%',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'Active Leases',
    value: 847,
    icon: <Users className="w-6 h-6" />,
    trend: 3.7,
    subtitle: 'Total tenants',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Vacant Units',
    value: 52,
    icon: <Building className="w-6 h-6" />,
    trend: -5.4,
    subtitle: 'Available units',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Security Deposits',
    value: 847000,
    icon: <Shield className="w-6 h-6" />,
    trend: 2.8,
    subtitle: 'Total held',
    prefix: '$',
    gradient: 'from-pink-500 to-rose-600',
  },
];

const ledgerData = [
  {
    property: 'Sunset Towers',
    unit: 'A-1201',
    tenant: 'John Smith',
    lease: 'LS-2024-001',
    monthlyRent: 2500,
    dueDate: '2024-01-31',
    amountPaid: 2500,
    outstanding: 0,
    securityDeposit: 2500,
    balance: 0,
    occupancy: 'Occupied',
    status: 'Paid',
  },
  {
    property: 'Ocean View',
    unit: 'B-304',
    tenant: 'Sarah Johnson',
    lease: 'LS-2024-002',
    monthlyRent: 3200,
    dueDate: '2024-02-15',
    amountPaid: 0,
    outstanding: 3200,
    securityDeposit: 3200,
    balance: 3200,
    occupancy: 'Occupied',
    status: 'Pending',
  },
  {
    property: 'Garden Heights',
    unit: 'C-502',
    tenant: 'Michael Brown',
    lease: 'LS-2024-003',
    monthlyRent: 1800,
    dueDate: '2024-01-15',
    amountPaid: 0,
    outstanding: 1800,
    securityDeposit: 1800,
    balance: 1800,
    occupancy: 'Occupied',
    status: 'Overdue',
  },
];

export default function RentRollLedger() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const columns = [
    { key: 'property', header: 'Property', sortable: true, sticky: true },
    { key: 'unit', header: 'Unit' },
    { key: 'tenant', header: 'Tenant', sortable: true },
    { key: 'lease', header: 'Lease' },
    {
      key: 'monthlyRent',
      header: 'Monthly Rent',
      sortable: true,
      accessor: (row) => `$${row.monthlyRent.toLocaleString()}`,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      accessor: (row) => <DateText value={row.dueDate} />,
    },
    {
      key: 'amountPaid',
      header: 'Amount Paid',
      accessor: (row) => `$${row.amountPaid.toLocaleString()}`,
    },
    {
      key: 'outstanding',
      header: 'Outstanding',
      accessor: (row) => `$${row.outstanding.toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            row.status === 'Paid'
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
  ];

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      {/* Gradient Header */}
      <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
        <Breadcrumb items={breadcrumbItems} white={true} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Rent Roll Ledger
            </h1>
            <p className="text-white/80 mt-1">
              Complete rent roll management and lease tracking
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
          searchPlaceholder="Search by property, unit, tenant..."
          filters={[
            {
              key: 'status',
              label: 'Lease Status',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'pending', label: 'Pending' },
                { value: 'overdue', label: 'Overdue' },
                { value: 'expired', label: 'Expired' },
              ],
            },
            {
              key: 'property',
              label: 'Property',
              options: [
                { value: 'sunset', label: 'Sunset Towers' },
                { value: 'ocean', label: 'Ocean View' },
                { value: 'garden', label: 'Garden Heights' },
              ],
            },
          ]}
          onSearch={(value) => console.log('Search:', value)}
          onFilter={(key, value) => console.log('Filter:', key, value)}
          onDateRange={(start, end) => console.log('Date range:', start, end)}
          onReset={() => console.log('Reset filters')}
        />

        <div className="mt-4">
          <FinanceTable
            columns={columns}
            data={ledgerData}
            onRowClick={(row) => {
              setSelectedUnit(row);
              setIsDrawerOpen(true);
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
            Showing 1-{ledgerData.length} of 847 active leases
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

      {/* Details Drawer */}
      {isDrawerOpen && selectedUnit && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex justify-end min-h-screen">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-white dark:bg-gray-900 shadow-2xl w-full max-w-md h-full overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6D28D9]/10 to-[#8B5CF6]/10 dark:from-[#6D28D9]/20 dark:to-[#8B5CF6]/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Unit Details
                  </h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Property Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{selectedUnit.property}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Unit {selectedUnit.unit}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Tenant Information
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{selectedUnit.tenant}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lease: {selectedUnit.lease}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Payment Summary
                  </h3>
                  <div className="space-y-2 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Monthly Rent
                      </span>
                      <span className="text-sm font-medium">
                        ${selectedUnit.monthlyRent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Amount Paid
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        ${selectedUnit.amountPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Outstanding
                      </span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        ${selectedUnit.outstanding.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                      <span className="text-sm font-medium">Balance</span>
                      <span className="text-sm font-bold">
                        ${selectedUnit.balance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Documents
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
                      📄 Lease Agreement.pdf
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
                      📄 Payment History.pdf
                    </button>
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