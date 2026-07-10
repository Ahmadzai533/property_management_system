import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import SecuritySettings from './SecuritySettings';

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // User Data
  const [user, setUser] = useState({
    name: 'Alex Sterling',
    username: 'alexsterling',
    role: 'Owner',
    status: 'Active',
    company: 'Sterling Properties LLC',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    memberSince: 'January 15, 2020',
    lastLogin: 'Today at 2:30 PM',
  });

  // Form Default Values
  const defaultFormValues = {
    firstName: 'Alex',
    lastName: 'Sterling',
    username: 'alexsterling',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1985-06-15',
    gender: 'Male',
    companyName: 'Sterling Properties LLC',
    businessEmail: 'business@sterlingproperties.com',
    businessPhone: '+1 (555) 987-6543',
    address: '123 Main Street, Suite 400, New York, NY 10001',
  };

  // Account Info
  const accountInfo = {
    role: 'Owner',
    accountStatus: 'Active',
    emailVerified: true,
    memberSince: 'January 15, 2020',
    lastLogin: 'Today at 2:30 PM',
  };

  // Preferences
  const defaultPreferences = {
    language: 'en',
    darkMode: false,
    emailNotifications: true,
  };

  // Handlers
  const handleImageChange = (image) => {
    setUser(prev => ({ ...prev, avatar: image }));
  };

  const handleEditProfile = () => {
    // Scroll to ProfileDetails section
    document.getElementById('profile-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangePassword = () => {
    // Scroll to Security section
    document.getElementById('security-settings')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileUpdate = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    console.log('Profile updated:', data);
  };

  const handlePasswordUpdate = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    console.log('Password updated:', data);
  };

  const handlePreferencesSave = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    console.log('Preferences saved:', data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:px-5 max-w-7xl mx-auto"
    >
      {/* Breadcrumb */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="mb-5 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 p-4 shadow-lg"
>
  {/* Breadcrumb */}
  <div className="mb-4 flex items-center text-sm text-purple-100">
    <Link
      to="/dashboard"
      className="transition hover:text-white"
    >
      Dashboard
    </Link>

    <span className="mx-2 text-purple-200">&gt;</span>

    <span className="text-sm text-white">
      Owner Profile
    </span>
  </div>

  {/* Header */}
  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
    <div>
      <h1 className=" text-lg md:text-4xl font-bold text-white">
        Owner Profile
      </h1>

      <p className="mt-2 max-w-2xl text-purple-100 text-sm md:text-lg">
        Manage your personal information, company details, account security,
        and profile preferences from one place.
      </p>
    </div>

  
  
  </div>
</motion.div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
        >
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
            ✓
          </div>
          <span className="text-green-700 dark:text-green-300">Changes saved successfully!</span>
        </motion.div>
      )}

      {/* Profile Header */}
      <ProfileHeader
        user={user}
        onImageChange={handleImageChange}
        onEdit={handleEditProfile}
        onChangePassword={handleChangePassword}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Profile Details */}
        <div id="profile-details" className="space-y-6">
          <ProfileDetails
            defaultValues={defaultFormValues}
            onSubmit={handleProfileUpdate}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column - Security Settings */}
        <div id="security-settings" className="space-y-6">
          <SecuritySettings
            securityDefaults={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            preferences={defaultPreferences}
            accountInfo={accountInfo}
            onUpdatePassword={handlePasswordUpdate}
            onSavePreferences={handlePreferencesSave}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center"
      >
        <p className="text-xs text-slate-400 dark:text-slate-500">
          All changes are saved securely. Your data is protected with industry-standard encryption.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default OwnerProfile;