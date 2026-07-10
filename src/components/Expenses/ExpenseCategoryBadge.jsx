import {
  Wrench,
  Hammer,
  Zap,
  Droplets,
  Radio,
  Sparkles,
  Shield,
  Users,
  Fuel,
  ClipboardList,
  Landmark,
  Briefcase,
  Package,
  Sofa,
  CircleEllipsis,
} from "lucide-react";

const categoryMeta = {
  Maintenance: {
    icon: Wrench,
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  Repairs: {
    icon: Hammer,
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  },
  Utilities: {
    icon: Zap,
    className:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400",
  },
  Electricity: {
    icon: Zap,
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  Water: {
    icon: Droplets,
    className: "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
  },
  Internet: {
    icon: Radio,
    className:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
  },
  Cleaning: {
    icon: Sparkles,
    className:
      "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:text-fuchsia-400",
  },
  Security: {
    icon: Shield,
    className:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  },
  "Staff Salary": {
    icon: Users,
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  },
  Fuel: {
    icon: Fuel,
    className:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  },
  "Office Supplies": {
    icon: ClipboardList,
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  "Property Tax": {
    icon: Landmark,
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  },
  Insurance: {
    icon: Briefcase,
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  },
  Marketing: {
    icon: Package,
    className:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
  },
  Legal: {
    icon: Briefcase,
    className:
      "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
  },
  Equipment: {
    icon: Package,
    className:
      "bg-lime-100 text-lime-700 dark:bg-lime-900/20 dark:text-lime-400",
  },
  Furniture: {
    icon: Sofa,
    className:
      "bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400",
  },
  Miscellaneous: {
    icon: CircleEllipsis,
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
};

export function ExpenseCategoryBadge({ category }) {
  const meta = categoryMeta[category] || categoryMeta.Miscellaneous;
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {category}
    </span>
  );
}
