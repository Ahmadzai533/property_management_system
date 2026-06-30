import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import { UsersRoute } from "./users";
// import TanantRoute from "../pages/tenants/route/route";
import TenantForm from "../pages/tenants/pages/tanants";

import DocumentManagement from "../pages/tenants/pages/DocumentManagement";
import TenantDashboard from "../pages/tenants/pages/tanentsDashboard";
import TenantDetailsViewModel from "../pages/tenants/pages/viewModel";
import TenantHistoryPage from "../pages/tenants/pages/TenantHistoryPage";

import EditTenant from "../pages/tenants/pages/editFormtenant";
import MaintainerManagement from "../pages/maintianents/miantanentsPerson";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route index element={<Dashboard />} />

        {/* Properties Module */}
        <Route path="properties/*" element={<Properties />} />
  



<Route path="tenants" element={<TenantDashboard />} />
<Route path="/tenants/form" element={<TenantForm />} />
{/* <Route path="/tenants/property" element={<HomeDetails />} /> */}
<Route path="/tenants/document" element={<DocumentManagement />} />
<Route path="/tenants/view" element={<TenantDetailsViewModel />} />
<Route path="/tenants/history" element={<TenantHistoryPage />} />

<Route path="/tenants/edit" element={<EditTenant/>} />
<Route path="/maintiannace" element={<MaintainerManagement/>} />


        {/* Users Module */}
        <Route path="users/*" element={<UsersRoute />} />

  

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
