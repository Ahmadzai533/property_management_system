// src/components/shared/StatusBadge.jsx
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

const statusConfig = {
  Active: {
    icon: CheckCircle,
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  Suspended: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
  Success: {
    icon: CheckCircle,
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  Failed: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
  Pending: {
    icon: Clock,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  Expired: {
    icon: AlertTriangle,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  },
};

export default function StatusBadge({ status }) {
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
}
