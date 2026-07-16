// src/pages/Login-history/LoginHistory.jsx
import { useState, useEffect, useMemo } from "react";
import { useToast } from "../../hooks/useToast";
import { useLocalization } from "../../hooks/useLocalization";
import PageHeader from "../../components/Shared/PageHeader";
import LoginHistoryFilters from "../../components/layout/Logs/LoginHistoryFilters";
import LoginHistoryTable from "../../components/layout/Logs/LoginHistoryTable";

// Sample data
const logsData = [
  {
    id: 1,
    user: "John Admin",
    action: "Login",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    date: "2024-01-28T14:30:00",
    status: "Success",
  },
  {
    id: 2,
    user: "Sarah Manager",
    action: "Login",
    ipAddress: "192.168.1.101",
    device: "Safari on MacOS",
    date: "2024-01-27T10:15:00",
    status: "Success",
  },
  {
    id: 3,
    user: "Michael Staff",
    action: "Failed Login",
    ipAddress: "192.168.1.102",
    device: "Firefox on Linux",
    date: "2024-01-20T16:45:00",
    status: "Failed",
  },
  {
    id: 4,
    user: "Emma Tenant",
    action: "Logout",
    ipAddress: "192.168.1.103",
    device: "Chrome on Android",
    date: "2024-01-26T09:00:00",
    status: "Success",
  },
];

const users = [
  { id: 1, name: "John Admin" },
  { id: 2, name: "Sarah Manager" },
  { id: 3, name: "Michael Staff" },
  { id: 4, name: "Emma Tenant" },
];

export default function LoginHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();
  const { t } = useLocalization();

  const breadcrumbItems = useMemo(
    () => [
      { label: t("breadcrumb.dashboard"), href: "/" },
      { label: t("users.loggedHistory") },
    ],
    [t],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogs(logsData);
      setFilteredLogs(logsData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = logs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm);
      const matchesUser = !userFilter || log.user === userFilter;
      const matchesStatus = !statusFilter || log.status === statusFilter;
      return matchesSearch && matchesUser && matchesStatus;
    });
    setFilteredLogs(filtered);
  }, [searchTerm, userFilter, statusFilter, logs]);

  const handleExportLogs = () => {
    toast.success(t("loginHistory.logsExportedSuccessfully"));
  };

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t("users.loggedHistory")}
        subtitle={t("loginHistory.subtitle")}
        buttonText={t("loginHistory.exportLogs")}
        onButtonClick={handleExportLogs}
      />

      <div className="mt-6">
        <LoginHistoryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          userFilter={userFilter}
          onUserFilterChange={setUserFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          users={users}
        />

        <LoginHistoryTable logs={filteredLogs} isLoading={isLoading} />
      </div>
    </div>
  );
}
