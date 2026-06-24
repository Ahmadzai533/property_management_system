import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Moon,
  Sun,
  Menu,
} from "lucide-react";

const Navbar = ({ onToggleSidebar }) => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        bg-white/80 backdrop-blur-xl 
        border-b border-slate-200/60 
        sticky top-0 z-40 
        px-3 sm:px-4 md:px-6 
        py-3 sm:py-4
        flex-shrink-0
      "
    >
      <div className="flex items-center justify-between gap-3">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          {/* MOBILE MENU BUTTON - Only visible on mobile/tablet */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-slate-100 transition lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* SEARCH */}
          <div className="relative w-full sm:w-64 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="
                w-full pl-9 pr-4 py-2 
                bg-slate-50 border border-slate-200 
                rounded-xl text-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                focus:border-indigo-500 
                transition
              "
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* DARK MODE */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="
              p-2 rounded-xl 
              bg-slate-50 border border-slate-200 
              hover:bg-slate-100 transition
            "
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* NOTIFICATIONS */}
          <button className="
            p-2 rounded-xl 
            bg-slate-50 border border-slate-200 
            hover:bg-slate-100 relative
            transition
          " aria-label="Notifications">
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="
              absolute -top-1 -right-1 
              w-4 h-4 text-[10px] 
              bg-red-500 text-white 
              rounded-full flex items-center justify-center
            ">
              3
            </span>
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                flex items-center gap-2 
                px-2 py-1.5 
                bg-slate-50 border border-slate-200 
                rounded-xl hover:bg-slate-100
                transition
              "
              aria-label="Profile menu"
            >
              <div className="
                w-8 h-8 bg-indigo-600 
                rounded-lg flex items-center justify-center 
                text-white text-sm font-bold
              ">
                JD
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* DROPDOWN */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="
                  absolute right-0 mt-2 
                  w-56 bg-white 
                  border border-slate-200 
                  rounded-xl shadow-xl 
                  overflow-hidden
                  z-50
                "
              >
                <div className="p-3 border-b border-slate-100">
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-slate-500">
                    john.doe@example.com
                  </p>
                </div>

                <button className="
                  w-full text-left px-4 py-2 
                  hover:bg-slate-50 
                  flex items-center gap-2
                  transition
                ">
                  <User className="w-4 h-4" />
                  Profile
                </button>

                <button className="
                  w-full text-left px-4 py-2 
                  hover:bg-slate-50 
                  flex items-center gap-2
                  text-red-600
                  transition
                ">
                  <LogOut className="w-4 h-4" />
                  Logout
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