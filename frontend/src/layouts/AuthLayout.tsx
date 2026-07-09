import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 border border-primary/10 bg-surface p-8 rounded-2xl shadow-xl glass">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
