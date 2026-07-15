import { useState } from "react";
import {
  Languages,
  Clock3,
  Globe,
  CalendarDays,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import LanguageSelector from "../../components/Settings/LanguageSelector";
import Button from "../../components/common/Button";
import { useLocalization } from "../../hooks/useLocalization";

export default function LocalizationSettings() {
  const [language, setLanguage] = useState("en");
  const [rtl, setRtl] = useState(false);
  const { t } = useLocalization();

  return (
    <div className="space-y-6">
      <SettingsHeader
        title={t("settings.localization.title")}
        description={t("settings.localization.description")}
        badge={t("settings.badges.internationalization")}
        actions={[
          <Button key="save" variant="success">
            {t("settings.actions.savePreferences")}
          </Button>,
          <Button key="preview" variant="secondary">
            {t("settings.actions.previewUI")}
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title={t("settings.localization.languageSelection.title")}
            description={t("settings.localization.languageSelection.description")}
            icon={Languages}
          >
            <LanguageSelector value={language} onChange={setLanguage} />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.defaultSystemLanguage")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option value="en">{t("settings.localization.english")}</option>
                  <option value="fa">{t("settings.localization.dari")}</option>
                  <option value="ps">{t("settings.localization.pashto")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.userPreferredLanguage")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option value="en">{t("settings.localization.english")}</option>
                  <option value="fa">{t("settings.localization.dari")}</option>
                  <option value="ps">{t("settings.localization.pashto")}</option>
                </select>
              </label>
            </div>
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {t("settings.localization.autoDetect.title")}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("settings.localization.autoDetect.description")}
                </p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-slate-300"
                defaultChecked
              />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {t("settings.localization.rtlSupport.title")}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("settings.localization.rtlSupport.description")}
                </p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-slate-300"
                checked={rtl}
                onChange={() => setRtl(!rtl)}
              />
            </label>
          </SettingsSection>

          <SettingsSection
            title={t("settings.localization.regionalFormats.title")}
            description={t("settings.localization.regionalFormats.description")}
            icon={Globe}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.firstDayOfWeek")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.localization.days.sunday")}</option>
                  <option>{t("settings.localization.days.monday")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.timeZone")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.localization.timezones.kabul")}</option>
                  <option>{t("settings.localization.timezones.utc")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.dateFormat")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.timeFormat")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.localization.timeFormats.24hour")}</option>
                  <option>{t("settings.localization.timeFormats.12hour")}</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.numberFormat")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>1,234.56</option>
                  <option>1.234,56</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">{t("settings.localization.fields.currency")}</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>{t("settings.localization.currencies.afn")}</option>
                  <option>{t("settings.localization.currencies.usd")}</option>
                  <option>{t("settings.localization.currencies.eur")}</option>
                </select>
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}