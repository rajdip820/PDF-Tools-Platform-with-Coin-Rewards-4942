import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiDownload, FiShield, FiZap, FiStar, FiUsers, FiTrendingUp, FiAward } = FiIcons;

const HomePage = () => {
  const features = [
    {
      icon: FiFileText,
      title: 'All PDF Tools',
      description: 'Merge, split, compress, convert, and edit PDFs with ease'
    },
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Process your files instantly with our optimized algorithms'
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Your files are processed securely and deleted after use'
    },
    {
      icon: FiAward,
      title: 'Earn Rewards',
      description: 'Collect coins for every tool you use and redeem for rewards'
    }
  ];

  const stats = [
    { label: 'Files Processed', value: '1M+', icon: FiFileText },
    { label: 'Happy Users', value: '50K+', icon: FiUsers },
    { label: 'Tools Available', value: '15+', icon: FiZap },
    { label: 'Coins Distributed', value: '10M+', icon: FiStar }
  ];

  const tools = [
    'Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Word', 'Word to PDF',
    'PDF to Excel', 'Excel to PDF', 'PDF to PowerPoint', 'PowerPoint to PDF',
    'PDF to Image', 'Image to PDF', 'Protect PDF', 'Unlock PDF', 'Edit PDF',
    'Rotate PDF', 'Add Watermark', 'Remove Pages', 'OCR Text Recognition'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              All-in-One
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {' '}PDF Tools
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Process your PDFs with professional tools and earn coins for every action. 
              Redeem coins for Google Play codes or UPI money!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/tools"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Using Tools
              </Link>
              <Link
                to="/signup"
                className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 px-8 py-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-semibold text-lg"
              >
                Sign Up & Earn Coins
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiShield} className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiZap} className="w-4 h-4" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>No Registration Required</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PDFTools?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional PDF processing with a rewarding experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <SafeIcon icon={stat.icon} className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Available PDF Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to work with PDFs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {tool}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tools"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              <span>View All Tools</span>
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who are already earning coins while processing their PDFs
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;