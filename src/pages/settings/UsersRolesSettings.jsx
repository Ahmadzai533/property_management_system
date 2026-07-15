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
import { useLocalization } from "../../hooks/useLocalization";

export default function UsersRolesSettings() {
  const { t } = useLocalization();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.usersRoles.title")}
        description={t("settings.usersRoles.description")}
        badge={t("settings.badges.accessControl")}
        actions={[
          <Button key="save" variant="success">
            {t("settings.actions.savePolicy")}
          </Button>,
          <Button key="invite" variant="secondary">
            {t("settings.actions.inviteUser")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.usersRoles.administration.title")}
            description={t("settings.usersRoles.administration.description")}
            icon={Users}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.defaultRole")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.usersRoles.roles.propertyManager")}</option>
                  <option>{t("settings.usersRoles.roles.financeOfficer")}</option>
                  <option>{t("settings.usersRoles.roles.administrator")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.departments")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Operations, Finance, Leasing"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.teams")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Escalations, Support, Leasing"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.passwordPolicy")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="12+ chars, 2FA required"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title={t("settings.usersRoles.securityControls.title")}
            description={t("settings.usersRoles.securityControls.description")}
            icon={ShieldCheck}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.sessionTimeout")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="30 minutes"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.maxLoginAttempts")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="5"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.trustedDevices")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="3 devices per account"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.usersRoles.fields.apiAccess")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.usersRoles.apiAccessLevels.enabled")}</option>
                  <option>{t("settings.usersRoles.apiAccessLevels.limited")}</option>
                  <option>{t("settings.usersRoles.apiAccessLevels.disabled")}</option>
                </select>
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}