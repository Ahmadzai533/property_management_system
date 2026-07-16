// src/pages/users/Users.jsx
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '../../hooks/useToast';
import { useLocalization } from '../../hooks/useLocalization';
import PageHeader from '../../components/shared/PageHeader';
import UserFilters from "../../components/Users/UserFilters";
import UserTable from '../../components/users/UserTable';
import UserFormModal from '../../components/users/UserFormModal';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import DateText from '../../components/common/DateText';

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLocalization();

  const breadcrumbItems = useMemo(() => [
    { label: t('breadcrumb.dashboard'), href: '/' },
    { label: t('users.usersList') },
  ], [t]);

  // Sample data
  const usersData = [
    {
      id: 1,
      name: 'John Admin',
      email: 'john.admin@system.com',
      avatar: 'JA',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-28T14:30:00',
      department: 'IT',
      phone: '(555) 123-4567',
    },
    {
      id: 2,
      name: 'Sarah Manager',
      email: 'sarah.manager@system.com',
      avatar: 'SM',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-01-27T10:15:00',
      department: 'Operations',
      phone: '(555) 234-5678',
    },
    {
      id: 3,
      name: 'Michael Staff',
      email: 'michael.staff@system.com',
      avatar: 'MS',
      role: 'Staff',
      status: 'Suspended',
      lastLogin: '2024-01-20T16:45:00',
      department: 'Maintenance',
      phone: '(555) 345-6789',
    },
  ];

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Staff' },
    { id: 4, name: 'Tenant' },
    { id: 5, name: 'Property Manager' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(usersData);
      setFilteredUsers(usersData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = users.filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleAddUser = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleViewUser = (user) => {
    toast.info(t('users.viewingUser', { name: user.name }));
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const updatedUsers = users.filter((u) => u.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteConfirmOpen(false);
    toast.success(t('users.deletedSuccessfully'));
  };

  const handleSaveUser = (data) => {
    if (isEditMode) {
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? { ...u, ...data } : u
      );
      setUsers(updatedUsers);
      toast.success(t('users.updatedSuccessfully'));
    } else {
     const newUser = {
  id: users.length + 1,
  ...data,
  avatar: data.name.split(' ').map(n => n[0]).join(''),
  lastLogin: new Date().toISOString(),
};
      setUsers([...users, newUser]);
      toast.success(t('users.createdSuccessfully'));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t('users.usersList')}
        subtitle={t('users.subtitle')}
        buttonText={t('common.add')}
        onButtonClick={handleAddUser}
      />

      <div className="mt-6">
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          roles={['Admin', 'Manager', 'Staff', 'Tenant', 'Property Manager']}
        />

        <UserTable
          users={filteredUsers}
          isLoading={isLoading}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
        user={selectedUser}
        isEdit={isEditMode}
        roles={roles}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={t('common.delete')}
        message={t('users.deleteConfirmation', { name: selectedUser?.name })}
        confirmText={t('common.delete')}
        type="danger"
      />
    </div>
  );
}