// src/components/finance/PaymentForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import Button from '../common/Button'; // This exists
import { useToast } from '../../hooks/useToast';

const paymentSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  tenant: z.string().min(1, 'Tenant is required'),
  property: z.string().min(1, 'Property is required'),
  unit: z.string().min(1, 'Unit is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  paymentDate: z.string().min(1, 'Payment date is required'),
  notes: z.string().optional(),
});

export const PaymentForm = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: '',
    },
  });

  const totalSteps = 3;
  const formData = watch();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Payment created successfully!');
      reset();
      setCurrentStep(1);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  New Payment
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-1 mt-4">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    index < currentStep
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Invoice Number
                  </label>
                  <input
                    {...register('invoiceNumber')}
                    placeholder="INV-2024-001"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.invoiceNumber 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.invoiceNumber && (
                    <p className="text-sm text-red-600 mt-1">{errors.invoiceNumber.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tenant
                    </label>
                    <select
                      {...register('tenant')}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.tenant 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Tenant</option>
                      <option value="John Smith">John Smith</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Michael Brown">Michael Brown</option>
                    </select>
                    {errors.tenant && (
                      <p className="text-sm text-red-600 mt-1">{errors.tenant.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Property
                    </label>
                    <select
                      {...register('property')}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.property 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select Property</option>
                      <option value="Sunset Towers">Sunset Towers</option>
                      <option value="Ocean View">Ocean View</option>
                      <option value="Garden Heights">Garden Heights</option>
                    </select>
                    {errors.property && (
                      <p className="text-sm text-red-600 mt-1">{errors.property.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Unit
                  </label>
                  <input
                    {...register('unit')}
                    placeholder="A-1201"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.unit 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.unit && (
                    <p className="text-sm text-red-600 mt-1">{errors.unit.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Payment Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <input
                    {...register('amount', { valueAsNumber: true })}
                    type="number"
                    placeholder="0.00"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.amount 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-600 mt-1">{errors.amount.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    {...register('paymentMethod')}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.paymentMethod 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                  </select>
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-600 mt-1">{errors.paymentMethod.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Date
                  </label>
                  <input
                    {...register('paymentDate')}
                    type="date"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.paymentDate 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.paymentDate && (
                    <p className="text-sm text-red-600 mt-1">{errors.paymentDate.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Review & Confirm
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Invoice Number
                      </p>
                      <p className="font-medium">{formData.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Amount
                      </p>
                      <p className="font-medium">${formData.amount || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tenant
                      </p>
                      <p className="font-medium">{formData.tenant}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Property
                      </p>
                      <p className="font-medium">{formData.property}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Unit
                      </p>
                      <p className="font-medium">{formData.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Payment Method
                      </p>
                      <p className="font-medium">{formData.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Back
              </button>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Payment'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};