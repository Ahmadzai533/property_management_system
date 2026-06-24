import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Sidebar (fixed height, no scroll) */}
      <Sidebar />

      {/* Main Content (ONLY SCROLL AREA) */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Navbar stays fixed inside main */}
        <Navbar />

        {/* Scrollable content area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="flex-1 overflow-y-auto p-4 md:p-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;