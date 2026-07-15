import {
  Palette,
  LayoutGrid,
  Type,
  Circle,
  Monitor,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

const accentColors = ["#6D28D9", "#2563EB", "#0891B2", "#059669", "#DC2626"];

export default function AppearanceSettings() {
  const { t } = useLocalization();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.appearance.title")}
        description={t("settings.appearance.description")}
        badge={t("settings.badges.visualSystem")}
        actions={[
          <Button key="save" variant="success">
            {t("settings.actions.applyTheme")}
          </Button>,
          <Button key="preview" variant="secondary">
            {t("settings.actions.livePreview")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.appearance.themePreferences.title")}
            description={t("settings.appearance.themePreferences.description")}
            icon={Palette}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.themeMode")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.themes.light")}</option>
                  <option>{t("settings.appearance.themes.dark")}</option>
                  <option>{t("settings.appearance.themes.system")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.accentColor")}</span>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color}
                      className="h-9 w-9 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.sidebarStyle")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.sidebarStyles.default")}</option>
                  <option>{t("settings.appearance.sidebarStyles.compact")}</option>
                  <option>{t("settings.appearance.sidebarStyles.modern")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.dashboardLayout")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.dashboardLayouts.balanced")}</option>
                  <option>{t("settings.appearance.dashboardLayouts.compact")}</option>
                  <option>{t("settings.appearance.dashboardLayouts.executive")}</option>
                </select>
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title={t("settings.appearance.interfaceDensity.title")}
            description={t("settings.appearance.interfaceDensity.description")}
            icon={LayoutGrid}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.fontSize")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.fontSizes.small")}</option>
                  <option selected>{t("settings.appearance.fontSizes.medium")}</option>
                  <option>{t("settings.appearance.fontSizes.large")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.borderRadius")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.borderStyles.rounded")}</option>
                  <option>{t("settings.appearance.borderStyles.sharp")}</option>
                  <option>{t("settings.appearance.borderStyles.soft")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.cardStyle")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.cardStyles.elevated")}</option>
                  <option>{t("settings.appearance.cardStyles.outlined")}</option>
                  <option>{t("settings.appearance.cardStyles.minimal")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.appearance.fields.tableDensity")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.appearance.tableDensities.compact")}</option>
                  <option>{t("settings.appearance.tableDensities.comfortable")}</option>
                  <option>{t("settings.appearance.tableDensities.spacious")}</option>
                </select>
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}