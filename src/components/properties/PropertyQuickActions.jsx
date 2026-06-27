import { Eye, Pencil, Trash2 } from "lucide-react";

const baseButtonClassName =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto sm:flex-1";

const PropertyQuickActions = ({
  onView,
  onEdit,
  onDelete,
  className = "",
  disabled = false,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center ${className}`}
    >
      <button
        type="button"
        onClick={onView}
        disabled={disabled}
        className={`${baseButtonClassName} bg-[#6D28D9] text-white shadow-sm hover:bg-[#5B21B6] hover:shadow-lg hover:shadow-[#6D28D9]/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm`}
      >
        <Eye className="h-4 w-4" />
        View
      </button>

      <button
        type="button"
        onClick={onEdit}
        disabled={disabled}
        className={`${baseButtonClassName} border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0`}
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        className={`${baseButtonClassName} border border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100 hover:shadow-sm hover:shadow-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-950/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0`}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  );
};

export default PropertyQuickActions;
