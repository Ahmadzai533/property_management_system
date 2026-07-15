import {
  Database,
  Download,
  RotateCcw,
  Clock3,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

const backupHistory = [
  { nameKey: "settings.backup.history.dailyFull", time: "08:00 AM", status: "Completed" },
  { nameKey: "settings.backup.history.incremental", time: "06:00 PM", status: "Completed" },
  { nameKey: "settings.backup.history.pointInTime", time: "Yesterday", status: "Pending" },
];

export default function BackupSettings() {
  const { t } = useLocalization();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.backup.title")}
        description={t("settings.backup.description")}
        badge={t("settings.badges.recoveryCenter")}
        actions={[
          <Button key="backup" variant="success">
            {t("settings.actions.runBackup")}
          </Button>,
          <Button key="restore" variant="secondary">
            {t("settings.actions.restore")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.backup.backupCenter.title")}
            description={t("settings.backup.backupCenter.description")}
            icon={Database}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.backup.fields.manualBackup")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.backup.options.enabled")}</option>
                  <option>{t("settings.backup.options.disabled")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.backup.fields.automaticBackup")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.backup.schedules.daily")}</option>
                  <option>{t("settings.backup.schedules.hourly")}</option>
                  <option>{t("settings.backup.schedules.weekly")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.backup.fields.backupSchedule")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Every day at 08:00"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.backup.fields.downloadBackup")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Available from secure storage"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title={t("settings.backup.backupHistory.title")}
            description={t("settings.backup.backupHistory.description")}
            icon={ShieldCheck}
          >
            <div className="space-y-3">
              {backupHistory.map((item) => (
                <div
                  key={item.nameKey}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {t(item.nameKey)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      item.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status === "Completed" 
                      ? t("settings.backup.status.completed") 
                      : t("settings.backup.status.pending")}
                  </span>
                </div>
              ))}
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}