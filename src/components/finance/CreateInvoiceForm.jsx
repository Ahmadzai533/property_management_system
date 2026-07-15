import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import Button from '../common/Button';
import { useToast } from '../../hooks/useToast';
import { useLocalization } from '../../hooks/useLocalization';

const invoiceSchema = (t) => z.object({
  invoiceNumber: z.string().min(1, t('finance.validation.required', { field: t('finance.invoice.number') })),
  tenant: z.string().min(1, t('finance.validation.required', { field: t('finance.invoice.tenant') })),
  property: z.string().min(1, t('finance.validation.required', { field: t('finance.invoice.property') })),
  unit: z.string().min(1, t('finance.validation.required', { field: t('finance.invoice.unit') })),
  amount: z.number().min(1, t('finance.validation.minAmount', { min: 1 })),
  tax: z.number().min(0, t('finance.validation.negativeTax')),
  discount: z.number().min(0, t('finance.validation.negativeDiscount')),
  dueDate: z.string().min(1, t('finance.validation.required', { field: t('finance.invoice.dueDate') })),
  description: z.string().min(1, t('finance.validation.required', { field: t('finance.invoice.description') })),
});

export const CreateInvoiceForm = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLocalization();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(invoiceSchema(t)),
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
      toast.success(t('finance.messages.invoiceCreated'));
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(t('finance.messages.invoiceCreateFailed'));
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
                  {t('finance.invoice.create')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('finance.invoice.createSubtitle')}
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
                {t('finance.invoice.number')}
              </label>
              <input
                {...register('invoiceNumber')}
                placeholder={t('finance.invoice.numberPlaceholder')}
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
                  {t('finance.invoice.tenant')}
                </label>
                <select
                  {...register('tenant')}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.tenant 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">{t('finance.invoice.selectTenant')}</option>
                  <option value="John Smith">{t('finance.invoice.tenants.johnSmith')}</option>
                  <option value="Sarah Johnson">{t('finance.invoice.tenants.sarahJohnson')}</option>
                  <option value="Michael Brown">{t('finance.invoice.tenants.michaelBrown')}</option>
                </select>
                {errors.tenant && (
                  <p className="text-sm text-red-600 mt-1">{errors.tenant.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('finance.invoice.property')}
                </label>
                <select
                  {...register('property')}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.property 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">{t('finance.invoice.selectProperty')}</option>
                  <option value="Sunset Towers">{t('finance.invoice.properties.sunsetTowers')}</option>
                  <option value="Ocean View">{t('finance.invoice.properties.oceanView')}</option>
                  <option value="Garden Heights">{t('finance.invoice.properties.gardenHeights')}</option>
                </select>
                {errors.property && (
                  <p className="text-sm text-red-600 mt-1">{errors.property.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('finance.invoice.unit')}
                </label>
                <input
                  {...register('unit')}
                  placeholder={t('finance.invoice.unitPlaceholder')}
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
                  {t('finance.invoice.dueDate')}
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
                {t('finance.invoice.description')}
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.description 
                    ? 'border-red-500 dark:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder={t('finance.invoice.descriptionPlaceholder')}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('finance.invoice.amount')}
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
                  {t('finance.invoice.tax')}
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
                  {t('finance.invoice.discount')}
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
                  {t('finance.invoice.totalAmount')}
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
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('common.creating') : t('finance.invoice.create')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};