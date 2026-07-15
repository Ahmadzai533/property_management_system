// src/pages/roles/Roles.jsx
import { useState, useEffect, useMemo } from "react";
import { useToast } from "../../hooks/useToast";
import { useLocalization } from "../../hooks/useLocalization";
import PageHeader from "../../components/shared/PageHeader";
import RoleTable from "../../components/roles/RoleTable";
import RoleFormModal from "../../components/roles/RoleFormModal";
import ConfirmDialog from "../../components/shared/ConfirmDialog";

export default function Roles() {
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLocalization();

  const breadcrumbItems = useMemo(() => [
    { label: t("breadcrumb.dashboard"), href: "/" },
    { label: t("users.rolesPermissions") }
  ], [t]);

  // Sample data
  const rolesData = [
    {
      id: 1,
      name: "Admin",
      usersCount: 3,
      permissions: {
        users: ["view", "create", "edit", "delete"],
        properties: ["full"],
        tenants: ["full"],
        finance: ["view", "manage"],
        agreements: ["view", "manage"],
      },
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      name: "Manager",
      usersCount: 5,
      permissions: {
        users: ["view", "create", "edit"],
        properties: ["full"],
        tenants: ["full"],
        finance: ["view"],
        agreements: ["view", "manage"],
      },
      createdAt: "2023-01-15",
    },
    {
      id: 3,
      name: "Staff",
      usersCount: 8,
      permissions: {
        users: ["view"],
        properties: ["view"],
        tenants: ["view"],
        finance: ["view"],
        agreements: ["view"],
      },
      createdAt: "2023-02-01",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRoles(rolesData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateRole = () => {
    setIsEditMode(false);
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setIsEditMode(true);
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (role) => {
    setSelectedRole(role);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const updatedRoles = roles.filter((r) => r.id !== selectedRole.id);
    setRoles(updatedRoles);
    setIsDeleteConfirmOpen(false);
    toast.success(t("roles.deletedSuccessfully"));
  };

  const handleSaveRole = (data) => {
    if (isEditMode) {
      const updatedRoles = roles.map((r) =>
        r.id === selectedRole.id ? { ...r, ...data } : r,
      );
      setRoles(updatedRoles);
      toast.success(t("roles.updatedSuccessfully"));
    } else {
      const newRole = {
        id: roles.length + 1,
        ...data,
        usersCount: 0,
        createdAt: new Date().toISOString(),
      };
      setRoles([...roles, newRole]);
      toast.success(t("roles.createdSuccessfully"));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t("users.rolesPermissions")}
        subtitle={t("roles.subtitle")}
        buttonText={t("roles.createRole")}
        onButtonClick={handleCreateRole}
      />

      <div className="mt-6">
        <RoleTable
          roles={roles}
          isLoading={isLoading}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
        />
      </div>

      <RoleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveRole}
        role={selectedRole}
        isEdit={isEditMode}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={t("common.delete")}
        message={t("roles.deleteConfirmation", { name: selectedRole?.name })}
        confirmText={t("common.delete")}
        type="danger"
      />
    </div>
  );
}