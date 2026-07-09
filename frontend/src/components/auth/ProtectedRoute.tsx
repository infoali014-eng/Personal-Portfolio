import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/ui/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'contributor' | 'member')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin'] 
}) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  // Redirect to admin login if session not established
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Verify role parameters
  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
