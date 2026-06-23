import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Dashboard from '../pages/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Home Route */}
        <Route index element={<Dashboard />} />
        
        {/* Future routes can be added here */}
        {/* <Route path="properties" element={<Properties />} /> */}
        {/* <Route path="tenants" element={<Tenants />} /> */}
        {/* <Route path="contracts" element={<Contracts />} /> */}
        {/* <Route path="calendar" element={<Calendar />} /> */}
        {/* <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="help" element={<Help />} /> */}
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes