import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Languages,
  Palette,
  Users,
  DollarSign,
  BellRing,
  ShieldCheck,
  Database,
  Plug,
  FileText,
  ClipboardList,
  CalendarClock,
  Wrench,
  Settings,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsCard from "../../components/Settings/SettingsCard";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

export default function SettingsIndex() {
  const navigate = useNavigate();
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  const cards = [
    {
      title: t("settings.cards.general.title"),
      description: t("settings.cards.general.description"),
      options: 14,
      icon: Settings,
      route: "/settings/general",
    },
    {
      title: t("settings.cards.localization.title"),
      description: t("settings.cards.localization.description"),
      options: 12,
      icon: Languages,
      route: "/settings/localization",
    },
    {
      title: t("settings.cards.appearance.title"),
      description: t("settings.cards.appearance.description"),
      options: 10,
      icon: Palette,
      route: "/settings/appearance",
    },
    {
      title: t("settings.cards.usersRoles.title"),
      description: t("settings.cards.usersRoles.description"),
      options: 9,
      icon: Users,
      route: "/settings/users-roles",
    },
    {
      title: t("settings.cards.properties.title"),
      description: t("settings.cards.properties.description"),
      options: 8,
      icon: Building2,
      route: "/settings/properties",
    },
    {
      title: t("settings.cards.financial.title"),
      description: t("settings.cards.financial.description"),
      options: 10,
      icon: DollarSign,
      route: "/settings/financial",
    },
    {
      title: t("settings.cards.agreement.title"),
      description: t("settings.cards.agreement.description"),
      options: 7,
      icon: FileText,
      route: "/settings/agreement",
    },
    {
      title: t("settings.cards.booking.title"),
      description: t("settings.cards.booking.description"),
      options: 7,
      icon: CalendarClock,
      route: "/settings/booking",
    },
    {
      title: t("settings.cards.maintenance.title"),
      description: t("settings.cards.maintenance.description"),
      options: 6,
      icon: Wrench,
      route: "/settings/maintenance",
    },
    {
      title: t("settings.cards.notifications.title"),
      description: t("settings.cards.notifications.description"),
      options: 9,
      icon: BellRing,
      route: "/settings/notifications",
    },
    {
      title: t("settings.cards.security.title"),
      description: t("settings.cards.security.description"),
      options: 9,
      icon: ShieldCheck,
      route: "/settings/security",
    },
    {
      title: t("settings.cards.backup.title"),
      description: t("settings.cards.backup.description"),
      options: 6,
      icon: Database,
      route: "/settings/backup",
    },
    {
      title: t("settings.cards.integrations.title"),
      description: t("settings.cards.integrations.description"),
      options: 7,
      icon: Plug,
      route: "/settings/integrations",
    },
    {
      title: t("settings.cards.auditLogs.title"),
      description: t("settings.cards.auditLogs.description"),
      options: 8,
      icon: FileText,
      route: "/settings/audit-logs",
    },
  ];

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.index.title")}
        description={t("settings.index.description")}
        badge={t("settings.badges.enterprise")}
        actions={[
          <Button
            key="export"
            variant="secondary"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            {t("settings.actions.exportProfile")}
          </Button>,
          <Button
            key="sync"
            variant="secondary"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            {t("settings.actions.syncDefaults")}
          </Button>,
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("settings.stats.configuredAreas")}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            14
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("settings.stats.activeIntegrations")}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            7
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("settings.stats.securityStatus")}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            {t("settings.stats.protected")}
          </p>
        </div>
      </motion.div>

      <div className="grid gap-5 xl:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <SettingsCard {...card} onClick={() => navigate(card.route)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}