import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineDocument, 
  HiOutlineUpload, 
  HiOutlineTrash, 
  HiOutlineEye, 
  HiOutlineDownload,
  HiSun,
  HiMoon,
  HiOutlineCloudUpload,
  HiOutlineFolder
} from 'react-icons/hi';
import DateText from '../../components/common/DateText';

const DocumentManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('Lease Agreement');
  const [documents, setDocuments] = useState([
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
    },
    {
      id: 4,
      name: 'Contract_Signed.pdf',
      type: 'Contract',
      date: '2023-12-28',
      status: 'Rejected'
    }
  ]);

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle file upload (UI only)
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
      // Reset file input
      document.getElementById('fileInput').value = '';
    }, 1500);
  };

  // Delete document (UI only)
  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
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
          <button
            onClick={toggleTheme}
            // className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {/* {isDarkMode ? <HiSun size={24} /> : <HiMoon size={24} />} */}
          </button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
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
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        <DateText value={doc.date} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
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
  );
};

export default DocumentManagement;