// src/pages/agreements/components/AgreementDrawer.jsx
import { motion } from "framer-motion";
import {
  X,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Download,
  Edit,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  CalendarDays,
  Banknote,
  Home,
  Users,
  FileCheck,
  Shield,
} from "lucide-react";
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

export default function AgreementDrawer({
  isOpen,
  onClose,
  agreement,
  onDownloadPDF,
  onEdit,
}) {
  if (!isOpen || !agreement) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex justify-end min-h-screen">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-white dark:bg-gray-900 shadow-2xl w-full max-w-2xl h-full overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#6D28D9]/10 to-[#8B5CF6]/10 dark:from-[#6D28D9]/20 dark:to-[#8B5CF6]/20 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Agreement Details
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {agreement.property} - {agreement.tenant}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Status Section */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center gap-3">
                {getStatusBadge(agreement.status)}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {agreement.remainingDays > 0
                    ? `${agreement.remainingDays} days remaining`
                    : "Contract ended"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDownloadPDF(agreement)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Download Contract"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(agreement)}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  title="Edit Agreement"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Property Details
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {agreement.property}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  {agreement.propertyAddress}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Home className="w-3 h-3" />
                  Unit: {agreement.unit || "N/A"}
                </p>
              </div>
            </div>

            {/* Tenant Details */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Tenant Details
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {agreement.tenant}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  {agreement.tenantEmail}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  {agreement.tenantPhone}
                </p>
              </div>
            </div>

            {/* Financial Details */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Financial Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Monthly Rent
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${agreement.rentAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Security Deposit
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${agreement.deposit.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Contract Dates */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Contract Dates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Start Date
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    <DateText value={agreement.startDate} />
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    End Date
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    <DateText value={agreement.endDate} />
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Contract Duration
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Math.ceil(
                      (new Date(agreement.endDate) -
                        new Date(agreement.startDate)) /
                        (1000 * 60 * 60 * 24 * 30),
                    )}{" "}
                    months
                  </span>
                </div>
              </div>
            </div>

            {/* Contract File */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Contract File
              </h3>
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {agreement.contractFile}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF Document • 1.2 MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onDownloadPDF(agreement)}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Download
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => onEdit(agreement)}
                className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Agreement
              </button>
              <button
                onClick={() => onDownloadPDF(agreement)}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
