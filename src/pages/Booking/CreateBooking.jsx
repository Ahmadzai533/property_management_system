import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  CreditCard,
  User,
  Home,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/common/Button";
import { useToast } from "../../hooks/useToast";
import DateText from "../../components/common/DateText";

const steps = [
  { key: "customer", label: "Customer", icon: User },
  { key: "property", label: "Property", icon: Home },
  { key: "details", label: "Details", icon: CalendarDays },
  { key: "pricing", label: "Pricing", icon: CreditCard },
  { key: "payment", label: "Payment", icon: ShieldCheck },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "review", label: "Review", icon: CheckCircle2 },
];

const CreateBookingPage = () => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();

  const nextStep = () =>
    setStep((current) => Math.min(current + 1, steps.length - 1));
  const prevStep = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={[
          { label: "Dashboard", href: "/" },
          { label: "Bookings", href: "/bookings/list" },
          { label: "Create" },
        ]}
        title="Create Booking"
        subtitle="Create polished reservations with guided steps, live totals, and premium guest management."
      />

      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-wrap gap-2">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const active = index === step;
            const done = index < step;
            return (
              <div
                key={item.key}
                className={`flex items-center rounded-full border px-3 py-2 text-sm ${active ? "border-[#6D28D9] bg-[#6D28D9]/10 text-[#6D28D9]" : done ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300" : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {steps[step].label}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Complete the required information for a seamless reservation
              experience.
            </p>

            <div className="mt-5 space-y-4">
              {step === 0 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Phone
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      National ID
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                    </label>
                  </div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Address
                    <textarea className="mt-2 min-h-[96px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                  </label>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Property
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option>Sunset Residence</option>
                        <option>Marina Bay</option>
                        <option>Rosewood Villa</option>
                      </select>
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Unit
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option>A-204</option>
                        <option>P-101</option>
                        <option>V-08</option>
                      </select>
                    </label>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300">
                    Live availability: 3 units remain for this date range.
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Booking Date
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Check-in
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Check-out
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Adults
                      <input
                        type="number"
                        defaultValue="2"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Special Requests
                    <textarea className="mt-2 min-h-[96px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                  </label>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Rent
                      <input
                        defaultValue="3200"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Taxes
                      <input
                        defaultValue="320"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Service Charges
                      <input
                        defaultValue="180"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Discount
                      <input
                        defaultValue="0"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                    Estimated total amount:{" "}
                    <span className="font-semibold text-[#6D28D9]">$3,700</span>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Payment Method
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option>Card</option>
                        <option>Bank Transfer</option>
                        <option>Cash</option>
                      </select>
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Payment Status
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option>Pending</option>
                        <option>Paid</option>
                        <option>Partial</option>
                      </select>
                    </label>
                  </div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Transaction Reference
                    <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" />
                  </label>
                </>
              )}
              {step === 5 && (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  Drag-and-drop documents here or browse to upload guest ID,
                  passport, contract, and supporting files.
                </div>
              )}
              {step === 6 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Booking Summary
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>Guest: Ava Thompson</li>
                    <li>Property: Sunset Residence • Unit A-204</li>
                    <li>Stay: July 8 - July 12</li>
                    <li>Total: $3,700</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Booking Snapshot
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span>Reservation Status</span>
                <span className="font-semibold text-[#6D28D9]">Draft</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span>Check-in</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  <DateText value="2026-07-08" />
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span>Total</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  $3,700
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={prevStep}>
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => {
                    nextStep();
                    toast.info("Step completed");
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    toast.success("Booking submitted successfully")
                  }
                >
                  Submit Booking
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBookingPage;