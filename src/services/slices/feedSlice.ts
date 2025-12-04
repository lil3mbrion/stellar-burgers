import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';
import { RootState } from '../store';

type TFeedState = {
  data: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  data: null,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feed/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      console.error('Error fetching feeds:', error);
      return rejectWithValue(error);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeedError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      });
  },
  selectors: {
    selectFeedData: (state: TFeedState) => state.data,
    selectFeedLoading: (state: TFeedState) => state.isLoading,
    selectFeedError: (state: TFeedState) => state.error
  }
});

export const { clearFeedError } = feedSlice.actions;
export const { selectFeedData, selectFeedLoading, selectFeedError } =
  feedSlice.selectors;

export default feedSlice.reducer;
