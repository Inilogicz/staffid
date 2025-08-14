// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@/lib/api'; // Our central Axios instance

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // To check initial auth status

  useEffect(() => {
    // This effect runs on initial app load to see if a valid token exists
    const validateToken = async () => {
      if (token) {
        // You could add a call to a `/api/auth/me` endpoint here to get user data
        // For now, we'll assume the token is valid if it exists.
        // In a real app, you'd verify it against the backend.
        setUser({isAuthenticated: true}); // Placeholder user object
      }
      setLoading(false);
    };
    validateToken();
  }, [token]);

  const login = async (email, password) => {
    // This function will be called from the LoginPage
    const response = await api.post('/api/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser({isAuthenticated: true}); // Update user state
    return response;
  };

  const logout = () => {
    // This function can be called from anywhere to log out
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};