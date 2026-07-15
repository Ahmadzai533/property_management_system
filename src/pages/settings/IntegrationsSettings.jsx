import {
  Plug,
  CreditCard,
  MapPin,
  CalendarDays,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

const integrations = [
  { titleKey: "settings.integrations.services.paymentGateway", status: "Connected", color: "emerald" },
  { titleKey: "settings.integrations.services.googleMaps", status: "Connected", color: "emerald" },
  { titleKey: "settings.integrations.services.googleCalendar", status: "Pending", color: "amber" },
  { titleKey: "settings.integrations.services.outlookCalendar", status: "Connected", color: "emerald" },
  { titleKey: "settings.integrations.services.microsoft365", status: "Pending", color: "amber" },
  { titleKey: "settings.integrations.services.webhooks", status: "Connected", color: "emerald" },
];

export default function IntegrationsSettings() {
  const { t } = useLocalization();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.integrations.title")}
        description={t("settings.integrations.description")}
        badge={t("settings.badges.connectedServices")}
        actions={[
          <Button key="save" variant="success">
            {t("settings.actions.saveConnections")}
          </Button>,
          <Button key="add" variant="secondary">
            {t("settings.actions.addIntegration")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.integrations.platformConnections.title")}
            description={t("settings.integrations.platformConnections.description")}
            icon={Plug}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {integrations.map((item) => (
                <div
                  key={item.titleKey}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {t(item.titleKey)}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.color === "emerald"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status === "Connected"
                        ? t("settings.integrations.status.connected")
                        : t("settings.integrations.status.pending")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {t("settings.integrations.serviceDescription")}
                  </p>
                </div>
              ))}
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}