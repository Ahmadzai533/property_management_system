import { motion } from "framer-motion";
import { Building2, Users, FileText, DollarSign, Plus } from "lucide-react";
import StatsCard from "../Dashboard/StatsCard";
import RevenueChart from "../Dashboard/RevenueChart";
import OccupancyChart from "../Dashboard/OccupancyChart";
import RecentActivity from "../Dashboard/RecentActivity";
import UpcomingRentTable from "../Dashboard/UpcomingRentTable";
import MaintenanceOverview from "../Dashboard/MaintenanceOverview";
import Button from "../common/Button";
import Breadcrumb from "../components/common/Breadcrumb";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Properties",
      value: "42",
      icon: Building2,
      change: 8.5,
    },
    {
      title: "Active Tenants",
      value: "38",
      icon: Users,
      change: 12.3,
    },
    {
      title: "Ongoing Contracts",
      value: "35",
      icon: FileText,
      change: -3.2,
    },
    {
      title: "Monthly Revenue",
      value: "$12,500",
      icon: DollarSign,
      change: 15.7,
      gradient: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="space-y-5 sm:space-y-6 lg:space-y-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="min-w-0">
          <Breadcrumb />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mt-3">
            Dashboard Overview
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-1 truncate">
            Welcome back manager. Here's today's performance overview.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button
            icon={Plus}
            className="shadow-lg shadow-[#6D28D9]/30 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
          >
            Add Property
          </Button>
          <Button
            variant="secondary"
            icon={Plus}
            className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
          >
            Add Tenant
          </Button>
          <Button
            variant="success"
            icon={Plus}
            className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
          >
            Create Contract
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.05,
                ease: "easeOut",
              }}
            >
              <StatsCard
                {...stat}
                color={index === 3 ? "#8B5CF6" : "#6D28D9"}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <RevenueChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            <OccupancyChart />
          </motion.div>
        </div>
      </section>

      {/* Activity & Maintenance Section */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="lg:col-span-2"
          >
            <RecentActivity />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            <MaintenanceOverview />
          </motion.div>
        </div>
      </section>

      {/* Rent Table Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <UpcomingRentTable />
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
