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

const Sidebar = ({
  sidebarOpen,
  closeSidebar,
  isCollapsed,
  setIsCollapsed,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialOpenMenus = () => {
    return {
      properties: location.pathname.startsWith("/properties"),
      users: location.pathname.startsWith("/users"),
      tenants: location.pathname.startsWith("/tenants"),
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

  const [isLarge, setIsLarge] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

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
    if (!menu.items) return false;
    if (menu.basePath && location.pathname === menu.basePath) return true;
    return menu.items.some((item) => location.pathname.startsWith(item.to));
  };

  const pointerMenuDownRef = useRef(false);

  const closeAllMenus = (prev) => {
    return Object.keys(prev).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
  };

  const toggleParentMenu = (menuId, menu) => {
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

  const navItems = [{ to: "/", icon: LayoutDashboard, label: "Dashboard" }];

  const mainMenuItems = [
    {
      id: "properties",
      basePath: "/properties",
      icon: Building2,
      label: "Properties",
      items: [
        { to: "/properties/listed", label: "All Property" },
        { to: "/properties/portfolio", label: "All Unit" },
        { to: "/properties/own-property", label: "Own Property" },
        { to: "/properties/lease-property", label: "Lease Property" },
      ],
    },
    {
      id: "users",
      basePath: "/users",
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
      basePath: "/tenants",
      icon: Users,
      label: "Tenants",
      items: [
        { to: "/tenants/list", label: "All tenants" },
        { to: "/tenants/roles", label: "Tenants History" },
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
      <div className={`absolute left-3 top-0 w-[1px] bg-slate-300/70 ${isLast ? "h-3" : "h-full"}`} />
      <div className="absolute left-3 top-3.5 w-4 h-2.5 border-l border-b border-slate-300/70 rounded-bl-[6px]" />
      {children}
    </div>
  );

  const getNavLinkClass = (to) => ({ isActive }) => {
    const active = location.pathname === to || location.pathname.startsWith(`${to}/`);
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ease-in-out text-sm relative ${
      active ? activeClass : inactiveClass
    } ${isCollapsed && isLarge ? "justify-center px-0 w-10 h-10 mx-auto" : ""}`;
  };

  const Tooltip = ({ label, position }) => {
    if (!label || !isCollapsed) return null;
    return (
      <div
        className="fixed z-50 px-3 py-2 text-sm font-medium rounded-lg shadow-lg pointer-events-none whitespace-nowrap bg-slate-900/95 text-white"
        style={{ left: position.x, top: position.y, transform: "translateY(-50%)" }}
      >
        {label}
      </div>
    );
  };

  const handleMouseEnter = (e, label, hasSubMenu = false) => {
    if (isCollapsed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({ x: rect.right + 4, y: rect.top + rect.height / 2 });
      setHoveredItem(label);
      if (hasSubMenu) setHoveredParent(label);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoveredParent(null);
  };

  const renderSubMenuPopup = (items, parentLabel, position) => {
    if (!isCollapsed || hoveredParent !== parentLabel || !items || items.length === 0) return null;
    return (
      <div
        ref={popupRef}
        className="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-xl py-1 min-w-[180px] max-w-[220px] dark:bg-slate-950 dark:border-slate-700"
        style={{ left: position.x + 12, top: position.y - (items.length * 36) / 2 + 10 }}
        onMouseEnter={() => setHoveredParent(parentLabel)}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 text-sm ${isActive ? activeClass : "text-slate-600 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800"} transition-colors duration-200`
            }
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
    if (menu.basePath && location.pathname === menu.basePath) return activeClass;
    if (menu.items && menu.items.length > 0) return openMenus[menu.id] ? activeClass : inactiveClass;
    return isMenuActive(menu) ? activeClass : inactiveClass;
  };

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
          x: isLarge ? 0 : sidebarOpen ? 0 : "-100%",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        className="bg-white border-r border-slate-200 dark:bg-slate-950 dark:border-slate-800 flex flex-col flex-shrink-0 fixed top-[64px] left-0 z-40 h-[calc(100vh-64px)] shadow-xl lg:shadow-none"
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
              <span className={`inline-block truncate transition-opacity duration-200 ${(isCollapsed && isLarge) ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                {item.label}
              </span>
            </NavLink>
          ))}

          {/* Map blocks */}
          {[mainMenuItems, managementItems, communicationItems].map((menuGroup, index) => (
            <div className="mt-5 space-y-1" key={index}>
              {menuGroup.map((menu) => (
                <div key={menu.id}>
                  <button
                    type="button"
                    onPointerDown={(e) => handleParentMenuPointerDown(menu.id, menu, e)}
                    onClick={(e) => handleParentMenuClick(menu.id, menu, e)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 relative group ${getParentActiveClass(menu)} ${
                      isCollapsed && isLarge ? "justify-center px-0 w-10 h-10 mx-auto" : "justify-between"
                    }`}
                    onMouseEnter={(e) => handleMouseEnter(e, menu.label, true)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`flex items-center ${isCollapsed && isLarge ? "justify-center" : "gap-3"}`}>
                      <menu.icon className="w-4 h-4 flex-shrink-0" />
                      <span className={`inline-block truncate transition-opacity duration-200 ${(isCollapsed && isLarge) ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                        {menu.label}
                      </span>
                    </div>
                    {(!isCollapsed || !isLarge) && (
                      <div className="flex-shrink-0">
                        {openMenus[menu.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    )}
                  </button>

                  {isCollapsed && isLarge && renderSubMenuPopup(menu.items, menu.label, tooltipPosition)}

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
                          <TreeLines key={item.to} isLast={i === menu.items.length - 1}>
                            <NavLink to={item.to} className={getNavLinkClass(item.to)} onClick={closeSidebar}>
                              {item.label}
                            </NavLink>
                          </TreeLines>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ))}

          {/* Admin */}
          <div className="mt-5 space-y-1">
            <div>
              <button
                type="button"
                onPointerDown={(e) => handleParentMenuPointerDown("admin", { id: "admin" }, e)}
                onClick={(e) => handleParentMenuClick("admin", { id: "admin" }, e)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 relative group ${openMenus.admin ? activeClass : inactiveClass} ${
                  isCollapsed && isLarge ? "justify-center px-0 w-10 h-10 mx-auto" : "justify-between"
                }`}
                onMouseEnter={(e) => handleMouseEnter(e, "Admin", true)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`flex items-center ${isCollapsed && isLarge ? "justify-center" : "gap-3"}`}>
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span className={`inline-block truncate transition-opacity duration-200 ${(isCollapsed && isLarge) ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                    Admin
                  </span>
                </div>
                {(!isCollapsed || !isLarge) && (
                  <div className="flex-shrink-0">
                    {openMenus.admin ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                )}
              </button>

              {isCollapsed && isLarge && renderSubMenuPopup([
                { to: "/admin/team", label: "Admin Team" },
                { to: "/admin/permissions", label: "Permissions" },
                { to: "/admin/audit", label: "Audit Logs" }
              ], "Admin", tooltipPosition)}

              <AnimatePresence initial={false}>
                {openMenus.admin && (!isCollapsed || !isLarge) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="ml-2 overflow-hidden"
                  >
                    {[
                      { to: "/admin/team", label: "Admin Team" },
                      { to: "/admin/permissions", label: "Permissions" },
                      { to: "/admin/audit", label: "Audit Logs" },
                    ].map((item, i) => (
                      <TreeLines key={item.to} isLast={i === 2}>
                        <NavLink to={item.to} className={getNavLinkClass(item.to)} onClick={closeSidebar}>
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
                <span className={`inline-block truncate transition-opacity duration-200 ${(isCollapsed && isLarge) ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer Block */}
        <div className={`p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3 flex-shrink-0 transition-all duration-200 ${(isCollapsed && isLarge) ? "justify-center" : ""}`}>
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
            AS
          </div>
          {(!isCollapsed || !isLarge) && (
            <div className="flex items-center gap-3 flex-1 min-w-0 transition-all duration-200">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Alex Sterling</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Senior Manager</p>
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