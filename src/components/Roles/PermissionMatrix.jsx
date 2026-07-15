// src/components/roles/PermissionMatrix.jsx
import { useMemo } from "react";
import PermissionGroup from "./PermissionGroup";

export default function PermissionMatrix({ permissions, onChange }) {

  const permissionModules = useMemo(() => [
    {
      id: "users",
      label: "permissions.modules.users",
      permissions: ["view", "create", "edit", "delete"],
    },
    {
      id: "properties",
      label: "permissions.modules.properties",
      permissions: ["full"],
    },
    {
      id: "tenants",
      label: "permissions.modules.tenants",
      permissions: ["full"],
    },
    {
      id: "finance",
      label: "permissions.modules.finance",
      permissions: ["view", "manage"],
    },
    {
      id: "agreements",
      label: "permissions.modules.agreements",
      permissions: ["view", "manage"],
    },
  ], []);

  const handlePermissionChange = (moduleId, newPerms) => {
    onChange({
      ...permissions,
      [moduleId]: newPerms,
    });
  };

  return (
    <div className="space-y-4">
      {permissionModules.map((module) => (
        <PermissionGroup
          key={module.id}
          title={module.label}
          permissions={module.permissions}
          selectedPermissions={permissions[module.id] || []}
          onChange={(newPerms) => handlePermissionChange(module.id, newPerms)}
        />
      ))}
    </div>
  );
}