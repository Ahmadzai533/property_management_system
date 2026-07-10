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

const cards = [
  {
    title: "General Settings",
    description:
      "Manage core company details, business hours, and default experience controls.",
    options: 14,
    icon: Settings,
    route: "/settings/general",
  },
  {
    title: "Localization & Language",
    description:
      "Configure Dari, Pashto, English, time zones, currency, and layout direction.",
    options: 12,
    icon: Languages,
    route: "/settings/localization",
  },
  {
    title: "Theme & Appearance",
    description:
      "Adjust themes, accent colors, sidebar layouts, density, and visual polish.",
    options: 10,
    icon: Palette,
    route: "/settings/appearance",
  },
  {
    title: "Users & Roles",
    description:
      "Govern access, departments, teams, permissions, and login history.",
    options: 9,
    icon: Users,
    route: "/settings/users-roles",
  },
  {
    title: "Property Settings",
    description:
      "Set up property types, units, amenities, categories, and lease behavior.",
    options: 8,
    icon: Building2,
    route: "/settings/properties",
  },
  {
    title: "Financial Settings",
    description:
      "Control payment methods, taxes, invoice formats, bank accounts, and exchanges.",
    options: 10,
    icon: DollarSign,
    route: "/settings/financial",
  },
  {
    title: "Agreement Settings",
    description:
      "Standardize templates, renewal rules, deposits, penalties, and signatures.",
    options: 7,
    icon: FileText,
    route: "/settings/agreement",
  },
  {
    title: "Booking Settings",
    description:
      "Manage reservation rules, cancellations, check-in and check-out policies.",
    options: 7,
    icon: CalendarClock,
    route: "/settings/booking",
  },
  {
    title: "Maintenance Settings",
    description:
      "Define maintenance categories, work orders, priorities, vendors, and services.",
    options: 6,
    icon: Wrench,
    route: "/settings/maintenance",
  },
  {
    title: "Notification Settings",
    description: "Fine-tune email, SMS, push, and in-app alert preferences.",
    options: 9,
    icon: BellRing,
    route: "/settings/notifications",
  },
  {
    title: "Security Settings",
    description:
      "Protect the platform with 2FA, policies, session limits, and monitoring.",
    options: 9,
    icon: ShieldCheck,
    route: "/settings/security",
  },
  {
    title: "Backup & Restore",
    description:
      "Schedule backups, monitor history, and restore critical business data.",
    options: 6,
    icon: Database,
    route: "/settings/backup",
  },
  {
    title: "Integrations",
    description:
      "Connect payments, calendars, maps, webhooks, and Microsoft 365 services.",
    options: 7,
    icon: Plug,
    route: "/settings/integrations",
  },
  {
    title: "Audit Logs",
    description:
      "Review system activity, user actions, IP data, and support investigations.",
    options: 8,
    icon: FileText,
    route: "/settings/audit-logs",
  },
];

export default function SettingsIndex() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Enterprise Settings Hub"
        description="Centralize platform policies, integrations, security controls, and operational preferences in one premium workspace."
        badge="Enterprise"
        actions={[
          <Button
            key="save"
            variant="secondary"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            Export Profile
          </Button>,
          <Button
            key="apply"
            variant="secondary"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            Sync Defaults
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
            Configured Areas
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            14
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Integrations
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            7
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Security Status
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Protected
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
