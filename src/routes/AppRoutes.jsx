import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Properties from "../pages/Properties";

import TenantForm from "../pages/tenants/tanants";

import DocumentManagement from "../pages/tenants/DocumentManagement";
import TenantDashboard from "../pages/tenants/tanentsDashboard";
import TenantDetailsViewModel from "../pages/tenants/viewModel";
import TenantHistoryPage from "../pages/tenants/TenantHistoryPage";

import EditTenant from "../pages/tenants/editFormtenant";
import MaintainerManagement from "../pages/maintianents/miantanentsPerson";

import PropertyList from "../pages/Properties/AllPropertyPages/PropertyList";
import OwnProperties from "../pages/properties/OwnPropertyPages/OwnProperties";
import OwnPropertyDetails from "../pages/properties/OwnPropertyPages/OwnPropertyDetails";
import AddOwnProperty from "../pages/properties/OwnPropertyPages/AddOwnProperty";
import EditOwnProperty from "../pages/properties/OwnPropertyPages/EditOwnProperty";
import LeaseProperties from "../pages/properties/LeasePropertyPages/LeaseProperties";
import LeasePropertyDetails from "../pages/properties/LeasePropertyPages/LeasePropertyDetails";
import AddLeaseProperty from "../pages/properties/LeasePropertyPages/AddLeaseProperty";
import EditLeaseProperty from "../pages/properties/LeasePropertyPages/EditLeaseProperty";
import AllUnits from "../pages/Properties/AllUnitPages/AllUnits";
import UnitDetails from "../pages/properties/AllUnitPages/UnitDetails";
import AddUnit from "../pages/properties/AllUnitPages/AddUnit";
import EditUnit from "../pages/properties/AllUnitPages/EditUnit";

import PaymentsInvoices from "../pages/finance/PaymentsInvoices";
import RentRollLedger from "../pages/finance/RentRollLedger";
import TransactionHistory from "../pages/finance/TransactionHistory";
import MaintenanceRequestManagement from "../pages/maintianents/maintianentsRequest";


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
        <Route
          path="properties/lease/edit/:id"
          element={<EditLeaseProperty />}
        />
        <Route path="properties/lease/:id" element={<LeasePropertyDetails />} />

        {/* Units Module */}
        <Route path="properties/units" element={<AllUnits />} />
        <Route path="properties/units/add" element={<AddUnit />} />
        <Route path="properties/units/edit/:id" element={<EditUnit />} />
        <Route path="properties/units/:id" element={<UnitDetails />} />

        {/*Finance Module */}
        {/* <Route path="/" element={<Navigate to="payments" replace />} /> */}
        <Route path="finance/payments" element={<PaymentsInvoices />} />
        <Route path="finance/ledger" element={<RentRollLedger />} />
        <Route path="finance/transactions" element={<TransactionHistory />} />

        {/* Properties Module */}
        <Route path="properties/listed" element={<PropertyList />} />
        <Route path="properties/*" element={<Properties />} />
  



<Route path="tenants" element={<TenantDashboard />} />
<Route path="/tenants/form" element={<TenantForm />} />
{/* <Route path="/tenants/property" element={<HomeDetails />} /> */}
<Route path="/tenants/document" element={<DocumentManagement />} />
<Route path="/tenants/view" element={<TenantDetailsViewModel />} />
<Route path="/tenants/history" element={<TenantHistoryPage />} />

<Route path="/tenants/edit" element={<EditTenant/>} />
<Route path="/maintainers/maintainersPerson" element={<MaintainerManagement/>} />
<Route path="/maintainers/maintainersRequest" element={<MaintenanceRequestManagement/>} />



  


        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
