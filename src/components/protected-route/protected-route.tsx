import * as Router from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));
  const location = Router.useLocation();

  if (onlyUnAuth && isLoggedIn) {
    const from = (location.state as { from?: string })?.from || '/';
    return <Router.Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Router.Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
