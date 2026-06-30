// src/components/finance/CreateInvoiceForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import Button from '../common/Button';
import { useToast } from '../../hooks/useToast';

const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  tenant: z.string().min(1, 'Tenant is required'),
  property: z.string().min(1, 'Property is required'),
  unit: z.string().min(1, 'Unit is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  tax: z.number().min(0, 'Tax cannot be negative'),
  discount: z.number().min(0, 'Discount cannot be negative'),
  dueDate: z.string().min(1, 'Due date is required'),
  description: z.string().min(1, 'Description is required'),
});

export const CreateInvoiceForm = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      tax: 0,
      discount: 0,
    },
  });

  const formData = watch();
  const total = (formData.amount || 0) + (formData.tax || 0) - (formData.discount || 0);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Invoice created successfully!');
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create invoice');
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
          className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create Invoice
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Generate a new invoice for your tenant
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  {...register('dueDate')}
                  type="date"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.dueDate 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.dueDate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.description 
                    ? 'border-red-500 dark:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Describe the invoice details..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
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
                  Tax (%)
                </label>
                <input
                  {...register('tax', { valueAsNumber: true })}
                  type="number"
                  placeholder="0"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.tax 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.tax && (
                  <p className="text-sm text-red-600 mt-1">{errors.tax.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Discount
                </label>
                <input
                  {...register('discount', { valueAsNumber: true })}
                  type="number"
                  placeholder="0.00"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.discount 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.discount && (
                  <p className="text-sm text-red-600 mt-1">{errors.discount.message}</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};