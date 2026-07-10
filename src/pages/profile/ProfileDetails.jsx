import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, Mail, Phone, Calendar, Users, Building, 
  MapPin, UserCog, Briefcase 
} from 'lucide-react';

const ProfileDetails = ({ defaultValues, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      companyName: '',
      businessEmail: '',
      businessPhone: '',
      address: '',
    }
  });

  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    icon: Icon, 
    placeholder, 
    required = false,
    className = '',
    registerOptions = {}
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 bg-white dark:bg-slate-800 border ${
            errors[name] ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'
          } rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...registerOptions
          })}
        />
      </div>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 dark:text-red-400 mt-1"
        >
          {errors[name].message}
        </motion.p>
      )}
    </div>
  );

  const TextareaField = ({ 
    label, 
    name, 
    icon: Icon, 
    placeholder, 
    required = false,
    rows = 3
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-3 text-slate-400 dark:text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 bg-white dark:bg-slate-800 border ${
            errors[name] ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'
          } rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
        />
      </div>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 dark:text-red-400 mt-1"
        >
          {errors[name].message}
        </motion.p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              icon={User}
              placeholder="Enter first name"
              required
              registerOptions={{
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters required'
                }
              }}
            />
            <InputField
              label="Last Name"
              name="lastName"
              icon={User}
              placeholder="Enter last name"
              required
              registerOptions={{
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters required'
                }
              }}
            />
            <InputField
              label="Username"
              name="username"
              icon={UserCog}
              placeholder="Enter username"
              required
              registerOptions={{
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters required'
                }
              }}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              placeholder="Enter email address"
              required
              registerOptions={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              }}
            />
            <InputField
              label="Phone Number"
              name="phone"
              icon={Phone}
              placeholder="Enter phone number"
              required
              registerOptions={{
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  message: 'Invalid phone number'
                }
              }}
            />
            <InputField
              label="Date of Birth"
              name="dob"
              type="date"
              icon={Calendar}
              required
            />
            <div className="md:col-span-2">
              <InputField
                label="Gender"
                name="gender"
                icon={Users}
                placeholder="Enter gender"
              />
            </div>
          </div>
        </motion.div>

        {/* Company Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Company Name"
              name="companyName"
              icon={Building}
              placeholder="Enter company name"
              required
            />
            <InputField
              label="Business Email"
              name="businessEmail"
              type="email"
              icon={Mail}
              placeholder="Enter business email"
              registerOptions={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              }}
            />
            <InputField
              label="Business Phone"
              name="businessPhone"
              icon={Phone}
              placeholder="Enter business phone"
              registerOptions={{
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  message: 'Invalid phone number'
                }
              }}
            />
            <div className="md:col-span-2">
              <TextareaField
                label="Office Address"
                name="address"
                icon={MapPin}
                placeholder="Enter office address"
                rows={3}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ProfileDetails;