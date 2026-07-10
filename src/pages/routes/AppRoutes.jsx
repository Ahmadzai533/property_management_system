// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Dashboard from "../../Dashboard/Dashboard";
import Properties from "../Properties";

// Import Tenant Routes
import TenantForm from "../tenants/tanants";
import DocumentManagement from "../tenants/DocumentManagement";
import TenantDashboard from "../tenants/tanentsDashboard";
import TenantDetailsViewModel from "../tenants/viewModel";
import TenantHistoryPage from "../tenants/TenantHistoryPage";
import EditTenant from "../tenants/editFormtenant";

// Import Maintenance
import MaintainerManagement from "../maintianents/miantanentsPerson";

// Import Properties
import PropertyList from "../Properties/AllPropertyPages/PropertyList";
import OwnProperties from "../properties/OwnPropertyPages/OwnProperties";
import OwnPropertyDetails from "../properties/OwnPropertyPages/OwnPropertyDetails";
import AddOwnProperty from "../properties/OwnPropertyPages/AddOwnProperty";
import EditOwnProperty from "../properties/OwnPropertyPages/EditOwnProperty";
import LeaseProperties from "../properties/LeasePropertyPages/LeaseProperties";
import LeasePropertyDetails from "../properties/LeasePropertyPages/LeasePropertyDetails";
import AddLeaseProperty from "../properties/LeasePropertyPages/AddLeaseProperty";
import EditLeaseProperty from "../properties/LeasePropertyPages/EditLeaseProperty";
import AllUnits from "../Properties/AllUnitPages/AllUnits";
import UnitDetails from "../properties/AllUnitPages/UnitDetails";
import AddUnit from "../properties/AllUnitPages/AddUnit";
import EditUnit from "../properties/AllUnitPages/EditUnit";

// Import Finance
import PaymentsInvoices from "../finance/PaymentsInvoices";
import RentRollLedger from "../finance/RentRollLedger";
import TransactionHistory from "../finance/TransactionHistory";
import ExpensesPage from "../finance/Expenses";

// Import Agreements
import Agreements from "../Agreements/Agreements";

// Import Users & Roles
import Users from "../User/Users";
import Roles from "../Role/Roles";
import LoginHistory from "../Login-history/LoginHistory";

// Import Booking Module
import BookingIndexPage from "../Booking/BookingIndex";
import Bookings from "../Booking/Bookings";
import CreateBooking from "../Booking/CreateBooking";
import BookingCalendar from "../Booking/BookingCalendar";
import BookingDetails from "../Booking/BookingDetails";

// Import Reports Module
import ReportsIndex from "../reports/ReportsIndex";
import PaymentReportsPage from "../reports/PaymentReportsPage";
import InvoiceReportsPage from "../reports/InvoiceReportsPage";
import FinancialReportsPage from "../reports/FinancialReportsPage";

import SettingsIndex from "../settings/SettingsIndex";
import GeneralSettings from "../settings/GeneralSettings";
import LocalizationSettings from "../settings/LocalizationSettings";
import AppearanceSettings from "../settings/AppearanceSettings";
import UsersRolesSettings from "../settings/UsersRolesSettings";
import PropertiesSettings from "../settings/PropertiesSettings";
import FinancialSettings from "../settings/FinancialSettings";
import NotificationsSettings from "../settings/NotificationsSettings";
import SecuritySettings from "../settings/SecuritySettings";
import BackupSettings from "../settings/BackupSettings";
import IntegrationsSettings from "../settings/IntegrationsSettings";
import AuditLogsSettings from "../settings/AuditLogsSettings";

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

        {/* Finance Module */}
        <Route path="finance/payments" element={<PaymentsInvoices />} />
        <Route path="finance/ledger" element={<RentRollLedger />} />
        <Route path="finance/transactions" element={<TransactionHistory />} />
        <Route path="finance/expenses" element={<ExpensesPage />} />

        {/* Properties Module */}
        <Route path="properties/listed" element={<PropertyList />} />
        <Route path="properties/*" element={<Properties />} />

        {/* Tenants Module */}
        <Route path="tenants/list" element={<TenantDashboard />} />
        <Route path="tenants/form" element={<TenantForm />} />
        <Route path="tenants/document" element={<DocumentManagement />} />
        <Route path="tenants/view" element={<TenantDetailsViewModel />} />
        <Route path="tenants/history" element={<TenantHistoryPage />} />
        <Route path="tenants/edit" element={<EditTenant />} />
        <Route path="maintiannace" element={<MaintainerManagement />} />

        {/* Users & Roles Module */}
        <Route
          path="users-roles"
          element={<Navigate to="users-roles/users" replace />}
        />
        <Route path="users-roles/users" element={<Users />} />
        <Route path="users-roles/roles" element={<Roles />} />
        <Route path="users-roles/logs" element={<LoginHistory />} />

        {/* Agreements Module */}
        <Route path="agreements" element={<Agreements />} />

        {/* Booking Module */}
        <Route path="bookings" element={<BookingIndexPage />} />
        <Route path="bookings/list" element={<Bookings />} />
        <Route path="bookings/create" element={<CreateBooking />} />
        <Route path="bookings/calendar" element={<BookingCalendar />} />
        <Route path="bookings/details" element={<BookingDetails />} />

        {/* Reports Module */}
        <Route path="reports/hub" element={<ReportsIndex />} />
        <Route path="reports/payments" element={<PaymentReportsPage />} />
        <Route path="reports/invoices" element={<InvoiceReportsPage />} />
        <Route path="reports/financial" element={<FinancialReportsPage />} />

        {/* Settings Module */}
        <Route path="settings" element={<SettingsIndex />} />
        <Route path="settings/general" element={<GeneralSettings />} />
        <Route
          path="settings/localization"
          element={<LocalizationSettings />}
        />
        <Route path="settings/appearance" element={<AppearanceSettings />} />
        <Route path="settings/users-roles" element={<UsersRolesSettings />} />
        <Route path="settings/properties" element={<PropertiesSettings />} />
        <Route path="settings/financial" element={<FinancialSettings />} />
        <Route
          path="settings/notifications"
          element={<NotificationsSettings />}
        />
        <Route path="settings/security" element={<SecuritySettings />} />
        <Route path="settings/backup" element={<BackupSettings />} />
        <Route
          path="settings/integrations"
          element={<IntegrationsSettings />}
        />
        <Route path="settings/audit-logs" element={<AuditLogsSettings />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
