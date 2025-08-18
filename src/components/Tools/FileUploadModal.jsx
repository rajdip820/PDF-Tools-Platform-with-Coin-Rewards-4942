import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { 
  FiUpload, FiFile, FiX, FiDownload, FiCheck, FiArrowLeft, 
  FiZap, FiShield, FiClock, FiStar, FiPlay, FiPlus 
} = FiIcons;

const FileUploadModal = ({ tool, onProcess, onClose, isOpen }) => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'processing', 'complete'

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFiles([]);
      setProcessedFiles([]);
      setCurrentStep('upload');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    toast.success(`Added ${acceptedFiles.length} file(s)`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']
    },
    multiple: true,
    maxFiles: 10
  });

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setIsProcessing(true);
    setCurrentStep('processing');

    // Simulate processing time with progress
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock processed files
    const processed = files.map(file => ({
      name: `processed_${file.name}`,
      size: Math.floor(file.size * 0.8), // Simulated compression
      url: URL.createObjectURL(file) // Mock download URL
    }));

    setProcessedFiles(processed);
    setIsProcessing(false);
    setCurrentStep('complete');
    onProcess(files);
    toast.success(`Successfully processed ${files.length} file(s)!`);
  };

  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  const downloadAll = () => {
    processedFiles.forEach((file, index) => {
      setTimeout(() => downloadFile(file), index * 500);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resetAndStartOver = () => {
    setFiles([]);
    setProcessedFiles([]);
    setCurrentStep('upload');
    setIsProcessing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex-shrink-0 shadow-lg">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <div className="p-3 md:p-6">
                <div className="flex items-center space-x-3 md:space-x-4 pr-12 md:pr-16">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={tool.icon} className="w-5 h-5 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-3xl font-bold mb-1">{tool.name}</h2>
                    <p className="text-primary-100 text-xs md:text-lg mb-1 md:mb-2">{tool.description}</p>
                    <div className="flex items-center flex-wrap gap-2 md:gap-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiStar} className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Earn {tool.coins} coins</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiShield} className="w-3 h-3 md:w-4 md:h-4" />
                        <span>100% Secure</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiZap} className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Lightning Fast</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="mt-3 md:mt-6 flex items-center justify-center">
                  <div className="flex items-center space-x-2 md:space-x-4 bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-2">
                    <div className={`flex items-center space-x-1 md:space-x-2 ${currentStep === 'upload' ? 'text-white' : currentStep === 'processing' || currentStep === 'complete' ? 'text-primary-200' : 'text-primary-300'}`}>
                      <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs ${currentStep === 'upload' ? 'bg-white text-primary-600' : currentStep === 'processing' || currentStep === 'complete' ? 'bg-primary-500' : 'bg-white/20'}`}>
                        <SafeIcon icon={FiUpload} className="w-2 h-2 md:w-4 md:h-4" />
                      </div>
                      <span className="font-medium text-xs md:text-sm hidden sm:inline">Upload</span>
                    </div>
                    <div className={`w-4 h-0.5 md:w-8 ${currentStep === 'processing' || currentStep === 'complete' ? 'bg-primary-200' : 'bg-white/20'}`}></div>
                    <div className={`flex items-center space-x-1 md:space-x-2 ${currentStep === 'processing' ? 'text-white' : currentStep === 'complete' ? 'text-primary-200' : 'text-primary-300'}`}>
                      <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs ${currentStep === 'processing' ? 'bg-white text-primary-600' : currentStep === 'complete' ? 'bg-primary-500' : 'bg-white/20'}`}>
                        {isProcessing ? (
                          <div className="w-2 h-2 md:w-4 md:h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <SafeIcon icon={FiPlay} className="w-2 h-2 md:w-4 md:h-4" />
                        )}
                      </div>
                      <span className="font-medium text-xs md:text-sm hidden sm:inline">Process</span>
                    </div>
                    <div className={`w-4 h-0.5 md:w-8 ${currentStep === 'complete' ? 'bg-primary-200' : 'bg-white/20'}`}></div>
                    <div className={`flex items-center space-x-1 md:space-x-2 ${currentStep === 'complete' ? 'text-white' : 'text-primary-300'}`}>
                      <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs ${currentStep === 'complete' ? 'bg-white text-primary-600' : 'bg-white/20'}`}>
                        <SafeIcon icon={FiCheck} className="w-2 h-2 md:w-4 md:h-4" />
                      </div>
                      <span className="font-medium text-xs md:text-sm hidden sm:inline">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="p-4 md:p-8 h-full">
                <div className="max-w-6xl mx-auto h-full flex flex-col">
                  {currentStep === 'upload' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 md:space-y-6 flex-1 flex flex-col"
                    >
                      {/* Upload Zone - Only show if no files or less than 10 files */}
                      {files.length < 10 && (
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-xl md:rounded-2xl p-6 md:p-12 text-center transition-all duration-300 cursor-pointer flex-1 min-h-[200px] md:min-h-[300px] flex flex-col items-center justify-center ${
                            isDragActive
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-105'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-white dark:hover:bg-gray-800/50 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <input {...getInputProps()} />
                          <motion.div
                            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="mb-4 md:mb-6"
                          >
                            <SafeIcon icon={files.length > 0 ? FiPlus : FiUpload} className="w-12 h-12 md:w-20 md:h-20 text-gray-400 mx-auto" />
                          </motion.div>
                          <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
                            {isDragActive 
                              ? 'Drop files here!' 
                              : files.length > 0 
                                ? 'Add more files' 
                                : 'Upload your files'
                            }
                          </h3>
                          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-2 md:mb-4">
                            {files.length > 0 
                              ? 'Drag and drop more files here, or click to browse'
                              : 'Drag and drop files here, or click to browse'
                            }
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            Supports PDF, Word, Excel, PowerPoint, and Image files • Max 10 files ({10 - files.length} remaining)
                          </p>
                        </div>
                      )}

                      {/* File List */}
                      {files.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                              Selected Files ({files.length})
                            </h4>
                            <button
                              onClick={() => setFiles([])}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                            >
                              Clear All
                            </button>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-40 md:max-h-60 overflow-y-auto">
                            {files.map((file, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                              >
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                  <SafeIcon icon={FiFile} className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFile(index)}
                                  className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                >
                                  <SafeIcon icon={FiX} className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Process Files Button */}
                          <div className="mt-4 md:mt-6 flex justify-center">
                            <button
                              onClick={handleProcess}
                              className="flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold text-sm md:text-lg"
                            >
                              <SafeIcon icon={FiPlay} className="w-4 h-4 md:w-5 md:h-5" />
                              <span>Process {files.length} File{files.length !== 1 ? 's' : ''}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 'processing' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 relative">
                          <div className="w-16 h-16 md:w-32 md:h-32 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
                          <div className="w-16 h-16 md:w-32 md:h-32 border-4 border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <SafeIcon icon={tool.icon} className="w-6 h-6 md:w-12 md:h-12 text-primary-600" />
                          </div>
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Processing Your Files...
                        </h3>
                        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                          Please wait while we {tool.name.toLowerCase()} your {files.length} file(s)
                        </p>
                        <div className="flex items-center justify-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiShield} className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Secure Processing</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiClock} className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Usually takes 30-60 seconds</span>
                            <span className="sm:hidden">30-60 sec</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <div className="text-center mb-6 md:mb-8">
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <SafeIcon icon={FiCheck} className="w-6 h-6 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          Processing Complete! 🎉
                        </h3>
                        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
                          Your files have been successfully processed and are ready for download.
                        </p>
                      </div>

                      {/* Processed Files */}
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 md:p-6 border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                            Processed Files ({processedFiles.length})
                          </h4>
                          <button
                            onClick={downloadAll}
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg transition-colors text-sm"
                          >
                            <SafeIcon icon={FiDownload} className="w-4 h-4" />
                            <span>Download All</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-60 md:max-h-80 overflow-y-auto">
                          {processedFiles.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700"
                            >
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <SafeIcon icon={FiFile} className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => downloadFile(file)}
                                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm transition-colors ml-2"
                              >
                                <SafeIcon icon={FiDownload} className="w-3 h-3" />
                                <span className="hidden sm:inline">Download</span>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 md:p-6 bg-white dark:bg-gray-800 flex-shrink-0">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                {currentStep === 'upload' && (
                  <>
                    <button
                      onClick={onClose}
                      className="flex items-center space-x-2 px-3 md:px-6 py-2 md:py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors text-sm md:text-base"
                    >
                      <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
                      <span>Back to Tools</span>
                    </button>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {files.length > 0 ? `${files.length} file${files.length !== 1 ? 's' : ''} selected` : 'No files selected'}
                    </div>
                  </>
                )}

                {currentStep === 'processing' && (
                  <div className="w-full text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                      Processing in progress... Please don't close this window.
                    </p>
                  </div>
                )}

                {currentStep === 'complete' && (
                  <>
                    <button
                      onClick={resetAndStartOver}
                      className="flex items-center space-x-2 px-3 md:px-6 py-2 md:py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors text-sm md:text-base"
                    >
                      <SafeIcon icon={FiUpload} className="w-4 h-4" />
                      <span>Process More Files</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="flex items-center space-x-2 px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-semibold text-sm md:text-base"
                    >
                      <SafeIcon icon={FiCheck} className="w-4 h-4" />
                      <span>Done</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FileUploadModal;