// In src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Import Pages
import DashboardPage from './pages/dashboard/Dashboard';
import LoginPage from './pages/auth/Login'; 
import StaffListPage from './pages/staff/StaffListPage'; 
import StaffDetailPage from './pages/staff/StaffDetailPage';
import UpdateStaffPage from './pages/staff/UpdateStaffPage';
import NotFoundPage from './pages/NotFoundPage';
import GenerateIdPage from './pages/staff/GenerateIdPage';
import HistoryPage from './pages/history/HistoryPage';
import AddStaffPage from './pages/staff/AddStaffPage';


// Import the ProtectedRoute component
import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        {/* All routes inside AuthLayout are public */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* --- Protected Routes --- */}
        {/* The ProtectedRoute component acts as a gatekeeper */}
        <Route element={<ProtectedRoute />}>
          {/* All routes inside MainLayout share the sidebar/header and are protected */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/staff" element={<StaffListPage />} />
            <Route path="/staff/:id" element={<StaffDetailPage />} />
             <Route path="/staff/new" element={<AddStaffPage />} />
             <Route path="/staff/update/:id" element={<UpdateStaffPage />} />
            <Route path="/generate-id/:id" element={<GenerateIdPage />} />
            <Route path="/history" element={<HistoryPage />} />
            {/* <Route path="/history" element={<HistoryPage />} /> */}
          </Route>
        </Route>
        
        {/* --- Not Found Route --- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;