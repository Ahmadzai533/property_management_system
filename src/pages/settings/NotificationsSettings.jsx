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

const toggles = [
  {
    label: "Email Notifications",
    description: "Send weekly and instant email alerts.",
  },
  {
    label: "SMS Notifications",
    description: "Deliver critical updates by SMS.",
  },
  {
    label: "Push Notifications",
    description: "Reach users in the browser or app.",
  },
  {
    label: "In-App Notifications",
    description: "Surface messages directly in the dashboard.",
  },
  {
    label: "Reminder Settings",
    description: "Alert tenants and staff ahead of events.",
  },
  {
    label: "Payment Alerts",
    description: "Trigger when invoices or payments change.",
  },
  {
    label: "Booking Alerts",
    description: "Notify about booking confirmations and changes.",
  },
  {
    label: "Maintenance Alerts",
    description: "Notify teams when tickets need attention.",
  },
];

export default function NotificationsSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Notification Settings"
        description="Control the delivery channels, reminder cadence, and urgency of alerts across the platform."
        badge="Communication"
        actions={[
          <Button key="save" variant="success">
            Save Channels
          </Button>,
          <Button key="test" variant="secondary">
            Send Test
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Delivery Preferences"
            description="Enable or disable each notification channel for your organization."
            icon={BellRing}
          >
            <div className="space-y-3">
              {toggles.map((toggle) => (
                <label
                  key={toggle.label}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {toggle.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {toggle.description}
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
