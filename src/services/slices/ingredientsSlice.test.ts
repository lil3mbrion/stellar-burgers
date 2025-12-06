import ingredientsReducer, {
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from './ingredientsSlice';
import { mockIngredients } from '../../utils/test-utils';
import { RootState } from '../store';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('fetchIngredients async thunk', () => {
    it('should handle fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchIngredients.fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockIngredients);
      expect(state.error).toBe(null);
    });

    it('should handle fetchIngredients.rejected', () => {
      const errorMessage = 'Network Error';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.items).toEqual([]);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('selectors', () => {
    const mockState: RootState = {
      ingredients: {
        items: mockIngredients,
        loading: true,
        error: 'Test error'
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orders: [],
        currentOrder: null,
        isLoading: false,
        error: null
      },
      auth: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      feed: {
        data: null,
        isLoading: false,
        error: null
      }
    };

    it('selectIngredients should return items', () => {
      const result = selectIngredients(mockState);
      expect(result).toEqual(mockIngredients);
    });

    it('selectIngredientsLoading should return loading', () => {
      const result = selectIngredientsLoading(mockState);
      expect(result).toBe(true);
    });

    it('selectIngredientsError should return error', () => {
      const result = selectIngredientsError(mockState);
      expect(result).toBe('Test error');
    });
  });
});
