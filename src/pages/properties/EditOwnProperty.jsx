// src/pages/properties/EditOwnProperty.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/Button';
import PropertyForm from '../../components/properties/PropertyForm';

const EditOwnProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const mockProperty = {
          id: id,
          name: 'Sunset Tower Apartments',
          address: '123 Sunset Blvd, Los Angeles, CA 90001',
          type: 'Residential',
          status: 'Active',
          bedrooms: 3,
          bathrooms: 2,
          parking: 2,
          builtYear: 2018,
          monthlyRent: 2500,
          occupancy: 95,
          totalUnits: 120,
          description: 'Luxury apartment complex with stunning views of the city skyline.',
          amenities: ['Pool', 'Gym', 'Concierge', 'Parking', 'Elevator', 'Security'],
        };
        setProperty(mockProperty);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Updating property:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      // After successful update, go back to property details
      navigate(`/properties/${id}`);
    } catch (error) {
      console.error('Error updating property:', error);
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

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Property not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The property you're trying to edit doesn't exist.</p>
          <Button onClick={() => navigate('/properties/own')} className="mt-4">
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-2 sm:px-2 lg:px-2 ">
        <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          {/* Breadcrumb inside gradient */}
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/properties/${id}`)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Edit Property</h1>
                <p className="text-white/80 mt-0.5">Update the details for {property.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/properties/${id}`)}
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
                {isSubmitting ? 'Updating...' : 'Update Property'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <PropertyForm
            initialData={property}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditOwnProperty;