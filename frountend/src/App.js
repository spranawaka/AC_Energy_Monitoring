import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import DataDisplay from './components/DataDisplay';
import Admin from './components/Admin';
import Section from './components/Section';
import DataTable from './components/DataTable';
import Banner from './components/Banner'; // Import the Banner component

const AppContent = () => {
  const [bannerTitle, setBannerTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setBannerTitle('AC Energy Monitoring');
        break;
      case '/admin':
        setBannerTitle('Admin');
        break;
      case '/section':
        setBannerTitle('Section');
        break;
      case '/DataTable':
        setBannerTitle('Real Time Update Data Table');
        break;
      default:
        setBannerTitle('');
        break;
    }
  }, [location]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <div className="p-3">
        {bannerTitle && <Banner title={bannerTitle} />}
        <Routes>
          <Route exact path="/" element={<DataDisplay />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/section" element={<Section />} />
          <Route path="/DataTable" element={<DataTable />} />
        </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
