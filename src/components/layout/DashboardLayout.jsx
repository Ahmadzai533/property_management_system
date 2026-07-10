import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocalization } from "../../hooks/useLocalization";

const DashboardLayout = () => {
  const { dir } = useLocalization();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLarge, setIsLarge] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Calculate sidebar width based on state
  const sidebarWidth = isLarge ? (isCollapsed ? 64 : 256) : 0;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950" dir={dir}>
      {/* Navbar: Fixed height */}
      <Navbar
        onToggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      
      <div className="flex flex-1 overflow-hidden relative w-full">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* Main Content: Dynamic RTL/LTR margin based on sidebar */}
        <main 
          className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 transition-all duration-200 ease-in-out w-full"
          style={{
            [dir === "rtl" ? "marginRight" : "marginLeft"]: sidebarWidth,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;