import {
  Users,
  Lock,
  ShieldCheck,
  Building2,
  Clock3,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";

export default function UsersRolesSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Users & Roles"
        description="Manage governance, permissions, departments, teams, and account security policies with a clear enterprise structure."
        badge="Access Control"
        actions={[
          <Button key="save" variant="success">
            Save Policy
          </Button>,
          <Button key="invite" variant="secondary">
            Invite User
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Administration"
            description="Configure user lifecycle and access policies."
            icon={Users}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Default Role</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Property Manager</option>
                  <option>Finance Officer</option>
                  <option>Administrator</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Departments</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Operations, Finance, Leasing"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Teams</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Escalations, Support, Leasing"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Password Policy</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="12+ chars, 2FA required"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Security Controls"
            description="Protect access with login rules, session control, and monitoring."
            icon={ShieldCheck}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Session Timeout</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="30 minutes"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Maximum Login Attempts</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="5"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Trusted Devices</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="3 devices per account"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">API Access</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Enabled</option>
                  <option>Limited</option>
                  <option>Disabled</option>
                </select>
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
