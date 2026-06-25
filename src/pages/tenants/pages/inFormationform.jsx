import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaBriefcase, 
  FaCalendarAlt,
  FaUsers,
  FaHome,
  FaGlobe,
  FaCity,
  FaMapPin,
  FaCamera,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';

const TenantForm = () => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { 
    control, 
    handleSubmit, 
    trigger, 
    watch, 
    formState: { errors, isValid } 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      contactNumber: '',
      job: '',
      age: '',
      familyMembers: '',
      email: '',
      password: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      permanentAddress: '',
      permanentCountry: '',
      permanentState: '',
      permanentCity: '',
      permanentZipCode: ''
    }
  });

  const stepFields = {
    1: ['firstName', 'lastName', 'contactNumber', 'familyMembers', 'email', 'password', 'job', 'age'],
    2: ['address', 'country', 'state', 'city', 'zipCode'],
    3: ['permanentAddress', 'permanentCountry', 'permanentState', 'permanentCity', 'permanentZipCode']
  };

  const requiredFields = {
    1: ['firstName', 'lastName', 'contactNumber', 'familyMembers', 'email', 'password'],
    2: [],
    3: ['permanentAddress', 'permanentState', 'permanentCity', 'permanentZipCode']
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };

  const nextStep = async () => {
    const fieldsToValidate = stepFields[step];
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && (step !== 1 || profileImage)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    console.log('Form Data:', { ...data, profileImage });
    alert('Form submitted successfully!');
  };

  const isStepValid = () => {
    const required = requiredFields[step];
    const values = watch();
    
    if (step === 1 && !profileImage) return false;
    
    for (let field of required) {
      if (!values[field] || values[field].trim() === '') {
        return false;
      }
    }
    return true;
  };

  const stepTitles = {
    1: 'Personal Information',
    2: 'Previous Address',
    3: 'Permanent Address'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full "
      >
        <h1>this is add section </h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* <h1>Ad</h1> */}
          {/* Header */}
          <div className="px-6 py-5 border-b b  bg-blue-600">
            <h2 className="text-2xl font-bold text-white">
              Tenant Information
            </h2>
            <p className="text-sm text-gray-900 font-bold mt-1">
              Step {step} of 3: {stepTitles[step]}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${step >= num ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-300 text-gray-600'}
                  `}>
                    {step > num ? <FaCheckCircle /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`
                      w-16 h-1 mx-2 rounded-full transition-all duration-300
                      ${step > num ? 'bg-blue-600' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {step === 1 && (
                  <>
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative">
                        <div 
                          className="w-28 h-28 rounded-full bg-gray-200 border-4 border-blue-100 overflow-hidden cursor-pointer hover:border-blue-300 transition-all duration-300"
                          onClick={triggerImageUpload}
                        >
                          {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                              <FaUser className="text-4xl text-blue-400" />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={triggerImageUpload}
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-200"
                        >
                          <FaCamera size={14} />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      {!profileImage && (
                        <p className="text-xs text-red-500 mt-2 animate-pulse">
                          * Profile image is required
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: 'First name is required' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="John"
                              />
                            )}
                          />
                        </div>
                        {errors.firstName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.firstName.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="lastName"
                            control={control}
                            rules={{ required: 'Last name is required' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="Doe"
                              />
                            )}
                          />
                        </div>
                        {errors.lastName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.lastName.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number *
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="contactNumber"
                            control={control}
                            rules={{ 
                              required: 'Contact number is required',
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Must be a valid number'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="tel"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="1234567890"
                              />
                            )}
                          />
                        </div>
                        {errors.contactNumber && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.contactNumber.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Family Members *
                        </label>
                        <div className="relative">
                          <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="familyMembers"
                            control={control}
                            rules={{ 
                              required: 'Number of family members is required',
                              min: {
                                value: 1,
                                message: 'Must be at least 1'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="2"
                              />
                            )}
                          />
                        </div>
                        {errors.familyMembers && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.familyMembers.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="email"
                            control={control}
                            rules={{ 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="email"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="john@example.com"
                              />
                            )}
                          />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password *
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="password"
                            control={control}
                            rules={{ 
                              required: 'Password is required',
                              minLength: {
                                value: 6,
                                message: 'Minimum 6 characters'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="password"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="••••••"
                              />
                            )}
                          />
                        </div>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.password.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job (Optional)
                        </label>
                        <div className="relative">
                          <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="job"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="Software Engineer"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age (Optional)
                        </label>
                        <div className="relative">
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="age"
                            control={control}
                            rules={{
                              min: {
                                value: 1,
                                message: 'Age must be positive'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="25"
                              />
                            )}
                          />
                        </div>
                        {errors.age && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.age.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address (Optional)
                      </label>
                      <div className="relative">
                        <FaHome className="absolute left-3 top-3 text-gray-400" />
                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              rows="2"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none resize-none"
                              placeholder="123 Main St"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country (Optional)
                        </label>
                        <div className="relative">
                          <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="United States"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State (Optional)
                        </label>
                        <div className="relative">
                          <FaMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="California"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City (Optional)
                        </label>
                        <div className="relative">
                          <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="Los Angeles"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code (Optional)
                        </label>
                        <div className="relative">
                          <FaMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="zipCode"
                            control={control}
                            rules={{
                              pattern: {
                                value: /^[0-9]*$/,
                                message: 'Must be numeric'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="90210"
                              />
                            )}
                          />
                        </div>
                        {errors.zipCode && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.zipCode.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Permanent Address *
                      </label>
                      <div className="relative">
                        <FaHome className="absolute left-3 top-3 text-gray-400" />
                        <Controller
                          name="permanentAddress"
                          control={control}
                          rules={{ required: 'Permanent address is required' }}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              rows="2"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none resize-none"
                              placeholder="456 Oak Ave"
                            />
                          )}
                        />
                      </div>
                      {errors.permanentAddress && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 mt-1"
                        >
                          {errors.permanentAddress.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country (Optional)
                        </label>
                        <div className="relative">
                          <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="permanentCountry"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="United States"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <div className="relative">
                          <FaMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="permanentState"
                            control={control}
                            rules={{ required: 'State is required' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="California"
                              />
                            )}
                          />
                        </div>
                        {errors.permanentState && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.permanentState.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <div className="relative">
                          <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="permanentCity"
                            control={control}
                            rules={{ required: 'City is required' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="Los Angeles"
                              />
                            )}
                          />
                        </div>
                        {errors.permanentCity && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.permanentCity.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code *
                        </label>
                        <div className="relative">
                          <FaMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Controller
                            name="permanentZipCode"
                            control={control}
                            rules={{ 
                              required: 'Zip code is required',
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Must be numeric'
                              }
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-all duration-200 outline-none"
                                placeholder="90210"
                              />
                            )}
                          />
                        </div>
                        {errors.permanentZipCode && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            {errors.permanentZipCode.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <div>
                {step > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                  >
                    <FaArrowLeft size={14} />
                    Back
                  </motion.button>
                )}
              </div>

              <div>
                {step < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!isStepValid()}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                      isStepValid()
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <FaArrowRight size={14} />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md transition-all duration-200 font-medium"
                  >
                    <FaCheckCircle size={16} />
                    Submit
                  </motion.button>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default TenantForm;