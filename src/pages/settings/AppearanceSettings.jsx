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

const accentColors = ["#6D28D9", "#2563EB", "#0891B2", "#059669", "#DC2626"];

export default function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Theme & Appearance"
        description="Fine-tune the platform visual system, spacing, and interactive surface styles without changing the core experience."
        badge="Visual System"
        actions={[
          <Button key="save" variant="success">
            Apply Theme
          </Button>,
          <Button key="preview" variant="secondary">
            Live Preview
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Theme Preferences"
            description="Choose the default visual mode and accent styling."
            icon={Palette}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Theme Mode</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                  <option>System Theme</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Accent Color</span>
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
                <span className="mb-2 block">Sidebar Style</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Default</option>
                  <option>Compact</option>
                  <option>Modern</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Dashboard Layout</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Balanced</option>
                  <option>Compact</option>
                  <option>Executive</option>
                </select>
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Interface Density"
            description="Tune typography, spacing, and card styling for comfort and productivity."
            icon={LayoutGrid}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Font Size</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Border Radius</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Rounded</option>
                  <option>Sharp</option>
                  <option>Soft</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Card Style</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Elevated</option>
                  <option>Outlined</option>
                  <option>Minimal</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Table Density</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Compact</option>
                  <option>Comfortable</option>
                  <option>Spacious</option>
                </select>
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
