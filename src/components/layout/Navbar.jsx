import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = ({ onToggleSidebar, isCollapsed, onToggleCollapse }) => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    setIsDark(storedTheme ? storedTheme === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-xl dark:bg-slate-950/90 dark:border-slate-800 dark:text-slate-100 border-b border-slate-200/60 sticky top-0 z-50 w-full h-[64px] px-3 sm:px-4 md:px-6 flex items-center flex-shrink-0"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white">
              <span className="text-xs font-bold">PD</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 hidden sm:block">
              PropDaller
            </span>
          </NavLink>

          {/* Unified Controller Button */}
    <button
  onClick={(e) => {
    e.stopPropagation(); // Prevents the layout or document from registering this click
    if (window.innerWidth >= 1024) {
      onToggleCollapse();
    } else {
      onToggleSidebar();
    }
  }}
  className="p-2   md:ml-28   rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition flex-shrink-0 relative z-50"
  aria-label="Toggle Sidebar"
>
  {/* On Desktop (lg and up): Toggle between Left and Right based on collapse state */}
  <div className="hidden lg:block  ">
    {isCollapsed ? (
      <PanelRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
    ) : (
      <PanelLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
    )}
  </div>

  {/* On Mobile/Tablet (below lg): Always show the mobile menu toggle icon */}
  <div className="block lg:hidden">
    <PanelRight className="w-5 h-5 text-slate-600 dark:text-slate-300  " />
  </div>
</button>
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md hidden xs:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 transition"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition dark:bg-slate-800 dark:border-slate-700"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 relative transition dark:bg-slate-800 dark:border-slate-700">
            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold dark:text-slate-100">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 dark:bg-slate-950 dark:border-slate-800"
              >
                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-semibold text-sm dark:text-slate-100">John Doe</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">john.doe@example.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 transition dark:hover:bg-slate-800 dark:text-slate-100">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-red-600 transition dark:hover:bg-slate-800 dark:text-slate-100">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;