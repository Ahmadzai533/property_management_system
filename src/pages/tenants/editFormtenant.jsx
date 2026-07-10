import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiHome,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineBuildingOffice2,
  HiOutlineClipboardDocumentList,
  HiOutlineDocument,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineFolder,
  HiOutlineUser,
  HiXMark,
  HiCheckCircle,
  HiOutlineCloudArrowUp,
  HiArrowUpTray,
  HiArrowDownTray,
} from "react-icons/hi2";
import { FaBed, FaCamera } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import DateText from '../../components/common/DateText';

// Reusable Input Component
const Input = ({ 
  label, 
  name, 
  register, 
  error, 
  icon: Icon, 
  placeholder, 
  type = 'text', 
  required = false,
  validation = {},
  ...props 
}) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <input
        id={name}
        {...register(name, validation)}
        {...props}
        type={type}
        placeholder={placeholder}
        className={`
          w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
          bg-white dark:bg-gray-800/50
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          rounded-xl
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          <span>•</span> {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// Reusable Select Component
const Select = ({ 
  label, 
  name, 
  register, 
  error, 
  icon: Icon, 
  options, 
  required = false,
  validation = {},
  ...props 
}) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <select
        id={name}
        {...register(name, validation)}
        {...props}
        className={`
          w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
          bg-white dark:bg-gray-800/50
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          rounded-xl
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          appearance-none
        `}
        aria-invalid={error ? 'true' : 'false'}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          <span>•</span> {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// Reusable Textarea Component
const Textarea = ({ 
  label, 
  name, 
  register, 
  error, 
  icon: Icon, 
  placeholder, 
  required = false,
  validation = {},
  ...props 
}) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute top-3 left-3">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <textarea
        id={name}
        {...register(name, validation)}
        {...props}
        placeholder={placeholder}
        rows={3}
        className={`
          w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5
          bg-white dark:bg-gray-800/50
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          rounded-xl
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          resize-none
        `}
        aria-invalid={error ? 'true' : 'false'}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          <span>•</span> {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// Reusable Toggle Component
const Toggle = ({ label, name, control, required = false }) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: required ? `${label} is required` : false }}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
          <button
            type="button"
            onClick={() => onChange(!value)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
            `}
            role="switch"
            aria-checked={value}
            aria-label={label}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                ${value ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500"
            role="alert"
          >
            {error.message}
          </motion.p>
        )}
      </div>
    )}
  />
);

