// src/pages/properties/UnitDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Edit,
  Archive,
  Trash2,
  Home,
  Users,
  DollarSign,
  Calendar,
  Square,
  Bed,
  Bath,
  Key,
  AlertCircle,
  Phone,
  Mail,
  FileText,
  Clock,
  Package,
} from "lucide-react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Button from "../../../components/common/Button";
import PropertyStatusBadge from "../../../components/properties/PropertyStatusBadge";
import PropertyGallery from "../../../components/properties/PropertyGallery";
import { useUnit } from "../../../hooks/useUnit";

const UnitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { unit, loading } = useUnit(id);

  const handleEdit = () => {
    navigate(`/properties/units/edit/${id}`);
  };

  const handleArchive = () => {
    console.log("Archive unit:", id);
  };

  const handleDelete = () => {
    console.log("Delete unit:", id);
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "/" },
    { label: "Properties", path: "/properties" },
    { label: "All Units", path: "/properties/units" },
    {
      label: unit?.unitNumber ? `Unit ${unit.unitNumber}` : "Unit Details",
      active: true,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Unit not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            The unit you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => navigate("/properties/units")}
            className="mt-4"
          >
            Back to Units
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/properties/units")}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Unit {unit.unitNumber}</h1>
                <p className="text-white/80 mt-0.5">
                  {unit.propertyName} • {unit.type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleArchive}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 transition-colors rounded-lg text-white font-medium"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <PropertyGallery images={[unit.image] || []} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Unit Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Unit Number
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {unit.unitNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Property
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {unit.propertyName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Unit Type
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {unit.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Floor
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {unit.floor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Size
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {unit.size} sqft
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <PropertyStatusBadge status={unit.status} />
                  </div>
                </div>
              </div>

              {unit.tenant && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tenant Information
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {unit.tenant}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Lease Status: {unit.leaseStatus}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Financial Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Monthly Rent
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${unit.rent}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Security Deposit
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${unit.rent * 2}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Maintenance Fee
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${Math.round(unit.rent * 0.1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {unit.status === "Vacant" && (
                    <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                      Assign Tenant
                    </button>
                  )}
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    Mark Maintenance
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetails;
