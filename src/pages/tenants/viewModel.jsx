import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Briefcase, Users, Award, Edit, Trash2,
  Home, Building, MapPin, Calendar, DollarSign, Shield,
  Clock, FileText, Download, Eye, Wrench, MessageSquare,
  CheckCircle, AlertCircle, Sun, Moon, ChevronRight,
  CreditCard, File, Image, HardDrive, Activity, Bell,
  Star, TrendingUp, TrendingDown, MoreVertical, Printer,
  Share2, Copy, ExternalLink, Sparkles, Upload
} from "lucide-react";
import DateText from "../../components/common/DateText";

const TenantDetailsViewModel = () => {
  // ----- MOCK DATA -----
  const tenant = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+93 700 000 000",
    age: 28,
    job: "Software Engineer",
    familyMembers: 3,
    status: "Active",
    avatar: "",
    joinDate: "2025-01-10",
    rating: 4.8,
    property: {
      name: "Green Villa Apartment",
      type: "Apartment",
      unit: "A-12",
      address: "Kabul, Afghanistan",
      moveInDate: "2025-01-10",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,450 sq ft"
    },
    lease: {
      rent: 500,
      deposit: 1000,
      start: "2025-01-10",
      end: "2026-01-10",
      status: "Paid",
      dueDate: "2026-02-01",
      lateFee: "$25/day"
    },
    finance: {
      totalPaid: 6000,
      pending: 500,
      invoices: 12,
      lastPayment: "2026-06-01",
      totalDue: 6500
    },
    documents: [
      { name: "Contract", type: "pdf", size: "2.4 MB", date: "2025-01-10" },
      { name: "ID Card", type: "image", size: "1.2 MB", date: "2025-01-12" },
      { name: "Payment Receipt", type: "pdf", size: "0.8 MB", date: "2025-06-01" },
      { name: "Insurance", type: "pdf", size: "3.1 MB", date: "2025-02-15" }
    ],
    maintenance: [
      { title: "Water leakage", status: "Pending", priority: "High", date: "2025-05-20" },
      { title: "Light repair", status: "Done", priority: "Low", date: "2025-05-10" },
      { title: "AC maintenance", status: "In Progress", priority: "Medium", date: "2025-06-01" }
    ],
    notes: [
      { text: "Tenant requested AC repair", date: "2025-05-10", admin: "Admin", type: "internal" },
      { text: "Rent paid on time", date: "2025-06-01", admin: "System", type: "system" },
      { text: "Property inspection scheduled", date: "2025-06-15", admin: "Manager", type: "reminder" }
    ],
    communications: [
      { sender: "Admin", message: "Welcome to the property!", date: "2025-01-10", read: true },
      { sender: "John", message: "When is the next maintenance?", date: "2025-05-15", read: true },
      { sender: "Admin", message: "Maintenance scheduled for next week", date: "2025-05-16", read: false }
    ]
  };

  // ----- ACTIVE TAB STATE -----
  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = ["Profile", "Home Details", "Lease", "Finance", "Documents", "Maintenance"];

  // ----- HOVER CARD VARIANTS -----
  const cardVariants = {
    hover: {
      y: -6,
      scale: 1.01,
      boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  // ----- HELPER: BADGE -----
  const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      done: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      paid: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
      high: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
      medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    };
    return (
      <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
        {children}
      </span>
    );
  };

  // ----- HELPER: INFO ROW WITH ANIMATION -----
  const InfoRow = ({ label, value, icon: Icon, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0 group hover:bg-gray-50/80 dark:hover:bg-gray-700/20 px-2 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {Icon && <Icon size={16} className="text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />}
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</span>
    </motion.div>
  );

  // ----- GLASS CARD WITH ENHANCED ANIMATIONS -----
  const GlassCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover="hover"
      variants={cardVariants}
      className={`bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 p-5 ${className}`}
    >
      {children}
    </motion.div>
  );

  // ----- SECTION TITLE -----
  const SectionTitle = ({ children, icon: Icon }) => (
    <motion.h3
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2"
    >
      {Icon && <Icon size={16} className="text-indigo-500 dark:text-indigo-400" />}
      {children}
    </motion.h3>
  );

  // ----- RENDER TAB CONTENT -----
  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard delay={0.1}>
              <SectionTitle icon={User}>Personal Information</SectionTitle>
              <div className="space-y-1">
                <InfoRow label="Full Name" value={tenant.name} icon={User} delay={0.05} />
                <InfoRow label="Email" value={tenant.email} icon={Mail} delay={0.1} />
                <InfoRow label="Phone" value={tenant.phone} icon={Phone} delay={0.15} />
                <InfoRow label="Age" value={tenant.age + " years"} icon={User} delay={0.2} />
                <InfoRow label="Job" value={tenant.job} icon={Briefcase} delay={0.25} />
                <InfoRow label="Family Members" value={tenant.familyMembers} icon={Users} delay={0.3} />
                <InfoRow label="Status" value={<Badge variant="active">{tenant.status}</Badge>} icon={Award} delay={0.35} />
                <InfoRow label="Rating" value={"⭐ " + tenant.rating + "/5"} icon={Star} delay={0.4} />
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <SectionTitle icon={Sparkles}>Quick Actions</SectionTitle>
              <div className="flex flex-wrap gap-3 mt-2">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Edit size={16} /> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Trash2 size={16} /> Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Upload size={16} /> Avatar Upload
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Printer size={16} /> Print
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Share2 size={16} /> Share
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-4 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl flex items-center gap-4 border border-indigo-200/50 dark:border-indigo-700/30"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                >
                  {tenant.name.charAt(0)}
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{tenant.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Member since <DateText value={tenant.joinDate} /></p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 flex items-center gap-1 mt-0.5">
                    <Badge variant="active">Verified</Badge>
                  </p>
                </div>
              </motion.div>
            </GlassCard>
          </div>
        );

      case "Home Details":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard delay={0.1}>
              <SectionTitle icon={Building}>Property Information</SectionTitle>
              <div className="space-y-1">
                <InfoRow label="Property Name" value={tenant.property.name} icon={Home} delay={0.05} />
                <InfoRow label="Property Type" value={tenant.property.type} icon={Building} delay={0.1} />
                <InfoRow label="Unit Number" value={tenant.property.unit} icon={Home} delay={0.15} />
                <InfoRow label="Address" value={tenant.property.address} icon={MapPin} delay={0.2} />
                <InfoRow label="Bedrooms" value={tenant.property.bedrooms} icon={Users} delay={0.25} />
                <InfoRow label="Bathrooms" value={tenant.property.bathrooms} icon={User} delay={0.3} />
                <InfoRow label="Area" value={tenant.property.area} icon={HardDrive} delay={0.35} />
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <SectionTitle icon={Calendar}>Move-in & Details</SectionTitle>
              <div className="space-y-1">
                <InfoRow label="Move-in Date" value={<DateText value={tenant.property.moveInDate} />} icon={Calendar} delay={0.05} />
                <InfoRow label="Rent Type" value="Monthly" icon={DollarSign} delay={0.1} />
                <InfoRow label="Lease Status" value={<Badge variant="active">Active</Badge>} icon={Shield} delay={0.15} />
                <InfoRow label="Property Age" value="3 years" icon={Clock} delay={0.2} />
                <InfoRow label="Last Inspection" value={<DateText value="2025-05-20" />} icon={CheckCircle} delay={0.25} />
              </div>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700/30"
              >
                <p className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle size={14} /> Property is in excellent condition
                </p>
              </motion.div>
            </GlassCard>
          </div>
        );

      case "Lease":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard delay={0.1}>
              <SectionTitle icon={DollarSign}>Lease & Rent</SectionTitle>
              <div className="space-y-1">
                <InfoRow label="Monthly Rent" value={"$" + tenant.lease.rent} icon={DollarSign} delay={0.05} />
                <InfoRow label="Security Deposit" value={"$" + tenant.lease.deposit} icon={Shield} delay={0.1} />
                <InfoRow label="Lease Start" value={<DateText value={tenant.lease.start} />} icon={Calendar} delay={0.15} />
                <InfoRow label="Lease End" value={<DateText value={tenant.lease.end} />} icon={Calendar} delay={0.2} />
                <InfoRow label="Payment Status" value={<Badge variant="paid">{tenant.lease.status}</Badge>} icon={CreditCard} delay={0.25} />
                <InfoRow label="Due Date" value={<DateText value={tenant.lease.dueDate} />} icon={Clock} delay={0.3} />
                <InfoRow label="Late Fee" value={tenant.lease.lateFee} icon={AlertCircle} delay={0.35} />
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <SectionTitle icon={Activity}>Lease Progress</SectionTitle>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span>Lease Duration</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-300">65%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, delay: 0.3, type: "spring" }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-400 rounded-full relative"
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md"
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                  <span><DateText value={tenant.lease.start} /></span>
                  <span className="text-indigo-600 dark:text-indigo-300 font-medium">{Math.floor((Date.now() - new Date(tenant.lease.start)) / (1000 * 60 * 60 * 24))} days</span>
                  <span><DateText value={tenant.lease.end} /></span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 grid grid-cols-2 gap-2"
                >
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Days Remaining</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">238</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Duration</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">365 days</p>
                  </div>
                </motion.div>
              </div>
            </GlassCard>
          </div>
        );

      case "Finance":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard delay={0.1}>
              <SectionTitle icon={CreditCard}>Financial Summary</SectionTitle>
              <div className="space-y-1">
                <InfoRow label="Total Paid" value={"$" + tenant.finance.totalPaid} icon={DollarSign} delay={0.05} />
                <InfoRow label="Total Due" value={"$" + tenant.finance.totalDue} icon={CreditCard} delay={0.1} />
                <InfoRow label="Pending Amount" value={"$" + tenant.finance.pending} icon={AlertCircle} delay={0.15} />
                <InfoRow label="Last Payment" value={<DateText value={tenant.finance.lastPayment} />} icon={Calendar} delay={0.2} />
                <InfoRow label="Invoice Count" value={tenant.finance.invoices} icon={FileText} delay={0.25} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-3 bg-indigo-50/80 dark:bg-indigo-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-700/30"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Payment History</span>
                  <span className="text-indigo-600 dark:text-indigo-300 font-medium">12 invoices</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1].map((paid, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: 20 }}
                      transition={{ delay: 0.4 + i * 0.02 }}
                      className={`flex-1 rounded-sm ${paid ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-rose-400 dark:bg-rose-500'}`}
                      style={{ height: '20px' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                  <span>Jan</span>
                  <span>Jun</span>
                </div>
              </motion.div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <SectionTitle icon={Activity}>Payment Trend</SectionTitle>
              <div className="flex items-end h-32 gap-1.5 mt-2 px-2">
                {[25, 40, 30, 55, 70, 45, 60, 80, 65, 90, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 0.7}%` }}
                    transition={{ duration: 0.6, delay: i * 0.04, type: "spring" }}
                    className="flex-1 bg-gradient-to-t from-indigo-400 to-blue-400 dark:from-indigo-500 dark:to-blue-500 rounded-t-md relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap"
                    >
                      ${h * 10}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Monthly payment trend (Jan - Dec)</p>
            </GlassCard>
          </div>
        );

      case "Documents":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tenant.documents.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg dark:shadow-2xl p-5 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center text-indigo-500 dark:text-indigo-300"
                >
                  {doc.type === "pdf" ? <File size={48} /> : <Image size={48} />}
                </motion.div>
                <p className="mt-2 font-medium text-gray-800 dark:text-white">{doc.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{doc.size} · <DateText value={doc.date} /></p>
                <div className="flex justify-center gap-3 mt-3">
                  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-all shadow-sm hover:shadow-md">
                    <Eye size={16} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-all shadow-sm hover:shadow-md">
                    <Download size={16} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all shadow-sm hover:shadow-md">
                    <ExternalLink size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "Maintenance":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard delay={0.1}>
              <SectionTitle icon={Wrench}>Maintenance Requests</SectionTitle>
              <div className="space-y-3">
                {tenant.maintenance.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-gray-50/80 dark:bg-gray-800/40 rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700/30"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400"><DateText value={item.date} /></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.priority.toLowerCase()}>{item.priority}</Badge>
                      <Badge variant={item.status === "Done" ? "done" : item.status === "In Progress" ? "pending" : "pending"}>
                        {item.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <SectionTitle icon={MessageSquare}>Notes & Communications</SectionTitle>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Bell size={12} /> Recent Notes
                  </p>
                  {tenant.notes.map((note, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-2.5 rounded-lg text-sm ${
                        note.type === 'internal' ? 'bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500' :
                        note.type === 'system' ? 'bg-emerald-50/80 dark:bg-emerald-900/20 border-l-4 border-emerald-400 dark:border-emerald-500' :
                        'bg-amber-50/80 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500'
                      }`}
                    >
                      <p className="text-gray-700 dark:text-gray-200">{note.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5"><DateText value={note.date} /> · {note.admin}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2 mt-4">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare size={12} /> Communications
                  </p>
                  {tenant.communications.map((comm, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-2.5 bg-gray-50/80 dark:bg-gray-800/40 rounded-lg text-sm border border-gray-100 dark:border-gray-700/30"
                    >
                      <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-medium text-indigo-600 dark:text-indigo-300">{comm.sender}:</span> {comm.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center justify-between">
                        <span><DateText value={comm.date} /></span>
                        {!comm.read && <Badge variant="active">New</Badge>}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        );

      default:
        return <div className="text-gray-600 dark:text-gray-400">Select a tab</div>;
    }
  };

  // ----- MAIN RENDER -----
  return (
    <div className="min-h-screen font-['Inter'] antialiased transition-all duration-700 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ----- TENANT PROFILE SECTION (TOP HEADER CARD) ----- */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="backdrop-blur-xl rounded-3xl p-6 border shadow-2xl flex flex-wrap items-center gap-6 relative overflow-hidden transition-all duration-500 bg-white/95 border-gray-200/50 dark:bg-gray-800/80 dark:border-gray-700/30"
        >
          {/* Animated background gradient */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.06) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(99,102,241,0.10) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.12)_0%,transparent_50%)]"
          />

          {/* Profile Image & Info */}
          <div className="flex items-center gap-5 relative">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-indigo-200/50 dark:shadow-none"
            >
              {tenant.name.charAt(0)}
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3"
              >
                {tenant.name}
                <Badge variant="active">{tenant.status}</Badge>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mt-1"
              >
                <span className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  <Mail size={14} /> {tenant.email}
                </span>
                <span className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  <Phone size={14} /> {tenant.phone}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> {tenant.age} yrs
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {tenant.job}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {tenant.familyMembers} members
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star size={14} /> {tenant.rating}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto flex-wrap relative">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              <Edit size={16} /> Edit
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              <Trash2 size={16} /> Delete
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              <MoreVertical size={16} /> More
            </motion.button>
          </div>
        </motion.div>

        {/* ----- TABS NAVIGATION ----- */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 pb-1 transition-colors duration-500">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all whitespace-nowrap relative ${
                  activeTab === tab
                    ? 'text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl -z-10 bg-indigo-50/80 dark:bg-indigo-900/30 transition-colors duration-500"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ----- TAB CONTENT ----- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="mt-6"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-xs border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center justify-center gap-4 text-gray-400 dark:text-gray-600 transition-colors duration-500"
        >
          <span>Tenant Details · View Model</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-500" />
          <span>SaaS Dashboard</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-500" />
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-emerald-500 dark:text-emerald-400"
          >
            ● Live
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default TenantDetailsViewModel;