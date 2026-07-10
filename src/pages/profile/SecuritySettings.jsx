import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Eye, EyeOff, Lock, Shield, Globe, Moon, Bell,
  Calendar, Clock, Mail, User, CheckCircle, XCircle
} from 'lucide-react';

const SecuritySettings = ({ 
  securityDefaults, 
  preferences, 
  accountInfo,
  onUpdatePassword,
  onSavePreferences,
  isLoading 
}) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    watch: watchSecurity,
    formState: { errors: securityErrors },
    reset: resetSecurity
  } = useForm({
    defaultValues: securityDefaults || {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const {
    register: registerPreferences,
    handleSubmit: handlePreferencesSubmit,
    watch: watchPreferences,
    setValue: setPreferenceValue,
  } = useForm({
    defaultValues: preferences || {
      language: 'en',
      darkMode: false,
      emailNotifications: true,
    }
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: 'Enter password', color: 'bg-slate-200 dark:bg-slate-700' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    const strengths = [
      { label: 'Very Weak', color: 'bg-red-500' },
      { label: 'Weak', color: 'bg-orange-500' },
      { label: 'Fair', color: 'bg-yellow-500' },
      { label: 'Good', color: 'bg-blue-500' },
      { label: 'Strong', color: 'bg-green-500' },
    ];
    
    return { score, ...strengths[score] };
  };

  const newPassword = watchSecurity('newPassword');
  const passwordStrength = getPasswordStrength(newPassword || '');
  const currentPreferences = watchPreferences();

  const SecurityInput = ({ 
    label, 
    name, 
    type = 'password', 
    icon: Icon, 
    placeholder, 
    required = false,
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
          type={showPassword[name] ? 'text' : type}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-10 py-2.5 bg-white dark:bg-slate-800 border ${
            securityErrors[name] ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'
          } rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
          {...registerSecurity(name, {
            required: required ? `${label} is required` : false,
            ...registerOptions
          })}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(name)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          {showPassword[name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {securityErrors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 dark:text-red-400 mt-1"
        >
          {securityErrors[name].message}
        </motion.p>
      )}
    </div>
  );

  const SwitchToggle = ({ name, label, description }) => {
    const value = watchPreferences(name);
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => setPreferenceValue(name, !value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            value ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
          }`}
        >
          <motion.span
            initial={false}
            animate={{ x: value ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg"
          />
        </button>
      </div>
    );
  };

  const InfoItem = ({ icon: Icon, label, value, badge, badgeColor }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge ? (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {value}
          </span>
        ) : (
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {value}
          </span>
        )}
        {label === 'Email Verified' && (
          badge ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="space-y-6"
    >
      {/* Security Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Security
        </h3>

        <form onSubmit={handleSecuritySubmit(onUpdatePassword)}>
          <div className="space-y-4">
            <SecurityInput
              label="Current Password"
              name="currentPassword"
              icon={Lock}
              placeholder="Enter current password"
              required
            />
            
            <SecurityInput
              label="New Password"
              name="newPassword"
              icon={Lock}
              placeholder="Enter new password"
              required
              registerOptions={{
                minLength: {
                  value: 8,
                  message: 'Minimum 8 characters required'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/,
                  message: 'Must include uppercase, lowercase, number, and special character'
                }
              }}
            />
            
            {newPassword && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {passwordStrength.label}
                  </span>
                </div>
                <ul className="grid grid-cols-2 gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    Min 8 characters
                  </li>
                  <li className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    Uppercase & lowercase
                  </li>
                  <li className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${/\d/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    Number
                  </li>
                  <li className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${/[^a-zA-Z0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    Special character
                  </li>
                </ul>
              </div>
            )}
            
            <SecurityInput
              label="Confirm New Password"
              name="confirmPassword"
              icon={Lock}
              placeholder="Confirm new password"
              required
              registerOptions={{
                validate: value => 
                  value === watchSecurity('newPassword') || 'Passwords do not match'
              }}
            />
            
            <div className="flex gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => resetSecurity()}
                className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Preferences Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Preferences
        </h3>

        <form onSubmit={handlePreferencesSubmit(onSavePreferences)}>
          <div className="space-y-4">
            {/* Language */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Language
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
                <select
                  className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  {...registerPreferences('language')}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>

            {/* Dark Mode Switch */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <SwitchToggle
                name="darkMode"
                label="Dark Mode"
                description="Switch between light and dark theme"
              />
            </div>

            {/* Email Notifications Switch */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <SwitchToggle
                name="emailNotifications"
                label="Email Notifications"
                description="Receive email notifications about your account"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setPreferenceValue('language', preferences?.language || 'en');
                  setPreferenceValue('darkMode', preferences?.darkMode || false);
                  setPreferenceValue('emailNotifications', preferences?.emailNotifications || true);
                }}
                className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Account Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Account Information
        </h3>
        
        <div className="space-y-1">
          <InfoItem
            icon={User}
            label="Role"
            value={accountInfo?.role || 'Owner'}
          />
          <InfoItem
            icon={Shield}
            label="Account Status"
            value={accountInfo?.accountStatus || 'Active'}
            badge={true}
            badgeColor={accountInfo?.accountStatus === 'Active' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
            }
          />
          <InfoItem
            icon={Mail}
            label="Email Verified"
            value={accountInfo?.emailVerified ? 'Verified' : 'Not Verified'}
            badge={accountInfo?.emailVerified}
            badgeColor={accountInfo?.emailVerified 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }
          />
          <InfoItem
            icon={Calendar}
            label="Member Since"
            value={accountInfo?.memberSince || 'January 15, 2020'}
          />
          <InfoItem
            icon={Clock}
            label="Last Login"
            value={accountInfo?.lastLogin || 'Today at 2:30 PM'}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecuritySettings;