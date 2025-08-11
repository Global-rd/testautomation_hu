
Cypress.Commands.add("loginOnUI", () => {
  cy.visit("/");
  cy.get('input[name="username"]').type(Cypress.env("username"));
  cy.get('input[name="password"]').type(Cypress.env("password"), {
    log: false, // Do not log the password in the console
  });
  cy.get('input[type="submit"]').click();
  cy.contains('Account Services').should('be.visible');
});

Cypress.Commands.add("loginWithAPI", () => {
  cy.request({
    method: "POST",
    url: "/parabank/login.htm",
    form: true,
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  });
});

Cypress.Commands.add("getAccount", (accountId) => {
  return cy.request(`/parabank/services/bank/accounts/${accountId}`);
});


Cypress.Commands.add('getCustomerId', () => {
  return cy.request('/parabank/services/bank/customers/current')
    .its('body.id');
});