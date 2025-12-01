import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { RootState } from '../store';
import { selectBuns } from './ingredientsSlice';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
      return state;
    },

    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newIngredient = { ...action.payload };
      if (!state.ingredients) {
        state.ingredients = [];
      }
      state.ingredients.push(newIngredient);
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
    }
  },
  selectors: {
    selectBun: (state: TConstructorState) => state.bun,
    selectIngredients: (state: TConstructorState) => state.ingredients
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export const { selectBun, selectIngredients } = constructorSlice.selectors;

export default constructorSlice.reducer;
