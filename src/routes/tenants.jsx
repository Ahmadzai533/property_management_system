import { Routes, Route } from "react-router-dom";

import { TenantListPage } from "../pages/tenants/page/TenantListPage";
import { AddTenantPage } from "../pages/tenants/page/AddTenantPage";
import { TenantDetailsPage } from "../pages/tenants/page/TenantDetailsPage";
import { EditTenantPage } from "../pages/tenants/page/EditTenantPage";

export const TenantRoute = () => {
  return (
    <Routes>
      {/* /owner/tenant */}
      <Route index element={<TenantListPage />} />

      {/* /owner/tenant/add */}
      <Route path="add" element={<AddTenantPage />} />

      {/* /owner/tenant/1 */}
      <Route path=":id" element={<TenantDetailsPage />} />

      {/* /owner/tenant/1/edit */}
      <Route path=":id/edit" element={<EditTenantPage />} />
    </Routes>
  );
};