// src/pages/properties/AddOwnProperty.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import PropertyForm from '../../../components/properties/PropertyForm';

const AddOwnProperty = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting property:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      // After successful save, go back to properties list
      navigate('/properties/own');
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-2 sm:px-2 lg:px-2 ">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          {/* Breadcrumb inside gradient */}
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/properties/own')}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Add New Property</h1>
                <p className="text-white/80 mt-0.5">Fill in the details to add a new property to your portfolio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/properties/own')}
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
                {isSubmitting ? 'Saving...' : 'Save Property'}
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

export default AddOwnProperty;