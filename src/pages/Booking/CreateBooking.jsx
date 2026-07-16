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
import { useLocalization } from "../../hooks/useLocalization";

const CreateBookingPage = () => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const { t, isRTL } = useLocalization();

  const steps = [
    { key: "customer", label: t("booking.form.steps.customer"), icon: User },
    { key: "property", label: t("booking.form.steps.property"), icon: Home },
    { key: "details", label: t("booking.form.steps.details"), icon: CalendarDays },
    { key: "pricing", label: t("booking.form.steps.pricing"), icon: CreditCard },
    { key: "payment", label: t("booking.form.steps.payment"), icon: ShieldCheck },
    { key: "documents", label: t("booking.form.steps.documents"), icon: FileText },
    { key: "review", label: t("booking.form.steps.review"), icon: CheckCircle2 },
  ];

  const nextStep = () =>
    setStep((current) => Math.min(current + 1, steps.length - 1));
  const prevStep = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <div className="px-2 sm:px-2 lg:px-2 max-w-7xl mx-auto">
      <PageHeader
        breadcrumbItems={[
          { label: t("navigation.dashboard"), href: "/" },
          { label: t("navigation.bookings"), href: "/bookings/list" },
          { label: t("booking.actions.create") },
        ]}
        title={t("booking.create.title")}
        subtitle={t("booking.create.subtitle")}
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
                <Icon className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
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
              {t("booking.create.completeRequiredInfo")}
            </p>

            <div className="mt-5 space-y-4">
              {step === 0 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.fullName")}
                      <input 
                        placeholder={t("booking.form.fullNamePlaceholder")}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.phone")}
                      <input 
                        placeholder={t("booking.form.phonePlaceholder")}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.email")}
                      <input 
                        type="email"
                        placeholder={t("booking.form.emailPlaceholder")}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.nationalId")}
                      <input 
                        placeholder={t("booking.form.nationalIdPlaceholder")}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                      />
                    </label>
                  </div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("booking.form.address")}
                    <textarea 
                      placeholder={t("booking.form.addressPlaceholder")}
                      className="mt-2 min-h-[96px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                    />
                  </label>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.property")}
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option value="">{t("booking.form.selectProperty")}</option>
                        <option value="Sunset Residence">{t("booking.properties.sunsetResidence")}</option>
                        <option value="Marina Bay">{t("booking.properties.marinaBay")}</option>
                        <option value="Rosewood Villa">{t("booking.properties.rosewoodVilla")}</option>
                      </select>
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.unit")}
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option value="">{t("booking.form.selectUnit")}</option>
                        <option value="A-204">A-204</option>
                        <option value="P-101">P-101</option>
                        <option value="V-08">V-08</option>
                      </select>
                    </label>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300">
                    {t("booking.create.liveAvailability")}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.bookingDate")}
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.checkIn")}
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.checkOut")}
                      <input
                        type="date"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.adults")}
                      <input
                        type="number"
                        defaultValue="2"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("booking.form.specialRequests")}
                    <textarea 
                      placeholder={t("booking.form.specialRequestsPlaceholder")}
                      className="mt-2 min-h-[96px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                    />
                  </label>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.rent")}
                      <input
                        defaultValue="3200"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.taxes")}
                      <input
                        defaultValue="320"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.serviceCharges")}
                      <input
                        defaultValue="180"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.discount")}
                      <input
                        defaultValue="0"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                    {t("booking.form.estimatedTotal")}{" "}
                    <span className="font-semibold text-[#6D28D9]">$3,700</span>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.paymentMethod")}
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option value="">{t("booking.form.selectPaymentMethod")}</option>
                        <option value="Card">{t("booking.payment.card")}</option>
                        <option value="Bank Transfer">{t("booking.payment.bankTransfer")}</option>
                        <option value="Cash">{t("booking.payment.cash")}</option>
                      </select>
                    </label>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("booking.form.paymentStatus")}
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900">
                        <option value="">{t("booking.form.selectPaymentStatus")}</option>
                        <option value="Pending">{t("booking.payment.pending")}</option>
                        <option value="Paid">{t("booking.payment.paid")}</option>
                        <option value="Partial">{t("booking.payment.partial")}</option>
                      </select>
                    </label>
                  </div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("booking.form.transactionReference")}
                    <input 
                      placeholder={t("booking.form.transactionReferencePlaceholder")}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-900" 
                    />
                  </label>
                </>
              )}
              {step === 5 && (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {t("booking.form.dragAndDropDocuments")}
                </div>
              )}
              {step === 6 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {t("booking.summary.title")}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>{t("booking.summary.guest")}: Ava Thompson</li>
                    <li>{t("booking.summary.property")}: Sunset Residence • Unit A-204</li>
                    <li>{t("booking.summary.stay")}: July 8 - July 12</li>
                    <li>{t("booking.summary.total")}: $3,700</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t("booking.create.bookingSnapshot")}
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span>{t("booking.create.reservationStatus")}</span>
                <span className="font-semibold text-[#6D28D9]">{t("booking.status.draft")}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span>{t("booking.form.checkIn")}</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  <DateText value="2026-07-08" />
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span>{t("booking.summary.total")}</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  $3,700
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={prevStep}>
                {t("booking.actions.back")}
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => {
                    nextStep();
                    toast.info(t("booking.messages.stepCompleted"));
                  }}
                >
                  {t("booking.actions.continue")}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    toast.success(t("booking.messages.submitted"))
                  }
                >
                  {t("booking.actions.submitBooking")}
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