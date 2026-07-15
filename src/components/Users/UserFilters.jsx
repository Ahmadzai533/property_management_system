// src/components/users/UserFilters.jsx
import { useLocalization } from "../../hooks/useLocalization";
import SearchBar from '../shared/SearchBar';

export default function UserFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  roles,
}) {
  const { t } = useLocalization();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          placeholder={t("users.searchPlaceholder")}
          value={searchTerm}
          onChange={onSearchChange}
        />
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t("users.allRoles")}</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t("users.allStatus")}</option>
            <option value="Active">{t("users.active")}</option>
            <option value="Suspended">{t("users.suspended")}</option>
          </select>
        </div>
      </div>
    </div>
  );  
}