import { NavLink } from "react-router-dom";
import {
  SlidersHorizontal,
  Languages,
  Palette,
  Users,
  Building2,
  DollarSign,
  BellRing,
  ShieldCheck,
  Database,
  Plug,
  FileText,
  ClipboardList,
} from "lucide-react";

const sections = [
  { title: "Overview", route: "/settings", icon: SlidersHorizontal },
  { title: "General", route: "/settings/general", icon: ClipboardList },
  { title: "Localization", route: "/settings/localization", icon: Languages },
  { title: "Appearance", route: "/settings/appearance", icon: Palette },
  { title: "Users & Roles", route: "/settings/users-roles", icon: Users },
  { title: "Properties", route: "/settings/properties", icon: Building2 },
  { title: "Financial", route: "/settings/financial", icon: DollarSign },
  { title: "Notifications", route: "/settings/notifications", icon: BellRing },
  { title: "Security", route: "/settings/security", icon: ShieldCheck },
  { title: "Backup", route: "/settings/backup", icon: Database },
  { title: "Integrations", route: "/settings/integrations", icon: Plug },
  { title: "Audit Logs", route: "/settings/audit-logs", icon: FileText },
];

const SettingsSidebar = () => {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:sticky xl:top-4 xl:h-fit">
      <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        Settings Hub
      </p>
      <div className="space-y-1">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.route}
              to={item.route}
              end={item.route === "/settings"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-violet-100 text-violet-700 shadow-sm dark:bg-slate-800 dark:text-violet-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default SettingsSidebar;
