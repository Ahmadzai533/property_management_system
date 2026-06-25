import { Routes, Route } from "react-router-dom";
import Tenants from "../pages/Tenants";

export const TenantsRoute = () => {
  return (
    <Routes>
      <Route index element={<Tenants />} />
      <Route path="list" element={<Tenants />} />
      <Route path="roles" element={<Tenants />} />
      <Route path="*" element={<Tenants />} />
    </Routes>
  );
};
