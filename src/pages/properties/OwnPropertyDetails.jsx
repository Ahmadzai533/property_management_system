// src/pages/properties/OwnPropertyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Edit, Archive, Trash2 } from 'lucide-react';
import Breadcrumb from '../../components/common/Breadcrumb';
import PropertyDetails from '../../components/properties/PropertyDetails';
import Button from '../../components/common/Button';

const OwnPropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const mockProperty = {
          id: id || 'PROP-123456',
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
          occupiedUnits: 114,
          vacantUnits: 6,
          monthlyRevenue: 285000,
          annualRevenue: 3420000,
          expenses: 684000,
          netIncome: 2736000,
          description: 'Luxury apartment complex with stunning views of the city skyline. Features include a rooftop pool, fitness center, and 24/7 concierge service.',
          amenities: ['Pool', 'Gym', 'Concierge', 'Parking', 'Elevator', 'Security'],
          images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center',
          ],
          recentActivity: [
            { icon: 'email', description: 'New lease signed for Unit 304', time: '2 hours ago' },
            { icon: 'phone', description: 'Maintenance request completed', time: '5 hours ago' },
            { icon: 'document', description: 'Annual inspection report uploaded', time: '1 day ago' },
          ],
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

  const handleEdit = () => {
    navigate(`/properties/edit/${id}`);
  };

  const handleArchive = () => {
    console.log('Archive property:', id);
  };

  const handleDelete = () => {
    console.log('Delete property:', id);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Own Properties', path: '/properties/own' },
    { label: property?.name || 'Property Details', active: true },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
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
          <p className="text-gray-500 dark:text-gray-400 mt-2">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/properties/own')} className="mt-4">
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-2 sm:px-2 lg:px-2"> {/* Reduced padding */}
        <div className="rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]"> {/* Reduced p-6 to p-5 */}
          {/* Breadcrumb inside gradient */}
          {/* Reduced mb-4 to mb-3 */}
              <Breadcrumb  white={true} />
          
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"> {/* Reduced gap-4 to gap-3 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/properties/own')}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">{property.name}</h1>
                <p className="text-white/80 mt-0.5">Property ID: #{property.id}</p> {/* Reduced mt-1 to mt-0.5 */}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleArchive}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white font-medium"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 transition-colors rounded-lg text-white font-medium"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4"> {/* Reduced mt-6 to mt-4 */}
          <PropertyDetails property={property} />
        </div>
      </div>
    </div>
  );
};

export default OwnPropertyDetails;