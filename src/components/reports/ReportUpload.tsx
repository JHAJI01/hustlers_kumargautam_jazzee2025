import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Image, 
  X, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Download
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GlowingButton from '../common/GlowingButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { UploadedFile } from '../../types';

interface ReportUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void;
}

const ReportUpload: React.FC<ReportUploadProps> = ({ onUploadComplete }) => {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    setUploading(true);
    
    for (const file of files) {
      // Validate file type
      if (!isValidFileType(file)) {
        alert(`Invalid file type: ${file.name}. Please upload PDF, JPG, PNG, or DICOM files.`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }

      // Simulate file upload with progress
      const fileId = Math.random().toString(36).substring(7);
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Create uploaded file object
      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        url: URL.createObjectURL(file), // In production, this would be the server URL
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);
      setUploadProgress(prev => {
        const { [fileId]: _, ...rest } = prev;
        return rest;
      });
    }
    
    setUploading(false);
    
    if (onUploadComplete) {
      onUploadComplete(uploadedFiles);
    }
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/dicom',
    ];
    return validTypes.includes(file.type) || file.name.toLowerCase().endsWith('.dcm');
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return Image;
    }
    return FileText;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const viewFile = (file: UploadedFile) => {
    window.open(file.url, '_blank');
  };

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const recentReports = [
    {
      id: '1',
      name: 'Blood Test Results - Jan 2024',
      date: '2024-01-10',
      type: 'Lab Report',
      doctor: 'Dr. Smith',
    },
    {
      id: '2',
      name: 'Chest X-Ray',
      date: '2024-01-08',
      type: 'Radiology',
      doctor: 'Dr. Johnson',
    },
    {
      id: '3',
      name: 'ECG Report',
      date: '2024-01-05',
      type: 'Cardiology',
      doctor: 'Dr. Wilson',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Upload className="w-8 h-8 text-neon-blue" />
          {t('uploadreport')}
        </h1>
        <p className="text-gray-400">
          Upload your medical reports, lab results, and imaging studies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Upload New Reports</h3>
            
            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-dark-border hover:border-neon-blue/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${
                dragActive ? 'text-neon-blue' : 'text-gray-400'
              }`} />
              <p className="text-lg font-medium text-white mb-2">
                Drag and drop your files here
              </p>
              <p className="text-gray-400 mb-4">
                or click to select files
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.gif,.dcm"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <GlowingButton
                  as="span"
                  variant="outline"
                  size="md"
                  className="cursor-pointer"
                >
                  Select Files
                </GlowingButton>
              </label>
              <p className="text-xs text-gray-500 mt-4">
                Supported formats: PDF, JPG, PNG, GIF, DICOM (max 10MB each)
              </p>
            </div>

            {/* Upload Progress */}
            <AnimatePresence>
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <motion.div
                  key={fileId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-dark-card/50 rounded-lg border border-dark-border/50"
                >
                  <div className="flex items-center gap-3">
                    <LoadingSpinner size="sm" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Uploading...</p>
                      <div className="w-full bg-dark-border rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-neon-blue to-neon-cyan h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{progress}%</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Uploaded Files</h4>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    return (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-dark-card/50 rounded-lg border border-dark-border/50 hover:border-neon-blue/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-neon-blue/10 rounded-lg">
                              <FileIcon className="w-5 h-5 text-neon-blue" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{file.name}</p>
                              <p className="text-sm text-gray-400">
                                {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewFile(file)}
                              className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                              title="View file"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => downloadFile(file)}
                              className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                              title="Download file"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              title="Remove file"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Recent Reports & Guidelines */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Recent Reports */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-neon-blue" />
              Recent Reports
            </h3>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-3 bg-dark-card/50 rounded-lg border border-dark-border/50 hover:border-neon-blue/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neon-blue/10 rounded-lg">
                      <FileText className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{report.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{report.type}</p>
                      <p className="text-xs text-gray-500">{report.date} • {report.doctor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Upload Guidelines */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-neon-blue" />
              Upload Guidelines
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <p className="text-gray-300">
                  Ensure images are clear and well-lit
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <p className="text-gray-300">
                  Include patient information and date
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <p className="text-gray-300">
                  Remove any sensitive personal information
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <p className="text-gray-300">
                  File size should be under 10MB
                </p>
              </div>
            </div>
          </GlassCard>

          {/* File Types */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Supported File Types</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">PDF Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Images (JPG, PNG, GIF)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">DICOM Files</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportUpload;