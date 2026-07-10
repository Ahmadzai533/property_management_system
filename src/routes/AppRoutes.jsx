import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Properties from "../pages/Properties";

// Import Tenant Routes
import TenantForm from "../pages/tenants/tanants";
import DocumentManagement from "../pages/tenants/DocumentManagement";
import TenantDashboard from "../pages/tenants/tanentsDashboard";
import TenantDetailsViewModel from "../pages/tenants/viewModel";
import TenantHistoryPage from "../pages/tenants/TenantHistoryPage";
import EditTenant from "../pages/tenants/editFormtenant";

// Import Maintenance
import MaintainerManagement from "../pages/maintianents/miantanentsPerson";
import MaintenanceRequestManagement from "../pages/maintianents/maintianentsRequest";

// Import Notice
import NoticeManagement from "../pages/notice/NoticeManagement";

// Import Feedback
import FeedbackList from "../pages/Feedback/FeedbackList";
import FeedbackCreate from "../pages/Feedback/FeedbackCreate";
import FeedbackDetails from "../pages/Feedback/FeedbackDetails";
import FeedbackEdit from "../pages/Feedback/FeedbackEdit";

// Import Profile
import OwnerProfile from "../pages/profile/OwnerProfile";

// Import Properties
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

// Import Finance
import PaymentsInvoices from "../pages/finance/PaymentsInvoices";
import RentRollLedger from "../pages/finance/RentRollLedger";
import TransactionHistory from "../pages/finance/TransactionHistory";
import ExpensesPage from "../pages/finance/Expenses";

// Import Agreements
import Agreements from "../pages/Agreements/Agreements";

// Import Users & Roles
import Users from "../pages/User/Users";
import Roles from "../pages/Role/Roles";
import LoginHistory from "../pages/Login-history/LoginHistory";

// Import Booking Module
import BookingIndexPage from "../pages/Booking/BookingIndex";
import Bookings from "../pages/Booking/Bookings";
import CreateBooking from "../pages/Booking/CreateBooking";
import BookingCalendar from "../pages/Booking/BookingCalendar";
import BookingDetails from "../pages/Booking/BookingDetails";

// Import Reports Module
import ReportsIndex from "../pages/reports/ReportsIndex";
import PaymentReportsPage from "../pages/reports/PaymentReportsPage";
import InvoiceReportsPage from "../pages/reports/InvoiceReportsPage";
import FinancialReportsPage from "../pages/reports/FinancialReportsPage";

// Import Settings
import SettingsIndex from "../pages/settings/SettingsIndex";
import GeneralSettings from "../pages/settings/GeneralSettings";
import LocalizationSettings from "../pages/settings/LocalizationSettings";
import AppearanceSettings from "../pages/settings/AppearanceSettings";
import UsersRolesSettings from "../pages/settings/UsersRolesSettings";
import PropertiesSettings from "../pages/settings/PropertiesSettings";
import FinancialSettings from "../pages/settings/FinancialSettings";
import NotificationsSettings from "../pages/settings/NotificationsSettings";
import SecuritySettings from "../pages/settings/SecuritySettings";
import BackupSettings from "../pages/settings/BackupSettings";
import IntegrationsSettings from "../pages/settings/IntegrationsSettings";
import AuditLogsSettings from "../pages/settings/AuditLogsSettings";

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

        {/* Maintenance Module */}
        <Route path="maintainers/maintainersPerson" element={<MaintainerManagement />} />
        <Route path="maintainers/maintainersRequest" element={<MaintenanceRequestManagement />} />

        {/* Notice Module */}
        <Route path="notice" element={<NoticeManagement />} />

        {/* Feedback Module */}
        <Route path="owner/feedback" element={<FeedbackList />} />
        <Route path="owner/feedback/create" element={<FeedbackCreate />} />
        <Route path="owner/feedback/:id" element={<FeedbackDetails />} />
        <Route path="owner/feedback/:id/edit" element={<FeedbackEdit />} />

        {/* Profile Module */}
        <Route path="owner/profile" element={<OwnerProfile />} />

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