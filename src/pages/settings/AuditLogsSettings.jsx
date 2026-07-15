import {
  FileText,
  Search,
  Filter,
  Download,
  Printer,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";
import DateText from "../../components/common/DateText";
import { useLocalization } from "../../hooks/useLocalization";

const logs = [
  {
    user: "Amina Khan",
    moduleKey: "settings.auditLogs.modules.security",
    actionKey: "settings.auditLogs.actions.twoFactorEnabled",
    description: "Enabled MFA for admin account",
    ip: "192.168.1.12",
    browser: "Chrome",
    device: "Windows Laptop",
    date: "2026-07-06 09:15",
  },
  {
    user: "Hassan Ali",
    moduleKey: "settings.auditLogs.modules.financial",
    actionKey: "settings.auditLogs.actions.invoiceCreated",
    description: "Generated invoice INV-00124",
    ip: "10.0.0.5",
    browser: "Edge",
    device: "iPhone",
    date: "2026-07-05 17:20",
  },
  {
    user: "Sara Khan",
    moduleKey: "settings.auditLogs.modules.booking",
    actionKey: "settings.auditLogs.actions.bookingUpdated",
    description: "Adjusted reservation window",
    ip: "172.16.1.8",
    browser: "Firefox",
    device: "MacBook",
    date: "2026-07-05 14:10",
  },
];

export default function AuditLogsSettings() {
  const { t, locale } = useLocalization();
  const isRTL = locale === "fa" || locale === "ps";

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.auditLogs.title")}
        description={t("settings.auditLogs.description")}
        badge={t("settings.badges.compliance")}
        actions={[
          <Button key="export" variant="success">
            {t("settings.actions.exportLogs")}
          </Button>,
          <Button key="print" variant="secondary">
            {t("settings.actions.print")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.auditLogs.activityLog.title")}
            description={t("settings.auditLogs.activityLog.description")}
            icon={FileText}
          >
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  className="bg-transparent outline-none"
                  placeholder={t("settings.auditLogs.placeholders.searchLogs")}
                />
              </label>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                {t("settings.auditLogs.actions.filter")}
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                {t("settings.auditLogs.actions.export")}
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                {t("settings.auditLogs.actions.print")}
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className={`px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("settings.auditLogs.table.user")}
                    </th>
                    <th className={`px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("settings.auditLogs.table.module")}
                    </th>
                    <th className={`px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("settings.auditLogs.table.action")}
                    </th>
                    <th className={`px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("settings.auditLogs.table.description")}
                    </th>
                    <th className={`px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("settings.auditLogs.table.ip")}
                    </th>
                    <th className={`px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("settings.auditLogs.table.date")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                  {logs.map((log) => (
                    <tr key={log.user + log.date}>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>{log.user}</td>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>{t(log.moduleKey)}</td>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>{t(log.actionKey)}</td>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>{log.description}</td>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>{log.ip}</td>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>
                        <DateText value={log.date} showTime />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}