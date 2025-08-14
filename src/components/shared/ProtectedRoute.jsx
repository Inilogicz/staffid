// src/components/shared/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // <-- Import the real hook

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show a loading indicator while the auth status is being checked
  if (loading) {
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;