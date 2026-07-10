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

export default function PropertiesSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Property Settings"
        description="Standardize property classifications, amenities, occupancy rules, and lease structures across your portfolio."
        badge="Portfolio Controls"
        actions={[
          <Button key="save" variant="success">
            Save Catalog
          </Button>,
          <Button key="add" variant="secondary">
            Add Template
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Property Catalog"
            description="Manage property types, building types, and unit categories."
            icon={Building2}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Property Types</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Residential, Commercial, Mixed"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Building Types</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Apartment, Villa, Office"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Unit Types</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Studio, 1BR, 2BR"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Amenities</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Parking, Gym, Balcony"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Portfolio Rules"
            description="Configure occupancy status, lease models, and floor planning."
            icon={Layers}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Floor Configuration</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Ground, 1st, 2nd, Roof"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Property Categories</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Premium, Standard, Economy"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Occupancy Status</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                  <option>Vacant</option>
                  <option>Occupied</option>
                  <option>Reserved</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Lease Types</span>
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
