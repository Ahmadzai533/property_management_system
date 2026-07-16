import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import { useLocalization } from "../../hooks/useLocalization";

const BookingForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const { t } = useLocalization();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t("booking.form.quickBooking")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("booking.form.quickBookingDescription")}
          </p>
        </div>
        <div className="rounded-full bg-[#6D28D9]/10 px-3 py-1 text-sm font-semibold text-[#6D28D9]">
          {t("booking.form.step")} {step} / 4
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 space-y-4"
      >
        {step === 1 && (
          <>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("booking.form.guestName")}
              <input
                placeholder={t("booking.form.guestNamePlaceholder")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("booking.form.email")}
              <input
                type="email"
                placeholder={t("booking.form.emailPlaceholder")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("booking.form.property")}
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800">
                <option value="">{t("booking.form.selectProperty")}</option>
                <option value="Sunset Residence">{t("booking.properties.sunsetResidence")}</option>
                <option value="Marina Bay">{t("booking.properties.marinaBay")}</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("booking.form.unit")}
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800">
                <option value="">{t("booking.form.selectUnit")}</option>
                <option value="A-204">A-204</option>
                <option value="P-101">P-101</option>
              </select>
            </label>
          </>
        )}
        {step === 3 && (
          <>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("booking.form.checkIn")}
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("booking.form.checkOut")}
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
          </>
        )}
        {step === 4 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {t("booking.form.reviewSummary")}
          </div>
        )}
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => setStep((current) => Math.max(1, current - 1))}
        >
          {t("booking.actions.back")}
        </Button>
        <Button
          onClick={() =>
            step < 4 ? setStep((current) => current + 1) : onClose()
          }
        >
          {step < 4 ? t("booking.actions.continue") : t("booking.actions.submit")}
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;