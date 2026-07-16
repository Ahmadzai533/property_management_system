// src/components/Users/UserTable.jsx
import { useMemo } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";
import DataTable from "../shared/DataTable";
import UserStatusBadge from "./UserStatusBadge";

export default function UserTable({
  users,
  isLoading,
  onView,
  onEdit,
  onDelete,
}) {
  const { t } = useLocalization();

  const columns = useMemo(
    () => [
      {
        header: t("users.user"),
        accessor: (row) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-medium">
              {row.avatar ||
                row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {row.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {row.department}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: t("users.email"),
        accessor: (row) => (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {row.email}
          </span>
        ),
      },
      {
        header: t("users.role"),
        accessor: (row) => (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
            {row.role}
          </span>
        ),
      },
      {
        header: t("users.status"),
        accessor: (row) => <UserStatusBadge status={row.status} />,
      },
      {
        header: t("users.lastLogin"),
        accessor: (row) => (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {new Date(row.lastLogin).toLocaleString()}
          </span>
        ),
      },
      {
        header: t("common.actions"),
        className: "text-right",
        accessor: (row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onView(row);
              }}
              title={t("common.view")}
            >
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>
            <button
              className="p-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row);
              }}
              title={t("common.edit")}
            >
              <Edit className="w-4 h-4 text-green-600 dark:text-green-400" />
            </button>
            <button
              className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row);
              }}
              title={t("common.delete")}
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        ),
      },
    ],
    [t, onView, onEdit, onDelete],
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      emptyMessage={t("users.noUsersFound")}
    />
  );
}
