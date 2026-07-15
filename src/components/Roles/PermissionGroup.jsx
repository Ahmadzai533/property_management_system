// src/components/roles/PermissionGroup.jsx
import { useLocalization } from "../../hooks/useLocalization";

export default function PermissionGroup({
  title,
  permissions,
  selectedPermissions,
  onChange,
}) {
  const { t } = useLocalization();

  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 capitalize">
        {t(title)}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {permissions.map((perm) => (
          <label key={perm} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={selectedPermissions.includes(perm)}
              onChange={(e) => {
                const newPerms = e.target.checked
                  ? [...selectedPermissions, perm]
                  : selectedPermissions.filter((p) => p !== perm);
                onChange(newPerms);
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {t(`permissions.actions.${perm}`)}
          </label>
        ))}
      </div>
    </div>
  );
}