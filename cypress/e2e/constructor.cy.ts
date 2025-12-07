describe('Тестыы', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('1 Моковые данные для ингредиентов', () => {
    it('загружает моковые ингредиенты из fixtures', () => {
      cy.get('@getIngredients').its('response.body.success').should('be.true');
      cy.get('@getIngredients').its('response.body.data').should('have.length', 6);
    });
  });

  describe('2 Добавление ингредиента в конструктор', () => {
    it('добавляет булку', () => {
      cy.get('[data-testid="no-bun-top"]').should('exist');
      cy.get('[data-testid="no-bun-bottom"]').should('exist');
      cy.get('[data-testid="order-price"]').should('contain', '0');
      
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] button.common_button')
        .click({ force: true });
      
      cy.get('[data-testid="no-bun-top"]').should('not.exist');
      cy.get('[data-testid="no-bun-bottom"]').should('not.exist');
      cy.get('[data-testid="order-price"]').should('contain', '2510');
    });

    it('добавляет начинку', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] button.common_button')
        .click({ force: true });
      
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093d"] button.common_button')
        .click({ force: true });
      
      cy.get('[data-testid="no-ingredients"]').should('not.exist');
      cy.get('[data-testid="order-price"]').should('contain', '3498');
    });
  });

  describe('3 Работа модальных окон', () => {
    it('открывает модальное окно ингредиента', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] a')
        .click({ force: true });
      
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="ingredient-details"]').should('be.visible');
      cy.get('[data-testid="ingredient-name"]')
        .should('contain', 'Краторная булка N-200i');
    });

    it('закрывает модальное окно по клику на крестик', () => {
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] a')
        .click({ force: true });
      
      cy.get('[data-testid="modal"]').should('be.visible');
      
      cy.get('[data-testid="modal-close"]').click();
      
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });

  describe('4 Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', 'api/auth/login', {
        fixture: 'user.json'  
      }).as('login');
      
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json' 
      }).as('getUser');
      
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'  
      }).as('createOrder');
    });

    it('оформляет заказ с авторизацией', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.wait('@login');
      cy.url().should('eq', 'http://localhost:4000/');

      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] button.common_button')
        .click({ force: true });

      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093d"] button.common_button')
        .click({ force: true });

      cy.get('[data-testid="order-button"]').click({ force: true });

      cy.wait('@createOrder').then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
        expect(interception.response?.body.order.number).to.equal(12345);
      });

      cy.get('[data-testid="modal"]', { timeout: 10000 })
        .should('be.visible');
      
      cy.get('.text_type_digits-large')
        .should('contain', '12345');
      
      cy.contains('идентификатор заказ').should('be.visible');
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
      cy.get('[data-testid="no-bun-top"]').should('exist');
      cy.get('[data-testid="no-bun-bottom"]').should('exist');
      cy.get('[data-testid="no-ingredients"]').should('exist');
      cy.get('[data-testid="order-price"]').should('contain', '0');
    });
  });

  describe('5 Доп проверка', () => {
    it('редиректит на логин при попытке заказа без авторизации', () => {
      cy.clearCookies();
      cy.reload();
      cy.wait('@getIngredients');
      
      cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"] button.common_button')
        .click({ force: true });
      
      cy.get('[data-testid="order-button"]').click({ force: true });
      
      cy.url().should('include', '/login');
    });
  });
});