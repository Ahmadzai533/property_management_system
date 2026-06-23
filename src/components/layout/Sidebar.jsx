import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  HelpCircle,
  LogOut,
  Home
} from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/properties', icon: Building2, label: 'Properties' },
    { to: '/tenants', icon: Users, label: 'Tenants' },
    { to: '/contracts', icon: FileText, label: 'Contracts' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
  ]

  const bottomItems = [
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/help', icon: HelpCircle, label: 'Help' },
  ]

  return (
    <motion.aside 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="w-72 bg-white border-r border-slate-200/60 flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl shadow-slate-200/50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-[#6D28D9]/30">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">PropManager</h1>
            <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}

        <div className="my-4 border-t border-slate-200/60" />

        {bottomItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (navItems.length + index) * 0.1 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200/60">
        <button className="sidebar-link w-full text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  )
}

export default Sidebar