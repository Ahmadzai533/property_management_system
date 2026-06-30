// src/pages/properties/LeasePropertyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Edit, Archive, Trash2, FileText, Calendar, DollarSign, Users, Phone, Mail, Home, Building2 } from 'lucide-react';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Button from '../../../components/common/Button';
import PropertyStatusBadge from '../../../components/properties/PropertyStatusBadge';
import PropertyGallery from '../../../components/properties/PropertyGallery';
import { useLeaseProperty } from '../../../hooks/useLeaseProperty';

const LeasePropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLease = async () => {
      setLoading(true);
      try {
        const mockLease = {
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
        setProperty(mockLease);
      } catch (error) {
        console.error('Error fetching lease:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLease();
  }, [id]);

  const handleEdit = () => {
    navigate(`/properties/lease/edit/${id}`);
  };

  const handleArchive = () => {
    console.log('Archive lease:', id);
  };

  const handleDelete = () => {
    console.log('Delete lease:', id);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Lease Properties', path: '/properties/lease' },
    { label: property?.name || 'Lease Details', active: true },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-4">
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
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Lease not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The lease you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/properties/lease')} className="mt-4">
            Back to Leases
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-2 sm:px-2 lg:px-2">
        <div className="rounded-2xl bg-gradient-to-r bg-[#6D28D9]  p-5 text-white shadow-lg dark:from-[#6D28D9] dark:to-[#8B5CF6]">
          <div className="mb-3">
            <Breadcrumb white={true} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/properties/lease')}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">{property.name}</h1>
                <p className="text-white/80 mt-0.5">Lease ID: #{property.id} • Tenant: {property.tenant}</p>
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
        
        <div className="mt-4">
          <PropertyGallery images={property.images || []} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lease Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                    <p className="text-gray-900 dark:text-white font-medium">{property.leaseStart}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                    <p className="text-gray-900 dark:text-white font-medium">{property.leaseEnd}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Rent</p>
                    <p className="text-gray-900 dark:text-white font-medium">${property.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Security Deposit</p>
                    <p className="text-gray-900 dark:text-white font-medium">${property.securityDeposit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <PropertyStatusBadge status={property.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      property.paymentStatus === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      property.paymentStatus === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {property.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tenant Information</h3>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{property.tenant}</p>
                    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Mail className="h-4 w-4" />
                      {property.tenantEmail}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      {property.tenantPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lease Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Days Remaining</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{property.daysRemaining} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Renewal Status</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">{property.renewalStatus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total Rent Paid</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${property.paymentHistory?.reduce((sum, p) => sum + p.amount, 0) || 0}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                    Renew Lease
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    Send Reminder
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeasePropertyDetails;