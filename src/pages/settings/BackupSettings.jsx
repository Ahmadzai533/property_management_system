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

const backupHistory = [
  { name: "Daily Full Backup", time: "08:00 AM", status: "Completed" },
  { name: "Incremental Backup", time: "06:00 PM", status: "Completed" },
  { name: "Point-in-Time Restore", time: "Yesterday", status: "Pending" },
];

export default function BackupSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Backup & Restore"
        description="Keep business continuity strong with scheduled backups, restore workflows, and verified recovery history."
        badge="Recovery Center"
        actions={[
          <Button key="backup" variant="success">
            Run Backup
          </Button>,
          <Button key="restore" variant="secondary">
            Restore
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Backup Center"
            description="Manage automatic backups, restore jobs, and download options."
            icon={Database}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Manual Backup</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Automatic Backup</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Daily at 08:00</option>
                  <option>Hourly</option>
                  <option>Weekly</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Backup Schedule</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Every day at 08:00"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Download Backup</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Available from secure storage"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Backup History"
            description="Review the most recent recovery and backup activities."
            icon={ShieldCheck}
          >
            <div className="space-y-3">
              {backupHistory.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${item.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {item.status}
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
