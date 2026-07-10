import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
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
import { useLocalization } from "../../hooks/useLocalization";

const Sidebar = ({
  sidebarOpen,
  closeSidebar,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { dir, t } = useLocalization();
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialOpenMenus = () => {
    return {
      properties: location.pathname.startsWith("/properties"),
      users: location.pathname.startsWith("/users"),
      tenants: location.pathname === "/tenants" || location.pathname.startsWith("/tenants/"),
      maintainers: location.pathname.startsWith("/maintainers"),
      finance: location.pathname.startsWith("/finance"),
      agreements: location.pathname.startsWith("/agreements"),
      bookings: location.pathname.startsWith("/bookings"),
      feedback: location.pathname.startsWith("/feedback"),
      notices: location.pathname.startsWith("/notices"),
      reports: location.pathname.startsWith("/reports"),
      admin: location.pathname.startsWith("/admin"),
    };
  };

  const [openMenus, setOpenMenus] = useState(getInitialOpenMenus);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef(null);
  const popupRef = useRef(null);
  const tooltipAllowedItems = [t("nav.settings"), t("nav.help")];

  const [isLarge, setIsLarge] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );
//  const navigate=useNavigate();
  useEffect(() => {
    const onResize = () => setIsLarge(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeClass =
    "bg-blue-100 text-blue-700 font-semibold shadow-sm border border-blue-200 dark:bg-slate-800 dark:text-white dark:border-slate-700";
  const inactiveClass =
    "text-slate-600 hover:bg-gray-100 hover:text-slate-900 dark:text-white dark:hover:bg-slate-800 dark:hover:text-white";

  const isMenuActive = (menu) => {
    // For direct navigation items (with 'to' property)
    if (menu.to) {
      return location.pathname === menu.to;
    }
    // For dropdown items
    if (!menu.items) return false;
    if (menu.basePath && location.pathname === menu.basePath) return true;
    return menu.items.some((item) => {
      if (item.to === menu.basePath) {
        return location.pathname === item.to;
      }
      return location.pathname.startsWith(item.to);
    });
  };

  const pointerMenuDownRef = useRef(false);

  const closeAllMenus = (prev) => {
    return Object.keys(prev).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
  };

  const toggleParentMenu = (menuId, menu) => {
    // Check if this is a direct navigation item (has 'to' and no items)
    if (menu?.to && (!menu.items || menu.items.length === 0)) {
      // Direct navigation - close all menus and navigate
      setOpenMenus((prev) => closeAllMenus(prev));
      navigate(menu.to);
      closeSidebar();
      return;
    }

    // If it has items, it's a dropdown
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenMenus((prev) => {
        const next = closeAllMenus(prev);
        next[menuId] = true;
        return next;
      });
    } else {
      if (menu?.basePath && (!menu.items || menu.items.length === 0)) {
        navigate(menu.basePath);
        setOpenMenus((prev) => closeAllMenus(prev));
      } else {
        setOpenMenus((prev) => {
          const isOpen = Boolean(prev[menuId]);
          const next = closeAllMenus(prev);
          if (!isOpen) {
            next[menuId] = true;
          }
          return next;
        });
      }
    }
    setHoveredItem(null);
    setHoveredParent(null);
  };

  const handleParentMenuPointerDown = (menuId, menu, event) => {
    event.preventDefault();
    pointerMenuDownRef.current = true;
    toggleParentMenu(menuId, menu);
  };

  const handleParentMenuClick = (menuId, menu, event) => {
    if (event) event.preventDefault();
    if (pointerMenuDownRef.current) {
      pointerMenuDownRef.current = false;
      return;
    }
    toggleParentMenu(menuId, menu);
  };

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
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen, closeSidebar]);

  useEffect(() => {
    setOpenMenus(getInitialOpenMenus());
  }, [location.pathname]);

  const navItems = [{ to: "/", icon: LayoutDashboard, label: t("nav.dashboard") }];

  const mainMenuItems = [
    {
      id: "properties",
      basePath: "/properties",
      icon: Building2,
      label: t("nav.properties"),
      items: [
        { to: "/properties/listed", label: t("properties.allProperty") },
        { to: "/properties/own", label: t("properties.ownProperties") },
        { to: "/properties/lease", label: t("properties.leaseProperty") },
        { to: "/properties/units", label: t("properties.allUnits") },
      ],
    },
    {
      id: "users",
      basePath: "/users",
      icon: UserCog,
      label: t("nav.usersAndRoles"),
      items: [
        { to: "/users-roles/users", label: t("users.usersList") },
        { to: "/users-roles/roles", label: t("users.rolesPermissions") },
        { to: "/users-roles/logs", label: t("users.loggedHistory") },
      ],
    },
    {
      id: "tenants",
      basePath: "/tenants",
      icon: Users,
      label: t("nav.tenants"),
      items: [
        { to: "/tenants/list", label: t("tenants.allTenants") },
        { to: "/tenants/history", label: t("tenants.tenantsHistory") },
      ],
    },
    {
      id: "maintainers",
      icon: Wrench,
      label: t("nav.maintainers"),
      items: [
        { to: "/maintainers/specialties", label: t("maintainers.specialtyTypes") },
        { to: "/maintainers/tickets", label: t("maintainers.repairTickets") },
        { to: "/maintainers/contractors", label: t("maintainers.allContractors") },
      ],
    },
  ];

  const managementItems = [
    {
      id: "settings",
      icon: Settings,
      label: t("nav.settings"),
      items: [{ to: "/settings", label: t("settings.settingsHub") }],
    },
    {
      id: "finance",
      icon: DollarSign,
      label: t("nav.finance"),
      items: [
        { to: "/finance/payments", label: t("finance.paymentsInvoices") },
        { to: "/finance/ledger", label: t("finance.rentRollLedger") },
        { to: "/finance/transactions", label: t("finance.transactionHistory") },
        { to: "/finance/expenses", label: t("finance.expenses") },
      ],
    },

    {
      id: "bookings",
      icon: Calendar,
      label: t("nav.bookings"),
      items: [
        { to: "/bookings/list", label: t("bookings.bookingList") },
        { to: "/bookings/create", label: t("bookings.createBooking") },
        { to: "/bookings/calendar", label: t("bookings.bookingCalendar") },
        { to: "/bookings/details", label: t("bookings.bookingDetails") },
      ],
    },
  ];
  
  const agreeItem = [
    {
      id: "agreements",
      to: "/agreements",
      icon: FileCheck,
      label: t("nav.agreements"),
    },
  ];

  const communicationItems = [
    {
      id: "feedback",
      icon: MessageSquare,
      label: t("nav.feedback"),
      items: [
        { to: "/feedback/surveys", label: t("feedback.tenantSurveys") },
        { to: "/feedback/issues", label: t("feedback.issueReports") },
      ],
    },

    {
      id: "notice",
      icon: Bell,
      label: t("nav.notices"),
      items: [
        { to: "/notices/announcements", label: t("notices.announcements") },
        { to: "/notices/logs", label: t("notices.tenantNoticeLogs") },
      ],
    },
    {
      id: "reports",
      icon: BarChart3,
      label: t("nav.reports"),
      items: [
        { to: "/reports/hub", label: t("reports.reportsHub") },
        { to: "/reports/payments", label: t("reports.paymentReports") },
        { to: "/reports/invoices", label: t("reports.invoiceReports") },
        { to: "/reports/financial", label: t("reports.financialReports") },
      ],
    },
  ];

  const bottomItems = [
    { to: "/settings", icon: Settings, label: t("nav.settings") },
    { to: "/help", icon: HelpCircle, label: t("nav.help") },
  ];

  const TreeLines = ({ isLast, children }) => (
    <div className={`relative ${dir === "rtl" ? "pr-7" : "pl-7"} py-0.5`}>
      <div
        className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-0 w-[1px] bg-slate-300/70 ${isLast ? "h-3" : "h-full"}`}
      />
      <div
        className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-3.5 w-4 h-2.5 ${dir === "rtl" ? "border-r border-b" : "border-l border-b"} border-slate-300/70 ${dir === "rtl" ? "rounded-br-[6px]" : "rounded-bl-[6px]"}`}
      />
      {children}
    </div>
  );

  const getNavLinkClass = (to) => ({ isActive }) => {
    // Use exact matching for routes that have child routes
    const isExactActive = location.pathname === to;
    // For routes like /tenants/history, use startsWith but only if it's not the parent
    const isChildActive = to !== '/tenants' && location.pathname.startsWith(`${to}/`);
    const active = isExactActive || isChildActive;
    
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ease-in-out text-sm relative ${
      active ? activeClass : inactiveClass
    } ${isCollapsed && isLarge ? "justify-center px-0 w-10 h-10 mx-auto" : ""}`;
  };

  const Tooltip = ({ label, position }) => {
    if (!label || !isCollapsed) return null;
    return (
      <div
        className="fixed z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-lg pointer-events-none whitespace-nowrap bg-slate-900/95 text-white"
        style={{
          [dir === "rtl" ? "right" : "left"]: position.x,
          top: position.y,
          transform: "translateY(-50%)",
        }}
      >
        {label}
      </div>
    );
  };

  const handleMouseEnter = (e, label, hasSubMenu = false) => {
    if (!isCollapsed) return;

    const rect = e.currentTarget.getBoundingClientRect();

    setTooltipPosition({
      x: dir === "rtl" ? rect.left - 4 : rect.right + 4,
      y: rect.top + rect.height / 2,
    });

    // ONLY show tooltip for allowed items
    if (!hasSubMenu && tooltipAllowedItems.includes(label)) {
      setHoveredItem(label);
    } else {
      setHoveredItem(null);
    }

    if (hasSubMenu) {
      setHoveredParent(label);
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoveredParent(null);
  };

  const renderSubMenuPopup = (items, parentLabel, position) => {
    if (
      !isCollapsed ||
      hoveredParent !== parentLabel ||
      !items ||
      items.length === 0
    )
      return null;
    return (
      <div
        ref={popupRef}
        className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl py-1 min-w-[180px] max-w-[220px] dark:bg-slate-950 dark:border-slate-700"
        style={{
          [dir === "rtl" ? "right" : "left"]: position.x + 12,
          top: position.y - (items.length * 36) / 2 + 10,
        }}
        onMouseEnter={() => setHoveredParent(parentLabel)}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => {
              const active = location.pathname === item.to;
              return `flex items-center gap-2 px-4 py-2.5 text-sm ${active ? activeClass : "text-slate-600 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800"} transition-colors duration-200`;
            }}
            onClick={() => {
              closeSidebar();
              handleMouseLeave();
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    );
  };

  const getParentActiveClass = (menu) => {
    // For direct navigation items (with 'to' property)
    if (menu.to && !menu.items) {
      const isActive = location.pathname === menu.to;
      return isActive ? activeClass : inactiveClass;
    }
    // For dropdown items with basePath
    if (menu.basePath && location.pathname === menu.basePath) {
      return activeClass;
    }
    // For dropdown items with child routes
    if (menu.items && menu.items.length > 0) {
      // Check if any child route is active (excluding the base path itself)
      const isActive = menu.items.some(item => {
        if (item.to === menu.basePath) {
          return location.pathname === item.to;
        }
        return location.pathname.startsWith(item.to);
      });
      return isActive ? activeClass : inactiveClass;
    }
    return isMenuActive(menu) ? activeClass : inactiveClass;
  };

  // Check if menu has items (dropdown) or is direct navigation
  const hasSubItems = (menu) => menu.items && menu.items.length > 0;

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      <AnimatePresence>
        {sidebarOpen && !isLarge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black z-30 top-[64px]"
          />
        )}
      </AnimatePresence>

      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{
          width: isLarge ? (isCollapsed ? 64 : 256) : 256,
          x: isLarge ? 0 : sidebarOpen ? 0 : dir === "rtl" ? "100%" : "-100%",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        className={`bg-white ${dir === "rtl" ? "border-l" : "border-r"} border-slate-200 dark:bg-slate-950 dark:border-slate-800 flex flex-col flex-shrink-0 fixed top-[64px] ${dir === "rtl" ? "right-0" : "left-0"} z-40 h-[calc(100vh-64px)] shadow-xl lg:shadow-none`}
        dir={dir}
      >
        <nav className="flex-1 p-3 overflow-y-auto pt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={getNavLinkClass(item.to)}
              onClick={closeSidebar}
              onMouseEnter={(e) => handleMouseEnter(e, item.label, false)}
              onMouseLeave={handleMouseLeave}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span
                className={`inline-block truncate transition-opacity duration-200 ${isCollapsed && isLarge ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
              >
                {item.label}
              </span>
            </NavLink>
          ))}

          {/* Map blocks */}
          {[mainMenuItems, managementItems, communicationItems].map(
            (menuGroup, index) => (
              <div className="mt-5 space-y-1" key={index}>
                {menuGroup.map((menu) => {
                  const hasItems = hasSubItems(menu);
                  
                  // If it's a direct navigation item (no items, has 'to')
                  if (!hasItems && menu.to) {
                    return (
                      <NavLink
                        key={menu.id}
                        to={menu.to}
                        className={({ isActive }) => {
                          const active = location.pathname === menu.to;
                          return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ease-in-out relative ${
                            active ? activeClass : inactiveClass
                          } ${isCollapsed && isLarge ? "justify-center px-0 w-10 h-10 mx-auto" : ""}`;
                        }}
                        onClick={closeSidebar}
                        onMouseEnter={(e) => handleMouseEnter(e, menu.label, false)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className={`flex items-center ${isCollapsed && isLarge ? "justify-center" : "gap-3"}`}>
                          <menu.icon className="w-4 h-4 flex-shrink-0" />
                          <span
                            className={`inline-block truncate transition-opacity duration-200 ${isCollapsed && isLarge ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                          >
                            {menu.label}
                          </span>
                        </div>
                      </NavLink>
                    );
                  }

                  // Otherwise it's a dropdown with items
                  return (
                    <div key={menu.id}>
                      <button
                        type="button"
                        onPointerDown={(e) =>
                          handleParentMenuPointerDown(menu.id, menu, e)
                        }
                        onClick={(e) => handleParentMenuClick(menu.id, menu, e)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 relative group ${getParentActiveClass(menu)} ${
                          isCollapsed && isLarge
                            ? "justify-center px-0 w-10 h-10 mx-auto"
                            : "justify-between"
                        }`}
                        onMouseEnter={(e) =>
                          handleMouseEnter(e, menu.label, true)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className={`flex items-center ${isCollapsed && isLarge ? "justify-center" : "gap-3"}`}
                        >
                          <menu.icon className="w-4 h-4 flex-shrink-0" />
                          <span
                            className={`inline-block truncate transition-opacity duration-200 ${isCollapsed && isLarge ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                          >
                            {menu.label}
                          </span>
                        </div>
                        {(!isCollapsed || !isLarge) && (
                          <div className="flex-shrink-0">
                            {openMenus[menu.id] ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </button>

                      {isCollapsed &&
                        isLarge &&
                        renderSubMenuPopup(
                          menu.items,
                          menu.label,
                          tooltipPosition,
                        )}

                      <AnimatePresence initial={false}>
                        {openMenus[menu.id] && (!isCollapsed || !isLarge) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="ml-2 overflow-hidden"
                          >
                            {menu.items?.map((item, i) => (
                              <TreeLines
                                key={item.to}
                                isLast={i === menu.items.length - 1}
                              >
                                <NavLink
                                  to={item.to}
                                  className={getNavLinkClass(item.to)}
                                  onClick={closeSidebar}
                                >
                                  {item.label}
                                </NavLink>
                              </TreeLines>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ),
          )}

          <div className="mt-5 border-t border-slate-200 dark:border-slate-800 pt-4 space-y-1">
            {agreeItem.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavLinkClass(item.to)}
                onClick={closeSidebar}
                onMouseEnter={(e) => handleMouseEnter(e, item.label, false)}
                onMouseLeave={handleMouseLeave}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span
                  className={`inline-block truncate transition-opacity duration-200 ${isCollapsed && isLarge ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Admin */}
          <div className="mt-5 space-y-1">
            <div>
              <button
                type="button"
                onPointerDown={(e) =>
                  handleParentMenuPointerDown("admin", { id: "admin", items: [] }, e)
                }
                onClick={(e) =>
                  handleParentMenuClick("admin", { id: "admin", items: [] }, e)
                }
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 relative group ${openMenus.admin ? activeClass : inactiveClass} ${
                  isCollapsed && isLarge
                    ? "justify-center px-0 w-10 h-10 mx-auto"
                    : "justify-between"
                }`}
                onMouseEnter={(e) => handleMouseEnter(e, t("nav.admin"), true)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`flex items-center ${isCollapsed && isLarge ? "justify-center" : "gap-3"}`}
                >
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span
                    className={`inline-block truncate transition-opacity duration-200 ${isCollapsed && isLarge ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                  >
                    {t("nav.admin")}
                  </span>
                </div>
                {(!isCollapsed || !isLarge) && (
                  <div className="flex-shrink-0">
                    {openMenus.admin ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>

              {isCollapsed &&
                isLarge &&
                renderSubMenuPopup(
                  [
                    { to: "/admin/team", label: t("admin.adminTeam") },
                    { to: "/admin/permissions", label: t("admin.permissions") },
                    { to: "/admin/audit", label: t("admin.auditLogs") },
                  ],
                  t("nav.admin"),
                  tooltipPosition,
                )}

              <AnimatePresence initial={false}>
                {openMenus.admin && (!isCollapsed || !isLarge) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`${dir === "rtl" ? "mr-2" : "ml-2"} overflow-hidden`}
                  >
                    {[
                      { to: "/admin/team", label: t("admin.adminTeam") },
                      { to: "/admin/permissions", label: t("admin.permissions") },
                      { to: "/admin/audit", label: t("admin.auditLogs") },
                    ].map((item, i) => (
                      <TreeLines key={item.to} isLast={i === 2}>
                        <NavLink
                          to={item.to}
                          className={getNavLinkClass(item.to)}
                          onClick={closeSidebar}
                        >
                          {item.label}
                        </NavLink>
                      </TreeLines>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom items */}
          <div className="mt-5 border-t border-slate-200 dark:border-slate-800 pt-4 space-y-1">
            {bottomItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavLinkClass(item.to)}
                onClick={closeSidebar}
                onMouseEnter={(e) => handleMouseEnter(e, item.label, false)}
                onMouseLeave={handleMouseLeave}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span
                  className={`inline-block truncate transition-opacity duration-200 ${isCollapsed && isLarge ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer Block */}
        <div onClick={()=>navigate('/owner/profile')}
          className={` cursor-pointer p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3 flex-shrink-0 transition-all duration-200 ${isCollapsed && isLarge ? "justify-center" : ""}`}
        >
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
            AS
          </div>
          {(!isCollapsed || !isLarge) && (
            <div className="flex items-center gap-3 flex-1 min-w-0 transition-all duration-200">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  Alex Sterling
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {t("common.seniorManager")}
                </p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400 hover:text-slate-600">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <Tooltip label={hoveredItem} position={tooltipPosition} />
      </motion.aside>
    </>
  );
};

export default Sidebar;