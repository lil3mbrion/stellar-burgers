import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrdersApi } from '../../utils/burger-api';
import { clearConstructor } from './constructorSlice';
import { RootState } from '../store';

type TOrderState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientsIds: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientsIds);

      dispatch(clearConstructor());

      dispatch(fetchUserOrders());

      return {
        number: response.order.number,
        name: response.name,
        success: response.success,
        _id: `temp-${Date.now()}`,
        status: 'created',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ingredients: ingredientsIds
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  },
  selectors: {
    selectOrders: (state: TOrderState) => state.orders,
    selectCurrentOrder: (state: TOrderState) => state.currentOrder,
    selectOrderLoading: (state: TOrderState) => state.isLoading,
    selectOrderError: (state: TOrderState) => state.error
  }
});

export const { clearCurrentOrder, clearOrderError } = orderSlice.actions;
export const {
  selectOrders,
  selectCurrentOrder,
  selectOrderLoading,
  selectOrderError
} = orderSlice.selectors;

export default orderSlice.reducer;
