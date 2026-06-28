// src/hooks/useUnits.js
import { useState, useEffect, useCallback } from 'react';

export const useUnits = ({ page = 1, pageSize = 10, search = '', filters = {} }) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});

  const fetchUnits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUnits = [
        {
          id: 'UNIT-001',
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
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=64&h=48&fit=crop&crop=center',
          bedrooms: 1,
          bathrooms: 1,
          balcony: true,
          furnished: true,
          lastUpdated: '2024-03-15',
          createdAt: '2024-01-01',
        },
        {
          id: 'UNIT-002',
          unitNumber: '102',
          propertyName: 'Sunset Tower Apartments',
          propertyId: 'PROP-123456',
          type: '2BHK',
          floor: '1st Floor',
          size: 1100,
          rent: 2400,
          status: 'Vacant',
          tenant: null,
          leaseStatus: 'None',
          maintenanceStatus: 'Good',
          image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=64&h=48&fit=crop&crop=center',
          bedrooms: 2,
          bathrooms: 2,
          balcony: true,
          furnished: true,
          lastUpdated: '2024-03-14',
          createdAt: '2024-01-01',
        },
        {
          id: 'UNIT-003',
          unitNumber: '201',
          propertyName: 'Green Valley Office Park',
          propertyId: 'PROP-789012',
          type: 'Office',
          floor: '2nd Floor',
          size: 1500,
          rent: 3500,
          status: 'Occupied',
          tenant: 'Tech Corp Inc.',
          leaseStatus: 'Active',
          maintenanceStatus: 'Good',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=48&fit=crop&crop=center',
          bedrooms: 0,
          bathrooms: 2,
          balcony: false,
          furnished: false,
          lastUpdated: '2024-03-13',
          createdAt: '2024-02-15',
        },
        {
          id: 'UNIT-004',
          unitNumber: '301',
          propertyName: 'Harbor View Residences',
          propertyId: 'PROP-345678',
          type: '3BHK',
          floor: '3rd Floor',
          size: 1400,
          rent: 3200,
          status: 'Maintenance',
          tenant: 'Sarah Johnson',
          leaseStatus: 'Active',
          maintenanceStatus: 'In Progress',
          image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=64&h=48&fit=crop&crop=center',
          bedrooms: 3,
          bathrooms: 2,
          balcony: true,
          furnished: true,
          lastUpdated: '2024-03-12',
          createdAt: '2024-01-15',
        },
        {
          id: 'UNIT-005',
          unitNumber: '401',
          propertyName: 'Skyline Luxury Condos',
          propertyId: 'PROP-567890',
          type: 'Studio',
          floor: '4th Floor',
          size: 650,
          rent: 1600,
          status: 'Reserved',
          tenant: null,
          leaseStatus: 'Pending',
          maintenanceStatus: 'Good',
          image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=64&h=48&fit=crop&crop=center',
          bedrooms: 0,
          bathrooms: 1,
          balcony: true,
          furnished: true,
          lastUpdated: '2024-03-11',
          createdAt: '2024-02-01',
        },
        {
          id: 'UNIT-006',
          unitNumber: '501',
          propertyName: 'Riverside Business Center',
          propertyId: 'PROP-678901',
          type: 'Office',
          floor: '5th Floor',
          size: 2000,
          rent: 4500,
          status: 'Occupied',
          tenant: 'Digital Solutions LLC',
          leaseStatus: 'Active',
          maintenanceStatus: 'Good',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=64&h=48&fit=crop&crop=center',
          bedrooms: 0,
          bathrooms: 3,
          balcony: false,
          furnished: false,
          lastUpdated: '2024-03-10',
          createdAt: '2024-02-20',
        },
      ];

      let filtered = mockUnits;
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(u => 
          u.unitNumber.toLowerCase().includes(query) ||
          u.propertyName.toLowerCase().includes(query) ||
          (u.tenant && u.tenant.toLowerCase().includes(query)) ||
          u.id.toLowerCase().includes(query)
        );
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All') {
          filtered = filtered.filter(u => {
            if (key === 'status') return u.status === value;
            if (key === 'type') return u.type === value;
            if (key === 'furnished') return u.furnished === (value === 'Furnished');
            return true;
          });
        }
      });

      const totalUnits = filtered.length;
      const occupied = filtered.filter(u => u.status === 'Occupied').length;
      const vacant = filtered.filter(u => u.status === 'Vacant').length;
      const maintenance = filtered.filter(u => u.status === 'Maintenance').length;
      const reserved = filtered.filter(u => u.status === 'Reserved').length;
      const totalRentValue = filtered.reduce((sum, u) => sum + u.rent, 0);
      const averageRent = totalUnits > 0 ? Math.round(totalRentValue / totalUnits) : 0;
      const occupancyRate = totalUnits > 0 ? Math.round((occupied / totalUnits) * 100) : 0;
      const maintenanceRate = totalUnits > 0 ? Math.round((maintenance / totalUnits) * 100) : 0;

      setStats({
        total: totalUnits,
        occupied,
        vacant,
        maintenance,
        reserved,
        totalRentValue,
        averageRent,
        occupancyRate,
        maintenanceRate,
      });

      const start = (page - 1) * pageSize;
      const paginated = filtered.slice(start, start + pageSize);
      
      setUnits(paginated);
      setTotal(filtered.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, filters]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  return { units, loading, error, total, stats, refetch: fetchUnits };
};