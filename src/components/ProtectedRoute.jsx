import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { UserContext } from '../UserContext';

export default function ProtectedRoute() {
  const { user, ready } = useContext(UserContext);
  const location = useLocation();

  if (!ready) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

