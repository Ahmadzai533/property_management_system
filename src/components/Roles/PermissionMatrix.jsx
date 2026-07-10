// src/components/roles/PermissionMatrix.jsx
import PermissionGroup from "./PermissionGroup";

const permissionModules = [
  {
    id: "users",
    label: "Users",
    permissions: ["view", "create", "edit", "delete"],
  },
  {
    id: "properties",
    label: "Properties",
    permissions: ["full"],
  },
  {
    id: "tenants",
    label: "Tenants",
    permissions: ["full"],
  },
  {
    id: "finance",
    label: "Finance",
    permissions: ["view", "manage"],
  },
  {
    id: "agreements",
    label: "Agreements",
    permissions: ["view", "manage"],
  },
];

export default function PermissionMatrix({ permissions, onChange }) {
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
