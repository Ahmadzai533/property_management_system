// src/components/properties/PropertyDetails.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Car, 
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import PropertyStatusBadge from './PropertyStatusBadge';
import PropertyGallery from './PropertyGallery';
import { useLocalization } from '../../hooks/useLocalization';

const PropertyDetails = ({ property }) => {
  const { t } = useLocalization();

  if (!property) return null;

  const details = [
    { icon: MapPin, label: t('properties.address', 'Address'), value: property.address },
    { icon: Home, label: t('properties.type', 'Type'), value: t(`properties.types.${property.type}`, property.type) },
    { icon: Bed, label: t('properties.bedrooms', 'Bedrooms'), value: property.bedrooms },
    { icon: Bath, label: t('properties.bathrooms', 'Bathrooms'), value: property.bathrooms },
    { icon: Car, label: t('properties.parking', 'Parking'), value: property.parking },
    { icon: Calendar, label: t('properties.builtYear', 'Built Year'), value: property.builtYear },
    { icon: DollarSign, label: t('properties.monthlyRent', 'Monthly Rent'), value: `$${property.monthlyRent}` },
    { icon: Users, label: t('properties.occupancy', 'Occupancy'), value: `${property.occupancy}%` },
  ];

  const stats = [
    { label: t('properties.totalUnits', 'Total Units'), value: property.totalUnits },
    { label: t('properties.occupiedUnits', 'Occupied Units'), value: property.occupiedUnits },
    { label: t('properties.vacantUnits', 'Vacant Units'), value: property.vacantUnits },
    { label: t('properties.annualRevenue', 'Annual Revenue'), value: `$${property.annualRevenue?.toLocaleString()}` },
  ];

  return (
    <div className="space-y-6">
      <PropertyGallery images={property.images || []} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {property.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {property.address}
                </p>
              </div>
              <PropertyStatusBadge status={property.status} />
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              {property.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('properties.amenities', 'Amenities')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities?.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('properties.recentActivity', 'Recent Activity')}
            </h3>
            <div className="space-y-4">
              {property.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {activity.icon === 'email' && <Mail className="h-4 w-4 text-gray-500" />}
                    {activity.icon === 'phone' && <Phone className="h-4 w-4 text-gray-500" />}
                    {activity.icon === 'document' && <FileText className="h-4 w-4 text-gray-500" />}
                    {activity.icon === 'calendar' && <Clock className="h-4 w-4 text-gray-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('properties.propertyStats', 'Property Stats')}
            </h3>
            <div className="space-y-3">
              {stats.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('properties.financialOverview', 'Financial Overview')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('properties.monthlyRevenue', 'Monthly Revenue')}</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  ${property.monthlyRevenue?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('properties.annualRevenue', 'Annual Revenue')}</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  ${property.annualRevenue?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('properties.expenses', 'Expenses')}</span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                  ${property.expenses?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{t('properties.netIncome', 'Net Income')}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  ${property.netIncome?.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;