// Main Edit Tenant Page
const EditTenant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('Lease Agreement');
  const [documents, setDocuments] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      job: '',
      age: '',
      familyMembers: '',
      email: '',
      password: '',
      previousAddress: '',
      previousCountry: '',
      previousState: '',
      previousCity: '',
      previousZip: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      propertyName: '',
      propertyType: '',
      unitNumber: '',
      fullAddress: '',
      nearbyLandmark: '',
      monthlyRent: '',
      securityDeposit: '',
      paymentMethod: '',
      dueDate: '',
      bedrooms: '',
      bathrooms: '',
      kitchenAvailable: false,
      livingRoom: false,
      homeSize: '',
      sizeUnit: 'sq ft',
      utilities: {
        electricity: false,
        water: false,
        gas: false,
        internet: false,
      },
      status: '',
      contractStart: '',
      contractEnd: '',
      specialConditions: '',
      maintenanceNotes: '',
    },
  });

  useEffect(() => {
    const fetchTenantData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockData = {
          id: id || '1',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          job: 'Software Engineer',
          age: 30,
          familyMembers: 3,
          email: 'john.doe@example.com',
          password: 'password123',
          previousAddress: '123 Old Street',
          previousCountry: 'USA',
          previousState: 'California',
          previousCity: 'Los Angeles',
          previousZip: '90001',
          address: '456 New Avenue',
          country: 'USA',
          state: 'New York',
          city: 'New York City',
          zipCode: '10001',
          profileImage: null,
          propertyName: 'Sunset Apartments',
          propertyType: 'Apartment',
          unitNumber: 'A-12',
          fullAddress: '789 Park Avenue, New York City, NY 10001',
          nearbyLandmark: 'Central Park',
          monthlyRent: 2500,
          securityDeposit: 3000,
          paymentMethod: 'Monthly',
          dueDate: '2024-02-01',
          bedrooms: 2,
          bathrooms: 2,
          kitchenAvailable: true,
          livingRoom: true,
          homeSize: 1200,
          sizeUnit: 'sq ft',
          utilities: {
            electricity: true,
            water: true,
            gas: false,
            internet: true,
          },
          status: 'Occupied',
          contractStart: '2024-01-01',
          contractEnd: '2024-12-31',
          specialConditions: 'No pets allowed',
          maintenanceNotes: 'AC needs servicing',
        };

        Object.keys(mockData).forEach(key => {
          if (key !== 'id' && key !== 'profileImage') {
            setValue(key, mockData[key]);
          }
        });

        if (mockData.profileImage) {
          setPreview(mockData.profileImage);
        }

        setDocuments([
          {
            id: 1,
            name: 'Lease_Agreement_2024.pdf',
            type: 'Lease Agreement',
            date: '2024-01-15',
            status: 'Approved'
          },
          {
            id: 2,
            name: 'Tenant_ID_Card.jpg',
            type: 'ID Card',
            date: '2024-01-10',
            status: 'Pending'
          },
          {
            id: 3,
            name: 'Passport_Scan.pdf',
            type: 'Passport',
            date: '2024-01-05',
            status: 'Approved'
          }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    fetchTenantData();
  }, [id, setValue]);

  const positiveNumber = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'Must be a number';
    if (num <= 0) return 'Must be greater than zero';
    return true;
  };

  const dateValidation = (value) => {
    if (!value) return 'Date is required';
    return true;
  };

  const endDateValidation = (value) => {
    const startDate = watch('contractStart');
    if (!value) return 'End date is required';
    if (startDate && new Date(value) < new Date(startDate)) {
      return 'End date must be after start date';
    }
    return true;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: selectedFile.name,
        type: documentType,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };
      setDocuments([newDocument, ...documents]);
      setSelectedFile(null);
      setIsLoading(false);
      document.getElementById('fileInput').value = '';
      toast.success('Document uploaded successfully');
    }, 1500);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success('Document deleted successfully');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Updated Tenant Data:', { ...data, id });
      toast.success('Tenant updated successfully!');
      navigate('/tenants');
    } catch (error) {
      toast.error('Failed to update tenant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/tenants');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tenant data...</p>
        </div>
      </div>
    );
  }

  const inputStyle = `
    w-full
    mt-2
    border
    border-gray-300
    dark:border-gray-600
    rounded-xl
    p-2
    outline-none
    transition-all
    duration-300
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-100
    dark:focus:ring-blue-900
    hover:border-blue-400
    dark:hover:border-blue-500
    bg-white
    dark:bg-gray-800
    text-gray-900
    dark:text-gray-100
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <HiHome className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                Edit Tenant
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update tenant information, home details, and documents.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                Tenant ID: {id || 'N/A'}
              </span>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Tenant Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <HiOutlineUser className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tenant Information</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Tenant"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                          {watch('firstName')?.[0] || 'NA'}
                        </span>
                      </div>
                    )}
                  </div>

                  <input
                    id="tenantPhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />

                  <label
                    htmlFor="tenantPhoto"
                    className="
                      absolute
                      bottom-1
                      right-1
                      w-6 h-6
                      md:w-11
                      md:h-11
                      rounded-full
                      bg-blue-600
                      dark:bg-blue-700
                      hover:bg-blue-700
                      dark:hover:bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      shadow-lg
                      transition-all
                      duration-300
                      hover:scale-110
                    "
                  >
                    <FaCamera size={16} />
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter first name"
                      {...register("firstName", { required: "First Name is required" })}
                      className={inputStyle}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter last name"
                      {...register("lastName", { required: "Last Name is required" })}
                      className={inputStyle}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter contact number"
                      type="tel"
                      {...register("phone", {
                        required: "Contact Number is required",
                        pattern: {
                          value: /^[0-9+\-\s]+$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className={inputStyle}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Job <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter job title"
                      {...register("job", { required: "Job is required" })}
                      className={inputStyle}
                    />
                    {errors.job && (
                      <p className="text-red-500 text-sm mt-1">{errors.job.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">Age</label>
                    <input
                      placeholder="Enter age"
                      type="number"
                      {...register("age", {
                        min: { value: 18, message: "Minimum age is 18" },
                        max: { value: 100, message: "Maximum age is 100" },
                      })}
                      className={inputStyle}
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Family Members <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Number of family members"
                      type="number"
                      {...register("familyMembers", { required: "Family Members required" })}
                      className={inputStyle}
                    />
                    {errors.familyMembers && (
                      <p className="text-red-500 text-sm mt-1">{errors.familyMembers.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter email address"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className={inputStyle}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Minimum 8 characters" },
                      })}
                      className={inputStyle}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Previous Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input
                      placeholder="Enter previous address"
                      {...register("previousAddress")}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">Country</label>
                    <input
                      placeholder="Enter country"
                      {...register("previousCountry")}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">State</label>
                    <input
                      placeholder="Enter state"
                      {...register("previousState")}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">City</label>
                    <input
                      placeholder="Enter city"
                      {...register("previousCity")}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
                    <input
                      placeholder="Enter zip code"
                      {...register("previousZip")}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Permanent Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter permanent address"
                      {...register("address", { required: "Address is required" })}
                      className={inputStyle}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter country"
                      {...register("country", { required: "Country is required" })}
                      className={inputStyle}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter state"
                      {...register("state", { required: "State is required" })}
                      className={inputStyle}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter city"
                      {...register("city", { required: "City is required" })}
                      className={inputStyle}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Enter zip code"
                      {...register("zipCode", { required: "Zip Code is required" })}
                      className={inputStyle}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Home Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <HiHome className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Home Details</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Property Information</h3>
                  <Input
                    label="Property Name"
                    name="propertyName"
                    register={register}
                    error={errors.propertyName}
                    icon={HiHome}
                    placeholder="Enter property name"
                    required
                    validation={{ required: 'Property name is required' }}
                  />
                  <Select
                    label="Property Type"
                    name="propertyType"
                    register={register}
                    error={errors.propertyType}
                    icon={HiHome}
                    options={['Apartment', 'House', 'Villa', 'Room', 'Office', 'Shop', 'Warehouse']}
                    required
                    validation={{ required: 'Property type is required' }}
                  />
                  <Input
                    label="Unit Number"
                    name="unitNumber"
                    register={register}
                    error={errors.unitNumber}
                    icon={HiHome}
                    placeholder="Example: A-12"
                    required
                    validation={{ required: 'Unit number is required' }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address Information</h3>
                  <Input
                    label="Country"
                    name="country"
                    register={register}
                    error={errors.country}
                    icon={HiOutlineMapPin}
                    placeholder="Enter country"
                    required
                    validation={{ required: 'Country is required' }}
                  />
                  <Input
                    label="City"
                    name="city"
                    register={register}
                    error={errors.city}
                    icon={HiOutlineMapPin}
                    placeholder="Enter city"
                    required
                    validation={{ required: 'City is required' }}
                  />
                  <Textarea
                    label="Full Address"
                    name="fullAddress"
                    register={register}
                    error={errors.fullAddress}
                    icon={HiOutlineMapPin}
                    placeholder="Enter complete address"
                    required
                    validation={{ required: 'Full address is required' }}
                  />
                  <Input
                    label="Nearby Landmark"
                    name="nearbyLandmark"
                    register={register}
                    error={errors.nearbyLandmark}
                    icon={HiOutlineMapPin}
                    placeholder="Mosque, School, Market, Hospital"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rental Information</h3>
                  <Input
                    label="Monthly Rent"
                    name="monthlyRent"
                    register={register}
                    error={errors.monthlyRent}
                    icon={HiOutlineCurrencyDollar}
                    type="number"
                    placeholder="Enter monthly rent"
                    required
                    validation={{ 
                      required: 'Monthly rent is required',
                      validate: positiveNumber
                    }}
                  />
                  <Input
                    label="Security Deposit"
                    name="securityDeposit"
                    register={register}
                    error={errors.securityDeposit}
                    icon={HiOutlineCurrencyDollar}
                    type="number"
                    placeholder="Enter security deposit"
                    required
                    validation={{ 
                      required: 'Security deposit is required',
                      validate: positiveNumber
                    }}
                  />
                  <Select
                    label="Payment Method"
                    name="paymentMethod"
                    register={register}
                    error={errors.paymentMethod}
                    icon={HiOutlineCurrencyDollar}
                    options={['Monthly', 'Weekly', 'Quarterly', 'Yearly']}
                    required
                    validation={{ required: 'Payment method is required' }}
                  />
                  <Input
                    label="Due Date"
                    name="dueDate"
                    register={register}
                    error={errors.dueDate}
                    icon={HiOutlineCurrencyDollar}
                    type="date"
                    required
                    validation={{ 
                      required: 'Due date is required',
                      validate: dateValidation
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Room Information</h3>
                  <Input
                    label="Bedrooms"
                    name="bedrooms"
                    register={register}
                    error={errors.bedrooms}
                    icon={FaBed}
                    type="number"
                    placeholder="Number of bedrooms"
                    required
                    validation={{ 
                      required: 'Number of bedrooms is required',
                      validate: positiveNumber
                    }}
                  />
                  <Input
                    label="Bathrooms"
                    name="bathrooms"
                    register={register}
                    error={errors.bathrooms}
                    icon={FaBed}
                    type="number"
                    placeholder="Number of bathrooms"
                    required
                    validation={{ 
                      required: 'Number of bathrooms is required',
                      validate: positiveNumber
                    }}
                  />
                  <Toggle label="Kitchen Available" name="kitchenAvailable" control={control} />
                  <Toggle label="Living Room" name="livingRoom" control={control} />
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        label="Home Size"
                        name="homeSize"
                        register={register}
                        error={errors.homeSize}
                        icon={FaBed}
                        type="number"
                        placeholder="Enter size"
                        required
                        validation={{ 
                          required: 'Home size is required',
                          validate: positiveNumber
                        }}
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        label="Unit"
                        name="sizeUnit"
                        register={register}
                        error={errors.sizeUnit}
                        options={['sq ft', 'm²']}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Utilities</h3>
                  <div className="space-y-3">
                    <Toggle label="Electricity" name="utilities.electricity" control={control} />
                    <Toggle label="Water" name="utilities.water" control={control} />
                    <Toggle label="Gas" name="utilities.gas" control={control} />
                    <Toggle label="Internet" name="utilities.internet" control={control} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Home Status</h3>
                  <Select
                    label="Status"
                    name="status"
                    register={register}
                    error={errors.status}
                    icon={HiOutlineBuildingOffice2}
                    options={['Vacant', 'Occupied', 'Maintenance', 'Reserved']}
                    required
                    validation={{ required: 'Status is required' }}
                  />
                  <Input
                    label="Contract Start Date"
                    name="contractStart"
                    register={register}
                    error={errors.contractStart}
                    icon={HiOutlineBuildingOffice2}
                    type="date"
                    required
                    validation={{ 
                      required: 'Contract start date is required',
                      validate: dateValidation
                    }}
                  />
                  <Input
                    label="Contract End Date"
                    name="contractEnd"
                    register={register}
                    error={errors.contractEnd}
                    icon={HiOutlineBuildingOffice2}
                    type="date"
                    required
                    validation={{ 
                      required: 'Contract end date is required',
                      validate: endDateValidation
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Additional Information</h3>
                <Textarea
                  label="Special Conditions"
                  name="specialConditions"
                  register={register}
                  error={errors.specialConditions}
                  icon={HiOutlineClipboardDocumentList}
                  placeholder="No Pets, Family Only, No Smoking"
                />
                <Textarea
                  label="Maintenance Notes"
                  name="maintenanceNotes"
                  register={register}
                  error={errors.maintenanceNotes}
                  icon={HiOutlineClipboardDocumentList}
                  placeholder="Enter any maintenance notes"
                />
              </div>
            </div>
          </motion.div>

          {/* Section 3: Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <HiOutlineDocument className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documents</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Upload Document</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300">
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                      <label
                        htmlFor="fileInput"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <HiOutlineCloudArrowUp className="text-4xl text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {selectedFile ? selectedFile.name : 'Click or drag to upload'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Supported files: PDF, JPG, PNG, DOC
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
                    >
                      <option>Lease Agreement</option>
                      <option>ID Card</option>
                      <option>Passport</option>
                      <option>Contract</option>
                      <option>Other</option>
                    </select>
                    
                    <button
                      onClick={handleFileUpload}
                      disabled={!selectedFile || isLoading}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <HiArrowUpTray />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <HiOutlineFolder className="text-blue-600 dark:text-blue-400" />
                  All Documents ({documents.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <AnimatePresence>
                        {documents.map((doc, index) => (
                          <motion.tr
                            key={doc.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
                          >
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <HiOutlineDocument className="text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{doc.type}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              <DateText value={doc.date} />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                  <HiOutlineEye size={20} />
                                </button>
                                <button className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                                  <HiArrowDownTray size={20} />
                                </button>
                                <button 
                                  onClick={() => deleteDocument(doc.id)}
                                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                                >
                                  <HiOutlineTrash size={20} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiXMark className="h-5 w-5" />
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <HiCheckCircle className="h-5 w-5" />
                  Update Tenant
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditTenant;