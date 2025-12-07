/// <reference types="cypress" />

Cypress.Commands.add('addIngredient', (ingredientId: string) => {
  cy.get(`[data-testid="ingredient-${ingredientId}"] button.common_button`)
    .click({ force: true });
});

