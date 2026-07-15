// src/components/roles/RoleTable.jsx
import { useMemo } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useLocalization } from "../../hooks/useLocalization";
import DataTable from "../shared/DataTable";
import DateText from "../common/DateText";

export default function RoleTable({ roles, isLoading, onEdit, onDelete }) {
  const { t } = useLocalization();

  const columns = useMemo(() => [
    {
      header: t("roles.roleName"),
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            {row.name[0]}
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      header: t("roles.users"),
      accessor: (row) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {t("roles.usersCount", { count: row.usersCount })}
        </span>
      ),
    },
    {
      header: t("admin.permissions"),
      accessor: (row) => (
        <div className="flex flex-wrap gap-1">
          {Object.entries(row.permissions).map(
            ([module, perms]) =>
              perms.length > 0 && (
                <span
                  key={module}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  {t(`permissions.modules.${module}`)}: {perms.map(p => t(`permissions.actions.${p}`)).join(", ")}
                </span>
              ),
          )}
        </div>
      ),
    },
    {
      header: t("roles.created"),
      accessor: (row) => <DateText value={row.createdAt} />,
    },
    {
      header: t("common.actions"),
      className: "text-right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-1">
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
  ], [t, onEdit, onDelete]);

  return (
    <DataTable
      columns={columns}
      data={roles}
      isLoading={isLoading}
      emptyMessage={t("roles.noRolesFound")}
    />
  );
}