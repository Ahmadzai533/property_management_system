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
import { useLocalization } from "../../hooks/useLocalization"; // Adjust path as needed

const SettingsSidebar = () => {
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  const sections = [
    { titleKey: "settings.sidebar.overview", route: "/settings", icon: SlidersHorizontal },
    { titleKey: "settings.sidebar.general", route: "/settings/general", icon: ClipboardList },
    { titleKey: "settings.sidebar.localization", route: "/settings/localization", icon: Languages },
    { titleKey: "settings.sidebar.appearance", route: "/settings/appearance", icon: Palette },
    { titleKey: "settings.sidebar.usersRoles", route: "/settings/users-roles", icon: Users },
    { titleKey: "settings.sidebar.properties", route: "/settings/properties", icon: Building2 },
    { titleKey: "settings.sidebar.financial", route: "/settings/financial", icon: DollarSign },
    { titleKey: "settings.sidebar.notifications", route: "/settings/notifications", icon: BellRing },
    { titleKey: "settings.sidebar.security", route: "/settings/security", icon: ShieldCheck },
    { titleKey: "settings.sidebar.backup", route: "/settings/backup", icon: Database },
    { titleKey: "settings.sidebar.integrations", route: "/settings/integrations", icon: Plug },
    { titleKey: "settings.sidebar.auditLogs", route: "/settings/audit-logs", icon: FileText },
  ];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:sticky xl:top-4 xl:h-fit">
      <p
        className={`px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {t("settings.sidebar.title")}
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
                } ${isRTL ? "flex-row-reverse text-right" : ""}`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{t(item.titleKey)}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default SettingsSidebar;