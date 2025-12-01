import * as Router from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthChecked,
  selectUser,
  checkUserAuth
} from '../../services/slices/authSlice';
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
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = Router.useLocation();

  const hasAccessToken = Boolean(getCookie('accessToken'));
  const hasRefreshToken = Boolean(localStorage.getItem('refreshToken'));

  useEffect(() => {
    if ((hasAccessToken || hasRefreshToken) && !isAuthChecked && !user) {
      dispatch(checkUserAuth());
    }
  }, [dispatch, hasAccessToken, hasRefreshToken, isAuthChecked, user]);

  if (!isAuthChecked && (hasAccessToken || hasRefreshToken)) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: string })?.from || '/';
    return <Router.Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Router.Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
