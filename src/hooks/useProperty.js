// src/hooks/useProperty.js
import { useState, useEffect, useCallback } from 'react';

export const useProperty = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperty = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock data - would fetch by ID in real implementation
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return { property, loading, error, refetch: fetchProperty };
};