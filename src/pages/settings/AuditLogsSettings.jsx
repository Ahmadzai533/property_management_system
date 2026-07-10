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

const logs = [
  {
    user: "Amina Khan",
    module: "Security",
    action: "2FA Enabled",
    description: "Enabled MFA for admin account",
    ip: "192.168.1.12",
    browser: "Chrome",
    device: "Windows Laptop",
    date: "2026-07-06 09:15",
  },
  {
    user: "Hassan Ali",
    module: "Financial",
    action: "Invoice Created",
    description: "Generated invoice INV-00124",
    ip: "10.0.0.5",
    browser: "Edge",
    device: "iPhone",
    date: "2026-07-05 17:20",
  },
  {
    user: "Sara Khan",
    module: "Booking",
    action: "Booking Updated",
    description: "Adjusted reservation window",
    ip: "172.16.1.8",
    browser: "Firefox",
    device: "MacBook",
    date: "2026-07-05 14:10",
  },
];

export default function AuditLogsSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Audit Logs"
        description="Review administrative activity, access events, and operational changes with search and export support."
        badge="Compliance"
        actions={[
          <Button key="export" variant="success">
            Export Logs
          </Button>,
          <Button key="print" variant="secondary">
            Print
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Activity Log"
            description="Search, filter, and export audit details."
            icon={FileText}
          >
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  className="bg-transparent outline-none"
                  placeholder="Search logs"
                />
              </label>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                Filter
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                Export
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                Print
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                      User
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Module
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                      IP
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                  {logs.map((log) => (
                    <tr key={log.user + log.date}>
                      <td className="px-4 py-3">{log.user}</td>
                      <td className="px-4 py-3">{log.module}</td>
                      <td className="px-4 py-3">{log.action}</td>
                      <td className="px-4 py-3">{log.description}</td>
                      <td className="px-4 py-3">{log.ip}</td>
                      <td className="px-4 py-3">
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