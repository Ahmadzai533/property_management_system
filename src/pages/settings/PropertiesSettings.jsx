import {
  Building2,
  Layers,
  Home,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

export default function PropertiesSettings() {
  const { t } = useLocalization();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.properties.title")}
        description={t("settings.properties.description")}
        badge={t("settings.badges.portfolioControls")}
        actions={[
          <Button key="save" variant="success">
            {t("settings.actions.saveCatalog")}
          </Button>,
          <Button key="add" variant="secondary">
            {t("settings.actions.addTemplate")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.properties.catalog.title")}
            description={t("settings.properties.catalog.description")}
            icon={Building2}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.propertyTypes")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Residential, Commercial, Mixed"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.buildingTypes")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Apartment, Villa, Office"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.unitTypes")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Studio, 1BR, 2BR"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.amenities")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Parking, Gym, Balcony"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title={t("settings.properties.portfolioRules.title")}
            description={t("settings.properties.portfolioRules.description")}
            icon={Layers}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.floorConfiguration")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Ground, 1st, 2nd, Roof"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.propertyCategories")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Premium, Standard, Economy"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.occupancyStatus")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.properties.occupancyStatus.vacant")}</option>
                  <option>{t("settings.properties.occupancyStatus.occupied")}</option>
                  <option>{t("settings.properties.occupancyStatus.reserved")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.properties.fields.leaseTypes")}</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Annual, Monthly, Temporary"
                />
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}