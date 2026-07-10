import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, User, Mail, Phone, Building, Calendar, Clock,
  Edit, Key, CheckCircle, MapPin, Briefcase 
} from 'lucide-react';

const ProfileHeader = ({ user, onImageChange, onEdit, onChangePassword }) => {
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center lg:justify-start">
          <div className="relative">
            <motion.div
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-800 border-4 border-white dark:border-slate-700 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-14 h-14 text-slate-400 dark:text-slate-500" />
                </div>
              )}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Camera className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </motion.div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center lg:justify-start">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {user.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                {user.role}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {user.status}
              </span>
            </div>
          </div>
          
          {user.username && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              @{user.username}
            </p>
          )}
          
          {user.company && (
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 text-slate-600 dark:text-slate-400">
              <Building className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{user.company}</span>
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate max-w-[180px]">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{user.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {user.memberSince}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Last login {user.lastLogin}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 justify-center lg:justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onChangePassword}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all duration-200"
          >
            <Key className="w-4 h-4" />
            Change Password
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;