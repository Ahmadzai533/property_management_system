// src/components/logs/LoginHistoryTable.jsx
import {
  LogIn,
  LogOut,
  AlertTriangle,
  Monitor,
  Smartphone,
} from "lucide-react";
import DataTable from "../../shared/DataTable";
import LogStatusBadge from "./LogStatusBadge";
import DateText from "../../common/DateText";

const actionIcons = {
  Login: LogIn,
  Logout: LogOut,
  "Failed Login": AlertTriangle,
};

const deviceIcons = {
  Windows: Monitor,
  MacOS: Monitor,
  Linux: Monitor,
  Android: Smartphone,
  iOS: Smartphone,
};

export default function LoginHistoryTable({ logs, isLoading }) {
  const columns = [
    {
      header: "User",
      accessor: (row) => (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {row.user}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (row) => {
        const Icon = actionIcons[row.action] || LogIn;
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            <Icon className="w-3 h-3" />
            {row.action}
          </span>
        );
      },
    },
    {
      header: "IP Address",
      accessor: (row) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          {row.ipAddress}
        </span>
      ),
    },
    {
      header: "Device",
      accessor: (row) => {
        const deviceName = row.device.split(" ")[1] || "Unknown";
        const Icon = deviceIcons[deviceName] || Monitor;
        return (
          <span className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            <Icon className="w-3 h-3" />
            {row.device}
          </span>
        );
      },
    },
    {
      header: "Date & Time",
      accessor: (row) => <DateText value={row.date} showTime />,
    },
    {
      header: "Status",
      accessor: (row) => <LogStatusBadge status={row.status} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={logs}
      isLoading={isLoading}
      emptyMessage="No logs found"
    />
  );
}
