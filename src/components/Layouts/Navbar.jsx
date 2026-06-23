// ==============================================
// 8. components/layout/Navbar.jsx
// ==============================================

import { motion } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Sun, 
  Moon,
  ChevronDown,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = ({ toggleSidebar, isMobile }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/properties') return 'Properties';
    if (path === '/tenants') return 'Tenants';
    if (path === '/contracts') return 'Contracts';
    if (path === '/payments') return 'Payments';
    if (path === '/maintenance') return 'Maintenance';
    if (path === '/reports') return 'Reports';
    if (path === '/settings') return 'Settings';
    return '';
  };

  const notifications = [
    { id: 1, title: 'New tenant application', time: '5 min ago', read: false },
    { id: 2, title: 'Payment received $1,200', time: '1 hour ago', read: false },
    { id: 3, title: 'Maintenance request #123', time: '3 hours ago', read: true },
  ];

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Welcome back, John
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-purple-50' : ''
                      }`}
                    >
                      <p className="text-sm text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100 text-center">
                  <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">admin@propmanage.com</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Profile</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-gray-50 transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Help</span>
                  </button>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-red-50 transition-colors text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;