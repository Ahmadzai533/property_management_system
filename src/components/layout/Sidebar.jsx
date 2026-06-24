import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  Wrench,
  ChevronRight,
  ChevronDown,
  UserCog,
  DollarSign,
  FileCheck,
  Calendar,
  MessageSquare,
  Bell,
  BarChart3,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    properties: true,
    users: false,
    maintainers: false,
    finance: false,
    agreements: false,
    bookings: false,
    feedback: false,
    notices: false,
    reports: false,
    admin: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const navItems = [{ to: "/", icon: LayoutDashboard, label: "Dashboard" }];

  const mainMenuItems = [
    {
      id: "properties",
      icon: Building2,
      label: "Properties",
      items: [
        { to: "/properties/listed", label: "Listed Properties" },
        { to: "/properties/portfolio", label: "Buildings Portfolio" },
        { to: "/properties/units", label: "Single Units" },
      ],
    },
    {
      id: "users",
      icon: UserCog,
      label: "Users & Roles",
      items: [
        { to: "/users/list", label: "Users List" },
        { to: "/users/roles", label: "Roles & Permissions" },
        { to: "/users/history", label: "Logged History" },
      ],
    },
    {
      id: "tenants",
      icon: Users,
      label: "Tenants",
      isLink: true,
      to: "/tenants",
    },
    {
      id: "maintainers",
      icon: Wrench,
      label: "Maintainers",
      items: [
        { to: "/maintainers/specialties", label: "Specialty Types" },
        { to: "/maintainers/tickets", label: "Repair Tickets" },
        { to: "/maintainers/contractors", label: "All Contractors" },
      ],
    },
  ];

  const managementItems = [
    {
      id: "finance",
      icon: DollarSign,
      label: "Finance",
      items: [
        { to: "/finance/payments", label: "Payments & Invoices" },
        { to: "/finance/rent-roll", label: "Rent Roll Ledger" },
        { to: "/finance/transactions", label: "Transaction History" },
      ],
    },
    {
      id: "agreements",
      icon: FileCheck,
      label: "Agreements",
      items: [
        { to: "/agreements/leases", label: "Active Leases" },
        { to: "/agreements/contracts", label: "Digital Contracts" },
      ],
    },
    {
      id: "bookings",
      icon: Calendar,
      label: "Bookings",
      items: [
        { to: "/bookings/guest", label: "Guest Bookings" },
        { to: "/bookings/reservations", label: "Direct Reservations" },
        { to: "/bookings/scheduler", label: "Calendar Scheduler" },
      ],
    },
  ];

  const communicationItems = [
    {
      id: "feedback",
      icon: MessageSquare,
      label: "Feedback",
      items: [
        { to: "/feedback/surveys", label: "Tenant Surveys" },
        { to: "/feedback/issues", label: "Issue Reports" },
      ],
    },
    {
      id: "notices",
      icon: Bell,
      label: "Notices",
      items: [
        { to: "/notices/announcements", label: "Announcements" },
        { to: "/notices/logs", label: "Tenant Notice Logs" },
      ],
    },
    {
      id: "reports",
      icon: BarChart3,
      label: "Reports",
      items: [
        { to: "/reports/financial", label: "Financial Statements" },
        { to: "/reports/occupancy", label: "Occupancy Analytics" },
      ],
    },
  ];

  const bottomItems = [
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/help", icon: HelpCircle, label: "Help & Support" },
  ];

  const TreeLines = ({ isLast, children }) => (
    <div className="relative pl-7 py-0.5">
      <div
        className={`absolute left-3 top-0 w-[1px] bg-slate-300/70 ${
          isLast ? "h-3" : "h-full"
        }`}
      />
      <div className="absolute left-3 top-3.5 w-4 h-2.5 border-l border-b border-slate-300/70 rounded-bl-[6px]" />
      {children}
    </div>
  );

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
      isActive
        ? "bg-indigo-50 text-indigo-700 font-semibold shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <>
      {/* Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/20 z-40" />

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed lg:static w-64 h-screen bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm"
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">PropDaller</h1>
              <p className="text-[10px] text-slate-500">
                Management System
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {/* Dashboard */}
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              <item.icon className="w-4 h-4 text-slate-500" />
              {item.label}
            </NavLink>
          ))}

          {/* Sections */}
          {[
            mainMenuItems,
            managementItems,
            communicationItems,
          ].map((section, sIdx) => (
            <div key={sIdx} className="mt-5 space-y-1">
              {section.map((menu) => (
                <div key={menu.id}>
                  {menu.isLink ? (
                    <NavLink to={menu.to} className={linkClass}>
                      <menu.icon className="w-4 h-4 text-slate-500" />
                      {menu.label}
                    </NavLink>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleMenu(menu.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <menu.icon className="w-4 h-4 text-slate-500" />
                          {menu.label}
                        </div>
                        {openMenus[menu.id] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {openMenus[menu.id] && (
                        <div className="ml-2">
                          {menu.items.map((item, i) => (
                            <TreeLines
                              key={item.to}
                              isLast={i === menu.items.length - 1}
                            >
                              <NavLink to={item.to} className={linkClass}>
                                <span className="text-[10px] text-slate-400">
                                  └
                                </span>
                                {item.label}
                              </NavLink>
                            </TreeLines>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Bottom */}
          <div className="mt-6 border-t border-slate-200 pt-4 space-y-1">
            {bottomItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                <item.icon className="w-4 h-4 text-slate-500" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center">
            AS
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">
              Alex Sterling
            </p>
            <p className="text-xs text-slate-500">Senior Manager</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-500" />
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;