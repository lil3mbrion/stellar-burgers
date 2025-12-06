import { store } from './store';

describe('Redux Store Configuration', () => {
  it('should initialize with correct state structure', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('feed');
    
    expect(state.ingredients).toEqual({
      items: [],
      loading: false,
      error: null
    });
    
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
    
    expect(state.order).toEqual({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null
    });
    
    expect(state.auth).toEqual({
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: null
    });
    
    expect(state.feed).toEqual({
      data: null,
      isLoading: false,
      error: null
    });
  });

  it('should have correct initial state for rootReducer', () => {
    const state = store.getState();

    expect(state).toMatchObject({
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      order: expect.any(Object),
      auth: expect.any(Object),
      feed: expect.any(Object)
    });
  });
});