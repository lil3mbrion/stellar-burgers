import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
