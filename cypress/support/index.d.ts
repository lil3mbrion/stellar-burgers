declare namespace Cypress {
    interface Chainable<Subject = any> {
        addIngredient(ingredientId: string): Chainable<void>;
    }
}