import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import PDFToolGrid from '../components/Tools/PDFToolGrid';
import FileUploadModal from '../components/Tools/FileUploadModal';
import { useCoin } from '../contexts/CoinContext';
import { useAuth } from '../contexts/AuthContext';

const { FiSearch, FiFilter, FiStar, FiZap, FiShield, FiTrendingUp } = FiIcons;

const ToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { earnCoins } = useCoin();
  const { user } = useAuth();

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'convert', name: 'Convert' },
    { id: 'edit', name: 'Edit' },
    { id: 'organize', name: 'Organize' },
    { id: 'security', name: 'Security' },
    { id: 'optimize', name: 'Optimize' }
  ];

  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Process files in seconds'
    },
    {
      icon: FiShield,
      title: '100% Secure',
      description: 'Your files are safe with us'
    },
    {
      icon: FiStar,
      title: 'Earn Coins',
      description: 'Get rewarded for every use'
    }
  ];

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setShowUploadModal(true);
  };

  const handleFileProcess = (files) => {
    if (user && selectedTool) {
      earnCoins(selectedTool.coins, selectedTool.name);
    }
    console.log('Processing files:', files, 'with tool:', selectedTool);
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Professional PDF Tools
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Complete suite of PDF tools to handle all your document needs. 
              Process files securely and earn coins for every action!
            </motion.p>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 mb-8"
            >
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <SafeIcon icon={feature.icon} className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div className="text-left">
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-sm">{feature.description}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Search and Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search PDF tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PDFToolGrid onToolSelect={handleToolSelect} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl font-bold mb-2">18+</div>
              <div className="text-primary-100">PDF Tools</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-primary-100">Files Processed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">Happy Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold mb-2">10M+</div>
              <div className="text-primary-100">Coins Earned</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Screen Upload Modal */}
      {selectedTool && (
        <FileUploadModal
          tool={selectedTool}
          onProcess={handleFileProcess}
          onClose={handleCloseModal}
          isOpen={showUploadModal}
        />
      )}
    </div>
  );
};

export default ToolsPage;