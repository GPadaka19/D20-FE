import React, { useState } from 'react';
import { Upload } from 'lucide-react';

type DropZoneProps = {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string;
  maxSize?: number; // in bytes
};

const DropZone: React.FC<DropZoneProps> = ({
  onFileSelect,
  acceptedFileTypes = 'image/*,video/*',
  maxSize = 100 * 1024 * 1024, // 100MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    
    const files = e.dataTransfer.files;
    validateAndProcessFile(files[0]);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };
  
  const validateAndProcessFile = (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds maximum allowed size (${Math.round(maxSize / (1024 * 1024))}MB)`);
      return;
    }
    
    // Check file type
    const fileType = file.type;
    const validTypes = acceptedFileTypes.split(',');
    const isValidType = validTypes.some(type => {
      // Handle wildcard types like image/* or video/*
      if (type.endsWith('*')) {
        const category = type.split('/')[0];
        return fileType.startsWith(category);
      }
      return type === fileType;
    });
    
    if (!isValidType) {
      setError('File type not supported');
      return;
    }
    
    // All validations passed
    onFileSelect(file);
  };
  
  return (
    <div
      className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-gray-400 bg-gray-50' : 'border-gray-300'
      } ${error ? 'border-red-300' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Upload className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-lg font-medium text-gray-700 mb-1">
        Drag and drop files here
      </p>
      <p className="text-sm text-gray-500 mb-4">
        or click to browse your files
      </p>
      <p className="text-xs text-gray-400">
        Supported formats: {acceptedFileTypes} (Max {Math.round(maxSize / (1024 * 1024))}MB)
      </p>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleFileInput}
        accept={acceptedFileTypes}
      />
    </div>
  );
};

export default DropZone;