// src/components/tenant/TenantForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';

export const TenantForm = ({ onSubmit, initialData = null, submitLabel = 'Save Tenant' }) => {
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    nationalId: '',
    country: '',
    city: '',
    district: '',
    streetAddress: '',
    postalCode: '',
    property: '',
    unit: '',
    floor: '',
    leaseNumber: '',
    leaseStart: '',
    leaseEnd: '',
    contractDuration: '',
    monthlyRent: '',
    securityDeposit: '',
    advancePayment: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
        { name: 'nationalId', label: 'National ID', type: 'text' }
      ]
    },
    {
      title: 'Address Information',
      fields: [
        { name: 'country', label: 'Country', type: 'text' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'district', label: 'District', type: 'text' },
        { name: 'streetAddress', label: 'Street Address', type: 'text' },
        { name: 'postalCode', label: 'Postal Code', type: 'text' }
      ]
    },
    {
      title: 'Property Assignment',
      fields: [
        { name: 'property', label: 'Property', type: 'select', options: ['Sunset Tower', 'Ocean View', 'Park Residence', 'City Center', 'Green Valley', 'Riverside'] },
        { name: 'unit', label: 'Unit', type: 'select', options: ['A101', 'B202', 'C303', 'D404', 'E505', 'F606'] },
        { name: 'floor', label: 'Floor Number', type: 'number' }
      ]
    },
    {
      title: 'Lease Information',
      fields: [
        { name: 'leaseNumber', label: 'Lease Number', type: 'text' },
        { name: 'leaseStart', label: 'Start Date', type: 'date' },
        { name: 'leaseEnd', label: 'End Date', type: 'date' },
        { name: 'contractDuration', label: 'Contract Duration', type: 'text', placeholder: 'e.g., 12 months' }
      ]
    },
    {
      title: 'Financial Information',
      fields: [
        { name: 'monthlyRent', label: 'Monthly Rent ($)', type: 'number' },
        { name: 'securityDeposit', label: 'Security Deposit ($)', type: 'number' },
        { name: 'advancePayment', label: 'Advance Payment ($)', type: 'number' }
      ]
    },
    {
      title: 'Emergency Contact',
      fields: [
        { name: 'emergencyName', label: 'Name', type: 'text' },
        { name: 'emergencyRelationship', label: 'Relationship', type: 'text' },
        { name: 'emergencyPhone', label: 'Phone', type: 'tel' }
      ]
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.name} className={field.type === 'file' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click or drag to upload profile image</p>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
        >
          Save & Add Another
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};