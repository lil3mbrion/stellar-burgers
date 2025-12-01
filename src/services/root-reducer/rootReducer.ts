import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredientsSlice';
import constructorSlice from '../slices/constructorSlice';
import orderSlice from '../slices/orderSlice';
import authSlice from '../slices/authSlice';
import feedSlice from '../slices/feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: constructorSlice,
  order: orderSlice,
  auth: authSlice,
  feed: feedSlice
});
