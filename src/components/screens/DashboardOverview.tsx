import React from 'react';
import { Calendar, Map, BarChart2 } from 'lucide-react';
import { TEChart } from "tw-elements-react";
import Card from '../common/Card';

const DashboardOverview: React.FC = () => {
  const confidenceData = [50, 20, 30, 60, 75, 60]; // Jan to Jun
  const damageTypeData = {
    labels: ["Potholes", "Cracks", "Patches", "Other"],
    data: [75, 50, 25, 15]
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of pothole detection statistics and analytics.
        </p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="flex flex-col items-center text-center py-6">
          <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <span className="text-gray-500">
              <BarChart2 className="w-6 h-6" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800">148</div>
          <div className="text-sm text-gray-500">Total Detections</div>
        </Card>
        
        <Card className="flex flex-col items-center text-center py-6">
          <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <span className="text-gray-500">
              <Map className="w-6 h-6" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800">84%</div>
          <div className="text-sm text-gray-500">Average Confidence</div>
        </Card>
        
        <Card className="flex flex-col items-center text-center py-6">
          <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <span className="text-gray-500">
              <Calendar className="w-6 h-6" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800">27</div>
          <div className="text-sm text-gray-500">Sessions This Month</div>
        </Card>
        
        <Card className="flex flex-col items-center text-center py-6">
          <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <span className="text-gray-500">
              <BarChart2 className="w-6 h-6" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800">3.2</div>
          <div className="text-sm text-gray-500">Avg. Detections per Session</div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card title="Detection Frequency by Type">
          <div className="h-64 p-4">
            <TEChart
              type="bar"
              data={{
                labels: damageTypeData.labels,
                datasets: [
                  {
                    label: "Detection Count",
                    data: damageTypeData.data,
                    backgroundColor: [
                      '#6b7280',
                      '#9ca3af',
                      '#d1d5db',
                      '#e5e7eb'
                    ],
                    borderColor: [
                      '#6b7280',
                      '#9ca3af',
                      '#d1d5db',
                      '#e5e7eb'
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function (value: number | string) {
                        return value + "%";
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </Card>
        
        <Card title="Detection Confidence Over Time">
          <div className="h-64 p-4">
            <TEChart
              type="line"
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "efeafc"],
                datasets: [
                  {
                    label: "Confidence Level",
                    data: confidenceData,
                    backgroundColor: "#d4d4d8",
                    borderColor: "rgba(107, 114, 128, 1)",
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function (value: number | string) {  // Tambahkan type annotation
                        return value + "%";
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>
      
      {/* Additional Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Regional Distribution">
          <div className="p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">North Region</td>
                  <td className="px-4 py-3">42</td>
                  <td className="px-4 py-3">28%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">South Region</td>
                  <td className="px-4 py-3">38</td>
                  <td className="px-4 py-3">26%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">East Region</td>
                  <td className="px-4 py-3">35</td>
                  <td className="px-4 py-3">24%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">West Region</td>
                  <td className="px-4 py-3">33</td>
                  <td className="px-4 py-3">22%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card title="Detection Insights">
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Most Common Damage Types</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gray-500 h-4 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Type A (70%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gray-400 h-4 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Type B (45%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gray-300 h-4 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Type C (25%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Detection Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-800">0.92</div>
                  <div className="text-xs text-gray-500">Precision</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-800">0.89</div>
                  <div className="text-xs text-gray-500">Recall</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-800">0.90</div>
                  <div className="text-xs text-gray-500">F1 Score</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-800">0.85</div>
                  <div className="text-xs text-gray-500">IoU</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;