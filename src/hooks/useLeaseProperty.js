// src/hooks/useLeaseProperty.js
import { useState, useEffect, useCallback } from 'react';

export const useLeaseProperty = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperty = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockProperty = {
        id: id || 'LEASE-001',
        name: 'Sunset Tower Apartments',
        tenant: 'John Smith',
        tenantEmail: 'john.smith@email.com',
        tenantPhone: '(555) 123-4567',
        address: '123 Sunset Blvd, Los Angeles, CA 90001',
        type: 'Residential',
        status: 'Active',
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop&crop=center',
        ],
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31',
        monthlyRent: 2500,
        securityDeposit: 5000,
        paymentStatus: 'Paid',
        renewalStatus: 'Eligible',
        daysRemaining: 180,
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        description: 'Luxury apartment with stunning views. Features include a rooftop pool, fitness center, and 24/7 concierge service.',
        amenities: ['Pool', 'Gym', 'Concierge', 'Parking', 'Elevator', 'Security'],
        paymentHistory: [
          { month: 'January 2024', amount: 2500, status: 'Paid', date: '2024-01-01' },
          { month: 'February 2024', amount: 2500, status: 'Paid', date: '2024-02-01' },
          { month: 'March 2024', amount: 2500, status: 'Paid', date: '2024-03-01' },
        ],
        documents: [
          { name: 'Lease Agreement.pdf', size: '2.4 MB', date: '2024-01-01' },
          { name: 'Tenant ID.pdf', size: '1.2 MB', date: '2024-01-01' },
        ],
        recentActivity: [
          { description: 'Rent payment received for March 2024', time: '2 days ago' },
          { description: 'Maintenance request completed', time: '5 days ago' },
          { description: 'Lease renewal notice sent', time: '1 week ago' },
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