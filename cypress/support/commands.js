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
  cy.visit(Cypress.env('baseUrl'));

  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('input[value="Log In"]').click();

  cy.url().should('include', '/overview.htm');
  cy.contains('Welcome').should('be.visible');
});

Cypress.Commands.add('updateProfile', (data) => {
  const baseUrl = Cypress.env('baseUrl');
  cy.request({
    method: 'POST',
    url: `${baseUrl}/parabank/services_proxy/bank/customers/update/${data.customerId}`,
    form: true,
    body: {
      ...data
    }
  });
});

Cypress.Commands.add('openNewAccount', (type = 'CHECKING', fromAccountId) => {
  cy.contains('Open New Account').click();
  cy.get('#type').select(type);
  cy.get('#fromAccountId').select(fromAccountId);
  cy.get('input[value="Open New Account"]').click();
});

Cypress.Commands.add('transferFunds', (fromId, toId, amount) => {
  cy.contains('Transfer Funds').click();
  cy.get('#fromAccountId').select(fromId);
  cy.get('#toAccountId').select(toId);
  cy.get('#amount').type(amount);
  cy.get('input[value="Transfer"]').click();
});