// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('input[type="submit"]').click();
});

Cypress.Commands.add('openNewAccount', (accountType = 'CHECKING') => {
  cy.visit('/parabank/openaccount.htm');
  cy.intercept('POST', '/parabank/services/bank/createAccount*').as('createAccount');
  cy.get('#type').select(accountType);
  cy.get('input[value="Open New Account"]').click();
  cy.wait('@createAccount').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('loginUI', (username, password) => {
  cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('input[value="Log In"]').click();
});

Cypress.Commands.add('verifyAccountUI', (accountId, expectedBalance) => {
  cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
  cy.get('#accountTable td').contains(accountId).parent()
    .should('contain.text', expectedBalance);
});

Cypress.Commands.add('interceptAccounts', () => {
  cy.intercept('/parabank/services/bank/accounts*').as('getAccounts');
});

Cypress.Commands.add('interceptTransfer', () => {
  cy.intercept('/parabank/services/bank/transfer*').as('transfer');
});

Cypress.Commands.add('interceptLoan', () => {
  cy.intercept('/parabank/services/bank/loan*').as('requestLoan');
});
