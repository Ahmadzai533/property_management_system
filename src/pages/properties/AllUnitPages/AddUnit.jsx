// src/pages/properties/AddUnit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import PropertyForm from '../../../components/properties/PropertyForm';
import { useLocalization } from '../../../hooks/useLocalization';

const AddUnit = () => {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting unit:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/properties/units');
    } catch (error) {
      console.error('Error adding unit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9] p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/properties/units')}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
                aria-label={t('properties.backToUnits', 'Back to Units')}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">{t('properties.addUnit', 'Add New Unit')}</h1>
                <p className="text-white/80 mt-0.5">{t('properties.addUnitDesc', 'Create a new unit in your property portfolio')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/properties/units')}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <X className="h-4 w-4" />
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                form="property-form"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? t('common.saving', 'Saving...') : t('properties.saveUnit', 'Save Unit')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <PropertyForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default AddUnit;