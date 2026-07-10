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

const integrations = [
  { title: "Payment Gateway", status: "Connected", color: "emerald" },
  { title: "Google Maps", status: "Connected", color: "emerald" },
  { title: "Google Calendar", status: "Pending", color: "amber" },
  { title: "Outlook Calendar", status: "Connected", color: "emerald" },
  { title: "Microsoft 365", status: "Pending", color: "amber" },
  { title: "Webhooks", status: "Connected", color: "emerald" },
];

export default function IntegrationsSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Integrations"
        description="Link core external platforms for payments, mapping, scheduling, and automation workflows."
        badge="Connected Services"
        actions={[
          <Button key="save" variant="success">
            Save Connections
          </Button>,
          <Button key="add" variant="secondary">
            Add Integration
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Platform Connections"
            description="Review and configure your current integrations."
            icon={Plug}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {integrations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${item.color === "emerald" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Securely connect and manage this service from the enterprise
                    control center.
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
