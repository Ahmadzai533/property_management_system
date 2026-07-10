// src/pages/agreements/components/AgreementTable.jsx
import { motion } from "framer-motion";
import {
  Eye,
  Edit,
  Trash2,
  File,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react";
import Button from "../../components/common/Button";
import DateText from "../../components/common/DateText";

const statusConfig = {
  Active: {
    icon: CheckCircle,
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  "Expiring Soon": {
    icon: AlertTriangle,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  Expired: {
    icon: Clock,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  },
  Terminated: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
};

import { CheckCircle, AlertTriangle, Clock, XCircle } from "lucide-react";

const getStatusBadge = (status) => {
  const config = statusConfig[status] || statusConfig.Active;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

export default function AgreementTable({
  agreements,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onSort,
  sortField,
  sortDirection,
  onDownloadPDF,
  onCreate,
}) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        <div className="p-4 space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (agreements.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No agreements found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Get started by creating your first agreement
          </p>
          <Button
            onClick={onCreate}
            className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Agreement
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => onSort("property")}
              >
                <div className="flex items-center gap-1">
                  Property
                  {sortField === "property" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Tenant
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => onSort("startDate")}
              >
                <div className="flex items-center gap-1">
                  Start Date
                  {sortField === "startDate" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => onSort("endDate")}
              >
                <div className="flex items-center gap-1">
                  End Date
                  {sortField === "endDate" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                onClick={() => onSort("rentAmount")}
              >
                <div className="flex items-center gap-1">
                  Rent
                  {sortField === "rentAmount" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Remaining
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Contract
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agreement, index) => (
              <motion.tr
                key={agreement.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50/50 dark:bg-gray-800/30"
                }`}
                onClick={() => onView(agreement)}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  <div>
                    <div>{agreement.property}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {agreement.propertyAddress.split(",")[0]}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <div>{agreement.tenant}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {agreement.tenantEmail}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <DateText value={agreement.startDate} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <DateText value={agreement.endDate} />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  ${agreement.rentAmount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(agreement.status)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {agreement.remainingDays > 0 ? (
                    <span className="font-medium">
                      {agreement.remainingDays} days
                    </span>
                  ) : (
                    <span className="text-gray-400">Ended</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownloadPDF(agreement);
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Download Contract"
                  >
                    <File className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center justify-end gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      onClick={() => onView(agreement)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                    <button
                      className="p-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                      onClick={() => onEdit(agreement)}
                      title="Edit Agreement"
                    >
                      <Edit className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </button>
                    <button
                      className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      onClick={() => onDelete(agreement)}
                      title="Delete Agreement"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing 1-{agreements.length} of {agreements.length} agreements
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
