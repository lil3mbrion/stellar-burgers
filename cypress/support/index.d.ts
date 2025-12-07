declare namespace Cypress {
    interface Chainable {
        addIngredient(ingredientId: string): Chainable<void>;
    }
}