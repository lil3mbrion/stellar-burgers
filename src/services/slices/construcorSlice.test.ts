import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { mockBun, mockConstructorIngredient } from '../../utils/test-utils';

describe('constructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addBun action', () => {
    it('should handle addBun', () => {
      const action = addBun(mockBun);
      const state = constructorReducer(initialState, action);
      
      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('should replace existing bun when adding new bun', () => {
      const firstState = constructorReducer(initialState, addBun(mockBun));
      
      const newBun = { ...mockBun, _id: 'new-bun-id', name: 'Новая булка' };
      const secondState = constructorReducer(firstState, addBun(newBun));
      
      expect(secondState.bun).toEqual(newBun);
      expect(secondState.ingredients).toEqual([]);
    });
  });

  describe('addIngredient action', () => {
    it('should handle addIngredient', () => {
      const action = addIngredient(mockConstructorIngredient);
      const state = constructorReducer(initialState, action);
      
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockConstructorIngredient);
      expect(state.bun).toBeNull();
    });

    it('should add multiple ingredients', () => {
      let state = constructorReducer(initialState, addIngredient(mockConstructorIngredient));
      
      const secondIngredient = {
        ...mockConstructorIngredient,
        id: 'different-id-123',
        _id: 'different-_id-456'
      };
      state = constructorReducer(state, addIngredient(secondIngredient));
      
      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toEqual(mockConstructorIngredient);
      expect(state.ingredients[1]).toEqual(secondIngredient);
    });
  });

  describe('removeIngredient action', () => {
    it('should handle removeIngredient', () => {
      let state = constructorReducer(initialState, addIngredient(mockConstructorIngredient));
      expect(state.ingredients).toHaveLength(1);
      
      const action = removeIngredient(mockConstructorIngredient.id);
      state = constructorReducer(state, action);
      
      expect(state.ingredients).toHaveLength(0);
    });

    it('should remove correct ingredient when multiple exist', () => {
      const ingredient1 = { ...mockConstructorIngredient, id: 'id-1' };
      const ingredient2 = { ...mockConstructorIngredient, id: 'id-2' };
      
      let state = constructorReducer(initialState, addIngredient(ingredient1));
      state = constructorReducer(state, addIngredient(ingredient2));
      expect(state.ingredients).toHaveLength(2);
      
      state = constructorReducer(state, removeIngredient('id-1'));
      
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient2);
    });
  });

  describe('moveIngredient action', () => {
    it('should handle moveIngredient', () => {
      const ingredient1 = { ...mockConstructorIngredient, id: 'id-1' };
      const ingredient2 = { ...mockConstructorIngredient, id: 'id-2' };
      const ingredient3 = { ...mockConstructorIngredient, id: 'id-3' };
      
      let state = constructorReducer(initialState, addIngredient(ingredient1));
      state = constructorReducer(state, addIngredient(ingredient2));
      state = constructorReducer(state, addIngredient(ingredient3));
      
      expect(state.ingredients).toEqual([ingredient1, ingredient2, ingredient3]);
      
      const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
      state = constructorReducer(state, action);
      
      expect(state.ingredients).toEqual([ingredient2, ingredient3, ingredient1]);
    });

    it('should move ingredient down (fromIndex < toIndex)', () => {
      const ingredient1 = { ...mockConstructorIngredient, id: 'id-1' };
      const ingredient2 = { ...mockConstructorIngredient, id: 'id-2' };
      
      let state = constructorReducer(initialState, addIngredient(ingredient1));
      state = constructorReducer(state, addIngredient(ingredient2));
      
      state = constructorReducer(state, moveIngredient({ fromIndex: 0, toIndex: 1 }));
      
      expect(state.ingredients).toEqual([ingredient2, ingredient1]);
    });

    it('should move ingredient up (fromIndex > toIndex)', () => {
      const ingredient1 = { ...mockConstructorIngredient, id: 'id-1' };
      const ingredient2 = { ...mockConstructorIngredient, id: 'id-2' };
      
      let state = constructorReducer(initialState, addIngredient(ingredient1));
      state = constructorReducer(state, addIngredient(ingredient2));
      
      state = constructorReducer(state, moveIngredient({ fromIndex: 1, toIndex: 0 }));
      
      expect(state.ingredients).toEqual([ingredient2, ingredient1]);
    });
  });

  describe('clearConstructor action', () => {
    it('should handle clearConstructor', () => {
      let state = constructorReducer(initialState, addBun(mockBun));
      state = constructorReducer(state, addIngredient(mockConstructorIngredient));
      
      expect(state.bun).not.toBeNull();
      expect(state.ingredients).not.toHaveLength(0);
      
      state = constructorReducer(state, clearConstructor());
      
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});