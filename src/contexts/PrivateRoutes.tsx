import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from '../assets/components/toast/Toast';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const toast = useToast();

  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const hasRequiredRole = !allowedRoles || 
    (userRole && allowedRoles.includes(userRole));

  if (!isAuthenticated) {
    toast.error('Please log in to access this page');
    return <Navigate to="/" replace />;
  }

  if (!hasRequiredRole) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;