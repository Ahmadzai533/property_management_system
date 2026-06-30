// src/hooks/useFinanceData.js
import { useState, useEffect, useCallback } from 'react';

export const useFinanceData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with mock data
      const mockData = generateMockData(endpoint);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      setData(mockData);
      setPagination((prev) => ({
        ...prev,
        total: mockData.length,
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const setPage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit) => {
    setPagination((prev) => ({ ...prev, limit }));
  }, []);

  return {
    data,
    isLoading,
    error,
    pagination,
    refetch,
    setPage,
    setLimit,
  };
};

// Helper function to generate mock data
const generateMockData = (endpoint) => {
  switch (endpoint) {
    case 'invoices':
      return [
        {
          id: 'INV-2024-001',
          property: 'Sunset Towers',
          unit: 'A-1201',
          tenant: 'John Smith',
          dueDate: '2024-01-31',
          paidDate: '2024-01-28',
          amount: 2500,
          tax: 250,
          discount: 0,
          paymentMethod: 'Bank Transfer',
          paymentStatus: 'Paid',
          invoiceStatus: 'Paid',
        },
        {
          id: 'INV-2024-002',
          property: 'Ocean View',
          unit: 'B-304',
          tenant: 'Sarah Johnson',
          dueDate: '2024-02-15',
          paidDate: null,
          amount: 3200,
          tax: 320,
          discount: 100,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Pending',
          invoiceStatus: 'Sent',
        },
        {
          id: 'INV-2024-003',
          property: 'Garden Heights',
          unit: 'C-502',
          tenant: 'Michael Brown',
          dueDate: '2024-01-15',
          paidDate: null,
          amount: 1800,
          tax: 180,
          discount: 0,
          paymentMethod: 'Cash',
          paymentStatus: 'Overdue',
          invoiceStatus: 'Overdue',
        },
        {
          id: 'INV-2024-004',
          property: 'Sunset Towers',
          unit: 'A-1502',
          tenant: 'Emma Wilson',
          dueDate: '2024-02-28',
          paidDate: '2024-02-25',
          amount: 2800,
          tax: 280,
          discount: 50,
          paymentMethod: 'Bank Transfer',
          paymentStatus: 'Paid',
          invoiceStatus: 'Paid',
        },
        {
          id: 'INV-2024-005',
          property: 'Ocean View',
          unit: 'B-201',
          tenant: 'David Chen',
          dueDate: '2024-03-15',
          paidDate: null,
          amount: 3400,
          tax: 340,
          discount: 0,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Pending',
          invoiceStatus: 'Sent',
        },
      ];
    case 'ledger':
      return [
        {
          property: 'Sunset Towers',
          unit: 'A-1201',
          tenant: 'John Smith',
          lease: 'LS-2024-001',
          monthlyRent: 2500,
          dueDate: '2024-01-31',
          amountPaid: 2500,
          outstanding: 0,
          securityDeposit: 2500,
          balance: 0,
          occupancy: 'Occupied',
          status: 'Paid',
        },
        {
          property: 'Ocean View',
          unit: 'B-304',
          tenant: 'Sarah Johnson',
          lease: 'LS-2024-002',
          monthlyRent: 3200,
          dueDate: '2024-02-15',
          amountPaid: 0,
          outstanding: 3200,
          securityDeposit: 3200,
          balance: 3200,
          occupancy: 'Occupied',
          status: 'Pending',
        },
        {
          property: 'Garden Heights',
          unit: 'C-502',
          tenant: 'Michael Brown',
          lease: 'LS-2024-003',
          monthlyRent: 1800,
          dueDate: '2024-01-15',
          amountPaid: 0,
          outstanding: 1800,
          securityDeposit: 1800,
          balance: 1800,
          occupancy: 'Occupied',
          status: 'Overdue',
        },
        {
          property: 'Sunset Towers',
          unit: 'A-1502',
          tenant: 'Emma Wilson',
          lease: 'LS-2024-004',
          monthlyRent: 2800,
          dueDate: '2024-02-28',
          amountPaid: 2800,
          outstanding: 0,
          securityDeposit: 2800,
          balance: 0,
          occupancy: 'Occupied',
          status: 'Paid',
        },
        {
          property: 'Ocean View',
          unit: 'B-201',
          tenant: 'David Chen',
          lease: 'LS-2024-005',
          monthlyRent: 3400,
          dueDate: '2024-03-15',
          amountPaid: 0,
          outstanding: 3400,
          securityDeposit: 3400,
          balance: 3400,
          occupancy: 'Occupied',
          status: 'Pending',
        },
      ];
    case 'transactions':
      return [
        {
          id: 'TX-2024-001',
          date: '2024-01-28T14:30:00',
          property: 'Sunset Towers',
          unit: 'A-1201',
          tenant: 'John Smith',
          category: 'Rent Payment',
          reference: 'INV-2024-001',
          paymentMethod: 'Bank Transfer',
          amount: 2500,
          status: 'Completed',
          createdBy: 'Jane Doe',
        },
        {
          id: 'TX-2024-002',
          date: '2024-01-27T10:15:00',
          property: 'Ocean View',
          unit: 'B-304',
          tenant: 'Sarah Johnson',
          category: 'Deposit',
          reference: 'DEP-2024-001',
          paymentMethod: 'Credit Card',
          amount: 3200,
          status: 'Pending',
          createdBy: 'John Smith',
        },
        {
          id: 'TX-2024-003',
          date: '2024-01-26T16:45:00',
          property: 'Garden Heights',
          unit: 'C-502',
          tenant: 'Michael Brown',
          category: 'Late Fee',
          reference: 'LAT-2024-001',
          paymentMethod: 'Cash',
          amount: 50,
          status: 'Failed',
          createdBy: 'Jane Doe',
        },
        {
          id: 'TX-2024-004',
          date: '2024-01-25T09:00:00',
          property: 'Sunset Towers',
          unit: 'A-1502',
          tenant: 'Emma Wilson',
          category: 'Rent Payment',
          reference: 'INV-2024-004',
          paymentMethod: 'Bank Transfer',
          amount: 2800,
          status: 'Completed',
          createdBy: 'John Smith',
        },
        {
          id: 'TX-2024-005',
          date: '2024-01-24T13:20:00',
          property: 'Ocean View',
          unit: 'B-201',
          tenant: 'David Chen',
          category: 'Invoice Payment',
          reference: 'INV-2024-005',
          paymentMethod: 'Credit Card',
          amount: 3400,
          status: 'Pending',
          createdBy: 'Jane Doe',
        },
      ];
    default:
      return [];
  }
};