import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './components/screens/LandingPage';
import UploadScreen from './components/screens/UploadScreen';
import LiveCameraScreen from './components/screens/LiveCameraScreen';
import DetectionResultsPage from './components/screens/DetectionResultsPage';
import HistoryPage from './components/screens/HistoryPage';
import DashboardOverview from './components/screens/DashboardOverview';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadScreen />} />
          <Route path="/camera" element={<LiveCameraScreen />} />
          <Route path="/results" element={<DetectionResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/dashboard" element={<DashboardOverview />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;