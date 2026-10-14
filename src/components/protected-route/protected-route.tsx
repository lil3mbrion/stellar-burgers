import * as Router from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, checkUserAuth } from '../../services/slices/authSlice';
import { getCookie } from '../../utils/cookie';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const location = Router.useLocation();
  const hasAccessToken = Boolean(getCookie('accessToken'));

  useEffect(() => {
    if (hasAccessToken && !user) {
      console.log('ProtectedRoute: Checking user auth...');
      dispatch(checkUserAuth());
    }
  }, [dispatch, hasAccessToken, user]);

  if (onlyUnAuth) {
    if (hasAccessToken && !user) {
      return <Preloader />;
    }

    if (user) {
      const from = (location.state as { from?: string })?.from || '/';
      return <Router.Navigate to={from} replace />;
    }

    return <>{children}</>;
  }

  if (!hasAccessToken) {
    return <Router.Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!user) {
    return <Preloader />;
  }

  return <>{children}</>;
};
