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

export default function LocalizationSettings() {
  const [language, setLanguage] = useState("en");
  const [rtl, setRtl] = useState(false);

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Localization & Language"
        description="Prepare the experience for Dari, Pashto, and English audiences with flexible regional formatting and direction support."
        badge="Internationalization"
        actions={[
          <Button key="save" variant="success">
            Save Preferences
          </Button>,
          <Button key="preview" variant="secondary">
            Preview UI
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Language Selection"
            description="Choose the default interface language and preferred experience."
            icon={Languages}
          >
            <LanguageSelector value={language} onChange={setLanguage} />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Default System Language</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option value="en">English</option>
                  <option value="fa">Dari</option>
                  <option value="ps">Pashto</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">User Preferred Language</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option value="en">English</option>
                  <option value="fa">Dari</option>
                  <option value="ps">Pashto</option>
                </select>
              </label>
            </div>
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Auto Detect Language
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Use browser or region-based language detection when available.
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
                  RTL / LTR Support
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Enable right-to-left layouts for Dari and Pashto interfaces.
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
            title="Regional Formats"
            description="Align date, time, number, and currency formats to your preferred region."
            icon={Globe}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">First Day of Week</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Sunday</option>
                  <option>Monday</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Time Zone</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Asia/Kabul</option>
                  <option>UTC</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Date Format</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Time Format</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>24 Hour</option>
                  <option>12 Hour</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Number Format</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>1,234.56</option>
                  <option>1.234,56</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Currency</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Afghan Afghani (AFN)</option>
                  <option>US Dollar (USD)</option>
                  <option>Euro (EUR)</option>
                </select>
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
