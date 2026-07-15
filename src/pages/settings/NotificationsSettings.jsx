import {
  BellRing,
  Mail,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

export default function NotificationsSettings() {
  const { t } = useLocalization();

  const toggles = [
    {
      labelKey: "settings.notifications.toggles.emailNotifications",
      descriptionKey: "settings.notifications.descriptions.emailNotifications",
    },
    {
      labelKey: "settings.notifications.toggles.smsNotifications",
      descriptionKey: "settings.notifications.descriptions.smsNotifications",
    },
    {
      labelKey: "settings.notifications.toggles.pushNotifications",
      descriptionKey: "settings.notifications.descriptions.pushNotifications",
    },
    {
      labelKey: "settings.notifications.toggles.inAppNotifications",
      descriptionKey: "settings.notifications.descriptions.inAppNotifications",
    },
    {
      labelKey: "settings.notifications.toggles.reminderSettings",
      descriptionKey: "settings.notifications.descriptions.reminderSettings",
    },
    {
      labelKey: "settings.notifications.toggles.paymentAlerts",
      descriptionKey: "settings.notifications.descriptions.paymentAlerts",
    },
    {
      labelKey: "settings.notifications.toggles.bookingAlerts",
      descriptionKey: "settings.notifications.descriptions.bookingAlerts",
    },
    {
      labelKey: "settings.notifications.toggles.maintenanceAlerts",
      descriptionKey: "settings.notifications.descriptions.maintenanceAlerts",
    },
  ];

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.notifications.title")}
        description={t("settings.notifications.description")}
        badge={t("settings.badges.communication")}
        actions={[
          <Button key="save" variant="success">
            {t("settings.actions.saveChannels")}
          </Button>,
          <Button key="test" variant="secondary">
            {t("settings.actions.sendTest")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.notifications.deliveryPreferences.title")}
            description={t("settings.notifications.deliveryPreferences.description")}
            icon={BellRing}
          >
            <div className="space-y-3">
              {toggles.map((toggle) => (
                <label
                  key={toggle.labelKey}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {t(toggle.labelKey)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t(toggle.descriptionKey)}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300"
                    defaultChecked
                  />
                </label>
              ))}
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}