import React, { useState } from 'react';
import { Upload, X, Image, File, FilePlus } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const UploadScreen: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    setFile(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  
  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Upload Media</h1>
        <p className="text-gray-600 mt-2">
          Upload images or videos of road surfaces to detect potholes.
        </p>
      </div>
      
      <Card>
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? 'border-gray-500 bg-gray-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drag and drop files here</h3>
            <p className="text-sm text-gray-500 mb-6">
              Supported file types: JPG, PNG, MP4, AVI (max 100MB)
            </p>
            <div>
              <label className="cursor-pointer">
                <Button variant="outline">
                  <FilePlus className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {file.type.startsWith('image/') ? (
                  <Image className="w-5 h-5 text-gray-500 mr-2" />
                ) : (
                  <File className="w-5 h-5 text-gray-500 mr-2" />
                )}
                <span className="font-medium">{file.name}</span>
              </div>
              <Button
                variant="text"
                size="sm"
                onClick={clearFile}
                icon={<X className="w-4 h-4" />}
              >
                Remove
              </Button>
            </div>
            
            {preview && (
              <div className="mb-4 border rounded-lg overflow-hidden">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-96 w-full object-contain bg-gray-100" 
                />
              </div>
            )}
            
            {!preview && (
              <div className="mb-4 border rounded-lg p-8 text-center bg-gray-50">
                <File className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500">Preview not available</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-4">
              <Button variant="outline" onClick={clearFile}>
                Cancel
              </Button>
              <Button variant="primary">
                Detect Potholes
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UploadScreen;