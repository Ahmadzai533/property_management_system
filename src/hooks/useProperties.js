// src/hooks/useProperties.js
import { useState, useEffect, useCallback } from 'react';

export const useProperties = ({ page = 1, pageSize = 10, search = '', filters = {} }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data with working Unsplash images
      const mockProperties = [
        {
          id: 'PROP-123456',
          name: 'Sunset Tower Apartments',
          address: '123 Sunset Blvd, Los Angeles, CA 90001',
          type: 'Residential',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=64&h=48&fit=crop&crop=center',
          units: 120,
          occupancy: 95,
          revenue: 285000,
          bedrooms: 3,
          bathrooms: 2,
          parking: 2,
          builtYear: 2018,
          monthlyRent: 2500,
          createdAt: '2024-01-15',
        },
        {
          id: 'PROP-789012',
          name: 'Green Valley Office Park',
          address: '456 Corporate Dr, San Francisco, CA 94105',
          type: 'Commercial',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=48&fit=crop&crop=center',
          units: 45,
          occupancy: 78,
          revenue: 450000,
          bedrooms: 0,
          bathrooms: 4,
          parking: 50,
          builtYear: 2015,
          monthlyRent: 10000,
          createdAt: '2024-02-20',
        },
        {
          id: 'PROP-345678',
          name: 'Harbor View Residences',
          address: '789 Marina Way, Miami, FL 33101',
          type: 'Residential',
          status: 'Under Maintenance',
          image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=64&h=48&fit=crop&crop=center',
          units: 85,
          occupancy: 65,
          revenue: 195000,
          bedrooms: 2,
          bathrooms: 2,
          parking: 1,
          builtYear: 2020,
          monthlyRent: 2300,
          createdAt: '2023-12-10',
        },
        {
          id: 'PROP-901234',
          name: 'Industrial Park North',
          address: '321 Factory Road, Chicago, IL 60607',
          type: 'Industrial',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=64&h=48&fit=crop&crop=center',
          units: 12,
          occupancy: 100,
          revenue: 320000,
          bedrooms: 0,
          bathrooms: 2,
          parking: 30,
          builtYear: 2010,
          monthlyRent: 26667,
          createdAt: '2024-03-01',
        },
        {
          id: 'PROP-567890',
          name: 'Skyline Luxury Condos',
          address: '567 High Rise Ave, New York, NY 10001',
          type: 'Residential',
          status: 'Vacant',
          image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=64&h=48&fit=crop&crop=center',
          units: 60,
          occupancy: 45,
          revenue: 135000,
          bedrooms: 2,
          bathrooms: 3,
          parking: 2,
          builtYear: 2022,
          monthlyRent: 4500,
          createdAt: '2024-01-05',
        },
        {
          id: 'PROP-678901',
          name: 'Riverside Business Center',
          address: '890 River Road, Portland, OR 97201',
          type: 'Commercial',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=64&h=48&fit=crop&crop=center',
          units: 30,
          occupancy: 90,
          revenue: 280000,
          bedrooms: 0,
          bathrooms: 3,
          parking: 25,
          builtYear: 2019,
          monthlyRent: 9333,
          createdAt: '2024-04-10',
        },
      ];

      // Filter by search
      let filtered = mockProperties;
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query)
        );
      }

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All') {
          filtered = filtered.filter(p => {
            if (key === 'status') return p.status === value;
            if (key === 'city') return p.address.includes(value);
            if (key === 'type') return p.type === value;
            if (key === 'bedrooms') return p.bedrooms === parseInt(value) || (value === '5+' && p.bedrooms >= 5);
            return true;
          });
        }
      });

      // Calculate stats
      const totalProperties = filtered.length;
      const occupied = filtered.filter(p => p.status === 'Active').length;
      const vacant = filtered.filter(p => p.status === 'Vacant').length;
      const maintenance = filtered.filter(p => p.status === 'Under Maintenance').length;
      const totalUnits = filtered.reduce((sum, p) => sum + p.units, 0);
      const totalRevenue = filtered.reduce((sum, p) => sum + p.revenue, 0);
      const occupiedUnits = filtered.reduce((sum, p) => sum + Math.round(p.units * (p.occupancy / 100)), 0);
      const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
      const averageRent = totalProperties > 0 ? Math.round(totalRevenue / totalProperties) : 0;

      setStats({
        total: totalProperties,
        occupied,
        vacant,
        maintenance,
        units: totalUnits,
        monthlyRevenue: totalRevenue,
        yearlyRevenue: totalRevenue * 12,
        occupancyRate,
        averageRent,
      });

      // Pagination
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