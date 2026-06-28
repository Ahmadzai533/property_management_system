import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import PropertyList from "../pages/properties/PropertyList";
import OwnProperties from "../pages/properties/OwnProperties";
import OwnPropertyDetails from "../pages/properties/OwnPropertyDetails";
import AddOwnProperty from "../pages/properties/AddOwnProperty";
import EditOwnProperty from "../pages/properties/EditOwnProperty";
import LeaseProperties from "../pages/properties/LeaseProperties";
import LeasePropertyDetails from "../pages/properties/LeasePropertyDetails";
import AddLeaseProperty from "../pages/properties/AddLeaseProperty";
import EditLeaseProperty from "../pages/properties/EditLeaseProperty";
import AllUnits from "../pages/properties/AllUnits";
import UnitDetails from "../pages/properties/UnitDetails";
import AddUnit from "../pages/properties/AddUnit";
import EditUnit from "../pages/properties/EditUnit";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route index element={<Dashboard />} />

        {/* Own Properties Module */}
        <Route path="properties/own" element={<OwnProperties />} />
        <Route path="properties/add" element={<AddOwnProperty />} />
        <Route path="properties/edit/:id" element={<EditOwnProperty />} />
        <Route path="properties/:id" element={<OwnPropertyDetails />} />
        
        {/* Lease Properties Module */}
        <Route path="properties/lease" element={<LeaseProperties />} />
        <Route path="properties/lease/add" element={<AddLeaseProperty />} />
        <Route path="properties/lease/edit/:id" element={<EditLeaseProperty />} />
        <Route path="properties/lease/:id" element={<LeasePropertyDetails />} />
        
        {/* Units Module */}
        <Route path="properties/units" element={<AllUnits />} />
        <Route path="properties/units/add" element={<AddUnit />} />
        <Route path="properties/units/edit/:id" element={<EditUnit />} />
        <Route path="properties/units/:id" element={<UnitDetails />} />
        
        {/* Properties Module */}
        <Route path="properties/listed" element={<PropertyList />} />
        <Route path="properties/*" element={<Properties />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;