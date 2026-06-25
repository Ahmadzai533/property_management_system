import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
} from "lucide-react";

const Sidebar = ({ 
  sidebarOpen, 
  toggleSidebar, 
  closeSidebar,
  isCollapsed,
  setIsCollapsed 
}) => {
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
  
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);
  const subMenuTimeoutRef = useRef(null);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        window.innerWidth < 1024 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, closeSidebar]);

  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen, closeSidebar]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      if (subMenuTimeoutRef.current) {
        clearTimeout(subMenuTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [{ to: "/", icon: LayoutDashboard, label: "Dashboard" }];

  const mainMenuItems = [
    {
      id: "properties",
      icon: Building2,
      label: "Properties",
      items: [
        { to: "/properties/listed", label: "All Property" },
        { to: "/properties/portfolio", label: "All Unit" },
        { to: "/properties/units", label: "Own Property" },
        { to: "/properties/units", label: "Lease Property" },
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
      // isLink: true,
      items: [
        { to: "/tenants", label: "All tenants" },
        { to: "/tenants/roles", label: "tenants History" },
      
      ],
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
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
      isActive
        ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
        : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
    } ${isCollapsed ? "justify-center" : ""}`;

  // Tooltip component - Gray background
  const Tooltip = ({ label, position }) => {
    if (!label || !isCollapsed) return null;
    // Don't show tooltip for items with sub-menus
    const hasSubMenu = [...mainMenuItems, ...managementItems, ...communicationItems].some(
      m => m.label === label && m.items
    );
    if (hasSubMenu) return null;
    
    return (
      <div
        className="fixed z-50 px-3 py-2 bg-gray-200 text-slate-800 text-sm font-medium rounded-lg shadow-lg pointer-events-none whitespace-nowrap transition-opacity duration-200"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translateY(-50%)',
          opacity: hoveredItem === label ? 1 : 0,
        }}
      >
        {label}
      </div>
    );
  };

  // Handle icon click to expand sidebar
  const handleItemClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    closeSidebar();
  };

  // Get tooltip position - right next to icon
  const getTooltipPosition = (e, label) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 4,
      y: rect.top + rect.height / 2,
    });
    setHoveredItem(label);
  };

  // Handle mouse leave - hide tooltip with delay
  const handleMouseLeave = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setHoveredParent(null);
    }, 150);
  };

  // Handle mouse enter - clear timeout and show tooltip
  const handleMouseEnter = (e, label, hasSubMenu = false) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    if (isCollapsed) {
      getTooltipPosition(e, label);
      if (hasSubMenu) {
        setHoveredParent(label);
      }
    }
  };

  // Render sub-menu items in a popup beside the icon
  const renderSubMenuPopup = (items, parentLabel, position) => {
    if (!isCollapsed) return null;
    if (hoveredParent !== parentLabel) return null;
    if (!items || items.length === 0) return null;
    
    return (
      <div
        className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl py-1 min-w-[180px] max-w-[220px]"
        style={{
          left: position.x + 12,
          top: position.y - ((items.length * 36) / 2) + 10,
        }}
        onMouseEnter={() => {
          if (subMenuTimeoutRef.current) {
            clearTimeout(subMenuTimeoutRef.current);
          }
          if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
          }
          setHoveredParent(parentLabel);
        }}
        onMouseLeave={() => {
          subMenuTimeoutRef.current = setTimeout(() => {
            setHoveredParent(null);
            setHoveredItem(null);
          }, 150);
        }}
      >
        {items.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 text-sm ${
                isActive
                  ? "bg-gray-200 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
              } transition-colors duration-200 border-b border-slate-100 last:border-0`
            }
            onClick={() => {
              closeSidebar();
              setHoveredParent(null);
              setHoveredItem(null);
              if (isCollapsed) {
                setIsCollapsed(false);
              }
            }}
          >
            <span className="text-[10px] text-slate-400">└</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    );
  };

  // Check if menu has sub-items
  const hasSubItems = (menu) => {
    return menu.items && menu.items.length > 0;
  };

  return (
    <>
      {/* Overlay - only visible on mobile when sidebar is open */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          h-screen bg-white border-r border-slate-200 
          flex flex-col flex-shrink-0
          transition-all duration-500 ease-in-out
          fixed lg:relative
          top-0 left-0
          z-50
          shadow-lg lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className={`p-4 border-b border-slate-200 flex-shrink-0 flex items-center transition-all duration-500 ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}>
          <div className={`flex items-center gap-2.5 transition-all duration-500 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <Home className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="transition-all duration-500">
                <h1 className="text-lg font-bold text-slate-900">PropDaller</h1>
                <p className="text-[10px] text-slate-500">Management System</p>
              </div>
            )}
          </div>

          {/* Close button - mobile only */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-lg hover:bg-slate-100 transition"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {/* Dashboard */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                  isActive
                    ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                } ${isCollapsed ? "justify-center" : ""}`
              }
              onClick={handleItemClick}
              onMouseEnter={(e) => handleMouseEnter(e, item.label, false)}
              onMouseLeave={handleMouseLeave}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          ))}

          {/* Main Menu */}
          <div className="mt-5 space-y-1">
            {mainMenuItems.map((menu) => (
              <div key={menu.id}>
                {menu.isLink ? (
                  <NavLink
                    to={menu.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                        isActive
                          ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                          : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                      } ${isCollapsed ? "justify-center" : ""}`
                    }
                    onClick={handleItemClick}
                    onMouseEnter={(e) => handleMouseEnter(e, menu.label, false)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <menu.icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{menu.label}</span>
                    )}
                  </NavLink>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        if (isCollapsed) {
                          setIsCollapsed(false);
                        } else {
                          toggleMenu(menu.id);
                        }
                      }}
                      className={`w-full flex items-center ${
                        isCollapsed ? "justify-center" : "justify-between"
                      } px-3 py-2 rounded-lg text-sm ${
                        openMenus[menu.id] ? "bg-gray-200" : ""
                      } text-slate-600 hover:bg-gray-100 transition-all duration-300 relative group`}
                      onMouseEnter={(e) => handleMouseEnter(e, menu.label, true)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={`flex items-center gap-3`}>
                        <menu.icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="truncate">{menu.label}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className="flex-shrink-0">
                          {openMenus[menu.id] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Sub-menu popup for collapsed mode */}
                    {isCollapsed && hasSubItems(menu) && (
                      renderSubMenuPopup(menu.items, menu.label, tooltipPosition)
                    )}

                    {openMenus[menu.id] && !isCollapsed && (
                      <div className="ml-2">
                        {menu.items.map((item, i) => (
                          <TreeLines
                            key={item.to}
                            isLast={i === menu.items.length - 1}
                          >
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                                  isActive
                                    ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                                    : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                                }`
                              }
                              onClick={handleItemClick}
                            >
                              <span className="text-[10px] text-slate-400">└</span>
                              {item.label}
                            </NavLink>
                          </TreeLines>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Management & Operations */}
          <div className="mt-5 space-y-1">
            {managementItems.map((menu) => (
              <div key={menu.id}>
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      setIsCollapsed(false);
                    } else {
                      toggleMenu(menu.id);
                    }
                  }}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center" : "justify-between"
                  } px-3 py-2 rounded-lg text-sm ${
                    openMenus[menu.id] ? "bg-gray-200" : ""
                  } text-slate-600 hover:bg-gray-100 transition-all duration-300 relative group`}
                  onMouseEnter={(e) => handleMouseEnter(e, menu.label, true)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`flex items-center gap-3`}>
                    <menu.icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{menu.label}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex-shrink-0">
                      {openMenus[menu.id] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </button>

                {isCollapsed && hasSubItems(menu) && (
                  renderSubMenuPopup(menu.items, menu.label, tooltipPosition)
                )}

                {openMenus[menu.id] && !isCollapsed && (
                  <div className="ml-2">
                    {menu.items.map((item, i) => (
                      <TreeLines
                        key={item.to}
                        isLast={i === menu.items.length - 1}
                      >
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                              isActive
                                ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                                : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                            }`
                          }
                          onClick={handleItemClick}
                        >
                          <span className="text-[10px] text-slate-400">└</span>
                          {item.label}
                        </NavLink>
                      </TreeLines>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Communication & Intel */}
          <div className="mt-5 space-y-1">
            {communicationItems.map((menu) => (
              <div key={menu.id}>
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      setIsCollapsed(false);
                    } else {
                      toggleMenu(menu.id);
                    }
                  }}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center" : "justify-between"
                  } px-3 py-2 rounded-lg text-sm ${
                    openMenus[menu.id] ? "bg-gray-200" : ""
                  } text-slate-600 hover:bg-gray-100 transition-all duration-300 relative group`}
                  onMouseEnter={(e) => handleMouseEnter(e, menu.label, true)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`flex items-center gap-3`}>
                    <menu.icon className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{menu.label}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex-shrink-0">
                      {openMenus[menu.id] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </button>

                {isCollapsed && hasSubItems(menu) && (
                  renderSubMenuPopup(menu.items, menu.label, tooltipPosition)
                )}

                {openMenus[menu.id] && !isCollapsed && (
                  <div className="ml-2">
                    {menu.items.map((item, i) => (
                      <TreeLines
                        key={item.to}
                        isLast={i === menu.items.length - 1}
                      >
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                              isActive
                                ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                                : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                            }`
                          }
                          onClick={handleItemClick}
                        >
                          <span className="text-[10px] text-slate-400">└</span>
                          {item.label}
                        </NavLink>
                      </TreeLines>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Security & Admin - FIXED: No text, only icon */}
          <div className="mt-5 space-y-1">
            <div>
              <button
                onClick={() => {
                  if (isCollapsed) {
                    setIsCollapsed(false);
                  } else {
                    toggleMenu("admin");
                  }
                }}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center" : "justify-between"
                } px-3 py-2 rounded-lg text-sm ${
                  openMenus.admin ? "bg-gray-200" : ""
                } text-slate-600 hover:bg-gray-100 transition-all duration-300 relative group`}
                onMouseEnter={(e) => handleMouseEnter(e, "Admin", true)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`flex items-center ${isCollapsed ? "" : "gap-3"}`}>
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  {/* Text COMPLETELY REMOVED when collapsed - only show when expanded */}
                  {!isCollapsed && (
                    <span className="truncate">Admin</span>
                  )}
                </div>
                {/* Chevron ONLY shows when expanded */}
                {!isCollapsed && (
                  <div className="flex-shrink-0">
                    {openMenus.admin ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Sub-menu popup for collapsed mode */}
              {isCollapsed && hoveredParent === "Admin" && (
                renderSubMenuPopup(
                  [
                    { to: "/admin/team", label: "Admin Team" },
                    { to: "/admin/permissions", label: "Permissions" },
                    { to: "/admin/audit", label: "Audit Logs" },
                  ],
                  "Admin",
                  tooltipPosition
                )
              )}

              {openMenus.admin && !isCollapsed && (
                <div className="ml-2">
                  {[
                    { to: "/admin/team", label: "Admin Team" },
                    { to: "/admin/permissions", label: "Permissions" },
                    { to: "/admin/audit", label: "Audit Logs" },
                  ].map((item, i) => (
                    <TreeLines key={item.to} isLast={i === 2}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                            isActive
                              ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                              : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                          }`
                        }
                        onClick={handleItemClick}
                      >
                        <span className="text-[10px] text-slate-400">└</span>
                        {item.label}
                      </NavLink>
                    </TreeLines>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Items */}
          <div className="mt-5 border-t border-slate-200 pt-4 space-y-1">
            {bottomItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm relative ${
                    isActive
                      ? "bg-gray-200 text-indigo-700 font-semibold shadow-sm"
                      : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                  } ${isCollapsed ? "justify-center" : ""}`
                }
                onClick={handleItemClick}
                onMouseEnter={(e) => handleMouseEnter(e, item.label, false)}
                onMouseLeave={handleMouseLeave}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-slate-200 flex items-center gap-3 flex-shrink-0 transition-all duration-500 ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
            AS
          </div>
          {!isCollapsed && (
            <div className="flex items-center gap-3 flex-1 min-w-0 transition-all duration-500">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  Alex Sterling
                </p>
                <p className="text-xs text-slate-500 truncate">Senior Manager</p>
              </div>
              <button 
                className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tooltip - Only for items without sub-menus */}
        <Tooltip label={hoveredItem} position={tooltipPosition} />
      </aside>
    </>
  );
};

export default Sidebar;