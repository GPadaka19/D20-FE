import React, { useState } from 'react';
import { Camera, StopCircle, Camera as CameraIcon } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const LiveCameraScreen: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  
  const startStream = () => {
    setIsStreaming(true);
    setIsCaptured(false);
  };
  
  const stopStream = () => {
    setIsStreaming(false);
  };
  
  const captureImage = () => {
    setIsCaptured(true);
  };
  
  const resetCapture = () => {
    setIsCaptured(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Live Camera Detection</h1>
        <p className="text-gray-600 mt-2">
          Use your camera for real-time detection of potholes.
        </p>
      </div>
      
      <Card>
        <div className="flex flex-col">
          {/* Camera View / Placeholder */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center mb-4 border">
            {!isStreaming && !isCaptured ? (
              <div className="text-center p-12">
                <CameraIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Camera feed will appear here</p>
                <Button variant="primary" className="mt-6" onClick={startStream}>
                  Start Camera
                </Button>
              </div>
            ) : (
              <>
                {/* This would be replaced with actual webcam feed */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  {isCaptured ? (
                    <div className="text-white text-center">
                      <p>Captured Image</p>
                      <p className="text-sm text-gray-400">
                        (This is a wireframe placeholder)
                      </p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <p>Live Camera Feed</p>
                      <p className="text-sm text-gray-400">
                        (This is a wireframe placeholder)
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Camera Controls Overlay */}
                {isStreaming && !isCaptured && (
                  <div className="absolute bottom-4 right-4 flex space-x-3">
                    <Button 
                      variant="secondary" 
                      onClick={stopStream}
                      icon={<StopCircle className="w-4 h-4" />}
                    >
                      Stop
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={captureImage}
                      icon={<Camera className="w-4 h-4" />}
                    >
                      Capture
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Action Buttons */}
          {isCaptured && (
            <div className="flex justify-end space-x-3 mt-2">
              <Button variant="outline" onClick={resetCapture}>
                Retake
              </Button>
              <Button variant="primary">
                Detect Potholes
              </Button>
            </div>
          )}
        </div>
      </Card>
      
      <div className="mt-8">
        <Card>
          <h3 className="text-lg font-semibold mb-3">Camera Instructions</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <span>Position your device to capture a clear view of the road surface</span>
            </li>
            <li className="flex items-start">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <span>Ensure adequate lighting for best detection results</span>
            </li>
            <li className="flex items-start">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <span>Hold the device steady when capturing an image</span>
            </li>
            <li className="flex items-start">
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
              <span>Click "Detect Potholes" after capturing to process the image</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default LiveCameraScreen;