import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectFeedData } from '../../services/slices/feedSlice';
import { selectOrders } from '../../services/slices/orderSlice';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchUserOrders } from '../../services/slices/orderSlice';
import { AppDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const ingredients = useSelector(selectIngredients);
  const feedData = useSelector(selectFeedData);
  const userOrders = useSelector(selectOrders);

  useEffect(() => {
    if (!feedData) {
      dispatch(fetchFeeds());
    }
    if (userOrders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, feedData, userOrders.length]);

  const orderData = useMemo(() => {
    if (!number) return null;

    const orderNumber = parseInt(number);

    if (feedData?.orders) {
      const order = feedData.orders.find((o) => o.number === orderNumber);
      if (order) return order;
    }

    if (userOrders) {
      const order = userOrders.find((o) => o.number === orderNumber);
      if (order) return order;
    }

    return null;
  }, [number, feedData, userOrders]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: any & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: any) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
