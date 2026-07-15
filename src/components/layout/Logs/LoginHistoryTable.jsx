// src/components/logs/LoginHistoryTable.jsx
import { useMemo } from "react";
import {
  LogIn,
  LogOut,
  AlertTriangle,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useLocalization } from "../../../hooks/useLocalization";
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

const actionTranslationKeys = {
  Login: "loginHistory.actions.login",
  Logout: "loginHistory.actions.logout",
  "Failed Login": "loginHistory.actions.failedLogin",
};

export default function LoginHistoryTable({ logs, isLoading }) {
  const { t } = useLocalization();

  const columns = useMemo(
    () => [
      {
        header: t("loginHistory.user"),
        accessor: (row) => (
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {row.user}
          </span>
        ),
      },
      {
        header: t("loginHistory.action"),
        accessor: (row) => {
          const Icon = actionIcons[row.action] || LogIn;
          const actionKey = actionTranslationKeys[row.action] || row.action;
          return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
              <Icon className="w-3 h-3" />
              {t(actionKey)}
            </span>
          );
        },
      },
      {
        header: t("loginHistory.ipAddress"),
        accessor: (row) => (
          <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
            {row.ipAddress}
          </span>
        ),
      },
      {
        header: t("loginHistory.device"),
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
        header: t("loginHistory.dateTime"),
        accessor: (row) => <DateText value={row.date} showTime />,
      },
      {
        header: t("loginHistory.status"),
        accessor: (row) => <LogStatusBadge status={row.status} />,
      },
    ],
    [t],
  );

  return (
    <DataTable
      columns={columns}
      data={logs}
      isLoading={isLoading}
      emptyMessage={t("loginHistory.noLogsFound")}
    />
  );
}
