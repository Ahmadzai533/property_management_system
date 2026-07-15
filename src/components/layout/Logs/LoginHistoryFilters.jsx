// src/components/logs/LoginHistoryFilters.jsx
import { useLocalization } from "../../../hooks/useLocalization";
import SearchBar from "../../shared/SearchBar";

export default function LoginHistoryFilters({
  searchTerm,
  onSearchChange,
  userFilter,
  onUserFilterChange,
  statusFilter,
  onStatusFilterChange,
  users,
}) {
  const { t } = useLocalization();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          placeholder={t("loginHistory.searchPlaceholder")}
          value={searchTerm}
          onChange={onSearchChange}
        />
        <div className="flex gap-2">
          <select
            value={userFilter}
            onChange={(e) => onUserFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t("loginHistory.allUsers")}</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t("common.allStatus")}</option>
            <option value="Success">{t("loginHistory.statusSuccess")}</option>
            <option value="Failed">{t("loginHistory.statusFailed")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
