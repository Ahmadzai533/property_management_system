import {
  DollarSign,
  Receipt,
  Landmark,
  Percent,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import SettingsHeader from "../../components/Settings/SettingsHeader";
import SettingsSection from "../../components/Settings/SettingsSection";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import Button from "../../components/common/Button";

export default function FinancialSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Financial Settings"
        description="Align payment operations, invoicing formats, tax rules, and banking preferences with your accounting process."
        badge="Finance Controls"
        actions={[
          <Button key="save" variant="success">
            Save Finance Rules
          </Button>,
          <Button key="export" variant="secondary">
            Export Template
          </Button>,
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <SettingsSidebar />
        <div className="space-y-6">
          <SettingsSection
            title="Transactions"
            description="Configure payment methods, invoices, receipts, and expenses."
            icon={DollarSign}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Payment Methods</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Cash, Bank Transfer, Card"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Tax Settings</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="10% VAT, 2% service fee"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Invoice Number Format</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="INV-{YYYY}-{MM}-{###}"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Receipt Number Format</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="RCP-{YYYY}-{###}"
                />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Accounting Setup"
            description="Manage expense categories, banks, fiscal year, and exchange configuration."
            icon={Landmark}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Expense Categories</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Maintenance, Utilities, Admin"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Bank Accounts</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="Main Operating, Reserve"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Financial Year</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="March - February"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="mb-2 block">Currency Exchange Rates</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                  defaultValue="1 USD = 70 AFN"
                />
              </label>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
