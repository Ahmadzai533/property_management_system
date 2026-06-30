// src/pages/properties/EditUnit.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Button from '../../../components/common/Button';
import PropertyForm from '../../../components/properties/PropertyForm';
import { useUnit } from '../../../hooks/useUnit';

const EditUnit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { unit, loading } = useUnit(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Updating unit:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate(`/properties/units/${id}`);
    } catch (error) {
      console.error('Error updating unit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Unit not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The unit you're trying to edit doesn't exist.</p>
          <Button onClick={() => navigate('/properties/units')} className="mt-4">
            Back to Units
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/properties/units/${id}`)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Edit Unit</h1>
                <p className="text-white/80 mt-0.5">Update unit details for Unit {unit.unitNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/properties/units/${id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                type="submit"
                form="property-form"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Updating...' : 'Update Unit'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <PropertyForm
            initialData={unit}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUnit;