// slices/constructorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { RootState } from '../services/store';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: any | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,

  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
      return state;
    },

    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (!state.ingredients) {
        state.ingredients = [];
      }
      state.ingredients.push(action.payload);
      return state;
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      return state;
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.ingredients];
      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
      state.ingredients = ingredients;
      return state;
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      return state;
    },

    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
      return state;
    },

    setOrderModalData: (state, action: PayloadAction<any>) => {
      state.orderModalData = action.payload;
      return state;
    },

    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      return state;
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData,
  closeOrderModal
} = constructorSlice.actions;

export const selectBun = (state: RootState) => state.constructor.bun;
export const selectIngredients = (state: RootState) =>
  state.constructor.ingredients;
export const selectOrderModalData = (state: RootState) =>
  state.constructor.orderModalData;
export const selectOrderRequest = (state: RootState) =>
  state.constructor.orderRequest;

export default constructorSlice.reducer;
