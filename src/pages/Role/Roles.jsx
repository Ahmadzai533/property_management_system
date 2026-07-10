// src/pages/roles/Roles.jsx
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import PageHeader from "../../components/shared/PageHeader";
import RoleTable from "../../components/roles/RoleTable";
import RoleFormModal from "../../components/roles/RoleFormModal";
import ConfirmDialog from "../../components/shared/ConfirmDialog";

const breadcrumbItems = [{ label: "Dashboard", href: "/" }, { label: "Roles" }];

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

export default function Roles() {
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();

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
    toast.success("Role deleted successfully");
  };

  const handleSaveRole = (data) => {
    if (isEditMode) {
      const updatedRoles = roles.map((r) =>
        r.id === selectedRole.id ? { ...r, ...data } : r,
      );
      setRoles(updatedRoles);
      toast.success("Role updated successfully");
    } else {
      const newRole = {
        id: roles.length + 1,
        ...data,
        usersCount: 0,
        createdAt: new Date().toISOString(),
      };
      setRoles([...roles, newRole]);
      toast.success("Role created successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title="Roles"
        subtitle="Create and manage user roles with permissions"
        buttonText="Create Role"
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
        title="Delete Role"
        message={`Are you sure you want to delete ${selectedRole?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
