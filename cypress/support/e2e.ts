import './commands'; 

beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
  cy.clearCookies();
  cy.intercept('*', (req) => {
    console.log(`Request: ${req.method} ${req.url}`);
  });
});