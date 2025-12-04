import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeeds,
  selectFeedData,
  selectFeedLoading
} from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const feedData = useSelector(selectFeedData);
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading || !feedData) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={feedData.orders} handleGetFeeds={handleGetFeeds} />;
};
