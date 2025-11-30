import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  
  const ctx = useContext(AuthContext);
  const accessToken = ctx?.accessToken;
  const loading = ctx?.loading;

  if (loading) return null;
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
