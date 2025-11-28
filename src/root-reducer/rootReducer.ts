// root-reducer/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredientsSlice';
import constructorSlice from '../slices/constructorSlice';
import orderSlice from '../slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  constructor: constructorSlice,
  order: orderSlice
});
