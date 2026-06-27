import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import PropertyList from "../pages/properties/PropertyList";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route index element={<Dashboard />} />

        {/* Properties Module */}
        <Route path="properties/listed" element={<PropertyList />} />
        <Route path="properties/*" element={<Properties />} />

        {/* Owner Tenant Module */}
     

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
