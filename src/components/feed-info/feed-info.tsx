import { FC } from 'react';
import { useSelector } from 'react-redux';
import { FeedInfoUI } from '../ui/feed-info';
import { selectFeedData } from '../../services/slices/feedSlice';

const getOrders = (orders: any[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feedData = useSelector(selectFeedData);

  if (!feedData) {
    return null;
  }

  const readyOrders = getOrders(feedData.orders, 'done');
  const pendingOrders = getOrders(feedData.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feedData}
    />
  );
};
