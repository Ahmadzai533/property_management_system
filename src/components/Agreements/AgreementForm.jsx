// src/pages/agreements/components/AgreementForm.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText } from "lucide-react";

export default function AgreementForm({
  isOpen,
  onClose,
  onSubmit,
  agreement,
  isEdit,
}) {
  const [formData, setFormData] = useState({
    property: "",
    propertyAddress: "",
    tenant: "",
    tenantEmail: "",
    tenantPhone: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    deposit: "",
    status: "Active",
    contractFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (agreement && isEdit) {
      setFormData({
        property: agreement.property || "",
        propertyAddress: agreement.propertyAddress || "",
        tenant: agreement.tenant || "",
        tenantEmail: agreement.tenantEmail || "",
        tenantPhone: agreement.tenantPhone || "",
        startDate: agreement.startDate || "",
        endDate: agreement.endDate || "",
        rentAmount: agreement.rentAmount || "",
        deposit: agreement.deposit || "",
        status: agreement.status || "Active",
        contractFile: null,
      });
    } else {
      setFormData({
        property: "",
        propertyAddress: "",
        tenant: "",
        tenantEmail: "",
        tenantPhone: "",
        startDate: "",
        endDate: "",
        rentAmount: "",
        deposit: "",
        status: "Active",
        contractFile: null,
      });
    }
  }, [agreement, isEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.property) newErrors.property = "Property is required";
    if (!formData.tenant) newErrors.tenant = "Tenant is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.rentAmount) newErrors.rentAmount = "Rent amount is required";
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const data = {
        ...formData,
        rentAmount: parseFloat(formData.rentAmount),
        deposit: parseFloat(formData.deposit) || 0,
      };
      onSubmit(data);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, contractFile: file });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6D28D9]/10 to-[#8B5CF6]/10 dark:from-[#6D28D9]/20 dark:to-[#8B5CF6]/20 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEdit ? "Edit Agreement" : "Create New Agreement"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Property */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.property}
                onChange={(e) =>
                  setFormData({ ...formData, property: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.property
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">Select Property</option>
                <option value="Sunset Towers">Sunset Towers</option>
                <option value="Ocean View Apartments">
                  Ocean View Apartments
                </option>
                <option value="Garden Heights">Garden Heights</option>
                <option value="Silver Lake Residences">
                  Silver Lake Residences
                </option>
                <option value="Hollywood Hills">Hollywood Hills</option>
              </select>
              {errors.property && (
                <p className="text-sm text-red-600 mt-1">{errors.property}</p>
              )}
            </div>

            {/* Property Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Address
              </label>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) =>
                  setFormData({ ...formData, propertyAddress: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main St, City, State"
              />
            </div>

            {/* Tenant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tenant <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.tenant}
                onChange={(e) =>
                  setFormData({ ...formData, tenant: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.tenant
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">Select Tenant</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
                <option value="Emma Wilson">Emma Wilson</option>
                <option value="David Chen">David Chen</option>
              </select>
              {errors.tenant && (
                <p className="text-sm text-red-600 mt-1">{errors.tenant}</p>
              )}
            </div>

            {/* Tenant Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tenant Email
                </label>
                <input
                  type="email"
                  value={formData.tenantEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tenant@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tenant Phone
                </label>
                <input
                  type="tel"
                  value={formData.tenantPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantPhone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.startDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.endDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Rent & Deposit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rent Amount ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.rentAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, rentAmount: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.rentAmount
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="0.00"
                  step="0.01"
                />
                {errors.rentAmount && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.rentAmount}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Security Deposit ($)
                </label>
                <input
                  type="number"
                  value={formData.deposit}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>

            {/* Contract File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contract File
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drag & drop PDF file here or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Max file size: 10MB
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {formData.contractFile && (
                <div className="mt-2 flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formData.contractFile.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {(formData.contractFile.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Agreement"
                    : "Create Agreement"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
