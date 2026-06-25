import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import TenantForm from "../pages/tenants/pages/inFormationform";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route index element={<Dashboard />} />

        {/* Tenant Module */}
        <Route path="tenants" element={<TenantForm />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;