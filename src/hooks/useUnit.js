// src/hooks/useUnit.js
import { useState, useEffect, useCallback } from 'react';

export const useUnit = (id) => {
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockUnit = {
        id: id || 'UNIT-001',
        unitNumber: '101',
        propertyName: 'Sunset Tower Apartments',
        propertyId: 'PROP-123456',
        type: '1BHK',
        floor: '1st Floor',
        size: 850,
        rent: 1800,
        status: 'Occupied',
        tenant: 'John Smith',
        leaseStatus: 'Active',
        maintenanceStatus: 'Good',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
        bedrooms: 1,
        bathrooms: 1,
        balcony: true,
        furnished: true,
        lastUpdated: '2024-03-15',
        createdAt: '2024-01-01',
        description: 'Spacious 1BHK unit with modern amenities and beautiful city views.',
        amenities: ['Air Conditioning', 'Heating', 'Balcony', 'Parking'],
        paymentHistory: [
          { month: 'January 2024', amount: 1800, status: 'Paid', date: '2024-01-01' },
          { month: 'February 2024', amount: 1800, status: 'Paid', date: '2024-02-01' },
          { month: 'March 2024', amount: 1800, status: 'Paid', date: '2024-03-01' },
        ],
        maintenanceHistory: [
          { description: 'AC repair completed', date: '2024-02-15', status: 'Completed' },
          { description: 'Plumbing inspection', date: '2024-01-20', status: 'Completed' },
        ],
      };
      setUnit(mockUnit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  return { unit, loading, error, refetch: fetchUnit };
};