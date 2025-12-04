import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserOrders,
  selectOrders,
  selectOrderLoading
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/authSlice';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrderLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, user]);

  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
