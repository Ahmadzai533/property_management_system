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
import { useLocalization } from '../../hooks/useLocalization';

export default function RentRollLedger() {
  const { t } = useLocalization();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const statsData = [
    {
      title: t('finance.ledger.expectedMonthlyRent'),
      value: 425000,
      icon: <DollarSign className="w-6 h-6" />,
      trend: 4.2,
      subtitle: t('finance.ledger.totalProjected'),
      prefix: '$',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: t('finance.ledger.collectedRent'),
      value: 398750,
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 6.8,
      subtitle: t('finance.ledger.percentCollected', { percent: "93.8" }),
      prefix: '$',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: t('finance.ledger.outstandingRent'),
      value: 26250,
      icon: <Clock className="w-6 h-6" />,
      trend: -2.3,
      subtitle: t('finance.ledger.percentOutstanding', { percent: "6.2" }),
      prefix: '$',
      gradient: 'from-yellow-500 to-amber-600',
    },
    {
      title: t('finance.ledger.occupancyRate'),
      value: 94.2,
      icon: <Home className="w-6 h-6" />,
      trend: 1.5,
      subtitle: t('finance.ledger.activeLeases'),
      suffix: '%',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      title: t('finance.ledger.collectionRate'),
      value: 95.6,
      icon: <Percent className="w-6 h-6" />,
      trend: 2.1,
      subtitle: t('finance.stats.last30Days'),
      suffix: '%',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      title: t('finance.ledger.activeLeasesCount'),
      value: 847,
      icon: <Users className="w-6 h-6" />,
      trend: 3.7,
      subtitle: t('finance.ledger.totalTenants'),
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      title: t('finance.ledger.vacantUnits'),
      value: 52,
      icon: <Building className="w-6 h-6" />,
      trend: -5.4,
      subtitle: t('finance.ledger.availableUnits'),
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: t('finance.ledger.securityDeposits'),
      value: 847000,
      icon: <Shield className="w-6 h-6" />,
      trend: 2.8,
      subtitle: t('finance.ledger.totalHeld'),
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

  const columns = [
    { key: 'property', header: t('finance.table.property'), sortable: true, sticky: true },
    { key: 'unit', header: t('finance.table.unit') },
    { key: 'tenant', header: t('finance.table.tenant'), sortable: true },
    { key: 'lease', header: t('finance.table.lease') },
    {
      key: 'monthlyRent',
      header: t('finance.table.monthlyRent'),
      sortable: true,
      accessor: (row) => `$${row.monthlyRent.toLocaleString()}`,
    },
    {
      key: 'dueDate',
      header: t('finance.table.dueDate'),
      accessor: (row) => <DateText value={row.dueDate} />,
    },
    {
      key: 'amountPaid',
      header: t('finance.table.amountPaid'),
      accessor: (row) => `$${row.amountPaid.toLocaleString()}`,
    },
    {
      key: 'outstanding',
      header: t('finance.table.outstanding'),
      accessor: (row) => `$${row.outstanding.toLocaleString()}`,
    },
    {
      key: 'status',
      header: t('finance.table.status'),
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
          {t(`finance.status.${row.status.toLowerCase()}`, row.status)}
        </span>
      ),
    },
  ];

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9] p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
        <Breadcrumb items={[
          { label: t('nav.finance'), href: "/finance" },
          { label: t('finance.rentRollLedger') },
        ]} white={true} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t('finance.rentRollLedger')}
            </h1>
            <p className="text-white/80 mt-1">
              {t('finance.rentRollLedgerDesc')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300">
              <Download className="w-4 h-4 mr-2" />
              {t('common.export')}
            </Button>
            <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300">
              <Printer className="w-4 h-4 mr-2" />
              {t('common.print')}
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
          searchPlaceholder={t('finance.filters.searchLedger')}
          filters={[
            {
              key: 'status',
              label: t('finance.filters.leaseStatus'),
              options: [
                { value: 'active', label: t('common.active') },
                { value: 'pending', label: t('common.pending') },
                { value: 'overdue', label: t('finance.status.overdue') },
                { value: 'expired', label: t('common.expired') },
              ],
            },
            {
              key: 'property',
              label: t('finance.filters.property'),
              options: [
                { value: 'sunset', label: t('finance.properties.sunsetTowers') },
                { value: 'ocean', label: t('finance.properties.oceanView') },
                { value: 'garden', label: t('finance.properties.gardenHeights') },
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
            {t('finance.ledger.showingLeases', { start: 1, end: ledgerData.length, total: 847 })}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
              {t('common.previous')}
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
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>

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
                    {t('finance.ledger.unitDetails')}
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
                    {t('finance.ledger.propertyInfo')}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{selectedUnit.property}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('finance.ledger.unitLabel')} {selectedUnit.unit}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {t('finance.ledger.tenantInfo')}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{selectedUnit.tenant}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('finance.table.lease')}: {selectedUnit.lease}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {t('finance.ledger.paymentSummary')}
                  </h3>
                  <div className="space-y-2 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t('finance.table.monthlyRent')}
                      </span>
                      <span className="text-sm font-medium">
                        ${selectedUnit.monthlyRent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t('finance.table.amountPaid')}
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        ${selectedUnit.amountPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t('finance.table.outstanding')}
                      </span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        ${selectedUnit.outstanding.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                      <span className="text-sm font-medium">{t('finance.ledger.balance')}</span>
                      <span className="text-sm font-bold">
                        ${selectedUnit.balance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {t('finance.ledger.documents')}
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
                      📄 {t('finance.ledger.leaseAgreement')}.pdf
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300">
                      📄 {t('finance.ledger.paymentHistory')}.pdf
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