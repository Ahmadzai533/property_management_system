// src/hooks/useLeaseProperties.js
import { useState, useEffect, useCallback } from 'react';

export const useLeaseProperties = ({ page = 1, pageSize = 10, search = '', filters = {} }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProperties = [
        {
          id: 'LEASE-001',
          name: 'Sunset Tower Apartments',
          tenant: 'John Smith',
          address: '123 Sunset Blvd, Los Angeles, CA 90001',
          type: 'Residential',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=64&h=48&fit=crop&crop=center',
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
        },
        {
          id: 'LEASE-002',
          name: 'Green Valley Office Park',
          tenant: 'Tech Corp Inc.',
          address: '456 Corporate Dr, San Francisco, CA 94105',
          type: 'Commercial',
          status: 'Expiring Soon',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=48&fit=crop&crop=center',
          leaseStart: '2023-03-01',
          leaseEnd: '2024-04-30',
          monthlyRent: 10000,
          securityDeposit: 20000,
          paymentStatus: 'Pending',
          renewalStatus: 'In Review',
          daysRemaining: 30,
          bedrooms: 0,
          bathrooms: 4,
          parking: 50,
        },
        {
          id: 'LEASE-003',
          name: 'Harbor View Residences',
          tenant: 'Sarah Johnson',
          address: '789 Marina Way, Miami, FL 33101',
          type: 'Residential',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=64&h=48&fit=crop&crop=center',
          leaseStart: '2023-06-15',
          leaseEnd: '2024-06-14',
          monthlyRent: 2300,
          securityDeposit: 4600,
          paymentStatus: 'Paid',
          renewalStatus: 'Eligible',
          daysRemaining: 90,
          bedrooms: 2,
          bathrooms: 2,
          parking: 1,
        },
        {
          id: 'LEASE-004',
          name: 'Industrial Park North',
          tenant: 'Logistics Plus',
          address: '321 Factory Road, Chicago, IL 60607',
          type: 'Industrial',
          status: 'Expired',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=64&h=48&fit=crop&crop=center',
          leaseStart: '2022-01-01',
          leaseEnd: '2023-12-31',
          monthlyRent: 8000,
          securityDeposit: 16000,
          paymentStatus: 'Overdue',
          renewalStatus: 'Not Eligible',
          daysRemaining: -30,
          bedrooms: 0,
          bathrooms: 2,
          parking: 30,
        },
        {
          id: 'LEASE-005',
          name: 'Skyline Luxury Condos',
          tenant: 'Michael Chen',
          address: '567 High Rise Ave, New York, NY 10001',
          type: 'Residential',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=64&h=48&fit=crop&crop=center',
          leaseStart: '2024-02-01',
          leaseEnd: '2025-01-31',
          monthlyRent: 4500,
          securityDeposit: 9000,
          paymentStatus: 'Paid',
          renewalStatus: 'Eligible',
          daysRemaining: 210,
          bedrooms: 2,
          bathrooms: 3,
          parking: 2,
        },
        {
          id: 'LEASE-006',
          name: 'Riverside Business Center',
          tenant: 'Digital Solutions LLC',
          address: '890 River Road, Portland, OR 97201',
          type: 'Commercial',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=64&h=48&fit=crop&crop=center',
          leaseStart: '2023-09-01',
          leaseEnd: '2024-08-31',
          monthlyRent: 5500,
          securityDeposit: 11000,
          paymentStatus: 'Paid',
          renewalStatus: 'Eligible',
          daysRemaining: 150,
          bedrooms: 0,
          bathrooms: 3,
          parking: 25,
        },
      ];

      let filtered = mockProperties;
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.tenant.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query)
        );
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All') {
          filtered = filtered.filter(p => {
            if (key === 'status') return p.status === value;
            if (key === 'type') return p.type === value;
            if (key === 'paymentStatus') return p.paymentStatus === value;
            if (key === 'renewalStatus') return p.renewalStatus === value;
            return true;
          });
        }
      });

      const totalProperties = filtered.length;
      const active = filtered.filter(p => p.status === 'Active').length;
      const expired = filtered.filter(p => p.status === 'Expired').length;
      const expiringSoon = filtered.filter(p => p.status === 'Expiring Soon').length;
      const totalTenants = filtered.length;
      const totalMonthlyRent = filtered.reduce((sum, p) => sum + p.monthlyRent, 0);
      const totalSecurityDeposits = filtered.reduce((sum, p) => sum + p.securityDeposit, 0);
      const eligibleForRenewal = filtered.filter(p => p.renewalStatus === 'Eligible').length;
      const occupancyRate = totalProperties > 0 ? Math.round((active / totalProperties) * 100) : 0;
      const avgLeaseDuration = totalProperties > 0 ? Math.round(filtered.reduce((sum, p) => {
        const start = new Date(p.leaseStart);
        const end = new Date(p.leaseEnd);
        const duration = (end - start) / (1000 * 60 * 60 * 24 * 30);
        return sum + duration;
      }, 0) / totalProperties) : 0;

      setStats({
        total: totalProperties,
        active,
        expired,
        expiringSoon,
        totalTenants,
        monthlyRentalIncome: totalMonthlyRent,
        securityDeposits: totalSecurityDeposits,
        leaseRenewalRate: totalProperties > 0 ? Math.round((eligibleForRenewal / totalProperties) * 100) : 0,
        occupancyRate,
        averageLeaseDuration: avgLeaseDuration,
      });

      const start = (page - 1) * pageSize;
      const paginated = filtered.slice(start, start + pageSize);
      
      setProperties(paginated);
      setTotal(filtered.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, total, stats, refetch: fetchProperties };
};