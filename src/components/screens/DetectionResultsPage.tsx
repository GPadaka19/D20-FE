import React from 'react';
import { Download, Save, RefreshCw } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const DetectionResultsPage: React.FC = () => {
  // Mock detection data
  const detections = [
    { id: 1, class: 'pothole', confidence: 0.92, box: { x: 0.2, y: 0.3, width: 0.15, height: 0.12 } },
    { id: 2, class: 'pothole', confidence: 0.85, box: { x: 0.6, y: 0.5, width: 0.2, height: 0.15 } },
    { id: 3, class: 'crack', confidence: 0.78, box: { x: 0.4, y: 0.7, width: 0.1, height: 0.05 } },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Detection Results</h1>
        <p className="text-gray-600 mt-2">
          Analysis complete. {detections.length} issues detected.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            {/* Detection Image with Bounding Boxes */}
            <div className="relative aspect-video bg-gray-100 rounded overflow-hidden border mb-4">
              {/* Placeholder for the image with detections */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <p>Detection Image with Bounding Boxes</p>
                  <p className="text-sm text-gray-400">
                    (This is a wireframe placeholder)
                  </p>
                </div>
              </div>
              
              {/* Bounding box overlays would be drawn here */}
              {detections.map((detection) => (
                <div 
                  key={detection.id}
                  className="absolute border-2 border-white"
                  style={{
                    left: `${detection.box.x * 100}%`,
                    top: `${detection.box.y * 100}%`,
                    width: `${detection.box.width * 100}%`,
                    height: `${detection.box.height * 100}%`,
                  }}
                >
                  <div className="absolute top-0 left-0 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded-sm">
                    {detection.class} ({Math.round(detection.confidence * 100)}%)
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">
                  Processed with YOLOv8 • {new Date().toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  icon={<Save className="w-4 h-4" />}
                >
                  Save to History
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Detection Details">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Summary</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-gray-800">{detections.length}</div>
                    <div className="text-xs text-gray-500">Total Detections</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">Avg. Confidence</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Detections</h4>
                <div className="space-y-3">
                  {detections.map((detection) => (
                    <div 
                      key={detection.id} 
                      className="flex justify-between p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">{detection.class}</div>
                        <div className="text-xs text-gray-500">
                          ID: {detection.id}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{Math.round(detection.confidence * 100)}%</div>
                        <div className="text-xs text-gray-500">confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Run Detection Again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetectionResultsPage;