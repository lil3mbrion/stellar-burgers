import { rootReducer } from './root-reducer/rootReducer';
import { store } from './store';
import {
  TIngredient,
  TConstructorIngredient,
  TUser,
  TOrder,
  TOrdersData
} from '@utils-types';

type RootState = ReturnType<typeof store.getState>;

type ExpectedIngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

type ExpectedConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type ExpectedOrderState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

type ExpectedAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

type ExpectedFeedState = {
  data: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
};

type ExpectedRootState = {
  ingredients: ExpectedIngredientsState;
  burgerConstructor: ExpectedConstructorState;
  order: ExpectedOrderState;
  auth: ExpectedAuthState;
  feed: ExpectedFeedState;
};

describe('Redux Store Configuration', () => {
  it('should initialize with correct state structure and types', () => {
    const state: RootState = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('feed');

    const expectedState: ExpectedRootState = {
      ingredients: {
        items: [],
        loading: false,
        error: null
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

    expect(state).toEqual(expectedState);
  });

  it('should have correct TypeScript types for each slice', () => {
    const state = store.getState();

    const ingredients: ExpectedIngredientsState = state.ingredients;
    expect(Array.isArray(ingredients.items)).toBe(true);
    expect(typeof ingredients.loading).toBe('boolean');
    expect(ingredients.error).toBeNull();

    const burgerConstructor: ExpectedConstructorState = state.burgerConstructor;
    expect(burgerConstructor.bun).toBeNull();
    expect(Array.isArray(burgerConstructor.ingredients)).toBe(true);

    const order: ExpectedOrderState = state.order;
    expect(Array.isArray(order.orders)).toBe(true);
    expect(order.currentOrder).toBeNull();
    expect(typeof order.isLoading).toBe('boolean');
    expect(order.error).toBeNull();

    const auth: ExpectedAuthState = state.auth;
    expect(auth.user).toBeNull();
    expect(typeof auth.isAuthChecked).toBe('boolean');
    expect(typeof auth.isLoading).toBe('boolean');
    expect(auth.error).toBeNull();

    const feed: ExpectedFeedState = state.feed;
    expect(feed.data).toBeNull();
    expect(typeof feed.isLoading).toBe('boolean');
    expect(feed.error).toBeNull();
  });
});

describe('Redux rootReducer', () => {
  describe('initialization', () => {
    it('should return initial state when called with undefined state', () => {
      const result = rootReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual({
        ingredients: {
          items: [],
          loading: false,
          error: null
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
      });
    });

    it('should return current state for unknown action type', () => {
      const currentState = rootReducer(undefined, { type: '@@INIT' });
      const result = rootReducer(currentState, { type: 'UNKNOWN_ACTION' });

      expect(result).toBe(currentState);
    });
  });
});
