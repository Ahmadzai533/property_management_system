import { motion } from 'framer-motion'
import { Building2, Users, FileText, DollarSign, Plus } from 'lucide-react'
import StatsCard from '../Dashboard/StatsCard'
import RevenueChart from '../Dashboard/RevenueChart'
import OccupancyChart from '../Dashboard/OccupancyChart'
import RecentActivity from '../Dashboard/RecentActivity'
import UpcomingRentTable from '../Dashboard/UpcomingRentTable'
import MaintenanceOverview from '../Dashboard/MaintenanceOverview'
import Button from '../common/Button'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Properties',
      value: '42',
      icon: Building2,
      change: 8.5,
    },
    {
      title: 'Active Tenants',
      value: '38',
      icon: Users,
      change: 12.3,
    },
    {
      title: 'Ongoing Contracts',
      value: '35',
      icon: FileText,
      change: -3.2,
    },
    {
      title: 'Monthly Revenue',
      value: '$12,500',
      icon: DollarSign,
      change: 15.7,
      gradient: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
           initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">
            Welcome back manager. Here's today's performance overview.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button icon={Plus} className="shadow-lg shadow-[#6D28D9]/30">
            Add Property
          </Button>
          <Button variant="secondary" icon={Plus}>
            Add Tenant
          </Button>
          <Button variant="success" icon={Plus}>
            Create Contract
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            color={index === 3 ? '#8B5CF6' : '#6D28D9'}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <OccupancyChart />
      </div>

      {/* Activity and Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <MaintenanceOverview />
        </div>
      </div>

      {/* Rent Table */}
      <UpcomingRentTable />
    </div>
  )
}

export default Dashboard