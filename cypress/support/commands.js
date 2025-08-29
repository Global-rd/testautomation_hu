Cypress.Commands.add("loginToParaBank", () => {
  cy.visit("index.htm");
  cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
  cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
  cy.get('input[value="Log In"]').click();
  cy.get("#leftPanel").should("contain", "Account Services");
});

Cypress.Commands.add("openLoanRequestForm", () => {
  cy.get('a[href="requestloan.htm"]').click();
  cy.get("#requestLoanForm").should("be.visible");
  cy.get("#amount").should("be.visible");
  cy.get("#downPayment").should("be.visible");
});

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
