import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, User, ChevronDown, Moon, Sun, Menu } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className="
        bg-white/80 backdrop-blur-xl 
        border-b border-slate-200/60 
        sticky top-0 z-40 
        px-3 sm:px-4 md:px-6 
        py-3 sm:py-4
      "
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Section - Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Left Section - Search */}
        <div className="flex-1 min-w-0">
          <div className="relative max-w-full sm:max-w-xs md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="
                w-full pl-9 pr-4 py-2 
                bg-slate-50 border border-slate-200 
                rounded-xl text-sm 
                focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] 
                transition-all duration-300
                placeholder:text-slate-400
              "
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="
              p-2 sm:p-2.5 
              rounded-xl 
              bg-slate-50 border border-slate-200 
              text-slate-600 hover:bg-slate-100 
              transition-colors
            "
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              p-2 sm:p-2.5 
              rounded-xl 
              bg-slate-50 border border-slate-200 
              text-slate-600 hover:bg-slate-100 
              transition-colors relative
            "
          >
            <Bell className="w-4 h-4" />
            <span className="
              absolute -top-1 -right-1 
              w-4 h-4 
              bg-red-500 text-white 
              text-[10px] font-bold 
              rounded-full 
              flex items-center justify-center
            ">
              3
            </span>
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(!isOpen)}
              className="
                flex items-center gap-2 sm:gap-3 
                px-2 sm:px-3 py-1.5 sm:py-2 
                rounded-xl 
                bg-slate-50 border border-slate-200 
                hover:bg-slate-100 
                transition-colors
              "
            >
              <div className="
                w-7 h-7 sm:w-8 sm:h-8 
                gradient-primary rounded-lg 
                flex items-center justify-center 
                text-white font-semibold text-xs sm:text-sm
              ">
                JD
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">John Doe</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </motion.button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute right-0 mt-2 
                  w-56 
                  bg-white rounded-2xl 
                  shadow-2xl border border-slate-200/60 
                  py-2 overflow-hidden
                "
              >
                <div className="px-4 py-3 border-b border-slate-200/60">
                  <p className="text-sm font-semibold text-slate-800">
                    John Doe
                  </p>
                  <p className="text-xs text-slate-500">john.doe@example.com</p>
                </div>
                <button className="
                  w-full text-left px-4 py-2.5 
                  text-sm text-slate-600 
                  hover:bg-slate-50 
                  transition-colors 
                  flex items-center gap-3
                ">
                  <User className="w-4 h-4" />
                  Profile
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