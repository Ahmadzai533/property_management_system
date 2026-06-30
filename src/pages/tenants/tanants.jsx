import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaBed,
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCog,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineDocument,
  HiOutlineUpload,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineDownload,
  HiOutlineCloudUpload,
  HiOutlineFolder,
} from "react-icons/hi";

// ============================================================
// 1. HOME DETAILS COMPONENT (EXACTLY AS ORIGINAL)
// ============================================================
const HomeDetails = ({ value = {}, setValue, errors = {} }) => {
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

  const handleChange = (field) => (e) => {
    setValue({ ...value, [field]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Profile Upload - Exactly as original */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl">
            {value.preview ? (
              <img
                src={value.preview}
                alt="Tenant"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  NA
                </span>
              </div>
            )}
          </div>

          <input
            id="tenantPhoto"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setValue({ ...value, preview: URL.createObjectURL(file) });
              }
            }}
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

      {/* Personal Information - Exactly as original */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold border-b pb-3 mb-6 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* First Name */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter first name"
              value={value.firstName || ""}
              onChange={handleChange("firstName")}
              className={inputStyle}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter last name"
              value={value.lastName || ""}
              onChange={handleChange("lastName")}
              className={inputStyle}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter contact number"
              type="tel"
              value={value.phone || ""}
              onChange={handleChange("phone")}
              className={inputStyle}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Job */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Job <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter job title"
              value={value.job || ""}
              onChange={handleChange("job")}
              className={inputStyle}
            />
            {errors.job && (
              <p className="text-red-500 text-sm mt-1">{errors.job}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>
            <input
              placeholder="Enter age"
              type="number"
              value={value.age || ""}
              onChange={handleChange("age")}
              className={inputStyle}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Family Members */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Family Members <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Number of family members"
              type="number"
              value={value.familyMembers || ""}
              onChange={handleChange("familyMembers")}
              className={inputStyle}
            />
            {errors.familyMembers && (
              <p className="text-red-500 text-sm mt-1">{errors.familyMembers}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter email address"
              type="email"
              value={value.email || ""}
              onChange={handleChange("email")}
              className={inputStyle}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter password"
              type="password"
              value={value.password || ""}
              onChange={handleChange("password")}
              className={inputStyle}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>
      </div>

      {/* Previous Address - Exactly as original */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold border-b pb-3 mb-6 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
          Previous Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              placeholder="Enter previous address"
              value={value.previousAddress || ""}
              onChange={handleChange("previousAddress")}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <input
              placeholder="Enter country"
              value={value.previousCountry || ""}
              onChange={handleChange("previousCountry")}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <input
              placeholder="Enter state"
              value={value.previousState || ""}
              onChange={handleChange("previousState")}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              City
            </label>
            <input
              placeholder="Enter city"
              value={value.previousCity || ""}
              onChange={handleChange("previousCity")}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Zip Code
            </label>
            <input
              placeholder="Enter zip code"
              value={value.previousZip || ""}
              onChange={handleChange("previousZip")}
              className={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Permanent Address - Exactly as original */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold border-b pb-3 mb-6 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
          Permanent Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter permanent address"
              value={value.address || ""}
              onChange={handleChange("address")}
              className={inputStyle}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter country"
              value={value.country || ""}
              onChange={handleChange("country")}
              className={inputStyle}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              State <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter state"
              value={value.state || ""}
              onChange={handleChange("state")}
              className={inputStyle}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              City <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter city"
              value={value.city || ""}
              onChange={handleChange("city")}
              className={inputStyle}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter zip code"
              value={value.zipCode || ""}
              onChange={handleChange("zipCode")}
              className={inputStyle}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 2. PROPERTY DETAILS COMPONENT (EXACTLY AS ORIGINAL)
// ============================================================
const PropertyDetails = ({ value = {}, setValue, errors = {} }) => {
  const handleChange = (field) => (e) => {
    setValue({ ...value, [field]: e.target.value });
  };

  const handleToggle = (field) => (e) => {
    setValue({ ...value, [field]: e.target.checked });
  };

  const handleUtilityToggle = (util) => (e) => {
    setValue({
      ...value,
      utilities: { ...(value.utilities || {}), [util]: e.target.checked },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Property Information */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaHome className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Property Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Property Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter property name"
              value={value.propertyName || ""}
              onChange={handleChange("propertyName")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.propertyName && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.propertyName}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              value={value.propertyType || ""}
              onChange={handleChange("propertyType")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">Select Property Type</option>
              {["Apartment", "House", "Villa", "Room", "Office", "Shop", "Warehouse"].map(
                (opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                )
              )}
            </select>
            {errors.propertyType && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.propertyType}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Unit Number <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Example: A-12"
              value={value.unitNumber || ""}
              onChange={handleChange("unitNumber")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.unitNumber && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.unitNumber}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nearby Landmark
            </label>
            <input
              placeholder="Mosque, School, Market, Hospital"
              value={value.nearbyLandmark || ""}
              onChange={handleChange("nearbyLandmark")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaMapMarkerAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Address Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter country"
              value={value.country || ""}
              onChange={handleChange("country")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.country && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.country}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              City <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter city"
              value={value.city || ""}
              onChange={handleChange("city")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.city && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.city}
              </p>
            )}
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter complete address"
              rows={3}
              value={value.fullAddress || ""}
              onChange={handleChange("fullAddress")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            {errors.fullAddress && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.fullAddress}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rental Information */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaDollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rental Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Rent <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter monthly rent"
              value={value.monthlyRent || ""}
              onChange={handleChange("monthlyRent")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.monthlyRent && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.monthlyRent}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Security Deposit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter security deposit"
              value={value.securityDeposit || ""}
              onChange={handleChange("securityDeposit")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.securityDeposit && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.securityDeposit}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              value={value.paymentMethod || ""}
              onChange={handleChange("paymentMethod")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">Select Payment Method</option>
              {["Monthly", "Weekly", "Quarterly", "Yearly"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.paymentMethod && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.paymentMethod}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={value.dueDate || ""}
              onChange={handleChange("dueDate")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.dueDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Room Information */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaBed className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Room Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bedrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Number of bedrooms"
              value={value.bedrooms || ""}
              onChange={handleChange("bedrooms")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.bedrooms && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.bedrooms}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bathrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Number of bathrooms"
              value={value.bathrooms || ""}
              onChange={handleChange("bathrooms")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.bathrooms && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.bathrooms}
              </p>
            )}
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={value.kitchenAvailable || false}
                onChange={handleToggle("kitchenAvailable")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Kitchen Available
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={value.livingRoom || false}
                onChange={handleToggle("livingRoom")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Living Room
            </label>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Home Size <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter size"
                value={value.homeSize || ""}
                onChange={handleChange("homeSize")}
                className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.homeSize && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.homeSize}
                </p>
              )}
            </div>
            <div className="w-32 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Unit
              </label>
              <select
                value={value.sizeUnit || "sq ft"}
                onChange={handleChange("sizeUnit")}
                className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                <option value="sq ft">sq ft</option>
                <option value="m²">m²</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Utilities */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaCog className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Utilities
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["electricity", "water", "gas", "internet"].map((util) => (
            <label
              key={util}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                checked={value.utilities?.[util] || false}
                onChange={handleUtilityToggle(util)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              {util.charAt(0).toUpperCase() + util.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Home Status */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaBuilding className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Home Status
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={value.status || ""}
              onChange={handleChange("status")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">Select Status</option>
              {["Vacant", "Occupied", "Maintenance", "Reserved"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.status}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contract Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={value.contractStart || ""}
              onChange={handleChange("contractStart")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.contractStart && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.contractStart}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contract End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={value.contractEnd || ""}
              onChange={handleChange("contractEnd")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.contractEnd && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span>•</span> {errors.contractEnd}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4 p-6 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <FaClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Additional Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Special Conditions
            </label>
            <textarea
              placeholder="No Pets, Family Only, No Smoking"
              rows={3}
              value={value.specialConditions || ""}
              onChange={handleChange("specialConditions")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Maintenance Notes
            </label>
            <textarea
              placeholder="Enter any maintenance notes"
              rows={3}
              value={value.maintenanceNotes || ""}
              onChange={handleChange("maintenanceNotes")}
              className="w-full pl-4 pr-4 py-2.5 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 3. DOCUMENTS COMPONENT (EXACTLY AS ORIGINAL)
// ============================================================
const Documents = ({ value = {}, setValue, errors = {} }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("Lease Agreement");
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Lease_Agreement_2024.pdf",
      type: "Lease Agreement",
      date: "2024-01-15",
      status: "Approved",
    },
    {
      id: 2,
      name: "Tenant_ID_Card.jpg",
      type: "ID Card",
      date: "2024-01-10",
      status: "Pending",
    },
    {
      id: 3,
      name: "Passport_Scan.pdf",
      type: "Passport",
      date: "2024-01-05",
      status: "Approved",
    },
    {
      id: 4,
      name: "Contract_Signed.pdf",
      type: "Contract",
      date: "2023-12-28",
      status: "Rejected",
    },
  ]);

  const handleFileUpload = () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: selectedFile.name,
        type: documentType,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      };
      setDocuments([newDocument, ...documents]);
      setSelectedFile(null);
      setIsLoading(false);
      setValue({ ...value, documents: [newDocument, ...documents] });
      document.getElementById("fileInput").value = "";
    }, 1500);
  };

  const deleteDocument = (id) => {
    const filtered = documents.filter((doc) => doc.id !== id);
    setDocuments(filtered);
    setValue({ ...value, documents: filtered });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <HiOutlineDocument className="text-blue-600 dark:text-blue-400" />
                Documents
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage tenant files and records
              </p>
            </div>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HiOutlineCloudUpload className="text-blue-600 dark:text-blue-400" />
              Upload Document
            </h2>

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
                    <HiOutlineCloudUpload className="text-4xl text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {selectedFile ? selectedFile.name : "Click or drag to upload"}
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
                  {["Lease Agreement", "ID Card", "Passport", "Contract", "Other"].map(
                    (opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    )
                  )}
                </select>

                <button
                  onClick={handleFileUpload}
                  disabled={!selectedFile || isLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <HiOutlineUpload />
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Documents List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <HiOutlineFolder className="text-blue-600 dark:text-blue-400" />
                All Documents ({documents.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <HiOutlineDocument className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {doc.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {doc.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              doc.status
                            )}`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                              <HiOutlineEye size={20} />
                            </button>
                            <button className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                              <HiOutlineDownload size={20} />
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 4. PARENT COMPONENT (Multi-step Create Tenant)
// ============================================================
const TenantForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Home Details
    preview: null,
    firstName: "",
    lastName: "",
    phone: "",
    job: "",
    age: "",
    familyMembers: "",
    email: "",
    password: "",
    previousAddress: "",
    previousCountry: "",
    previousState: "",
    previousCity: "",
    previousZip: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    // Property Details
    propertyName: "",
    propertyType: "",
    unitNumber: "",
    nearbyLandmark: "",
    fullAddress: "",
    monthlyRent: "",
    securityDeposit: "",
    paymentMethod: "",
    dueDate: "",
    bedrooms: "",
    bathrooms: "",
    kitchenAvailable: false,
    livingRoom: false,
    homeSize: "",
    sizeUnit: "sq ft",
    utilities: { electricity: false, water: false, gas: false, internet: false },
    status: "",
    contractStart: "",
    contractEnd: "",
    specialConditions: "",
    maintenanceNotes: "",
    // Documents
    documents: [],
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "job",
      "familyMembers",
      "email",
      "password",
      "address",
      "country",
      "state",
      "city",
      "zipCode",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });
    if (formData.phone && !/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }
    if (formData.age && (Number(formData.age) < 18 || Number(formData.age) > 100)) {
      newErrors.age = "Age must be between 18 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const requiredFields = [
      "propertyName",
      "propertyType",
      "unitNumber",
      "fullAddress",
      "country",
      "city",
      "monthlyRent",
      "securityDeposit",
      "paymentMethod",
      "dueDate",
      "bedrooms",
      "bathrooms",
      "homeSize",
      "status",
      "contractStart",
      "contractEnd",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });
    if (formData.monthlyRent && Number(formData.monthlyRent) <= 0) {
      newErrors.monthlyRent = "Must be greater than zero";
    }
    if (formData.securityDeposit && Number(formData.securityDeposit) <= 0) {
      newErrors.securityDeposit = "Must be greater than zero";
    }
    if (formData.bedrooms && Number(formData.bedrooms) <= 0) {
      newErrors.bedrooms = "Must be greater than zero";
    }
    if (formData.bathrooms && Number(formData.bathrooms) <= 0) {
      newErrors.bathrooms = "Must be greater than zero";
    }
    if (formData.homeSize && Number(formData.homeSize) <= 0) {
      newErrors.homeSize = "Must be greater than zero";
    }
    if (formData.contractStart && formData.contractEnd) {
      if (new Date(formData.contractEnd) < new Date(formData.contractStart)) {
        newErrors.contractEnd = "End date must be after start date";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("All Form Data:", formData);
      setIsSubmitting(false);
      navigate("/tenants/property");
    }, 1500);
  };

  // Progress bar calculation
  const progress = ((step - 1) / 2) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-2 md:p-4 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-t-lg bg-blue-600 dark:bg-blue-800 p-2 md:pl-5 mt-4">
          <h1 className="md:text-3xl font-bold text-white text-xl">
            Create Tenant
          </h1>
          <p className="text-gray-900 dark:text-gray-200 font-medium mt-2 text-sm md:text-lg">
            Complete all steps to create a new tenant
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-xl p-2 md:p-8 dark:border dark:border-white/20">
          {/* Progress Bar & Step Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {step} of 3
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {step === 1 && "Home Details"}
                {step === 2 && "Property Details"}
                {step === 3 && "Documents"}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div
                className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <HomeDetails
                value={formData}
                setValue={setFormData}
                errors={errors}
              />
            )}
            {step === 2 && (
              <PropertyDetails
                value={formData}
                setValue={setFormData}
                errors={errors}
              />
            )}
            {step === 3 && (
              <Documents
                value={formData}
                setValue={setFormData}
                errors={errors}
              />
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div>
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrevious}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiArrowLeft className="h-5 w-5" />
                  Previous
                </motion.button>
              )}
            </div>

            <div>
              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  Next →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Tenant"
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TenantForm;