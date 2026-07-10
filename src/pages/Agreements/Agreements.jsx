// src/pages/agreements/Agreements.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import Breadcrumb from "../../components/common/Breadcrumb";

import Button from "../../components/common/Button";

import { useToast } from "../../hooks/useToast";

import StatsCards from "../../components/Agreements/StatsCards";
import AgreementFilters from "../../components/Agreements/AgreementFilters";
import AgreementTable from "../../components/Agreements/AgreementTable";
import AgreementDrawer from "../../components/Agreements/AgreementDrawer";
import AgreementForm from "../../components/Agreements/AgreementForm";
import DeleteConfirmModal from "../../components/Agreements/DeleteConfirmModal";

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Agreements" },
];

// Sample Data
const agreementsData = [
  {
    id: 1,
    property: "Sunset Towers",
    propertyAddress: "123 Sunset Blvd, Los Angeles, CA 90001",
    tenant: "John Smith",
    tenantEmail: "john.smith@email.com",
    tenantPhone: "(555) 123-4567",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    rentAmount: 2500,
    deposit: 2500,
    status: "Active",
    remainingDays: 184,
    contractFile: "lease_agreement_001.pdf",
  },
  {
    id: 2,
    property: "Ocean View Apartments",
    propertyAddress: "456 Ocean Ave, Santa Monica, CA 90401",
    tenant: "Sarah Johnson",
    tenantEmail: "sarah.j@email.com",
    tenantPhone: "(555) 234-5678",
    startDate: "2024-02-15",
    endDate: "2025-02-14",
    rentAmount: 3200,
    deposit: 3200,
    status: "Active",
    remainingDays: 229,
    contractFile: "lease_agreement_002.pdf",
  },
  {
    id: 3,
    property: "Garden Heights",
    propertyAddress: "789 Garden St, Pasadena, CA 91101",
    tenant: "Michael Brown",
    tenantEmail: "michael.b@email.com",
    tenantPhone: "(555) 345-6789",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    rentAmount: 1800,
    deposit: 1800,
    status: "Expiring Soon",
    remainingDays: 30,
    contractFile: "lease_agreement_003.pdf",
  },
  {
    id: 4,
    property: "Silver Lake Residences",
    propertyAddress: "101 Silver Lake Dr, Los Angeles, CA 90026",
    tenant: "Emma Wilson",
    tenantEmail: "emma.w@email.com",
    tenantPhone: "(555) 456-7890",
    startDate: "2023-01-15",
    endDate: "2023-12-15",
    rentAmount: 2800,
    deposit: 2800,
    status: "Terminated",
    remainingDays: 0,
    contractFile: "lease_agreement_004.pdf",
  },
  {
    id: 5,
    property: "Hollywood Hills",
    propertyAddress: "202 Hollywood Blvd, Los Angeles, CA 90028",
    tenant: "David Chen",
    tenantEmail: "david.c@email.com",
    tenantPhone: "(555) 567-8901",
    startDate: "2023-08-01",
    endDate: "2024-07-31",
    rentAmount: 4200,
    deposit: 4200,
    status: "Active",
    remainingDays: 122,
    contractFile: "lease_agreement_005.pdf",
  },
  {
    id: 6,
    property: "Beverly Hills Estates",
    propertyAddress: "303 Beverly Dr, Beverly Hills, CA 90210",
    tenant: "Lisa Anderson",
    tenantEmail: "lisa.a@email.com",
    tenantPhone: "(555) 678-9012",
    startDate: "2023-04-15",
    endDate: "2024-04-14",
    rentAmount: 5500,
    deposit: 5500,
    status: "Expiring Soon",
    remainingDays: 15,
    contractFile: "lease_agreement_006.pdf",
  },
];

export default function Agreements() {
  const [isLoading, setIsLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);
  const [filteredAgreements, setFilteredAgreements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAgreements(agreementsData);
      setFilteredAgreements(agreementsData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = agreements.filter((agreement) => {
      const matchesSearch =
        agreement.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agreement.tenant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || agreement.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredAgreements(filtered);
  }, [searchTerm, statusFilter, agreements, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleView = (agreement) => {
    setSelectedAgreement(agreement);
    setIsDrawerOpen(true);
  };

  const handleEdit = (agreement) => {
    setSelectedAgreement(agreement);
    setIsModalOpen(true);
  };

  const handleDelete = (agreement) => {
    setSelectedAgreement(agreement);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const updatedAgreements = agreements.filter(
      (a) => a.id !== selectedAgreement.id,
    );
    setAgreements(updatedAgreements);
    setIsDeleteConfirmOpen(false);
    toast.success("Agreement deleted successfully");
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleDownloadPDF = (agreement) => {
    toast.success(`Downloading ${agreement.contractFile}`);
  };

  const handleFormSubmit = (data) => {
    if (isModalOpen) {
      // Edit existing
      const updatedAgreements = agreements.map((a) =>
        a.id === selectedAgreement.id ? { ...a, ...data } : a,
      );
      setAgreements(updatedAgreements);
      toast.success("Agreement updated successfully");
    } else {
      // Create new
      const newAgreement = {
        id: agreements.length + 1,
        ...data,
        remainingDays: Math.ceil(
          (new Date(data.endDate) - new Date()) / (1000 * 60 * 60 * 24),
        ),
      };
      setAgreements([...agreements, newAgreement]);
      toast.success("Agreement created successfully");
    }
    setIsModalOpen(false);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      {/* Gradient Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-6 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
        <Breadcrumb white={true} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Agreements</h1>
            <p className="text-white/80 mt-1">
              Manage rental contracts between property owners and tenants
            </p>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Agreement
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards isLoading={isLoading} />

      {/* Filters */}
      <AgreementFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Table */}
      <AgreementTable
        agreements={filteredAgreements}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
        onDownloadPDF={handleDownloadPDF}
        onCreate={handleCreate}
      />

      {/* View Drawer */}
      <AgreementDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        agreement={selectedAgreement}
        onDownloadPDF={handleDownloadPDF}
        onEdit={(agreement) => {
          setIsDrawerOpen(false);
          handleEdit(agreement);
        }}
      />

      {/* Create/Edit Form */}
      <AgreementForm
        isOpen={isModalOpen || isCreateModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsCreateModalOpen(false);
        }}
        onSubmit={handleFormSubmit}
        agreement={selectedAgreement}
        isEdit={isModalOpen}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        agreement={selectedAgreement}
      />
    </div>
  );
}
