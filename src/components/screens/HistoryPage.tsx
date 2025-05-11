import React, { useState } from 'react';
import { 
  Search, Filter, ArrowDown, ArrowUp, Eye, Trash2, Calendar 
} from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

// Sample history data
const historyItems = [
  {
    id: 1,
    timestamp: '2025-05-10T14:30:00',
    thumbnail: 'placeholder',
    detections: 3,
    confidence: 0.89,
    source: 'upload',
  },
  {
    id: 2,
    timestamp: '2025-05-09T11:15:00',
    thumbnail: 'placeholder',
    detections: 5,
    confidence: 0.92,
    source: 'camera',
  },
  {
    id: 3,
    timestamp: '2025-05-08T09:45:00',
    thumbnail: 'placeholder',
    detections: 2,
    confidence: 0.77,
    source: 'upload',
  },
  {
    id: 4,
    timestamp: '2025-05-07T16:20:00',
    thumbnail: 'placeholder',
    detections: 4,
    confidence: 0.85,
    source: 'camera',
  },
  {
    id: 5,
    timestamp: '2025-05-10T16:20:00',
    thumbnail: 'placeholder',
    detections: 1,
    confidence: 0.82,
    source: 'upload',
  },
];

const HistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<'timestamp' | 'detections' | 'confidence'>('timestamp');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterSource, setFilterSource] = useState<'all' | 'upload' | 'camera'>('all');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Filter and sort items
  const filteredItems = historyItems
    .filter(item => {
      const matchesSource = filterSource === 'all' || item.source === filterSource;
      let value: string | number = item[searchField];
      if (searchField === 'timestamp') {
        value = new Date(item.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
      }
      const query = searchQuery.toLowerCase();

      if (!searchQuery) return matchesSource;

      if (typeof value === 'string') {
        return matchesSource && value.toLowerCase().includes(query);
      }

      if (typeof value === 'number') {
        return matchesSource && value.toString().includes(query);
      }

      return matchesSource;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Detection History</h1>
        <h1 className="text-3xl font-bold text-gray-800">TEST CI/CD #13</h1>
        <p className="text-gray-600 mt-2">
          View and manage your previous detection results.
        </p>
      </div>
      
      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <div className="absolute inset-y-0 right-0 pr-1 flex items-center">
              <select
                className="block border border-gray-300 rounded-md px-2 py-1 bg-white text-sm h-8"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value as any)}
              >
                <option value="timestamp">Date/Time</option>
                <option value="detections">Detections</option>
                <option value="confidence">Confidence</option>
              </select>
            </div>
            <input
              type="text"
              placeholder={`Search by ${searchField}...`}
              className="block w-full pl-10 pr-24 py-2 border border-gray-300 rounded-md shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white shadow-sm cursor-pointer"
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value as any)}
              >
                <option value="all">All Sources</option>
                <option value="upload">Uploads Only</option>
                <option value="camera">Camera Only</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              icon={sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            >
              {sortDirection === 'asc' ? 'Oldest First' : 'Newest First'}
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thumbnail
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center">
                    <span>Date/Time</span>
                    {sortField === 'timestamp' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('detections')}
                >
                  <div className="flex items-center">
                    <span>Detections</span>
                    {sortField === 'detections' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('confidence')}
                >
                  <div className="flex items-center">
                    <span>Avg. Confidence</span>
                    {sortField === 'confidence' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('source')}
                >
                  <div className="flex items-center">
                    <span>Source</span>
                    {sortField === 'source' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      Thumbnail
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span>
                        {new Date(item.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{item.detections}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{Math.round(item.confidence * 100)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.source === 'upload' ? 'Upload' : 'Camera'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No detection history found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryPage;