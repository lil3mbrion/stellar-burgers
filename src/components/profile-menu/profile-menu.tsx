import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/authSlice';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
