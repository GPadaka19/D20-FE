import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Camera } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pothole Detection System</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Advanced computer vision technology for identifying and analyzing road potholes using YOLOv8.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <Card className="flex flex-col items-center text-center p-8 hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Upload Image/Video</h2>
          <p className="text-gray-600 mb-6">
            Upload images or videos of road surfaces to detect and analyze potholes.
          </p>
          <Link to="/upload" className="mt-auto">
            <Button variant="primary" size="lg">
              Start Upload
            </Button>
          </Link>
        </Card>
        
        <Card className="flex flex-col items-center text-center p-8 hover:shadow-md transition-shadow">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Camera className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Live Camera Detection</h2>
          <p className="text-gray-600 mb-6">
            Use your camera for real-time detection and analysis of potholes.
          </p>
          <Link to="/camera" className="mt-auto">
            <Button variant="primary" size="lg">
              Start Camera
            </Button>
          </Link>
        </Card>
      </div>
      
      <div className="mt-16 max-w-3xl text-center">
        <h3 className="text-xl font-semibold mb-4">About This Project</h3>
        <p className="text-gray-600">
          This research project utilizes YOLOv8, a state-of-the-art computer vision model, 
          to accurately detect and classify road potholes. The system provides valuable data 
          for road maintenance planning and infrastructure management.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;