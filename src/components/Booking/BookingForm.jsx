import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

const BookingForm = ({ onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Quick Booking
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Capture a reservation quickly in a guided flow.
          </p>
        </div>
        <div className="rounded-full bg-[#6D28D9]/10 px-3 py-1 text-sm font-semibold text-[#6D28D9]">
          Step {step} / 4
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
              Guest Name
              <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800" />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
              <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800" />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Property
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800">
                <option>Sunset Residence</option>
                <option>Marina Bay</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Unit
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800">
                <option>A-204</option>
                <option>P-101</option>
              </select>
            </label>
          </>
        )}
        {step === 3 && (
          <>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Check-in
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Check-out
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6D28D9] dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
          </>
        )}
        {step === 4 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Review the reservation summary and submit it for confirmation.
          </div>
        )}
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => setStep((current) => Math.max(1, current - 1))}
        >
          Back
        </Button>
        <Button
          onClick={() =>
            step < 4 ? setStep((current) => current + 1) : onClose()
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
