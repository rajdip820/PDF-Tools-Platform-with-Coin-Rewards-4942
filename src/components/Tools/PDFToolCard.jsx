import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar } = FiIcons;

const PDFToolCard = ({ tool, onUse }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header with gradient */}
      <div className={`h-24 bg-gradient-to-r ${tool.color} relative`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative h-full flex items-center justify-center">
          <SafeIcon icon={tool.icon} className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {tool.name}
          </h3>
          <div className="flex items-center space-x-1 bg-accent-50 dark:bg-accent-900/20 px-2 py-1 rounded-full">
            <span className="text-accent-600 dark:text-accent-400">🪙</span>
            <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
              {tool.coins}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <button
          onClick={onUse}
          className={`w-full bg-gradient-to-r ${tool.color} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium`}
        >
          Use Tool
        </button>
      </div>
    </motion.div>
  );
};

export default PDFToolCard;