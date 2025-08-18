import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiLayers, FiScissors, FiMinimize2, FiFileText, FiFile,
  FiBarChart, FiGrid, FiMonitor, FiPresentation, FiImage,
  FiCamera, FiLock, FiUnlock, FiEdit, FiRotateCw,
  FiDroplet, FiTrash2, FiEye, FiShield, FiDownload
} = FiIcons;

const PDFToolGrid = ({ onToolSelect }) => {
  const toolCategories = [
    {
      title: "Convert & Transform",
      tools: [
        {
          id: 'pdf-to-word',
          name: 'PDF to Word',
          description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.',
          icon: FiFileText,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          coins: 6,
          category: 'convert'
        },
        {
          id: 'word-to-pdf',
          name: 'Word to PDF',
          description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
          icon: FiFile,
          iconColor: 'text-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
          coins: 6,
          category: 'convert'
        },
        {
          id: 'pdf-to-excel',
          name: 'PDF to Excel',
          description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
          icon: FiBarChart,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          coins: 7,
          category: 'convert'
        },
        {
          id: 'excel-to-pdf',
          name: 'Excel to PDF',
          description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
          icon: FiGrid,
          iconColor: 'text-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
          coins: 7,
          category: 'convert'
        },
        {
          id: 'pdf-to-powerpoint',
          name: 'PDF to PowerPoint',
          description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.',
          icon: FiMonitor,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          coins: 8,
          category: 'convert'
        },
        {
          id: 'powerpoint-to-pdf',
          name: 'PowerPoint to PDF',
          description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
          icon: FiPresentation,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          coins: 8,
          category: 'convert'
        }
      ]
    },
    {
      title: "Organize & Manage",
      tools: [
        {
          id: 'merge-pdf',
          name: 'Merge PDF',
          description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
          icon: FiLayers,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          coins: 5,
          category: 'organize'
        },
        {
          id: 'split-pdf',
          name: 'Split PDF',
          description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
          icon: FiScissors,
          iconColor: 'text-pink-600',
          bgColor: 'bg-pink-50 dark:bg-pink-900/20',
          coins: 3,
          category: 'organize'
        },
        {
          id: 'compress-pdf',
          name: 'Compress PDF',
          description: 'Reduce file size while optimizing for maximal PDF quality.',
          icon: FiMinimize2,
          iconColor: 'text-cyan-600',
          bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
          coins: 4,
          category: 'optimize'
        },
        {
          id: 'rotate-pdf',
          name: 'Rotate PDF',
          description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
          icon: FiRotateCw,
          iconColor: 'text-teal-600',
          bgColor: 'bg-teal-50 dark:bg-teal-900/20',
          coins: 2,
          category: 'organize'
        },
        {
          id: 'remove-pages',
          name: 'Remove Pages',
          description: 'Delete specific pages from PDF documents quickly and easily.',
          icon: FiTrash2,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          coins: 3,
          category: 'organize'
        }
      ]
    },
    {
      title: "Security & Protection",
      tools: [
        {
          id: 'protect-pdf',
          name: 'Protect PDF',
          description: 'Add password protection to your PDF files to keep them secure.',
          icon: FiLock,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-50 dark:bg-gray-700/50',
          coins: 5,
          category: 'security'
        },
        {
          id: 'unlock-pdf',
          name: 'Unlock PDF',
          description: 'Remove password protection from PDF files when you have the right credentials.',
          icon: FiUnlock,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          coins: 5,
          category: 'security'
        }
      ]
    },
    {
      title: "Edit & Enhance",
      tools: [
        {
          id: 'edit-pdf',
          name: 'Edit PDF',
          description: 'Add text, images, shapes or freehand annotations to a PDF document. Edit the size, font, and color of the added content.',
          icon: FiEdit,
          iconColor: 'text-violet-600',
          bgColor: 'bg-violet-50 dark:bg-violet-900/20',
          coins: 10,
          category: 'edit',
          badge: 'New!'
        },
        {
          id: 'add-watermark',
          name: 'Add Watermark',
          description: 'Add text or image watermarks to your PDF documents for branding or security.',
          icon: FiDroplet,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          coins: 6,
          category: 'edit'
        },
        {
          id: 'pdf-to-image',
          name: 'PDF to Image',
          description: 'Convert PDF pages to high-quality images in various formats.',
          icon: FiImage,
          iconColor: 'text-pink-600',
          bgColor: 'bg-pink-50 dark:bg-pink-900/20',
          coins: 4,
          category: 'convert'
        },
        {
          id: 'image-to-pdf',
          name: 'Image to PDF',
          description: 'Convert images to PDF format while maintaining quality and layout.',
          icon: FiCamera,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          coins: 4,
          category: 'convert'
        },
        {
          id: 'ocr-text',
          name: 'OCR Text Recognition',
          description: 'Extract text from scanned PDFs and images using advanced OCR technology.',
          icon: FiEye,
          iconColor: 'text-indigo-600',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
          coins: 12,
          category: 'convert'
        }
      ]
    }
  ];

  const handleToolClick = (tool) => {
    onToolSelect({
      ...tool,
      color: `from-${tool.iconColor.split('-')[1]}-500 to-${tool.iconColor.split('-')[1]}-600`
    });
  };

  return (
    <div className="space-y-12">
      {toolCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {category.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map((tool, toolIndex) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (categoryIndex * 0.1) + (toolIndex * 0.05) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
                onClick={() => handleToolClick(tool)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
                  {/* Header with Icon */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 ${tool.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <SafeIcon 
                          icon={tool.icon} 
                          className={`w-8 h-8 ${tool.iconColor}`} 
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        {tool.badge && (
                          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {tool.badge}
                          </span>
                        )}
                        <div className="flex items-center space-x-1 bg-accent-50 dark:bg-accent-900/20 px-3 py-1 rounded-full">
                          <span className="text-accent-600 dark:text-accent-400">🪙</span>
                          <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                            {tool.coins}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="px-6 pb-6">
                    <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-medium group-hover:shadow-lg transform group-hover:-translate-y-0.5">
                      <div className="flex items-center justify-center space-x-2">
                        <span>Use Tool</span>
                        <SafeIcon icon={FiDownload} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PDFToolGrid;